"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UniversalActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class UniversalActivity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get UiResource() {
		return this.uiresource();
	}
	get FunctionType() {
		return this.functiontype();
	}
	get FunctionParams() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.functionparamsLength(),
			(t) => this.functionparams(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsUniversalActivity(t, i) {
		return (i || new UniversalActivity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	uiresource(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	functiontype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetFunctionparamsAt(t) {
		return this.functionparams(t);
	}
	functionparams(t, i) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	functionparamsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.UniversalActivity = UniversalActivity;
//# sourceMappingURL=UniversalActivity.js.map
