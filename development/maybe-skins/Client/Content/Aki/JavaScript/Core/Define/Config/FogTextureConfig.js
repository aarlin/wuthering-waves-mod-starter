"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FogTextureConfig = void 0);
class FogTextureConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Block() {
		return this.block();
	}
	get MapTilePath() {
		return this.maptilepath();
	}
	get MiniMapTilePath() {
		return this.minimaptilepath();
	}
	get HdMapTilePath() {
		return this.hdmaptilepath();
	}
	get FogTilePath() {
		return this.fogtilepath();
	}
	get MiniFogTilePath() {
		return this.minifogtilepath();
	}
	get SubMapGroupId() {
		return this.submapgroupid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsFogTextureConfig(t, i) {
		return (i || new FogTextureConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	block(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	maptilepath(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	minimaptilepath(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	hdmaptilepath(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	fogtilepath(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	minifogtilepath(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	submapgroupid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.FogTextureConfig = FogTextureConfig;
//# sourceMappingURL=FogTextureConfig.js.map
