"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InitPhantomConfig = void 0);
class InitPhantomConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ItemId() {
		return this.itemid();
	}
	get RandGroupId() {
		return this.randgroupid();
	}
	get RandNum() {
		return this.randnum();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsInitPhantomConfig(t, i) {
		return (i || new InitPhantomConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	randgroupid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	randnum() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.InitPhantomConfig = InitPhantomConfig;
//# sourceMappingURL=InitPhantomConfig.js.map
