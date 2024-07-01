"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRunController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivitySubViewRun_1 = require("../../View/SubView/ActivitySubViewRun"),
	ActivityRunData_1 = require("./ActivityRunData"),
	ActivityRunModel_1 = require("./ActivityRunModel");
class ActivityRunController extends ActivityControllerBase_1.ActivityControllerBase {
	OnGetIsOpeningActivityRelativeView() {
		return UiManager_1.UiManager.IsViewOpen("ActivityRunView");
	}
	OnOpenView(e) {
		UiManager_1.UiManager.OpenView("ActivityRunView");
	}
	OnGetActivityResource(e) {
		return "UiItem_Running";
	}
	OnCreateSubPageComponent(e) {
		return new ActivitySubViewRun_1.ActivitySubViewRun();
	}
	OnCreateActivityData(e) {
		return new ActivityRunData_1.ActivityRun();
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnReceiveActivityData,
			ActivityRunController.d2e,
		);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnReceiveActivityData,
			ActivityRunController.d2e,
		);
	}
	OnRegisterNetEvent() {
		Net_1.Net.Register(6455, ActivityRunController.C2e),
			Net_1.Net.Register(25912, ActivityRunController.g2e);
	}
	OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(6455), Net_1.Net.UnRegister(25912);
	}
	static SelectDefaultChallengeId(e) {
		(e =
			ModelManager_1.ModelManager.ActivityRunModel.GetDefaultOpenUiChallengeIndex(
				e,
			)),
			ModelManager_1.ModelManager.ActivityRunModel.SetStartViewSelectIndex(e);
	}
	static f2e() {
		var e = new Protocol_1.Aki.Protocol.Aos();
		Net_1.Net.Call(15732, e, (e) => {
			ModelManager_1.ModelManager.ActivityRunModel.OnReceiveMessageData(e);
		});
	}
	static RequestTakeChallengeReward(e, t) {
		var n = new Protocol_1.Aki.Protocol.xos();
		(n._3n = e),
			(n.u3n = t),
			Net_1.Net.Call(18162, n, (n) => {
				n.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							n.lkn,
							11666,
						)
					: ModelManager_1.ModelManager.ActivityRunModel.OnGetChallengeReward(
							e,
							t,
						);
			});
	}
	static RequestTransToParkourChallenge(e) {
		var t = new Protocol_1.Aki.Protocol.qos();
		(t._3n = e),
			Net_1.Net.Call(18895, t, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							25606,
						)
					: (UiManager_1.UiManager.CloseView("ActivityRunSuccessView"),
						UiManager_1.UiManager.CloseView("ActivityRunFailView"));
			});
	}
}
((exports.ActivityRunController = ActivityRunController).C2e = (e) => {
	ModelManager_1.ModelManager.ActivityRunModel.OnReceiveChallengeOpenNotify(e);
}),
	(ActivityRunController.g2e = (e) => {
		if (e.BLs) {
			if (
				(r = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
					e._3n,
				))
			) {
				var t = r.GetMiniTime(),
					n = r.GetMaxScore(),
					i = (r.OnChallengeEnd(e), r.GetMiniTime()),
					r = r.GetMaxScore();
				let o = !1;
				(i < t || n < r || 0 === t) && (o = !0),
					(i = new ActivityRunModel_1.RunEndData()).Phrase(e),
					i.SetIfNewRecord(o),
					UiManager_1.UiManager.OpenView("ActivityRunSuccessView", i);
			}
		} else
			(n = new ActivityRunModel_1.RunEndData()).Phrase(e),
				UiManager_1.UiManager.OpenView("ActivityRunFailView", n);
	}),
	(ActivityRunController.d2e = (e, t) => {
		ActivityRunController.f2e();
	});
