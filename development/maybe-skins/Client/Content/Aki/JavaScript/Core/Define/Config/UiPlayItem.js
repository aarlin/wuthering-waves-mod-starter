"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiPlayItem = void 0);
class UiPlayItem {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get UiPlayKey() {
		return this.uiplaykey();
	}
	get FinishItem() {
		return this.finishitem();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsUiPlayItem(t, i) {
		return (i || new UiPlayItem()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	uiplaykey(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	finishitem() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.UiPlayItem = UiPlayItem;
//# sourceMappingURL=UiPlayItem.js.map
