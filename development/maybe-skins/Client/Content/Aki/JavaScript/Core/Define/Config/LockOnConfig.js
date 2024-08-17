"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LockOnConfig = void 0);
class LockOnConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Distance() {
		return this.distance();
	}
	get UpDistance() {
		return this.updistance();
	}
	get DownDistance() {
		return this.downdistance();
	}
	get SectorRadius() {
		return this.sectorradius();
	}
	get SectorAngle() {
		return this.sectorangle();
	}
	get ToleranceAngle() {
		return this.toleranceangle();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsLockOnConfig(t, s) {
		return (s || new LockOnConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	distance() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	updistance() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 300;
	}
	downdistance() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 800;
	}
	sectorradius() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sectorangle() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	toleranceangle() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readFloat32(this.z7 + t) : 22.5;
	}
}
exports.LockOnConfig = LockOnConfig;
//# sourceMappingURL=LockOnConfig.js.map
