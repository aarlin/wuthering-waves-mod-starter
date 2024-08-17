"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponQualityInfo = void 0);
class WeaponQualityInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get QualityColor() {
		return this.qualitycolor();
	}
	get LevelLimit() {
		return this.levellimit();
	}
	get Cost() {
		return this.cost();
	}
	get BasicExp() {
		return this.basicexp();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsWeaponQualityInfo(t, i) {
		return (i || new WeaponQualityInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	qualitycolor(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	levellimit() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	cost() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	basicexp() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.WeaponQualityInfo = WeaponQualityInfo;
//# sourceMappingURL=WeaponQualityInfo.js.map
