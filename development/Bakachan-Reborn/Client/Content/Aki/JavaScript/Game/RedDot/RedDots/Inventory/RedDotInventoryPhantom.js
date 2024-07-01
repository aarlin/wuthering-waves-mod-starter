"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotInventoryPhantom = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotInventoryPhantom extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.OnAddPhantomItemList,
			EventDefine_1.EEventName.OnRemoveItemRedDot,
		];
	}
	OnCheck(e) {
		var t =
			ModelManager_1.ModelManager.InventoryModel.GetItemMainTypeMapping(3);
		return !!t && t.HasRedDot();
	}
}
exports.RedDotInventoryPhantom = RedDotInventoryPhantom;
