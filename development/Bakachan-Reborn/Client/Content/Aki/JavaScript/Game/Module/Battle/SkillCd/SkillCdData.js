"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldSkillCdData = exports.SkillCdData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	MultiSkillData_1 = require("../../../NewWorld/Character/Common/Component/Skill/MultiSkillData"),
	GroupSkillCdInfo_1 = require("./GroupSkillCdInfo"),
	MIN_SHARE_GROUP_ID = 1e3;
class SkillCdData {
	constructor() {
		(this.SkillId2GroupIdMap = new Map()),
			(this.GroupSkillCdInfoMap = new Map()),
			(this.XWe = 0),
			(this.ServerSkillCd = new Map()),
			(this.ServerGroupSkillCd = new Map());
	}
	GenerateCdShareGroupId(l) {
		return 0 === l ? (this.XWe++, this.XWe) : l;
	}
	Tick(l) {
		for (const e of this.GroupSkillCdInfoMap.values()) e.Tick(l);
	}
	Clear() {
		this.SkillId2GroupIdMap.clear(),
			this.GroupSkillCdInfoMap.clear(),
			(this.XWe = 0);
	}
}
exports.SkillCdData = SkillCdData;
class WorldSkillCdData {
	constructor() {
		(this.EntitySkillCdMap = new Map()),
			(this.AllShareSkillCdData = new SkillCdData()),
			(this.OffRoleSkillCdMap = new Map()),
			(this.MultiSkillMap = new Map());
	}
	Clear() {
		this.EntitySkillCdMap.clear(),
			this.AllShareSkillCdData.Clear(),
			this.OffRoleSkillCdMap.clear(),
			this.MultiSkillMap.clear();
	}
	InitSkillCd(l, e, i) {
		return (
			(i = i.CooldownConfig),
			this.InitSkillCdCommon(
				l,
				e,
				i.CdTime,
				i.CdDelay,
				i.MaxCount,
				i.ShareGroupId,
				i.IsShareAllCdSkill,
			)
		);
	}
	InitSkillCdCommon(l, e, i, t, o, a, r) {
		let n;
		r
			? (n = this.AllShareSkillCdData)
			: ((d = l.Id),
				(s = void 0),
				(n = this.EntitySkillCdMap.get(d)) ||
					((n =
						l.GetComponent(0).IsRole() &&
						((C = l.GetComponent(0).GetPbDataId()),
						(s = this.OffRoleSkillCdMap.get(C)))
							? (this.OffRoleSkillCdMap.delete(C), s)
							: new SkillCdData()),
					this.EntitySkillCdMap.set(d, n)));
		var d,
			s,
			C = n.SkillId2GroupIdMap.get(e);
		if (C) {
			const t = n.GroupSkillCdInfoMap.get(C);
			return (t.SkillCdInfoMap.get(e).SkillCd = i), t.EntityIds.add(l.Id), t;
		}
		0 !== a &&
			a < 1e3 &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error("Battle", 18, "自定义的冷却组不能小于1000", [
				"skillId",
				e,
			]),
			(C = n.GenerateCdShareGroupId(a));
		let S = n.GroupSkillCdInfoMap.get(C);
		S ||
			(((S = new GroupSkillCdInfo_1.GroupSkillCdInfo()).GroupId = C),
			(S.CurMaxCd = 0),
			(S.CurRemainingCd = 0),
			(S.CurRemainingDelayCd = 0),
			(S.MaxCount = o),
			(S.LimitCount = o),
			(S.RemainingCount = o),
			0 !== a
				? this.$We(n.ServerGroupSkillCd, a, S, e)
				: this.$We(n.ServerSkillCd, e, S, e),
			n.GroupSkillCdInfoMap.set(C, S));
		const k = new GroupSkillCdInfo_1.SkillCdInfo();
		return (
			(k.SkillId = e),
			(k.SkillCd = i),
			(k.CdDelay = t),
			(k.IsShareAllCdSkill = r),
			o !== S.MaxCount &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Battle",
					18,
					"同一个冷却组的技能，可使用次数配置不一致",
					["skillId", k.SkillId],
				),
			S.SkillCdInfoMap.set(e, k),
			n.SkillId2GroupIdMap.set(e, C),
			S.EntityIds.add(l.Id),
			S
		);
	}
	$We(l, e, i, t) {
		var o = l.get(e);
		if (o) {
			if (0 < o.length) {
				var a = Time_1.Time.ServerTimeStamp;
				let l = 0,
					e = 0;
				for (const r of o)
					r <= a ||
						(1 == ++l
							? ((i.CurRemainingCd = (r - a) * TimeUtil_1.TimeUtil.Millisecond),
								(i.CurMaxCd = i.CurRemainingCd))
							: (i.SkillIdQueue.Push(t),
								i.CdQueue.Push((r - e) * TimeUtil_1.TimeUtil.Millisecond)),
						(e = r));
				i.RemainingCount -= l;
			}
			l.delete(e);
		}
	}
	InitMultiSkill(l) {
		var e = this.MultiSkillMap.get(l);
		return (
			e
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 18, "重复初始化多段技能", ["entityId", l])
				: ((e = new MultiSkillData_1.MultiSkillData()),
					this.MultiSkillMap.set(l, e)),
			e
		);
	}
	RemoveEntity(l) {
		var e = l.Id,
			i = this.EntitySkillCdMap.get(e);
		if (i && (this.EntitySkillCdMap.delete(e), l.GetComponent(0).IsRole())) {
			l = l.GetComponent(0).GetPbDataId();
			for (const l of i.GroupSkillCdInfoMap.values()) l.EntityIds.clear();
			this.OffRoleSkillCdMap.set(l, i);
		}
		for (const l of this.AllShareSkillCdData.GroupSkillCdInfoMap.values())
			l.EntityIds.delete(e);
		this.RemoveMultiSkill(e);
	}
	RemoveMultiSkill(l) {
		this.MultiSkillMap.has(l) && this.MultiSkillMap.delete(l);
	}
	Tick(l) {
		for (const e of this.EntitySkillCdMap.values()) e.Tick(l);
		this.AllShareSkillCdData.Tick(l);
		for (const e of this.OffRoleSkillCdMap.values()) e.Tick(l);
		for (const e of this.MultiSkillMap.values()) e.OnTick(l);
	}
	HandlePlayerSkillInfoPbNotify(l) {
		if (l.uxs) {
			var e = l.uxs.lxs;
			e && this.YWe(this.AllShareSkillCdData, e);
			for (const e of l.uxs._xs)
				if (e.hxs) {
					let l = this.QWe(e.axs);
					l || ((l = new SkillCdData()), this.OffRoleSkillCdMap.set(e.axs, l)),
						this.YWe(l, e.hxs);
				}
		}
	}
	YWe(l, e) {
		var i = Time_1.Time.ServerTimeStamp;
		for (const t of e.nxs)
			this.JWe(t, i, l.ServerSkillCd, t.vkn), this.zWe(l, t, 0);
		for (const o of e.sxs) {
			var t = o.oxs;
			t && (this.JWe(t, i, l.ServerGroupSkillCd, o.rxs), this.zWe(l, t, o.rxs));
		}
	}
	zWe(l, e, i = 0) {
		var t = l.SkillId2GroupIdMap.get(e.vkn);
		return (
			!!t &&
			!!(t = l.GroupSkillCdInfoMap.get(t)) &&
			(0 !== i
				? this.$We(l.ServerSkillCd, i, t, e.vkn)
				: this.$We(l.ServerSkillCd, e.vkn, t, e.vkn),
			!0)
		);
	}
	JWe(l, e, i, t) {
		var o = [];
		for (const i of l.ixs) {
			var a = MathUtils_1.MathUtils.LongToNumber(i);
			e < a && o.push(a);
		}
		0 < o.length && (1 < o.length && o.sort((l, e) => l - e), i.set(t, o));
	}
	QWe(l) {
		const e = this.OffRoleSkillCdMap.get(l);
		if (e) return e;
		for (const [e, t] of this.EntitySkillCdMap) {
			var i = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
			if (
				i?.Valid &&
				((i = i.Entity),
				!t &&
					i.GetComponent(0).IsRole() &&
					i.GetComponent(0).GetPbDataId() === l)
			)
				return t;
		}
	}
}
exports.WorldSkillCdData = WorldSkillCdData;
