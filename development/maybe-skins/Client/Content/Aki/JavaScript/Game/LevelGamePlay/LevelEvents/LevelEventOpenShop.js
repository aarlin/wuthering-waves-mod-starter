"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventOpenShop = void 0);
const ShopController_1 = require("../../Module/Shop/ShopController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventOpenShop extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, o) {
		e &&
			(e = e.get("ShopId")) &&
			ShopController_1.ShopController.OpenShop(parseInt(e));
	}
}
exports.LevelEventOpenShop = LevelEventOpenShop;
