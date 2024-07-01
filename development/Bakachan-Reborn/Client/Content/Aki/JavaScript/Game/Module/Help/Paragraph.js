"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Paragraph = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class Paragraph extends UiPanelBase_1.UiPanelBase {
	constructor(e = void 0) {
		super(), e && this.CreateThenShowByActor(e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
		];
	}
	Refresh(e) {
		"" === e.Picture
			? this.GetTexture(0).SetUIActive(!1)
			: this.SetTextureByPath(e.Picture, this.GetTexture(0)),
			e.Content
				? this.GetText(1).ShowTextNew(e.Content)
				: this.GetText(1).SetUIActive(!1);
	}
}
exports.Paragraph = Paragraph;
