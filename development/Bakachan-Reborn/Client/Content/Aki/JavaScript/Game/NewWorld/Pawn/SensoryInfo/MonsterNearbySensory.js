"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterNearbySensory = void 0);
const BaseSensoryInfo_1 = require("./BaseSensoryInfo");
class MonsterNearbySensory extends BaseSensoryInfo_1.BaseSensoryInfo {
	constructor() {
		super(...arguments),
			(this.SensoryInfoType = 1),
			(this.CacheEntityList = []),
			(this.LastFindEntities = new Set()),
			(this.OnEnterSensoryRange = void 0),
			(this.OnExitSensoryRange = void 0);
	}
	OnInit(...t) {
		this.SensoryRange = t[0];
	}
	OnTick(t) {}
	OnClear() {
		this.LastFindEntities.clear(),
			(this.CacheEntityList.length = 0),
			(this.OnEnterSensoryRange = void 0),
			(this.OnExitSensoryRange = void 0);
	}
	ClearCacheList() {
		this.CacheEntityList.length = 0;
	}
	CheckEntity(t) {
		return (
			!!(t = t.GetComponent(0)) &&
			t.IsMonster() &&
			MonsterNearbySensory.irr.has(t.GetEntityCamp())
		);
	}
	EnterRange(t) {
		(this.InRange = !0),
			(!this.LastFindEntities.has(t.Id) &&
				1 & this.SensoryInfoType &&
				!this.OnEnterSensoryRange(t)) ||
				(this.CacheEntityList.push(t.Id), this.LastFindEntities.delete(t.Id));
	}
	ExitRange() {
		if (
			((this.InRange = 0 !== this.CacheEntityList.length),
			1 & this.SensoryInfoType)
		)
			for (const t of this.LastFindEntities) this.OnExitSensoryRange(t);
		this.LastFindEntities.clear();
		for (const t of this.CacheEntityList) this.LastFindEntities.add(t);
	}
}
(exports.MonsterNearbySensory = MonsterNearbySensory).irr = new Set([1, 3, 7]);
