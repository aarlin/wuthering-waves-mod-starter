"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookMaterialItem = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CookMaterialItemContent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Aqt = void 0),
			(this.ClickDelegate = void 0),
			(this.OnClick = () => {
				this?.ClickDelegate();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIExtendToggle],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIText],
			[10, UE.UISprite],
			[11, UE.UISprite],
		]),
			(this.BtnBindInfo = [[4, this.OnClick]]);
	}
	SetSelect() {
		this.GetExtendToggle(4).SetToggleState(1, !1);
	}
	SetDelect() {
		this.GetExtendToggle(4).SetToggleState(0, !1);
	}
	OnStart() {
		this.GetSprite(0).SetUIActive(!0),
			this.GetTexture(1).SetUIActive(!0),
			this.GetText(2).SetUIActive(!0),
			this.GetExtendToggle(4)
				.GetOwner()
				.GetComponentByClass(UE.UIItem.StaticClass())
				.SetUIActive(!0),
			this.GetItem(3).SetUIActive(!0),
			this.GetItem(5).SetUIActive(!1),
			this.GetItem(6).SetUIActive(!1),
			this.GetItem(7).SetUIActive(!1),
			this.GetItem(8).SetUIActive(!1),
			this.GetText(9).SetUIActive(!1),
			this.GetSprite(10).SetUIActive(!1),
			this.GetSprite(11).SetUIActive(!1);
	}
	Update(t) {
		(this.Aqt = t), this.RefreshHave(), this.Kbe(), this.Pqt();
	}
	RefreshNeed(t = 1) {
		this.RefreshHave(t);
	}
	RefreshHave(t = 1) {
		t = this.Aqt.k4n * t;
		var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
			this.Aqt.G3n,
		);
		let i;
		(i = this.Aqt.m3n
			? e < this.Aqt.k4n
				? StringUtils_1.StringUtils.Format(
						CommonDefine_1.MATERIAL_NOT_ENOUGHT_TEXT_PATTERN,
						e.toString(),
						t.toString(),
					)
				: StringUtils_1.StringUtils.Format(
						CommonDefine_1.MATERIAL_ENOUGHT_TEXT_PATTERN,
						e.toString(),
						t.toString(),
					)
			: StringUtils_1.StringUtils.Format(
					CommonDefine_1.MATERIAL_NEED_SELECT_TEXT_PATTERN,
					t.toString(),
				)),
			this.GetText(2).SetText(i);
	}
	Kbe() {
		var t;
		this.Aqt.m3n
			? (this.GetTexture(1).SetUIActive(!0),
				(t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.Aqt.G3n)),
				this.SetTextureByPath(t.Icon, this.GetTexture(1)))
			: this.GetTexture(1).SetUIActive(!1);
	}
	Pqt() {
		this.Aqt.m3n
			? (this.GetSprite(0).SetUIActive(!0),
				this.SetItemQualityIcon(this.GetSprite(0), this.Aqt.G3n))
			: this.GetSprite(0).SetUIActive(!1);
	}
	OnBeforeDestroy() {}
}
class CookMaterialItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.yGe = void 0),
			(this.Xy = 0),
			(this.Wgt = void 0),
			(this.Aqt = void 0),
			(this.OnClick = () => {
				this?.Wgt(this.Aqt, this.Xy);
			});
	}
	BindOnClickedCallback(t) {
		(this.Wgt = void 0), (this.Wgt = t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	OnStart() {
		(this.yGe = new CookMaterialItemContent()),
			this.yGe.CreateThenShowByActor(this.GetItem(0).GetOwner()),
			(this.yGe.ClickDelegate = void 0),
			(this.yGe.ClickDelegate = this.OnClick);
	}
	Update(t, e) {
		(this.Aqt = t), this.yGe.Update(t), (this.Xy = e);
	}
	UpdateSelectedState(t) {
		t === this.Xy ? this.yGe.SetSelect() : this.yGe.SetDelect();
	}
	RefreshNeed(t = 1) {
		this.yGe.RefreshNeed(t);
	}
	OnBeforeDestroy() {
		this.yGe.Destroy();
	}
}
exports.CookMaterialItem = CookMaterialItem;
