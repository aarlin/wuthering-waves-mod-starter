"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	Quat_1 = require("../../../../Core/Utils/Math/Quat"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	AiLibrary_1 = require("../../Common/AiLibrary"),
	AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
	THRESHOLD_RATE = 1 / 3,
	OTHER_THRESHOLD_RATE = 1 - THRESHOLD_RATE,
	NAV_INTERVAL_TIME = 3;
class TsTaskSkillWander extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.ForwardFirst = !1),
			(this.CheckSkillPeriod = 0),
			(this.MoveState = 0),
			(this.SkillType = 0),
			(this.DebugLog = !1),
			(this.WalkOff = !1),
			(this.IsInitTsVariables = !1),
			(this.TsForwardFirst = !1),
			(this.TsCheckSkillPeriod = 0),
			(this.TsMoveState = 0),
			(this.TsSkillType = 0),
			(this.TmpVector = void 0),
			(this.TmpSelfToTarget = void 0),
			(this.TmpForward = void 0),
			(this.TmpBackward = void 0),
			(this.TmpVector2 = void 0),
			(this.TmpQuat = void 0),
			(this.LastDestination = void 0),
			(this.PreForward = !1),
			(this.TsDebugLog = !1),
			(this.TsWalkOff = !1),
			(this.NavigationInterval = 0),
			(this.NextCheckSkillTime = -0),
			(this.SelectedSkillPrecondition = void 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsForwardFirst = this.ForwardFirst),
			(this.TsCheckSkillPeriod = this.CheckSkillPeriod),
			(this.TsMoveState = this.MoveState),
			(this.TsSkillType = this.SkillType),
			(this.TsDebugLog = this.DebugLog),
			(this.TsWalkOff = this.WalkOff),
			(this.TmpVector = Vector_1.Vector.Create()),
			(this.TmpSelfToTarget = Vector_1.Vector.Create()),
			(this.TmpForward = Vector_1.Vector.Create()),
			(this.TmpBackward = Vector_1.Vector.Create()),
			(this.TmpVector2 = Vector_1.Vector.Create()),
			(this.TmpQuat = Quat_1.Quat.Create()),
			(this.LastDestination = Vector_1.Vector.Create()));
	}
	ReceiveExecuteAI(t, e) {
		if (
			((this.NavigationInterval = 3),
			this.InitTsVariables(),
			(t = t.AiController))
		) {
			this.TsWalkOff ||
				t.CharActorComp.Entity.GetComponent(161)?.SetWalkOffLedgeRecord(!1);
			var i = t.CharActorComp.Entity.CheckGetComponent(158);
			if (i.Valid)
				switch (this.TsMoveState) {
					case 1:
						i.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
						break;
					case 2:
						i.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
						break;
					case 3:
						i.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Sprint);
				}
		}
	}
	ReceiveTickAI(t, e, i) {
		if (((this.NavigationInterval += i), (i = t.AiController))) {
			var o = i.AiHateList.GetCurrentTarget();
			if (o?.Valid) {
				var r = i.CharActorComp,
					a =
						((o = o.Entity.GetComponent(3)),
						MathUtils_1.MathUtils.InverseTransformPositionNoScale(
							o.FloorLocation,
							o.ActorRotationProxy,
							r.FloorLocation,
							this.TmpVector,
						),
						MathUtils_1.MathUtils.GetAngleByVector2D(this.TmpVector)),
					s =
						(o.FloorLocation.Subtraction(r.FloorLocation, this.TmpSelfToTarget),
						this.TmpSelfToTarget.Size2D() - r.ScaledRadius - o.ScaledRadius),
					n = this.TmpSelfToTarget.Z,
					l = MathUtils_1.MathUtils.WrapAngle(
						MathUtils_1.MathUtils.GetAngleByVector2D(this.TmpSelfToTarget) -
							r.ActorRotationProxy.Yaw,
					);
				if (
					!this.NextCheckSkillTime ||
					this.NextCheckSkillTime < Time_1.Time.WorldTime
				) {
					if (
						((this.NextCheckSkillTime =
							Time_1.Time.WorldTime + this.TsCheckSkillPeriod),
						!this.FindArea(i, s, a, n, this.TmpSelfToTarget))
					)
						return void this.Finish(!1);
				} else if (!this.SelectedSkillPrecondition) return void this.Finish(!1);
				if (
					((a = MathUtils_1.MathUtils.InRange(
						s,
						this.SelectedSkillPrecondition.DistanceRange,
					)),
					(n = MathUtils_1.MathUtils.InRange(
						l,
						this.SelectedSkillPrecondition.AngleRange,
					)),
					a && n)
				)
					this.Finish(!0);
				else {
					(l = i.AiWanderInfos.GetCurrentBattleWander()),
						(n = this.PreForward
							? 0.6666666666666667 *
									this.SelectedSkillPrecondition.DistanceRange.Min +
								this.SelectedSkillPrecondition.DistanceRange.Max *
									THRESHOLD_RATE
							: this.SelectedSkillPrecondition.DistanceRange.Min *
									THRESHOLD_RATE +
								0.6666666666666667 *
									this.SelectedSkillPrecondition.DistanceRange.Max);
					let t = l.RunTurnSpeed;
					if (
						(this.TmpVector.DeepCopy(this.TmpSelfToTarget),
						s < n
							? ((t = 2 === this.TsMoveState ? t : l.TurnSpeeds[1]),
								(this.TmpVector.X = -this.TmpVector.X),
								(this.TmpVector.Y = -this.TmpVector.Y),
								(this.PreForward = !1))
							: ((t = 2 === this.TsMoveState ? t : l.TurnSpeeds[0]),
								(this.PreForward = !0)),
						!a && this.NavigationInterval > 3)
					) {
						if (
							((this.NavigationInterval = 0),
							this.SetMoveToLocation(
								this.TmpVector,
								r,
								t,
								o.ActorLocationProxy,
							))
						)
							return;
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("AI", 43, "SkillWander 寻路失败", [
								"EntityId",
								r.Entity.Id,
							]),
							this.StopMoveToLocation(r);
					}
					((i = r.Entity.GetComponent(36)) &&
						i.MoveController.IsMovingToLocation()) ||
						(r.Entity.GetComponent(89)?.MoveState !==
						CharacterUnifiedStateTypes_1.ECharMoveState.Walk
							? (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
									r,
									this.TmpSelfToTarget,
									t,
								),
								r.SetInputDirect(r.ActorForwardProxy))
							: AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(
									r,
									this.TmpVector,
									this.TmpQuat,
									this.TmpVector2,
									t,
									!0,
									this.TmpSelfToTarget,
								));
				}
			} else this.Finish(!1);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					t.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
	StopMoveToLocation(t) {
		(t = t.Entity.GetComponent(36)) &&
			t.MoveController.IsMovingToLocation() &&
			t?.MoveController.StopMoveToLocation(),
			this.LastDestination?.Reset();
	}
	SetMoveToLocation(t, e, i, o) {
		return (
			this.TmpVector2.DeepCopy(t),
			this.TmpVector2.AdditionEqual(e.ActorLocationProxy),
			!!(t = e.Entity.GetComponent(36)) &&
				((!this.LastDestination.IsNearlyZero() ||
					Vector_1.Vector.Dist2D(this.LastDestination, this.TmpVector2) <
						100) &&
				t.MoveController.IsMovingToLocation()
					? (this.LastDestination.DeepCopy(this.TmpVector2), !0)
					: (this.LastDestination.DeepCopy(this.TmpVector2),
						t.MoveController.NavigateMoveToLocation(
							{
								Position: this.TmpVector2,
								TurnSpeed: i,
								UseNearestDirection: !0,
								FaceToPosition: o,
								ResetCondition: () => !1,
							},
							!0,
							!1,
						)))
		);
	}
	FindArea(t, e, i, o, r) {
		var a = t.CharAiDesignComp.Entity.CheckGetComponent(33),
			s = a.Entity.GetComponent(185);
		this.TmpForward.DeepCopy(r),
			(this.TmpForward.Z = 0),
			this.TmpForward.Normalize(),
			this.TmpForward.UnaryNegation(this.TmpBackward);
		let n = MathUtils_1.MathUtils.MaxFloat,
			l = MathUtils_1.MathUtils.MaxFloat,
			h = ((this.SelectedSkillPrecondition = void 0), 4),
			c = MathUtils_1.MathUtils.MaxFloat;
		this.TsDebugLog &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"AI",
				6,
				"SkillWander Find Area",
				["Owner", t.CharActorComp.Actor.GetName()],
				["BT", this.TreeAsset.GetName()],
			);
		for (const r of t.AiSkill.ActiveSkillGroup)
			for (const S of t.AiSkill.BaseSkill.RandomSkills[r].ArrayInt) {
				var T = t.AiSkill.SkillInfos.get(S);
				if (T) {
					var d,
						g = t.AiSkill.SkillPreconditionMap.get(T.SkillPreconditionId);
					if (g) {
						if (
							!(T.SkillWeight <= 0) &&
							AiLibrary_1.AiLibrary.IsSkillAvailable(
								t,
								S,
								a,
								s,
								this.TsSkillType,
								i,
								o,
								0,
								0,
								!1,
								this.TsDebugLog,
							)
						)
							if (e < g.DistanceRange.Min)
								this.TsForwardFirst && 0 === h
									? this.TsDebugLog &&
										Log_1.Log.CheckInfo() &&
										Log_1.Log.Info("AI", 6, "    Failed: ForwardFirst")
									: c < (d = g.DistanceRange.Min - e) || l < d
										? this.TsDebugLog &&
											Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"AI",
												6,
												"    Failed: BackwardBlock or MinDistance",
												["MoveDist", d],
												["MinDistance", c],
												["MinBackwardBlock", l],
											)
										: AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirection(
													this.AIOwner,
													t.CharActorComp.ActorLocationProxy,
													this.TmpBackward,
													d,
												)
											? ((l = d),
												this.TsDebugLog &&
													Log_1.Log.CheckInfo() &&
													Log_1.Log.Info("AI", 6, "    Failed: BackwardBlock", [
														"MoveDist",
														d,
													]))
											: ((h = 1),
												(c = d),
												(this.SelectedSkillPrecondition = g));
							else {
								if (!(e > g.DistanceRange.Max)) {
									this.SelectedSkillPrecondition = g;
									break;
								}
								this.TsForwardFirst || 1 !== h
									? c < (d = e - g.DistanceRange.Max) || n < d
										? this.TsDebugLog &&
											Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"AI",
												6,
												"    Failed: ForwardBlock or MinDistance",
												["MoveDist", d],
												["MinDistance", c],
												["MinForwardBlock", n],
											)
										: AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirection(
													this.AIOwner,
													t.CharActorComp.ActorLocationProxy,
													this.TmpForward,
													d,
												)
											? ((n = d),
												this.TsDebugLog &&
													Log_1.Log.CheckInfo() &&
													Log_1.Log.Info("AI", 6, "    Failed: ForwardBlock", [
														"MoveDist",
														d,
													]))
											: ((h = 0), (c = d), (this.SelectedSkillPrecondition = g))
									: this.TsDebugLog &&
										Log_1.Log.CheckInfo() &&
										Log_1.Log.Info("AI", 6, "    Failed: BackwardFirst");
							}
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("BehaviorTree", 6, "没有配置技能前置条件", [
								"Id",
								T.SkillPreconditionId,
							]);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "没有配置技能库", ["Id", S]);
			}
		return void 0 !== this.SelectedSkillPrecondition;
	}
	OnClear() {
		var t;
		this.AIOwner instanceof TsAiController_1.default &&
			((t =
				this.AIOwner.AiController.CharActorComp.Entity.GetComponent(
					36,
				))?.MoveController.StopMoveToLocation(),
			this.LastDestination?.Reset(),
			AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
			this.TsWalkOff || t?.SetWalkOffLedgeRecord(!0));
	}
}
exports.default = TsTaskSkillWander;
