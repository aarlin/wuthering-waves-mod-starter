"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomMainPropItem = void 0);
class PhantomMainPropItem {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PropId() {
		return this.propid();
	}
	get AddType() {
		return this.addtype();
	}
	get StandardProperty() {
		return this.standardproperty();
	}
	get GrowthId() {
		return this.growthid();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsPhantomMainPropItem(t, r) {
		return (r || new PhantomMainPropItem()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	propid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	addtype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	standardproperty() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	growthid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhantomMainPropItem = PhantomMainPropItem;
//# sourceMappingURL=PhantomMainPropItem.js.map
