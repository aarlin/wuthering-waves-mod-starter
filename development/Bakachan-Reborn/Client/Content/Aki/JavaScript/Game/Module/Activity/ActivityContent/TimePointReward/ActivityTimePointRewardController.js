"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityTimePointRewardController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivitySubViewTimePointReward_1 = require("./ActivitySubViewTimePointReward"),
	ActivityTimePointRewardData_1 = require("./ActivityTimePointRewardData");
class ActivityTimePointRewardController extends ActivityControllerBase_1.ActivityControllerBase {
	OnOpenView(e) {}
	OnGetActivityResource(e) {
		return "UiItem_ActivityTimePointReward";
	}
	OnCreateSubPageComponent(e) {
		return new ActivitySubViewTimePointReward_1.ActivitySubViewTimePointReward();
	}
	OnCreateActivityData(e) {
		return new ActivityTimePointRewardData_1.ActivityTimePointRewardData();
	}
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	static GetRewardById(e, t) {
		var r = Protocol_1.Aki.Protocol.f6s.create();
		(r.Ekn = t),
			Net_1.Net.Call(4504, r, (r) => {
				r.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							r.lkn,
							3145,
						)
					: ModelManager_1.ModelManager.ActivityModel.GetActivityById(
							e,
						).SetRewardToGotState(t);
			});
	}
}
exports.ActivityTimePointRewardController = ActivityTimePointRewardController;
