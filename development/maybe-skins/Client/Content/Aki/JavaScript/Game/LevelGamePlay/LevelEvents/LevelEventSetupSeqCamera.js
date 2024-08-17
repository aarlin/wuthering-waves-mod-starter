"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetupSeqCamera = void 0);
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	CameraController_1 = require("../../Camera/CameraController"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetupSeqCamera extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, r) {
		var a, t;
		e &&
			1 === ModelManager_1.ModelManager.CameraModel.CameraMode &&
			((t = (a =
				CameraController_1.CameraController.SequenceCamera.GetComponent(
					9,
				).CineCamera).CameraComponent),
			ObjectUtils_1.ObjectUtils.IsValid(a)) &&
			(a.K2_SetActorTransform(e.Transform.ToUeTransform(), !1, void 0, !1),
			e.Aperture && (t.CurrentAperture = e.Aperture),
			e.FocalLength && (t.CurrentFocalLength = e.FocalLength),
			e.FocusDistance) &&
			(t.FocusSettings.ManualFocusDistance = e.FocusDistance);
	}
}
exports.LevelEventSetupSeqCamera = LevelEventSetupSeqCamera;
