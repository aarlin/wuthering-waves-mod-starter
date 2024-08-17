"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemTipsComponent = void 0);
const UE = require("ue"),
	GlobalData_1 = require("../../../GlobalData"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ItemTipsCharacterComponent_1 = require("./SubComponents/ItemTipsCharacterComponent"),
	ItemTipsMaterialComponent_1 = require("./SubComponents/ItemTipsMaterialComponent"),
	ItemTipsVisionComponent_1 = require("./SubComponents/ItemTipsVisionComponent"),
	ItemTipsWeaponComponent_1 = require("./SubComponents/ItemTipsWeaponComponent");
class ItemTipsComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ItemType = void 0),
			(this.rPt = void 0),
			(this.nPt = new Map()),
			(this.sPt = {
				0: ItemTipsMaterialComponent_1.TipsMaterialComponent,
				1: ItemTipsWeaponComponent_1.TipsWeaponComponent,
				2: ItemTipsVisionComponent_1.TipsVisionComponent,
				3: ItemTipsCharacterComponent_1.ItemTipsCharacterComponent,
			});
	}
	GetComponentByType(e) {
		var t;
		return (
			this.nPt.has(e) ||
				((t = new this.sPt[e](this.GetItem(4))), this.nPt.set(e, t)),
			this.nPt.get(e)
		);
	}
	RefreshTipsComponentByType(e) {
		this.GetComponentByType(e.ItemType).Refresh(e),
			this.GetComponentByType(e.ItemType).SetVisible(!0);
	}
	SetTipsComponentVisibleByType(e, t) {
		(e = this.nPt.get(e)) && e.SetVisible(t);
	}
	SetTipsComponentLockButton(e) {
		void 0 !== this.ItemType &&
			this.GetComponentByType(this.ItemType).SetLockButtonShow(e);
	}
	SetTipsNumShow(e) {
		void 0 !== this.ItemType &&
			this.GetComponentByType(this.ItemType).SetPanelNumVisible(e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UITexture],
			[3, UE.UINiagara],
			[4, UE.UIItem],
			[5, UE.UIText],
		];
	}
	OnBeforeDestroy() {
		this.nPt.forEach((e, t) => {
			e.Destroy();
		}),
			this.nPt.clear(),
			this.rPt && (this.rPt = void 0);
	}
	Refresh(e) {
		void 0 !== this.ItemType &&
			this.SetTipsComponentVisibleByType(this.ItemType, !1),
			(this.ItemType = e.ItemType),
			this.aPt(e),
			this.RefreshTipsComponentByType(e),
			this.SetActive(!0);
	}
	aPt(e) {
		var t = this.GetUiNiagara(3),
			i =
				(t.DeactivateSystem(),
				ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e.QualityId)),
			o =
				((i = UE.Color.FromHex(i.DropColor)),
				(i =
					(this.GetText(0).SetColor(i),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Title),
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"T_TipsQualityTypeLevel" + e.QualityId,
					))),
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
					e.QualityId,
				).QualityColor);
		o = UE.Color.FromHex(o);
		t.SetColor(o),
			t.ActivateSystem(!0),
			this.SetTextureByPath(i, this.GetTexture(1)),
			this.SetItemIcon(this.GetTexture(2), e.ConfigId),
			this.hPt(e.ConfigId);
	}
	hPt(e) {
		var t = this.GetText(5);
		GlobalData_1.GlobalData.IsPlayInEditor
			? (LguiUtil_1.LguiUtil.SetLocalText(t, "CommonTipsDebugItemId", e),
				t.SetUIActive(!0))
			: t.SetUIActive(!1);
	}
}
exports.ItemTipsComponent = ItemTipsComponent;
