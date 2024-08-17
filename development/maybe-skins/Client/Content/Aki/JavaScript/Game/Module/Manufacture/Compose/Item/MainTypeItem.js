"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MainTypeItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class MainTypeItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.zGt = 3),
			(this.OnClickedCallback = void 0),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.OnItemButtonClicked = (e) => {
				1 === e &&
					this.ScrollViewDelegate.SelectGridProxy(
						this.GridIndex,
						this.DisplayIndex,
						!0,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [[1, this.OnItemButtonClicked]]);
	}
	Refresh(e, t, i) {
		this.zGt = e;
		let n = "";
		switch (this.zGt) {
			case 1:
				n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"SP_ReagentProduction",
				);
				break;
			case 2:
				n =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"SP_Structure",
					);
				break;
			case 3:
				n =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"SP_Purification",
					);
		}
		this.SetSpriteByPath(n, this.GetSprite(0), !1);
	}
	Clear() {}
	OnSelected(e) {
		this.GetExtendToggle(1).SetToggleState(1, e),
			this.OnClickedCallback?.(this.zGt);
	}
	OnDeselected(e) {
		this.GetExtendToggle(1).SetToggleState(0, !1);
	}
	GetKey(e, t) {
		return this.zGt;
	}
	GetMainType() {
		return this.zGt;
	}
	SetMainTypeCallback(e) {
		this.OnClickedCallback = e;
	}
	SelectedItem() {
		this.OnClickedCallback && this.OnClickedCallback(this.zGt);
	}
}
exports.MainTypeItem = MainTypeItem;
