"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotFunctionPayShop = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionPayShop extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "BattleViewMenu";
	}
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.OnFunctionViewShow,
			EventDefine_1.EEventName.RefreshAllPayShop,
		];
	}
	OnCheck() {
		return ModelManager_1.ModelManager.PayShopModel.CheckPayShopEntranceHasRedDot();
	}
}
exports.RedDotFunctionPayShop = RedDotFunctionPayShop;
