"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MotionModel = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem");
class MotionModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.cbi = new Map()),
			(this.mbi = new Map()),
			(this.dbi = new Map()),
			(this.Cbi = new Map());
	}
	OnMotionUnlock(t, e) {
		this.gbi(t, e),
			this.fbi(t, e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.UpdateRoleFavorData,
				t,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.UnLockRoleFavorItem,
				t,
				e,
			);
	}
	OnNewMotionCanUnlock(t, e) {
		this.gbi(t, e), this.pbi(t, e);
	}
	OnRoleMotionActive(t) {
		t.GLs.qLs.forEach((e) => {
			this.gbi(t.GLs.l3n, e.Ekn),
				e.n3n === Protocol_1.Aki.Protocol.cks.Proto_ItemLocked
					? this.vbi(t.GLs.l3n, e.Ekn)
					: e.n3n === Protocol_1.Aki.Protocol.cks.Proto_ItemUnLocked
						? this.fbi(t.GLs.l3n, e.Ekn)
						: e.n3n === Protocol_1.Aki.Protocol.cks.Proto_ItemCanUnLock &&
							this.pbi(t.GLs.l3n, e.Ekn);
		});
	}
	OnGetAllRoleMotionInfo(t) {
		this.cbi.clear(),
			this.dbi.clear(),
			this.mbi.clear(),
			t.OLs.forEach((t) => {
				t.qLs.forEach((e) => {
					this.gbi(t.l3n, e.Ekn),
						e.n3n === Protocol_1.Aki.Protocol.cks.Proto_ItemLocked
							? this.vbi(t.l3n, e.Ekn)
							: e.n3n === Protocol_1.Aki.Protocol.cks.Proto_ItemUnLocked
								? this.fbi(t.l3n, e.Ekn)
								: e.n3n === Protocol_1.Aki.Protocol.cks.Proto_ItemCanUnLock &&
									this.pbi(t.l3n, e.Ekn);
				});
			});
		var e = t.LLs;
		for (const t of Object.keys(e)) {
			var o = Number(t);
			this.UpdateCondition(o, e[o]);
		}
	}
	OnMotionFinishCondition(t) {
		var e = t.LLs;
		for (const t of Object.keys(e)) {
			var o = Number(t);
			this.UpdateCondition(o, e[o]);
		}
	}
	GetRoleMotionState(t, e) {
		let o = this.cbi.get(t);
		return o && o.has(e)
			? 2
			: ((o = this.dbi.get(t)) && o.has(e)) ||
					!(o = this.mbi.get(t)) ||
					!o.has(e)
				? 0
				: 1;
	}
	IsCondtionFinish(t, e, o) {
		if ((t = this.Cbi.get(t)) && (t = t.get(0))) {
			var i = t.get(e);
			if (i) {
				var n = i.length;
				for (let t = 0; t < n; t++) if (i[t] === o) return !0;
			}
		}
		return !1;
	}
	UpdateCondition(t, e) {
		var o = this.Cbi.get(t) ?? new Map(),
			i = e.wLs;
		for (const t of Object.keys(i)) {
			var n = Number(t),
				s = i[n].ULs,
				r = o.get(n) ?? new Map();
			for (const t of Object.keys(s)) {
				var a = Number(t),
					c = s[a].PLs,
					l = r.get(a) ?? [],
					b = c.length;
				for (let t = 0; t < b; t++) {
					var h = c[t];
					l.push(h);
				}
				r.set(a, l);
			}
			o.set(n, r);
		}
		this.Cbi.set(t, o);
	}
	gbi(t, e) {
		var o;
		(o =
			((o = ((o = this.cbi.get(t)) && o.delete(e), this.dbi.get(t))) &&
				o.delete(e),
			this.mbi.get(t))) && o.delete(e);
	}
	fbi(t, e) {
		var o = this.cbi.get(t);
		o ? o.add(e) : ((o = new Set()).add(e), this.cbi.set(t, o));
	}
	pbi(t, e) {
		var o = this.mbi.get(t);
		o ? o.add(e) : ((o = new Set()).add(e), this.mbi.set(t, o));
	}
	vbi(t, e) {
		var o = this.dbi.get(t);
		o ? o.add(e) : ((o = new Set()).add(e), this.dbi.set(t, o));
	}
	IfRoleMotionCanUnlock(t) {
		return !!(t = this.mbi.get(t)) && 0 < t.size;
	}
}
exports.MotionModel = MotionModel;
