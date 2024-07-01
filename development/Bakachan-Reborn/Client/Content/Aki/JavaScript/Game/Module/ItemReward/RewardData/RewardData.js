"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardData = void 0);
class RewardData {
	constructor(t, e) {
		(this.Ggi = void 0),
			(this.Ngi = void 0),
			(this.Ogi = new Map()),
			(this.kgi = new Map()),
			t && (this.Ggi = t),
			(this.Ngi = e || { ItemList: [] });
	}
	SetItemList(t) {
		if (t && !(t.length < 1))
			for (const s of (this.Ngi.ItemList = t)) {
				var e = s.UniqueId;
				if (void 0 !== e && 0 < e) this.kgi.set(e, s);
				else if (void 0 !== (e = s.ConfigId) && 0 < e) {
					var i = this.Ogi.get(e);
					if (!i) return void this.Ogi.set(e, s);
					i.Count += s.Count;
				}
			}
	}
	AddItem(t) {
		let e = this.GetItemList();
		e = e || [];
		var i,
			s = t.UniqueId;
		void 0 !== s && 0 < s
			? (e.push(t), this.kgi.set(s, t))
			: void 0 !== (s = t.ConfigId) &&
				0 < s &&
				((i = this.Ogi.get(s))
					? (i.Count += t.Count)
					: (e.push(t), this.Ogi.set(s, t)));
	}
	AddItemList(t) {
		if (t) for (const e of t) this.AddItem(e);
	}
	SetProgressQueue(t) {
		this.Ngi.ProgressQueue = t;
	}
	SetExploreRecordInfo(t) {
		this.Ngi.ExploreRecordInfo = t;
	}
	SetExploreBarDataList(t) {
		this.Ngi.ExploreBarDataList = t;
	}
	SetButtonInfoList(t) {
		this.Ngi.ButtonInfoList = t;
	}
	SetTargetReached(t) {
		this.Ngi.TargetReached = t;
	}
	SetStateToggle(t) {
		this.Ngi.StateToggle = t;
	}
	SetScoreReached(t) {
		this.Ngi.ScoreReached = t;
	}
	SetRewardInfo(t) {
		this.Ggi = t;
	}
	GetRewardInfo() {
		return this.Ggi;
	}
	GetExtendRewardInfo() {
		return this.Ngi;
	}
	GetItemList() {
		return this.Ngi.ItemList;
	}
	GetItemByConfigId(t) {
		return this.Ogi.get(t);
	}
	GetItemByUniqueId(t) {
		return this.kgi.get(t);
	}
}
exports.RewardData = RewardData;
