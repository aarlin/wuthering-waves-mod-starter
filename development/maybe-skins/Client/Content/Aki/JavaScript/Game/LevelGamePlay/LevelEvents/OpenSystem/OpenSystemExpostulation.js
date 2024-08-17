"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemExpostulation = void 0);
const AdviceController_1 = require("../../../Module/Advice/AdviceController"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemExpostulation extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, t) {
		return (
			1 === t.Type &&
			AdviceController_1.AdviceController.OpenAdviceInfoView(t.EntityId)
		);
	}
	GetViewName(e, t) {
		if (1 === t.Type) return "AdviceInfoView";
	}
}
exports.OpenSystemExpostulation = OpenSystemExpostulation;
