"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletHitCountUtil = void 0);
class BulletHitCountUtil {
	static HitCountCondition(t, i) {
		if (t.CountByParent && t.ParentBulletInfo)
			return BulletHitCountUtil.HitCountCondition(t.ParentBulletInfo, i);
		let e = i;
		if (!e) return !1;
		if (
			((i = e.GetComponent(47)) && (e = i.GetAttributeHolder()),
			0 <= (i = t.BulletDataMain).Base.VictimCount &&
				t.EntityHitCount.size >= i.Base.VictimCount &&
				!t.EntityHitCount.has(e.Id))
		)
			return !1;
		if (0 <= i.Base.HitCountMax && t.HitNumberAll >= i.Base.HitCountMax)
			return !1;
		var n = t.EntityHitCount.get(e.Id);
		if (n) {
			if (0 < i.Base.HitCountPerVictim && n >= i.Base.HitCountPerVictim)
				return !1;
			t.EntityHitCount.set(e.Id, n + 1);
		} else t.EntityHitCount.set(e.Id, 1);
		return t.HitNumberAll++, !0;
	}
	static AddHitCount(t, i) {
		var e;
		t.CountByParent && t.ParentBulletInfo
			? BulletHitCountUtil.AddHitCount(t.ParentBulletInfo, i)
			: ((e = t.EntityHitCount.get(i.Id) ?? 0),
				t.EntityHitCount.set(i.Id, e + 1),
				t.HitNumberAll++);
	}
	static CheckHitCountPerVictim(t, i) {
		var e, n;
		return t.CountByParent && t.ParentBulletInfo
			? BulletHitCountUtil.CheckHitCountPerVictim(t.ParentBulletInfo, i)
			: ((n = t.EntityHitCount.size),
				!(
					(0 <= (e = t.BulletDataMain).Base.VictimCount &&
						n >= e.Base.VictimCount &&
						!t.EntityHitCount.has(i.Id)) ||
					((n = t.EntityHitCount.get(i.Id) ?? 0),
					0 <= e.Base.HitCountPerVictim && n >= e.Base.HitCountPerVictim) ||
					(0 < e.Base.HitCountMax && t.HitNumberAll >= e.Base.HitCountMax)
				));
	}
	static CheckHitCountTotal(t) {
		var i;
		return t.CountByParent && t.ParentBulletInfo
			? BulletHitCountUtil.CheckHitCountTotal(t.ParentBulletInfo)
			: (i = t.BulletDataMain).Logic.DestroyOnCountZero &&
					0 < i.Base.HitCountMax &&
					t.HitNumberAll >= i.Base.HitCountMax;
	}
}
exports.BulletHitCountUtil = BulletHitCountUtil;
