"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponLevelUpView = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	UiManager_1 = require("../../../Ui/UiManager"),
	AttributeItem_1 = require("../../Common/AttributeItem"),
	CommonItemSelectView_1 = require("../../Common/CommonItemSelectView"),
	CommonMultipleConsumeComponent_1 = require("../../Common/Consume/CommonMultipleConsumeComponent"),
	ItemGridConsumeComponent_1 = require("../../Common/Consume/ItemGridConsumeComponent"),
	ExpComponent_1 = require("../../Common/ExpTween/ExpComponent"),
	CommonIntensifyPropExpData_1 = require("../../Common/Model/CommonIntensifyPropExpData"),
	SelectableComponent_1 = require("../../Common/PropItem/SelectablePropItem/SelectableComponent"),
	SelectableExpData_1 = require("../../Common/PropItem/SelectablePropItem/SelectableExpData"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	ItemDefines_1 = require("../../Item/Data/ItemDefines"),
	ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
	RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
	RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
	AttrListScrollData_1 = require("../../RoleUi/View/ViewData/AttrListScrollData"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	WeaponController_1 = require("../WeaponController"),
	ITEM_MAX_COUNT = 20;
class WeaponLevelUpView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.gHi = void 0),
			(this.SHi = new SelectableExpData_1.SelectableExpData()),
			(this.WeaponInstance = void 0),
			(this.xNo = void 0),
			(this.fHi = void 0),
			(this.iuo = []),
			(this.BNo = void 0),
			(this.MHi = void 0),
			(this.EHi = void 0),
			(this.Qft = void 0),
			(this.Nki = void 0),
			(this.Oki = void 0),
			(this.bNo = () => {
				this.uuo(),
					this.gHi.PlayExpTween(this.SHi),
					(this.BNo.length = 0),
					this.LHi(),
					this.fHi.UpdateComponent(ItemDefines_1.EItemId.Gold, 0, this.MHi),
					this.fHi.SetMaxState(this.WeaponInstance.IsLevelMax());
			}),
			(this.qNo = (e) => {
				this.iuo = e;
			}),
			(this.GNo = (e) => this.WeaponInstance.GetLevelExp(e)),
			(this.BHi = (e) =>
				ModelManager_1.ModelManager.WeaponModel.GetWeaponItemExp(
					e.IncId,
					e.ItemId,
				)),
			(this.nuo = () => {
				this.NNo(), this.jlo();
			}),
			(this.tpt = () => new AttributeItem_1.AttributeItem()),
			(this.UHi = () => {
				if (!this.BNo || this.BNo.length <= 0)
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"WeaponSelectMaterialTipsText",
					);
				else if (this.fHi.GetEnoughMoney()) {
					let i,
						n = !1,
						a = !1,
						r = !1;
					for (const t of this.BNo) {
						var e =
							ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
								t.IncId,
							);
						e &&
							(!n &&
								ModelManager_1.ModelManager.WeaponModel.IsWeaponHighQuality(
									e,
								) &&
								(n = !0),
							!a &&
								ModelManager_1.ModelManager.WeaponModel.IsWeaponHighLevel(e) &&
								(a = !0),
							!r) &&
							ModelManager_1.ModelManager.WeaponModel.IsWeaponHighResonanceLevel(
								e,
							) &&
							(r = !0);
					}
					var t,
						o = [];
					switch (
						(n &&
							((t =
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"WeaponHighQuality",
								)),
							o.push(t)),
						a &&
							((t =
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"WeaponHasLevelUp",
								)),
							o.push(t)),
						r &&
							((t =
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"WeaponHasResonance",
								)),
							o.push(t)),
						o.length)
					) {
						case 1:
							i = 3;
							break;
						case 2:
							i = 2;
							break;
						case 3:
							i = 1;
					}
					i
						? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(i)).SetTextArgs(
								...o,
							),
							t.FunctionMap.set(2, () => {
								this.ONo();
							}),
							ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
								t,
							))
						: this.ONo();
				} else
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"WeaponNoEnoughMoneyText",
					);
			}),
			(this.ONo = () => {
				var e,
					t,
					o = () => {
						var e = this.WeaponInstance.GetIncId();
						WeaponController_1.WeaponController.SendPbWeaponLevelUpRequest(
							e,
							this.BNo,
						);
					};
				if (
					0 < (t = this.SHi.GetOverExp()) &&
					0 <
						(t =
							ModelManager_1.ModelManager.WeaponModel.GetCanChangeMaterialList(
								t,
							)).size
				)
					return (
						((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(24)).ItemIdMap = t),
						e.FunctionMap.set(2, o),
						void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							e,
						)
					);
				o();
			}),
			(this.GHi = (e, t) => {
				var o = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData(),
					i = ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemList(
						this.WeaponInstance.GetIncId(),
					),
					n = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData(),
					a =
						((n.CurrentExp = this.SHi.GetCurrentExp()),
						(n.CurrentLevel = this.SHi.GetCurrentLevel()),
						(n.CurrentMaxLevel = this.SHi.GetCurrentMaxLevel()),
						(n.MaxExpFunction = this.GNo),
						(n.GetItemExpFunction = this.BHi),
						this.BNo),
					r = new SelectableComponent_1.SelectableComponentData();
				(r.IsSingleSelected = !1),
					(r.OnChangeSelectedFunction = this.pvt),
					(o.ItemDataBaseList = i),
					(o.SelectedDataList = a),
					(o.ExpData = n),
					(o.SelectableComponentData = r),
					(o.UseWayId = 2),
					UiManager_1.UiManager.OpenView("CommonItemSelectViewRight", o);
			}),
			(this.pvt = (e, t) => {
				(this.BNo = e), (this.SHi = t), this.xHi();
			}),
			(this.qHi = () => {
				this.GHi(0, 0);
			}),
			(this.PHi = () => {
				(this.BNo = []), this.xHi();
			}),
			(this.wHi = () => {
				var e,
					t =
						ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemListUseToAuto(
							this.WeaponInstance.GetIncId(),
						),
					o = [],
					i = this.kNo(this.EHi);
				for (const n of t)
					n.GetQuality() > i ||
						((e = {
							IncId: n.GetUniqueId(),
							ItemId: n.GetConfigId(),
							Count: n.GetCount(),
							SelectedCount: 0,
						}),
						o.push(e));
				0 === o.length
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"RoleNoMaterial",
						)
					: ((t = this.SHi.GetExpDistanceToMax()),
						(t = ModelManager_1.ModelManager.WeaponModel.AutoAddExpItem(
							t,
							20,
							o,
							this.BHi,
						)),
						(this.BNo = t),
						this.BNo.sort((e, t) =>
							(e = 0 < e.IncId) != 0 < t.IncId ? (e ? 1 : -1) : 0,
						),
						this.xHi());
			}),
			(this.bHi = (e, t) => {
				for (let o = this.BNo.length - 1; 0 <= o; o--)
					this.BNo[o].ItemId === t &&
						this.BNo[o].IncId === e &&
						(this.BNo[o].SelectedCount--, 0 === this.BNo[o].SelectedCount) &&
						this.BNo.splice(o, 1);
				this.xHi();
			}),
			(this.zIt = (e) => {
				(this.EHi = e), this.FNo();
			}),
			(this.luo = () => {
				if (0 < this.iuo.length) {
					var e = [];
					for (const i of this.iuo) {
						var t = i[0],
							o = i[1];
						o = new RewardItemData_1.RewardItemData(t.ItemId, o, t.IncId);
						e.push(o);
					}
					ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
						1010,
						e,
					);
				}
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.WeaponCanGoBreach,
				);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIVerticalLayout],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIText],
		];
	}
	async OnBeforeStartAsync() {
		var e =
			new CommonMultipleConsumeComponent_1.CommonMultipleConsumeFunction();
		(e.StrengthFunction = this.UHi),
			(e.MaterialItemFunction = this.GHi),
			(e.ItemClickFunction = this.qHi),
			(e.ReduceItemFunction = this.bHi),
			(e.AutoFunction = this.wHi),
			(e.DeleteSelectFunction = this.PHi),
			(this.fHi = new ItemGridConsumeComponent_1.ItemGridConsumeComponent(
				this.GetItem(2),
				e,
			)),
			await this.fHi.Init(),
			this.fHi.SetActive(!0);
	}
	OnStart() {
		var e = this.ExtraParams;
		(this.WeaponInstance =
			ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e)),
			this.VNo(),
			this.wao(),
			this.HNo();
	}
	OnBeforeDestroy() {
		this.gHi.Destroy(), this.fHi.Destroy();
	}
	OnBeforeShow() {
		this.NNo(), this.C4e(), this.jlo(), this.jNo();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.WeaponLevelUp,
			this.bNo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WeaponLevelUpReceiveItem,
				this.qNo,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WeaponLevelUp,
			this.bNo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WeaponLevelUpReceiveItem,
				this.qNo,
			);
	}
	OnHideUiTabViewBase(e) {
		e && UiManager_1.UiManager.CloseView("CommonItemSelectViewRight");
	}
	VNo() {
		(this.gHi = new ExpComponent_1.ExpComponent(this.GetItem(0), !1)),
			this.gHi.Init(),
			this.gHi.SetLevelFormatText("LevelNumber"),
			this.gHi.BindPlayCompleteCallBack(this.nuo),
			this.SHi.SetMaxExpFunction(this.GNo);
	}
	NNo() {
		this.WNo(), this.gHi.UpdateInitState(this.SHi);
	}
	WNo() {
		var e = this.WeaponInstance.GetLevel(),
			t = this.WeaponInstance.GetCurrentMaxLevel(),
			o = this.WeaponInstance.GetExp(),
			i = this.WeaponInstance.GetMaxLevel();
		this.SHi.UpdateComponent(e, t, o, i);
	}
	uuo() {
		var e = this.SHi.GetCurrentLevel(),
			t = this.WeaponInstance.GetLevel(),
			o =
				((this.Nki = UiSceneManager_1.UiSceneManager.GetWeaponObserver()),
				(this.Oki =
					UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver()),
				WeaponController_1.WeaponController.PlayWeaponRenderingMaterial(
					"WeaponLevelUpMaterialController",
					this.Nki,
					this.Oki,
				),
				this.Nki.Model);
		if (
			(UiModelUtil_1.UiModelUtil.PlayEffectAtRootComponent(
				o,
				"WeaponLevelUpEffect",
			),
			e !== t)
		) {
			let i;
			(o = this.duo(e, t)),
				(i = this.WeaponInstance.CanGoBreach()
					? {
							Title: "Text_WeaponLevelUpSuccessText_Text",
							LevelInfo: {
								PreUpgradeLv: e,
								UpgradeLv: t,
								FormatStringId: "Text_LevelShow_Text",
								IsMaxLevel: !0,
							},
							AttributeInfo: o,
							ClickText: "Text_TurnToBreach_Text",
							ClickFunction: this.luo,
						}
					: {
							Title: "Text_WeaponLevelUpSuccessText_Text",
							LevelInfo: {
								PreUpgradeLv: e,
								UpgradeLv: t,
								FormatStringId: "Text_LevelShow_Text",
								IsMaxLevel:
									this.WeaponInstance.GetLevel() ===
									this.WeaponInstance.GetMaxLevel(),
							},
							AttributeInfo: o,
						}) &&
					((e =
						ConfigManager_1.ConfigManager.RoleConfig.GetWeaponLevelUpSuccessDelayTime()),
					UiLayer_1.UiLayer.SetShowMaskLayer("OpenLevelUpSuccessView", !0),
					TimerSystem_1.TimerSystem.Delay(() => {
						RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
							i,
						),
							UiLayer_1.UiLayer.SetShowMaskLayer("OpenLevelUpSuccessView", !1);
					}, e));
		}
	}
	wao() {
		this.Qft = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(1),
			this.tpt,
		);
	}
	jlo() {
		var e = this.WeaponInstance.GetWeaponConfig(),
			t =
				((this.xNo =
					ModelManager_1.ModelManager.WeaponModel.GetWeaponAttributeParamList(
						e,
					)),
				this.WeaponInstance.GetBreachLevel()),
			o = this.SHi.GetCurrentLevel(),
			i = this.SHi.GetArrivedLevel(),
			n = [];
		for (const e of this.xNo) {
			var a = e.CurveId,
				r = e.PropId.Value,
				s = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(a, r, o, t);
			let l = 0;
			o < i &&
				(l = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(a, r, i, t)),
				(a = {
					Id: e.PropId.Id,
					IsRatio: e.PropId.IsRatio,
					CurValue: s,
					BgActive: !0,
					ShowNext: l > s,
					NextValue: l,
				}),
				n.push(a);
		}
		this.Qft.RefreshByData(n);
	}
	duo(e, t) {
		var o = [],
			i = this.WeaponInstance.GetBreachLevel();
		for (const r of this.xNo) {
			var n = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
					r.CurveId,
					r.PropId.Value,
					e,
					i,
				),
				a = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
					r.CurveId,
					r.PropId.Value,
					t,
					i,
				);
			n !== a &&
				((n = new AttrListScrollData_1.AttrListScrollData(
					r.PropId.Id,
					n,
					a,
					0,
					r.PropId.IsRatio,
					0,
				)),
				o.push(
					RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(
						n,
					),
				));
		}
		return o;
	}
	HNo() {
		this.fHi.InitFilter(2, this.zIt),
			this.fHi.SetConsumeTexture(ItemDefines_1.EItemId.Gold),
			(this.EHi = this.fHi.GetCurrentDropDownSelectIndex()),
			this.EHi && this.FNo();
		var e = this.fHi.GetMaxCount();
		this.MHi = new Array(e);
		for (let t = 0; t < e; t++) this.MHi[t] = [{ IncId: 0, ItemId: 0 }, 0];
	}
	jNo() {
		this.xHi(), this.fHi.SetMaxState(this.WeaponInstance.IsLevelMax());
	}
	FNo() {
		var e = this.kNo(this.EHi);
		this.fHi.RefreshConditionText(
			ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(e)
				.ConsumeFilterText,
		);
	}
	kNo(e) {
		var t = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList();
		return t[MathUtils_1.MathUtils.Clamp(e, 0, t.length - 1)].Id;
	}
	xHi() {
		let e = 0;
		if ((this.LHi(), this.BNo))
			for (let i = 0; i < this.BNo.length; i++) {
				var t = this.BNo[i],
					o = this.MHi[i];
				(o[0].IncId = t.IncId),
					(o[0].ItemId = t.ItemId),
					(o[1] = t.SelectedCount),
					(e += this.BHi(t) * t.SelectedCount);
			}
		var i = this.SHi.GetExpDistanceToMax();
		i = ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemListCost(
			Math.min(i, e),
		);
		this.fHi.UpdateComponent(ItemDefines_1.EItemId.Gold, i, this.MHi),
			this.SHi.UpdateExp(e),
			this.gHi.Update(this.SHi),
			this.jlo();
	}
	C4e() {
		var e = (t = this.WeaponInstance.GetWeaponConfig()).WeaponName,
			t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
				t.QualityId,
			);
		t = UE.Color.FromHex(t.DropColor);
		this.GetText(4).SetColor(t), this.GetText(4).ShowTextNew(e);
	}
	LHi() {
		this.MHi.forEach((e) => {
			(e[0].IncId = 0), (e[0].ItemId = 0), (e[1] = 0);
		});
	}
}
exports.WeaponLevelUpView = WeaponLevelUpView;
