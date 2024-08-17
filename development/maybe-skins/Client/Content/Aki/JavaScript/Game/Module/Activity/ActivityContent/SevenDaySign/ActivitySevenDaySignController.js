"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySevenDaySignController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivitySevenDaySignView_1 = require("../../View/SubView/ActivitySevenDaySignView"),
	ActivitySevenDaySignData_1 = require("./ActivitySevenDaySignData"),
	ActivitySubViewSevenDayVersionSign_1 = require("./ActivitySubViewSevenDayVersionSign");
class ActivitySevenDaySignController extends ActivityControllerBase_1.ActivityControllerBase {
	constructor() {
		super(...arguments),
			(this.fFe = (e) => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Activity",
						38,
						"[ActivitySevenDaySign][OnNotify]收到签到状态通知",
						["ActivityId", e.YFn],
						["SignIndex", e.Akn],
						["SignState", e.D0s],
					),
					ModelManager_1.ModelManager.ActivityModel.GetActivityById(
						e.YFn,
					)?.UpdateActivityData(e),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ActivityViewRefreshCurrent,
						e.YFn,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshCommonActivityRedDot,
						e.YFn,
					);
			});
	}
	OnRegisterNetEvent() {
		Net_1.Net.Register(29053, this.fFe);
	}
	OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(29053);
	}
	OnOpenView(e) {}
	OnGetActivityResource(e) {
		var t =
			ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig.GetActivitySignById(
				e.Id,
			);
		if (!t)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Activity", 38, "签到活动未查到对应配置", [
						"Id",
						e.Id,
					]),
				""
			);
		switch (t.Type) {
			case 1:
				return "UiView_signinMain";
			case 2:
				return "UiItem_VersionSignIn";
			default:
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Activity", 38, "签到活动类型配置错误", [
							"Type",
							t.Type,
						]),
					"UiItem_VersionSignIn"
				);
		}
	}
	OnCreateSubPageComponent(e) {
		var t =
			ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig.GetActivitySignById(
				e.Id,
			);
		if (!t)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Activity", 38, "签到活动未查到对应配置", [
						"Id",
						e.Id,
					]),
				new ActivitySevenDaySignView_1.ActivitySevenDaySignView()
			);
		switch (t.Type) {
			case 1:
				return new ActivitySevenDaySignView_1.ActivitySevenDaySignView();
			case 2:
				return new ActivitySubViewSevenDayVersionSign_1.ActivitySubViewSevenDayVersionSign();
			default:
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Activity", 38, "签到活动类型配置错误", [
							"Type",
							t.Type,
						]),
					new ActivitySevenDaySignView_1.ActivitySevenDaySignView()
				);
		}
	}
	OnCreateActivityData(e) {
		return new ActivitySevenDaySignData_1.ActivitySevenDaySignData();
	}
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	static GetRewardByDay(e, t) {
		var i = Protocol_1.Aki.Protocol.I$n.create();
		(i.YFn = e),
			(i.Akn = t),
			Net_1.Net.Call(29475, i, (i) => {
				i.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							i.lkn,
							18930,
						)
					: (ModelManager_1.ModelManager.ActivityModel.GetActivityById(
							e,
						).SetRewardToGotState(t),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RefreshCommonActivityRedDot,
							e,
						));
			});
	}
}
exports.ActivitySevenDaySignController = ActivitySevenDaySignController;
