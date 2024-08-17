"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OneTextDropDownItem = void 0);
const UE = require("ue"),
	LguiUtil_1 = require("../../../../Util/LguiUtil"),
	DropDownItemBase_1 = require("../DropDownItemBase");
class OneTextDropDownItem extends DropDownItemBase_1.DropDownItemBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
		];
	}
	GetDropDownToggle() {
		return this.GetExtendToggle(0);
	}
	OnShowDropDownItemBase(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(1),
			e.TextKey,
			...e.Params,
		);
	}
}
exports.OneTextDropDownItem = OneTextDropDownItem;
