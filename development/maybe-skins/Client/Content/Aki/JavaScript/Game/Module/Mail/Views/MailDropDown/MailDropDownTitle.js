"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MailDropDownTitle = void 0);
const UE = require("ue"),
	TitleItemBase_1 = require("../../../Common/DropDown/Item/TitleItemBase"),
	LguiUtil_1 = require("../../../Util/LguiUtil");
class MailDropDownTitle extends TitleItemBase_1.TitleItemBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	ShowTemp(e, t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name),
			this.GetText(1).SetText(t.GetTitleText());
	}
}
exports.MailDropDownTitle = MailDropDownTitle;
