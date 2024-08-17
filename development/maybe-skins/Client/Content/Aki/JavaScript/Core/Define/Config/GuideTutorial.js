"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideTutorial = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GuideTutorial {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TutorialType() {
		return this.tutorialtype();
	}
	get TutorialOrder() {
		return this.tutorialorder();
	}
	get PageId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.pageidLength(), (t) =>
			this.pageid(t),
		);
	}
	get PageReplaceConditionGroupId() {
		return this.pagereplaceconditiongroupid();
	}
	get ReplacePageId() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.replacepageidLength(),
			(t) => this.replacepageid(t),
		);
	}
	get GroupName() {
		return this.groupname();
	}
	get TutorialTip() {
		return this.tutorialtip();
	}
	get DropId() {
		return this.dropid();
	}
	get RequireReadAll() {
		return this.requirereadall();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsGuideTutorial(t, i) {
		return (i || new GuideTutorial()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	tutorialtype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 11;
	}
	tutorialorder() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPageidAt(t) {
		return this.pageid(t);
	}
	pageid(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	pageidLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	pageidArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	pagereplaceconditiongroupid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetReplacepageidAt(t) {
		return this.replacepageid(t);
	}
	replacepageid(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	replacepageidLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	replacepageidArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	groupname(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tutorialtip() {
		var t = this.J7.__offset(this.z7, 18);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	dropid() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 100001;
	}
	requirereadall() {
		var t = this.J7.__offset(this.z7, 22);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.GuideTutorial = GuideTutorial;
//# sourceMappingURL=GuideTutorial.js.map
