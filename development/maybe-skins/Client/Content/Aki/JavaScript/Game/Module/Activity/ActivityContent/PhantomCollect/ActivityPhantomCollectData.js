"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityPhantomCollectData = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityData_1 = require("../../ActivityData"),
	ActivityPhantomCollectController_1 = require("./ActivityPhantomCollectController");
class ActivityPhantomCollectData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments), (this.PhantomCollectRewardList = void 0);
	}
	PhraseEx(t) {
		(void 0 !== t && !t.p0s) || (this.PhantomCollectRewardList = t?.p0s?.s0s);
	}
	GetPhantomCollectRewardList() {
		return this.PhantomCollectRewardList ?? [];
	}
	GetPhantomCollectRewardById(t) {
		return this.PhantomCollectRewardList?.find((e) => e.Ikn === t);
	}
	GetCollectPhantomList() {
		var t =
			ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig?.GetPhantomCollectConfig(
				ActivityPhantomCollectController_1.ActivityPhantomCollectController
					.ActivityId,
			);
		return void 0 === t ? [] : t.Phantoms;
	}
	GetExDataRedPointShowState() {
		let t = !1;
		return (
			this.PhantomCollectRewardList?.forEach((e) => {
				e.ckn === Protocol_1.Aki.Protocol.D0s.j0s && (t = !0);
			}),
			t
		);
	}
	GetCollectPhantomCount() {
		var t = this.GetCollectPhantomList();
		let e = 0;
		return (
			t.forEach((t) => {
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomIsUnlock(t) &&
					e++;
			}),
			e
		);
	}
	UpadatePhantomCollectReward(t) {
		var e;
		void 0 !== this.PhantomCollectRewardList &&
			-1 !==
				(e = this.PhantomCollectRewardList.findIndex((e) => e.Ikn === t.Ikn)) &&
			(this.PhantomCollectRewardList[e] = t);
	}
}
exports.ActivityPhantomCollectData = ActivityPhantomCollectData;
