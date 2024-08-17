"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueEvent = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueEvent {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TextId() {
		return this.textid();
	}
	get Title() {
		return this.title();
	}
	get Condition() {
		return this.condition();
	}
	get EventType() {
		return this.eventtype();
	}
	get Args() {
		return GameUtils_1.GameUtils.ConvertToArray(this.argsLength(), (t) =>
			this.args(t),
		);
	}
	get FlowListName() {
		return this.flowlistname();
	}
	get FlowId() {
		return this.flowid();
	}
	get StateId() {
		return this.stateid();
	}
	get IsCopyCamera() {
		return this.iscopycamera();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsRogueEvent(t, s) {
		return (s || new RogueEvent()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	textid(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	title(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	condition() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	eventtype() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetArgsAt(t) {
		return this.args(t);
	}
	args(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	argsLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	argsArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	flowlistname(t) {
		var s = this.J7.__offset(this.z7, 16);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	flowid() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	stateid() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	iscopycamera() {
		var t = this.J7.__offset(this.z7, 22);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.RogueEvent = RogueEvent;
//# sourceMappingURL=RogueEvent.js.map
