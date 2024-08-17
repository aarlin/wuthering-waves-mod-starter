"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LordGymModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
class LordGymModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.LordId2EntranceIdMap = void 0),
			(this.UnLockLordGym = []),
			(this.ReadLoadGymIds = []),
			(this.FirstUnLockLordGym = []),
			(this.LordGymRecord = new Map());
	}
	OnInit() {
		this.LordId2EntranceIdMap = new Map();
		for (const o of ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceAllConfig())
			for (const r of o.LordGymList) this.LordId2EntranceIdMap.set(r, o.Id);
		return !0;
	}
	GetLordGymIsUnLock(o) {
		return this.UnLockLordGym.includes(o);
	}
	GetLordGymHasRead(o) {
		return this.ReadLoadGymIds.includes(o);
	}
	ReadLordGym(o) {
		this.ReadLoadGymIds.push(o);
	}
	GetLordGymEntranceList(o) {
		return ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceLordList(
			o,
		);
	}
	GetLastGymFinish(o) {
		var r = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(o);
		if (r.Difficulty <= 1) return !0;
		for (const o of ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(
			r.Difficulty - 1,
		))
			if (o.PlayId === r.PlayId) return this.LordGymRecord.has(o.Id);
		return !1;
	}
	GetNextGymId(o) {
		const r = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(o);
		return ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(
			r.Difficulty + 1,
		)?.find((o) => o.PlayId === r.PlayId)?.Id;
	}
	GetLordGymIsFinish(o) {
		return this.LordGymRecord.has(o);
	}
	GetMarkIdByLordGymId(o) {
		return (
			(o = this.LordId2EntranceIdMap.get(o)),
			ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(o)
				?.MarkId
		);
	}
	GetLordGymEntranceFinish(o) {
		var r = this.GetGymCanFightMaxLevelWithoutLockCondition(o);
		return this.GetHasFinishLord(o) + "/" + r;
	}
	GetHasFinishLord(o) {
		if (
			((o =
				ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(
					o,
				)),
			!o)
		)
			return 0;
		let r = 0;
		for (const n of o.LordGymList) this.GetLordGymIsFinish(n) && r++;
		return r;
	}
	GetMaxDifficultyLordGymEntrance(o) {
		if (
			((o =
				ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(
					o,
				)),
			o)
		) {
			let n = 0;
			for (const i of o.LordGymList) {
				var r =
					ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(i);
				this.GetLordGymIsUnLock(i) && r.Difficulty > n && (n = r.Difficulty);
			}
			return n;
		}
	}
	GetMaxDifficultyLordGymEntranceCanFight(o) {
		if (
			((o =
				ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(
					o,
				)),
			o)
		) {
			let n = 1;
			for (const i of o.LordGymList) {
				var r =
					ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(i);
				1 < r.Difficulty &&
					this.GetLordGymIsUnLock(i) &&
					this.GetLordGymIsFinish(i - 1) &&
					r.Difficulty > n &&
					(n = r.Difficulty);
			}
			return n;
		}
	}
	GetCanFightLordGym() {
		for (const i of this.UnLockLordGym) {
			var o = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(i),
				r = this.GetLordGymIsUnLock(i),
				n =
					((o = 1 === o.Difficulty || this.GetLordGymIsFinish(i - 1)),
					this.GetLordGymIsFinish(i));
			if (r && o && !n) return i;
		}
		return 0;
	}
	GetGymEntranceAllFinish(o) {
		if (
			((o =
				ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(
					o,
				)),
			!o)
		)
			return !1;
		for (const r of o.LordGymList) if (!this.GetLordGymIsFinish(r)) return !1;
		return !0;
	}
	GetGymCanFightMaxLevelWithoutLockCondition(o) {
		if (
			((o =
				ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(
					o,
				)),
			o)
		) {
			let n = 1;
			for (const i of o.LordGymList) {
				var r =
					ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(i);
				1 < r.Difficulty &&
					this.GetLordGymIsUnLock(i) &&
					r.Difficulty > n &&
					(n = r.Difficulty);
			}
			return n;
		}
	}
}
exports.LordGymModel = LordGymModel;
