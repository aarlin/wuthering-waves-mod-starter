"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaPool = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntStringArray_1 = require("./SubType/DicIntStringArray");
class GachaPool {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GachaId() {
		return this.gachaid();
	}
	get Sort() {
		return this.sort();
	}
	get UrlMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.urlmapLength(),
			(t) => this.urlmap(t)?.key(),
			(t) => this.urlmap(t)?.value(),
		);
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsGachaPool(t, r) {
		return (r || new GachaPool()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	gachaid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sort() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 10;
	}
	GetUrlmapAt(t, r) {
		return this.urlmap(t);
	}
	urlmap(t, r) {
		var i = this.J7.__offset(this.z7, 10);
		return i
			? (r || new DicIntStringArray_1.DicIntStringArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	urlmapLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.GachaPool = GachaPool;
//# sourceMappingURL=GachaPool.js.map
