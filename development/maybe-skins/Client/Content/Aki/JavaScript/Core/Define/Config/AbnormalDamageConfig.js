"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AbnormalDamageConfig = void 0);
class AbnormalDamageConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Level() {
		return this.level();
	}
	get Abnormal1001() {
		return this.abnormal1001();
	}
	get Abnormal1002() {
		return this.abnormal1002();
	}
	get Abnormal1003() {
		return this.abnormal1003();
	}
	get Abnormal1004() {
		return this.abnormal1004();
	}
	get Abnormal1005() {
		return this.abnormal1005();
	}
	get Abnormal1006() {
		return this.abnormal1006();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsAbnormalDamageConfig(t, r) {
		return (r || new AbnormalDamageConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	level() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	abnormal1001() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	abnormal1002() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	abnormal1003() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	abnormal1004() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	abnormal1005() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	abnormal1006() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.AbnormalDamageConfig = AbnormalDamageConfig;
//# sourceMappingURL=AbnormalDamageConfig.js.map
