"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NewSoundTeachItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class NewSoundTeachItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
		];
	}
	Update(e) {
		var t = this.GetText(0);
		LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Conf.Name),
			(t = this.GetTexture(1));
		this.SetTextureByPath(e.Conf.BigIcon, t);
	}
}
exports.NewSoundTeachItem = NewSoundTeachItem;
