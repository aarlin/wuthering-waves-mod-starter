"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRunView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
	PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
	ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
	HelpController_1 = require("../../../Help/HelpController"),
	TimeOfDayDefine_1 = require("../../../TimeOfDay/TimeOfDayDefine"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
	WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
	ActivityRunController_1 = require("./ActivityRunController"),
	ActivityRunCycleItem_1 = require("./ActivityRunCycleItem"),
	ActivityRunItem_1 = require("./ActivityRunItem"),
	TIMERGAP = 1e3;
class ActivityRunView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.GOe = void 0),
			(this.Y2e = void 0),
			(this.J2e = void 0),
			(this.z2e = void 0),
			(this.Z2e = void 0),
			(this.lqe = void 0),
			(this.eFe = (e) => {
				var t =
					ModelManager_1.ModelManager.ActivityModel?.GetCurrentSelectActivity();
				e.has(t.Id) &&
					((e = () => {
						this.CloseMe();
					}),
					(t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115)).FunctionMap.set(
						1,
						e,
					),
					t.FunctionMap.set(0, e),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						t,
					));
			}),
			(this.VOe = () => new ActivityRunItem_1.ActivityRunItem()),
			(this.tFe = () => new ActivityRunCycleItem_1.ActivityRunCycleItem()),
			(this.iFe = () => {
				this.oFe(), this.rFe(), this.nFe(), this.sFe(), this.aFe(), this.hFe();
			}),
			(this.lFe = (e) => {
				this.Z2e.ScrollToGridIndex(e.GridIndex, !0);
			}),
			(this.V2e = (e) => {
				this.Z2e?.RefreshAllGridProxies();
			}),
			(this._Fe = () => {
				var e;
				ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
					ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
				).GetIsShow() &&
					((e = {
						MarkId:
							ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunMarkId(
								ModelManager_1.ModelManager.ActivityRunModel
									.CurrentSelectChallengeId,
							),
						MarkType: 13,
						OpenAreaId: 0,
					}),
					WorldMapController_1.WorldMapController.OpenView(2, !1, e));
			}),
			(this.Awe = () => {
				this.CloseMe();
			}),
			(this.uFe = () => {
				this.OpenHelpView();
			}),
			(this.cFe = !1),
			(this.kOe = () => {
				this.aFe();
				var e,
					t = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
						ModelManager_1.ModelManager.ActivityRunModel
							.CurrentSelectChallengeId,
					);
				t &&
					((t = t.GetIsShow()) &&
						this.cFe !== t &&
						((e = this.Z2e.GetSelectedGridIndex()),
						this.Z2e.RefreshGridProxy(e),
						this.oFe(),
						this.nFe(),
						this.rFe(),
						this.sFe()),
					(this.cFe = t));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIButtonComponent],
			[7, UE.UIVerticalLayout],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIText],
			[11, UE.UIButtonComponent],
			[12, UE.UIButtonComponent],
			[13, UE.UIItem],
			[14, UE.UIItem],
			[15, UE.UIText],
			[16, UE.UIText],
			[17, UE.UIText],
		]),
			(this.BtnBindInfo = [[6, this._Fe]]);
	}
	mFe() {
		(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.lqe.SetCloseCallBack(this.Awe),
			this.lqe.SetHelpCallBack(this.uFe),
			this.lqe.SetTitle(this.J2e.GetTitle());
	}
	OnStart() {
		(this.J2e =
			ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity()),
			(this.Y2e = this.J2e.GetChallengeDataArray()),
			this.mFe();
		var e = this.GetVerticalLayout(7);
		(this.z2e = new GenericLayout_1.GenericLayout(e, this.VOe)),
			(e = this.GetItem(1)
				.GetOwner()
				.GetComponentByClass(UE.UILoopScrollViewComponent.StaticClass())),
			(this.Z2e = new LoopScrollView_1.LoopScrollView(
				e,
				this.GetItem(2).GetOwner(),
				this.tFe,
			)),
			this.GetItem(2).SetUIActive(!1),
			this.GetButton(11).RootUIComp.SetUIActive(!1),
			this.GetButton(12).RootUIComp.SetUIActive(!1);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnSelectActivityRunChallengeItem,
			this.iFe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnClickActivityRunChallenge,
				this.lFe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnGetRunActivityReward,
				this.V2e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnActivityClose,
				this.eFe,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSelectActivityRunChallengeItem,
			this.iFe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnClickActivityRunChallenge,
				this.lFe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnGetRunActivityReward,
				this.V2e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnActivityClose,
				this.eFe,
			);
	}
	sFe() {
		var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
			ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
		).GetIsShow();
		this.GetItem(3)?.SetUIActive(e), this.GetItem(9).SetUIActive(!e);
	}
	rFe() {
		var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
			ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
		);
		e && this.GetButton(6).RootUIComp.SetUIActive(e.GetIsShow());
	}
	hFe() {
		this.UiViewSequence.HasSequenceNameInPlaying("Switch")
			? this.UiViewSequence.ReplaySequence("Switch")
			: this.UiViewSequence.PlaySequence("Switch");
	}
	OpenHelpView() {
		var e = this.J2e.GetHelpId();
		HelpController_1.HelpController.OpenHelpById(e);
	}
	OnBeforeShow() {
		ActivityRunController_1.ActivityRunController.SelectDefaultChallengeId(
			ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity(),
		),
			this.dFe(),
			this.CFe();
	}
	CFe() {
		this.GOe = TimerSystem_1.TimerSystem.Forever(this.kOe, 1e3);
	}
	aFe() {
		var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
			ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
		);
		e.GetIsShow() ||
			((e = this.gFe(e.BeginOpenTime, "ActiveToOpenTime")),
			this.GetText(10).SetText(e));
	}
	gFe(e, t) {
		var i = TimeUtil_1.TimeUtil.GetServerTime();
		let n = Number(e) - i,
			o = (n <= 10 && (n = 10), TimeUtil_1.TimeUtil.GetCountDownData(n));
		n >= TimeOfDayDefine_1.TOD_SECOND_PER_DAY &&
			(o = TimeUtil_1.TimeUtil.GetCountDownData(n, 3, 2)),
			(e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(t));
		let r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
		return r.replace("{0}", o.CountDownText);
	}
	dFe() {
		var e = this.Y2e.length,
			t = new Array();
		for (let i = 0; i < e; i++) t.push(this.Y2e[i].Id);
		this.Z2e.RefreshByDataAsync(t).then(() => {
			this.Z2e.SelectGridProxy(
				ModelManager_1.ModelManager.ActivityRunModel.GetStartViewSelectIndex(),
				!0,
			);
		});
	}
	oFe() {
		var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
			ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
		);
		e && ((e = e.GetScoreArray()), this.z2e.RefreshByData(e));
	}
	nFe() {
		var e,
			t = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
				ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId,
			);
		t &&
			(LguiUtil_1.LguiUtil.SetLocalText(this.GetText(15), "ActiveRunMaxPoint"),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(16), "ActiveRunMinTime"),
			0 === t.GetMiniTime()
				? ((e =
						ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
							"ActivityRunNoPoint",
						)),
					(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
					this.GetText(4)?.SetText(e),
					this.GetText(5)?.SetText(e))
				: (LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(15),
						"ActiveRunMaxPoint",
					),
					this.GetText(4)?.SetText(t.GetMaxScore().toString()),
					(e = TimeUtil_1.TimeUtil.GetTimeString(t.GetMiniTime())),
					this.GetText(5)?.SetText(e.toString())),
			this.GetText(17).ShowTextNew("ReadyToFightText"));
	}
	OnBeforeDestroy() {
		void 0 !== this.GOe &&
			(TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0)),
			RedDotController_1.RedDotController.UnBindRedDot("ActivityRun");
	}
}
exports.ActivityRunView = ActivityRunView;
