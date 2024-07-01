"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookRootView = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine"),
	UiManager_1 = require("../../../Ui/UiManager"),
	FilterEntrance_1 = require("../../Common/FilterSort/Filter/View/FilterEntrance"),
	SortEntrance_1 = require("../../Common/FilterSort/Sort/View/SortEntrance"),
	StarLevelComponent_1 = require("../../Manufacture/Common/StarLevelComponent"),
	UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	CookController_1 = require("../CookController"),
	CookingIngredientsView_1 = require("./CookingIngredientsView"),
	CookMediumItemGrid_1 = require("./CookMediumItemGrid"),
	TIMERGAP = 1e3;
class CookRootView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.cGt = 0),
			(this.mGt = 0),
			(this.dGt = void 0),
			(this.CGt = void 0),
			(this.gGt = new Array()),
			(this.Ybt = new Array()),
			(this.fGt = void 0),
			(this.pGt = void 0),
			(this.vGt = void 0),
			(this.MGt = !1),
			(this.SGt = void 0),
			(this.m5s = void 0),
			(this.c4s = !1),
			(this.EGt = () => {
				this.yGt(),
					this.IGt(),
					this.pGt.UpdateData(19, this.TGt()),
					this.vGt.UpdateData(19, this.TGt()),
					this.Qqt();
				var e = ModelManager_1.ModelManager.CookModel.GetCookerMaxLevel(),
					t =
						ModelManager_1.ModelManager.CookModel.GetCookerInfo().CookingLevel;
				this.SGt.ShowLevel(t, e), this.Dqt();
			}),
			(this.DGt = (e) => {
				this.RGt(e);
			}),
			(this.UGt = () => {
				this.AGt();
			}),
			(this.GOe = void 0),
			(this.PGt = () => {
				var e = new MainTypeItem();
				return e.SetMainTypeCallback(this.xGt), e;
			}),
			(this.wGt = () => {
				this.Dqt(),
					this.fGt?.OnSecondTimerRefresh(),
					this.BGt() || this.bGt()
						? CookController_1.CookController.SendCookingDataRequestAsync().then(
								(e) => {
									e && this.qGt();
								},
							)
						: this.GGt() &&
							CookController_1.CookController.SendCookingDataRequestAsync().then(
								(e) => {
									e && this.pGt.UpdateData(19, this.TGt());
								},
							);
			}),
			(this.z9e = () => {
				var e = new CookMediumItemGrid_1.CookMediumItemGrid();
				return e.BindOnExtendToggleStateChanged(this.NGt), e;
			}),
			(this.jwe = (e) => {
				"OnBlackScreen" === e &&
					(this.ChildPopView?.PlayLevelSequenceByName("Start"),
					this.m5s?.IsPending() && this.m5s.SetResult(),
					(this.c4s = !0));
			}),
			(this.bpt = (e, t) => {
				this.CGt.DeselectCurrentGridProxy(!1), (this.cGt = 0), this.kGt(e);
			}),
			(this.FGt = (e, t) => {
				this.kGt(e);
			}),
			(this.qGt = () => {
				0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
					? (this.pGt.UpdateData(19, this.TGt()),
						this.vGt.UpdateData(19, this.TGt()))
					: (this.pGt.UpdateData(27, this.TGt()),
						this.vGt.UpdateData(27, this.TGt()));
			}),
			(this.VGt = (e = !0) => {
				this.HGt(), this.fGt.RefreshTipsWithSavedData(), this.jGt(e);
			}),
			(this.HGt = () => {
				this.CGt.DeselectCurrentGridProxy(),
					0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
						? this.CGt.RefreshByData(this.gGt)
						: this.CGt.RefreshByData(this.Ybt);
			}),
			(this.WGt = () => {
				this.ChildPopView?.PlaySequenceAsync(
					"Close",
					new CustomPromise_1.CustomPromise(),
					!0,
					!1,
				).then(() => {
					this.ChildPopView?.PopItem.SetActive(!1);
				});
			}),
			(this.QGt = () => {
				this.ChildPopView?.PopItem.SetUiActive(!1);
			}),
			(this.$Ge = (e) => {
				"CompositeRewardView" === e &&
					(this.ChildPopView?.PopItem.SetActive(!0),
					this.ChildPopView?.PlayLevelSequenceByName("Start"));
			}),
			(this.iHs = () => {
				this.fGt.RefreshCooking();
			}),
			(this.$Gt = () => {
				CookController_1.CookController.IsPlayingSuccessDisplay
					? CookController_1.CookController.SkipCookSuccessDisplay()
					: CookController_1.CookController.IsPlayingFailDisplay &&
						CookController_1.CookController.SkipCookFailDisplay();
			}),
			(this.xGt = (e) => {
				ModelManager_1.ModelManager.CookModel.CurrentCookListType !== e &&
					(0 === e
						? ((ModelManager_1.ModelManager.CookModel.CurrentCookListType = 0),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.SwitchCookType,
							),
							this.GetItem(3).SetUIActive(!0),
							(this.MGt = !0))
						: ((ModelManager_1.ModelManager.CookModel.CurrentCookListType = 1),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.SwitchCookType,
							),
							(this.MGt = !0),
							this.GetItem(3).SetUIActive(!1)),
					this.qGt(),
					this.LGt(),
					(this.MGt = !1));
			}),
			(this.NGt = (e) => {
				let t = 0;
				var i;
				e = e.Data;
				this.CGt.DeselectCurrentGridProxy(),
					0 === e.MainType
						? ((this.cGt = this.gGt.indexOf((i = e))),
							(t = this.cGt),
							this.fGt.RefreshTips(i))
						: ((this.mGt = this.Ybt.indexOf((i = e))),
							(t = this.mGt),
							this.fGt.RefreshTips(i)),
					this.CGt.IsGridDisplaying(t) &&
						(e.IsNew &&
							!this.MGt &&
							(ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
								LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
								e.ItemId,
							),
							(e.IsNew = !1)),
						this.CGt.SelectGridProxy(t),
						this.CGt.RefreshGridProxy(t),
						this.LGt(),
						(this.MGt = !1));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIHorizontalLayout],
			[1, UE.UIItem],
			[2, UE.UILoopScrollViewComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
			[6, UE.UISprite],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIText],
			[10, UE.UIItem],
			[11, UE.UIHorizontalLayout],
			[12, UE.UIItem],
			[13, UE.UIText],
		]),
			(this.BtnBindInfo = [[5, this.UGt]]);
	}
	async OnBeforeStartAsync() {
		(this.fGt = new CookingIngredientsView_1.CookingIngredientsView()),
			(this.dGt = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(0),
				this.PGt,
			)),
			await Promise.all([
				this.fGt.CreateByActorAsync(this.GetItem(4).GetOwner()),
				this.dGt.RefreshByDataAsync([0, 1]),
				CookController_1.CookController.SendCookingDataRequestAsync(),
			]);
	}
	OnStart() {
		(this.CGt = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(2),
			this.GetLoopScrollViewComponent(2).TemplateGrid,
			this.z9e,
		)),
			(this.pGt = new FilterEntrance_1.FilterEntrance(
				this.GetItem(3),
				this.bpt,
			)),
			(this.vGt = new SortEntrance_1.SortEntrance(this.GetItem(10), this.FGt)),
			this.vGt.SetSortToggleState(!0),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(9), "CookLevelButtonText"),
			(this.SGt = new StarLevelComponent_1.StarLevelComponent(
				this.GetHorizontalLayout(11),
			)),
			(this.m5s = new CustomPromise_1.CustomPromise());
		var e = ModelManager_1.ModelManager.CookModel;
		(e.CurrentInteractCreatureDataLongId =
			ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId),
			(e.CurrentCookListType = 0),
			this.EGt(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
				this.jwe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseCookRole,
				this.iHs,
			);
	}
	OnBeforeShow() {
		this.ChildPopView?.PopItem.SetMaskResponsibleState(!1);
	}
	async OnBeforeShowAsyncImplement() {
		UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence() &&
			this.m5s &&
			(await this.m5s.Promise);
	}
	OnAfterShow() {
		this.YGt();
	}
	YGt() {
		var e,
			t = this.ChildPopView.PopItem;
		t &&
			!this.c4s &&
			((e =
				!UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence()),
			t.GetActive() !== e) &&
			t.SetActive(e);
	}
	OnAfterPlayStartSequence() {
		var e = this.cGt;
		this.CGt.DeselectCurrentGridProxy(),
			this.CGt.ScrollToGridIndex(e),
			this.CGt.SelectGridProxy(e);
	}
	yGt() {
		ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 0;
		var e = this.dGt.GetLayoutItemList();
		let t = !1;
		for (let o = 0; o < e.length; o++) {
			var i = e[o];
			0 < this.JGt(i.GetMainType()).length || o === e.length - 1
				? (i.SetUiActive(!0),
					t ||
						(this.dGt.SelectGridProxy(i.GridIndex),
						(ModelManager_1.ModelManager.CookModel.CurrentCookListType =
							i.GetMainType()),
						(t = !0)))
				: i.SetUiActive(!1);
		}
	}
	RGt(e) {
		UiManager_1.UiManager.OpenView("CookRoleView", e);
	}
	AGt() {
		UiManager_1.UiManager.OpenView("CookLevelView");
	}
	OnAfterHide() {
		ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
			LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
		);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UpdateFormula,
			this.qGt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CookSuccess,
				this.VGt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CookFail,
				this.VGt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.MachiningSuccess,
				this.VGt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.MachiningStudyFail,
				this.VGt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GetCookData,
				this.EGt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OpenCookRole,
				this.DGt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OpenCookLevel,
				this.UGt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBeginPlayCookSuccessDisplay,
				this.WGt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBeginPlayCookFailDisplay,
				this.QGt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			InputDistributeController_1.InputDistributeController.BindAction(
				InputMappingsDefine_1.actionMappings.Ui左键点击,
				this.$Gt,
			),
			InputDistributeController_1.InputDistributeController.BindTouch(
				TouchFingerDefine_1.EFingerIndex.One,
				this.$Gt,
			),
			(this.GOe = TimerSystem_1.TimerSystem.Forever(this.wGt, 1e3));
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UpdateFormula,
			this.qGt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CookSuccess,
				this.VGt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CookFail,
				this.VGt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.MachiningSuccess,
				this.VGt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.MachiningStudyFail,
				this.VGt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GetCookData,
				this.EGt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OpenCookRole,
				this.DGt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OpenCookLevel,
				this.UGt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBeginPlayCookSuccessDisplay,
				this.WGt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBeginPlayCookFailDisplay,
				this.QGt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			InputDistributeController_1.InputDistributeController.UnBindAction(
				InputMappingsDefine_1.actionMappings.Ui左键点击,
				this.$Gt,
			),
			InputDistributeController_1.InputDistributeController.UnBindTouch(
				TouchFingerDefine_1.EFingerIndex.One,
				this.$Gt,
			),
			this.GOe &&
				TimerSystem_1.TimerSystem.Has(this.GOe) &&
				(TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
	}
	Dqt() {
		var e = ModelManager_1.ModelManager.CookModel.GetRefreshLimitTime();
		e
			? (this.GetItem(12).SetUIActive(!0),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "RefreshTime", e))
			: this.GetItem(12).SetUIActive(!1);
	}
	BGt() {
		return (
			ModelManager_1.ModelManager.CookModel.GetRefreshLimitTimeValue() <= 0
		);
	}
	bGt() {
		return ModelManager_1.ModelManager.CookModel.CheckHasItemTimeoutStateChangedCore();
	}
	GGt() {
		if (0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType)
			for (const e of this.TGt())
				if (
					0 < e.ExistEndTime &&
					!TimeUtil_1.TimeUtil.IsInTimeSpan(e.ExistStartTime, e.ExistEndTime)
				)
					return !0;
		return !1;
	}
	IGt() {
		var e =
			ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"SP_CookLevel",
			);
		this.SetSpriteByPath(e, this.GetSprite(6), !1);
	}
	Qqt() {
		var e = this.GetItem(7);
		RedDotController_1.RedDotController.BindRedDot("CookerLevel", e);
	}
	DisableRedDot() {
		RedDotController_1.RedDotController.UnBindRedDot("CookerLevel");
	}
	kGt(e) {
		0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
			? ((this.gGt = e),
				(this.gGt = this.gGt.filter(
					(e) =>
						e.IsUnLock ||
						e.ExistEndTime <= 0 ||
						TimeUtil_1.TimeUtil.IsInTimeSpan(e.ExistStartTime, e.ExistEndTime),
				)))
			: (this.Ybt = e),
			this.HGt(),
			0 === e.length
				? (this.GetItem(8).SetUIActive(!0), this.fGt.SetUiActive(!1))
				: (this.GetItem(8).SetUIActive(!1),
					this.fGt.SetUiActive(!0),
					this.jGt(!0));
	}
	LGt() {
		switch (
			(this.ChildPopView?.PopItem.SetTitleVisible(!0),
			ModelManager_1.ModelManager.CookModel.CurrentCookListType)
		) {
			case 0:
				this.ChildPopView?.PopItem.SetTitleText(
					ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
						"MakingDishes",
					) ?? "",
				);
				break;
			case 1:
				this.ChildPopView?.PopItem.SetTitleText(
					ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
						"MakingAccessory",
					) ?? "",
				);
		}
	}
	JGt(e) {
		return 0 === e
			? ModelManager_1.ModelManager.CookModel.GetCookingDataList()
			: ModelManager_1.ModelManager.CookModel.GetMachiningDataList();
	}
	TGt() {
		return this.JGt(ModelManager_1.ModelManager.CookModel.CurrentCookListType);
	}
	jGt(e = !1) {
		let t = 0;
		0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
			? ((t = this.cGt), this.fGt.RefreshTips(this.gGt[t]))
			: ((t = this.mGt), this.fGt.RefreshTips(this.Ybt[t])),
			this.CGt.DeselectCurrentGridProxy(),
			e && this.CGt.ScrollToGridIndex(t),
			this.CGt.SelectGridProxy(t);
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
			this.jwe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseCookRole,
				this.iHs,
			),
			CookController_1.CookController.ClearCookDisplay(),
			this.DisableRedDot(),
			this.CGt && (this.CGt.ClearGridProxies(), (this.CGt = void 0)),
			this.pGt && (this.pGt.Destroy(), (this.pGt = void 0)),
			this.vGt && this.vGt.Destroy(),
			this.dGt && (this.dGt.ClearChildren(), (this.dGt = void 0)),
			this.SGt.Clear();
		var e = ModelManager_1.ModelManager.CookModel;
		(e.CurrentCookRoleId = void 0),
			e.ClearCookRoleItemDataList(),
			(this.m5s = void 0);
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		var t = this.GetGuideUiItem(e[0]);
		if (t) return [t, t];
		if (((t = Number(e[0])), this.CGt?.DataInited)) {
			if (0 !== t) {
				if (
					((t = this.CGt.GetGridAndScrollToByJudge(
						t,
						(e, t) => 0 === t.MainType && 6e4 === t.SubType && e === t.DataId,
					)),
					t)
				)
					return [t, t];
			} else if ((t = this.CGt.GetGridByDisplayIndex(0))) return [t, t];
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Guide", 17, "烹饪界面聚焦引导的额外参数配置错误", [
					"configParams",
					e,
				]);
		}
	}
}
exports.CookRootView = CookRootView;
class MainTypeItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.zGt = void 0),
			(this.OnClickedCallback = void 0),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.OnItemButtonClicked = (e) => {
				1 === e &&
					this.ScrollViewDelegate.SelectGridProxy(
						this.GridIndex,
						this.DisplayIndex,
						!0,
					);
			});
	}
	Refresh(e, t, i) {
		this.zGt = e;
		let o = "";
		(o =
			0 === this.zGt
				? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"SP_Cooking",
					)
				: ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"SP_Machining",
					)),
			this.SetSpriteByPath(o, this.GetSprite(0), !1);
	}
	Clear() {}
	OnSelected(e) {
		this.GetExtendToggle(1).SetToggleState(1, e),
			this.OnClickedCallback?.(this.zGt);
	}
	OnDeselected(e) {
		this.GetExtendToggle(1).SetToggleState(0, !1);
	}
	GetKey(e, t) {
		return t;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [[1, this.OnItemButtonClicked]]);
	}
	GetMainType() {
		return this.zGt;
	}
	SetMainTypeCallback(e) {
		this.OnClickedCallback = e;
	}
}
