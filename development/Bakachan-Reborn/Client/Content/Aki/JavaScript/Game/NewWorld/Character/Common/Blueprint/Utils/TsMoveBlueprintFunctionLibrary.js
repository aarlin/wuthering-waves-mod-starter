"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../../Core/Common/Time"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	Quat_1 = require("../../../../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon"),
	TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter"),
	ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
	ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
	CharacterSwimComponent_1 = require("../../Component/CharacterSwimComponent"),
	MIN_ROTATOR_ANGLE = 10,
	MIN_TOLERANCE_ANGLE = 5,
	tmpVector = Vector_1.Vector.Create(),
	tmpVector2 = Vector_1.Vector.Create();
class TsMoveBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static get TmpQuat() {
		return (
			TsMoveBlueprintFunctionLibrary.TmpQuatInternal ||
				(TsMoveBlueprintFunctionLibrary.TmpQuatInternal = Quat_1.Quat.Create()),
			TsMoveBlueprintFunctionLibrary.TmpQuatInternal
		);
	}
	static SetActorRotationWithPriority(t, e, n = !1, o = "unknown") {
		return (
			!!(t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) &&
			t.SetActorRotationWithPriority(e, "BlueprintAPI." + o, 0, !0, n)
		);
	}
	static SetActorLocationWithContext(t, e, n = !1, o = "unknown") {
		return (
			!!(t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) &&
			t.SetActorLocation(e, "BlueprintAPI." + o, n)
		);
	}
	static SetActorLocationAndRotationWithContext(
		t,
		e,
		n,
		o = !1,
		i = "unknown",
	) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) &&
			t.SetActorLocationAndRotation(e, n, "BlueprintAPI." + i, o);
	}
	static SetActorRotationWithContext(t, e, n, o) {
		return (
			!!(t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) &&
			t.SetActorRotation(e, "BlueprintAPI." + o, n)
		);
	}
	static AddActorWorldOffsetWithContext(t, e, n = !0, o = "unknown") {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) &&
			t.AddActorWorldOffset(e, "BlueprintAPI." + o, n);
	}
	static AddActorLocalOffsetWithContext(t, e, n = !0, o = "unknown") {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) &&
			t.AddActorLocalOffset(e, "BlueprintAPI." + o, n);
	}
	static AddActorWorldRotationWithContext(t, e, n = !1, o = "unknown") {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) &&
			t.AddActorWorldRotation(e, "BlueprintAPI." + o, n);
	}
	static AddActorLocalRotationWithContext(t, e, n = !1, o = "unknown") {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) &&
			t.AddActorLocalRotation(e, "BlueprintAPI." + o, n);
	}
	static ActorTeleportToWithContext(t, e, n, o = "unknown") {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) &&
			t.TeleportTo(e, n, "BlueprintAPI." + o);
	}
	static ActorKuroMoveAlongFloorWithContext(t, e, n, o = "unknown") {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) &&
			t.KuroMoveAlongFloor(e, n, "BlueprintAPI." + o);
	}
	static GetInputDirect(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 3)?.InputDirect ??
			Vector_1.Vector.ZeroVector
		);
	}
	static SetInputDirect(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 3)?.SetInputDirect(e);
	}
	static GetInputRotator(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 3)?.InputRotator ??
			Rotator_1.Rotator.ZeroRotator
		);
	}
	static SetInputRotator(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 3)?.SetInputRotator(e);
	}
	static SetCharacterHidden(t, e, n, o) {
		n?.IsValid()
			? ((n = `[蓝图:${n.GetName()}] ` + o),
				(o = EntitySystem_1.EntitySystem.Get(t))?.Valid &&
					ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
						o,
						!e,
						!e,
						!e,
						n,
						!0,
					))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					3,
					"调用SetCharacterHidden失败，因为callObject为空",
				);
	}
	static SetHiddenMovementMode(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 36)?.SetHiddenMovementMode(e);
	}
	static CanResponseInput(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 36)?.CanResponseInput() ?? !1
		);
	}
	static CanJumpPress(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 36)?.CanJumpPress() ?? !1
		);
	}
	static CanWalkPress(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 36)?.CanWalkPress() ?? !1
		);
	}
	static GetHeightAboveGround(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			36,
		)?.GetHeightAboveGround();
	}
	static GetAcceleration(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			36,
		)?.Acceleration.ToUeVector();
	}
	static GetAimYawRate(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 36)?.AimYawRate;
	}
	static GetMovementData(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 36)?.MovementData;
	}
	static SmoothCharacterRotation(t, e, n, o) {
		EntitySystem_1.EntitySystem.GetComponent(t, 36)?.SmoothCharacterRotation(
			e,
			n,
			Time_1.Time.DeltaTimeSeconds,
			!1,
			o,
		);
	}
	static HasMoveInput(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 36)?.HasMoveInput ?? !1;
	}
	static HasMoveInputOrTickIntervalAndModelBuffer(t) {
		var e;
		return (
			!!EntitySystem_1.EntitySystem.GetComponent(t, 36)?.HasMoveInput ||
			(!(
				!(e = EntitySystem_1.EntitySystem.Get(t)) || e.GetTickInterval() <= 1
			) &&
				(EntitySystem_1.EntitySystem.GetComponent(
					t,
					160,
				)?.HasLocationModelBuffer() ??
					!1))
		);
	}
	static HasRotatorInput(t) {
		var e = (t = EntitySystem_1.EntitySystem.GetComponent(t, 3))
			.ActorRotationProxy.Yaw;
		(t = t.InputRotator.Yaw), (e = Math.abs(e - t));
		return !(Math.abs(e - 360) < 5) && e > 10;
	}
	static IsMoving(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 36)?.IsMoving ?? !1;
	}
	static IsJump(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 36)?.IsJump ?? !1;
	}
	static GetSpeed(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 36)?.Speed;
	}
	static GetGroundedTime(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 36)?.GroundedTimeUe;
	}
	static IsFallingIntoWater(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 36)?.IsFallingIntoWater ?? !1
		);
	}
	static SetForceSpeed(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 36)?.SetForceSpeed(e);
	}
	static SetAddMove(t, e, n, o, i) {
		EntitySystem_1.EntitySystem.GetComponent(t, 36)?.SetAddMoveWithMesh(
			e,
			n,
			o,
			i,
		);
	}
	static StopAddMove(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 36)?.StopAddMoveWithMesh(e);
	}
	static FixActorLocation(t, e, n) {
		t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
		var o = new UE.HitResult();
		if (t?.Valid) {
			var i = MathUtils_1.MathUtils.CommonTempVector;
			if (
				(e =
					(i.FromUeVector(e),
					t.FixActorLocation(
						n,
						!0,
						i,
						"TsMoveBlueprintFunctionLibrary.FixActorLocation",
					)))[0]
			)
				return (
					(o.bBlockingHit = !0),
					(o.Location = new UE.Vector(e[1].X, e[1].Y, e[1].Z)),
					o
				);
		}
		return (o.bBlockingHit = !1), o;
	}
	static StopAllAddMove(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 36)?.StopAllAddMove();
	}
	static SetAddMoveWorld(t, e, n, o, i) {
		EntitySystem_1.EntitySystem.GetComponent(t, 36)?.SetAddMoveWorldWithMesh(
			e,
			n,
			o,
			i,
		);
	}
	static SetAddMoveWorldSpeed(t, e, n) {
		EntitySystem_1.EntitySystem.GetComponent(
			t,
			36,
		)?.SetAddMoveWorldSpeedWithMesh(e, n);
	}
	static SetAddMoveOffset(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 36)?.SetAddMoveOffset(e);
	}
	static SetAddMoveRotation(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 36)?.SetAddMoveRotation(e);
	}
	static SetEnterWaterState(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 66)?.SetEnterWaterState(e);
	}
	static GetClimbState(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 31)?.GetClimbState();
	}
	static GetClimbRadius(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 31)?.GetClimbRadius();
	}
	static GetClimbInfo(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 31)?.GetClimbInfo();
	}
	static KickExitCheck(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 31)?.KickExitCheck();
	}
	static CanClimbPress(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 31)?.CanClimbPress() ?? !1
		);
	}
	static OnEnterClimb(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 31)?.OnEnterClimb();
	}
	static OnExitClimb(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 31)?.OnExitClimb();
	}
	static DealClimbUpStart(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 31)?.DealClimbUpStart();
	}
	static FinishClimbDown(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 31)?.FinishClimbDown();
	}
	static DealClimbUpFinish(t) {
		EntitySystem_1.EntitySystem.GetComponent(t, 31)?.DealClimbUpFinish();
	}
	static SetClimbState(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 31)?.SetClimbState(e);
	}
	static SetEnterClimbType(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 31)?.SetEnterClimbType(e);
	}
	static SetExitClimbType(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 31)?.SetExitClimbType(e);
	}
	static GetSwimLocation(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.GetSwimLocation();
	}
	static GetWaterLocation(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.GetWaterLocation();
	}
	static GetWaterVolume(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 66)?.GetWaterVolume() ?? !1
		);
	}
	static GetClimbOnWallAngle(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 31)?.GetOnWallAngle();
	}
	static SetUseDebugMovementSetting(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 36)?.SetUseDebugMovementSetting(
			e,
		);
	}
	static SetDebugMovementSetting(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 36)?.SetDebugMovementSetting(e);
	}
	static SetLockedRotation(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 36)?.SetLockedRotation(e);
	}
	static GetLockedRotation(t) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 36)?.LockedRotation ?? !1
		);
	}
	static SetFallingHorizontalMaxSpeed(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(
			t,
			36,
		)?.SetFallingHorizontalMaxSpeed(e);
	}
	static ClearFallingHorizontalMaxSpeed(t) {
		EntitySystem_1.EntitySystem.GetComponent(
			t,
			36,
		)?.ClearFallingHorizontalMaxSpeed();
	}
	static DetectClimbWithDirect(t, e, n) {
		return (
			EntitySystem_1.EntitySystem.GetComponent(t, 31)?.DetectClimbWithDirect(
				e,
				n,
			) ?? !1
		);
	}
	static TurnToTarget(t, e, n) {
		var o,
			i = EntitySystem_1.EntitySystem.GetComponent(t, 3);
		i &&
			e instanceof TsBaseCharacter_1.default &&
			((o = EntitySystem_1.EntitySystem.GetComponent(t, 160)) &&
				o.StopMontage(),
			(o = i.ActorLocationProxy),
			(i = e.CharacterActorComponent.ActorLocationProxy),
			(e = MathUtils_1.MathUtils.CommonTempVector),
			i.Subtraction(o, e),
			(i = MathUtils_1.MathUtils.CommonTempRotator),
			(o = EntitySystem_1.EntitySystem.GetComponent(t, 36)),
			e.ToOrientationRotator(i),
			o?.SmoothCharacterRotation(i, n, Time_1.Time.DeltaTimeSeconds, !1));
	}
	static GetMonsterMoveDirection(t) {
		return !(t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) ||
			t.InputDirectProxy.IsNearlyZero()
			? 4
			: (t.ActorQuatProxy.Inverse(TsMoveBlueprintFunctionLibrary.TmpQuat),
				TsMoveBlueprintFunctionLibrary.TmpQuat.RotateVector(
					t.InputDirectProxy,
					tmpVector,
				),
				Math.abs(tmpVector.X) > Math.abs(tmpVector.Y)
					? 0 < tmpVector.X
						? 0
						: 1
					: 0 < tmpVector.Y
						? 3
						: 2);
	}
	static GetRoleBody(t) {
		return (t = EntitySystem_1.EntitySystem.GetComponent(t, 3)) &&
			t.CreatureData?.GetEntityType() ===
				Protocol_1.Aki.Protocol.HBs.Proto_Player
			? t.CreatureData.GetRoleConfig().RoleBody
			: "";
	}
	static GetRacingRightSpeed(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 95)?.LastRightSpeed ?? 0;
	}
	static SetPendulumData(t, e, n, o, i, r, m, a, y, s, c, S) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid && t.SetPendulumData(e, n, o, i, r, m, a, y, s, c, S);
	}
	static Reset(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid && t.Reset();
	}
	static SetGrabPoint(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid && (t.GrabPoint = e);
	}
	static GetGrabPoint(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid ? t.GrabPoint : new UE.Vector()
		);
	}
	static SetHooked(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid && (t.Hooked = e);
	}
	static GetHooked(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			!!t?.Valid && t.Hooked
		);
	}
	static SetSocketName(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid && (t.SocketName = e);
	}
	static SetRopeForce(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid && (t.RopeForce = e);
	}
	static GetRopeForce(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid ? t.RopeForce : 0
		);
	}
	static SetDistanceRopeToActor(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid && (t.DistanceRopeToActor = e);
	}
	static GetDistanceRopeToActor(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid ? t.DistanceRopeToActor : 0
		);
	}
	static SetAirControl(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid && (t.AirControl = e);
	}
	static GetAirControl(t) {
		return (
			(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid ? t.AirControl : 0
		);
	}
	static SetUpLength(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
			t?.Valid && (t.UpLength = e);
	}
	static SetCanMoveFromInput(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 36)),
			t?.Valid && (t.CanMoveFromInput = e);
	}
	static UpdateAnimInfoMove(t, e) {
		var n,
			o,
			i = EntitySystem_1.EntitySystem.GetComponent(t, 160);
		i?.Valid &&
			((i = i.AnimLogicParamsSetter),
			(n = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid &&
				((o = n.InputDirectProxy),
				i.InputDirect.Equals(o) ||
					(i.InputDirect.DeepCopy(o), (e.InputDirectRef = o.ToUeVector())),
				(o = n.InputRotatorProxy),
				i.InputRotator.Equals(o) ||
					(i.InputRotator.DeepCopy(o), (e.InputRotatorRef = o.ToUeRotator()))),
			(n = EntitySystem_1.EntitySystem.GetComponent(t, 36))?.Valid &&
				((o = n.Acceleration),
				i.Acceleration.Equals(o) ||
					(i.Acceleration.DeepCopy(o), (e.AccelerationRef = o.ToUeVector())),
				(o = n.IsMoving),
				i.IsMoving !== o && ((i.IsMoving = o), (e.IsMovingRef = o)),
				(o = n.HasMoveInput),
				i.HasMoveInput !== o && ((i.HasMoveInput = o), (e.HasMoveInputRef = o)),
				(o = n.Speed),
				i.Speed !== o && ((i.Speed = o), (e.SpeedRef = o)),
				(o = n.IsJump),
				i.IsJump !== o && ((i.IsJump = o), (e.IsJumpRef = o)),
				(o = n.GroundedTimeUe),
				i.GroundedTime !== o && ((i.GroundedTime = o), (e.GroundedTimeRef = o)),
				(o = n.IsFallingIntoWater),
				i.IsFallingIntoWater !== o &&
					((i.IsFallingIntoWater = o), (e.IsFallingIntoWaterRef = o)),
				(o = n.JumpUpRate),
				i.JumpUpRate !== o) &&
				((i.JumpUpRate = o), (e.JumpUpRateRef = o)),
			(n = EntitySystem_1.EntitySystem.GetComponent(t, 31))?.Valid &&
				((o = n.GetTsClimbInfo()),
				i.ClimbInfo.Equals(o) ||
					(i.ClimbInfo.DeepCopy(o), (e.ClimbInfoRef = n.GetClimbInfo())),
				(o = n.GetTsClimbState()),
				i.ClimbState.Equals(o) ||
					(i.ClimbState.DeepCopy(o), (e.ClimbStateRef = n.GetClimbState())),
				(o = n.GetClimbRadius()),
				i.ClimbRadius !== o && ((i.ClimbRadius = o), (e.ClimbRadiusRef = o)),
				(o = n.GetOnWallAngle()),
				i.ClimbOnWallAngle !== o) &&
				((i.ClimbOnWallAngle = o), (e.ClimbOnWallAngleRef = o)),
			(n = EntitySystem_1.EntitySystem.GetComponent(t, 66))?.Valid &&
				((o = n.SprintSwimOffset),
				i.SprintSwimOffset !== o &&
					((i.SprintSwimOffset = o), (e.SprintSwimOffsetRef = o)),
				(o = n.SprintSwimOffsetLerpSpeed),
				i.SprintSwimOffsetLerpSpeed !== o) &&
				((i.SprintSwimOffsetLerpSpeed = o),
				(e.SprintSwimOffsetLerpSpeedRef = o)),
			(n = EntitySystem_1.EntitySystem.GetComponent(t, 32))?.Valid) &&
			((o = n.SlideForward),
			i.SlideForward.Equals(o) ||
				(i.SlideForward.DeepCopy(o), (e.SlideForwardRef = o.ToUeVector())),
			(t = n.SlideSwitchThisFrame),
			i.SlideSwitchThisFrame !== t &&
				((i.SlideSwitchThisFrame = t), (e.SlideSwitchThisFrameRef = t)),
			(o = n.StandMode),
			i.SlideStandMode !== o) &&
			((i.SlideStandMode = o), (e.SlideStandModeRef = o));
	}
	static UpdateAnimInfoMoveMonster(t, e) {
		var n,
			o = EntitySystem_1.EntitySystem.GetComponent(t, 160);
		o?.Valid &&
			((o = o.AnimLogicParamsSetter),
			(n = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid &&
				((n = n.InputDirectProxy),
				o.InputDirect.Equals(n) ||
					(o.InputDirect.DeepCopy(n), (e.InputDirectRef = n.ToUeVector()))),
			(n = EntitySystem_1.EntitySystem.GetComponent(t, 36))?.Valid) &&
			((t = n.IsMoving),
			o.IsMoving !== t && ((o.IsMoving = t), (e.IsMovingRef = t)),
			(t = n.HasMoveInput),
			o.HasMoveInput !== t) &&
			((o.HasMoveInput = t), (e.HasMoveInputRef = t));
	}
	static UpdateAnimInfoMoveRoleNpc(t, e) {
		var n,
			o = EntitySystem_1.EntitySystem.GetComponent(t, 160);
		o?.Valid &&
			((o = o.AnimLogicParamsSetter),
			(n = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid &&
				((n = n.InputDirectProxy),
				o.InputDirect.Equals(n) ||
					(o.InputDirect.DeepCopy(n), (e.InputDirectRef = n.ToUeVector()))),
			(n = EntitySystem_1.EntitySystem.GetComponent(t, 36))?.Valid) &&
			((t = n.Acceleration),
			o.Acceleration.Equals(t) ||
				(o.Acceleration.DeepCopy(t), (e.AccelerationRef = t.ToUeVector())),
			(t = n.IsMoving),
			o.IsMoving !== t && ((o.IsMoving = t), (e.IsMovingRef = t)),
			(t = n.HasMoveInput),
			o.HasMoveInput !== t && ((o.HasMoveInput = t), (e.HasMoveInputRef = t)),
			(t = n.Speed),
			o.Speed !== t) &&
			((o.Speed = t), (e.SpeedRef = t));
	}
	static TurnOnAutomaticFlightMode(t, e) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 52)),
			t?.Valid && t.TurnOnAutomaticFlightMode(e);
	}
	static TurnOffAutomaticFlightMode(t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t, 52)),
			t?.Valid && t.TurnOffAutomaticFlightMode();
	}
	static get WaterTrace() {
		var t;
		return (
			TsMoveBlueprintFunctionLibrary.WaterTraceInternal ||
				(((t = UE.NewObject(UE.TraceLineElement.StaticClass())).bIsSingle = !0),
				(t.bIgnoreSelf = !0),
				t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
				TraceElementCommon_1.TraceElementCommon.SetTraceColor(
					t,
					ColorUtils_1.ColorUtils.LinearGreen,
				),
				TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
					t,
					ColorUtils_1.ColorUtils.LinearRed,
				),
				(TsMoveBlueprintFunctionLibrary.WaterTraceInternal = t)),
			TsMoveBlueprintFunctionLibrary.WaterTraceInternal
		);
	}
	static get GroundTrace() {
		var t;
		return (
			TsMoveBlueprintFunctionLibrary.GroundTraceInternal ||
				(((t = UE.NewObject(UE.TraceLineElement.StaticClass())).bIsSingle = !0),
				(t.bIgnoreSelf = !0),
				t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
				TraceElementCommon_1.TraceElementCommon.SetTraceColor(
					t,
					ColorUtils_1.ColorUtils.LinearGreen,
				),
				TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
					t,
					ColorUtils_1.ColorUtils.LinearRed,
				),
				(TsMoveBlueprintFunctionLibrary.GroundTraceInternal = t)),
			TsMoveBlueprintFunctionLibrary.GroundTraceInternal
		);
	}
	static SimpleSwim(t, e, n, o) {
		if (((t = EntitySystem_1.EntitySystem.GetComponent(t, 3)), !t?.Valid))
			return Vector_1.Vector.ZeroVector;
		var i = TsMoveBlueprintFunctionLibrary.WaterTrace;
		(i.WorldContextObject = t.Actor),
			t.ActorUpProxy.Multiply(n, tmpVector),
			tmpVector.AdditionEqual(t.ActorLocationProxy),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, tmpVector),
			t.ActorUpProxy.Multiply(-t.ScaledHalfHeight, tmpVector),
			tmpVector.AdditionEqual(t.ActorLocationProxy),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, tmpVector);
		let r = 0;
		if (TraceElementCommon_1.TraceElementCommon.LineTrace(i, "SimpleSwim"))
			((n = TsMoveBlueprintFunctionLibrary.GroundTrace).WorldContextObject =
				t.Actor),
				TraceElementCommon_1.TraceElementCommon.GetHitLocation(
					i.HitResult,
					0,
					tmpVector,
				),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, tmpVector),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					n,
					t.ActorLocationProxy,
				),
				TraceElementCommon_1.TraceElementCommon.LineTrace(
					n,
					"SimpleSwim_Ground",
				) ||
					(tmpVector.SubtractionEqual(t.ActorLocationProxy),
					(r = MathUtils_1.MathUtils.Clamp(
						(tmpVector.DotProduct(t.ActorUpProxy) / t.ScaledHalfHeight) * 0.5 +
							0.5,
						0,
						1,
					)));
		else if (
			(((i = TsMoveBlueprintFunctionLibrary.GroundTrace).WorldContextObject =
				t.Actor),
			t.ActorUpProxy.Multiply(-t.ScaledHalfHeight - 2, tmpVector),
			tmpVector.AdditionEqual(t.ActorLocationProxy),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				i,
				t.ActorLocationProxy,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, tmpVector),
			TraceElementCommon_1.TraceElementCommon.LineTrace(i, "SimpleSwim_Ground"))
		)
			return Vector_1.Vector.ZeroVector;
		return (
			tmpVector.FromUeVector(o),
			(n = t.Entity.GetComponent(36)),
			n?.Valid
				? t.ActorUpProxy.Multiply(
						n.CharacterMovement.GetGravityZ() *
							e *
							(1 - r * CharacterSwimComponent_1.SWIMMING_BUOYANCY),
						tmpVector2,
					)
				: t.ActorUpProxy.Multiply(
						-1960 * e * (1 - r * CharacterSwimComponent_1.SWIMMING_BUOYANCY),
						tmpVector2,
					),
			tmpVector2.AdditionEqual(tmpVector),
			tmpVector2.MultiplyEqual(
				Math.pow(CharacterSwimComponent_1.SWIMMING_DECELERATION, e),
			),
			tmpVector.AdditionEqual(tmpVector2),
			tmpVector.MultiplyEqual(0.5 * e),
			n?.Valid
				? n.MoveCharacter(tmpVector, e, "SimpleSwim")
				: t.AddActorWorldOffset(tmpVector.ToUeVector(), "SimpleSwim", !0),
			tmpVector2.ToUeVector()
		);
	}
}
(TsMoveBlueprintFunctionLibrary.TmpQuatInternal = Quat_1.Quat.Create()),
	(TsMoveBlueprintFunctionLibrary.WaterTraceInternal = void 0),
	(TsMoveBlueprintFunctionLibrary.GroundTraceInternal = void 0),
	(exports.default = TsMoveBlueprintFunctionLibrary);
