"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemMingSuTi = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	MingSuController_1 = require("../../../Module/MingSu/MingSuController"),
	MingSuDefine_1 = require("../../../Module/MingSu/MingSuDefine"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemMingSuTi extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, n) {
		if (!(e = e.BoardId)) return !1;
		const i = new CustomPromise_1.CustomPromise();
		return (
			!!MingSuController_1.MingSuController.OpenView(e, (e) => {
				i.SetResult(e);
			}) && i.Promise
		);
	}
	GetViewName(e) {
		switch (e.BoardId) {
			case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
				return "MingSuView";
			case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
				return "CollectItemView";
			default:
				return "MingSuView";
		}
	}
}
exports.OpenSystemMingSuTi = OpenSystemMingSuTi;
