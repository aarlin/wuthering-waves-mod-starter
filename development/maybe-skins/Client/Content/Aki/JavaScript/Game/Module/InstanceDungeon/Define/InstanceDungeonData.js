"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.instanceLockColor =
		exports.INSTANCE_LOCK =
		exports.InstanceDetectionDynamicData =
		exports.InstanceDungeonData =
			void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager");
class InstanceDungeonData {
	constructor(e) {
		(this.Esi = 0),
			(this.ysi = 0),
			(this.Isi = 0),
			(this.Esi = e),
			(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetCountConfig(
				this.Esi,
			)),
			(this.ysi = e?.EnterCount ?? 0),
			(this.Tsi = e.EnterCountConsumeType);
	}
	get ChallengedTimes() {
		return this.Isi;
	}
	set ChallengedTimes(e) {
		void 0 !== e && (this.Isi = e);
	}
	get CostType() {
		return this.Tsi;
	}
	get LimitChallengedTimes() {
		return this.ysi;
	}
	get LeftChallengedTimes() {
		var e = this.LimitChallengedTimes - this.Isi;
		return 0 <= e ? e : 0;
	}
	get CanRepeatChallenge() {
		return this.LimitChallengedTimes <= 0;
	}
	get CanChallenge() {
		return (
			!!this.CanRepeatChallenge ||
			1 === this.Tsi ||
			2 === this.Tsi ||
			this.ChallengedTimes < this.LimitChallengedTimes
		);
	}
	get CanReward() {
		return (
			!!this.CanRepeatChallenge ||
			0 === this.Tsi ||
			3 === this.Tsi ||
			(1 === this.Tsi
				? this.ChallengedTimes <= this.LimitChallengedTimes
				: this.ChallengedTimes < this.LimitChallengedTimes)
		);
	}
}
exports.InstanceDungeonData = InstanceDungeonData;
class InstanceDetectionDynamicData {
	constructor() {
		(this.IsSelect = !1),
			(this.IsOnlyOneGrid = !1),
			(this.IsShow = !0),
			(this.InstanceSeriesTitle = 0),
			(this.InstanceGirdId = 0);
	}
}
(exports.InstanceDetectionDynamicData = InstanceDetectionDynamicData),
	(exports.INSTANCE_LOCK = "ADADAD"),
	(exports.instanceLockColor = UE.Color.FromHex(exports.INSTANCE_LOCK));
