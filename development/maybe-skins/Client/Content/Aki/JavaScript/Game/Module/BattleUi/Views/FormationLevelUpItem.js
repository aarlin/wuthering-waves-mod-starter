"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FormationLevelUpItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FormationLevelUpItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.LevelHandle = void 0),
			this.CreateThenShowByResourceIdAsync("UiItem_FormationLevelUpItem", e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnStart() {
		this.LevelHandle && this.GetText(0).SetText(this.LevelHandle),
			(this.LevelHandle = void 0);
	}
	SetLevelText(e) {
		this.InAsyncLoading() ? (this.LevelHandle = e) : this.GetText(0).SetText(e);
	}
}
exports.FormationLevelUpItem = FormationLevelUpItem;
