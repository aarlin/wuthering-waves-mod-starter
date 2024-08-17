"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotFunctionInventory = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionInventory extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.OnAddCommonItemList,
			EventDefine_1.EEventName.OnAddWeaponItemList,
			EventDefine_1.EEventName.OnAddPhantomItemList,
			EventDefine_1.EEventName.OnRemoveItemRedDot,
		];
	}
	OnCheck(e) {
		return ModelManager_1.ModelManager.InventoryModel.HasRedDot();
	}
}
exports.RedDotFunctionInventory = RedDotFunctionInventory;
