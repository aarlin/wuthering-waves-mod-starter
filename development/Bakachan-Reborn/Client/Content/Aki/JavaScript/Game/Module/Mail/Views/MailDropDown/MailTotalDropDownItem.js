"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MailTotalDropDownItem = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	MailDropDownItem_1 = require("./MailDropDownItem");
class MailTotalDropDownItem extends MailDropDownItem_1.MailDropDownItem {
	GetFilteredMailList() {
		var e = ModelManager_1.ModelManager.MailModel.GetMailList();
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Mail", 28, "邮件界面：获取全部邮件", [
					"length",
					e?.length,
				]),
			e
		);
	}
	GetTitleText() {
		return (
			this.GetFilteredMailList().length +
			"/" +
			ModelManager_1.ModelManager.MailModel.GetMailCapacity()
		);
	}
	OnShowDropDownItemBase(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name),
			this.SetMailCount(this.GetTitleText());
	}
}
exports.MailTotalDropDownItem = MailTotalDropDownItem;
