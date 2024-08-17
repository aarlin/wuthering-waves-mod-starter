"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetExploreState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetExploreState extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, a, t) {
		var l;
		e &&
			((l = e.Config.TeleControlType), "TeleControl" === e.Config.Type) &&
			(0 === l
				? ModelManager_1.ModelManager.ManipulaterModel.SetManipulateMode(0)
				: 1 === l &&
					ModelManager_1.ModelManager.ManipulaterModel.SetManipulateMode(1));
	}
}
exports.LevelEventSetExploreState = LevelEventSetExploreState;
