"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FightFormation = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FightFormation {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get LimitRole() {
		return GameUtils_1.GameUtils.ConvertToArray(this.limitroleLength(), (t) =>
			this.limitrole(t),
		);
	}
	get LimitCount() {
		return GameUtils_1.GameUtils.ConvertToArray(this.limitcountLength(), (t) =>
			this.limitcount(t),
		);
	}
	get LitmitElement() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.litmitelementLength(),
			(t) => this.litmitelement(t),
		);
	}
	get Content() {
		return this.content();
	}
	get RecommendFormation() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.recommendformationLength(),
			(t) => this.recommendformation(t),
		);
	}
	get TrialRole() {
		return GameUtils_1.GameUtils.ConvertToArray(this.trialroleLength(), (t) =>
			this.trialrole(t),
		);
	}
	get AutoRole() {
		return GameUtils_1.GameUtils.ConvertToArray(this.autoroleLength(), (t) =>
			this.autorole(t),
		);
	}
	get ChooseRole() {
		return this.chooserole();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsFightFormation(t, i) {
		return (i || new FightFormation()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetLimitroleAt(t) {
		return this.limitrole(t);
	}
	limitrole(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	limitroleLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	limitroleArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetLimitcountAt(t) {
		return this.limitcount(t);
	}
	limitcount(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	limitcountLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	limitcountArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetLitmitelementAt(t) {
		return this.litmitelement(t);
	}
	litmitelement(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	litmitelementLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	litmitelementArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	content(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetRecommendformationAt(t) {
		return this.recommendformation(t);
	}
	recommendformation(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	recommendformationLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	recommendformationArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetTrialroleAt(t) {
		return this.trialrole(t);
	}
	trialrole(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	trialroleLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	trialroleArray() {
		var t = this.J7.__offset(this.z7, 16);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetAutoroleAt(t) {
		return this.autorole(t);
	}
	autorole(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	autoroleLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	autoroleArray() {
		var t = this.J7.__offset(this.z7, 18);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	chooserole() {
		var t = this.J7.__offset(this.z7, 20);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
}
exports.FightFormation = FightFormation;
//# sourceMappingURL=FightFormation.js.map
