"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonTitle = void 0);
class InstanceDungeonTitle {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get CommonText() {
		return this.commontext();
	}
	get IconTexture() {
		return this.icontexture();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsInstanceDungeonTitle(t, e) {
		return (e || new InstanceDungeonTitle()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	commontext(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	icontexture(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.InstanceDungeonTitle = InstanceDungeonTitle;
//# sourceMappingURL=InstanceDungeonTitle.js.map
