"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityDailyAdventureController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivityDailyAdventureData_1 = require("./ActivityDailyAdventureData"),
	ActivityDailyAdventureDefine_1 = require("./ActivityDailyAdventureDefine"),
	ActivitySubViewDailyAdventure_1 = require("./ActivitySubViewDailyAdventure");
class ActivityDailyAdventureController extends ActivityControllerBase_1.ActivityControllerBase {
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	OnOpenView(e) {}
	OnGetActivityResource(e) {
		return "UiItem_ActivityDailyAdventure";
	}
	OnCreateSubPageComponent(e) {
		return new ActivitySubViewDailyAdventure_1.ActivitySubViewDailyAdventure();
	}
	OnCreateActivityData(e) {
		return (
			(ActivityDailyAdventureController.CurrentActivityId = e.Ekn),
			new ActivityDailyAdventureData_1.ActivityDailyAdventureData()
		);
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnCommonItemCountAnyChange,
			ActivityDailyAdventureController.qmi,
		);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnCommonItemCountAnyChange,
			ActivityDailyAdventureController.qmi,
		);
	}
	OnRegisterNetEvent() {
		Net_1.Net.Register(7834, ActivityDailyAdventureController.KNe);
	}
	OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(7834);
	}
	static GetDailyAdventureData() {
		return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(
			ActivityDailyAdventureController.CurrentActivityId,
		);
	}
	static GetDefaultMapMarkId() {
		var e = this.GetDailyAdventureData();
		return e ? e.GetDefaultMapMarkId() : 0;
	}
	static RequestTaskReward(e) {
		var t = new Protocol_1.Aki.Protocol.wXn();
		(t.Ekn = e),
			Net_1.Net.Call(9216, t, (t) => {
				t &&
					(t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								t.lkn,
								14376,
							)
						: (t = this.GetDailyAdventureData()) &&
							(t.SetTaskInfo(e, 2),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.RefreshCommonActivityRedDot,
								t.Id,
							)));
			});
	}
	static RequestPointReward(e) {
		var t = new Protocol_1.Aki.Protocol.PXn();
		(t.Ekn = e),
			Net_1.Net.Call(13587, t, (t) => {
				t &&
					(t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								t.lkn,
								12517,
							)
						: (t = this.GetDailyAdventureData()) &&
							(t.SetPointReward(e, !0),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.RefreshCommonActivityRedDot,
								t.Id,
							)));
			});
	}
}
(exports.ActivityDailyAdventureController = ActivityDailyAdventureController),
	((_a = ActivityDailyAdventureController).CurrentActivityId = 0),
	(ActivityDailyAdventureController.qmi = (e, t) => {
		e === ActivityDailyAdventureDefine_1.DAILY_ADVENTURE_PT_CONFIGID &&
			(e = _a.GetDailyAdventureData()) &&
			(e.SetProgressPoint(t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				e.Id,
			));
	}),
	(ActivityDailyAdventureController.KNe = (e) => {
		var t = _a.GetDailyAdventureData();
		if (t) {
			for (const r of e.N0s)
				t.SetTaskInfo(
					r.Ekn,
					ActivityDailyAdventureData_1.rewardStateResolver[r.n3n],
					r.k0s,
				);
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				t.Id,
			);
		}
	});
