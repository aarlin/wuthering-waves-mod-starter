"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemActivity = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	ActivityController_1 = require("../../../Module/Activity/ActivityController"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemActivity extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, t) {
		if (!e) return !0;
		const i = new CustomPromise_1.CustomPromise();
		return (
			!!ActivityController_1.ActivityController.OpenActivityById(
				e.BoardId,
				4,
				(e) => {
					i.SetResult(e);
				},
			) && i.Promise
		);
	}
	GetViewName(e, t) {
		return "CommonActivityView";
	}
}
exports.OpenSystemActivity = OpenSystemActivity;
