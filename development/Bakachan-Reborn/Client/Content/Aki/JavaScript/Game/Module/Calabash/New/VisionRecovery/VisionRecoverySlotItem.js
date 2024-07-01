"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionRecoverySlotItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class VisionRecoverySlotItem extends UiPanelBase_1.UiPanelBase {
	constructor(t, e = !0) {
		super(),
			(this.Wpt = void 0),
			(this.Kpt = void 0),
			(this.Qpt = !1),
			(this.Xpt = () => {
				this.Kpt && this.Kpt(!0, this.Wpt);
			}),
			(this.$pt = () => {
				this.Kpt && this.Kpt(!1, this.Wpt);
			}),
			(this.Kpt = t),
			(this.Qpt = e);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[1, UE.UIItem],
			[2, UE.UITexture],
			[0, UE.UISpriteTransition],
			[3, UE.UISprite],
			[4, UE.UIButtonComponent],
			[5, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[4, this.Xpt],
				[5, this.$pt],
			]);
	}
	OnStart() {
		this.RefreshUi(this.Wpt);
		var t = void 0 !== this.Kpt;
		this.GetUiSpriteTransition(0).SetEnable(t);
	}
	RefreshUi(t) {
		void 0 === (this.Wpt = t) ? this.RefreshEmpty() : this.RefreshByData(t);
	}
	RefreshEmpty() {
		this.GetItem(1).SetUIActive(!0),
			this.GetTexture(2).SetUIActive(!1),
			this.GetSprite(3).SetUIActive(!1),
			this.GetButton(5).RootUIComp.SetUIActive(!1);
	}
	RefreshByData(t) {
		const e = this.GetTexture(2),
			i = this.GetSprite(3);
		var s =
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(
				t.GetQuality(),
			);
		this.SetSpriteByPath(s, i, !1, void 0, () => {
			i.SetUIActive(!0);
		}),
			(s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
				t.GetConfigId(),
			));
		this.SetTextureByPath(s.IconMiddle, e, void 0, () => {
			e.SetUIActive(!0),
				this.GetItem(1).SetUIActive(!1),
				this.GetButton(5).RootUIComp.SetUIActive(this.Qpt);
		});
	}
}
exports.VisionRecoverySlotItem = VisionRecoverySlotItem;
