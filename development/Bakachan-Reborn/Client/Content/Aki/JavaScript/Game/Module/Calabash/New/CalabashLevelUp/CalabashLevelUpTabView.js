"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashLevelUpTabView = exports.CalabashAttributeContentItem =
		void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	ConditionGroupById_1 = require("../../../../../Core/Define/ConfigQuery/ConditionGroupById"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	PropRewardConfById_1 = require("../../../../../Core/Define/ConfigQuery/PropRewardConfById"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
	FormationAttributeController_1 = require("../../../Abilities/FormationAttributeController"),
	AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem"),
	NoCircleAttachView_1 = require("../../../AutoAttach/NoCircleAttachView"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
	RoleDefine_1 = require("../../../RoleUi/RoleDefine"),
	RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
	LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	CalabashController_1 = require("../../CalabashController"),
	CalabashLevelUpRewardItemGrid_1 = require("./CalabashLevelUpRewardItemGrid");
class CalabashGridData {
	constructor() {
		(this.Level = 0),
			(this.OverFlowExp = 0),
			(this.LimitExp = 0),
			(this.MaxExp = 0),
			(this.IsMaxLevel = !1),
			(this.HasOverFlowExpReach = !1);
	}
}
const tempVector = new UE.Vector();
class CalabashGrid extends AutoAttachItem_1.AutoAttachItem {
	constructor() {
		super(...arguments),
			(this.ButtonFunction = void 0),
			(this.ItemCurve = void 0),
			(this.qft = () => {
				this.ButtonFunction?.(this.CurrentShowItemIndex);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UISprite],
			[7, UE.UISprite],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[12, this.qft]]);
	}
	OnRefreshItem(e) {
		var t = e.Level,
			a =
				ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(
					t,
				),
			i = t <= ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
			o =
				(this.GetItem(2)?.SetUIActive(i),
				this.GetItem(1)?.SetUIActive(!i),
				this.GetText(3));
		o.SetText(t.toString()),
			o.SetChangeColor(i, o.changeColor),
			this.GetItem(4).SetUIActive(2 === a),
			this.GetItem(10).SetUIActive(3 === a),
			this.GetItem(11).SetUIActive(0 < t && 3 !== a),
			e.IsMaxLevel
				? this.GetItem(5).SetUIActive(!1)
				: (this.GetItem(5).SetUIActive(!0),
					(i = e.MaxExp),
					(o = e.OverFlowExp),
					this.GetSprite(6).SetFillAmount(o / i),
					this.GetSprite(7).SetFillAmount(e.LimitExp / i)),
			this.GetItem(8)?.SetUIActive(e.HasOverFlowExpReach),
			this.GetItem(9)?.SetUIActive(!e.HasOverFlowExpReach),
			(t = this.GetCurrentSelectedState());
		this.SetSelectState(t);
	}
	OnSelect() {
		this.SetSelectState(!0), this.qft();
	}
	OnUnSelect() {
		this.SetSelectState(!1);
	}
	SetSelectState(e) {}
	OnMoveItem() {
		var e = this.GetCurrentMovePercentage();
		e = this.ItemCurve.GetFloatValue(e);
		(tempVector.X = e),
			(tempVector.Y = e),
			(tempVector.Z = 1),
			this.GetItem(0)?.SetUIItemScale(tempVector),
			(tempVector.X = 1 / e),
			(tempVector.Y = 1 / e),
			(tempVector.Z = 1),
			this.GetItem(4)?.SetUIItemScale(tempVector);
	}
}
class CalabashAttributeData {
	constructor() {
		(this.Type = -1),
			(this.Name = void 0),
			(this.Value = void 0),
			(this.IsUp = !1),
			(this.IsCost = !1),
			(this.CostCount = 0),
			(this.CurrentSelect = !1),
			(this.CurrentSelectLevel = 0),
			(this.ClickCallBack = void 0);
	}
}
class CalabashAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.gNe = void 0),
			(this.Gft = void 0),
			(this.Pe = void 0),
			(this.Nft = !1),
			(this.kqe = () => {
				this.Pe?.ClickCallBack?.(this.Pe);
			}),
			(this.sGe = () => new CalabashAttributeContentItem());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIVerticalLayout],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.kqe]]);
	}
	OnStart() {
		this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
			(this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			(this.gNe = new GenericLayout_1.GenericLayout(
				this.GetVerticalLayout(7),
				this.sGe,
			));
	}
	Oft(e) {
		this.GetItem(3)?.SetUIActive(!1);
		var t = this.GetText(2);
		t?.SetUIActive(!0),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				t,
				e.Value.TextKey,
				...e.Value.Params,
			),
			this.GetItem(6)?.SetUIActive(!1),
			this.GetExtendToggle(0)?.RootUIComp.SetRaycastTarget(!1);
	}
	kft(e) {
		this.GetItem(3)?.SetUIActive(!1);
		var t = this.GetText(2);
		t?.SetUIActive(!0),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				t,
				e.Value.TextKey,
				...e.Value.Params,
			),
			(t = new Array());
		let a = new CalabashAttributeContentData();
		(a.Type = 0),
			(a.StringKey =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"UpAbsorptionTarget",
				)),
			(a.StringValue = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"UpAbsorptionTargetName",
			)),
			t.push(a),
			((a = new CalabashAttributeContentData()).Type = 0),
			(a.StringKey = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"UpAbsorptionTimeText",
			)),
			(e =
				(e =
					ConfigManager_1.ConfigManager.CalabashConfig.GetIntensifyCaptureGuarantee() -
					ModelManager_1.ModelManager.CalabashModel.GetIdentifyGuaranteeCount()) <=
				0
					? 0
					: e),
			(a.StringValue = StringUtils_1.StringUtils.Format(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"UpAbsorptionTimeDescText",
				),
				e.toString(),
				ConfigManager_1.ConfigManager.CalabashConfig.GetIntensifyCaptureGuarantee().toString(),
			)),
			t.push(a),
			this.gNe?.RefreshByData(t);
	}
	Fft(e) {
		this.GetItem(3)?.SetUIActive(!0),
			this.GetText(4)?.SetText(e.CostCount.toString()),
			this.GetText(2)?.SetUIActive(!1),
			this.GetItem(6)?.SetUIActive(!1);
	}
	Vft(e) {
		this.GetItem(3)?.SetUIActive(!1);
		var t = this.GetText(2);
		t?.SetUIActive(!0),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				t,
				e.Value.TextKey,
				...e.Value.Params,
			),
			(t = e.CurrentSelectLevel),
			(e =
				ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
					t,
				)?.QualityDropWeight);
		this.GetItem(6)?.SetUIActive(!0),
			this.GetExtendToggle(0)?.RootUIComp.SetRaycastTarget(!0);
		const a = new Array();
		e?.forEach((e, t) => {
			var i;
			0 < e &&
				(((i = new CalabashAttributeContentData()).Type = 2),
				(i.Key = t),
				(i.Value = e),
				a.push(i));
		}),
			this.gNe?.RefreshByData(a);
	}
	Hft() {
		this.Pe?.CurrentSelect
			? this.GetExtendToggle(0)?.SetToggleState(1)
			: this.GetExtendToggle(0)?.SetToggleState(0);
	}
	Refresh(e, t, a) {
		switch (
			((this.Pe = e),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name),
			this.GetItem(5)?.SetUIActive(2 === e.Type && e.IsUp),
			this.Hft(),
			e.Type)
		) {
			case 0:
				this.Oft(e);
				break;
			case 1:
				this.kft(e);
				break;
			case 3:
				this.Fft(e);
				break;
			case 2:
				this.Vft(e);
		}
		this.Nft !== e.CurrentSelect &&
			((this.Nft = e.CurrentSelect), this.jft(this.Nft));
	}
	jft(e) {
		this.Gft?.PlaySequencePurely(e ? "Show" : "Hide");
	}
}
class CalabashAttributeContentData {
	constructor() {
		(this.Type = -1),
			(this.Key = 0),
			(this.Value = 0),
			(this.StringKey = ""),
			(this.StringValue = "");
	}
}
class CalabashAttributeContentItem extends GridProxyAbstract_1.GridProxyAbstract {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	Refresh(e, t, a) {
		var i, o;
		0 === e.Type
			? (this.GetText(0)?.SetText(e.StringKey),
				this.GetText(1)?.SetText(e.StringValue))
			: 2 === e.Type &&
				((i = e.Key),
				(e = e.Value),
				(i = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i)),
				(o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name)),
				this.GetText(0)?.SetText(o),
				this.GetText(0)?.SetColor(UE.Color.FromHex(i.DropColor)),
				this.GetText(1)?.SetText(
					StringUtils_1.StringUtils.Format("{0}%", e.toString()),
				),
				this.GetText(1)?.SetColor(UE.Color.FromHex(i.DropColor)));
	}
}
exports.CalabashAttributeContentItem = CalabashAttributeContentItem;
class CalabashLevelUpTabView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.Wft = void 0),
			(this.Kft = void 0),
			(this.Qft = void 0),
			(this.Xft = void 0),
			(this.DFe = void 0),
			(this.$ft = []),
			(this.Yft = void 0),
			(this.Jft = 0),
			(this.zft = -1),
			(this._9s = !0),
			(this.ift = () => {
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(160);
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					e,
				);
			}),
			(this.Zft = (e, t, a) => {
				var i = new CalabashGrid();
				return (
					i.CreateThenShowByActor(e),
					(i.ButtonFunction = this.ept),
					(i.ItemCurve = this.Yft),
					i
				);
			}),
			(this.rOe = () =>
				new CalabashLevelUpRewardItemGrid_1.CalabashLevelUpRewardItemGrid()),
			(this.tpt = () => new CalabashAttributeItem()),
			(this.iVe = () => {
				CalabashController_1.CalabashController.RequestCalabashLevelReward(
					this.Jft,
				);
			}),
			(this.ipt = (e) => {
				if ("CommonRewardView" === e) {
					var t =
						CommonParamById_1.configCommonParamById.GetIntConfig(
							"StrengthItemId",
						);
					let o = !1;
					for (const e of this.$ft)
						if (t === e.ItemData[0].ItemId) {
							o = !0;
							break;
						}
					if (
						o &&
						(e =
							ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t)) &&
						e.Parameters
					) {
						let t = 0;
						for (var [, a] of e.Parameters) {
							t = a;
							break;
						}
						var i;
						if (0 !== t)
							if (
								(e = PropRewardConfById_1.configPropRewardConfById.GetConfig(t))
							) {
								let t = 0;
								for (const a of e.Props)
									if (a.Id === RoleDefine_1.STRENGTH_MAX_ID) {
										t = a.Value;
										break;
									}
								0 !== t &&
									((i = {
										Title: "PrefabTextItem_HuluStaminaUp_Text",
										StrengthUpgradeData: {
											MaxStrength: (e =
												FormationAttributeController_1.FormationAttributeController.GetBaseMax(
													1,
												)),
										},
										AttributeInfo: [
											{
												Name: (i =
													ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
														RoleDefine_1.STRENGTH_MAX_ID,
													)).Name,
												IconPath: i.Icon,
												ShowArrow: !0,
												PreText: Math.floor((e - t) / 100).toString(),
												CurText: Math.floor(e / 100).toString(),
											},
										],
									}),
									RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
										i,
									));
							}
					}
				}
			}),
			(this.ept = (e) => {
				(this.Jft = e),
					this.Wft.GetCurrentSelectIndex() !== e && this.Wft.AttachToIndex(e),
					this.opt();
			}),
			(this.rpt = (e) => {
				(this.zft = e.Type === this.zft ? -1 : e.Type), this.npt();
			}),
			(this.spt = () => {
				this.apt(), this.hpt(), this.lpt();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
			[4, UE.UIVerticalLayout],
			[5, UE.UIHorizontalLayout],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIText],
			[10, UE.UIText],
			[11, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[6, this.iVe],
				[2, this.ift],
			]);
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.GetCalabashReward,
			this.spt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.ipt,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.GetCalabashReward,
			this.spt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.ipt,
			);
	}
	async OnCreateAsync() {
		var e =
			ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"CalabashCurve",
			);
		e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat);
		this.Yft = await e.Promise;
	}
	OnStart() {
		(this.zft = -1),
			(this.Wft = new NoCircleAttachView_1.NoCircleAttachView(
				this.GetItem(0).GetOwner(),
			));
		var e = this.GetItem(1);
		e.SetUIActive(!1),
			this.Wft.CreateItems(e.GetOwner(), 0, this.Zft),
			(this.DFe = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(5),
				this.rOe,
			)),
			(this.Qft = new GenericLayout_1.GenericLayout(
				this.GetVerticalLayout(4),
				this.tpt,
			));
	}
	OnBeforeShow() {
		this.apt(this._9s), (this._9s = !1), this.lpt();
	}
	opt() {
		this.hpt();
	}
	hpt() {
		this.jqe(), this._pt(), this.npt();
	}
	lpt() {
		var e = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
			t = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp(),
			a =
				ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
					e,
				)?.LevelUpExp;
		this.GetText(3)?.SetText(t + "/" + a),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(10),
				"PrefabTextItem_HuluCurrentLv_Text",
				e,
			),
			(t = ModelManager_1.ModelManager.CalabashModel.GetCalabashAllSchedule()),
			(a = ModelManager_1.ModelManager.CalabashModel.GetCalabashOwnSchedule());
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(11),
			"Phanton_CollectNum",
			a,
			t,
		);
	}
	jqe() {
		if (
			(e =
				ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
					this.Jft,
				).RewardId) <= 0
		)
			this.DFe?.SetActive(!1);
		else {
			var e =
					ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(e),
				t =
					(this.DFe?.SetActive(!0),
					ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(
						this.Jft,
					));
			let a = 0;
			for (const i of e) {
				let e;
				a < this.$ft.length
					? (e = this.$ft[a])
					: ((e = new CalabashLevelUpRewardItemGrid_1.CalabashRewardItemData()),
						this.$ft.push(e)),
					(e.ReceiveState = t),
					(e.ItemData = [{ ItemId: i[0], IncId: 0 }, i[1]]),
					a++;
			}
			this.DFe?.RefreshByData(this.$ft);
		}
	}
	_pt() {
		var e,
			t =
				ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(
					this.Jft,
				);
		this.GetButton(6).RootUIComp.SetUIActive(2 === t),
			this.GetItem(8).SetUIActive(1 === t),
			this.GetItem(7).SetUIActive(3 === t),
			1 === t &&
				((t = this.GetText(9)),
				this.Kft[this.Jft].HasOverFlowExpReach
					? ((e =
							ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
								this.Jft,
							)),
						(e = ConditionGroupById_1.configConditionGroupById.GetConfig(
							e.LevelUpCondition,
						)),
						LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.HintText))
					: LguiUtil_1.LguiUtil.SetLocalTextNew(
							t,
							"PrefabTextItem_HuluLvNotEnough_Text",
						));
	}
	npt() {
		if (!this.Xft) {
			this.Xft = new Array(4);
			for (let e = 0; e < this.Xft.length; e++)
				this.Xft[e] = new CalabashAttributeData();
		}
		var e =
			(o = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel()) >=
			this.Jft;
		let t = this.Xft[0];
		(t.Type = 0),
			(t.Name = "PrefabTextItem_1948060625_Text"),
			(t.IsCost = !1),
			(t.IsUp = !1);
		var a = ModelManager_1.ModelManager.CalabashModel.GetCatchGainByLevel(
				this.Jft,
			),
			i =
				((t.Value = new LguiUtil_1.TableTextArgNew(
					"Text_ExplorationDegree_Text",
					Math.ceil(a / 10),
				)),
				e ||
					((i =
						ModelManager_1.ModelManager.CalabashModel.GetCatchGainByLevel(o)),
					(t.IsUp = i < a)),
				ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
					o,
				)),
			o = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
				this.Jft,
			),
			r =
				(((t = this.Xft[1]).Type = 1),
				(t.Name = "PrefabTextItem_HuluTempCatchGain_Text"),
				(t.IsCost = !1),
				(t.IsUp = !1),
				o.TempCatchGain);
		r <= a
			? (t.Value = new LguiUtil_1.TableTextArgNew(
					"PrefabTextItem_HuluTempCatchGainDisable_Text",
				))
			: ((t.Value = new LguiUtil_1.TableTextArgNew(
					"Text_ExplorationDegree_Text",
					Math.ceil(r / 10),
				)),
				e || ((a = i.TempCatchGain), (t.IsUp = a < r))),
			((t = this.Xft[2]).Type = 2),
			(t.Name = "PrefabTextItem_3681645418_Text"),
			(t.IsCost = !1),
			(t.IsUp = !1),
			(a = o.QualityDescription),
			(t.Value = new LguiUtil_1.TableTextArgNew(a)),
			e || ((r = i.QualityDescription), (t.IsUp = a !== r)),
			((t = this.Xft[3]).Type = 3),
			(t.Name = "PrefabTextItem_HuluCostLimit_Text"),
			(t.IsCost = !0),
			(t.IsUp = !1),
			(a = o.Cost);
		(t.CostCount = a),
			e || ((r = i.Cost), (t.IsUp = r < a)),
			this.Xft.forEach((e) => {
				(e.ClickCallBack = this.rpt),
					(e.CurrentSelect = this.zft === e.Type),
					(e.CurrentSelectLevel = this.Jft);
			}),
			this.Qft?.RefreshByData(this.Xft);
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		var t;
		if (1 === e.length || isNaN(Number(e[0])))
			return (t = this.Qft?.GetItemByIndex(Number(e[0]))) ? [t, t] : void 0;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
				"configParams",
				e,
			]);
	}
	apt(e = !1) {
		var t = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
			a = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp(),
			i = ModelManager_1.ModelManager.CalabashModel.GetCalabashMaxLevel();
		this.Kft || (this.Kft = new Array(i));
		let o = 0;
		for (let e = 0; e <= i; e++) {
			var r =
				ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
					e,
				).LevelUpExp;
			let n = 0,
				s = 0,
				l =
					(e < t
						? ((n = r), (s = r))
						: ((n = Math.min(r, a - o)), (s = 0), (o += r)),
					this.Kft[e]);
			l || ((l = new CalabashGridData()), (this.Kft[e] = l)),
				(l.Level = e),
				(l.OverFlowExp = n),
				(l.LimitExp = s),
				(l.MaxExp = r),
				(l.IsMaxLevel = e === i),
				0 === e
					? (l.HasOverFlowExpReach = !0)
					: ((r = this.Kft[e - 1]),
						(l.HasOverFlowExpReach = r.OverFlowExp === r.MaxExp));
		}
		if (e)
			this.Wft.ReloadView(this.Kft.length, this.Kft),
				this.Wft.AttachToIndex(t, !0);
		else
			for (const e of this.Wft.GetItems()) e.SetData(this.Kft), e.RefreshItem();
	}
}
exports.CalabashLevelUpTabView = CalabashLevelUpTabView;
