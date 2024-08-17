"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CountryExploreLevelData = void 0);
const CountryExploreLevelRewardData_1 = require("./CountryExploreLevelRewardData"),
	CountryExploreScoreData_1 = require("./CountryExploreScoreData");
class CountryExploreLevelData {
	constructor() {
		(this.z4t = 0),
			(this.Z4t = 0),
			(this.e5t = 0),
			(this.t5t = new Map()),
			(this.i5t = []),
			(this.o5t = []),
			(this.r5t = new Map()),
			(this.n5t = []),
			(this.s5t = 0);
	}
	Initialize(e, t) {
		(this.z4t = e), (this.s5t = 0);
		for (const e of t) {
			var r =
					new CountryExploreLevelRewardData_1.CountryExploreLevelRewardData(),
				o = (r.Initialize(e), e.ExploreLevel);
			this.t5t.set(o, r),
				this.i5t.push(r),
				e.Show && this.o5t.push(r),
				this.s5t < o && (this.s5t = o);
		}
	}
	AddExploreScoreData(e, t, r, o) {
		var a = new CountryExploreScoreData_1.CountryExploreScoreData();
		a.Initialize(this.z4t, e, t, r, o);
		let s = this.r5t.get(e);
		s || ((s = new Map()), this.r5t.set(e, s)), s.set(t, a), this.n5t.push(a);
	}
	GetExploreScoreData(e, t) {
		return this.r5t.get(e)?.get(t);
	}
	GetAllExploreScoreData() {
		return this.n5t;
	}
	GetVisibleExploreScoreDataList() {
		var e = [];
		for (const a of this.r5t.values())
			for (var [t, r] of a) {
				var o = r.LastProgress;
				((o = a.get(o)) && !o.GetIsReceived()) ||
					((r.CanReceive() || r.GetIsReceived() || t > r.GetAreaProgress()) &&
						e.push(r));
			}
		return e;
	}
	SetExploreScoreDataReceived(e, t, r) {
		this.GetExploreScoreData(e, t)?.SetReceived(r);
	}
	GetCountryId() {
		return this.z4t;
	}
	SetExploreLevel(e) {
		this.Z4t = e;
	}
	GetExploreLevel() {
		return this.Z4t;
	}
	SetExploreScore(e) {
		this.e5t = e;
	}
	GetExploreScore() {
		return this.e5t;
	}
	GetExploreLevelRewardData(e) {
		return this.t5t.get(e);
	}
	GetExploreLevelRewardDataMap() {
		return this.t5t;
	}
	GetCurrentExploreLevelRewardData() {
		return this.t5t.get(this.Z4t);
	}
	GetAllExploreLevelRewardData() {
		return this.i5t;
	}
	GetUnlockFunctionExploreLevelRewardDataList() {
		return this.o5t;
	}
	GetMaxExploreLevel() {
		return this.s5t;
	}
	CanLevelUp() {
		let e = 0;
		for (const t of this.n5t) t.CanReceive() && (e += t.Score);
		var t = this.GetCurrentExploreLevelRewardData();
		return (
			!(0 === e || this.e5t >= t.GetMaxExploreScore()) &&
			this.e5t + e >= t.GetMaxExploreScore()
		);
	}
}
exports.CountryExploreLevelData = CountryExploreLevelData;
