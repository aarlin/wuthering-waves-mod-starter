"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkMenuItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class MarkMenuItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.$ji = void 0);
	}
	async Init(e, t) {
		e.SetUIActive(!0),
			await this.CreateThenShowByActorAsync(e.GetOwner()),
			(this.$ji = t),
			this.MUi();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UISprite],
			[2, UE.UIText],
		];
	}
	SetOnClick(e) {
		this.GetExtendToggle(0).OnStateChange.Add(e);
	}
	MUi() {
		this.SetSpriteByPath(this.$ji.IconPath, this.GetSprite(1), !1),
			this.GetText(2).SetText(this.$ji.GetTitleText());
	}
	OnBeforeDestroy() {
		this.GetExtendToggle(0).OnStateChange.Clear();
	}
}
exports.MarkMenuItem = MarkMenuItem;
