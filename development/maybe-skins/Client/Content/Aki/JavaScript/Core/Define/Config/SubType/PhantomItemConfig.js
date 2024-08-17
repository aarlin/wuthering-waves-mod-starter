"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomItemConfig = void 0);
class PhantomItemConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ItemId() {
		return this.itemid();
	}
	get Level() {
		return this.level();
	}
	get MainType() {
		return this.maintype();
	}
	get MainVal() {
		return this.mainval();
	}
	get SubProperty() {
		return this.subproperty();
	}
	get SubVal() {
		return this.subval();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPhantomItemConfig(t, i) {
		return (i || new PhantomItemConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maintype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mainval() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	subproperty() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	subval() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhantomItemConfig = PhantomItemConfig;
//# sourceMappingURL=PhantomItemConfig.js.map
