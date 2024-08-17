"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Interjection = void 0);
class Interjection {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TimberId() {
		return this.timberid();
	}
	get UniversalToneId() {
		return this.universaltoneid();
	}
	get AkEvent() {
		return this.akevent();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsInterjection(t, e) {
		return (e || new Interjection()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	timberid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	universaltoneid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	akevent(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.Interjection = Interjection;
//# sourceMappingURL=Interjection.js.map
