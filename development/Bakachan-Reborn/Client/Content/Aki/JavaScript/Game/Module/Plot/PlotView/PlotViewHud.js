"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotViewHud = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	PlotTextLogic_1 = require("./PlotTextLogic");
class PlotViewHud extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.vZi = void 0),
			(this.xNi = void 0),
			(this.yeo = !1),
			(this.pzi = () => {
				this.ZZi();
			}),
			(this.teo = () => {
				this.WZi(),
					ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SubmitSubtitle(
						this.vZi.CurrentContent,
					);
			}),
			(this.Ieo = (e) => {
				this.yeo || this.vZi.UpdatePlotSubtitle(e);
			}),
			(this.$Zi = (e, t) => {
				this.vZi.HandlePortraitVisible(this.RootItem, e, t);
			}),
			(this.heo = () => {
				this.vZi.ClearPlotContent(), this.WZi();
			}),
			(this.Teo = (e = !1, t = !0) => {
				this.yeo === e ||
					(!e && this.IsHideOrHiding) ||
					((this.yeo = e)
						? (t && this.SetUiActive(!1),
							this.kPn(),
							ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(
								!0,
							))
						: (t && this.SetUiActive(!0),
							this.Oqn(),
							ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(
								!1,
							)));
			}),
			(this.Leo = (e) => {
				(this.OpenParam = e), this.Deo(), this.Reo(), this.Ueo();
			});
	}
	SimulateClickSubtitle() {}
	SimulateClickOption() {}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIScrollViewComponent],
		];
	}
	OnStart() {
		var e = this.GetScrollView(8);
		e?.SetCanScroll(!1),
			e?.SetRayCastTargetForScrollView(!1),
			(this.vZi = new PlotTextLogic_1.PlotTextCommonLogic(
				this.GetItem(4),
				this.GetText(0),
				this.GetText(1),
				this.GetText(2),
				this.GetItem(3),
				e,
			)),
			this.vZi.SetPlotContentAnimFinishCallback(this.pzi),
			this.Ueo(),
			this.Reo(),
			(this.yeo = !1);
	}
	ZZi() {
		this.WZi();
		var e =
			ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.EndWaitTimeLevelD *
			CommonDefine_1.MILLIONSECOND_PER_SECOND;
		this.xNi = TimerSystem_1.TimerSystem.Delay(
			this.teo,
			this.vZi.PlayDelayTime <= e ? e : this.vZi.PlayDelayTime,
		);
	}
	WZi() {
		TimerSystem_1.TimerSystem.Has(this.xNi) &&
			TimerSystem_1.TimerSystem.Remove(this.xNi),
			(this.xNi = void 0);
	}
	async OnPlayingCloseSequenceAsync() {
		await this.vZi.DestroyPortraitItem();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UpdatePlotSubtitle,
			this.Ieo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UpdatePortraitVisible,
				this.$Zi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ClearPlotSubtitle,
				this.heo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.HangPlotViewHud,
				this.Teo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UpdatePlotUiParam,
				this.Leo,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UpdatePlotSubtitle,
			this.Ieo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UpdatePortraitVisible,
				this.$Zi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ClearPlotSubtitle,
				this.heo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.HangPlotViewHud,
				this.Teo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UpdatePlotUiParam,
				this.Leo,
			);
	}
	OnAfterPlayStartSequence() {
		this.Deo();
	}
	OnAfterShow() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.PlotViewChange,
			this.Info.Name,
			!0,
		),
			this.Teo(ModelManager_1.ModelManager.PlotModel?.HangViewHud, !1);
	}
	OnBeforeHide() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.PlotViewChange,
			this.Info.Name,
			!1,
		),
			this.Teo(!0, !1);
	}
	OnBeforeDestroy() {
		this.vZi.Clear(),
			ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(!1);
	}
	Ueo() {
		var e,
			t = this.OpenParam;
		t &&
			t.Position &&
			t.ViewName &&
			"BattleView" !== t.ViewName &&
			((e = this.GetItem(4)),
			3 === t.Position
				? e.SetUIParent(this.GetItem(6))
				: 2 === t.Position
					? e.SetUIParent(this.GetItem(7))
					: e.SetUIParent(this.GetItem(5)),
			e.SetAnchorOffsetX(0));
	}
	Reo() {
		var e;
		ModelManager_1.ModelManager.PlatformModel?.IsMobile() ||
			((e = this.OpenParam) &&
				e.TextWidth &&
				this.GetText(2)?.SetWidth(e.TextWidth));
	}
	Deo() {
		var e,
			t = this.OpenParam;
		t?.ViewName &&
			((e = UiManager_1.UiManager.GetViewByName(t.ViewName))
				? (e.AddChild(this),
					e.IsHideOrHiding &&
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Plot",
								27,
								"[PlotViewHud] 父界面已经隐藏，attach时子界面主动隐藏",
							),
						this.Hide()))
				: (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Plot",
							27,
							"[PlotViewHud] 父界面已经不在，子界面直接关闭",
							["parent", t.ViewName],
						),
					this.CloseMe()));
	}
	kPn() {
		ModelManager_1.ModelManager.PlotModel.CurTalkItem &&
			(this.vZi.PauseSubtitle(), this.xNi) &&
			this.xNi.Pause();
	}
	Oqn() {
		ModelManager_1.ModelManager.PlotModel.CurTalkItem &&
			(this.vZi.ResumeSubtitle(
				ModelManager_1.ModelManager.PlotModel.CurTalkItem,
			),
			this.xNi) &&
			this.xNi.Resume();
	}
}
exports.PlotViewHud = PlotViewHud;
