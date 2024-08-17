"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LordGymEntrance = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class LordGymEntrance {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MarkId() {
		return this.markid();
	}
	get LordGymList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.lordgymlistLength(), (t) =>
			this.lordgymlist(t),
		);
	}
	get EntranceTitle() {
		return this.entrancetitle();
	}
	get EntranceDescription() {
		return this.entrancedescription();
	}
	get IsDebug() {
		return this.isdebug();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsLordGymEntrance(t, r) {
		return (r || new LordGymEntrance()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	markid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetLordgymlistAt(t) {
		return this.lordgymlist(t);
	}
	lordgymlist(t) {
		var r = this.J7.__offset(this.z7, 8);
		return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
	}
	lordgymlistLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	lordgymlistArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	entrancetitle(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	entrancedescription(t) {
		var r = this.J7.__offset(this.z7, 12);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	isdebug() {
		var t = this.J7.__offset(this.z7, 14);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.LordGymEntrance = LordGymEntrance;
//# sourceMappingURL=LordGymEntrance.js.map
