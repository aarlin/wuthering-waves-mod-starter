"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DailyTaskGroup = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DailyTaskGroup {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TaskIds() {
		return GameUtils_1.GameUtils.ConvertToArray(this.taskidsLength(), (t) =>
			this.taskids(t),
		);
	}
	get TypeId() {
		return this.typeid();
	}
	get CountryId() {
		return this.countryid();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsDailyTaskGroup(t, s) {
		return (s || new DailyTaskGroup()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetTaskidsAt(t) {
		return this.taskids(t);
	}
	taskids(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	taskidsLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	taskidsArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	typeid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	countryid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.DailyTaskGroup = DailyTaskGroup;
//# sourceMappingURL=DailyTaskGroup.js.map
