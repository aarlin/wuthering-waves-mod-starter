"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
	JUMPED_TURN_SPEED_THREADHOLD = 100,
	ACTIVE_DISTANCE = 5e3;
class NavigationErrorData {
	constructor() {
		(this.Start = void 0), (this.End = void 0), (this.Results = void 0);
	}
}
class TsCharacterDebugComponent extends UE.ActorComponent {
	constructor() {
		super(...arguments),
			(this.BaseChar = void 0),
			(this.MaxFixSpeed = 0),
			(this.OriginWalkableAngle = 0),
			(this.DebugRiseModeOn = !1),
			(this.StaticInit = !1),
			(this.StaticAttrId = 0),
			(this.StaticAiId = ""),
			(this.DebugCreatureId = void 0),
			(this.DebugEntityId = 0),
			(this.TestRiseSpeed = -0),
			(this.DebugInteractCount = 0),
			(this.BehaviorTree = void 0),
			(this.PatrolSpline = void 0),
			(this.EnterClimbTrace = 0),
			(this.DebugPatrolPoints = void 0),
			(this.DebugNavigationErrorPaths = void 0),
			(this.VaultClimbTrace = 0),
			(this.UpArriveClimbTrace = 0),
			(this.ClimbingTrace = 0),
			(this.NoTop = !1);
	}
	Destroy() {
		this.BaseChar = void 0;
	}
	SetMovementDebug(e) {
		this.BaseChar.CharacterActorComponent.Entity.GetComponent(27).SetDebug(e);
	}
	ChangeEnterClimbTrace() {
		switch (this.EnterClimbTrace) {
			case 0:
				this.EnterClimbTrace = 1;
				break;
			case 1:
				this.EnterClimbTrace = 2;
				break;
			default:
				this.EnterClimbTrace = 0;
		}
		this.BaseChar.CharacterActorComponent.Entity.GetComponent(
			31,
		).UpdateClimbDebug();
	}
	ChangeVaultClimbTrace() {
		switch (this.VaultClimbTrace) {
			case 0:
				this.VaultClimbTrace = 1;
				break;
			case 1:
				this.VaultClimbTrace = 2;
				break;
			default:
				this.VaultClimbTrace = 0;
		}
		this.BaseChar.CharacterActorComponent.Entity.GetComponent(
			31,
		).UpdateClimbDebug();
	}
	ChangeUpArriveClimbTrace() {
		switch (this.UpArriveClimbTrace) {
			case 0:
				this.UpArriveClimbTrace = 1;
				break;
			case 1:
				this.UpArriveClimbTrace = 2;
				break;
			default:
				this.UpArriveClimbTrace = 0;
		}
		this.BaseChar.CharacterActorComponent.Entity.GetComponent(
			31,
		).UpdateClimbDebug();
	}
	ChangeClimbingTrace() {
		0 === this.ClimbingTrace
			? (this.ClimbingTrace = 1)
			: (this.ClimbingTrace = 0),
			this.BaseChar.CharacterActorComponent.Entity.GetComponent(
				31,
			).UpdateClimbDebug();
	}
	ChangeNoTop() {
		(this.NoTop = !this.NoTop),
			this.BaseChar.CharacterActorComponent.Entity.GetComponent(
				31,
			).UpdateClimbDebug();
	}
	ReceiveBeginPlay() {
		(this.BaseChar = this.GetOwner()),
			(this.OriginWalkableAngle =
				this.BaseChar.CharacterMovement.K2_GetWalkableFloorAngle()),
			(this.DebugRiseModeOn = !1),
			this.SetComponentTickEnabled(this.DebugRiseModeOn);
	}
	ReceiveTick(e) {
		this.DebugRising(e);
	}
	ActivateDebugSpeed(e) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Character", 40, "[Debug功能] 快速移动", ["功能激活", e]),
			e
				? (this.BaseChar.CharacterMovement.SetWalkableFloorAngle(90),
					0 === this.MaxFixSpeed && (this.MaxFixSpeed = 5e3))
				: (this.BaseChar.CharacterMovement.SetWalkableFloorAngle(
						this.OriginWalkableAngle,
					),
					0 !== this.MaxFixSpeed && (this.MaxFixSpeed = 0));
	}
	DebugRising(e) {
		var t;
		this.DebugRiseModeOn &&
			(((t = Vector_1.Vector.Create(
				this.BaseChar.CharacterActorComponent.ActorLocation,
			)).Z += this.TestRiseSpeed * e),
			this.BaseChar.K2_SetActorLocation(t.ToUeVector(), !1, void 0, !1),
			this.BaseChar.CharacterMovement.Velocity.Set(0, 0, 0));
	}
	DebugDrawActivateArea() {
		var e = this.BaseChar.CharacterActorComponent.ActorLocation,
			t = new UE.Vector(e);
		(t.Z += 100), UE.KismetSystemLibrary.DrawDebugCylinder(this, e, t, 5e3);
	}
	SetDebugRiseEnable(e) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Character", 40, "[Debug功能] 飞行", ["功能激活", e]),
			this.DebugRiseModeOn !== e &&
				((this.DebugRiseModeOn = e), this.SetComponentTickEnabled(e));
	}
	SaveDebugPatrolPoint(e) {
		this.DebugPatrolPoints || (this.DebugPatrolPoints = new Array()),
			this.DebugPatrolPoints.push(Vector_1.Vector.Create(e));
	}
	ClearDebugPatrolPoints() {
		this.DebugPatrolPoints && (this.DebugPatrolPoints.length = 0);
	}
	DrawDebugPatrolPoints() {
		if (this.DebugPatrolPoints && 0 !== this.DebugPatrolPoints.length) {
			var e = this.DebugPatrolPoints[0],
				t =
					(UE.KismetSystemLibrary.DrawDebugSphere(
						this,
						e.ToUeVector(),
						18,
						12,
						ColorUtils_1.ColorUtils.LinearCyan,
						60,
					),
					this.DebugPatrolPoints.length - 1);
			for (let e = 1; e < t; e++) {
				var r = this.DebugPatrolPoints[e];
				UE.KismetSystemLibrary.DrawDebugSphere(
					this,
					r.ToUeVector(),
					6,
					4,
					ColorUtils_1.ColorUtils.LinearGreen,
					60,
				);
			}
			0 < t &&
				((e = this.DebugPatrolPoints[t]),
				UE.KismetSystemLibrary.DrawDebugSphere(
					this,
					e.ToUeVector(),
					18,
					12,
					ColorUtils_1.ColorUtils.LinearYellow,
					60,
				));
		}
	}
	SaveErrorNavigationPath(e, t, r) {
		this.DebugNavigationErrorPaths ||
			(this.DebugNavigationErrorPaths = new Array());
		var i = new NavigationErrorData();
		(i.Start = Vector_1.Vector.Create(e)),
			(i.End = Vector_1.Vector.Create(t)),
			(i.Results = new Array());
		for (let e = 0, t = r.length; e < t; e++) {
			var a = r[e],
				o = new UE.Vector();
			o.Set(a.X, a.Y, a.Z), i.Results.push(o);
		}
		this.DebugNavigationErrorPaths.push(i);
	}
	DrawErrorNavigationPaths() {
		if (this.DebugNavigationErrorPaths)
			for (let r = 0, i = this.DebugNavigationErrorPaths.length; r < i; r++) {
				var e = this.DebugNavigationErrorPaths[r];
				UE.KismetSystemLibrary.DrawDebugSphere(
					this,
					e.Start.ToUeVector(),
					18,
					12,
					ColorUtils_1.ColorUtils.LinearCyan,
					60,
				);
				for (let r = 0, i = e.Results.length; r < i; r++) {
					var t = e.Results[r];
					UE.KismetSystemLibrary.DrawDebugSphere(
						this,
						t,
						6,
						4,
						ColorUtils_1.ColorUtils.LinearRed,
						60,
					);
				}
				UE.KismetSystemLibrary.DrawDebugSphere(
					this,
					e.End.ToUeVector(),
					18,
					12,
					ColorUtils_1.ColorUtils.LinearYellow,
					60,
				);
			}
	}
	AiDebugDraw() {
		var e = this.BaseChar.Controller;
		e instanceof UE.TsAiController_C && e.ChangeDebugDraw();
	}
}
exports.default = TsCharacterDebugComponent;
