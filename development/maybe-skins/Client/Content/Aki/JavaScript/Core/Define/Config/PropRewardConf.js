"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PropRewardConf = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	ConfigPropValue_1 = require("./SubType/ConfigPropValue"),
	DicStringInt_1 = require("./SubType/DicStringInt");
class PropRewardConf {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Props() {
		return GameUtils_1.GameUtils.ConvertToArray(this.propsLength(), (t) =>
			this.props(t),
		);
	}
	get Tips() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.tipsLength(),
			(t) => this.tips(t)?.key(),
			(t) => this.tips(t)?.value(),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPropRewardConf(t, i) {
		return (i || new PropRewardConf()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPropsAt(t, i) {
		return this.props(t);
	}
	props(t, i) {
		var s = this.J7.__offset(this.z7, 6);
		return s
			? (i || new ConfigPropValue_1.ConfigPropValue()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	propsLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetTipsAt(t, i) {
		return this.tips(t);
	}
	tips(t, i) {
		var s = this.J7.__offset(this.z7, 8);
		return s
			? (i || new DicStringInt_1.DicStringInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	tipsLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.PropRewardConf = PropRewardConf;
//# sourceMappingURL=PropRewardConf.js.map
