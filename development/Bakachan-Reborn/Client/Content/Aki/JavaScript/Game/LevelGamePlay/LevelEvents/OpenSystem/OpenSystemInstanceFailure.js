"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemInstanceFailure = void 0);
const InstanceDungeonEntranceController_1 = require("../../../Module/InstanceDungeon/InstanceDungeonEntranceController"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemInstanceFailure extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, n) {
		return InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.OpenInstanceDungeonFailView();
	}
	GetViewName(e, n) {
		return "InstanceDungeonFailView";
	}
}
exports.OpenSystemInstanceFailure = OpenSystemInstanceFailure;
