"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LongShanStage = void 0);
class LongShanStage {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ActivityId() {
		return this.activityid();
	}
	get Title() {
		return this.title();
	}
	get TitleDetail() {
		return this.titledetail();
	}
	get OpenConditionId() {
		return this.openconditionid();
	}
	get QuestionId() {
		return this.questionid();
	}
	get Picture() {
		return this.picture();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsLongShanStage(t, i) {
		return (i || new LongShanStage()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	activityid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	titledetail(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	openconditionid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	questionid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	picture(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.LongShanStage = LongShanStage;
//# sourceMappingURL=LongShanStage.js.map
