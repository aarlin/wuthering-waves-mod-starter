"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillDescribeStructLang = void 0);
class SkillDescribeStructLang {
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
	static getRootAsSkillDescribeStructLang(t, e) {
		return (e || new SkillDescribeStructLang()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	title() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	content() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SkillDescribeStructLang = SkillDescribeStructLang;
//# sourceMappingURL=SkillDescribeStructLang.js.map
