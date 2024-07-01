"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRoleTrialData = exports.stateResolver = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ActivityData_1 = require("../../ActivityData");
exports.stateResolver = {
	[Protocol_1.Aki.Protocol.r0s.Proto_Running]: 0,
	[Protocol_1.Aki.Protocol.r0s.Proto_WaitTakeReward]: 1,
	[Protocol_1.Aki.Protocol.r0s.Proto_Finish]: 2,
};
class ActivityRoleTrialData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments),
			(this.RoleIdList = []),
			(this.RoleTrialIdList = []),
			(this.qke = new Map()),
			(this.CurrentRoleId = 0),
			(this.Gke = 0);
	}
	SetRoleTrialState(e) {
		this.Gke = e;
	}
	IsRolePreviewOn() {
		return 2 === this.Gke;
	}
	IsRoleInstanceOn() {
		return 3 === this.Gke;
	}
	PhraseEx(e) {
		if (
			((this.RoleIdList.length = 0),
			(this.RoleTrialIdList.length = 0),
			(e = e.v0s))
		)
			for (const r of e.o0s) {
				var t = exports.stateResolver[r.r0s],
					o =
						ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
							r.l3n,
						);
				this.RoleTrialIdList.push(o.TrialRoleId),
					this.RoleIdList.push(r.l3n),
					this.qke.set(r.l3n, t);
			}
	}
	GetRewardStateByRoleId(e) {
		return this.qke.get(e) ?? 0;
	}
	SetRewardStateByRoleId(e, t) {
		this.qke.set(e, t);
	}
	GetInstanceIdByRoleId(e) {
		return ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
			e,
		)?.InstanceId;
	}
	GetRewardDataByRoleId(e) {
		var t =
			ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
				e,
			);
		if (t && t.RewardItem) {
			var o,
				r,
				i = this.GetRewardStateByRoleId(e),
				a = [];
			for ([o, r] of t.RewardItem) {
				var l = [{ IncId: 0, ItemId: o }, r];
				a.push({ Item: l, HasClaimed: 2 === i });
			}
			return a;
		}
	}
	NeedSelfControlFirstRedPoint() {
		return !1;
	}
	GetExDataRedPointShowState() {
		for (var [, e] of this.qke) if (1 === e) return !0;
		return !1;
	}
}
exports.ActivityRoleTrialData = ActivityRoleTrialData;
