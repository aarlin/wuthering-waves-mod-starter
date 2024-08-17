"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GenericPromptTypes = void 0);
class GenericPromptTypes {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get TypeId() {
		return this.typeid();
	}
	get GeneralText() {
		return this.generaltext();
	}
	get GeneralExtraText() {
		return this.generalextratext();
	}
	get TextColor() {
		return this.textcolor();
	}
	get Duration() {
		return this.duration();
	}
	get Priority() {
		return this.priority();
	}
	get ShowArea() {
		return this.showarea();
	}
	get MaxCount() {
		return this.maxcount();
	}
	get OnlyBattle() {
		return this.onlybattle();
	}
	get Tickable() {
		return this.tickable();
	}
	get UiPath() {
		return this.uipath();
	}
	get OffsetY() {
		return this.offsety();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsGenericPromptTypes(t, r) {
		return (r || new GenericPromptTypes()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	typeid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	generaltext(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	generalextratext(t) {
		var r = this.J7.__offset(this.z7, 8);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	textcolor(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	duration() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	priority() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showarea(t) {
		var r = this.J7.__offset(this.z7, 16);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	maxcount() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	onlybattle() {
		var t = this.J7.__offset(this.z7, 20);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	tickable() {
		var t = this.J7.__offset(this.z7, 22);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	uipath(t) {
		var r = this.J7.__offset(this.z7, 24);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	offsety() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
}
exports.GenericPromptTypes = GenericPromptTypes;
//# sourceMappingURL=GenericPromptTypes.js.map
