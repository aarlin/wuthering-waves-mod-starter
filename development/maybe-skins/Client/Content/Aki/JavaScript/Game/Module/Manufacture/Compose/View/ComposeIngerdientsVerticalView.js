"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComposeIngredientsVerticalView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid"),
	NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
	CommonManager_1 = require("../../Common/CommonManager"),
	ManufactureMaterialItem_1 = require("../../Common/Item/ManufactureMaterialItem"),
	ComposeController_1 = require("../ComposeController");
class ProficiencyView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.uqt = void 0),
			(this.Gft = void 0),
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
	OnStart() {
		this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(
			this.GetButton(2).RootUIComp,
		);
	}
	OnBeforeDestroy() {
		this.Gft.Clear();
	}
	BindChangeRoleClick(e) {
		this.uqt = e;
	}
	SetExpNum(e, t, i, o) {
		var n = (i = t * i) - (e = e * t);
		e = StringUtils_1.StringUtils.Format(
			ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				"CumulativeProficiency",
			),
			e.toString(),
			i.toString(),
		);
		0 < n
			? ((i = Math.min(n, t * o)),
				(t = StringUtils_1.StringUtils.Format(
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"AddProficiency",
					),
					"+" + Math.min(i, n),
				).concat(" ", "(", e, ")")),
				this.GetText(0).SetText(t))
			: ((o = StringUtils_1.StringUtils.Format(
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"AddProficiency",
					),
					"",
				).concat(" ", "(", e, ")")),
				this.GetText(0).SetText(o));
	}
	SetExpVisible(e) {
		this.GetText(0).SetUIActive(e);
	}
	SetRoleTexture(e, t) {
		var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
		this.SetRoleIcon(
			i.GetRoleConfig().RoleHeadIconLarge,
			this.GetTexture(1),
			e,
		),
			CommonManager_1.CommonManager.CheckIsBuffEx(e, t)
				? this.Gft.GetCurrentSequence()
					? this.Gft.ReplaySequenceByKey("Show")
					: this.Gft.PlayLevelSequenceByName("Show")
				: this.Gft?.StopCurrentSequence(!1, !0);
	}
	SetTypeContent(e = void 0) {
		var t = this.GetText(3);
		e ? (t.SetUIActive(!0), t.SetText(e)) : t.SetUIActive(!1);
	}
}
class SvInfo extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UIVerticalLayout],
		]),
			(this.BtnBindInfo = []);
	}
	OnStart() {
		this.GetItem(1).SetUIActive(!1);
	}
	SetTypeName(e = void 0) {
		var t = this.GetText(0);
		e ? (t.SetUIActive(!0), t.SetText(e)) : t.SetUIActive(!1);
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
}
class ComposeIngredientsVerticalView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.fqt = void 0),
			(this.dqt = void 0),
			(this.t6 = 1),
			(this.WGe = void 0),
			(this.vIi = void 0),
			(this.pqt = void 0),
			(this.vqt = !1),
			(this.Mqt = 0),
			(this.Sqt = void 0),
			(this.mqt = void 0),
			(this.yqt = (e) => {
				var t;
				(this.t6 = e),
					this.Iqt(),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(10),
						"Text_ItemSelectSynthesisQuantityTip_text",
						this.t6,
					),
					this.dqt &&
						this.dqt &&
						((t = ComposeController_1.ComposeController.GetMaxCreateCount(
							this.dqt.ItemId,
						)),
						this.WGe.SetAddButtonInteractive(e < t),
						this.WGe.SetReduceButtonInteractive(1 < e),
						this.MIi(this.dqt));
			}),
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
			[2, UE.UIText],
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
			(this.mqt = new ProficiencyView()),
			await this.mqt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner()),
			this.mqt.BindChangeRoleClick(this._9e);
	}
	OnStart() {
		this.fqt.SetActive(!0),
			this.GetItem(1).SetUIActive(!1),
			this.GetItem(9).SetUIActive(!0),
			this.GetItem(22).SetUIActive(!1),
			this.GetItem(16).SetUIActive(!0),
			this.GetText(23).ShowTextNew("NeedMaterialTitleText"),
			this.GetText(17).ShowTextNew("PrefabTextItem_MaterialChoose_Text"),
			this.GetItem(18).SetUIActive(!0);
		var e = this.GetItem(8);
		(this.WGe = new NumberSelectComponent_1.NumberSelectComponent(e)),
			(e = { MaxNumber: 0, ValueChangeFunction: this.yqt });
		this.WGe.Init(e),
			this.WGe.SetUiActive(!0),
			this.WGe.SetNumberSelectTipsVisible(!1),
			this.WGe.SetAddReduceButtonActive(!0),
			this.GetText(12).SetUIActive(!1),
			(this.Sqt = new MediumItemGrid_1.MediumItemGrid()),
			this.Sqt.Initialize(this.GetItem(21).GetOwner()),
			this.Sqt.BindOnCanExecuteChange(() => !1),
			this.Sqt.BindOnExtendToggleClicked((e) => {
				(e = e.Data),
					ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
						e,
					);
			});
	}
	Iqt() {
		this.Tqt(this.vqt, this.Mqt * this.t6);
		var e = this.pqt?.GetScrollItemList();
		if (e) for (const t of e) t.SetTimes(this.t6);
	}
	OnBeforeDestroy() {
		this.fqt.Destroy();
	}
	Lqt(e) {
		(e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e)),
			this.fqt.SetTypeName(),
			this.mqt.SetTypeContent(e);
	}
	SIi(e, t, i, o) {
		this.mqt.SetExpNum(e, t, i, o);
	}
	gqt(e) {
		return (
			!!e ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("Compose", 50, "缺少itemData数据"),
			!1)
		);
	}
	kqn(e) {
		var t = CommonManager_1.CommonManager.GetCurrentRoleId();
		t && this.mqt.SetRoleTexture(t, e);
	}
	EIi(e) {
		var t;
		this.gqt(e) &&
			(t = CommonManager_1.CommonManager.GetManufactureRoleId(e.ItemId)) &&
			(CommonManager_1.CommonManager.SetCurrentRoleId(t),
			this.mqt.SetRoleTexture(t, e.ItemId));
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
	eOt(e) {
		(this.dqt = e), (this.t6 = 1);
		var t = ComposeController_1.ComposeController.GetMaxCreateCount(
				this.dqt.ItemId,
			),
			i =
				((t =
					(this.WGe.Refresh(t),
					this.WGe.SetAddReduceButtonActive(!0),
					this.WGe.SetReduceButtonInteractive(!1),
					ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
						e.ItemId,
					))),
				this.fqt.SetDescVisible(!0),
				this.fqt.SetDescBgVisible(!1),
				ConfigManager_1.ConfigManager.ItemConfig?.GetItemAttributeDesc(
					t.ItemId,
				));
		t = StringUtils_1.StringUtils.IsEmpty(t.ComposeBackground)
			? ""
			: ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
					t.ComposeBackground,
				);
		this.fqt.SetDesc(i),
			this.fqt.SetDescBg(t),
			this.WGe.SetUiActive(0 < e.IsUnlock),
			this.GetItem(9).SetUIActive(0 < e.IsUnlock),
			e.IsUnlock
				? (this.GetItem(20).SetUIActive(!1),
					this.GetItem(18).SetUIActive(!0),
					(i = ModelManager_1.ModelManager.ComposeModel.GetComposeMaterialList(
						e.ItemId,
					)),
					([this.vqt, this.Mqt, i] = this.Uqt(i)),
					this.pqt.RefreshByData(i, () => {
						this.Iqt();
					}))
				: (this.GetItem(20).SetUIActive(!0),
					this.GetItem(18).SetUIActive(!1),
					(t =
						ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
							this.dqt.ItemId,
						)),
					(e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
						t.FormulaItemId,
					)) &&
						((i = {
							Type: 4,
							Data: t.FormulaItemId,
							ItemConfigId: t.FormulaItemId,
							BottomTextId: e.Name,
							IsProhibit: !0,
							IsOmitBottomText: !0,
						}),
						this.Sqt.Apply(i)));
	}
	BindChangeClickCall(e) {
		this.vIi = e;
	}
	MIi(e) {
		var t = (i =
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
					e.ItemId,
				)).Proficiency,
			i = i.MaxProficiencyCount;
		this.SIi(e.ComposeCount, t, i, this.t6);
	}
	OnSecondTimerRefresh() {
		this.dqt && this.Dqt(this.dqt);
	}
	RefreshProficiencyAndHelpRole(e) {
		this.MIi(e), this.kqn(e.ItemId);
	}
	RefreshHelpRole() {
		this.kqn(this.dqt.ItemId);
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
	Fqn(e, t = !1) {
		t ? this.mqt.SetExpVisible(e) : this.mqt.SetActive(e);
	}
	RefreshReagentProduction(e) {
		this.Dqt(e),
			this.Rqt(e),
			this.eOt(e),
			this.Fqn(!0, !0),
			this.Lqt("Material"),
			this.MIi(e),
			this.EIi(e);
	}
	RefreshStructure(e) {
		this.Dqt(e),
			this.Rqt(e),
			this.eOt(e),
			this.Lqt("Prop"),
			this.Fqn(!1, !0),
			this.EIi(e);
	}
	RefreshPurification(e) {
		this.Dqt(e),
			this.Rqt(e),
			this.eOt(e),
			this.Lqt("Material"),
			this.Fqn(!1, !0),
			this.EIi(e),
			e.IsUnlock <= 0 && this.WGe.Refresh(0);
	}
}
exports.ComposeIngredientsVerticalView = ComposeIngredientsVerticalView;
