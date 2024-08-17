"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomCollectTaskDesc = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntString_1 = require("./SubType/DicIntString");
class PhantomCollectTaskDesc {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Title() {
		return this.title();
	}
	get Desc() {
		return this.desc();
	}
	get JumpTo() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.jumptoLength(),
			(t) => this.jumpto(t)?.key(),
			(t) => this.jumpto(t)?.value(),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPhantomCollectTaskDesc(t, s) {
		return (s || new PhantomCollectTaskDesc()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	desc(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetJumptoAt(t, s) {
		return this.jumpto(t);
	}
	jumpto(t, s) {
		var i = this.J7.__offset(this.z7, 10);
		return i
			? (s || new DicIntString_1.DicIntString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	jumptoLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.PhantomCollectTaskDesc = PhantomCollectTaskDesc;
//# sourceMappingURL=PhantomCollectTaskDesc.js.map
