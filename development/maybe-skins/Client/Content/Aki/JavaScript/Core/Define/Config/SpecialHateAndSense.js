"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialHateAndSense = void 0);
class SpecialHateAndSense {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get DescText() {
		return this.desctext();
	}
	get AiHateId() {
		return this.aihateid();
	}
	get FirstAiSenseId() {
		return this.firstaisenseid();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsSpecialHateAndSense(t, e) {
		return (e || new SpecialHateAndSense()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	desctext(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	aihateid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	firstaisenseid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SpecialHateAndSense = SpecialHateAndSense;
//# sourceMappingURL=SpecialHateAndSense.js.map
