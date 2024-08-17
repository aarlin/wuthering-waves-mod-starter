"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LongShanView = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	LongShanStageById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageById"),
	LongShanTaskById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanTaskById"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
	PageDot_1 = require("../../../Common/PageDot"),
	ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
	HelpController_1 = require("../../../Help/HelpController"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
	ActivityLongShanController_1 = require("./ActivityLongShanController"),
	LongShanTaskItem_1 = require("./LongShanTaskItem");
class LongShanView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.GOe = void 0),
			(this.NOe = 0),
			(this.lqe = void 0),
			(this.tPe = void 0),
			(this.OOe = void 0),
			(this.kOe = () => {
				var e,
					t =
						ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
				t.CheckIfInOpenTime
					? ((e = TimeUtil_1.TimeUtil.GetServerTime()),
						(t = Math.max(t.EndOpenTime - e, 1)),
						(e = this.FOe(t)),
						(t =
							TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, e[0], e[1])
								.CountDownText ?? ""),
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(8),
							"ActivityRemainingTime",
							t,
						))
					: this.CloseMe();
			}),
			(this.VOe = () => new LongShanTaskItem_1.LongShanTaskItem()),
			(this.HOe = () => new PageDot_1.PageDot()),
			(this.jOe = (e, t) => {
				var i, n;
				return e.H0s !== t.H0s
					? e.H0s
						? 1
						: -1
					: e.$0s !== t.$0s
						? e.$0s
							? -1
							: 1
						: (i = LongShanTaskById_1.configLongShanTaskById.GetConfig(
									e.Ekn,
								).SortId) !==
								(n = LongShanTaskById_1.configLongShanTaskById.GetConfig(
									t.Ekn,
								).SortId)
							? i - n
							: e.Ekn - t.Ekn;
			}),
			(this.WOe = () => {
				var e =
						ActivityLongShanController_1.ActivityLongShanController.GetActivityData(),
					t = e.StageIds[this.NOe],
					i = e.GetProgress(t);
				(i =
					(LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(2),
						"LongShanStage_ProgressPercentage",
						i,
					),
					e.GetStageInfoById(t).V0s)).sort(this.jOe),
					this.OOe?.RefreshByData(i, void 0, !0);
			}),
			(this.KOe = () => {
				this.RefreshView(this.NOe - 1);
			}),
			(this.QOe = () => {
				var e =
						ActivityLongShanController_1.ActivityLongShanController.GetActivityData(),
					t = e.StageIds[this.NOe + 1];
				e.GetStageInfoById(t)
					? this.RefreshView(this.NOe + 1)
					: ActivityLongShanController_1.ActivityLongShanController.ShowUnlockTip(
							t,
						);
			}),
			(this.XOe = () => {
				var e =
					ActivityLongShanController_1.ActivityLongShanController.GetActivityData().GetHelpId();
				HelpController_1.HelpController.OpenHelpById(e);
			}),
			(this.$Oe = () => {
				this.CloseMe();
			}),
			(this.eFe = (e) => {
				var t =
					ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
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
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIScrollViewWithScrollbarComponent],
			[5, UE.UIButtonComponent],
			[6, UE.UIButtonComponent],
			[7, UE.UIHorizontalLayout],
			[8, UE.UIText],
			[9, UE.UITexture],
		]),
			(this.BtnBindInfo = [
				[5, this.KOe],
				[6, this.QOe],
			]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.LongShanUpdate,
			this.WOe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnActivityClose,
				this.eFe,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.LongShanUpdate,
			this.WOe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnActivityClose,
				this.eFe,
			);
	}
	async OnBeforeStartAsync() {
		(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.lqe.SetHelpCallBack(this.XOe),
			this.lqe.SetCloseCallBack(this.$Oe);
		var e =
			ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
		this.lqe.SetTitle(e.GetTitle()), (e = e.StageIds);
		(this.NOe = e.indexOf(this.OpenParam)),
			(this.tPe = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(7),
				this.HOe,
			)),
			await this.tPe.RefreshByDataAsync(e),
			(this.OOe = new GenericScrollViewNew_1.GenericScrollViewNew(
				this.GetScrollViewWithScrollbar(4),
				this.VOe,
			));
	}
	OnBeforeShow() {
		(this.GOe = TimerSystem_1.TimerSystem.Forever(
			this.kOe,
			TimeUtil_1.TimeUtil.InverseMillisecond,
		)),
			this.RefreshView(this.NOe),
			this.kOe();
	}
	OnBeforeHide() {
		TimerSystem_1.TimerSystem.Has(this.GOe) &&
			(TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
	}
	FOe(e) {
		return e > CommonDefine_1.SECOND_PER_DAY
			? [3, 2]
			: e > CommonDefine_1.SECOND_PER_HOUR
				? [2, 1]
				: e > CommonDefine_1.SECOND_PER_MINUTE
					? [1, 0]
					: [0, 0];
	}
	RefreshView(e) {
		this.tPe.GetLayoutItemByIndex(this.NOe).UpdateShow(!1),
			(this.NOe = e),
			this.tPe.GetLayoutItemByIndex(this.NOe).UpdateShow(!0);
		var t = (e =
			ActivityLongShanController_1.ActivityLongShanController.GetActivityData())
			.StageIds[this.NOe];
		t = LongShanStageById_1.configLongShanStageById.GetConfig(t);
		this.SetTextureByPath(t.Picture, this.GetTexture(9)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.TitleDetail),
			this.WOe(),
			this.GetButton(5).RootUIComp.SetUIActive(0 < this.NOe),
			this.GetButton(6).RootUIComp.SetUIActive(
				this.NOe < e.StageIds.length - 1,
			);
	}
}
exports.LongShanView = LongShanView;
