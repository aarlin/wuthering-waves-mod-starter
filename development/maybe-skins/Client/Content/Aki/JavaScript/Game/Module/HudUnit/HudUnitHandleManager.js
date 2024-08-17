"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HudUnitHandleManager = void 0);
const AimHandle_1 = require("./HudUnitHandle/AimHandle"),
	CameraAimHandle_1 = require("./HudUnitHandle/CameraAimHandle"),
	LockCursorHandle_1 = require("./HudUnitHandle/LockCursorHandle"),
	LockExecutionHandle_1 = require("./HudUnitHandle/LockExecutionHandle"),
	ManipulateAimHandle_1 = require("./HudUnitHandle/ManipulateAimHandle"),
	ManipulateCursorHandle_1 = require("./HudUnitHandle/ManipulateCursorHandle"),
	MonsterCursorHandle_1 = require("./HudUnitHandle/MonsterCursorHandle"),
	RogueScoreHandle_1 = require("./HudUnitHandle/RogueScoreHandle"),
	StrengthHandle_1 = require("./HudUnitHandle/StrengthHandle"),
	HudUnitManager_1 = require("./HudUnitManager");
class HudUnitHandleManager {
	static Init() {
		HudUnitManager_1.HudUnitManager.HudUnitHandleClassArray = [
			LockCursorHandle_1.LockCursorHandle,
			StrengthHandle_1.StrengthHandle,
			AimHandle_1.AimHandle,
			MonsterCursorHandle_1.MonsterCursorHandle,
			ManipulateCursorHandle_1.ManipulateCursorHandle,
			ManipulateAimHandle_1.ManipulateAimHandle,
			LockExecutionHandle_1.LockExecutionHandle,
			CameraAimHandle_1.CameraAimHandle,
			RogueScoreHandle_1.RogueScoreHandle,
		];
	}
}
exports.HudUnitHandleManager = HudUnitHandleManager;
