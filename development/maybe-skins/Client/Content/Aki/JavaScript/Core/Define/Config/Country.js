"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Country = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class Country {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Influences() {
		return GameUtils_1.GameUtils.ConvertToArray(this.influencesLength(), (t) =>
			this.influences(t),
		);
	}
	get Title() {
		return this.title();
	}
	get Desc() {
		return this.desc();
	}
	get Logo() {
		return this.logo();
	}
	get DailyTaskShow() {
		return this.dailytaskshow();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsCountry(t, s) {
		return (s || new Country()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetInfluencesAt(t) {
		return this.influences(t);
	}
	influences(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	influencesLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	influencesArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	title(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	desc(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	logo(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	dailytaskshow() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
}
exports.Country = Country;
//# sourceMappingURL=Country.js.map
