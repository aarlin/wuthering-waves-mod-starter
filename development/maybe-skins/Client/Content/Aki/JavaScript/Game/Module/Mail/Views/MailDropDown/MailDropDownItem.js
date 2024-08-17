"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MailDropDownItem = void 0);
const UE = require("ue"),
	DropDownItemBase_1 = require("../../../Common/DropDown/Item/DropDownItemBase");
class MailDropDownItem extends DropDownItemBase_1.DropDownItemBase {
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIText],
		]),
			(this.BtnBindInfo = []);
	}
	GetDropDownToggle() {
		return this.GetExtendToggle(0);
	}
	SetMailCount(e) {
		this.GetText(2).SetText(e);
	}
}
exports.MailDropDownItem = MailDropDownItem;
