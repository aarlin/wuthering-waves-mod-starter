"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookFixTool = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class CookFixTool {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Description() {
		return this.description();
	}
	get Items() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.itemsLength(),
			(t) => this.items(t)?.key(),
			(t) => this.items(t)?.value(),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCookFixTool(t, i) {
		return (i || new CookFixTool()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	description(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetItemsAt(t, i) {
		return this.items(t);
	}
	items(t, i) {
		var s = this.J7.__offset(this.z7, 8);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	itemsLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.CookFixTool = CookFixTool;
//# sourceMappingURL=CookFixTool.js.map
