"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillDescribeStruct = void 0);
class SkillDescribeStruct {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Title() {
		return this.title();
	}
	get Content() {
		return this.content();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsSkillDescribeStruct(t, e) {
		return (e || new SkillDescribeStruct()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	title(t) {
		var e = this.J7.__offset(this.z7, 4);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	content(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.SkillDescribeStruct = SkillDescribeStruct;
//# sourceMappingURL=SkillDescribeStruct.js.map
