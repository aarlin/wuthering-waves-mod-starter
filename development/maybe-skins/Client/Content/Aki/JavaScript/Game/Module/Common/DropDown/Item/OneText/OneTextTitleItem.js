"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OneTextTitleItem = void 0);
const UE = require("ue"),
	LguiUtil_1 = require("../../../../Util/LguiUtil"),
	TitleItemBase_1 = require("../TitleItemBase");
class OneTextTitleItem extends TitleItemBase_1.TitleItemBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	ShowTemp(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(0),
			e.TextKey,
			...e.Params,
		);
	}
}
exports.OneTextTitleItem = OneTextTitleItem;
