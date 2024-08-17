"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiBase = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringString_1 = require("./SubType/DicStringString");
class AiBase {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get StateMachine() {
		return this.statemachine();
	}
	get AiController() {
		return this.aicontroller();
	}
	get BehaviorTree() {
		return this.behaviortree();
	}
	get SubBehaviorConfigs() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.subbehaviorconfigsLength(),
			(t) => this.subbehaviorconfigs(t)?.key(),
			(t) => this.subbehaviorconfigs(t)?.value(),
		);
	}
	get Team() {
		return this.team();
	}
	get MonsterType() {
		return this.monstertype();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsAiBase(t, i) {
		return (i || new AiBase()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	statemachine(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	aicontroller(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	behaviortree(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetSubbehaviorconfigsAt(t, i) {
		return this.subbehaviorconfigs(t);
	}
	subbehaviorconfigs(t, i) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	subbehaviorconfigsLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	team() {
		var t = this.J7.__offset(this.z7, 14);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	monstertype() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 4;
	}
}
exports.AiBase = AiBase;
//# sourceMappingURL=AiBase.js.map
