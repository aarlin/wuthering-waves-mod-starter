"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InventoryView = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	StringBuilder_1 = require("../../../../Core/Utils/StringBuilder"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem"),
	FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance"),
	ItemTipsUtilTool_1 = require("../../Common/ItemTips/ItemTipsUtilTool"),
	ItemTipsWithButton_1 = require("../../Common/ItemTips/ItemTipsWithButton"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent"),
	CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
	CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	PowerController_1 = require("../../Power/PowerController"),
	PowerDefines_1 = require("../../Power/PowerDefines"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	InventoryDefine_1 = require("../InventoryDefine"),
	CommonItemData_1 = require("../ItemData/CommonItemData"),
	PhantomItemData_1 = require("../ItemData/PhantomItemData"),
	WeaponItemData_1 = require("../ItemData/WeaponItemData"),
	ItemViewData_1 = require("../ItemViewData"),
	InventoryMediumItemGrid_1 = require("./InventoryMediumItemGrid"),
	ItemViewDefine_1 = require("./ItemViewDefine");
class InventoryView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Kui = void 0),
			(this.smi = 0),
			(this.xci = []),
			(this.XAt = void 0),
			(this.ami = void 0),
			(this.hmi = void 0),
			(this.lmi = new Map()),
			(this._mi = void 0),
			(this.umi = void 0),
			(this.cmi = []),
			(this.mmi = new Map()),
			(this.cpt = void 0),
			(this.dmi = void 0),
			(this.EPe = void 0),
			(this.gPt = void 0),
			(this.TipsButtonRelationMap = void 0),
			(this.TipsButtonIndexMap = void 0),
			(this.Cmi = void 0),
			(this.gmi = 0),
			(this.WGe = void 0),
			(this.fmi = !1),
			(this.pmi = !1),
			(this.vmi = !1),
			(this.Mmi = !1),
			(this.InvalidItemTempList = []),
			(this.IsInvalidItemViewShow = !1),
			(this.Smi = () => {
				this.Emi();
			}),
			(this.ymi = (e) => {
				this.IsInvalidItemViewShow
					? this.InvalidItemTempList.push(e)
					: this.Imi(e);
			}),
			(this.Tmi = () => {
				1 === this.gmi && this.SetViewMode(0);
			}),
			(this.Lmi = () => {
				0 === this.gmi && this.SetViewMode(1);
			}),
			(this.OnClickedUseItemButton = () => {
				var e = ModelManager_1.ModelManager.InventoryModel,
					t = e.GetSelectedItemData();
				t &&
					(this.Dmi(t),
					2 === t.GetRedDotDisableRule() && this.Rmi(t),
					0 === t.GetItemDataType()
						? (e.SaveNewCommonItemConfigIdList(),
							e.SaveRedDotCommonItemConfigIdList())
						: (e.SaveNewAttributeItemUniqueIdList(),
							e.SaveRedDotAttributeItemUniqueIdList()),
					0 <= (e = this.cmi.indexOf(t)) && this.XAt.RefreshGridProxy(e),
					this.Umi(0, !1),
					this.Ami(t),
					ControllerHolder_1.ControllerHolder.InventoryController.TryUseItem(
						t.GetConfigId(),
						1,
					));
			}),
			(this.OnClickedSpecialItemFuncUseButton = () => {
				var e = ModelManager_1.ModelManager.InventoryModel,
					t = e.GetSelectedItemData();
				t &&
					(this.Dmi(t),
					2 === t.GetRedDotDisableRule() && this.Rmi(t),
					0 === t.GetItemDataType()
						? (e.SaveNewCommonItemConfigIdList(),
							e.SaveRedDotCommonItemConfigIdList())
						: (e.SaveNewAttributeItemUniqueIdList(),
							e.SaveRedDotAttributeItemUniqueIdList()),
					this.Ami(t),
					ControllerHolder_1.ControllerHolder.SpecialItemController.AutoEquipOrUnEquipSpecialItem(
						t.GetConfigId(),
					)) &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ResetToBattleView,
					);
			}),
			(this.OnClickedWeaponCultivateButton = () => {
				var e =
					ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData();
				e && SkipTaskManager_1.SkipTaskManager.Run(4, e.GetUniqueId());
			}),
			(this.OnClickedVisionCultivateButton = () => {
				var e =
					ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData();
				e && SkipTaskManager_1.SkipTaskManager.Run(5, e.GetUniqueId());
			}),
			(this.Pmi = () => {
				ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenBuy(),
					ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenGoodUnlock();
				var e = ConfigManager_1.ConfigManager.PowerConfig.GetPowerItemInfos(
					PowerDefines_1.PowerConst.SingCube,
				);
				ModelManager_1.ModelManager.PowerModel.PowerCount + e.RenewValue >
				ConfigManager_1.ConfigManager.PowerConfig.GetPowerChargeLimit()
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"PowerBound",
						)
					: PowerController_1.PowerController.ExchangePower(e, 1);
			}),
			(this.xmi = (e, t) => {
				var i = ConfigManager_1.ConfigManager.PowerConfig.GetPowerItemInfos(
					PowerDefines_1.PowerConst.SingCube,
				);
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"PowerBuySucceed",
					i.RenewValue,
				),
					ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenBuy(),
					ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenGoodUnlock();
			}),
			(this.ACt = () => {
				UiManager_1.UiManager.CloseView("InventoryView"),
					UiManager_1.UiManager.IsViewShow("PowerView") &&
						UiManager_1.UiManager.CloseView("PowerView");
			}),
			(this.wmi = () => {
				this.Bmi();
			}),
			(this.bmi = () => {
				this.Bmi();
			}),
			(this.qmi = () => {
				this.Bmi();
			}),
			(this.Gmi = (e) => {
				this.Bmi();
			}),
			(this.Nmi = (e) => {
				this.Bmi();
			}),
			(this.f0t = (e, t, i) => {
				this.Omi(),
					ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(e) &&
						((e =
							ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(
								e,
							)),
						this.kmi(0, e <= 0));
			}),
			(this.k6e = (e, t) => {}),
			(this.$Ge = (e) => {
				"UseBuffItemView" === e &&
					(this.EPe.StopSequenceByKey("Tc"),
					this.EPe.PlaySequencePurely("Tc", !1, !0),
					(e = this.cmi[this.smi])) &&
					this.qft(e);
			}),
			(this.kJe = () => {
				this.Fmi();
			}),
			(this.Vmi = (e, t) => {
				if (ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e))
					for (let o = 0; o < this.cmi.length; o++) {
						var i = this.cmi[o];
						if (i.GetUniqueId() === e) {
							i.SetIsLock(t), i.RemoveNewItem(), this.XAt.RefreshGridProxy(o);
							break;
						}
					}
			}),
			(this.kGt = (e, t, i) => {
				if (
					((this.fmi = !0),
					1 === this.gmi &&
						(e.sort(this.SortViewDataSelectOn),
						this.SetDestroyAllSelectedState(void 0, !1)),
					(this.cmi = e),
					this.HGt(e),
					this.pmi)
				)
					this.qft(this.Hmi());
				else if (1 === i) this.qft(e[0]);
				else {
					let t;
					this.Kui && this.cmi.includes(this.Kui) && (t = this.Kui),
						this.qft(t ?? e[0]);
				}
				(this.fmi = !1), (this.pmi = !1);
			}),
			(this.z9e = () => {
				var e = new InventoryMediumItemGrid_1.InventoryMediumItemGrid();
				return e.BindOnItemButtonClickedCallback(this.UIt), e;
			}),
			(this.jmi = (e, t) => new CommonTabItem_1.CommonTabItem()),
			(this.Wmi = (e) => {
				var t = ModelManager_1.ModelManager.InventoryModel;
				t.GetSelectedTypeIndex() !== e &&
					(this.Kmi(), t.SetSelectedTypeIndex(e), this.Qmi(e));
			}),
			(this.yqe = (e) => (
				(e = this.dmi[e]),
				new CommonTabData_1.CommonTabData(
					e.Icon,
					new CommonTabTitleData_1.CommonTabTitleData(e.Name),
				)
			)),
			(this.UIt = (e) => {
				var t;
				this.Kui === e
					? ((t = this.cmi.indexOf(e)),
						this.XAt.DeselectCurrentGridProxy(!1),
						this.XAt.SelectGridProxy(t),
						1 === this.gmi && this.Xmi(!e.GetSelectOn(), e))
					: this.qft(e);
			}),
			(this.$mi = () => {
				this.Ymi();
			}),
			(this.Jmi = () => {
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"ItemDestroyNotJump",
				);
			}),
			(this.zmi = 0),
			(this.Zmi = new Set()),
			(this.OnClickedDestroyExecuteButton = () => {
				if (1 === this.gmi)
					if (0 === this.Zmi.size)
						ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"ItemDestroyNotChoose",
						);
					else {
						let s = !1;
						const a = [];
						var e = Array.from(this.Zmi.values()),
							t = (e.sort(this.SortViewDataConfigId), e.length);
						for (let o = 0; o < t; o++) {
							let n = 0;
							for (
								;
								o + 1 < t &&
								e[o].GetConfigId() === e[o + 1].GetConfigId() &&
								0 === e[o].GetUniqueId() &&
								0 === e[o + 1].GetUniqueId();
							)
								(n += e[o].GetSelectNum()), o++;
							var i = {
								G3n: e[o].GetConfigId(),
								Q5n: e[o].GetUniqueId(),
								I5n: n + e[o].GetSelectNum(),
							};
							a.push(i), !s && 4 <= e[o].GetQuality() && (s = !0);
						}
						var o,
							n = () => {
								ControllerHolder_1.ControllerHolder.InventoryController.ItemDestructPreviewRequest(
									a,
								);
							};
						ModelManager_1.ModelManager.InventoryModel.IsConfirmDestruction ||
						!s
							? n()
							: (((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
									167,
								)).HasToggle = !0),
								(o.ToggleText =
									MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
										"Text_ItemRecycleConfirmToggle_text",
									)),
								o.SetToggleFunction(this.gvt),
								o.FunctionMap.set(2, n),
								ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
									o,
								));
					}
			}),
			(this.gvt = (e) => {
				ModelManager_1.ModelManager.InventoryModel.IsConfirmDestruction = e;
			}),
			(this.edi = (e) => {
				if (1 === this.gmi) {
					var t = e;
					if (!this.tdi() || !t)
						for (const e of this.cmi)
							if (
								(e.IsItemCanDestroy() &&
									0 !== e.GetUniqueId() &&
									this.Xmi(t, e),
								this.tdi() && t)
							)
								break;
				}
			}),
			(this.SortViewDataSelectOn = (e, t) => (
				(e = e.GetSelectOn() ? 1 : 0), (t.GetSelectOn() ? 1 : 0) - e
			)),
			(this.SortViewDataConfigId = (e, t) => e.GetConfigId() - t.GetConfigId()),
			(this.KGe = (e) => {
				var t =
					ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
						"ItemRecycleCount",
					);
				return new LguiUtil_1.TableTextArgNew(t, e);
			}),
			(this.QGe = (e) => {
				var t;
				!this.Kui ||
					(t = this.cmi.indexOf(this.Kui)) < 0 ||
					(this.Kui.SetSelectNum(e), this.XAt.RefreshGridProxy(t));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UILoopScrollViewComponent],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIButtonComponent],
			[14, UE.UIButtonComponent],
			[15, UE.UIItem],
			[16, UE.UIText],
			[17, UE.UIText],
			[18, UE.UIExtendToggle],
			[19, UE.UIItem],
			[20, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[13, this.Lmi],
				[14, this.Tmi],
				[20, this.OnClickedDestroyExecuteButton],
				[18, this.edi],
			]);
	}
	idi() {
		(this.TipsButtonIndexMap = new Map()),
			(this.TipsButtonRelationMap = new Map()),
			this.TipsButtonRelationMap.set(0, {
				Function: this.OnClickedUseItemButton,
				Text: "HotKeyText_UseItemTips_Name",
				Index: 0,
			}),
			this.TipsButtonRelationMap.set(1, {
				Function: this.OnClickedSpecialItemFuncUseButton,
				Text: "Text_ButtonTextConfirm_Text",
				Index: 0,
			}),
			this.TipsButtonRelationMap.set(2, {
				Function: this.OnClickedWeaponCultivateButton,
				Text: "Text_BagFosterButton_Text",
				Index: 0,
			}),
			this.TipsButtonRelationMap.set(3, {
				Function: this.OnClickedVisionCultivateButton,
				Text: "Text_BagFosterButton_Text",
				Index: 0,
			});
	}
	async OnBeforeStartAsync() {
		var e = this.GetItem(9),
			t = this.GetItem(10),
			i =
				((this._mi = new CommonCurrencyItem_1.CommonCurrencyItem()),
				(this.umi = new CommonCurrencyItem_1.CommonCurrencyItem()),
				this.GetItem(11));
		(t = (e =
			((this.gPt = new ItemTipsWithButton_1.ItemTipsWithButtonComponent()),
			await this._mi.CreateThenShowByActorAsync(e.GetOwner()),
			await this.umi.CreateThenShowByActorAsync(t.GetOwner()),
			await this.gPt.CreateByActorAsync(i.GetOwner()),
			ModelManager_1.ModelManager.InventoryModel)).GetSelectedTypeIndex()),
			(this.Kui = e.GetSelectedItemData()),
			(this.smi = 0),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			(i = this.GetItem(19)),
			(i = (e =
				((this.WGe = new NumberSelectComponent_1.NumberSelectComponent(i)),
				this.WGe.SetMinValue(1),
				this.WGe.SetUiActive(!1),
				this.idi(),
				await this.odi(t),
				this.rdi(),
				this.ndi(),
				this.sdi(),
				this.Fmi(),
				(this.Cmi = new Array(this.dmi.length).fill(0)),
				this.GetItem(8))).GetWidth()),
			(t = e.GetHeight());
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Inventory",
				8,
				"背包物品滚动框ViewPort尺寸：",
				["宽度", i],
				["高度", t],
			);
	}
	OnAfterPlayStartSequence() {
		var e = this.cpt.GetSelectedIndex();
		this.cpt.ScrollToToggleByIndex(e);
	}
	OnBeforeShow() {
		var e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
		this.cpt.SelectToggleByIndex(e, !0), this.Qmi(e);
	}
	OnAfterShow() {
		this.adi(), this.hdi();
	}
	OnBeforeDestroy() {
		for (const e of this.xci) e.Destroy();
		this.ldi(),
			this._di(),
			(this.xci.length = 0),
			(this.smi = 0),
			(this.Kui = void 0),
			(this.XAt = void 0),
			this.ami.Destroy(),
			this._mi.Destroy(),
			(this._mi = void 0),
			this.umi.Destroy(),
			(this.umi = void 0),
			this.gPt.Destroy(),
			(this.gPt = void 0),
			(this.Cmi = void 0),
			this.cpt && (this.cpt.Destroy(), (this.cpt = void 0));
		var e = ModelManager_1.ModelManager.InventoryModel;
		e.SaveNewCommonItemConfigIdList(),
			e.SaveNewAttributeItemUniqueIdList(),
			e.SaveRedDotCommonItemConfigIdList(),
			e.SaveRedDotAttributeItemUniqueIdList();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnAddWeaponItemList,
			this.wmi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAddPhantomItemList,
				this.bmi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnCommonItemCountAnyChange,
				this.qmi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRemoveWeaponItem,
				this.Gmi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRemovePhantomItem,
				this.Nmi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnItemLock,
				this.Vmi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUseBuffItem,
				this.f0t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnItemUse,
				this.k6e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TriggerUiTimeDilation,
				this.kJe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSpecialItemUpdate,
				this.$mi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BoughtItem,
				this.xmi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PowerShopReady,
				this.Pmi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.NotifyInvalidItem,
				this.ymi,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnAddWeaponItemList,
			this.wmi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAddPhantomItemList,
				this.bmi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnCommonItemCountAnyChange,
				this.qmi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRemoveWeaponItem,
				this.Gmi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRemovePhantomItem,
				this.Nmi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnItemLock,
				this.Vmi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnUseBuffItem,
				this.f0t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnItemUse,
				this.k6e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TriggerUiTimeDilation,
				this.kJe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSpecialItemUpdate,
				this.$mi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BoughtItem,
				this.xmi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PowerShopReady,
				this.Pmi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.NotifyInvalidItem,
				this.ymi,
			);
	}
	Omi() {
		this.lmi.clear(),
			ModelManager_1.ModelManager.BuffItemModel.GetInCdBuffItemMap(this.lmi),
			this.lmi.size <= 0
				? this.ldi()
				: (this.Emi(),
					TimerSystem_1.TimerSystem.Has(this.hmi) ||
						(this.hmi = TimerSystem_1.TimerSystem.Forever(
							this.Smi,
							ItemViewDefine_1.REFRESH_CD_INTERVAL,
						)),
					this.Fmi());
	}
	ldi() {
		TimerSystem_1.TimerSystem.Has(this.hmi) &&
			TimerSystem_1.TimerSystem.Remove(this.hmi),
			(this.hmi = void 0);
	}
	Emi() {
		var e = [];
		for (const o of this.lmi.values()) {
			var t,
				i = o.ItemConfigId;
			for (let e = 0; e < this.cmi.length; e++)
				this.cmi[e].GetConfigId() === i &&
					(t = this.XAt.UnsafeGetGridProxy(e)) &&
					t.RefreshCoolDown();
			o.GetBuffItemRemainCdTime() <= 0 && e.push(i);
		}
		for (const t of e)
			this.lmi.delete(t), t === this.Kui.GetConfigId() && this.kmi(0, !0);
	}
	hdi() {
		ControllerHolder_1.ControllerHolder.InventoryController.InvalidItemCheckRequest();
	}
	udi() {
		var e = this.InvalidItemTempList.pop();
		e && this.Imi(e);
	}
	Imi(e) {
		var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(174);
		(t.IsMultipleView = !0),
			(t.ItemIdMap = e),
			t.SetCloseFunction(() => {
				(this.IsInvalidItemViewShow = !1), this.udi();
			}),
			(this.IsInvalidItemViewShow = !0),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				t,
			);
	}
	Bmi() {
		this.SetViewMode(this.gmi), this.adi();
	}
	Fmi() {
		var e;
		!TimerSystem_1.TimerSystem.Has(this.hmi) ||
			(e = Time_1.Time.TimeDilation) <= 0 ||
			TimerSystem_1.TimerSystem.ChangeDilation(this.hmi, e);
	}
	cdi(e) {
		var t = e.GetConfig(),
			i = e.GetConfigId(),
			o =
				((t = t.ShowUseButton) && this.mdi([0]),
				ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(i));
		o &&
			t &&
			((o =
				ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(i)),
			this.kmi(0, o <= 0)),
			2 === e.GetRedDotDisableRule()
				? this.Umi(0, e.HasRedDot())
				: this.Umi(0, !1);
	}
	ddi() {
		ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() &&
			(this.mdi([1]), this.Ymi());
	}
	Cdi() {
		this.mdi([2]);
	}
	gdi() {
		this.mdi([3]);
	}
	Ymi() {
		if (this.Kui) {
			var e = this.Kui.GetConfigId(),
				t =
					ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId();
			let i;
			(i = e === t ? "UnEquip" : void 0 !== t ? "Instead" : "Equip"),
				this.fdi(1, i);
		}
	}
	sdi() {
		this.ami = new FilterSortEntrance_1.FilterSortEntrance(
			this.GetItem(12),
			this.kGt,
		);
	}
	pdi(e) {
		for (const i of this.dmi) {
			var t =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(
					i.Id,
				);
			t = 0 === e ? t.UseWayId : t.DestroyUseWayId;
			this.ami.ClearData(t);
		}
	}
	vdi(e) {
		var t =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(e),
			i = void 0 !== t && t?.bFilterSortVisible;
		let o = 0;
		var n =
			ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(e);
		switch (this.gmi) {
			case 0:
				(o = n.UseWayId), this.ami.SetUiActive(i);
				break;
			case 1:
				o = n.DestroyUseWayId;
				var s = 0 === this.zmi;
				this.ami.SetUiActive(i && s);
		}
		(t = this.Mdi(e)), this.Sdi(o, t), this.Edi(e, t);
	}
	Sdi(e, t) {
		this.ami.UpdateData(e, t);
	}
	Hmi() {
		var e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
		e = this.Cmi[e];
		return this.cmi.length > e
			? this.cmi[e]
			: 0 < this.cmi.length
				? this.cmi[0]
				: void 0;
	}
	HGt(e) {
		var t;
		this.XAt &&
			((t = e.length),
			this.XAt.RefreshByData(
				e,
				void 0,
				() => {
					this.ydi(e.length <= 0);
				},
				!0,
			),
			t <= 0) &&
			ModelManager_1.ModelManager.InventoryModel.SetSelectedItemViewData(
				void 0,
			);
	}
	ndi() {
		var e = this.GetItem(7),
			t = e.GetOwner();
		e.SetUIActive(!0),
			(this.XAt = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(6),
				t,
				this.z9e,
			)),
			e.SetUIActive(!1);
	}
	rdi() {
		this._mi.RefreshTemp(InventoryDefine_1.COMMON_COIN),
			this._mi.SetToPayShopFunction(),
			this._mi.SetPayShopButtonActive(),
			this.umi.RefreshTemp(InventoryDefine_1.ADVANCED_COIN),
			this.umi.SetToPayShopFunction(),
			this.umi.SetPayShopButtonActive();
	}
	async odi(e) {
		var t;
		(this.dmi =
			ModelManager_1.ModelManager.InventoryModel.GetOpenIdMainTypeConfig()),
			this.dmi.length <= 0 ||
				(this.dmi.sort((e, t) => e.SequenceId - t.SequenceId),
				(t = new CommonTabComponentData_1.CommonTabComponentData(
					this.jmi,
					this.Wmi,
					this.yqe,
				)),
				(this.cpt =
					new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
						this.GetItem(1),
						t,
						this.ACt,
					)),
				(t = this.Idi(this.dmi)),
				await this.cpt.RefreshTabItemAsync(t),
				this.cpt.SelectToggleByIndex(e, !0),
				this.cpt.GetTabItemByIndex(1));
	}
	Idi(e) {
		var t = e.length,
			i = this.cpt.CreateTabItemDataByLength(t);
		for (let e = 0; e < t; e++) {
			var o = this.dmi[e];
			o && (i[e].RedDotName = this.Tdi(o.Id));
		}
		return i;
	}
	Tdi(e) {
		let t;
		switch (e) {
			case 0:
				t = "InventoryVirtual";
				break;
			case 1:
				t = "InventoryCommon";
				break;
			case 2:
				t = "InventoryWeapon";
				break;
			case 3:
				t = "InventoryPhantom";
				break;
			case 4:
				t = "InventoryCollection";
				break;
			case 5:
				t = "InventoryMaterial";
				break;
			case 6:
				t = "InventoryMission";
				break;
			case 7:
				t = "InventorySpecial";
				break;
			case 8:
				t = "InventoryCard";
		}
		return t;
	}
	Ldi() {
		var e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
		this.Qmi(e);
	}
	Qmi(e) {
		(this.pmi = !0), (e = this.dmi[e].Id), this.vdi(e), this.Omi();
	}
	Mdi(e) {
		this._di();
		var t,
			i,
			o = ModelManager_1.ModelManager.InventoryModel;
		for (const m of o.GetItemDataBaseByMainType(e))
			if (0 !== m.GetType()) {
				if (m instanceof CommonItemData_1.CommonItemData) {
					var n = m.GetMaxStackCount();
					if (n <= 0) continue;
					var s = m.GetConfig();
					if (!s) continue;
					var a = m.GetConfigId();
					this.Ddi(
						s.Id,
						m.GetCount(),
						n,
						s.QualityId,
						!1,
						o.IsNewCommonItem(a),
						o.IsCommonItemHasRedDot(a),
						m,
					);
				}
				m instanceof WeaponItemData_1.WeaponItemData
					? (n = m.GetConfig()) &&
						((s = m.GetUniqueId()),
						(a = {
							ConfigId: n.ItemId,
							Count: 1,
							QualityId: n.QualityId,
							IsLock: m.GetIsLock(),
							IsNewItem: o.IsNewAttributeItem(s),
							ItemDataType: 2,
							ItemDataBase: m,
							HasRedDot: o.IsAttributeItemHasRedDot(s),
							ItemOperationMode: this.gmi,
							IsSelectOn: !1,
							SelectOnNum: 0,
							StackId: 0,
						}),
						this.Rdi(a))
					: m instanceof PhantomItemData_1.PhantomItemData &&
						(i = m.GetConfig()) &&
						((t = m.GetUniqueId()),
						(i = {
							ConfigId: i.ItemId,
							Count: 1,
							QualityId: i.QualityId,
							IsLock: m.GetIsLock(),
							IsNewItem: o.IsNewAttributeItem(t),
							ItemDataType: 3,
							ItemDataBase: m,
							HasRedDot: o.IsAttributeItemHasRedDot(t),
							ItemOperationMode: this.gmi,
							IsSelectOn: !1,
							SelectOnNum: 0,
							StackId: 0,
						}),
						this.Rdi(i));
			}
		return this.cmi;
	}
	_di() {
		(this.cmi.length = 0), this.mmi.clear();
	}
	adi() {
		if (this.dmi) {
			var e = [];
			for (const n of this.dmi) {
				var t =
						ModelManager_1.ModelManager.InventoryModel.GetInventoryItemGridCountByMainType(
							n.Id,
						),
					i =
						ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(
							n.Id,
						),
					o = i.PackageId;
				ConfigManager_1.ConfigManager.InventoryConfig.GetPackageConfig(o)
					.PackageCapacity <= t &&
					((o = i.Name),
					(t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o) + " "),
					e.push(t));
			}
			var n = 0 < e.length;
			if (!this.vmi && n) {
				var s = new StringBuilder_1.StringBuilder();
				for (const t of e) s.Append(t);
				var a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(173);
				a.SetTextArgs(s.ToString()),
					(this.vmi = !0),
					a.FunctionMap.set(1, () => {
						this.vmi = !1;
					}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						a,
					);
			}
			this.Mmi !== n && this.Udi(n), (this.Mmi = n);
		}
	}
	Udi(e) {
		e
			? this.UiViewSequence.PlaySequence("Notice")
			: this.UiViewSequence.StopSequenceByKey("Notice", void 0, !0);
	}
	Rdi(e) {
		var t = new ItemViewData_1.ItemViewData(e);
		for (const e of Array.from(this.Zmi.values()))
			if (e.IsEqual(t, !0)) {
				t.SetSelectOn(e.GetSelectOn()), t.SetSelectNum(e.GetSelectNum());
				break;
			}
		this.cmi.push(t), (e = e.ConfigId);
		let i = this.mmi.get(e);
		return i || ((i = new Set()), this.mmi.set(e, i)), i.add(t), t;
	}
	Adi(e) {
		return this.mmi.get(e);
	}
	Ddi(e, t, i, o, n, s, a, m) {
		if (!(i <= 0)) {
			let r = t,
				h = 0;
			const d = {
				ConfigId: e,
				Count: i,
				QualityId: o,
				IsLock: n,
				IsNewItem: s,
				ItemDataType: 0,
				ItemDataBase: m,
				HasRedDot: a,
				ItemOperationMode: this.gmi,
				IsSelectOn: !1,
				SelectOnNum: 0,
				StackId: 0,
			};
			for (; 0 < r - i; ) {
				const t = {
					ConfigId: e,
					Count: i,
					QualityId: o,
					IsLock: n,
					IsNewItem: s,
					ItemDataType: 0,
					ItemDataBase: m,
					HasRedDot: a,
					ItemOperationMode: this.gmi,
					IsSelectOn: !1,
					SelectOnNum: 0,
					StackId: 0,
				};
				(t.Count = i), (t.StackId = h), this.Rdi(t), (r -= i), h++;
			}
			(d.Count = r), (d.StackId = h), this.Rdi(d);
		}
	}
	qft(e) {
		var t, i;
		e
			? ((t = e.GetRedDotDisableRule()),
				(i = ModelManager_1.ModelManager.InventoryModel),
				this.Dmi(e),
				1 === t && this.Rmi(e),
				0 === e.GetItemDataType()
					? (i.SaveNewCommonItemConfigIdList(),
						i.SaveRedDotCommonItemConfigIdList())
					: (i.SaveNewAttributeItemUniqueIdList(),
						i.SaveRedDotAttributeItemUniqueIdList()),
				this.Pdi(e),
				this.Ami(e),
				this.RefreshItemDescription(e),
				this.Kmi(),
				1 === this.gmi &&
					(this.xdi(e, this.fmi), this.fmi || this.Xmi(!e.GetSelectOn(), e)))
			: this.wdi();
	}
	Edi(e, t) {
		var i = (e = (o =
				ConfigManager_1.ConfigManager.InventoryConfig).GetItemMainTypeConfig(e))
				.Name,
			o = ((e = e.PackageId), o.GetPackageConfig(e));
		(e = this.GetText(5)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(e, i),
			(e = t.length),
			(i = o.PackageCapacity),
			(t = this.GetText(2));
		i <= e
			? (t.SetText(`<color=red>${e}</color>/` + i),
				AudioSystem_1.AudioSystem.PostEvent("ui_inventory_capacity_full"))
			: t.SetText(e + "/" + i);
	}
	ydi(e) {
		var t = this.GetItem(4),
			i = this.GetLoopScrollViewComponent(6);
		t.SetUIActive(e),
			i.RootUIComp.SetUIActive(!e),
			this.Bdi(),
			e && 1 === this.gmi && this.SetDestroyViewMode(0);
	}
	Kmi() {
		var e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
		this.Cmi[e] = this.XAt.GetSelectedGridIndex();
	}
	Pdi(e) {
		this.Kui && this.XAt.DeselectCurrentGridProxy();
		var t = this.cmi.indexOf(e);
		this.XAt.IsGridDisplaying(t) || this.XAt.ScrollToGridIndex(t),
			(this.Kui = e),
			(this.smi = t),
			ModelManager_1.ModelManager.InventoryModel.SetSelectedItemViewData(e),
			this.XAt.SelectGridProxy(t, !0),
			this.XAt.RefreshGridProxy(t),
			this.RefreshItemTipsFunction(e);
	}
	Dmi(e) {
		if ((e.RemoveNewItem(), !(0 < e.GetUniqueId()))) {
			var t = this.Adi(e.GetConfigId());
			if (t) for (const i of t) i !== e && i.RemoveNewItem();
		}
	}
	Rmi(e) {
		if ((e.RemoveRedDotItem(), !(0 < e.GetUniqueId()))) {
			var t = this.Adi(e.GetConfigId());
			if (t) for (const i of t) i !== e && i.RemoveRedDotItem();
		}
	}
	Ami(e) {
		if (!(0 < e.GetUniqueId())) {
			var t,
				i = this.Adi(e.GetConfigId());
			if (i)
				for (const o of i)
					o !== e && ((t = this.cmi.indexOf(o)), this.XAt.RefreshGridProxy(t));
		}
	}
	RefreshItemTipsFunction(e) {
		var t = this.Kui.GetItemType(),
			i = e.GetItemDataBase();
		switch ((this.gPt.ClearButtonList(), t)) {
			case 13:
				this.ddi();
				break;
			case 9:
				this.gdi();
				break;
			case 2:
				this.Cdi();
				break;
			default:
				this.cdi(i);
		}
	}
	RefreshItemDescription(e) {
		var t = (e = e.GetItemDataBase()).GetConfigId();
		e = e.GetUniqueId();
		const i = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(
			t,
			e,
		);
		switch (this.gmi) {
			case 1:
				var o = i.GetWayData ?? [];
				for (const e of o) e.Function = this.Jmi;
				(i.GetWayData = o),
					this.gPt.RefreshTips(i),
					this.gPt.SetVisible(!0),
					this.gPt.SetTipsComponentLockButton(!1);
				break;
			case 0:
				this.gPt.RefreshTips(i), this.gPt.SetVisible(!0);
		}
		this.EPe.StopCurrentSequence();
	}
	wdi() {
		this.gPt.SetVisible(!1);
	}
	kmi(e, t) {
		(e = this.TipsButtonIndexMap.get(e)) &&
			this.gPt.SetButtonEnableByIndex(e, t);
	}
	fdi(e, t, i) {
		this.TipsButtonIndexMap.has(e) &&
			((e = this.TipsButtonIndexMap.get(e)),
			this.gPt.SetButtonTextByIndex(e, t, i));
	}
	Umi(e, t) {
		void 0 !== (e = this.TipsButtonIndexMap.get(e)) &&
			this.gPt.SetButtonRedDotVisible(e, t);
	}
	mdi(e) {
		let t = 0;
		var i = [];
		for (const n of e) {
			var o = this.TipsButtonRelationMap.get(n);
			if (!o)
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error("Inventory", 38, "背包Tips按钮功能设置错误")
				);
			(o.Index = t), this.TipsButtonIndexMap.set(n, t), i.push(o), t++;
		}
		this.gPt.RefreshButton(i);
	}
	tdi() {
		return this.Zmi.size === ItemViewDefine_1.MAX_DESTROY_MODE_COUNT;
	}
	SetViewMode(e) {
		var t = this.gmi,
			i = ((this.gmi = e), this.Zmi.clear(), this.GetButton(14)),
			o = this.GetButton(20),
			n = this.GetExtendToggle(18),
			s = this.GetItem(15),
			a = this.GetText(16),
			m = this.GetText(17);
		t !== this.gmi && this.pdi(t),
			(this.cpt.NeedCaptionSwitchWithToggle = 0 === this.gmi),
			(e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex());
		switch (
			(this.cpt.SelectToggleByIndex(e, !0), this.Ldi(), this.Bdi(), this.gmi)
		) {
			case 0:
				this.cpt.SetCloseBtnShowState(!0),
					i.RootUIComp.SetUIActive(!1),
					this.gPt.SetButtonPanelVisible(!0),
					n.RootUIComp.SetUIActive(!1),
					o.RootUIComp.SetUIActive(!1),
					this.WGe.SetUiActive(!1),
					s.SetUIActive(!1),
					a.SetUIActive(!1),
					m.SetUIActive(!1);
				break;
			case 1:
				this.cpt.SetTitle(
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"Text_ItemRecycle_text",
					),
				);
				var r =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"SP_DestroyModeIcon",
					);
				this.cpt.SetTitleIcon(r),
					this.cpt.SetCloseBtnShowState(!1),
					i.RootUIComp.SetUIActive(!0),
					this.gPt.SetButtonPanelVisible(!1),
					o.RootUIComp.SetUIActive(!0),
					s.SetUIActive(!0),
					this.bdi(),
					m.SetUIActive(!0);
		}
		t !== this.gmi &&
			this.UiViewSequence.PlaySequence(
				0 === t ? "DestroyShow" : "DestroyHide",
				!0,
			);
	}
	SetDestroyViewMode(e) {
		this.zmi = e;
		var t = this.GetText(16);
		switch (this.zmi) {
			case 0:
				var i =
					ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
				i = this.dmi[i].Id;
				(i =
					void 0 !==
						(i =
							ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(
								i,
							)) && i?.bFilterSortVisible) ||
					t.ShowTextNew("Text_ItemRecycleChooseTip_text"),
					t.SetUIActive(!i),
					this.ami.SetUiActive(i),
					this.SetDestroyAllSelectedState(i),
					this.WGe.SetUiActive(!1);
				break;
			case 1:
				t.SetUIActive(!0),
					t.ShowTextNew("Text_ItemRecycleLimited_text"),
					this.WGe.SetUiActive(!1),
					this.ami.SetUiActive(!1),
					this.SetDestroyAllSelectedState(!1);
				break;
			case 2:
				t.SetUIActive(!1),
					this.WGe.SetUiActive(!0),
					this.ami.SetUiActive(!1),
					this.SetDestroyAllSelectedState(!1);
		}
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Inventory", 38, "切换摧毁模式表现", [
				"Mode",
				this.zmi.toString(),
			]);
	}
	xdi(e, t) {
		if (!e.IsItemCanDestroy()) this.SetDestroyViewMode(t ? 0 : 1);
		else
			switch (e.GetItemDataType()) {
				case 0:
					this.SetDestroyViewMode(t ? 0 : 2), t || this.qdi(e);
					break;
				case 2:
				case 3:
					this.SetDestroyViewMode(0);
			}
	}
	Xmi(e, t) {
		if (t)
			if (this.tdi() && e)
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"ItemDestroyCountLimit",
				);
			else if (t.IsItemCanDestroy()) {
				var i = this.cmi.indexOf(t);
				if (!(i < 0)) {
					for (const e of Array.from(this.Zmi.values()))
						if (e.IsEqual(t, !0)) {
							this.Zmi.delete(e);
							break;
						}
					e ? (this.Zmi.add(t), t.SetSelectNum(1)) : t.SetSelectNum(0),
						t.SetSelectOn(e),
						this.XAt.RefreshGridProxy(i),
						this.Gdi(e, t);
				}
			} else 1 !== this.zmi && this.SetDestroyViewMode(1);
	}
	Gdi(e, t) {
		switch ((this.bdi(), this.zmi)) {
			case 0:
				e && this.xdi(t, !1);
				break;
			case 2:
				e ? this.qdi(this.Kui) : this.SetDestroyViewMode(0);
		}
	}
	SetDestroyAllSelectedState(e, t) {
		var i = this.GetExtendToggle(18);
		void 0 !== e && i.RootUIComp.SetUIActive(e),
			void 0 !== t && i.SetToggleState(t ? 1 : 0, !1);
	}
	bdi() {
		var e = this.Zmi.size,
			t = this.GetText(17);
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			t,
			"Text_ItemRecycleChosenTotal_text",
			e.toString(),
			ItemViewDefine_1.MAX_DESTROY_MODE_COUNT.toString(),
		);
	}
	Bdi() {
		var e = this.GetButton(13),
			t = 1 === this.gmi,
			i = 0 <= this.XAt.Ndi;
		e.RootUIComp.SetUIActive(!t && i);
	}
	qdi(e) {
		e &&
			((e = {
				MaxNumber: e.GetCount(),
				GetExchangeTableText: this.KGe,
				ValueChangeFunction: this.QGe,
			}),
			this.WGe.Init(e));
	}
}
exports.InventoryView = InventoryView;
