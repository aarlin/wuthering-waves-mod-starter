"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomQuality = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class PhantomQuality {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Quality() {
		return this.quality();
	}
	get LevelLimit() {
		return this.levellimit();
	}
	get SlotUnlockLevel() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.slotunlocklevelLength(),
			(t) => this.slotunlocklevel(t),
		);
	}
	get IdentifyCost() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.identifycostLength(),
			(t) => this.identifycost(t)?.key(),
			(t) => this.identifycost(t)?.value(),
		);
	}
	get IdentifyCoin() {
		return this.identifycoin();
	}
	get QualitySprite() {
		return this.qualitysprite();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPhantomQuality(t, i) {
		return (i || new PhantomQuality()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	quality() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levellimit() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetSlotunlocklevelAt(t) {
		return this.slotunlocklevel(t);
	}
	slotunlocklevel(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	slotunlocklevelLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	slotunlocklevelArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetIdentifycostAt(t, i) {
		return this.identifycost(t);
	}
	identifycost(t, i) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	identifycostLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	identifycoin() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	qualitysprite(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.PhantomQuality = PhantomQuality;
//# sourceMappingURL=PhantomQuality.js.map
