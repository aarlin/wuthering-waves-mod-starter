"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiNormalConfig = void 0);
class UiNormalConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ViewName() {
		return this.viewname();
	}
	get SortIndex() {
		return this.sortindex();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsUiNormalConfig(t, i) {
		return (i || new UiNormalConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	viewname(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	sortindex() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : -1;
	}
}
exports.UiNormalConfig = UiNormalConfig;
//# sourceMappingURL=UiNormalConfig.js.map
