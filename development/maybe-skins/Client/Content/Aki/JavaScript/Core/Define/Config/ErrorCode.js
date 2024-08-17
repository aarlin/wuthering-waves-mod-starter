"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ErrorCode = void 0);
class ErrorCode {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get DebugText() {
		return this.debugtext();
	}
	get Text() {
		return this.text();
	}
	get IsTip() {
		return this.istip();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsErrorCode(t, r) {
		return (r || new ErrorCode()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	debugtext(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	text(t) {
		var r = this.J7.__offset(this.z7, 8);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	istip() {
		var t = this.J7.__offset(this.z7, 10);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.ErrorCode = ErrorCode;
//# sourceMappingURL=ErrorCode.js.map
