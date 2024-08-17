"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BehaviorButtonMapping = void 0);
class BehaviorButtonMapping {
	constructor() {
		this._Ze = new Map();
	}
	Add(e, t) {
		for (const s of e) {
			let e = this._Ze.get(s);
			e ? e.add(t) : ((e = new Set()).add(t), this._Ze.set(s, e));
		}
	}
	AddSingle(e, t) {
		let s = this._Ze.get(e);
		s ? s.add(t) : ((s = new Set()).add(t), this._Ze.set(e, s));
	}
	Get(e) {
		return this._Ze.get(e);
	}
	GetAllKey() {
		return this._Ze.keys();
	}
	Clear() {
		this._Ze.clear();
	}
}
exports.BehaviorButtonMapping = BehaviorButtonMapping;
