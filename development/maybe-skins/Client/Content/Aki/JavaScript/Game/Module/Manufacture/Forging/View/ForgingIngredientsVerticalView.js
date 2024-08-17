"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ForgingIngredientsVerticalView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	AttributeItem_1 = require("../../../Common/AttributeItem"),
	MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid"),
	NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
	CommonManager_1 = require("../../Common/CommonManager"),
	ManufactureMaterialItem_1 = require("../../Common/Item/ManufactureMaterialItem"),
	ComposeController_1 = require("../../Compose/ComposeController"),
	ForgingController_1 = require("../ForgingController");
class ProficiencyView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.uqt = void 0),
			(this.OnChangeRoleClick = () => {
				this.uqt && this.uqt();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
		]),
			(this.BtnBindInfo = [[2, this.OnChangeRoleClick]]);
	}
	BindChangeRoleClick(e) {
		this.uqt = e;
	}
	SetExpNumVisible(e) {
		this.GetText(0).SetUIActive(e);
	}
	SetExpNum(e, t, i, o) {
		(e = e * t) !== (i = t * i)
			? ((t = StringUtils_1.StringUtils.Format(
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"AddProficiency",
					),
					"+" + t * o,
				)),
				(o = StringUtils_1.StringUtils.Format(
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"CumulativeProficiency",
					),
					e.toString(),
					i.toString(),
				)),
				(e = t.concat(" ", "(", o, ")")),
				this.GetText(0).SetText(e))
			: LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "Proficiency");
	}
	SetRoleTexture(e) {
		var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
		this.SetRoleIcon(
			t.GetRoleConfig().RoleHeadIconLarge,
			this.GetTexture(1),
			e,
		);
	}
}
class StarItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0);
	}
	Refresh(e, t, i) {
		0 === e
			? (this.GetSprite(0).SetUIActive(!0), this.GetSprite(1).SetUIActive(!1))
			: (this.GetSprite(0).SetUIActive(!1), this.GetSprite(1).SetUIActive(!0));
	}
	Clear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	GetKey(e, t) {
		return e;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UISprite],
		]),
			(this.BtnBindInfo = []);
	}
	OnStart() {
		this.GetSprite(2).SetUIActive(!1);
	}
	SetState(e) {}
}
class AttributeItemInternal extends AttributeItem_1.AttributeItem {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UITexture],
		];
	}
	SetBgActive() {}
}
class WeaponAttributeView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this._Ti = void 0),
			(this.uTi = void 0),
			(this.cTi = void 0),
			(this.mTi = void 0),
			(this.dTi = void 0),
			(this.sAt = () => new StarItem()),
			(this.w0t = 1),
			(this.CTi = 0);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[4, UE.UIItem],
			[3, UE.UIHorizontalLayout],
			[5, UE.UIItem],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = []);
	}
	OnStart() {
		this.mTi ||
			((this.mTi = new AttributeItemInternal()),
			this.mTi.CreateThenShowByActor(this.GetItem(5).GetOwner())),
			this.dTi ||
				((this.dTi = new AttributeItemInternal()),
				this.dTi.CreateThenShowByActor(this.GetItem(6).GetOwner())),
			(this.cTi = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(3),
				this.sAt,
			));
		var e = this.cTi.GetRootUiItem().GetAttachUIChildren();
		for (let t = 0; t < e.Num(); t++) e.Get(t).SetUIActive(!1);
	}
	gTi() {
		var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
			this._Ti.ResonId,
			1,
		);
		e && this.GetText(1).ShowTextNew(e.Name);
	}
	aqe() {
		var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(
			this._Ti.BreachId,
		);
		e = new Array(e);
		this.cTi.RefreshByData(e);
	}
	fTi() {
		var e = this.uTi.LevelLimit;
		LguiUtil_1.LguiUtil.SetLocalText(
			this.GetText(2),
			"ForgingWeaponLevel",
			1,
			e,
		);
	}
	pTi() {
		this.mTi.UpdateParam(this._Ti.FirstPropId.Id, this._Ti.FirstPropId.IsRatio);
		var e = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
			this._Ti.FirstCurve,
			this._Ti.FirstPropId.Value,
			this.w0t,
			this.CTi,
		);
		this.mTi.SetCurrentValue(e),
			this.dTi.UpdateParam(
				this._Ti.SecondPropId.Id,
				this._Ti.SecondPropId.IsRatio,
			),
			(e = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
				this._Ti.SecondCurve,
				this._Ti.SecondPropId.Value,
				this.w0t,
				this.CTi,
			));
		this.dTi.SetCurrentValue(e),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(0),
				"WeaponResonanceItemLevelText",
				"1",
			);
	}
	RefreshTips(e) {
		(e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
			e.ItemId,
		)),
			(this._Ti =
				ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
					e.ItemId,
				)),
			(this.uTi = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
				this._Ti.BreachId,
				1,
			)),
			this.gTi(),
			this.fTi(),
			this.aqe(),
			this.pTi();
	}
}
class SvInfo extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.vTi = void 0),
			(this.ChangeRoleClickDelegate = void 0);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIText],
			[1, UE.UIItem],
			[6, UE.UIVerticalLayout],
		]),
			(this.BtnBindInfo = []);
	}
	async OnBeforeStartAsync() {
		(this.vTi = new WeaponAttributeView()),
			await this.vTi.CreateByActorAsync(this.GetItem(1).GetOwner());
	}
	OnStart() {
		this.vTi.SetActive(!0);
	}
	SetTypeName(e = void 0) {
		var t = this.GetText(0);
		e ? (t.SetUIActive(!0), t.SetText(e)) : t.SetUIActive(!1);
	}
	SetTypeNameVisible(e) {
		this.GetText(0).SetUIActive(e);
	}
	SetDescVisible(e) {
		this.GetText(3).SetUIActive(e);
	}
	SetDescBgVisible(e) {
		this.GetText(5).SetUIActive(e);
	}
	SetDesc(e) {
		this.GetText(3).SetText(e);
	}
	SetDescBg(e) {
		this.GetText(5).SetText(e);
	}
	SetWeaponAttribute(e) {
		this.vTi.RefreshTips(e);
	}
}
class ForgingIngredientsVerticalView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.t6 = 1),
			(this.fqt = void 0),
			(this.WGe = void 0),
			(this.dqt = void 0),
			(this.Sqt = void 0),
			(this.vIi = void 0),
			(this.pqt = void 0),
			(this.mqt = void 0),
			(this.vqt = !1),
			(this.Mqt = 0),
			(this._9e = () => {
				this.vIi && this.vIi();
			}),
			(this.Eqt = () => {
				var e = new ManufactureMaterialItem_1.ManufactureMaterialItem();
				return (
					e.BindOnCanExecuteChange(() => !1),
					e.BindOnExtendToggleClicked((e) => {
						(e = e.Data),
							ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
								e.G3n,
							);
					}),
					e
				);
			}),
			(this.yqt = (e) => {
				var t;
				(this.t6 = e),
					this.dqt &&
						((t = ForgingController_1.ForgingController.GetMaxCreateCount(
							this.dqt.ItemId,
						)),
						this.WGe.SetAddButtonInteractive(e < t),
						this.WGe.SetReduceButtonInteractive(1 < e)),
					this.Iqt(),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(10),
						"Text_ItemSelectForgeQuantityTip_text",
						this.t6,
					);
			});
	}
	GetManufactureCount() {
		return this.t6;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[19, UE.UIScrollViewWithScrollbarComponent],
			[17, UE.UIText],
			[18, UE.UIItem],
			[20, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIText],
			[1, UE.UIItem],
			[21, UE.UIItem],
			[8, UE.UIItem],
			[16, UE.UIItem],
			[22, UE.UIItem],
			[23, UE.UIText],
			[9, UE.UIItem],
			[10, UE.UIText],
			[24, UE.UIItem],
			[25, UE.UIText],
			[11, UE.UIText],
			[12, UE.UIText],
			[13, UE.UITexture],
			[26, UE.UIItem],
		]),
			(this.BtnBindInfo = []);
	}
	async OnBeforeStartAsync() {
		(this.pqt = new GenericScrollViewNew_1.GenericScrollViewNew(
			this.GetScrollViewWithScrollbar(19),
			this.Eqt,
		)),
			(this.fqt = new SvInfo()),
			await this.fqt.CreateByActorAsync(this.GetItem(0).GetOwner()),
			this.fqt.SetActive(!0),
			(this.mqt = new ProficiencyView()),
			await this.mqt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner()),
			this.mqt.BindChangeRoleClick(this._9e);
	}
	OnStart() {
		this.GetItem(1).SetUIActive(!1),
			this.GetText(17).ShowTextNew("PrefabTextItem_MaterialChoose_Text"),
			this.GetText(23).ShowTextNew("NeedMaterialTitleText"),
			(this.Sqt = new MediumItemGrid_1.MediumItemGrid()),
			this.Sqt.Initialize(this.GetItem(21).GetOwner()),
			this.Sqt.BindOnCanExecuteChange(() => !1),
			this.Sqt.BindOnExtendToggleClicked((e) => {
				(e = e.Data),
					ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
						e,
					);
			});
		var e = this.GetItem(8);
		(this.WGe = new NumberSelectComponent_1.NumberSelectComponent(e)),
			(e = { MaxNumber: 0, ValueChangeFunction: this.yqt });
		this.WGe.Init(e),
			this.WGe.SetNumberSelectTipsVisible(!1),
			this.WGe.SetAddReduceButtonActive(!0),
			(this.fqt.ChangeRoleClickDelegate = this._9e),
			this.fqt.SetTypeNameVisible(!1),
			this.GetText(12).SetUIActive(!1);
	}
	OnBeforeDestroy() {
		this.fqt.Destroy();
	}
	BindChangeClickCall(e) {
		this.vIi = e;
	}
	Iqt() {
		this.Tqt(this.vqt, this.Mqt * this.t6);
		var e = this.pqt?.GetScrollItemList();
		if (e) for (const t of e) t.SetTimes(this.t6);
	}
	eOt(e) {
		(this.dqt = e), (this.t6 = 1);
		var t = CommonManager_1.CommonManager.GetMaxCreateCount(this.dqt.ItemId),
			i =
				((t =
					(this.WGe.Refresh(t),
					this.WGe.SetAddReduceButtonActive(!0),
					this.WGe.SetReduceButtonInteractive(!1),
					this.fqt.SetDescVisible(!0),
					this.fqt.SetDescBgVisible(!1),
					ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
						e.ItemId,
					))),
				(e = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(
					t.ItemId,
				)),
				ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
					e,
					1,
				));
		(e = StringUtils_1.StringUtils.Format(
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Desc),
			...i,
		)),
			(i = StringUtils_1.StringUtils.IsEmpty(t.Background)
				? ""
				: ConfigManager_1.ConfigManager.CookConfig.GetLocalText(t.Background));
		this.fqt.SetDesc(e), this.fqt.SetDescBg(i), this.mqt.SetExpNumVisible(!1);
	}
	Uqt(e) {
		let t = !1,
			i = 0;
		return (
			(e = e.filter(
				(e) =>
					e.G3n !== ComposeController_1.ComposeController.ComposeCoinId ||
					((t = !0), (i = e.k4n), !1),
			)),
			[t, i, e]
		);
	}
	MTi() {
		var e, t;
		this.dqt.IsUnlock
			? (this.GetItem(20).SetUIActive(!1),
				this.GetItem(18).SetUIActive(!0),
				(t = ModelManager_1.ModelManager.ForgingModel.GetForgingMaterialList(
					this.dqt.ItemId,
				)),
				([this.vqt, this.Mqt, t] = this.Uqt(t)),
				this.pqt.RefreshByData(t, () => {
					this.Iqt();
				}))
			: (this.GetItem(20).SetUIActive(!0),
				this.GetItem(18).SetUIActive(!1),
				(t = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
					this.dqt.ItemId,
				)),
				(e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
					t.FormulaItemId,
				)) &&
					((t = {
						Type: 4,
						Data: t.FormulaItemId,
						ItemConfigId: t.FormulaItemId,
						BottomTextId: e.Name,
						IsProhibit: !0,
						IsOmitBottomText: !0,
					}),
					this.Sqt.Apply(t)));
	}
	gqt(e) {
		return (
			!!e ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("Compose", 50, "缺少itemData数据"),
			!1)
		);
	}
	kqn() {
		var e = CommonManager_1.CommonManager.GetCurrentRoleId();
		e && this.mqt.SetRoleTexture(e);
	}
	EIi(e) {
		if (this.gqt(e)) {
			let t = CommonManager_1.CommonManager.GetManufactureRoleId(e.ItemId);
			(t = t || ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId()),
				CommonManager_1.CommonManager.SetCurrentRoleId(t),
				this.mqt.SetRoleTexture(t);
		}
	}
	RefreshHelpRole() {
		this.kqn();
	}
	OnSecondTimerRefresh() {
		this.dqt && this.Dqt(this.dqt);
	}
	Dqt(e) {
		e.ExistEndTime <= 0
			? (this.GetItem(24).SetUIActive(!1), this.WGe.ResetLimitMaxValue())
			: (this.GetItem(24).SetUIActive(!0),
				(e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(
					e.ExistEndTime - TimeUtil_1.TimeUtil.GetServerTime(),
				)),
				this.GetText(25).SetText(e.CountDownText));
	}
	Rqt(e) {
		if (e.TotalMakeCountInLimitTime <= 0)
			this.GetItem(3).SetUIActive(!1), this.WGe.ResetLimitMaxValue();
		else {
			var t = e.TotalMakeCountInLimitTime - e.MadeCountInLimitTime;
			this.WGe.SetLimitMaxValue(Math.max(1, t));
			let i = t.toString();
			0 === t &&
				(i = StringUtils_1.StringUtils.Format(
					"<color=#c25757>{0}</color>",
					t.toString(),
				)),
				this.GetItem(3).SetUIActive(!0),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(4),
					"MakeLimit",
					i,
					e.TotalMakeCountInLimitTime,
				);
		}
	}
	Tqt(e, t) {
		var i;
		this.GetText(12).GetParentAsUIItem().SetUIActive(e),
			e &&
				((e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					ComposeController_1.ComposeController.ComposeCoinId,
				)),
				(i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
					ComposeController_1.ComposeController.ComposeCoinId,
				)),
				e < t
					? this.GetText(11).SetText(
							StringUtils_1.StringUtils.Format(
								"<color=#c25757>{0}</color>",
								t.toString(),
							),
						)
					: this.GetText(11).SetText(t.toString()),
				this.SetTextureByPath(i.IconSmall, this.GetTexture(13)));
	}
	RefreshForging(e) {
		this.Dqt(e),
			this.Rqt(e),
			this.eOt(e),
			this.MTi(),
			this.fqt.SetWeaponAttribute(e),
			e.IsUnlock
				? (this.mqt.SetActive(!1),
					this.EIi(this.dqt),
					this.WGe.SetActive(!0),
					this.GetItem(22).SetUIActive(!1),
					this.GetItem(16).SetUIActive(!0),
					this.GetItem(9).SetUIActive(!0))
				: (this.mqt.SetActive(!1),
					this.WGe.SetActive(!1),
					this.GetItem(22).SetUIActive(!0),
					this.GetItem(16).SetUIActive(!1),
					this.GetItem(9).SetUIActive(!1));
	}
}
exports.ForgingIngredientsVerticalView = ForgingIngredientsVerticalView;
