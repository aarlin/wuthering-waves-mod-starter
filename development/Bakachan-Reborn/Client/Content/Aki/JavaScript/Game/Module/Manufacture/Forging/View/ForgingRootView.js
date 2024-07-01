"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ForgingRootView = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
	SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
	UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager"),
	GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
	CommonManager_1 = require("../../Common/CommonManager"),
	ForgingController_1 = require("../ForgingController"),
	ForgingIngredientsView_1 = require("./ForgingIngredientsView"),
	ForgingMediumItemGrid_1 = require("./ForgingMediumItemGrid"),
	TIMERGAP = 1e3;
class ForgingRootView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.yTi = 0),
			(this.wIi = void 0),
			(this.ITi = void 0),
			(this.MGt = !1),
			(this.TTi = new Array()),
			(this.LTi = void 0),
			(this.pGt = void 0),
			(this.vGt = void 0),
			(this.GOe = void 0),
			(this.m5s = void 0),
			(this.c4s = !1),
			(this.DTi = void 0),
			(this.wGt = () => {
				this.Dqt(),
					(this.BGt() || this.GGt()) &&
						ForgingController_1.ForgingController.SendForgeInfoRequestAsync().then(
							() => {
								this.RTi();
							},
						);
			}),
			(this.UTi = () => {
				this.ChildPopView?.PlaySequenceAsync(
					"Close",
					new CustomPromise_1.CustomPromise(),
					!0,
					!1,
				).then(() => {
					this.ChildPopView?.PopItem.SetActive(!1);
				});
			}),
			(this.VIi = () => {
				UiManager_1.UiManager.IsViewShow("ForgingRootView") &&
					ForgingController_1.ForgingController.PlayForgingLoopDisplay();
			}),
			(this.$Ge = (e) => {
				"CompositeRewardView" === e &&
					(this.ChildPopView?.PopItem.SetActive(!0),
					this.ChildPopView?.PlayLevelSequenceByName("Start"),
					(e = ModelManager_1.ModelManager.ComposeModel.ComposeSuccessFlow),
					ForgingController_1.ForgingController.PlayForgingFlow(e));
			}),
			(this.d5s = () => {
				this.vGt.UpdateData(24, this.TGt()), this.Dqt();
			}),
			(this.jwe = (e) => {
				"OnBlackScreen" === e &&
					(this.ChildPopView?.PlayLevelSequenceByName("Start"),
					this.m5s?.IsPending() && this.m5s.SetResult(),
					this.ChildPopView?.PopItem.SetActive(!0),
					ForgingController_1.ForgingController.PlayForgingEnterDisplay(
						this.VIi,
					),
					(this.c4s = !0));
			}),
			(this.PGt = (e, t, i) => (
				(t = new MainTypeItem(t, e)).Update(),
				t.SetMainTypeCallback(this.xGt),
				{ Key: i, Value: t }
			)),
			(this.xGt = (e) => {
				for (const e of this.wIi.GetLayoutItemMap().values())
					e.OnDeselectedItem();
				(this.MGt = !0), this.xTi();
			}),
			(this.z9e = () => {
				var e = new ForgingMediumItemGrid_1.ForgingMediumItemGrid();
				return e.BindOnExtendToggleStateChanged(this.HIi), e;
			}),
			(this.HIi = (e) => {
				(e = e.Data),
					this.ITi.DeselectCurrentGridProxy(),
					(this.yTi = this.TTi.indexOf(e)),
					(this.LTi = e),
					this.ITi.IsGridDisplaying(this.yTi) &&
						(e.IsNew &&
							!this.MGt &&
							((e.IsNew = !1),
							ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
								LocalStorageDefine_1.ELocalStoragePlayerKey.ForgingLevelKey,
								e.ItemId,
							)),
						this.ITi.SelectGridProxy(this.yTi),
						this.ITi.RefreshGridProxy(this.yTi),
						this.DTi.RefreshTips(e),
						(this.MGt = !1));
			}),
			(this.RTi = () => {
				this.vGt.UpdateData(24, this.TGt());
			}),
			(this.HGt = () => {
				this.ITi.ReloadData(this.TTi);
			}),
			(this.Q8t = () => {
				UiManager_1.UiManager.OpenView(
					"ManufactureHelpRoleView",
					this.LTi.ItemId,
				);
			}),
			(this.kGt = (e) => {
				(this.TTi = e),
					(this.TTi = this.TTi.filter(
						(e) =>
							e.ExistStartTime <= 0 ||
							TimeUtil_1.TimeUtil.IsInTimeSpan(
								e.ExistStartTime,
								e.ExistEndTime,
							),
					)),
					this.HGt(),
					0 === this.TTi.length
						? (this.GetItem(8).SetUIActive(!0), this.DTi.SetActive(!1))
						: (this.GetItem(8).SetUIActive(!1),
							this.DTi.SetActive(!0),
							this.wTi(!0));
			}),
			(this.xTi = () => {
				this.vGt.UpdateData(24, this.TGt());
			});
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.GetForgingData,
			this.d5s,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OpenHelpRole,
				this.Q8t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ForgingSuccess,
				this.RTi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ForgingFail,
				this.RTi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBeginPlayForgingWorkingDisplay,
				this.UTi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			(this.GOe = TimerSystem_1.TimerSystem.Forever(this.wGt, 1e3));
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.GetForgingData,
			this.d5s,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OpenHelpRole,
				this.Q8t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ForgingSuccess,
				this.HGt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ForgingFail,
				this.HGt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBeginPlayForgingWorkingDisplay,
				this.UTi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			this.GOe &&
				TimerSystem_1.TimerSystem.Has(this.GOe) &&
				(TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
	}
	Dqt() {
		var e = ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTime();
		e
			? (this.GetItem(12).SetUIActive(!0),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "RefreshTime", e))
			: this.GetItem(12).SetUIActive(!1);
	}
	BGt() {
		return (
			ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTimeValue() <= 0
		);
	}
	GGt() {
		var e = this.TGt();
		if (e)
			for (const t of e)
				if (
					0 < t.ExistEndTime &&
					!TimeUtil_1.TimeUtil.IsInTimeSpan(t.ExistStartTime, t.ExistEndTime)
				)
					return !0;
		return !1;
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
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
			[12, UE.UIItem],
			[13, UE.UIText],
		];
	}
	async OnBeforeStartAsync() {
		(this.DTi = new ForgingIngredientsView_1.ForgingIngredientsView()),
			await this.DTi.CreateByActorAsync(this.GetItem(4).GetOwner()),
			this.DTi.SetActive(!0);
	}
	OnStart() {
		(this.wIi = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetHorizontalLayout(0),
			this.PGt,
		)),
			this.GetButton(5)
				.GetOwner()
				?.GetComponentByClass(UE.UIItem.StaticClass())
				?.SetUIActive(!1),
			this.wIi.RebuildLayoutByDataNew([0]),
			(this.pGt = new FilterEntrance_1.FilterEntrance(
				this.GetItem(3),
				this.kGt,
			)),
			(this.vGt = new SortEntrance_1.SortEntrance(this.GetItem(10), this.kGt)),
			this.pGt.SetActive(!1),
			(this.ITi = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(2),
				this.GetLoopScrollViewComponent(2).TemplateGrid,
				this.z9e,
			)),
			ForgingController_1.ForgingController.RegisterCurrentInteractionEntity(),
			CommonManager_1.CommonManager.SetCurrentSystem(2),
			(ModelManager_1.ModelManager.ForgingModel.CurrentForgingViewType = 0);
		for (const e of this.wIi.GetLayoutItemMap().values()) e.OnSelectedItem();
		(this.m5s = new CustomPromise_1.CustomPromise()),
			(ModelManager_1.ModelManager.ForgingModel.CurrentInteractCreatureDataLongId =
				ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
				this.jwe,
			);
	}
	async OnBeforeShowAsyncImplement() {
		UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence() &&
			this.m5s &&
			(await this.m5s.Promise);
	}
	OnBeforeShow() {
		this.d5s(), this.ChildPopView?.PopItem.SetMaskResponsibleState(!1);
	}
	OnAfterShow() {
		this.YGt();
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
			this.jwe,
		),
			this.pGt.Destroy(),
			this.vGt.Destroy(),
			this.wIi.ClearChildren(),
			this.DTi.Destroy(),
			ForgingController_1.ForgingController.PlayLeaveForgingAudio(),
			ForgingController_1.ForgingController.ClearCurrentInteractionEntityDisplay(),
			(this.m5s = void 0);
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
	wTi(e = !1) {
		this.ITi.DeselectCurrentGridProxy(),
			e && this.ITi.ScrollToGridIndex(this.yTi),
			this.ITi.SelectGridProxy(this.yTi),
			(e = this.TTi[this.yTi]),
			this.DTi.RefreshTips(e);
	}
	TGt(e = !0) {
		let t = ModelManager_1.ModelManager.ForgingModel.GetForgingDataList();
		return t && e ? t.filter((e) => 0 < e.IsUnlock || 0 < e.FormulaItemId) : t;
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		var t;
		if (this.ITi?.DataInited)
			return (
				(t = Number(e[0])),
				(t = this.ITi.GetGridByDisplayIndex(t))
					? [t, t]
					: void (
							Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Guide",
								54,
								"印造界面聚焦引导的额外参数配置错误",
								["configParams", e],
							)
						)
			);
	}
}
exports.ForgingRootView = ForgingRootView;
class MainTypeItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.OnClickedCallback = void 0),
			(this.OnItemButtonClicked = (e) => {
				1 === e && this.SelectedItem();
			}),
			this.CreateThenShowByActor(e.GetOwner()),
			(this.zGt = t);
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
	Update() {
		var e =
			ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"SP_Forging",
			);
		this.SetSpriteByPath(e, this.GetSprite(0), !1);
	}
	SelectedItem() {
		this.OnClickedCallback && this.OnClickedCallback(this.zGt);
	}
	OnSelectedItem() {
		this.GetExtendToggle(1).SetToggleState(1, !1);
	}
	OnDeselectedItem() {
		this.GetExtendToggle(1).SetToggleState(0, !1);
	}
}
