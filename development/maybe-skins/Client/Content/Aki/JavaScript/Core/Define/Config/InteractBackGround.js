"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InteractBackGround = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class InteractBackGround {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ViewName() {
		return this.viewname();
	}
	get Title() {
		return this.title();
	}
	get TitleSpritePath() {
		return this.titlespritepath();
	}
	get ContentSpritePath() {
		return this.contentspritepath();
	}
	get CostItemList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.costitemlistLength(),
			(t) => this.costitemlist(t),
		);
	}
	get IsHelpButtonVisible() {
		return this.ishelpbuttonvisible();
	}
	get HelpGroupId() {
		return this.helpgroupid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsInteractBackGround(t, i) {
		return (i || new InteractBackGround()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	viewname(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	titlespritepath(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	contentspritepath(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetCostitemlistAt(t) {
		return this.costitemlist(t);
	}
	costitemlist(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	costitemlistLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	costitemlistArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	ishelpbuttonvisible() {
		var t = this.J7.__offset(this.z7, 16);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	helpgroupid() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.InteractBackGround = InteractBackGround;
//# sourceMappingURL=InteractBackGround.js.map
