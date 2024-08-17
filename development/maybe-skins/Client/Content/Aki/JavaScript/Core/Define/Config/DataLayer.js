"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DataLayer = void 0);
class DataLayer {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get DataLayer() {
		return this.datalayer();
	}
	get CnName() {
		return this.cnname();
	}
	get LevelId() {
		return this.levelid();
	}
	get InitLoad() {
		return this.initload();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsDataLayer(t, r) {
		return (r || new DataLayer()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	datalayer(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	cnname(t) {
		var r = this.J7.__offset(this.z7, 8);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	levelid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	initload() {
		var t = this.J7.__offset(this.z7, 12);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.DataLayer = DataLayer;
//# sourceMappingURL=DataLayer.js.map
