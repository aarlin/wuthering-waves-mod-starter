"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillButtonMapping = void 0);
class SkillButtonMapping {
	constructor() {
		this.PEo = new Map();
	}
	Add(t, e) {
		for (const o of t) {
			let t = this.PEo.get(o);
			t ? t.add(e) : ((t = new Set()).add(e), this.PEo.set(o, t));
		}
	}
	AddSingle(t, e) {
		let o = this.PEo.get(t);
		o ? o.add(e) : ((o = new Set()).add(e), this.PEo.set(t, o));
	}
	RemoveSingle(t, e) {
		(t = this.PEo.get(t)) && t.delete(e);
	}
	Get(t) {
		return this.PEo.get(t);
	}
	Clear() {
		this.PEo.clear();
	}
}
exports.SkillButtonMapping = SkillButtonMapping;
