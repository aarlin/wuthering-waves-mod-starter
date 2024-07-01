"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotItemHandBook = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDot/RedDotBase");
class RedDotItemHandBook extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "ItemHandBook";
	}
	IsMultiple() {
		return !0;
	}
	OnGetEvents() {
		return [EventDefine_1.EEventName.OnItemReadRedDotUpdate];
	}
	OnCheck(e) {
		var n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfoList(5);
		if (n) {
			var o = n.length;
			for (let a = 0; a < o; a++) {
				var t = n[a];
				if (
					ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigById(
						t.Id,
					).Type === e &&
					!t.IsRead
				)
					return !0;
			}
		}
		return !1;
	}
}
exports.RedDotItemHandBook = RedDotItemHandBook;
