"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterDisplay = void 0);
class MonsterDisplay {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get NameStringKey() {
		return this.namestringkey();
	}
	get Name() {
		return this.name();
	}
	get IntroduceStringKey() {
		return this.introducestringkey();
	}
	get Introduce() {
		return this.introduce();
	}
	get MonsterPileIconAsset() {
		return this.monsterpileiconasset();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsMonsterDisplay(t, s) {
		return (s || new MonsterDisplay()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	namestringkey() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	introducestringkey() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	introduce() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	monsterpileiconasset(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.MonsterDisplay = MonsterDisplay;
//# sourceMappingURL=MonsterDisplay.js.map
