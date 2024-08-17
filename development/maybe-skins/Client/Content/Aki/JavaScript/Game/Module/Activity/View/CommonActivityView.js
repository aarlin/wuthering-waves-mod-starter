"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonActivityView = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../RedDot/RedDotController"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	HelpController_1 = require("../../Help/HelpController"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	ActivityCommonDefine_1 = require("../ActivityCommonDefine"),
	ActivityManager_1 = require("../ActivityManager"),
	ActivityModel_1 = require("../ActivityModel"),
	ActivityPageSelectContent_1 = require("./SubView/ActivityPageSelectContent"),
	ActivitySwitchToggle_1 = require("./SubView/ActivitySwitchToggle");
class CommonActivityView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.N3e = !0),
			(this.lqe = void 0),
			(this.O3e = 0),
			(this.k3e = void 0),
			(this.F3e = void 0),
			(this.V3e = void 0),
			(this.H3e = void 0),
			(this.j3e = void 0),
			(this.W3e = new Map()),
			(this.K3e = []),
			(this.Q3e = !0),
			(this.LLn = []),
			(this.X3e = () => {
				this.$3e(!0);
			}),
			(this.XOe = () => {
				HelpController_1.HelpController.OpenHelpById(this.O3e);
			}),
			(this.$Oe = () => {
				this.CloseMe();
			}),
			(this.Y3e = (e, t) => {
				t && this.J3e(e);
			}),
			(this.z3e = (e, t) => this.H3e !== e),
			(this.Z3e = () =>
				new ActivityPageSelectContent_1.ActivityPageSelectContent()),
			(this.YIn = (e) => {
				e.length <= 0 ||
					(this.lqe.SetCurrencyItemVisible(!0),
					this.lqe.SetCurrencyItemList(e).catch(() => {}));
			}),
			(this.e4e = () => {
				this.t4e();
			}),
			(this.i4e = () => {
				this.o4e();
			}),
			(this.r4e = (e) => {
				ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity()
					?.Id === e && this.j3e?.RefreshView();
			}),
			(this.OnActivityUpdate = () => {
				var e = () => {
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ResetToBattleView,
						);
					},
					t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115);
				t.FunctionMap.set(1, e),
					t.FunctionMap.set(0, e),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						t,
					);
			}),
			(this.n4e = (e) => {
				this.j3e?.PlaySubViewSequence(e);
			}),
			(this.$3e = (e, t = 0, i) => {
				(this.LLn = ActivityCommonDefine_1.activityViewStateSequence[t]),
					e !== this.N3e &&
						((this.N3e = e),
						this.UiViewSequence.PlaySequence(e ? this.LLn[0] : this.LLn[1], i),
						this.j3e?.OnCommonViewStateChange(e)),
					this.RefreshTabIcon();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIScrollViewWithScrollbarComponent],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UITexture],
			[7, UE.UITexture],
			[8, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[8, this.X3e]]);
	}
	OnAddEventListener() {
		this.s4e(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSelectActivity,
				this.e4e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ActivityViewChange,
				this.i4e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ActivityViewRefreshCurrent,
				this.r4e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnActivityClose,
				this.OnActivityUpdate,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnActivityOpen,
				this.OnActivityUpdate,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlaySequenceEventByStringParam,
				this.n4e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SetActivityViewState,
				this.$3e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SetActivityViewCurrency,
				this.YIn,
			);
	}
	OnRemoveEventListener() {
		this.a4e(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSelectActivity,
				this.e4e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ActivityViewChange,
				this.i4e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ActivityViewRefreshCurrent,
				this.r4e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnActivityClose,
				this.OnActivityUpdate,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnActivityOpen,
				this.OnActivityUpdate,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlaySequenceEventByStringParam,
				this.n4e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SetActivityViewState,
				this.$3e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SetActivityViewCurrency,
				this.YIn,
			);
	}
	async OnBeforeStartAsync() {
		this.h4e(), await this.l4e();
	}
	h4e() {
		var e = this.GetScrollViewWithScrollbar(1);
		this.k3e = new GenericScrollViewNew_1.GenericScrollViewNew(e, this.Z3e);
	}
	async l4e() {
		(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.lqe.SetHelpCallBack(this.XOe),
			this.lqe.SetCloseCallBack(this.$Oe),
			(this.F3e = new ActivitySwitchToggle_1.ActivitySwitchToggle(0)),
			await this.F3e.CreateByActorAsync(this.GetItem(3).GetOwner()),
			this.F3e.BindOnToggleFunction(this.Y3e),
			this.F3e.BindOnCanToggleExecuteChange(this.z3e),
			(this.V3e = new ActivitySwitchToggle_1.ActivitySwitchToggle(1)),
			await this.V3e.CreateByActorAsync(this.GetItem(4).GetOwner()),
			this.V3e.BindOnToggleFunction(this.Y3e),
			this.V3e.BindOnCanToggleExecuteChange(this.z3e);
	}
	OnStart() {
		var e = this.OpenParam ?? 4;
		ModelManager_1.ModelManager.ActivityModel.SendActivityViewOpenLogData(e),
			(this.LLn = ActivityCommonDefine_1.activityViewStateSequence[0]),
			this.lqe.SetTitleLocalText("Activity_Title"),
			this.F3e.SetUiActive(!0),
			this.V3e.SetUiActive(!1);
	}
	OnBeforeShow() {
		this.Q3e && (this.F3e.SetToggleState(!0, !0), (this.Q3e = !1));
		for (const e of this.K3e)
			if (!e.CheckIfInShowTime())
				return void ControllerHolder_1.ControllerHolder.ActivityController.RequestActivityData().finally(
					() => {
						this.OnActivityUpdate();
					},
				);
		this.j3e?.RefreshView();
	}
	async OnBeforeHideAsync() {
		await this.j3e?.BeforeHideSelfAsync();
	}
	OnBeforeDestroy() {
		this.W3e.forEach((e, t) => {
			this.AddChild(e);
		}),
			this.W3e.clear();
	}
	J3e(e) {
		(0 === (this.H3e = e) ? this.V3e : this.F3e).SetToggleState(!1, !1),
			this.o4e(e);
	}
	_4e(e) {
		(e = this.k3e.GetScrollItemByIndex(e)) &&
			(this.k3e.ScrollTo(e.GetRootItem()), e.SetToggleState(!0, !0));
	}
	s4e() {
		RedDotController_1.RedDotController.BindRedDot(
			"ActivityEntrance",
			this.F3e.GetToggleRedDot(),
		);
	}
	a4e() {
		RedDotController_1.RedDotController.UnBindGivenUi(
			"ActivityEntrance",
			this.F3e.GetToggleRedDot(),
		);
	}
	o4e(e = 0) {
		const t =
			ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities();
		t.sort(ActivityModel_1.ActivityModel.SortFunc),
			(this.K3e = t),
			this.k3e.RefreshByData(t, () => {
				var e =
					ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivityId();
				let i = 0;
				for (let n = 0; n < t.length; n++)
					if (e === t[n].Id) {
						i = n;
						break;
					}
				ModelManager_1.ModelManager.ActivityModel.SetCurrentSelectActivityId(0),
					this._4e(i);
			});
	}
	t4e() {
		var e =
			ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity();
		this.u4e(e), this.c4e(e);
	}
	u4e(e) {
		var t = e.GetTitle();
		(this.O3e = e.GetHelpId()),
			this.lqe.SetHelpBtnActive(0 !== this.O3e),
			this.lqe.SetTitle(t.replace(/<.*?>/g, "")),
			this.RefreshTabIcon();
	}
	async WNe(e) {
		const t = new CustomPromise_1.CustomPromise();
		var i = this.GetTexture(7);
		e = e.LocalConfig.BgResource;
		this.SetTextureByPath(e, i, void 0, () => {
			t.SetResult();
		}),
			await t.Promise;
	}
	async c4e(e) {
		let t = this.W3e.get(e);
		if (!t) {
			var i = ActivityManager_1.ActivityManager.GetActivityController(e.Type),
				n = this.GetItem(5),
				o = i.GetActivityResource(e);
			if (!(t = i.CreateSubPageComponent(e))) return;
			t.SetData(e), await t.CreateByPathAsync(o, n), this.W3e.set(e, t);
		}
		ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivityId() ===
			e.Id &&
			(await this.WNe(e),
			this.j3e?.SetActive(!1),
			this.lqe.SetCurrencyItemVisible(!1),
			(this.j3e = t),
			await this.j3e.BeforeShowSelfAsync(),
			this.j3e.SetActive(!0),
			this.j3e.RefreshView(),
			this.UiViewSequence.HasSequenceNameInPlaying("Switch")
				? this.UiViewSequence.ReplaySequence("Switch")
				: this.UiViewSequence.PlaySequence("Switch"));
	}
	RefreshTabIcon() {
		var e =
			ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity()
				.LocalConfig;
		(e = this.N3e ? e.TabResource : e.TabResource2) && this.lqe.SetTitleIcon(e);
	}
}
exports.CommonActivityView = CommonActivityView;
