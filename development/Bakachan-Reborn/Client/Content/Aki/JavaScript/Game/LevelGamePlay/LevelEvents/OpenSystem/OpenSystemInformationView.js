"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemInformationView = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	InfoDisplayController_1 = require("../../../Module/InfoDisplay/InfoDisplayController"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemInformationView extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, o) {
		if (!e.BoardId) return !1;
		const n = new CustomPromise_1.CustomPromise();
		var r = {};
		9 === o?.Type && (r.CanOpenInPlot = !0),
			(o = InfoDisplayController_1.InfoDisplayController.OpenInfoDisplay(
				e.BoardId,
				(e) => {
					n.SetResult(e);
				},
				r,
			));
		return !!o && n.Promise;
	}
	GetViewName(e) {
		let o;
		return (
			1 ===
			(e =
				ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayType(
					e.BoardId,
				))
				? (o = "InfoDisplayTypeOneView")
				: 2 === e
					? (o = "InfoDisplayTypeTwoView")
					: 3 === e
						? (o = "InfoDisplayTypeThreeView")
						: 4 === e && (o = "InfoDisplayTypeFourView"),
			o
		);
	}
}
exports.OpenSystemInformationView = OpenSystemInformationView;
