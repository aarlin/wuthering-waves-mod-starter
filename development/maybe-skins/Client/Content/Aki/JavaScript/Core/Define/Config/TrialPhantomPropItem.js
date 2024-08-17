"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrialPhantomPropItem = void 0);
const ConfigPropValue_1 = require("./SubType/ConfigPropValue");
class TrialPhantomPropItem {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Prop() {
		return this.prop();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsTrialPhantomPropItem(t, r) {
		return (r || new TrialPhantomPropItem()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	prop(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r
			? (t || new ConfigPropValue_1.ConfigPropValue()).__init(
					this.J7.__indirect(this.z7 + r),
					this.J7,
				)
			: null;
	}
}
exports.TrialPhantomPropItem = TrialPhantomPropItem;
//# sourceMappingURL=TrialPhantomPropItem.js.map
