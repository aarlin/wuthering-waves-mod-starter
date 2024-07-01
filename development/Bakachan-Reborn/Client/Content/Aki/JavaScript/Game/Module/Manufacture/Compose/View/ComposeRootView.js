"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComposeRootView = void 0);
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
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
	SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
	UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
	CommonManager_1 = require("../../Common/CommonManager"),
	StarLevelComponent_1 = require("../../Common/StarLevelComponent"),
	ComposeController_1 = require("../ComposeController"),
	ComposeMediumItemGrid_1 = require("../Item/ComposeMediumItemGrid"),
	MainTypeItem_1 = require("../Item/MainTypeItem"),
	ComposeIngredientsView_1 = require("./ComposeIngredientsView"),
	TIMERGAP = 1e3;
class ComposeRootView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.UIi = 0),
			(this.AIi = 0),
			(this.PIi = 0),
			(this.xIi = void 0),
			(this.wIi = void 0),
			(this.BIi = void 0),
			(this.pGt = void 0),
			(this.vGt = void 0),
			(this.aIi = []),
			(this.hIi = []),
			(this.lIi = []),
			(this.SGt = void 0),
			(this.bIi = !1),
			(this.c4s = !1),
			(this.m5s = void 0),
			(this.qIi = () => {
				this.yGt(),
					this.vGt.UpdateData(20, this.TGt()),
					this.pGt.SetActive(!0),
					this.pGt.UpdateData(20, this.TGt()),
					this.GIi(),
					this.Qqt(),
					this.LGt();
				var e = CommonManager_1.CommonManager.GetComposeMaxLevel(),
					t = CommonManager_1.CommonManager.GetCurrentRewardLevel();
				this.SGt.ShowLevel(t, e), this.Dqt();
			}),
			(this.GOe = void 0),
			(this.wGt = () => {
				this.Dqt(),
					this.xIi.OnSecondTimerRefresh(),
					this.BGt()
						? ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync().then(
								() => {
									this.NIi();
								},
							)
						: this.GGt() &&
							ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync().then(
								() => {
									(this.bIi = !1), this.OIi();
								},
							);
			}),
			(this.kIi = () => {
				this.ChildPopView?.PlaySequenceAsync(
					"Close",
					new CustomPromise_1.CustomPromise(),
					!0,
					!1,
				).then(() => {
					this.ChildPopView?.PopItem.SetActive(!1);
				}),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.HangPlotViewHud,
						!0,
					);
			}),
			(this.jwe = (e) => {
				"OnBlackScreen" === e &&
					(this.ChildPopView?.PlayLevelSequenceByName("Start"),
					this.m5s?.IsPending() && this.m5s.SetResult(),
					ComposeController_1.ComposeController.PlayCompositeEnterDisplay(
						this.VIi,
					),
					(this.c4s = !0));
			}),
			(this.VIi = () => {
				UiManager_1.UiManager.IsViewShow("ComposeRootView") &&
					ComposeController_1.ComposeController.PlayCompositeLoopDisplay();
			}),
			(this.$Ge = (e) => {
				"CompositeRewardView" === e &&
					(this.ChildPopView?.PopItem.SetActive(!0),
					this.ChildPopView?.PlayLevelSequenceByName("Start"),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.HangPlotViewHud,
						!1,
					),
					(e = ModelManager_1.ModelManager.ComposeModel.ComposeSuccessFlow),
					ComposeController_1.ComposeController.PlayCompositeFlow(e));
			}),
			(this.z9e = () => {
				var e = new ComposeMediumItemGrid_1.ComposeMediumItemGrid();
				return e.BindOnExtendToggleStateChanged(this.HIi), e;
			}),
			(this.HIi = (e) => {
				var t = e.Data;
				let i = 0;
				switch ((this.BIi.DeselectCurrentGridProxy(), t.MainType)) {
					case 1:
						(this.UIi = this.aIi.indexOf(t)), (i = this.UIi);
						break;
					case 2:
						(this.AIi = this.hIi.indexOf(t)), (i = this.AIi);
						break;
					case 3:
						(this.PIi = this.lIi.indexOf(t)), (i = this.PIi);
				}
				this.BIi.IsGridDisplaying(i) &&
					(t.IsNew &&
						(ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
							LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
							t.ItemId,
						),
						(t.IsNew = !1)),
					this.BIi.SelectGridProxy(i),
					this.BIi.RefreshGridProxy(i),
					this.xIi.RefreshTips(t));
			}),
			(this.PGt = () => {
				var e = new MainTypeItem_1.MainTypeItem();
				return e.SetMainTypeCallback(this.xGt), e;
			}),
			(this.xGt = (e) => {
				if (
					ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType !== e
				)
					switch (e) {
						case 1:
							(ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = 1),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.SwitchComposeType,
								),
								this.GIi(),
								this.OIi(),
								this.LGt();
							break;
						case 2:
							(ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = 2),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.SwitchComposeType,
								),
								this.GIi(),
								this.OIi(),
								this.LGt();
							break;
						case 3:
							(ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = 3),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.SwitchComposeType,
								),
								this.GIi(),
								this.OIi(),
								this.LGt();
					}
			}),
			(this.OIi = () => {
				switch (
					ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType
				) {
					case 1:
						this.pGt.UpdateData(20, this.TGt()),
							this.vGt.UpdateData(20, this.TGt());
						break;
					case 2:
						this.pGt.UpdateData(22, this.TGt()),
							this.vGt.UpdateData(22, this.TGt());
						break;
					case 3:
						this.vGt.UpdateData(23, this.TGt());
				}
			}),
			(this.kGt = (e) => {
				var t = e.filter(
					(e) =>
						e.ExistStartTime <= 0 ||
						TimeUtil_1.TimeUtil.IsInTimeSpan(e.ExistStartTime, e.ExistEndTime),
				);
				switch (
					ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType
				) {
					case 1:
						(this.UIi = this.bIi ? this.UIi : 0), (this.aIi = t);
						break;
					case 2:
						(this.AIi = this.bIi ? this.AIi : 0), (this.hIi = t);
						break;
					case 3:
						(this.PIi = this.bIi ? this.PIi : 0), (this.lIi = t);
				}
				this.BIi.DeselectCurrentGridProxy(),
					this.HGt(),
					0 === t.length
						? (this.GetItem(8).SetUIActive(!0), this.xIi.SetActive(!1))
						: (this.GetItem(8).SetUIActive(!1),
							this.xIi.SetActive(!0),
							this.jIi(!this.bIi));
			}),
			(this.NIi = () => {
				(this.bIi = !0), this.OIi(), (this.bIi = !1);
			}),
			(this.HGt = () => {
				switch (
					ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType
				) {
					case 1:
						this.BIi.RefreshByData(this.aIi);
						break;
					case 2:
						this.BIi.RefreshByData(this.hIi);
						break;
					case 3:
						this.BIi.RefreshByData(this.lIi);
				}
			}),
			(this.WIi = (e) => {
				(ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 2),
					UiManager_1.UiManager.OpenView("ComposeLevelView");
			}),
			(this.KIi = (e) => {
				(ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 1),
					UiManager_1.UiManager.OpenView("ManufactureHelpRoleView", e);
			}),
			(this.LGt = () => {
				switch (
					(this.ChildPopView?.PopItem.SetTitleVisible(!0),
					ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType)
				) {
					case 1:
						this.ChildPopView?.PopItem.SetTitleText(
							ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
								"ReagentProduction",
							) ?? "",
						);
						break;
					case 2:
						this.ChildPopView?.PopItem.SetTitleText(
							ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
								"Structure",
							) ?? "",
						);
						break;
					case 3:
						this.ChildPopView?.PopItem.SetTitleText(
							ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
								"Purification",
							) ?? "",
						);
				}
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
			(this.BtnBindInfo = [[5, this.WIi]]);
	}
	async OnBeforeStartAsync() {
		(this.xIi = new ComposeIngredientsView_1.ComposeIngredientsView()),
			(this.wIi = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(0),
				this.PGt,
			)),
			await Promise.all([
				this.wIi.RefreshByDataAsync([1, 2, 3]),
				this.xIi.CreateByActorAsync(this.GetItem(4).GetOwner()),
				ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync(),
			]),
			this.xIi.SetActive(!0);
	}
	OnStart() {
		(this.pGt = new FilterEntrance_1.FilterEntrance(this.GetItem(3), this.kGt)),
			this.pGt.SetActive(!1),
			(this.vGt = new SortEntrance_1.SortEntrance(this.GetItem(10), this.kGt)),
			this.vGt.SetSortToggleState(!0),
			(this.BIi = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(2),
				this.GetLoopScrollViewComponent(2).TemplateGrid,
				this.z9e,
			)),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(9),
				"ComposeLevelButtonText",
			),
			(this.SGt = new StarLevelComponent_1.StarLevelComponent(
				this.GetHorizontalLayout(11),
			)),
			CommonManager_1.CommonManager.SetCurrentSystem(1),
			ComposeController_1.ComposeController.RegisterCurrentInteractionEntity(),
			(this.m5s = new CustomPromise_1.CustomPromise()),
			(ModelManager_1.ModelManager.ComposeModel.CurrentInteractCreatureDataLongId =
				ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
				this.jwe,
			);
	}
	OnBeforeShow() {
		this.qIi(), this.ChildPopView?.PopItem.SetMaskResponsibleState(!1);
	}
	async OnBeforeShowAsyncImplement() {
		UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence() &&
			this.m5s &&
			(await this.m5s.Promise);
	}
	OnAfterShow() {
		this.YGt();
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
			this.jwe,
		),
			this.wIi.ClearChildren(),
			this.BIi.ClearGridProxies(),
			this.SGt.Clear(),
			ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
				LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
			),
			ComposeController_1.ComposeController.PlayLeaveCompositeAudio(),
			ComposeController_1.ComposeController.ClearCurrentInteractionEntityDisplay(),
			ModelManager_1.ModelManager.ComposeModel.ClearComposeRoleItemDataList(),
			RedDotController_1.RedDotController.UnBindRedDot(
				"ComposeReagentProduction",
			),
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
	yGt() {
		ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 0;
		var e = this.wIi.GetLayoutItemList();
		let t = !1;
		for (let o = 0; o < e.length; o++) {
			var i = e[o];
			0 < this.JGt(i.GetMainType()).length || o === e.length - 1
				? (i.SetUiActive(!0),
					t ||
						(this.wIi.SelectGridProxy(i.GridIndex),
						(ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType =
							i.GetMainType()),
						(t = !0)))
				: i.SetUiActive(!1);
		}
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.GetComposeData,
			this.qIi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OpenHelpRole,
				this.KIi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ComposeSuccess,
				this.NIi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ComposeFail,
				this.NIi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBeginPlayCompositeWorkingDisplay,
				this.kIi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			(this.GOe = TimerSystem_1.TimerSystem.Forever(this.wGt, 1e3));
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.GetComposeData,
			this.qIi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ComposeSuccess,
				this.NIi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ComposeFail,
				this.NIi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OpenHelpRole,
				this.KIi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBeginPlayCompositeWorkingDisplay,
				this.kIi,
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
		var e = ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTime();
		e
			? (this.GetItem(12).SetUIActive(!0),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "RefreshTime", e))
			: this.GetItem(12).SetUIActive(!1);
	}
	BGt() {
		return (
			ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTimeValue() <= 0
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
	jIi(e = !1) {
		let t = 0;
		switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
			case 1:
				(t = this.UIi), this.xIi.RefreshTips(this.aIi[t]);
				break;
			case 2:
				(t = this.AIi), this.xIi.RefreshTips(this.hIi[t]);
				break;
			case 3:
				(t = this.PIi), this.xIi.RefreshTips(this.lIi[t]);
		}
		this.BIi.DeselectCurrentGridProxy(),
			e && this.BIi.ScrollToGridIndex(t),
			this.BIi.SelectGridProxy(t);
	}
	GIi() {
		this.GetButton(5)
			.GetOwner()
			.GetUIItem()
			.SetUIActive(
				1 === ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType,
			),
			this.QIi();
	}
	QIi() {
		var e;
		1 === ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType &&
			((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"SP_ReagentProductionLevel",
			)),
			this.SetSpriteByPath(e, this.GetSprite(6), !1));
	}
	JGt(e) {
		let t;
		switch (e) {
			case 1:
				t =
					ModelManager_1.ModelManager.ComposeModel.GetReagentProductionDataList();
				break;
			case 2:
				t = ModelManager_1.ModelManager.ComposeModel.GetStructureDataList();
				break;
			case 3:
				t = ModelManager_1.ModelManager.ComposeModel.GetPurificationDataList();
				break;
			default:
				return;
		}
		return t;
	}
	TGt() {
		return this.JGt(
			ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType,
		);
	}
	Qqt() {
		RedDotController_1.RedDotController.BindRedDot(
			"ComposeReagentProduction",
			this.GetItem(7),
		);
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		var t;
		if (this.BIi?.DataInited)
			return (
				(t = Number(e[0])),
				(t = this.BIi.GetGridByDisplayIndex(t))
					? [t, t]
					: void (
							Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Guide",
								54,
								"合成界面聚焦引导的额外参数配置错误",
								["configParams", e],
							)
						)
			);
	}
}
exports.ComposeRootView = ComposeRootView;
