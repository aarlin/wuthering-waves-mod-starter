"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AxisRevert = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringInt_1 = require("./SubType/DicStringInt");
class AxisRevert {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RevertType() {
		return this.reverttype();
	}
	get AxisName() {
		return this.axisname();
	}
	get RevertInfo() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.revertinfoLength(),
			(t) => this.revertinfo(t)?.key(),
			(t) => this.revertinfo(t)?.value(),
		);
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsAxisRevert(t, e) {
		return (e || new AxisRevert()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	reverttype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	axisname(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	GetRevertinfoAt(t, e) {
		return this.revertinfo(t);
	}
	revertinfo(t, e) {
		var i = this.J7.__offset(this.z7, 10);
		return i
			? (e || new DicStringInt_1.DicStringInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	revertinfoLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.AxisRevert = AxisRevert;
//# sourceMappingURL=AxisRevert.js.map
