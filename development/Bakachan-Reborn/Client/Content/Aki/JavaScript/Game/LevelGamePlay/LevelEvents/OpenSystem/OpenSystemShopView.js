"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemShopView = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	ShopController_1 = require("../../../Module/Shop/ShopController"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemShopView extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, o) {
		if (!e.BoardId) return !1;
		const r = new CustomPromise_1.CustomPromise();
		return (
			!!ShopController_1.ShopController.OpenShop(e.BoardId, (e) => {
				r.SetResult(e);
			}) && r.Promise
		);
	}
	GetViewName(e) {
		return "ShopView";
	}
}
exports.OpenSystemShopView = OpenSystemShopView;
