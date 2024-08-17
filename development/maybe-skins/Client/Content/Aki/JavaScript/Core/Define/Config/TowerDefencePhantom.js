"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerDefencePhantom = void 0);
class TowerDefencePhantom {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PhantomItemId() {
		return this.phantomitemid();
	}
	get PhantomName() {
		return this.phantomname();
	}
	get TypeTextId() {
		return this.typetextid();
	}
	get TypeIcon() {
		return this.typeicon();
	}
	get SkillGroup() {
		return this.skillgroup();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsTowerDefencePhantom(t, e) {
		return (e || new TowerDefencePhantom()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	phantomitemid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	phantomname(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	typetextid(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	typeicon(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	skillgroup() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TowerDefencePhantom = TowerDefencePhantom;
//# sourceMappingURL=TowerDefencePhantom.js.map
