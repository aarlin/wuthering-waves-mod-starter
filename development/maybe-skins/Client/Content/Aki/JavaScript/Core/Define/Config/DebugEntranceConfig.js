"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DebugEntranceConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DebugEntranceConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get Name() {
		return this.name();
	}
	get Desc() {
		return this.desc();
	}
	get Keywords() {
		return this.keywords();
	}
	get Commands() {
		return GameUtils_1.GameUtils.ConvertToArray(this.commandsLength(), (t) =>
			this.commands(t),
		);
	}
	get UiEssential() {
		return this.uiessential();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsDebugEntranceConfig(t, s) {
		return (s || new DebugEntranceConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	desc(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	keywords(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetCommandsAt(t) {
		return this.commands(t);
	}
	commands(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	commandsLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	commandsArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	uiessential() {
		var t = this.J7.__offset(this.z7, 16);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.DebugEntranceConfig = DebugEntranceConfig;
//# sourceMappingURL=DebugEntranceConfig.js.map
