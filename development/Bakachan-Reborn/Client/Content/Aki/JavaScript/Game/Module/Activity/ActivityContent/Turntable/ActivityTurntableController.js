"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityTurntableController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RewardItemData_1 = require("../../../ItemReward/RewardData/RewardItemData"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivitySubViewTurntable_1 = require("./ActivitySubViewTurntable"),
	ActivitySubViewTurntableLock_1 = require("./ActivitySubViewTurntableLock"),
	ActivityTurntableData_1 = require("./ActivityTurntableData"),
	ActivityTurntableDefine_1 = require("./ActivityTurntableDefine");
class ActivityTurntableController extends ActivityControllerBase_1.ActivityControllerBase {
	constructor() {
		super(...arguments),
			(this.DEe = (e, t) => {
				ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(
					Protocol_1.Aki.Protocol.gBs.Proto_TurnTableActivity,
				).forEach((n) => {
					n.OnQuestStateChange(e, t);
				});
			}),
			(this.qmi = (e, t) => {
				ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(
					Protocol_1.Aki.Protocol.gBs.Proto_TurnTableActivity,
				).forEach((n) => {
					n.OnCommonItemCountAnyChange(e, t);
				});
			});
	}
	OnRegisterNetEvent() {}
	OnUnRegisterNetEvent() {}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnQuestStateChange,
			this.DEe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnCommonItemCountAnyChange,
				this.qmi,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnQuestStateChange,
			this.DEe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnCommonItemCountAnyChange,
				this.qmi,
			);
	}
	OnOpenView(e) {}
	OnGetActivityResource(e) {
		return e.GetPreGuideQuestFinishState()
			? "UiItem_ActivityTurntable"
			: "UiItem_ActivityTurntableLock";
	}
	OnCreateSubPageComponent(e) {
		return new (
			e.GetPreGuideQuestFinishState()
				? ActivitySubViewTurntable_1.ActivitySubViewTurntable
				: ActivitySubViewTurntableLock_1.ActivitySubViewTurntableLock
		)();
	}
	OnCreateActivityData(e) {
		return new ActivityTurntableData_1.ActivityTurntableData();
	}
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	static RequestTurntableRun(e) {
		var t = new Protocol_1.Aki.Protocol.Kds();
		(t.YFn = e),
			Net_1.Net.Call(17105, t, (t) => {
				if (t) {
					t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							t.lkn,
							13280,
						);
					var n = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
					if (n) {
						var r = [];
						for (const e of Object.keys(t.Vms)) {
							var i = [{ IncId: 0, ItemId: Number.parseInt(e) }, t.Vms[e]];
							r.push(i);
						}
						n.SetRunResult(t.t3n, r),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.TurntableStartRun,
								t.t3n,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.RefreshCommonActivityRedDot,
								e,
							);
					}
				}
			});
	}
	static ShowTurntableItemObtain(e, t) {
		if (0 !== e.length) {
			var n = [];
			for (const t of e) {
				var r = new RewardItemData_1.RewardItemData(
					t[0].ItemId,
					t[1],
					t[0].IncId,
				);
				n.push(r);
			}
			(e =
				ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(
					ActivityTurntableDefine_1.TURNTABLE_RESULT_DISPLAY_ID,
				)?.RewardViewId),
				e &&
					ControllerHolder_1.ControllerHolder.ItemRewardController.OpenCommonRewardView(
						e,
						n,
						t,
					);
		}
	}
}
exports.ActivityTurntableController = ActivityTurntableController;
