"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MaterialItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MaterialItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.ItemData = void 0),
			(this.ItemInfo = void 0),
			(this.Wgt = void 0),
			(this.OnClick = (e) => {
				this.Wgt && this.Wgt(this.ItemData);
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UITexture],
			[4, UE.UISprite],
		]),
			(this.BtnBindInfo = [[0, this.OnClick]]);
	}
	Update(e) {
		(this.ItemData = e),
			0 !== this.ItemData.G3n
				? (this.ItemInfo = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
						this.ItemData.G3n,
					))
				: (this.ItemInfo = void 0),
			this.RefreshNeed(),
			this.RefreshHave(),
			this.Kbe(),
			this.Pqt();
	}
	RefreshNeed(e = 1) {
		let t = this.ItemData.k4n;
		1 !== e && (t *= e), this.GetText(2).SetText(t.toString());
	}
	RefreshHave() {
		var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
			this.ItemData.G3n,
		);
		let t;
		(t = this.ItemData.m3n
			? e < this.ItemData.k4n
				? `<color=#dc0300>${e}</color>`
				: `<color=#ffffff>${e}</color>`
			: "<color=#ffffff>--</color>"),
			this.GetText(1).SetText(t);
	}
	Kbe() {
		this.ItemData.m3n
			? (this.GetTexture(3).SetUIActive(!0),
				this.SetTextureByPath(this.ItemInfo.Icon, this.GetTexture(3)))
			: this.GetTexture(3).SetUIActive(!1);
	}
	Pqt() {
		this.ItemData.m3n
			? (this.GetSprite(4).SetUIActive(!0),
				this.SetItemQualityIcon(this.GetSprite(4), this.ItemInfo.Id))
			: this.GetSprite(4).SetUIActive(!1);
	}
	BindOnClickedCallback(e) {
		this.Wgt = e;
	}
}
exports.MaterialItem = MaterialItem;
