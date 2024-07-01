"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetPlayerCameraLockState = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	CameraController_1 = require("../../Camera/CameraController"),
	Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetPlayerCameraLockState extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, a) {
		(e = e.get("IsLock") === StringUtils_1.ONE_STRING),
			CameraController_1.CameraController.FightCamera.LogicComponent.SetInputEnable(
				Global_1.Global.BaseCharacter,
				!e,
			);
	}
}
exports.LevelEventSetPlayerCameraLockState = LevelEventSetPlayerCameraLockState;
