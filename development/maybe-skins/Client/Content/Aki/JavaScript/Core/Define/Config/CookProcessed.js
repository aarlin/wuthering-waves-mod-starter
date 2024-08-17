"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookProcessed = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt"),
	OneItemConfig_1 = require("./SubType/OneItemConfig");
class CookProcessed {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get FinalItemId() {
		return this.finalitemid();
	}
	get Unlock() {
		return this.unlock();
	}
	get Name() {
		return this.name();
	}
	get ConsumeItemsId() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.consumeitemsidLength(),
			(t) => this.consumeitemsid(t),
		);
	}
	get LeastItemId() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.leastitemidLength(),
			(t) => this.leastitemid(t)?.key(),
			(t) => this.leastitemid(t)?.value(),
		);
	}
	get InterationId() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.interationidLength(),
			(t) => this.interationid(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCookProcessed(t, i) {
		return (i || new CookProcessed()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	finalitemid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	unlock() {
		var t = this.J7.__offset(this.z7, 8);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetConsumeitemsidAt(t, i) {
		return this.consumeitemsid(t);
	}
	consumeitemsid(t, i) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? (i || new OneItemConfig_1.OneItemConfig()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	consumeitemsidLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetLeastitemidAt(t, i) {
		return this.leastitemid(t);
	}
	leastitemid(t, i) {
		var s = this.J7.__offset(this.z7, 14);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	leastitemidLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetInterationidAt(t) {
		return this.interationid(t);
	}
	interationid(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	interationidLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	interationidArray() {
		var t = this.J7.__offset(this.z7, 16);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.CookProcessed = CookProcessed;
//# sourceMappingURL=CookProcessed.js.map
