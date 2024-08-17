"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Popularity = void 0);
class Popularity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PopularityValue() {
		return this.popularityvalue();
	}
	get PopularityRating() {
		return this.popularityrating();
	}
	get NpcCount() {
		return this.npccount();
	}
	get NpcDialog() {
		return this.npcdialog();
	}
	get NpcDialogGirl() {
		return this.npcdialoggirl();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPopularity(t, i) {
		return (i || new Popularity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	popularityvalue() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	popularityrating(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	npccount() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	npcdialog(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	npcdialoggirl(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.Popularity = Popularity;
//# sourceMappingURL=Popularity.js.map
