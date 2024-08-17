"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StringArray = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils");
class StringArray {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ArrayString() {
		return GameUtils_1.GameUtils.ConvertToArray(this.arraystringLength(), (t) =>
			this.arraystring(t),
		);
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsStringArray(t, r) {
		return (r || new StringArray()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	GetArraystringAt(t) {
		return this.arraystring(t);
	}
	arraystring(t, r) {
		var s = this.J7.__offset(this.z7, 4);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, r)
			: null;
	}
	arraystringLength() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.StringArray = StringArray;
//# sourceMappingURL=StringArray.js.map
