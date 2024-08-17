"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventRestorePlayerCameraAdjustment = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ConfigCurveUtils_1 = require("../../Utils/ConfigCurveUtils"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRestorePlayerCameraAdjustment extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		e || this.FinishExecute(!1);
		var r,
			a,
			n = Global_1.Global.BaseCharacter;
		n &&
			e?.ResetFocus &&
			((r = e.ResetFocus.FadeInTime),
			(a = ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(
				e.ResetFocus.FadeInCurve,
			)),
			n.GetEntityNoBlueprint().GetComponent(29).ResetPitch(r, a)),
			Log_1.Log.CheckInfo() && Log_1.Log.Info("Event", 39, "离开相机调整"),
			CameraController_1.CameraController.FightCamera.LogicComponent.RestoreCameraFromAdjust(
				e?.ResetFocus?.FadeInTime,
			);
	}
	OnUpdateGuarantee() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RemGuaranteeAction,
			this.Type,
			this.BaseContext,
			{ Name: "RestorePlayerCameraAdjustment" },
		);
	}
}
exports.LevelEventRestorePlayerCameraAdjustment =
	LevelEventRestorePlayerCameraAdjustment;
