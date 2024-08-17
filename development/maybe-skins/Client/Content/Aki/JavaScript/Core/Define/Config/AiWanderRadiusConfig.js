"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiWanderRadiusConfig = void 0);
class AiWanderRadiusConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RandomRadius() {
		return this.randomradius();
	}
	get MinWanderDistance() {
		return this.minwanderdistance();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsAiWanderRadiusConfig(t, i) {
		return (i || new AiWanderRadiusConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	randomradius() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readFloat32(this.z7 + t) : 600;
	}
	minwanderdistance() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 400;
	}
}
exports.AiWanderRadiusConfig = AiWanderRadiusConfig;
//# sourceMappingURL=AiWanderRadiusConfig.js.map
