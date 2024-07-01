"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleMorphPaoTaiHandle = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	RoleMorphHandleBase_1 = require("./RoleMorphHandleBase");
class RoleMorphPaoTaiHandle extends RoleMorphHandleBase_1.RoleMorphHandleBase {
	BeginMorph() {
		var e = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
		e && (e.ControlCameraByMoveAxis = !0);
	}
	EndMorph() {
		var e = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
		e && (e.ControlCameraByMoveAxis = !1);
	}
}
exports.RoleMorphPaoTaiHandle = RoleMorphPaoTaiHandle;
