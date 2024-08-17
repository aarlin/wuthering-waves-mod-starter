"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SCreatureGenBlackboardMaps = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils"),
	DicStringBool_1 = require("./DicStringBool"),
	DicStringInt_1 = require("./DicStringInt"),
	DicStringString_1 = require("./DicStringString");
class SCreatureGenBlackboardMaps {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get MapString() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.mapstringLength(),
			(t) => this.mapstring(t)?.key(),
			(t) => this.mapstring(t)?.value(),
		);
	}
	get MapInt() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.mapintLength(),
			(t) => this.mapint(t)?.key(),
			(t) => this.mapint(t)?.value(),
		);
	}
	get MapBool() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.mapboolLength(),
			(t) => this.mapbool(t)?.key(),
			(t) => this.mapbool(t)?.value(),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSCreatureGenBlackboardMaps(t, i) {
		return (i || new SCreatureGenBlackboardMaps()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	GetMapstringAt(t, i) {
		return this.mapstring(t);
	}
	mapstring(t, i) {
		var r = this.J7.__offset(this.z7, 4);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	mapstringLength() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetMapintAt(t, i) {
		return this.mapint(t);
	}
	mapint(t, i) {
		var r = this.J7.__offset(this.z7, 6);
		return r
			? (i || new DicStringInt_1.DicStringInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	mapintLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetMapboolAt(t, i) {
		return this.mapbool(t);
	}
	mapbool(t, i) {
		var r = this.J7.__offset(this.z7, 8);
		return r
			? (i || new DicStringBool_1.DicStringBool()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	mapboolLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.SCreatureGenBlackboardMaps = SCreatureGenBlackboardMaps;
//# sourceMappingURL=SCreatureGenBlackboardMaps.js.map
