"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityTowerGuideController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivitySubViewTowerGuide_1 = require("./ActivitySubViewTowerGuide"),
	ActivityTowerGuideData_1 = require("./ActivityTowerGuideData"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class ActivityTowerGuideController extends ActivityControllerBase_1.ActivityControllerBase {
	constructor() {
		super(...arguments),
			(this.NFe = (e, t) => {
				var r = ActivityTowerGuideController.OFe();
				r && r.RefreshRewardState(t);
			});
	}
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	OnOpenView(e) {}
	OnGetActivityResource(e) {
		return "UiItem_TowerGuide";
	}
	OnCreateSubPageComponent(e) {
		return new ActivitySubViewTowerGuide_1.ActivitySubViewTowerGuide();
	}
	OnCreateActivityData(e) {
		return new ActivityTowerGuideData_1.ActivityTowerGuideData();
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnTowerRecordUpdate,
			this.NFe,
		);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnTowerRecordUpdate,
			this.NFe,
		);
	}
	static OFe() {
		return ModelManager_1.ModelManager.ActivityModel.GetActivityById(
			ActivityTowerGuideController.CurrentActivityId,
		);
	}
	static RequestTowerReward(e) {
		var t = new Protocol_1.Aki.Protocol.ucs();
		(t.c3n = e),
			Net_1.Net.Call(12627, t, (e) => {
				e &&
					(e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								2530,
							)
						: ActivityTowerGuideController.RequestTowerRewardInfo());
			});
	}
	static RequestTowerRewardInfo() {
		var e = new Protocol_1.Aki.Protocol.dcs();
		Net_1.Net.Call(6707, e, (e) => {
			if (e) {
				var t = ActivityTowerGuideController.OFe();
				if (t) for (const r of e.c3n) t.SetRewardClaimed(r, !0);
			}
		});
	}
}
(exports.ActivityTowerGuideController =
	ActivityTowerGuideController).CurrentActivityId = 0;
