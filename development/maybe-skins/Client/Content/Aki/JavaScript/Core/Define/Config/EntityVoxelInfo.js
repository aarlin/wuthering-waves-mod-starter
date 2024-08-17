"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityVoxelInfo = void 0);
class EntityVoxelInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MapId() {
		return this.mapid();
	}
	get EntityId() {
		return this.entityid();
	}
	get EnvType() {
		return this.envtype();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsEntityVoxelInfo(t, i) {
		return (i || new EntityVoxelInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mapid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entityid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	envtype() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.EntityVoxelInfo = EntityVoxelInfo;
//# sourceMappingURL=EntityVoxelInfo.js.map
