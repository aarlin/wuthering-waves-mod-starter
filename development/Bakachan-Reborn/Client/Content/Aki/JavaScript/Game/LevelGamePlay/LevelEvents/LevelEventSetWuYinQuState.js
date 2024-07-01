"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetWuYinQuState = void 0);
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetWuYinQuState extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		e &&
			RenderModuleController_1.RenderModuleController.SetBattleState(
				e.WuYinQuName,
				e.State,
			);
	}
}
exports.LevelEventSetWuYinQuState = LevelEventSetWuYinQuState;
