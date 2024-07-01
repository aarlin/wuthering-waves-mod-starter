"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MailAttachmentData = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ScrollViewDataBase_1 = require("../../Util/ScrollView/ScrollViewDataBase");
class MailAttachmentData extends ScrollViewDataBase_1.ScrollViewDataBase {
	constructor(t, e, a) {
		super(),
			(this.gIt = t),
			(this.t6 = e),
			(this.WEi = a),
			(this.Lo =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					this.gIt,
				));
	}
	GetItemId() {
		return this.gIt;
	}
	GetCount() {
		return this.t6;
	}
	GetPicked() {
		return this.WEi;
	}
	GetItemConfig() {
		return this.Lo;
	}
}
exports.MailAttachmentData = MailAttachmentData;
