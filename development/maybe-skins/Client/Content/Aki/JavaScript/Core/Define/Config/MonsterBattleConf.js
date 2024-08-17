"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterBattleConf = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MonsterBattleConf {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ExecutionId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.executionidLength(), (t) =>
			this.executionid(t),
		);
	}
	get ExecutionRadius() {
		return this.executionradius();
	}
	get ForceLockOnCoefficient() {
		return this.forcelockoncoefficient();
	}
	get MonsterSizeId() {
		return this.monstersizeid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMonsterBattleConf(t, i) {
		return (i || new MonsterBattleConf()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetExecutionidAt(t) {
		return this.executionid(t);
	}
	executionid(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	executionidLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	executionidArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	executionradius() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 3;
	}
	forcelockoncoefficient() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	monstersizeid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
}
exports.MonsterBattleConf = MonsterBattleConf;
//# sourceMappingURL=MonsterBattleConf.js.map
