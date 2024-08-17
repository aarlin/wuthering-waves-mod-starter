"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionRecoveryTabView = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView"),
	SortViewData_1 = require("../../../Common/FilterSort/Sort/Model/SortViewData"),
	CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
	SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent"),
	SelectablePropDataUtil_1 = require("../../../Common/PropItem/SelectablePropItem/SelectablePropDataUtil"),
	ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	CalabashController_1 = require("../../CalabashController"),
	CalabashDefine_1 = require("../../CalabashDefine"),
	VisionRecoveryChoosePanel_1 = require("./VisionRecoveryChoosePanel"),
	VisionRecoverySlotPanel_1 = require("./VisionRecoverySlotPanel");
class VisionRecoveryTabView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.evt = []),
			(this.tvt = []),
			(this.ivt = []),
			(this.ovt = void 0),
			(this.qpt = void 0),
			(this.DFe = void 0),
			(this.rvt = !1),
			(this.nvt = !1),
			(this.svt = () => {
				this.ovt.SetActive(!1),
					this.ovt.UiViewSequence.RemoveSequenceFinishEvent(
						"SwitchB",
						this.svt,
					);
			}),
			(this.avt = (e, t) => {
				e
					? (this.nvt || this.hvt(), this.lvt())
					: 0 <= (e = this.evt.findIndex((e) => e.IncId === t.GetUniqueId())) &&
						(this.evt.splice(e, 1),
						this._vt(this.tvt, this.evt),
						this.Fpt(this.evt));
			}),
			(this.uvt = () => {
				this.evt.length <= 0 ? this.cvt() : this.mvt();
			}),
			(this.dvt = () => {
				if (this.evt.length < CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM)
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"Text_EchoLack_Text",
					);
				else if (
					ModelManager_1.ModelManager.CalabashModel.HideVisionRecoveryConfirmBox
				)
					this.Cvt();
				else {
					let o,
						n = !1,
						a = !1,
						r = !1;
					for (const t of this.evt) {
						var e =
							ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
								t.IncId,
							);
						e &&
							(!n &&
								ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighQuality(
									e,
								) &&
								(n = !0),
							!a &&
								ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighLevel(
									e,
								) &&
								(a = !0),
							!r) &&
							ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighRare(
								e,
							) &&
							(r = !0);
					}
					var t,
						i = [];
					switch (
						(n &&
							((t =
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"VisionHighQuality",
								)),
							i.push(t)),
						a &&
							((t =
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"VisionHighLevel",
								)),
							i.push(t)),
						r &&
							((t =
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"VisionHighRare",
								)),
							i.push(t)),
						i.length)
					) {
						case 1:
							o = 127;
							break;
						case 2:
							o = 126;
							break;
						case 3:
							o = 125;
					}
					o
						? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o)).SetTextArgs(
								...i,
							),
							t.FunctionMap.set(2, this.Cvt),
							(t.HasToggle = !0),
							(t.ToggleText =
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									"Text_ItemRecycleConfirmToggle_text",
								)),
							t.SetToggleFunction(this.gvt),
							ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
								t,
							))
						: this.Cvt();
				}
			}),
			(this.Cvt = () => {
				CalabashController_1.CalabashController.RequestPhantomRefiningRequest(
					this.evt,
				);
			}),
			(this.gvt = (e) => {
				ModelManager_1.ModelManager.CalabashModel.HideVisionRecoveryConfirmBox =
					e;
			}),
			(this.fvt = () =>
				new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			(this.pvt = (e) => {
				(this.evt = e), this.Fpt(this.evt);
			}),
			(this.vvt = () => {
				this.Mvt();
			}),
			(this.Svt = (e) => {
				UiManager_1.UiManager.OpenView("VisionRecoveryResultView", e, (e) => {
					(this.tvt =
						ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList()),
						this.mvt(),
						this.Mvt();
				});
			}),
			(this.Evt = (e) => {
				void 0 !== e && (this.ivt = e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[5, UE.UIHorizontalLayout],
			[6, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[3, this.uvt],
				[4, this.dvt],
			]);
	}
	async OnBeforeStartAsync() {
		(this.qpt = new VisionRecoverySlotPanel_1.VisionRecoverySlotPanel(
			this.avt,
			!0,
		)),
			await this.qpt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
			(this.DFe = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(5),
				this.fvt,
			)),
			this.yvt(),
			(this.ovt = new VisionRecoveryChoosePanel_1.VisionRecoveryChoosePanel()),
			this.ovt.BindClickCloseCallBack(this.vvt),
			this.ovt.BindFilterSortRefresh(this.Evt);
		var e = this.GetItem(1);
		await this.ovt.CreateByResourceIdAsync("UiItem_VisionRecoveryList", e);
	}
	OnStart() {
		this.Fpt(this.evt);
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnVisionRecoveryResult,
			this.Svt,
		);
	}
	hvt() {
		(this.nvt = !0),
			(this.tvt =
				ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList()),
			this._vt(this.tvt, this.evt);
	}
	yvt() {
		var e = CommonParamById_1.configCommonParamById.GetIntConfig(
				"VisionRecoveryPreviewRewardDropId",
			),
			t = new Array(),
			i =
				ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
					e,
				).DropPreview;
		for (const e of i.keys()) {
			var o = [{ IncId: 0, ItemId: e }, i.get(e)];
			t.push(o);
		}
		this.DFe.RefreshByData(t);
	}
	_vt(e, t) {
		var i = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData(),
			o = new SelectableComponent_1.SelectableComponentData();
		(o.IsSingleSelected = !1),
			(o.MaxSelectedGridNum = CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM),
			(o.OnChangeSelectedFunction = this.pvt),
			(i.SelectableComponentType = 1),
			(i.ItemDataBaseList = e),
			(i.SelectedDataList = t),
			(i.ExpData = void 0),
			(i.SelectableComponentData = o),
			(i.UseWayId = 33),
			(i.InitSortToggleState = !0),
			this.ovt.RefreshUi(i);
	}
	Fpt(e) {
		const t = [];
		e.forEach((e) => {
			void 0 !==
				(e = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(
					e.IncId,
				)) && t.push(e);
		}),
			this.qpt.RefreshUi(t);
		e = t.length;
		var i = this.GetText(2),
			o = 0 < e ? "DeleteSelect" : "AutoSelect";
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			i,
			"Text_EchoSelect_Text",
			e,
			CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM,
		),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), o);
	}
	lvt() {
		this.rvt ||
			((this.rvt = !0),
			this.ovt.SetActive(!0),
			this.UiViewSequence.PlaySequence("SwitchA"),
			this.ovt.UiViewSequence.PlaySequence("SwitchA"),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshCalabashTabShowState,
				!0,
			));
	}
	Mvt() {
		this.rvt &&
			((this.rvt = !1),
			this.UiViewSequence.PlaySequence("SwitchB"),
			this.ovt.UiViewSequence.PlaySequence("SwitchB"),
			this.ovt.UiViewSequence.AddSequenceFinishEvent("SwitchB", this.svt),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshCalabashTabShowState,
				!1,
			));
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnVisionRecoveryResult,
			this.Svt,
		);
	}
	cvt() {
		this.nvt || this.Ivt();
		var e = [];
		for (const i of this.ivt) {
			var t =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
					i.GetUniqueId(),
				);
			if (
				(void 0 !== t &&
					t.GetPhantomLevel() <= 0 &&
					!t.GetIfLock() &&
					e.push(i),
				e.length >= CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM)
			)
				break;
		}
		e.length < CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM
			? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"RoleNoMaterial",
				)
			: ((this.evt = []),
				e.forEach((e) => {
					((e =
						SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(
							e,
						)).SelectedCount = 1),
						this.evt.push(e);
				}),
				this.Fpt(this.evt),
				this._vt(this.tvt, this.evt));
	}
	Ivt() {
		this.ivt =
			ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
		var e = ConfigManager_1.ConfigManager.SortConfig.GetSortId(33),
			t =
				((e = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(e)),
				new SortViewData_1.SortResultData()),
			i = (t.SetConfigId(e.Id), t.SetIsAscending(!0), e.BaseSortList[0]),
			o = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(i, e.DataId);
		t.SetSelectBaseSort([i, o]),
			ModelManager_1.ModelManager.SortModel.SortDataList(this.ivt, e.Id, t);
	}
	mvt() {
		this.evt.length <= 0 ||
			((this.evt = []), this._vt(this.tvt, this.evt), this.Fpt(this.evt));
	}
	RemoveAllVisionItemOutside() {
		(this.tvt =
			ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList()),
			this.mvt();
	}
}
exports.VisionRecoveryTabView = VisionRecoveryTabView;
