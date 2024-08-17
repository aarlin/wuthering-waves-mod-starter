"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Teleporter = void 0);
class Teleporter {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MapId() {
		return this.mapid();
	}
	get ObjectId() {
		return this.objectid();
	}
	get AreaId() {
		return this.areaid();
	}
	get FogId() {
		return this.fogid();
	}
	get Type() {
		return this.type();
	}
	get TeleportEntityConfigId() {
		return this.teleportentityconfigid();
	}
	get Plot() {
		return this.plot();
	}
	get AfterNetworkAction() {
		return this.afternetworkaction();
	}
	get ShowWorldMap() {
		return this.showworldmap();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsTeleporter(t, r) {
		return (r || new Teleporter()).__init(
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
	objectid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	areaid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	fogid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	teleportentityconfigid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	plot(t) {
		var r = this.J7.__offset(this.z7, 18);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	afternetworkaction() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showworldmap() {
		var t = this.J7.__offset(this.z7, 22);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.Teleporter = Teleporter;
//# sourceMappingURL=Teleporter.js.map
