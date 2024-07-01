"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldPassiveSkillCdData = exports.PassiveSkillCdData = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	PassiveSkillCdInfo_1 = require("./PassiveSkillCdInfo");
class PassiveSkillCdData {
	constructor() {
		(this.SkillCdInfoMap = new Map()), (this.ServerSkillCd = new Map());
	}
	Tick(l) {
		for (const e of this.SkillCdInfoMap.values()) e.Tick(l);
	}
	Clear() {
		this.SkillCdInfoMap.clear();
	}
}
exports.PassiveSkillCdData = PassiveSkillCdData;
class WorldPassiveSkillCdData {
	constructor() {
		(this.EntitySkillCdMap = new Map()),
			(this.AllShareSkillCdData = new PassiveSkillCdData()),
			(this.OffRoleSkillCdMap = new Map());
	}
	Clear() {
		this.EntitySkillCdMap.clear(),
			this.AllShareSkillCdData.Clear(),
			this.OffRoleSkillCdMap.clear();
	}
	InitPassiveSkillCd(l, e) {
		return this.InitSkillCdCommon(l, e.Id, e.CDTime, e.IsShareAllCdSkill);
	}
	InitSkillCdCommon(l, e, i, t) {
		let a;
		var s, o, d;
		t
			? (a = this.AllShareSkillCdData)
			: ((s = l.Id),
				(d = void 0),
				(a = this.EntitySkillCdMap.get(s)) ||
					((a =
						l.GetComponent(0).IsRole() &&
						((o = l.GetComponent(0).GetPbDataId()),
						(d = this.OffRoleSkillCdMap.get(o)))
							? (this.OffRoleSkillCdMap.delete(o), d)
							: new PassiveSkillCdData()),
					this.EntitySkillCdMap.set(s, a)));
		let n = a.SkillCdInfoMap.get(e);
		return (
			n ||
				(((n = new PassiveSkillCdInfo_1.PassiveSkillCdInfo()).SkillId = e),
				(n.SkillCd = i),
				(n.IsShareAllCdSkill = t),
				(n.CurMaxCd = 0),
				(n.CurRemainingCd = 0),
				(o = a.ServerSkillCd.get(e)) &&
					((d = Time_1.Time.ServerTimeStamp) < o &&
						(n.CurRemainingCd = (o - d) * TimeUtil_1.TimeUtil.Millisecond),
					a.ServerSkillCd.delete(e)),
				a.SkillCdInfoMap.set(e, n)),
			n.EntityIds.add(l.Id),
			n
		);
	}
	RemoveEntity(l) {
		var e = l.Id,
			i = this.EntitySkillCdMap.get(e);
		if (i && (this.EntitySkillCdMap.delete(e), l.GetComponent(0).IsRole())) {
			l = l.GetComponent(0).GetPbDataId();
			for (const l of i.SkillCdInfoMap.values()) l.EntityIds.clear();
			this.OffRoleSkillCdMap.set(l, i);
		}
		for (const l of this.AllShareSkillCdData.SkillCdInfoMap.values())
			l.EntityIds.delete(e);
	}
	Tick(l) {
		for (const e of this.EntitySkillCdMap.values()) e.Tick(l);
		this.AllShareSkillCdData.Tick(l);
		for (const e of this.OffRoleSkillCdMap.values()) e.Tick(l);
	}
	HandlePassiveSkillNotify(l) {
		var e = Time_1.Time.ServerTimeStamp;
		for (const s of l.pUs) {
			let l = this.QWe(s.l3n);
			l ||
				((l = new PassiveSkillCdData()), this.OffRoleSkillCdMap.set(s.l3n, l));
			for (const o of s.vUs) {
				var i,
					t,
					a = MathUtils_1.MathUtils.LongToNumber(o.fUs);
				a <= e ||
					((i = MathUtils_1.MathUtils.LongToBigInt(o.vkn)),
					(t = l.SkillCdInfoMap.get(i))
						? (t.CurRemainingCd = (a - e) * TimeUtil_1.TimeUtil.Millisecond)
						: l.ServerSkillCd.set(i, a));
			}
		}
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
exports.WorldPassiveSkillCdData = WorldPassiveSkillCdData;
