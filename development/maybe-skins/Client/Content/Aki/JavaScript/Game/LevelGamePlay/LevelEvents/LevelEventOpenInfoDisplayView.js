"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventOpenInfoDisplayView = void 0);
const InfoDisplayController_1 = require("../../Module/InfoDisplay/InfoDisplayController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventOpenInfoDisplayView extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, l) {
		e &&
			(e = e.get("InfoDisplay")) &&
			InfoDisplayController_1.InfoDisplayController.OpenInfoDisplay(
				parseInt(e),
			);
	}
}
exports.LevelEventOpenInfoDisplayView = LevelEventOpenInfoDisplayView;
