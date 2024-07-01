"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemLordGym = void 0);
const LordGymController_1 = require("../../../Module/LordGym/LordGymController"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemLordGym extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, r) {
		return (
			!!e.BoardId &&
			LordGymController_1.LordGymController.OpenLordGymEntrance(e.BoardId)
		);
	}
	GetViewName(e) {
		return "LordGymEntranceView";
	}
}
exports.OpenSystemLordGym = OpenSystemLordGym;
