"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	Quat_1 = require("../../../../Core/Utils/Math/Quat"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
	TsAiController_1 = require("../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
	MAX_DISTANCE_INDEX = 4,
	SUM_WEIGHT = 100,
	TRIGGER_PERIOD = 500,
	NAV_INTERVAL_TIME = 3;
class TsTaskBattleWander extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.MoveState = 0),
			(this.AllyDetect = 0),
			(this.WalkOff = !1),
			(this.IsInitTsVariables = !1),
			(this.TsMoveState = 0),
			(this.TsAllyDetect = 0),
			(this.TsWalkOff = !1),
			(this.DistanceIndex = 0),
			(this.DirectIndex = 4),
			(this.EndTime = -0),
			(this.NextPickDirectTime = -0),
			(this.TmpVector = void 0),
			(this.TmpOffset = void 0),
			(this.TmpDirection = void 0),
			(this.TmpVector2 = void 0),
			(this.LastDestination = void 0),
			(this.TmpQuat = void 0),
			(this.NextTriggerTime = -0),
			(this.NavigationInterval = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsMoveState = this.MoveState),
			(this.TsAllyDetect = this.AllyDetect),
			(this.TsWalkOff = this.WalkOff));
	}
	ReceiveExecuteAI(t, e) {
		this.InitTsVariables(),
			(this.DistanceIndex = 4),
			t instanceof TsAiController_1.default &&
				((t = t.AiController),
				this.TsWalkOff ||
					t.CharActorComp.Entity.GetComponent(161)?.SetWalkOffLedgeRecord(!1),
				t.AiWanderInfos?.AiBattleWanderGroups?.length
					? (this.TmpVector ||
							((this.TmpVector = Vector_1.Vector.Create()),
							(this.TmpOffset = Vector_1.Vector.Create()),
							(this.TmpVector2 = Vector_1.Vector.Create()),
							(this.TmpDirection = Vector_1.Vector.Create()),
							(this.TmpQuat = Quat_1.Quat.Create()),
							(this.LastDestination = Vector_1.Vector.Create())),
						(this.EndTime =
							Time_1.Time.WorldTime +
							t.AiWanderInfos.RandomBattleWanderEndTime()),
						(t.AiWanderInfos.BattleWanderAddTime = 0),
						(this.NextPickDirectTime = 0),
						(this.NextTriggerTime = 0),
						(this.NavigationInterval = 3),
						(this.DistanceIndex = -1),
						(this.DirectIndex = 4))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "没有配置战斗游荡", [
							"AiBaseId",
							t.AiBase.Id,
						]));
	}
	ReceiveTickAI(t, e, i) {
		var r, o, s, a;
		(this.NavigationInterval += i),
			t instanceof TsAiController_1.default
				? (i = t.AiController).AiWanderInfos?.AiBattleWanderGroups?.length
					? this.EndTime + i.AiWanderInfos.BattleWanderAddTime <
						Time_1.Time.WorldTime
						? this.Finish(!0)
						: ((r = this.GetWanderData(i)),
							(o = i.CharActorComp),
							(s = i.AiHateList.GetCurrentTarget())?.Valid &&
							(s = s.Entity.GetComponent(3))
								? Time_1.Time.Now < this.NextTriggerTime
									? this.SetInputParams(t.AiController.CharActorComp, s, r)
									: ((this.NextTriggerTime = Time_1.Time.Now + 500),
										s.ActorLocationProxy.Subtraction(
											o.ActorLocationProxy,
											this.TmpOffset,
										),
										(this.TmpOffset.Z = 0),
										(a = this.TmpOffset.Size()) <
										MathUtils_1.MathUtils.SmallNumber
											? (o.ActorForwardProxy.Multiply(-1, this.TmpVector),
												o.SetInputDirect(this.TmpVector))
											: (a <= r.DistanceRange[0]
													? ((this.DistanceIndex = 0), (this.DirectIndex = 1))
													: a > r.DistanceRange[3]
														? ((this.DistanceIndex = 4), (this.DirectIndex = 0))
														: this.NextPickDirectTime < Time_1.Time.WorldTime &&
															(this.PickDirect(i, r),
															(this.NextPickDirectTime =
																Time_1.Time.WorldTime +
																MathUtils_1.MathUtils.GetRandomRange(
																	r.WanderTime.Min,
																	r.WanderTime.Max,
																))),
												this.SetInputParams(
													t.AiController.CharActorComp,
													s,
													r,
												)))
								: this.Finish(!1))
					: this.Finish(!1)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
							"Type",
							t.GetClass().GetName(),
						]),
					this.Finish(!1));
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
	GetWanderData(t) {
		return t.AiWanderInfos.GetCurrentBattleWander();
	}
	PickDirect(t, e) {
		var i = t.AiHateList.GetCurrentTarget(),
			r = t.CharActorComp;
		if (!i?.Valid) return !1;
		if (!(i = i.Entity.GetComponent(3))) return !1;
		i.ActorLocationProxy.Subtraction(r.ActorLocationProxy, this.TmpOffset),
			(this.TmpOffset.Z = 0);
		r = this.TmpOffset.Size2D() - r.ScaledRadius - i.ScaledRadius;
		var o =
			((this.DistanceIndex = this.FindDistanceIndexByDistance(e, r)),
			this.FindDirectByWeights(e),
			this.CheckNavigationAndAllyBlock(t, this.TmpOffset, r),
			t.CharAiDesignComp.Entity.GetComponent(158));
		if (o.Valid)
			switch (this.TsMoveState) {
				case 1:
					o.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
					break;
				case 2:
					o.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
					break;
				case 3:
					o.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Sprint);
			}
		return !0;
	}
	FindDistanceIndexByDistance(t, e) {
		let i = 0;
		for (; i < 4 && !(e <= t.DistanceRange[i]); ++i);
		return i;
	}
	FindDirectByWeights(t) {
		if (0 === this.DistanceIndex) this.DirectIndex = 1;
		else if (4 === this.DistanceIndex) this.DirectIndex = 0;
		else {
			let e = new Array();
			switch (this.DistanceIndex) {
				case 1:
					e = t.NearActionRates;
					break;
				case 2:
					e = t.MiddleActionRates;
					break;
				default:
					e = t.FarActionRates;
			}
			let i = MathUtils_1.MathUtils.GetRandomRange(0, 100);
			for (
				this.DirectIndex = 0;
				this.DirectIndex < e.length && i >= e[this.DirectIndex];
			)
				(i -= e[this.DirectIndex]), ++this.DirectIndex;
		}
	}
	CheckNavigationAndAllyBlock(t, e, i) {
		if (4 !== this.DirectIndex && !(i <= MathUtils_1.MathUtils.SmallNumber))
			if (
				(this.TmpVector || (this.TmpVector = Vector_1.Vector.Create()),
				this.TmpVector.DeepCopy(e),
				this.TmpVector.DivisionEqual(i),
				AiContollerLibrary_1.AiControllerLibrary.AllyOnPath(
					t,
					this.TmpVector,
					this.TsAllyDetect,
					this.DirectIndex,
				))
			)
				this.DirectIndex = 4;
			else
				switch (this.DirectIndex) {
					case 0:
						break;
					case 1:
						(this.TmpVector.X = -this.TmpVector.X),
							(this.TmpVector.Y = -this.TmpVector.Y);
						break;
					case 2:
						var r = this.TmpVector.X;
						(this.TmpVector.X = -this.TmpVector.Y), (this.TmpVector.Y = r);
						break;
					case 3:
						(r = -this.TmpVector.X),
							(this.TmpVector.X = this.TmpVector.Y),
							(this.TmpVector.Y = r);
				}
	}
	SetInputParams(t, e, i) {
		switch (
			(this.TmpOffset ||
				((this.TmpOffset = Vector_1.Vector.Create()),
				(this.TmpVector2 = Vector_1.Vector.Create()),
				(this.TmpQuat = Quat_1.Quat.Create())),
			e.ActorLocationProxy.Subtraction(t.ActorLocationProxy, this.TmpOffset),
			this.TmpDirection.DeepCopy(this.TmpOffset),
			this.DirectIndex)
		) {
			case 0:
				break;
			case 1:
				(this.TmpOffset.X = -this.TmpOffset.X),
					(this.TmpOffset.Y = -this.TmpOffset.Y);
				break;
			case 3:
				var r = this.TmpOffset.X;
				(this.TmpOffset.X = this.TmpOffset.Y), (this.TmpOffset.Y = -r);
				break;
			case 2:
				(r = this.TmpOffset.X),
					(this.TmpOffset.X = -this.TmpOffset.Y),
					(this.TmpOffset.Y = r);
		}
		if (
			((i =
				2 === this.TsMoveState
					? i.RunTurnSpeed
					: i.TurnSpeeds[this.DirectIndex]),
			this.NavigationInterval > 3)
		) {
			if (
				((this.NavigationInterval = 0),
				this.SetMoveToLocation(this.TmpOffset, t, i, e.ActorLocationProxy))
			)
				return;
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("AI", 43, "BattleWander 寻路失败", [
					"EntityId",
					t.Entity.Id,
				]),
				this.StopMoveToLocation(t);
		}
		4 !== this.DirectIndex &&
		AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirectionE(
			this.AIOwner,
			t.ActorLocationProxy,
			t.ActorForwardProxy,
			this.DirectIndex,
		)
			? ((this.DirectIndex = 4), t.ClearInput())
			: ((e = t.Entity.GetComponent(36)) &&
					e.MoveController.IsMovingToLocation()) ||
				(t.Entity.GetComponent(89)?.MoveState !==
				CharacterUnifiedStateTypes_1.ECharMoveState.Walk
					? (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
							t,
							this.TmpOffset,
							i,
						),
						t.SetInputDirect(t.ActorForwardProxy))
					: AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(
							t,
							this.TmpOffset,
							this.TmpQuat,
							this.TmpVector2,
							i,
							!0,
							this.TmpDirection,
						));
	}
	StopMoveToLocation(t) {
		(t = t.Entity.GetComponent(36)) &&
			t.MoveController.IsMovingToLocation() &&
			t?.MoveController.StopMoveToLocation(),
			this.LastDestination?.Reset();
	}
	SetMoveToLocation(t, e, i, r) {
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
						(e =
							(3 === this.DirectIndex || 2 === this.DirectIndex) &&
							1 === e.WanderDirectionType),
						t.MoveController.NavigateMoveToLocation(
							{
								Position: this.TmpVector2,
								TurnSpeed: i,
								UseNearestDirection: !e,
								FaceToPosition: e ? void 0 : r,
								ResetCondition: () => !1,
							},
							!0,
							!1,
						)))
		);
	}
}
exports.default = TsTaskBattleWander;
