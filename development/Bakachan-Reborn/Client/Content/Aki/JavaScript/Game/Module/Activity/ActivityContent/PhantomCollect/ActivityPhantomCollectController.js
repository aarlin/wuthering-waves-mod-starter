"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityPhantomCollectController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ErrorCodeController_1 = require("../../../ErrorCode/ErrorCodeController"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivityPhantomCollectData_1 = require("./ActivityPhantomCollectData"),
	ActivitySubViewPhantomCollect_1 = require("./ActivitySubViewPhantomCollect");
class ActivityPhantomCollectController extends ActivityControllerBase_1.ActivityControllerBase {
	constructor() {
		super(...arguments),
			(this.OnPhantomCollectUpdateNotify = (t) => {
				ActivityPhantomCollectController.ActivityId = t.YFn;
				var e = ActivityPhantomCollectController.GetCurrentActivityDataById();
				t.b0s
					? (e.UpadatePhantomCollectReward(t.b0s),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnPhantomCollectUpdate,
							t.b0s.Ikn,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RefreshCommonActivityRedDot,
							ActivityPhantomCollectController.ActivityId,
						))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Activity", 35, "声骇收集活动数据更新错误:", [
							"ActivityId:",
							t.YFn,
						]);
			});
	}
	OnRegisterNetEvent() {
		Net_1.Net.Register(1267, this.OnPhantomCollectUpdateNotify);
	}
	OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(1267);
	}
	OnGetActivityResource(t) {
		return "UiItem_ActivityPhantomCollect";
	}
	OnCreateSubPageComponent(t) {
		return new ActivitySubViewPhantomCollect_1.ActivitySubViewPhantomCollect();
	}
	OnCreateActivityData(t) {
		return (
			(ActivityPhantomCollectController.ActivityId = t.Ekn),
			new ActivityPhantomCollectData_1.ActivityPhantomCollectData()
		);
	}
	OnOpenView(t) {}
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	static GetCurrentActivityDataById() {
		var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
			ActivityPhantomCollectController.ActivityId,
		);
		if (t) return t;
	}
	static async PhantomCollectRewardReceiveRequest(t) {
		var e;
		if (
			(e =
				(((e = new Protocol_1.Aki.Protocol.k$n()).Ikn = t),
				(e.YFn = ActivityPhantomCollectController.ActivityId),
				await Net_1.Net.CallAsync(13175, e)))
		)
			if (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
				ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					13175,
				);
			else if (
				(e = ActivityPhantomCollectController.GetCurrentActivityDataById()) &&
				(e = e.GetPhantomCollectRewardById(t))
			)
				return (
					(e.ckn = Protocol_1.Aki.Protocol.D0s.qms),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshCommonActivityRedDot,
						ActivityPhantomCollectController.ActivityId,
					),
					e
				);
	}
}
(exports.ActivityPhantomCollectController =
	ActivityPhantomCollectController).ActivityId = 0;
