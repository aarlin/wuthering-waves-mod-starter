"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MainType = void 0);
class MainType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MainSort() {
		return this.mainsort();
	}
	get MainName() {
		return this.mainname();
	}
	get MainIcon() {
		return this.mainicon();
	}
	get TabPanelType() {
		return this.tabpaneltype();
	}
	get PcTabPanelType() {
		return this.pctabpaneltype();
	}
	get XboxTabPanelType() {
		return this.xboxtabpaneltype();
	}
	get PsTabPanelType() {
		return this.pstabpaneltype();
	}
	get MainSmallIcon() {
		return this.mainsmallicon();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMainType(t, i) {
		return (i || new MainType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mainsort() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mainname(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	mainicon(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tabpaneltype() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	pctabpaneltype() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	xboxtabpaneltype() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	pstabpaneltype() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	mainsmallicon(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.MainType = MainType;
//# sourceMappingURL=MainType.js.map
