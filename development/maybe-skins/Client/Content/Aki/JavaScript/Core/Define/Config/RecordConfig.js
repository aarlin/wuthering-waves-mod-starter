"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RecordConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringString_1 = require("./SubType/DicStringString");
class RecordConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get LimitParams() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.limitparamsLength(),
			(t) => this.limitparams(t)?.key(),
			(t) => this.limitparams(t)?.value(),
		);
	}
	get ProgressNeed() {
		return this.progressneed();
	}
	get SaveRecord() {
		return this.saverecord();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRecordConfig(t, i) {
		return (i || new RecordConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetLimitparamsAt(t, i) {
		return this.limitparams(t);
	}
	limitparams(t, i) {
		var r = this.J7.__offset(this.z7, 6);
		return r
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	limitparamsLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	progressneed() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	saverecord() {
		var t = this.J7.__offset(this.z7, 10);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
}
exports.RecordConfig = RecordConfig;
//# sourceMappingURL=RecordConfig.js.map
