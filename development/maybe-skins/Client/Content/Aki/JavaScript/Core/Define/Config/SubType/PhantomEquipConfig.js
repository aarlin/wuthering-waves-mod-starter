"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomEquipConfig = void 0);
class PhantomEquipConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ItemId() {
		return this.itemid();
	}
	get Level() {
		return this.level();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPhantomEquipConfig(t, i) {
		return (i || new PhantomEquipConfig()).__init(
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
}
exports.PhantomEquipConfig = PhantomEquipConfig;
//# sourceMappingURL=PhantomEquipConfig.js.map
