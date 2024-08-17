"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonSkillIconItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class CommonSkillIconItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UITexture]];
	}
	UpdateItem(e) {
		var t = this.GetTexture(0);
		e ? (this.SetTextureByPath(e, t), this.SetActive(!0)) : this.SetActive(!1);
	}
}
exports.CommonSkillIconItem = CommonSkillIconItem;
