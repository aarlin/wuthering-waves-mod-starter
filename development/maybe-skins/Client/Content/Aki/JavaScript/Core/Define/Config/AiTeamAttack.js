"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiTeamAttack = void 0);
class AiTeamAttack {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ExtraWeight() {
		return this.extraweight();
	}
	get DistanceCoefficient() {
		return this.distancecoefficient();
	}
	get AngleCoefficient() {
		return this.anglecoefficient();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsAiTeamAttack(t, i) {
		return (i || new AiTeamAttack()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	extraweight() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readFloat32(this.z7 + t) : 3e3;
	}
	distancecoefficient() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 1;
	}
	anglecoefficient() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readFloat32(this.z7 + t) : 100;
	}
}
exports.AiTeamAttack = AiTeamAttack;
//# sourceMappingURL=AiTeamAttack.js.map
