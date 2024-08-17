"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiFloatConfig = void 0);
class UiFloatConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ViewName() {
		return this.viewname();
	}
	get Area() {
		return this.area();
	}
	get Priority() {
		return this.priority();
	}
	get OnlyShowInMain() {
		return this.onlyshowinmain();
	}
	get RootItemIndex() {
		return this.rootitemindex();
	}
	get IsWaitNormal() {
		return this.iswaitnormal();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsUiFloatConfig(t, i) {
		return (i || new UiFloatConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	viewname(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	area(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	priority() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	onlyshowinmain() {
		var t = this.J7.__offset(this.z7, 10);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	rootitemindex() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	iswaitnormal() {
		var t = this.J7.__offset(this.z7, 14);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
}
exports.UiFloatConfig = UiFloatConfig;
//# sourceMappingURL=UiFloatConfig.js.map
