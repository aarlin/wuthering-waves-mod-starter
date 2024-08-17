"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaResultItemNew = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	UiManager_1 = require("../../../Ui/UiManager"),
	SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData"),
	RoleController_1 = require("../../RoleUi/RoleController");
class GachaResultItemNew extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.gIt = 0),
			(this.Pjt = 0),
			(this.xjt = void 0),
			(this.IHt = () => {
				var e;
				switch (
					ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(this.gIt)
				) {
					case 1:
						RoleController_1.RoleController.OpenRoleMainView(1, this.Pjt, [
							this.Pjt,
						]);
						break;
					case 2:
						0 < this.Pjt &&
							((e = new WeaponTrialData_1.WeaponTrialData()).SetTrialId(
								this.Pjt,
							),
							(e = { WeaponDataList: [e], SelectedIndex: 0 }),
							UiManager_1.UiManager.OpenView("WeaponPreviewView", e));
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[9, UE.UIItem],
			[10, UE.UIItem],
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UIButtonComponent],
			[3, UE.UIItem],
			[4, UE.UITexture],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UITexture],
			[11, UE.UINiagara],
		]),
			(this.BtnBindInfo = [[2, this.IHt]]);
	}
	async OnBeforeStartAsync() {
		(this.xjt = new SmallItemGrid_1.SmallItemGrid()),
			await this.xjt.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()),
			this.xjt.BindOnExtendToggleClicked((e) => {
				(e = e.Data),
					ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
						e,
					);
			}),
			this.xjt.BindOnCanExecuteChange(() => !1);
	}
	UpdateQuality(e) {
		for (let t = 0; t < e - 1; t++)
			LguiUtil_1.LguiUtil.CopyItem(this.GetItem(10), this.GetItem(9));
		var t,
			i = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e);
		let a;
		switch (
			((t =
				((t = i.GachaQualityTexture) &&
					this.SetSpriteByPath(t, this.GetSprite(1), !0, "GachaResultView"),
				i.GachaBgTexture)) &&
				this.SetSpriteByPath(t, this.GetSprite(0), !0, "GachaResultView"),
			e)
		) {
			case 4:
				a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"NS_Fx_LGUI_GachaResultPurple",
				);
				break;
			case 5:
				a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"NS_Fx_LGUI_GachaResultGold",
				);
		}
		(i = this.GetUiNiagara(11)),
			a
				? (i.SetUIActive(!0), this.SetNiagaraSystemByPath(a, i))
				: i.SetUIActive(!1);
	}
	Update(e) {
		var t,
			i = e.u5n.G3n,
			a =
				((this.gIt = i),
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i)),
			r = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(i);
		let n = 0;
		var o;
		1 ===
		(t =
			((t = ((this.Pjt = r.TrialId), e.v5n)) && 0 < t?.length
				? (this.GetItem(6).SetUIActive(!0),
					(t = {
						Type: 4,
						Data: (t = t[0]).G3n,
						QualityId: 0,
						ItemConfigId: t.G3n,
						BottomText: t.g5n.toString(),
					}),
					this.xjt?.Apply(t))
				: (this.xjt?.SetUiActive(!1), this.GetItem(6).SetUIActive(!e.IsNew)),
			ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(i)))
			? (this.GetItem(3).SetUIActive(!0),
				(t = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(i)),
				(i = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
					t.ElementId,
				)) &&
					((o = this.GetTexture(4)),
					this.SetTextureByPath(i.Icon, o),
					(i = UE.Color.FromHex(i.ElementColor)),
					o.SetColor(i)),
				(n = t.QualityId),
				this.GetItem(5).SetUIActive(e.IsNew))
			: (this.GetItem(3).SetUIActive(!1),
				(n = a.QualityId),
				this.GetItem(5).SetUIActive(e.IsNew),
				this.GetItem(6).SetUIActive(!1)),
			this.UpdateQuality(n),
			this.SetTextureByPath(
				r.GachaResultViewTexture,
				this.GetTexture(8),
				"GachaResultView",
			);
	}
	Refresh(e, t, i) {
		this.Update(e);
	}
	RefreshShare() {
		this.GetItem(5).SetUIActive(!1), this.GetItem(6).SetUIActive(!1);
	}
}
exports.GachaResultItemNew = GachaResultItemNew;
