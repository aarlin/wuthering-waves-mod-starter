"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GmOrderList = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GmOrderList {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get OrderList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.orderlistLength(), (t) =>
			this.orderlist(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsGmOrderList(t, s) {
		return (s || new GmOrderList()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetOrderlistAt(t) {
		return this.orderlist(t);
	}
	orderlist(t, s) {
		var r = this.J7.__offset(this.z7, 8);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, s)
			: null;
	}
	orderlistLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.GmOrderList = GmOrderList;
//# sourceMappingURL=GmOrderList.js.map
