"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityNoviceJourneyController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivityNoviceJourneyData_1 = require("./ActivityNoviceJourneyData"),
	ActivitySubViewNoviceJourney_1 = require("./ActivitySubViewNoviceJourney"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class ActivityNoviceJourneyController extends ActivityControllerBase_1.ActivityControllerBase {
	constructor() {
		super(...arguments),
			(this.sNe = 0),
			(this.Cke = () => {
				0 !== this.sNe &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshCommonActivityRedDot,
						this.sNe,
					);
			}),
			(this.gke = (e) => {
				ModelManager_1.ModelManager.ActivityModel.GetActivityById(
					this.sNe,
				).SetReceiveData(e.i0s);
			});
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPlayerLevelChanged,
			this.Cke,
		);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPlayerLevelChanged,
			this.Cke,
		);
	}
	OnRegisterNetEvent() {
		Net_1.Net.Register(15744, this.gke);
	}
	OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(15744);
	}
	OnOpenView(e) {}
	OnGetActivityResource(e) {
		return "UiItem_ActivityRoleLevel";
	}
	OnCreateSubPageComponent(e) {
		return new ActivitySubViewNoviceJourney_1.ActivitySubViewNoviceJourney();
	}
	OnCreateActivityData(e) {
		return (
			(this.sNe = e.Ekn),
			new ActivityNoviceJourneyData_1.ActivityNoviceJourneyData()
		);
	}
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	RequestReward(e) {
		var t = Protocol_1.Aki.Protocol.Tos.create();
		(t.r3n = e),
			Net_1.Net.Call(3359, t, (t) => {
				t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							t.lkn,
							22570,
						)
					: (ModelManager_1.ModelManager.ActivityModel.GetActivityById(
							this.sNe,
						).AddReceivedData(e),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RefreshCommonActivityRedDot,
							this.sNe,
						));
			});
	}
}
exports.ActivityNoviceJourneyController = ActivityNoviceJourneyController;
