"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiSkillInfos = void 0);
const FloatRange_1 = require("./SubType/FloatRange");
class AiSkillInfos {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get SkillWeight() {
		return this.skillweight();
	}
	get SkillPreconditionId() {
		return this.skillpreconditionid();
	}
	get SkillId() {
		return this.skillid();
	}
	get SkillCdRange() {
		return this.skillcdrange();
	}
	get SkillType() {
		return this.skilltype();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsAiSkillInfos(t, i) {
		return (i || new AiSkillInfos()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skillweight() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	skillpreconditionid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skillid(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	skillcdrange(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	skilltype() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : -1;
	}
}
exports.AiSkillInfos = AiSkillInfos;
//# sourceMappingURL=AiSkillInfos.js.map
