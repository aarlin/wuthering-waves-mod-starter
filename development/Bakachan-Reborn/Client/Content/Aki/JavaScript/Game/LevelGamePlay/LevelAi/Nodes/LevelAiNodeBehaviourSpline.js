"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiNodeBehaviourSpline = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	GameSplineComponent_1 = require("../../Common/GameSplineComponent"),
	LevelAiDecoratorCompareVar_1 = require("../Decorators/LevelAiDecoratorCompareVar"),
	LevelAiPlan_1 = require("../LevelAiPlan"),
	LevelAiRegistry_1 = require("../LevelAiRegistry"),
	LevelAiStandaloneNode_1 = require("../LevelAiStandaloneNode"),
	LevelAiTaskMoveAlong_1 = require("../Tasks/LevelAiTaskMoveAlong"),
	LevelAiTaskSetVar_1 = require("../Tasks/LevelAiTaskSetVar"),
	LevelAiTaskSuccess_1 = require("../Tasks/LevelAiTaskSuccess"),
	MAX_DISTANCE = 200;
class SelfVarCompareParam {
	constructor(e, t) {
		(this.Var1 = { Type: "Boolean", Source: "Self", Name: "DEFAULT_STATE" }),
			(this.Compare = "Eq"),
			(this.Var2 = { Type: "Boolean", Source: "Constant", Value: !0 }),
			(this.Type = "CompareVar"),
			(this.Var1.Name = e),
			(this.Var2.Value = t);
	}
}
class SelfVarSetParam {
	constructor(e, t) {
		(this.VarLeft = { Type: "Boolean", Source: "Self", Name: "DEFAULT_STATE" }),
			(this.VarRight = { Type: "Boolean", Source: "Constant", Value: !0 }),
			(this.VarLeft.Name = e),
			(this.VarRight.Value = t);
	}
}
class LevelAiNodeBehaviourSpline extends LevelAiStandaloneNode_1.LevelAiStandaloneNode {
	constructor() {
		super(...arguments),
			(this.SplineId = void 0),
			(this.CanRecordPlanProgress = !1),
			(this.Cost = 0),
			(this.DTe = !1),
			(this.TTe = new LevelAiPlan_1.LevelAiPlanStepId()),
			(this.jye = Vector_1.Vector.Create()),
			(this.RTe = Vector_1.Vector.Create());
	}
	MakePlanExpansions(e, t) {
		var o, i, r;
		void 0 !== this.SplineId &&
			(this.PrintDescription(
				"Behaviour Spline Make Plan Expansions",
				["LevelIndex", e.CurrentLevelIndex],
				["StepIndex", e.CurrentStepIndex],
			),
			this.DTe || this.HC(),
			this.CanRecordPlanProgress || this.TTe.Reset(),
			(o = (r = e.MakePlanCopyWithAddedStep()).PlanCopy),
			(i = r.OutAddedStep),
			(r = r.OutAddedStepId),
			(i.SubLevelIndex = e.AddLevel(o, r)),
			e.SubmitCandidatePlan(o));
	}
	GetNextSteps(e, t) {
		if (!this.TTe.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)) {
			var o = this.TTe.LevelIndex,
				i = this.TTe.StepIndex;
			if ((e.IsExecutingPlan && this.TTe.Reset(), 0 <= o && 0 <= i))
				return void e.AddNextStepsAfter(
					new LevelAiPlan_1.LevelAiPlanStepId(o, i - 1),
				);
		}
		(o = e.GetStep(t)),
			e.AddNextStepsAfter(new LevelAiPlan_1.LevelAiPlanStepId(o.SubLevelIndex));
	}
	OnSubLevelStepFinished(e, t, o, i, r) {
		return 2 === i && this.TTe.CopyFrom(o), !0;
	}
	HC() {
		var e = new GameSplineComponent_1.GameSplineComponent(this.SplineId);
		if (e.Initialize())
			if (e.Option.Type !== IComponent_1.ESplineType.LevelAI)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelAi",
						30,
						"[LevelAiTaskMoveWithSpline] SplineComponent配置类型不是LevelAI",
						["EntityId", this.CreatureDataComponent.GetPbDataId()],
						["SplineEntityId", this.SplineId],
					);
			else {
				var t = new LevelAiTaskSuccess_1.LevelAiTaskSuccess(),
					o =
						(t.Serialize(
							this.CharacterPlanComponent,
							this.CreatureDataComponent,
							this.Description,
						),
						(t.Cost = this.Cost),
						this.NextNodes.push(t),
						e.GetNumberOfSplinePoints());
				let h = 0;
				var i = this.UTe(e.Option.Points, e);
				let S = !1,
					v = [];
				var r = e.Option.UsePathFinding ?? !1;
				let L = 0;
				for (let C = 0; C < o; ++C) {
					var a = C,
						n = e.Option.Points[C];
					if (
						(v.push(n), (n.Actions && 0 !== n.Actions.length) || a === o - 1)
					) {
						n = this.ATe(e, v, h, a, r);
						var s,
							l = "INTERNAL_PATROL_" + L.toString(),
							p =
								(i >= h &&
									i <= a &&
									!S &&
									(Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"LevelAi",
											43,
											"选择初始的移动状态",
											["EntityId", this.CreatureDataComponent.GetPbDataId()],
											["最近的点", i],
											["当前状态名称", l],
										),
									(S = !0),
									this.CharacterPlanComponent.WorldState.SetBooleanWorldState(
										l,
										!0,
									)),
								new SelfVarCompareParam(l, !0));
						p =
							((s =
								new LevelAiDecoratorCompareVar_1.LevelAiDecoratorCompareVar()).Serialize(
								this.CharacterPlanComponent,
								this.CreatureDataComponent,
								"检查巡逻状态 " + l,
								p,
							),
							n.First.Decorators.push(s),
							new SelfVarSetParam(l, !1));
						(s = new LevelAiTaskSetVar_1.LevelAiTaskSetVar()).Serialize(
							this.CharacterPlanComponent,
							this.CreatureDataComponent,
							"设置当前巡逻状态 " + l,
							p,
						),
							n.Last.NextNodes.push(s);
						let d = "INTERNAL_PATROL_" + (++L).toString();
						a === o - 1 && (d = "INTERNAL_PATROL_0"),
							(l = new SelfVarSetParam(d, !0)),
							(p = new LevelAiTaskSetVar_1.LevelAiTaskSetVar()).Serialize(
								this.CharacterPlanComponent,
								this.CreatureDataComponent,
								"设置下个巡逻状态 " + d,
								l,
							),
							s.NextNodes.push(p),
							t.NextNodes.push(n.First),
							(v = []),
							(h = C + 1);
					}
				}
				this.DTe = !0;
			}
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelAi",
					43,
					"[LevelAiTaskMoveWithSpline] GameSplineComponent初始化失败",
					["EntityId", this.CreatureDataComponent.GetPbDataId()],
					["SplineEntityId", this.SplineId],
				);
	}
	ATe(e, t, o, i, r) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"LevelAi",
				43,
				"生成MoveAlongStep",
				["EntityId", this.CreatureDataComponent.GetPbDataId()],
				["startIndex", o],
				["endIndex", i],
			);
		var a = new LevelAiTaskMoveAlong_1.LevelAiTaskMoveAlong(),
			n =
				(a.Serialize(
					this.CharacterPlanComponent,
					this.CreatureDataComponent,
					this.Description + " 样条路径" + o + "到" + i,
				),
				[]);
		for (let i = 0; i < t.length; i++) {
			var s = t[i],
				l = {
					Index: i,
					Position: Vector_1.Vector.Create(),
					MoveSpeed: s.MoveSpeed,
					MoveState: 1,
				};
			switch (s.MoveState) {
				case IComponent_1.EPatrolMoveState.Walk:
					l.MoveState = 1;
					break;
				case IComponent_1.EPatrolMoveState.Run:
					l.MoveState = 2;
			}
			l.Position.DeepCopy(e.GetWorldLocationAtSplinePoint(o + i)), n.push(l);
		}
		return (
			(a.PathPoint = n),
			(a.Navigation = r),
			(r = t[t.length - 1]).Actions && 0 !== r.Actions.length
				? ((r = this.PTe(r.Actions, i)),
					a.NextNodes.push(r.First),
					{ First: a, Last: r.Last })
				: { First: a, Last: a }
		);
	}
	UTe(e, t) {
		if (!(p = this.CreatureDataComponent.Entity.GetComponent(3))) return 0;
		let o = 0,
			i = Number.MAX_VALUE;
		var r = p.ActorLocationProxy,
			a = Vector_1.Vector.Create();
		for (let s = 0, l = e.length; s < l; s++) {
			a.DeepCopy(t.GetWorldLocationAtSplinePoint(s)),
				this.jye.Set(a.X, a.Y, a.Z);
			var n = Vector_1.Vector.Dist(r, this.jye);
			n < i && ((i = n), (o = s));
		}
		var s = Vector_1.Vector.Create(),
			l = Vector_1.Vector.Create();
		if (0 === o) return 0;
		if (o === e.length - 1) {
			var p = e[0].Position,
				h = e[e.length - 1].Position;
			if (
				(s.Set(p.X, p.Y, p.Z),
				l.Set(h.X, h.Y, h.Z),
				i < 200 && Vector_1.Vector.Dist(s, l) < 200)
			)
				return 0;
		}
		for (let a = 0; a < e.length - 1; a++) {
			s.DeepCopy(t.GetWorldLocationAtSplinePoint(a)),
				l.DeepCopy(t.GetWorldLocationAtSplinePoint(a + 1)),
				this.jye.Set(l.X, l.Y, l.Z),
				this.jye.Subtraction(s, this.jye);
			var S = this.jye.Size();
			this.RTe.Set(r.X, r.Y, r.Z),
				this.RTe.Subtraction(l, this.RTe),
				0 < this.jye.DotProduct(this.RTe) ||
					(this.RTe.Set(r.X, r.Y, r.Z),
					this.RTe.Subtraction(s, this.RTe),
					this.jye.DotProduct(this.RTe) < 0) ||
					(this.jye.CrossProduct(this.RTe, this.jye),
					(S = this.jye.Size() / S) < i && ((i = S), (o = a + 1)));
		}
		return o;
	}
	PTe(e, t) {
		let o, i;
		for (let a = 0; a < e.length; ++a) {
			var r = e[a];
			r = this.xTe(r, t, a);
			0 === a ? (o = r) : i.NextNodes.push(r), (i = r);
		}
		return { First: o, Last: i };
	}
	xTe(e, t, o) {
		var i = new (LevelAiRegistry_1.LevelAiRegistry.Instance().FindTaskCtor(
			e.Name,
		))();
		return (
			i.Serialize(
				this.CharacterPlanComponent,
				this.CreatureDataComponent,
				this.Description + " 样条点" + t + " 行为" + o,
				e.Params,
			),
			i
		);
	}
}
exports.LevelAiNodeBehaviourSpline = LevelAiNodeBehaviourSpline;
