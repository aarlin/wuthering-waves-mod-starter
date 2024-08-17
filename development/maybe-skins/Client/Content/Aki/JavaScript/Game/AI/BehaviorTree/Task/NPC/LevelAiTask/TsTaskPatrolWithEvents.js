"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../../Core/Common/Log"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent"),
	GlobalData_1 = require("../../../../../GlobalData"),
	GameSplineComponent_1 = require("../../../../../LevelGamePlay/Common/GameSplineComponent"),
	BehaviorTreeDefines_1 = require("../../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines"),
	BlackboardController_1 = require("../../../../../World/Controller/BlackboardController"),
	TsAiController_1 = require("../../../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase"),
	MAX_DISTANCE = 200;
class TsTaskPatrolWithEvents extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.UseLastMoveIndex = !1),
			(this.OpenDebugNode = !1),
			(this.SplineId = 0),
			(this.SplineComp = void 0),
			(this.SplineInited = !1),
			(this.MoveConfig = void 0),
			(this.Entity = void 0),
			(this.ActorComp = void 0),
			(this.MoveComp = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsUseLastMoveIndex = !1),
			(this.TsOpenDebugNode = !1),
			(this.SegmentsMoveConfig = void 0),
			(this.CacheVector = void 0),
			(this.CacheVector2 = void 0),
			(this.CurrentSegmentIndex = 0),
			(this.IsCircle = !1),
			(this.SplinePoints = void 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsUseLastMoveIndex = this.UseLastMoveIndex),
			(this.TsOpenDebugNode = this.OpenDebugNode),
			(this.CacheVector = Vector_1.Vector.Create()),
			(this.CacheVector2 = Vector_1.Vector.Create()));
	}
	ReceiveExecuteAI(e, t) {
		this.InitTsVariables();
		var i = e.AiController;
		i
			? ((this.Entity = i.CharAiDesignComp.Entity),
				(this.MoveComp = this.Entity.GetComponent(36)),
				(this.ActorComp = i.CharActorComp),
				(this.SplineInited || this.InitSpline()) &&
				((this.MoveConfig = this.GetPatrolMoveConfig()), this.MoveConfig)
					? this.MoveComp.MoveAlongPath(this.MoveConfig)
					: this.FinishExecute(!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						e.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	InitSpline() {
		var e = new GameSplineComponent_1.GameSplineComponent(this.SplineId);
		if (!e.Initialize())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelAi",
						43,
						"[LevelAiTaskMoveWithSpline] GameSplineComponent初始化失败",
						["EntityId", this.ActorComp?.CreatureData.GetPbDataId()],
						["SplineEntityId", this.SplineId],
					),
				!1
			);
		if (e.Option.Type !== IComponent_1.ESplineType.LevelAI)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelAi",
						30,
						"[LevelAiTaskMoveWithSpline] SplineComponent配置类型不是LevelAI",
						["EntityId", this.ActorComp?.CreatureData.GetPbDataId()],
						["SplineEntityId", this.SplineId],
					),
				!1
			);
		if (
			((this.SplineComp = e),
			(this.IsCircle = !!e.Option.CycleOption?.IsCircle),
			(this.SplinePoints = e.Option.Points.slice(0)),
			this.IsCircle && 2 < this.SplinePoints.length)
		)
			for (let t = e.Option.Points.length - 2; 0 < t; --t)
				this.SplinePoints.push(e.Option.Points[t]);
		return this.PartitionSpline(), (this.SplineInited = !0);
	}
	OnAbort() {
		this.MoveComp?.StopMove(!0);
	}
	OnClear() {
		this.AIOwner instanceof TsAiController_1.default &&
			((this.Entity = void 0),
			(this.ActorComp = void 0),
			(this.MoveComp = void 0));
	}
	PartitionSpline() {
		if (
			this.SplineComp &&
			this.SplineComp.Option.Type === IComponent_1.ESplineType.LevelAI
		) {
			this.SegmentsMoveConfig = new Array();
			let i = [],
				o = 0;
			var e = this.SplinePoints.length;
			for (let n = 0; n < e; ++n) {
				var t = this.SplinePoints[n];
				i.push(t),
					((t.Actions && 0 !== t.Actions.length) || n === e - 1) &&
						(this.CreateMoveConfig(i, o), (o += i.length), (i = []));
			}
		}
	}
	CreateMoveConfig(e, t) {
		if (e.length) {
			var i = [];
			for (let n = 0; n < e.length; n++) {
				var o = e[n];
				o = {
					Index: n,
					Position: this.GetWorldLocationAtSplinePoint(n + t),
					Actions: new Array(),
					MoveState: o.MoveState,
					MoveSpeed: o.MoveSpeed,
				};
				i.push(o);
			}
			var n = {
					Points: i,
					Navigation: this.SplineComp.Option.UsePathFinding ?? !1,
					IsFly: !1,
					DebugMode: this.TsOpenDebugNode,
					Loop: !1,
					CircleMove: !1,
					UsePreviousIndex: this.TsUseLastMoveIndex,
					UseNearestPoint: this.TsUseLastMoveIndex,
					ReturnFalseWhenNavigationFailed: !1,
				},
				r = e.length - 1;
			if (e[r].Actions && e[r].Actions?.length) {
				var s = this.SplineComp.GetNumberOfSplinePoints();
				let e = r + t;
				this.IsCircle && e >= s && (e = 2 * s - 2 - e);
				const i =
					BehaviorTreeDefines_1.BehaviorTreeDefines.GetPatrolActionStateName(
						this.SplineId,
						e,
					);
				n.Callback = (e) => {
					BlackboardController_1.BlackboardController.SetIntValueByEntity(
						this.Entity.Id,
						BehaviorTreeDefines_1.BehaviorTreeDefines
							.PatrolFinishSegmentIndexName,
						this.CurrentSegmentIndex,
					),
						BlackboardController_1.BlackboardController.SetStringValueByEntity(
							this.Entity.Id,
							BehaviorTreeDefines_1.BehaviorTreeDefines.BehaviorTreeStateName,
							i,
						),
						this.Finish(!0);
				};
			}
			n.Callback ||
				(n.Callback = (e) => {
					this.Finish(!0);
				}),
				this.SegmentsMoveConfig.push(n);
		}
	}
	GetNearestPatrolPointIndex() {
		if (!this.SplineComp || !this.SplinePoints)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelAi",
						51,
						"获取最近点失败",
						["PbDataId", this.ActorComp.CreatureData.GetPbDataId()],
						["HasSplineComp", !!this.SplineComp],
						["HasSplinePoints", !!this.SplinePoints],
					),
				0
			);
		var e = this.SplinePoints;
		let t = 0,
			i = Number.MAX_VALUE;
		var o = this.ActorComp.ActorLocationProxy,
			n = Vector_1.Vector.Create();
		for (let s = 0, a = e.length; s < a; s++) {
			n.DeepCopy(this.GetWorldLocationAtSplinePoint(s)),
				this.CacheVector.Set(n.X, n.Y, n.Z);
			var r = Vector_1.Vector.Dist(o, this.CacheVector);
			r < i && ((i = r), (t = s));
		}
		var s = Vector_1.Vector.Create(),
			a = Vector_1.Vector.Create();
		if (0 === t) return 0;
		if (t === e.length - 1) {
			var h = e[0].Position,
				l = e[e.length - 1].Position;
			if (
				(s.Set(h.X, h.Y, h.Z),
				a.Set(l.X, l.Y, l.Z),
				i < 200 && Vector_1.Vector.Dist(s, a) < 200)
			)
				return 0;
		}
		for (let n = 0; n < e.length - 1; n++) {
			s.DeepCopy(this.SplineComp.GetWorldLocationAtSplinePoint(n)),
				a.DeepCopy(this.SplineComp.GetWorldLocationAtSplinePoint(n + 1)),
				this.CacheVector.Set(a.X, a.Y, a.Z),
				this.CacheVector.Subtraction(s, this.CacheVector);
			var C = this.CacheVector.Size();
			this.CacheVector2.Set(o.X, o.Y, o.Z),
				this.CacheVector2.Subtraction(a, this.CacheVector2),
				0 < this.CacheVector.DotProduct(this.CacheVector2) ||
					(this.CacheVector2.Set(o.X, o.Y, o.Z),
					this.CacheVector2.Subtraction(s, this.CacheVector2),
					this.CacheVector.DotProduct(this.CacheVector2) < 0) ||
					(this.CacheVector.CrossProduct(this.CacheVector2, this.CacheVector),
					(C = this.CacheVector.Size() / C) < i && ((i = C), (t = n + 1)));
		}
		return t;
	}
	GetPatrolMoveConfig() {
		if (this.SegmentsMoveConfig) {
			var e = BlackboardController_1.BlackboardController.GetIntValueByEntity(
				this.Entity.Id,
				BehaviorTreeDefines_1.BehaviorTreeDefines.PatrolFinishSegmentIndexName,
			);
			if (void 0 !== e)
				return (
					(this.CurrentSegmentIndex = (e + 1) % this.SegmentsMoveConfig.length),
					this.SegmentsMoveConfig[this.CurrentSegmentIndex]
				);
			let n = 0;
			var t = this.GetNearestPatrolPointIndex(),
				i = this.SegmentsMoveConfig.length;
			for (let e = 0; e < i; ++e) {
				var o = this.SegmentsMoveConfig[e].Points.length;
				if (t >= n && t < n + o)
					return (
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"LevelAi",
								43,
								"选择初始的移动状态",
								["EntityId", this.ActorComp.CreatureData.GetPbDataId()],
								["最近的点", t],
								["初始分段下标", e],
								["样条分段数", i],
							),
						(this.CurrentSegmentIndex = e),
						this.SegmentsMoveConfig[e]
					);
				n += o;
			}
		}
	}
	GetWorldLocationAtSplinePoint(e) {
		if (this.SplineComp && this.SplinePoints) {
			var t = this.SplineComp.GetNumberOfSplinePoints();
			if (
				!(
					(!this.IsCircle && t <= e) ||
					(this.IsCircle && e >= this.SplinePoints.length)
				)
			)
				return this.SplineComp.GetWorldLocationAtSplinePoint(
					e < t ? e : 2 * t - 2 - e,
				);
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelAi",
					51,
					"[PatrolWithEvents] 索引越界",
					["EntityId", this.ActorComp?.CreatureData.GetPbDataId()],
					["SplineId", this.SplineId],
				);
		}
	}
}
exports.default = TsTaskPatrolWithEvents;
