"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShareReward = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class ShareReward {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ShareType() {
		return this.sharetype();
	}
	get ShareReward() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.sharerewardLength(),
			(t) => this.sharereward(t)?.key(),
			(t) => this.sharereward(t)?.value(),
		);
	}
	get UpdateType() {
		return this.updatetype();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsShareReward(t, e) {
		return (e || new ShareReward()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sharetype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetSharerewardAt(t, e) {
		return this.sharereward(t);
	}
	sharereward(t, e) {
		var r = this.J7.__offset(this.z7, 8);
		return r
			? (e || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	sharerewardLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	updatetype() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.ShareReward = ShareReward;
//# sourceMappingURL=ShareReward.js.map
