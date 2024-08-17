"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlockSwitch = void 0);
class BlockSwitch {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Block() {
		return this.block();
	}
	get MapTilePath() {
		return this.maptilepath();
	}
	get MiniMapTilePath() {
		return this.minimaptilepath();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsBlockSwitch(t, i) {
		return (i || new BlockSwitch()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	block(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	maptilepath(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	minimaptilepath(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.BlockSwitch = BlockSwitch;
//# sourceMappingURL=BlockSwitch.js.map
