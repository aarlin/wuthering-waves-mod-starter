"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputDistributeTag = void 0);
class InputDistributeTag {
	constructor(t, r) {
		(this.Gmr = new Set()), (this.Nmr = t);
		let e = (this.Omr = r);
		for (; e; ) {
			var s = e.TagName;
			this.Gmr.add(s), (e = e.ParentTag);
		}
	}
	get TagName() {
		return this.Nmr;
	}
	get ParentTag() {
		return this.Omr;
	}
	MatchTag(t, r = !1) {
		return this.Nmr === t || (!r && this.Gmr.has(t));
	}
}
exports.InputDistributeTag = InputDistributeTag;
