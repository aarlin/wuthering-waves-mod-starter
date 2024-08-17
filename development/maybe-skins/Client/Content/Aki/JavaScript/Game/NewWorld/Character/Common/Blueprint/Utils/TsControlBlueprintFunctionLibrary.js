"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Info_1 = require("../../../../../../Core/Common/Info"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	Global_1 = require("../../../../../Global"),
	ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsControlBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static GetMoveVectorCache(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 52).GetMoveVectorCache();
	}
	static GetMoveDirectionCache(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			52,
		).GetMoveDirectionCache();
	}
	static GetWorldMoveDirectionCache(t) {
		return EntitySystem_1.EntitySystem.GetComponent(
			t,
			52,
		).GetWorldMoveDirectionCache();
	}
	static GetMoveVector(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 52).GetMoveVector();
	}
	static GetMoveDirection(t) {
		return EntitySystem_1.EntitySystem.GetComponent(t, 52).GetMoveDirection();
	}
	static PlayKuroForceFeedback(t, e, o, r, n) {
		ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
			Global_1.Global.CharacterController &&
			Global_1.Global.CharacterController.PlayKuroForceFeedback(t, e, o, r, n);
	}
	static StopKuroForceFeedback(t, e) {
		Global_1.Global.CharacterController &&
			Global_1.Global.CharacterController.StopKuroForceFeedback(t, e);
	}
	static BpInputReceiveEndPlay(t) {
		!(t = EntitySystem_1.EntitySystem.Get(t)) ||
			t.IsEnd ||
			UE.KuroStaticLibrary.IsWorldTearingDown(Info_1.Info.World) ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("Test", 6, "Bp Input Destroy at Wrong Time.", [
					"Actor",
					t.GetComponent(3)?.Actor?.GetName(),
				]));
	}
	static SetUseControllerRotationPitch(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 3).UseControllerRotation.Pitch =
			e ? 1 : 0;
	}
	static SetUseControllerRotationYaw(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 3).UseControllerRotation.Yaw = e
			? 1
			: 0;
	}
	static SetUseControllerRotationRoll(t, e) {
		EntitySystem_1.EntitySystem.GetComponent(t, 3).UseControllerRotation.Roll =
			e ? 1 : 0;
	}
	static SetBpInputComponent(t, e) {
		var o = EntitySystem_1.EntitySystem.GetComponent(t, 52);
		t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
		(o.BpInputComp = e).OwnerActor = t.Actor;
	}
}
exports.default = TsControlBlueprintFunctionLibrary;
