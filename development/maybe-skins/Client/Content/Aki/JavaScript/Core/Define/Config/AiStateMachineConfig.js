"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineConfig = void 0);
class AiStateMachineConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get StateMachineJson() {
		return this.statemachinejson();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsAiStateMachineConfig(t, i) {
		return (i || new AiStateMachineConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	statemachinejson(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.AiStateMachineConfig = AiStateMachineConfig;
//# sourceMappingURL=AiStateMachineConfig.js.map
