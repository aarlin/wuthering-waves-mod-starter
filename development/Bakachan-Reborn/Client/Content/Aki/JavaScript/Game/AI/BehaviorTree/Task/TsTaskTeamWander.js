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
	THREADHOLD_ABS = 500,
	THREADHOLD_RATIO = 1.3,
	THREADHOLD_ARRIVE = 10,
	ALLY_DETECT_PERIOD = 1e3,
	TRIGGER_PERIOD = 500,
	NAV_INTERVAL_TIME = 3;
class TsTaskTeamWander extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.AllyDetect = 0),
			(this.TurnSpeed = 0),
			(this.WalkOff = !1),
			(this.IsInitTsVariables = !1),
			(this.TsAllyDetect = 0),
			(this.TsTurnSpeed = 0),
			(this.TsWalkOff = !1),
			(this.CurrentMoveDirect = 4),
			(this.NextDetectAllyTime = -0),
			(this.Destination = void 0),
			(this.LastDestination = void 0),
			(this.TmpDestinationToTarget = void 0),
			(this.TmpSelfToTarget = void 0),
			(this.TmpDirection = void 0),
			(this.TmpVector = void 0),
			(this.TmpVector2 = void 0),
			(this.TmpQuat = void 0),
			(this.BlockDirectionsCache = void 0),
			(this.NextTriggerTime = -0),
			(this.FirstFrame = !1),
			(this.NavigationInterval = 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsAllyDetect = this.AllyDetect),
			(this.TsTurnSpeed = this.TurnSpeed),
			(this.TsWalkOff = this.WalkOff));
	}
	ReceiveExecuteAI(t, e) {
		this.InitTsVariables(),
			(this.CurrentMoveDirect = 4),
			t instanceof TsAiController_1.default &&
				((t = t.AiController),
				this.TsWalkOff ||
					t.CharActorComp.Entity.GetComponent(36)?.SetWalkOffLedgeRecord(!1),
				t.CharActorComp.Entity.CheckGetComponent(158).SetMoveState(
					CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
				),
				this.Destination ||
					((this.Destination = Vector_1.Vector.Create()),
					(this.LastDestination = Vector_1.Vector.Create())),
				this.TmpDestinationToTarget ||
					((this.TmpDestinationToTarget = Vector_1.Vector.Create()),
					(this.TmpSelfToTarget = Vector_1.Vector.Create()),
					(this.TmpVector = Vector_1.Vector.Create()),
					(this.TmpVector2 = Vector_1.Vector.Create()),
					(this.TmpDirection = Vector_1.Vector.Create()),
					(this.TmpQuat = Quat_1.Quat.Create())),
				this.BlockDirectionsCache || (this.BlockDirectionsCache = new Set()),
				(this.NavigationInterval = 3),
				(this.NextDetectAllyTime = 0),
				(this.NextTriggerTime = Time_1.Time.Now),
				(this.FirstFrame = !0));
	}
	ReceiveTickAI(t, e, i) {
		if (
			((this.NavigationInterval += i), t instanceof TsAiController_1.default)
		) {
			var o = (i = t.AiController).AiHateList.GetCurrentTarget();
			if (o?.Valid)
				if ((o = o.Entity.GetComponent(3)))
					if (Time_1.Time.Now < this.NextTriggerTime) {
						o.ActorLocationProxy.Subtraction(
							i.CharActorComp.ActorLocationProxy,
							this.TmpSelfToTarget,
						),
							this.TmpDirection.DeepCopy(this.TmpSelfToTarget);
						const t = i.CharActorComp.Entity.GetComponent(36);
						(t && t.MoveController.IsMovingToLocation()) ||
							this.SetInputParams(
								i.CharActorComp,
								this.TmpSelfToTarget,
								this.TmpDirection,
							);
					} else {
						this.NextTriggerTime = Time_1.Time.Now + 500;
						var r = i.AiTeam.GetAiTeamAreaMemberData(i);
						if (r && !(r.AreaIndex < 0)) {
							if (this.FirstFrame) {
								if (
									((this.FirstFrame = !1),
									AiContollerLibrary_1.AiControllerLibrary.InTeamArea(i, r))
								)
									return void this.Finish(!0);
							} else if (
								AiContollerLibrary_1.AiControllerLibrary.InTeamArea(i, r, 0.5)
							)
								return void this.Finish(!0);
							var a = i.CharActorComp,
								s = o.ActorLocationProxy,
								n =
									(r.CachedControllerYaw + r.AngleCenter) *
									MathUtils_1.MathUtils.DegToRad,
								T =
									((n =
										((this.Destination.X =
											r.CachedTargetLocation.X +
											Math.cos(n) * r.DistanceCenter),
										(this.Destination.Y =
											r.CachedTargetLocation.Y +
											Math.sin(n) * r.DistanceCenter),
										(this.Destination.Z = a.ActorLocationProxy.Z),
										s.Subtraction(
											i.CharActorComp.ActorLocationProxy,
											this.TmpSelfToTarget,
										),
										this.TmpDirection.DeepCopy(this.TmpSelfToTarget),
										s.Subtraction(
											this.Destination,
											this.TmpDestinationToTarget,
										),
										this.TmpSelfToTarget.Size2D())),
									(s = this.TmpDestinationToTarget.Size2D()),
									0 < n
										? this.TmpSelfToTarget.DivisionEqual(n)
										: a.ActorForwardProxy.Multiply(-1, this.TmpSelfToTarget),
									(this.TmpSelfToTarget.Z = 0) < s
										? this.TmpDestinationToTarget.DivisionEqual(s)
										: a.ActorForwardProxy.Multiply(
												-1,
												this.TmpDestinationToTarget,
											),
									(this.TmpDestinationToTarget.Z = 0),
									this.TmpSelfToTarget.DotProduct(this.TmpDestinationToTarget));
							let t = Math.acos(T);
							if (
								((n -= s),
								(s *= t =
									0 <
									(T =
										this.TmpSelfToTarget.X * this.TmpDestinationToTarget.Y -
										this.TmpSelfToTarget.Y * this.TmpDestinationToTarget.X)
										? -t
										: t),
								Time_1.Time.Now > this.NextDetectAllyTime &&
									((this.NextDetectAllyTime = Time_1.Time.Now + 1e3),
									AiContollerLibrary_1.AiControllerLibrary.AllyBlockDirections(
										i,
										this.TmpSelfToTarget,
										this.TsAllyDetect,
										this.BlockDirectionsCache,
									)),
								this.UpdateCurrentMoveDirection(
									n,
									s,
									r,
									this.BlockDirectionsCache,
									a.ActorLocationProxy,
									this.TmpSelfToTarget,
								),
								this.NavigationInterval > 3)
							) {
								if (
									((this.NavigationInterval = 0),
									this.SetMoveToLocation(this.Destination, i.CharActorComp, o))
								)
									return;
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("AI", 43, "TeamWander 寻路失败", [
										"EntityId",
										a.Entity.Id,
									]),
									this.StopMoveToLocation(i.CharActorComp);
							}
							const e = a.Entity.GetComponent(36);
							(e && e.MoveController.IsMovingToLocation()) ||
								this.SetInputParams(a, this.TmpSelfToTarget, this.TmpDirection);
						}
					}
				else this.Finish(!0);
			else this.Finish(!0);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					t.GetClass().GetName(),
				]),
				this.Finish(!1);
	}
	UpdateCurrentMoveDirection(t, e, i, o, r, a) {
		if (t > i.MaxDistanceOffset)
			this.CurrentMoveDirect = this.GetMoveDirectionForwardBackward(t);
		else if (
			e >
			i.MaxAngleOffset * MathUtils_1.MathUtils.DegToRad * i.DistanceCenter
		)
			this.CurrentMoveDirect = this.GetMoveDirectionRightLeft(e);
		else {
			let [i, s] = this.GetMoveDirection(t, e);
			(o.has(s) ||
				AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirectionE(
					this.AIOwner,
					r,
					a,
					s,
				)) &&
				(s = 4),
				(o.has(i) ||
					AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirectionE(
						this.AIOwner,
						r,
						a,
						i,
					)) &&
					((i = s), (s = 4)),
				4 !== s && this.CurrentMoveDirect === s
					? (0 !== this.CurrentMoveDirect && 1 !== this.CurrentMoveDirect) ||
						(this.NeedChangeDirect(t, e) && (this.CurrentMoveDirect = i))
					: (this.CurrentMoveDirect = i);
		}
	}
	StopMoveToLocation(t) {
		(t = t.Entity.GetComponent(36)) &&
			t.MoveController.IsMovingToLocation() &&
			t?.MoveController.StopMoveToLocation(),
			this.LastDestination?.Reset();
	}
	SetMoveToLocation(t, e, i) {
		return (
			this.TmpVector2.DeepCopy(t),
			!!(t = e.Entity.GetComponent(36)) &&
				((!this.LastDestination.IsNearlyZero() ||
					Vector_1.Vector.Dist2D(this.LastDestination, this.TmpVector2) <
						100) &&
				t.MoveController.IsMovingToLocation()
					? (this.LastDestination.DeepCopy(this.TmpVector2), !0)
					: (this.LastDestination.DeepCopy(this.TmpVector2),
						(e =
							(3 === this.CurrentMoveDirect || 2 === this.CurrentMoveDirect) &&
							1 === e.WanderDirectionType),
						t.MoveController.NavigateMoveToLocation(
							{
								Position: this.TmpVector2,
								UseNearestDirection: !e,
								FaceToPosition: e ? void 0 : i.ActorLocationProxy,
								ResetCondition: () => !1,
							},
							!0,
							!1,
						)))
		);
	}
	SetInputParams(t, e, i) {
		4 === this.CurrentMoveDirect
			? AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner)
			: (AiContollerLibrary_1.AiControllerLibrary.GetDirectionVector(
					i,
					this.CurrentMoveDirect,
					this.TmpVector,
				),
				t.Entity.GetComponent(89)?.MoveState !==
				CharacterUnifiedStateTypes_1.ECharMoveState.Walk
					? (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
							t,
							this.TmpVector,
							this.TsTurnSpeed,
						),
						t.SetInputDirect(t.ActorForwardProxy))
					: AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(
							t,
							this.TmpVector,
							this.TmpQuat,
							this.TmpVector2,
							this.TsTurnSpeed,
							!0,
							e,
						));
	}
	GetMoveDirection(t, e) {
		return Math.abs(t) > Math.abs(e)
			? [
					this.GetMoveDirectionForwardBackward(t),
					this.GetMoveDirectionRightLeft(e),
				]
			: [
					this.GetMoveDirectionRightLeft(e),
					this.GetMoveDirectionForwardBackward(t),
				];
	}
	GetMoveDirectionForwardBackward(t) {
		return Math.abs(t) < 10 ? 4 : 0 < t ? 0 : 1;
	}
	GetMoveDirectionRightLeft(t) {
		return Math.abs(t) < 10 ? 4 : 0 < t ? 2 : 3;
	}
	NeedChangeDirect(t, e) {
		return (
			(t = Math.abs(t)) < 10 || (1.3 * t < (e = Math.abs(e)) && t + 500 < e)
		);
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
exports.default = TsTaskTeamWander;
