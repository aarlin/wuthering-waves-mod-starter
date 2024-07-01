"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemBuffModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class SceneItemBuffModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.Knr = new Map());
	}
	Add(e, t, r) {
		let s = this.Knr.get(e),
			n = (s || ((s = new Map()), this.Knr.set(e, s)), s.get(t));
		return (
			n || ((n = new Array()), s.set(t, n)), !n.includes(r) && (n.push(r), !0)
		);
	}
	Remove(e, t, r, s) {
		let n = new Array();
		var o,
			l = this.Knr.get(e);
		return (
			l &&
				((o = l.get(t)) &&
					(s
						? -1 < (s = o.indexOf(s)) && (n = o.splice(s, r))
						: (n = o.splice(0, -1 === r ? o.length : r)),
					0 === o.length) &&
					l.delete(t),
				0 === l.size) &&
				this.Knr.delete(e),
			n
		);
	}
	RemoveAll(e) {
		return this.Knr.delete(e);
	}
	Switch(e, t) {
		var r = this.Knr.get(e),
			s = this.Knr.get(t);
		return !(r || !s || (this.Knr.set(e, s), this.Knr.delete(t), 0));
	}
	GetSceneItemIds(e) {
		if ((e = this.Knr.get(e))) {
			var t = new Array();
			for (const r of e.values()) for (const e of r) t.push(e);
			return t;
		}
	}
}
exports.SceneItemBuffModel = SceneItemBuffModel;
