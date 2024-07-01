"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DailyActivityController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class DailyActivityController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return !0;
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(9218, DailyActivityController.ROt),
			Net_1.Net.Register(27336, DailyActivityController.UOt),
			Net_1.Net.Register(26708, DailyActivityController.AOt);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(9218),
			Net_1.Net.UnRegister(27336),
			Net_1.Net.UnRegister(26708);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			this.POt,
		);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			this.POt,
		);
	}
	static async RequestDailyActivityData() {
		var e = Protocol_1.Aki.Protocol.zts.create();
		return (
			!!(e = await Net_1.Net.CallAsync(16864, e)) &&
			(ModelManager_1.ModelManager.DailyActivityModel.RefreshDailyActivityData(
				e.lAs,
				!1,
			),
			!0)
		);
	}
	static RequestDailyActivityTaskReward(e) {
		var t = Protocol_1.Aki.Protocol.ris.create();
		(t.XFn = e),
			Net_1.Net.Call(24549, t, (e) => {
				e &&
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						21961,
					);
			});
	}
	static RequestDailyActivityReward(e) {
		var t = Protocol_1.Aki.Protocol.nis.create();
		(t.j4n = e),
			Net_1.Net.Call(23404, t, (e) => {
				e &&
					(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ModelManager_1.ModelManager.DailyActivityModel.RefreshActivityInfo(
								e.j4n,
							)
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								24278,
							));
			});
	}
	static RequestAllAvailableActivityReward() {
		var e = ModelManager_1.ModelManager.DailyActivityModel.DailyActivityGoalMap;
		const t = [];
		e.forEach((e, r) => {
			1 === e.State && t.push(r);
		}),
			DailyActivityController.RequestDailyActivityReward(t);
	}
}
((exports.DailyActivityController = DailyActivityController).POt = () => {
	ModelManager_1.ModelManager.DailyActivityModel.InitGoalData(),
		DailyActivityController.RequestDailyActivityData();
}),
	(DailyActivityController.ROt = (e) => {
		ModelManager_1.ModelManager.DailyActivityModel.UpdateDailyActivityData(
			e.lAs,
		);
	}),
	(DailyActivityController.UOt = (e) => {
		ModelManager_1.ModelManager.DailyActivityModel.RefreshDailyActivityData(
			e.lAs,
			!0,
		);
	}),
	(DailyActivityController.AOt = (e) => {
		ModelManager_1.ModelManager.DailyActivityModel.RefreshActivityValue(e.sAs);
	});
