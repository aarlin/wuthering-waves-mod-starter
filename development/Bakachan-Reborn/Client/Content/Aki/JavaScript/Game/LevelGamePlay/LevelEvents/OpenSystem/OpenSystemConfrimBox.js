"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemConfrimBox = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	ConfirmBoxController_1 = require("../../../Module/ConfirmBox/ConfirmBoxController"),
	ConfirmBoxDefine_1 = require("../../../Module/ConfirmBox/ConfirmBoxDefine"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemConfrimBox extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, o) {
		if (!e) return !0;
		const r = new CustomPromise_1.CustomPromise();
		return (
			((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
				e.BoardId,
			)).FinishOpenFunction = (e) => {
				r.SetResult(e);
			}),
			!!(e =
				ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e)) &&
				r.Promise
		);
	}
	GetViewName(e, o) {
		return ConfirmBoxController_1.ConfirmBoxController.GetUiViewName(e.BoardId);
	}
}
exports.OpenSystemConfrimBox = OpenSystemConfrimBox;
