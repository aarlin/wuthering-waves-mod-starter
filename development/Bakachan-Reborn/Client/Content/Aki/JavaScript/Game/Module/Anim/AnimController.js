"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimController = void 0);
const cpp_1 = require("cpp"),
	Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
class AnimController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Controller", 25, "AnimController.OnInit"),
			cpp_1.UKuroAnimJsSubsystem.RegisterUpdateAnimInfoFunction(
				GlobalData_1.GlobalData.GameInstance,
				AnimController.UpdateAnimInfo,
			),
			!0
		);
	}
	static OnClear() {
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Controller", 25, "AnimController.OnClear"),
			cpp_1.UKuroAnimJsSubsystem.UnregisterUpdateAnimInfoFunction(
				GlobalData_1.GlobalData.GameInstance,
			),
			!0
		);
	}
	static RegisterUpdateAnimInfoEntity(e) {
		cpp_1.UKuroAnimJsSubsystem.RegisterEntity(
			GlobalData_1.GlobalData.GameInstance,
			e,
		);
	}
	static UnregisterUpdateAnimInfoEntity(e) {
		cpp_1.UKuroAnimJsSubsystem.UnregisterEntity(
			GlobalData_1.GlobalData.GameInstance,
			e,
		);
	}
	static UpdateAnimInfoMove(e) {
		var t,
			n,
			i,
			o = EntitySystem_1.EntitySystem.GetComponent(e, 160);
		o?.Valid &&
			((t = o.MainAnimInstance.LogicParams),
			(o = o.AnimLogicParamsSetter),
			(n = EntitySystem_1.EntitySystem.GetComponent(e, 3))?.Valid &&
				((i = n.InputDirectProxy),
				o.InputDirect.Equals(i) ||
					(o.InputDirect.DeepCopy(i), (t.InputDirectRef = i.ToUeVector())),
				(i = n.InputRotatorProxy),
				o.InputRotator.Equals(i) ||
					(o.InputRotator.DeepCopy(i), (t.InputRotatorRef = i.ToUeRotator()))),
			(n = EntitySystem_1.EntitySystem.GetComponent(e, 36))?.Valid &&
				((i = n.Acceleration),
				o.Acceleration.Equals(i) ||
					(o.Acceleration.DeepCopy(i), (t.AccelerationRef = i.ToUeVector())),
				(i = n.IsMoving),
				o.IsMoving !== i && ((o.IsMoving = i), (t.IsMovingRef = i)),
				(i = n.HasMoveInput),
				o.HasMoveInput !== i && ((o.HasMoveInput = i), (t.HasMoveInputRef = i)),
				(i = n.Speed),
				o.Speed !== i && ((o.Speed = i), (t.SpeedRef = i)),
				(i = n.IsJump),
				o.IsJump !== i && ((o.IsJump = i), (t.IsJumpRef = i)),
				(i = n.GroundedTimeUe),
				o.GroundedTime !== i && ((o.GroundedTime = i), (t.GroundedTimeRef = i)),
				(i = n.IsFallingIntoWater),
				o.IsFallingIntoWater !== i &&
					((o.IsFallingIntoWater = i), (t.IsFallingIntoWaterRef = i)),
				(i = n.JumpUpRate),
				o.JumpUpRate !== i && ((o.JumpUpRate = i), (t.JumpUpRateRef = i)),
				(i = n.ForceExitStateStop),
				o.ForceExitStateStop !== i) &&
				((o.ForceExitStateStop = i), (t.ForceExitStateStopRef = i)),
			(n = EntitySystem_1.EntitySystem.GetComponent(e, 31))?.Valid &&
				((i = n.GetTsClimbInfo()),
				o.ClimbInfo.Equals(i) ||
					(o.ClimbInfo.DeepCopy(i), (t.ClimbInfoRef = n.GetClimbInfoNew())),
				(i = n.GetTsClimbState()),
				o.ClimbState.Equals(i) ||
					(o.ClimbState.DeepCopy(i), (t.ClimbStateRef = n.GetClimbStateNew())),
				(i = n.GetOnWallAngle()),
				o.ClimbOnWallAngle !== i) &&
				((o.ClimbOnWallAngle = i), (t.ClimbOnWallAngleRef = i)),
			(n = EntitySystem_1.EntitySystem.GetComponent(e, 66))?.Valid &&
				((i = n.SprintSwimOffset),
				o.SprintSwimOffset !== i &&
					((o.SprintSwimOffset = i), (t.SprintSwimOffsetRef = i)),
				(i = n.SprintSwimOffsetLerpSpeed),
				o.SprintSwimOffsetLerpSpeed !== i) &&
				((o.SprintSwimOffsetLerpSpeed = i),
				(t.SprintSwimOffsetLerpSpeedRef = i)),
			(n = EntitySystem_1.EntitySystem.GetComponent(e, 32))?.Valid &&
				((i = n.SlideForward),
				o.SlideForward.Equals(i) ||
					(o.SlideForward.DeepCopy(i), (t.SlideForwardRef = i.ToUeVector())),
				(i = n.SlideSwitchThisFrame),
				o.SlideSwitchThisFrame !== i &&
					((o.SlideSwitchThisFrame = i), (t.SlideSwitchThisFrameRef = i)),
				(i = n.StandMode),
				o.SlideStandMode !== i) &&
				((o.SlideStandMode = i), (t.SlideStandModeRef = i)),
			(n = EntitySystem_1.EntitySystem.GetComponent(e, 95))?.Valid) &&
			((i = n.Active), o.IsInSplineMove !== i) &&
			((o.IsInSplineMove = i), (t.bIsInSplineMove = i));
	}
	static UpdateAnimInfoMeshAnim(e) {
		var t,
			n,
			i,
			o = EntitySystem_1.EntitySystem.GetComponent(e, 160);
		o?.Valid &&
			((t = o.MainAnimInstance.LogicParams),
			(n = o.AnimLogicParamsSetter),
			(i = o.BattleIdleEndTime),
			n.BattleIdleTime !== i &&
				((n.BattleIdleTime = i), (t.BattleIdleTimeRef = i)),
			(i = o.DegMovementSlope),
			n.DegMovementSlope !== i &&
				((n.DegMovementSlope = i), (t.DegMovementSlopeRef = i)),
			(i = o.GetTsSightDirect()),
			n.SightDirect.Equals(i) ||
				(n.SightDirect.DeepCopy(i), (t.SightDirectRef = i.ToUeVector())),
			(o = EntitySystem_1.EntitySystem.GetComponent(e, 61))) &&
			((i = o.GetRagRollQuitState()), n.RagQuitState !== i) &&
			((n.RagQuitState = i), (t.RagQuitStateRef = i));
	}
	static UpdateAnimInfoHit(e) {
		var t,
			n,
			i,
			o = EntitySystem_1.EntitySystem.GetComponent(e, 160);
		o?.Valid &&
			(e = EntitySystem_1.EntitySystem.GetComponent(e, 51)) &&
			((t = o.MainAnimInstance.LogicParams),
			(o = o.AnimLogicParamsSetter),
			(n = e.GetAcceptedNewBeHitAndReset()),
			o.AcceptedNewBeHit !== n &&
				((o.AcceptedNewBeHit = n),
				(t.AcceptedNewBeHitRef = n),
				(i = e.BeHitAnim),
				o.BeHitAnim !== i) &&
				((o.BeHitAnim = i), (t.BeHitAnimRef = i)),
			(n = e.GetEnterFkAndReset()),
			o.EnterFk !== n && ((o.EnterFk = n), (t.EnterFkRef = n)),
			(n = e.GetDoubleHitInAir()),
			o.DoubleHitInAir !== n) &&
			((o.DoubleHitInAir = n), (t.DoubleHitInAirRef = n));
	}
	static UpdateAnimInfoFk(e) {
		var t = EntitySystem_1.EntitySystem.GetComponent(e, 160);
		if (t?.Valid && (e = EntitySystem_1.EntitySystem.GetComponent(e, 51))) {
			var n = t.MainAnimInstance.LogicParams;
			t = t.AnimLogicParamsSetter;
			let i = e.BeHitDirect;
			t.BeHitDirect.Equals(i) ||
				(t.BeHitDirect.DeepCopy(i), (n.BeHitDirectRef = i.ToUeVector())),
				(i = e.BeHitLocation),
				t.BeHitLocation.Equals(i) ||
					(t.BeHitLocation.DeepCopy(i), (n.BeHitLocationRef = i.ToUeVector())),
				(e = e.BeHitSocketName),
				t.BeHitSocketName.op_Equality(e) ||
					((t.BeHitSocketName = e), (n.BeHitSocketNameRef = e));
		}
	}
	static UpdateAnimInfoUnifiedState(e) {
		var t,
			n,
			i,
			o = EntitySystem_1.EntitySystem.GetComponent(e, 160);
		o?.Valid &&
			(n = EntitySystem_1.EntitySystem.GetComponent(e, 158)) &&
			((t = o.MainAnimInstance.LogicParams),
			(o = o.AnimLogicParamsSetter),
			(i = n.MoveState),
			o.CharMoveState !== i &&
				((o.CharMoveState = i), (t.CharMoveStateRef = i)),
			(i = n.PositionState),
			o.CharPositionState !== i &&
				((o.CharPositionState = i), (t.CharPositionStateRef = i)),
			(i = n.DirectionState),
			o.CharCameraState !== i &&
				((o.CharCameraState = i), (t.CharCameraStateRef = i)),
			(n = EntitySystem_1.EntitySystem.GetComponent(e, 33)) &&
				o.SkillTarget !== (n.SkillTarget?.Id ?? 0) &&
				((o.SkillTarget = n.SkillTarget?.Id ?? 0),
				(t.SkillTarget = n.SkillTarget?.Entity?.GetComponent(1)?.Owner)),
			(i = n.LastActivateSkillTime),
			o.LastActiveSkillTime !== i &&
				((o.LastActiveSkillTime = i), (t.LastActiveSkillTime = i)),
			(e =
				ModelManager_1.ModelManager.PlotModel.IsInInteraction ||
				(ModelManager_1.ModelManager.PlotModel.IsInPlot &&
					"LevelD" !==
						ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel)),
			o.IsInPerformingPlot !== e &&
				((o.IsInPerformingPlot = e), (t.bIsInPerformingPlot = e)),
			(n =
				ModelManager_1.ModelManager.PlotModel.IsInPlot &&
				("LevelA" ===
					ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel ||
					"LevelB" ===
						ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel)),
			o.IsInSequence !== n && ((o.IsInSequence = n), (t.bIsInSequence = n)),
			(i =
				UiCameraAnimationManager_1.UiCameraAnimationManager.IsDisablePlayer()),
			o.IsInUiCamera !== i) &&
			((o.IsInUiCamera = i), (t.bIsInUiCamera = i));
	}
	static UpdateAnimInfoSceneInteract(e) {
		var t,
			n,
			i = EntitySystem_1.EntitySystem.GetComponent(e, 160);
		i?.Valid &&
			(e = EntitySystem_1.EntitySystem.GetComponent(e, 26)) &&
			((t = i.MainAnimInstance.LogicParams),
			(i = i.AnimLogicParamsSetter),
			(n = e.GetSitDownState()),
			i.SitDown !== n && ((i.SitDown = n), (t.bSitDown = n)),
			(n = e.EnterSitDownIndex),
			i.SitDownDirect !== n && ((i.SitDownDirect = n), (t.SitDownDirect = n)),
			(n = e.LeaveSitDownIndex),
			i.StandUpDirect !== n) &&
			((i.StandUpDirect = n), (t.StandUpDirect = n));
	}
}
(exports.AnimController = AnimController).UpdateAnimInfo = (e) => {
	AnimController.UpdateAnimInfoMove(e),
		AnimController.UpdateAnimInfoMeshAnim(e),
		AnimController.UpdateAnimInfoHit(e),
		AnimController.UpdateAnimInfoUnifiedState(e),
		AnimController.UpdateAnimInfoFk(e),
		AnimController.UpdateAnimInfoSceneInteract(e);
};
