"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotographHandBook = void 0);
class PhotographHandBook {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get Name() {
		return this.name();
	}
	get MaleTexture() {
		return this.maletexture();
	}
	get FemaleTexture() {
		return this.femaletexture();
	}
	get Descrtption() {
		return this.descrtption();
	}
	get AreaIcon() {
		return this.areaicon();
	}
	get AreaNumber() {
		return this.areanumber();
	}
	get RoleName() {
		return this.rolename();
	}
	get QuestId() {
		return this.questid();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsPhotographHandBook(t, r) {
		return (r || new PhotographHandBook()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var r = this.J7.__offset(this.z7, 8);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	maletexture(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	femaletexture(t) {
		var r = this.J7.__offset(this.z7, 12);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	descrtption(t) {
		var r = this.J7.__offset(this.z7, 14);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	areaicon(t) {
		var r = this.J7.__offset(this.z7, 16);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	areanumber(t) {
		var r = this.J7.__offset(this.z7, 18);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	rolename(t) {
		var r = this.J7.__offset(this.z7, 20);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	questid() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhotographHandBook = PhotographHandBook;
//# sourceMappingURL=PhotographHandBook.js.map
