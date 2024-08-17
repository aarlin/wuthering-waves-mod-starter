"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotRoleHandBook = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotRoleHandBook extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.RedDotRefreshItemData,
			EventDefine_1.EEventName.RedDotStart,
		];
	}
	OnCheck() {
		var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleListByType(1),
			o = e.length;
		for (let d = 0; d < o; d++) {
			var n,
				a,
				t = e[d],
				r = t.Id;
			if (9 !== t.PartyId) {
				let e, o;
				for ([n, a] of t.ExchangeConsume) {
					(e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(n)), (o = a);
					break;
				}
				if (
					((t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(r)),
					(r =
						ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
							e.Id,
						)),
					void 0 === t && r >= o)
				)
					return !0;
			}
		}
		return !1;
	}
}
exports.RedDotRoleHandBook = RedDotRoleHandBook;
