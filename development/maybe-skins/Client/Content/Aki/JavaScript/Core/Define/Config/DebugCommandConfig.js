"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DebugCommandConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DebugCommandConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GetTargetStage() {
		return this.gettargetstage();
	}
	get ParamGetTarget() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.paramgettargetLength(),
			(t) => this.paramgettarget(t),
		);
	}
	get EffectStage() {
		return this.effectstage();
	}
	get ParamEffect() {
		return GameUtils_1.GameUtils.ConvertToArray(this.parameffectLength(), (t) =>
			this.parameffect(t),
		);
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsDebugCommandConfig(t, e) {
		return (e || new DebugCommandConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	gettargetstage() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetParamgettargetAt(t) {
		return this.paramgettarget(t);
	}
	paramgettarget(t, e) {
		var s = this.J7.__offset(this.z7, 8);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e)
			: null;
	}
	paramgettargetLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	effectstage() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetParameffectAt(t) {
		return this.parameffect(t);
	}
	parameffect(t, e) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e)
			: null;
	}
	parameffectLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.DebugCommandConfig = DebugCommandConfig;
//# sourceMappingURL=DebugCommandConfig.js.map
