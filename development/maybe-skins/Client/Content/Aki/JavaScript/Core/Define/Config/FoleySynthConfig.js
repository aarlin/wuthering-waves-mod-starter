"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FoleySynthConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FoleySynthConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get Model1Config() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.model1configLength(),
			(t) => this.model1config(t),
		);
	}
	get Model2Config() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.model2configLength(),
			(t) => this.model2config(t),
		);
	}
	get Model2AccMaxCount() {
		return this.model2accmaxcount();
	}
	get Model2VelMaxCount() {
		return this.model2velmaxcount();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsFoleySynthConfig(t, i) {
		return (i || new FoleySynthConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetModel1configAt(t) {
		return this.model1config(t);
	}
	model1config(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	model1configLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	model1configArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetModel2configAt(t) {
		return this.model2config(t);
	}
	model2config(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	model2configLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	model2configArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	model2accmaxcount() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 10;
	}
	model2velmaxcount() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 5;
	}
}
exports.FoleySynthConfig = FoleySynthConfig;
//# sourceMappingURL=FoleySynthConfig.js.map
