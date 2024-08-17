"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorConditionModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class RoleFavorConditionModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.Cbi = new Map());
	}
	UpdateRoleFavorCondtion(e, o) {
		var t = this.Cbi.get(e) ?? new Map(),
			r = o.wLs;
		for (const e of Object.keys(r)) {
			var s = Number(e),
				i = r[s].ULs,
				n = t.get(s) ?? new Map();
			for (const e of Object.keys(i)) {
				var a = Number(e),
					l = i[a].PLs,
					d = n.get(a) ?? [],
					v = l.length;
				for (let e = 0; e < v; e++) {
					var M = l[e];
					d.push(M);
				}
				n.set(a, d);
			}
			t.set(s, n);
		}
		this.Cbi.set(e, t);
	}
	IsCondtionFinish(e, o, t, r) {
		if ((e = this.Cbi.get(e)) && (e = e.get(o))) {
			var s = e.get(t);
			if (s) {
				var i = s.length;
				for (let e = 0; e < i; e++) if (s[e] === r) return !0;
			}
		}
		return !1;
	}
}
exports.RoleFavorConditionModel = RoleFavorConditionModel;
