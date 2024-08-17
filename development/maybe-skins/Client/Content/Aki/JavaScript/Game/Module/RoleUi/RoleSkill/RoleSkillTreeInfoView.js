"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillTreeInfoView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ButtonItem_1 = require("../../Common/Button/ButtonItem"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	ItemDefines_1 = require("../../Item/Data/ItemDefines"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	CostMediumItemGrid_1 = require("../RoleBreach/CostMediumItemGrid"),
	RoleController_1 = require("../RoleController"),
	CommonAttributeData_1 = require("../View/ViewData/CommonAttributeData"),
	RoleSkillInputPanel_1 = require("./RoleSkillInputPanel"),
	RoleSkillTreeAttributeItem_1 = require("./RoleSkillTreeAttributeItem");
class RoleSkillTreeInfoView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.zke = 0),
			(this.Ico = 0),
			(this.Nco = void 0),
			(this.Oco = void 0),
			(this.kco = void 0),
			(this.Fco = void 0),
			(this.lqe = void 0),
			(this.p8t = void 0),
			(this.Vco = void 0),
			(this.yco = !1),
			(this.Hco = !1),
			(this.jco = 1),
			(this.Wco = []),
			(this.Kco = []),
			(this.x4t = !1),
			(this.Qco = (e, t) => {
				this.Update(e, t), this.Xco(this.jco);
			}),
			(this.i2e = () => {
				UiManager_1.UiManager.CloseView("RoleSkillTreeInfoView"),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnRoleInternalViewQuit,
					);
			}),
			(this.$co = (e) => {
				(this.Hco = e), this.Yco(this.jco, e), this.Jco(e);
			}),
			(this.w4t = (e) => {
				(ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc = e),
					(this.x4t = e),
					this.Update(this.zke, this.Ico);
			}),
			(this.zco = () => {
				(this.Hco = !1),
					this.GetExtendToggle(19).SetToggleState(0),
					this.Zco(),
					this.Jco(!1);
			}),
			(this.emo = () => {
				(this.Hco = !1),
					this.GetExtendToggle(19).SetToggleState(0),
					this.tmo(),
					this.Jco(!1);
			}),
			(this.imo = () => {
				(this.jco = 1), this.Xco(this.jco);
			}),
			(this.omo = () => {
				(this.jco = 2), this.Xco(this.jco);
			}),
			(this.rmo = () => {
				var e = this.Nco.GetSkillNodeLevel(this.Oco);
				if (
					(e =
						ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(
							this.Ico,
							e + 1,
						))
				)
					for (var [t, i] of e)
						if (
							ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
								t,
							) < i
						)
							return void (t === ItemDefines_1.EItemId.Gold
								? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"RoleNoMoney",
									)
								: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"RoleNoMaterial",
									));
				1 === (e = this.Oco.NodeType) || 2 === e
					? RoleController_1.RoleController.SendPbUpLevelSkillRequest(
							this.zke,
							this.Ico,
						)
					: RoleController_1.RoleController.SendRoleActivateSkillRequest(
							this.zke,
							this.Ico,
						);
			}),
			(this.nmo = () => {
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(172);
				e.FunctionMap.set(2, () => {
					this.CloseMe(),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.SelectRoleTabOutside,
							"RoleAttributeTabView",
						);
				}),
					(e.IsEscViewTriggerCallBack = !1),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					);
			}),
			(this.Wyt = () => {
				var e = new CostMediumItemGrid_1.CostMediumItemGrid();
				return (
					e.BindOnExtendToggleClicked((e) => {
						(e = e.Data),
							ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
								e.ItemId,
							);
					}),
					e.BindOnCanExecuteChange(() => !1),
					e
				);
			}),
			(this.Dje = (e, t, i) => {
				t = new RoleSkillTreeAttributeItem_1.RoleSkillTreeAttributeItem(t);
				var o = this.Wco[i],
					l = i < this.Kco.length ? this.Kco[i] : void 0;
				return t.Refresh(o, l), { Key: i, Value: t };
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UITexture],
			[9, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIExtendToggle],
			[5, UE.UIExtendToggle],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIScrollViewWithScrollbarComponent],
			[2, UE.UIText],
			[10, UE.UIText],
			[11, UE.UIHorizontalLayout],
			[12, UE.UITexture],
			[13, UE.UIText],
			[14, UE.UIItem],
			[15, UE.UIItem],
			[16, UE.UIText],
			[17, UE.UIItem],
			[18, UE.UIText],
			[19, UE.UIExtendToggle],
			[20, UE.UIItem],
			[21, UE.UIItem],
			[22, UE.UIItem],
			[23, UE.UIItem],
			[24, UE.UIButtonComponent],
			[25, UE.UIButtonComponent],
			[26, UE.UIButtonComponent],
			[27, UE.UIItem],
			[28, UE.UIItem],
			[29, UE.UIButtonComponent],
			[30, UE.UIExtendToggle],
			[31, UE.UIItem],
			[32, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[4, this.imo],
				[5, this.omo],
				[19, this.$co],
				[24, this.i2e],
				[25, this.zco],
				[26, this.nmo],
				[29, this.emo],
				[30, this.w4t],
			]);
	}
	async OnBeforeStartAsync() {
		this.Vco = new RoleSkillInputPanel_1.RoleSkillInputPanel();
		var e = this.GetItem(28).GetOwner();
		await this.Vco.CreateThenShowByActorAsync(e);
	}
	OnStart() {
		(this.kco = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(11),
			this.Wyt,
		)),
			(this.Fco = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(8),
				this.Dje,
			)),
			(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(21))),
			this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
			this.lqe.SetCurrencyItemVisible(!0),
			(this.p8t = new ButtonItem_1.ButtonItem(this.GetItem(14))),
			this.p8t.SetFunction(this.rmo),
			this.GetItem(20).SetUIActive(!1),
			this.SetItemIcon(this.GetTexture(12), ItemDefines_1.EItemId.Gold);
		var e = ModelManager_1.ModelManager.GameModeModel.IsMulti,
			t =
				((e =
					(this.GetItem(31).SetUIActive(e),
					(this.x4t =
						ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc && e),
					this.x4t ? 1 : 0)),
				(e = (this.GetExtendToggle(30).SetToggleState(e), this.OpenParam))
					.RoleId);
		e = e.SkillNodeId;
		(this.jco = 1), this.Update(t, e), this.smo(!1);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UpdateSkillTreeInfoView,
			this.Qco,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UpdateSkillTreeInfoView,
			this.Qco,
		);
	}
	Update(e, t) {
		(this.zke = e),
			(this.Ico = t),
			(this.Oco =
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
					this.Ico,
				));
		let i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
		(i = i || ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)),
			(this.Nco = i.GetSkillData()),
			this.Vco?.RefreshUi(e),
			this.Refresh(),
			i.IsTrialRole() && this.amo();
	}
	Refresh() {
		if (!this.InAsyncLoading())
			switch (
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(this.Ico)
					.NodeType
			) {
				case 4:
					this.hmo();
					break;
				case 3:
					this.lmo();
					break;
				case 2:
					this._mo();
					break;
				case 1:
					this.umo();
			}
	}
	amo() {
		this.GetItem(22).SetUIActive(!1),
			this.GetItem(17).SetUIActive(!1),
			this.GetItem(15).SetUIActive(!1),
			this.p8t.SetActive(!1),
			this.GetExtendToggle(19).RootUIComp.SetUIActive(!1),
			this.lqe.SetCurrencyItemVisible(!1);
	}
	hmo() {
		(this.yco = !0),
			(this.jco = 1),
			this.GetText(3).SetUIActive(!1),
			this.GetItem(6).SetUIActive(!1),
			this.GetExtendToggle(19).RootUIComp.SetUIActive(!1),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(2),
				"SkillType_AttributeNode_TypeName",
			);
		var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
			this.Ico,
		);
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.PropertyNodeTitle),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(10),
				e.PropertyNodeDescribe,
				...e.PropertyNodeParam,
			),
			this.cmo(),
			this.mmo();
	}
	lmo() {
		(this.yco = !1),
			(this.jco = 1),
			this.GetText(3).SetUIActive(!1),
			this.GetItem(6).SetUIActive(!1),
			this.GetExtendToggle(19).RootUIComp.SetUIActive(!1),
			this.tlo(),
			this.cmo(),
			this.mmo();
	}
	umo() {
		(this.yco = !1), this.dmo(), this.mmo();
	}
	_mo() {
		(this.yco = !1), this.dmo(), this.mmo();
	}
	dmo() {
		this.GetText(3).SetUIActive(!0), this.GetItem(6).SetUIActive(!0);
		var e = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(
				this.zke,
				this.Ico,
			),
			t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(
				this.Oco.SkillId,
			).MaxSkillLevel;
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "RoleResonanceLevel", e),
			e === t
				? LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(32),
						"PrefabTextItem_3463157315_Text",
					)
				: LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(32),
						"PrefabTextItem_SkillNext_Text",
					),
			this.tlo(),
			this.Cmo();
	}
	tlo() {
		var e,
			t = this.Oco.SkillId;
		t &&
			0 < t &&
			((t =
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(t)),
			(e =
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(
					t.SkillType,
				)) && this.GetText(2).SetText(e),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.SkillName),
			this.x4t
				? LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(10),
						t.MultiSkillDescribe,
						...t.MultiSkillDetailNum,
					)
				: LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(10),
						t.SkillDescribe,
						...t.SkillDetailNum,
					));
	}
	mmo() {
		let e;
		e =
			(t = this.Oco.SkillId) && 0 < t
				? ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(t)
						?.Icon
				: this.Oco.PropertyNodeIcon;
		var t = this.GetTexture(1),
			i = this.GetSprite(0);
		this.yco
			? (t.SetUIActive(!0), i.SetUIActive(!1), this.SetTextureByPath(e, t))
			: (t.SetUIActive(!1), i.SetUIActive(!0), this.SetSpriteByPath(e, i, !1));
	}
	oHi(e = 1) {
		if (
			(e =
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(
					this.Ico,
					e,
				)) &&
			0 !== e.size
		) {
			this.GetItem(22).SetUIActive(!0), this.GetItem(23).SetUIActive(!0);
			var t,
				i,
				o,
				l = [];
			let n = 0;
			for ([t, i] of e)
				t === ItemDefines_1.EItemId.Gold
					? (n = i)
					: ((o = {
							ItemId: t,
							IncId: 0,
							Count: i,
							SelectedCount:
								ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
									t,
								),
						}),
						l.push(o));
			var s =
				((e = this.GetText(13)).SetText(n.toString()),
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					ItemDefines_1.EItemId.Gold,
				));
			(e.useChangeColor = s < n), this.kco.RefreshByData(l);
		} else this.GetItem(22).SetUIActive(!1), this.GetItem(23).SetUIActive(!1);
	}
	cmo() {
		var e = this.Nco.GetSkillTreeNodeState(this.Oco, this.zke);
		this.p8t.SetActive(2 === e),
			this.GetItem(22).SetUIActive(2 === e),
			this.GetItem(23).SetUIActive(2 === e),
			this.GetItem(17).SetUIActive(1 === e),
			this.GetItem(15).SetUIActive(3 === e),
			3 === e
				? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(16), "Actived")
				: (this.oHi(),
					2 === e
						? this.p8t.SetLocalText("RoleResonActive")
						: 1 === e &&
							((e = this.Nco.GetUnlockConditionTextId(this.Oco)),
							LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), e)),
					(e = this.Nco.GetSkillTreeUnsatisfiedCondition(this.Oco)),
					this.GetButton(26).RootUIComp.SetUIActive(!(2 === e?.ConditionType)));
	}
	Cmo() {
		var e,
			t = this.Nco.GetSkillTreeNodeState(this.Oco, this.zke);
		this.p8t.SetActive(2 === t),
			this.GetItem(22).SetUIActive(3 !== t),
			this.GetItem(23).SetUIActive(3 !== t),
			this.GetItem(17).SetUIActive(1 === t),
			this.GetItem(15).SetUIActive(3 === t),
			this.GetExtendToggle(19).RootUIComp.SetUIActive(!0),
			this.gmo(),
			3 === t
				? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(16), "RoleAlreadyMax")
				: ((e = this.Nco.GetSkillNodeLevel(this.Oco)),
					this.oHi(e + 1),
					2 === t
						? this.p8t.SetLocalText("RoleLevelUp")
						: 1 === t &&
							((e = this.Nco.GetUnlockConditionTextId(this.Oco)),
							LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), e)),
					(t = this.Nco.GetSkillTreeUnsatisfiedCondition(this.Oco)),
					this.GetButton(26).RootUIComp.SetUIActive(!(2 === t?.ConditionType)));
	}
	fmo(e) {
		var t = new CommonAttributeData_1.CommonAttributeData(),
			i =
				ModelManager_1.ModelManager.RoleModel.GetSkillAttributeNameByOneSkillEffect(
					e,
				);
		return (
			(t.AttrNameText =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i) ?? ""),
			(t.AttrBaseValue =
				ModelManager_1.ModelManager.RoleModel.GetSkillAttributeDescriptionByOneSkillEffect(
					e,
				)),
			t
		);
	}
	gmo() {
		(this.Wco.length = 0), (this.Kco.length = 0);
		var e =
				ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetSkillEffect()
					.EffectDescList,
			t = void 0 !== e ? e.length : 0,
			i =
				ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetNextLevelSkillEffect()
					?.EffectDescList;
		for (let o = 0; o < t; o++)
			this.Wco.push(this.fmo(e[o])), i && this.Kco.push(this.fmo(i[o]));
		this.Fco.RefreshByData(this.Wco);
	}
	Xco(e) {
		1 === e ? this.smo() : this.pmo();
	}
	smo(e = 0) {
		this.GetExtendToggle(4).SetToggleState(1),
			this.GetExtendToggle(5).SetToggleState(0),
			this.GetItem(7).SetUIActive(!0),
			this.GetScrollViewWithScrollbar(8).GetRootComponent().SetUIActive(!1),
			this.Zco(),
			this.Yco(this.jco, this.Hco);
	}
	pmo() {
		this.GetExtendToggle(4).SetToggleState(0),
			this.GetExtendToggle(5).SetToggleState(1),
			this.GetItem(7).SetUIActive(!1),
			this.GetScrollViewWithScrollbar(8).GetRootComponent().SetUIActive(!0),
			this.tmo(),
			this.Yco(this.jco, this.Hco);
	}
	Yco(e, t) {
		2 === this.jco
			? t
				? this.vmo()
				: this.Zco()
			: t
				? this.Mmo()
				: this.tmo();
	}
	Mmo() {
		this.GetItem(27).SetUIActive(!0);
	}
	tmo() {
		this.GetItem(27).SetUIActive(!1);
	}
	vmo() {
		this.GetItem(20).SetUIActive(!0);
		for (const e of this.Fco.GetScrollItemList()) e.SetNextLevelItem(!0);
	}
	Zco() {
		this.GetItem(20).SetUIActive(!1);
		for (const e of this.Fco.GetScrollItemList()) e.SetNextLevelItem(!1);
	}
	Jco(e) {
		e
			? (this.UiViewSequence.StopSequenceByKey("ViewShow"),
				this.UiViewSequence.PlaySequence("ViewShow"))
			: (this.UiViewSequence.StopSequenceByKey("ViewHide"),
				this.UiViewSequence.PlaySequence("ViewHide"));
	}
}
exports.RoleSkillTreeInfoView = RoleSkillTreeInfoView;
