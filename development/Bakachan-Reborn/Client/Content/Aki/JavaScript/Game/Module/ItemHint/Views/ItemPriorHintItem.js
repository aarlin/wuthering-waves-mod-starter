"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemPriorHintItem = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ItemHintItem_1 = require("./ItemHintItem");
class ItemPriorHintItem extends ItemHintItem_1.ItemHintItem {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[3, UE.UIText],
			[2, UE.UIText],
			[4, UE.UITexture],
			[5, UE.UISprite],
			[6, UE.UINiagara],
		];
	}
	async AsyncLoadUiResource() {
		this.Data =
			ModelManager_1.ModelManager.ItemHintModel.ShiftPriorInterfaceData();
		var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
			this.Data.Quality,
		);
		this.SetTextureByPath(e.AcquireQualityTexPath, this.GetTexture(4));
		const t = new CustomPromise_1.CustomPromise(),
			r = 5 === this.Data.Quality;
		var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				r ? "NS_Fx_LGUI_ItemList_Golden" : "NS_Fx_LGUI_ItemList_Other",
			),
			o = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
				this.Data.Quality,
			);
		const a = UE.Color.FromHex(o.TextColor),
			n =
				(ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.NiagaraSystem, (e) => {
					var i;
					t.SetResult(void 0),
						e &&
							UiManager_1.UiManager.IsViewOpen("ItemHintView") &&
							this.RootItem &&
							((i = this.GetUiNiagara(6)).SetNiagaraSystem(e),
							r ||
								(i.ColorParameter.Get("Color").Constant =
									UE.LinearColor.FromSRGBColor(a)));
				}),
				this.SetSpriteByPath(e.AcquireQualitySpritePath, this.GetSprite(5), !1),
				new CustomPromise_1.CustomPromise());
		this.SetItemIcon(this.GetTexture(0), this.Data.ItemId, void 0, () => {
			n.SetResult(void 0);
		}),
			await Promise.all([n.Promise, t.Promise]);
	}
}
exports.ItemPriorHintItem = ItemPriorHintItem;
