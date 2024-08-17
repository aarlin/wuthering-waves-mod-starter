"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KillMonstersScores = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class KillMonstersScores {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get InstanceID() {
		return this.instanceid();
	}
	get ScoreMin() {
		return this.scoremin();
	}
	get ScoreMax() {
		return this.scoremax();
	}
	get Reward() {
		return this.reward();
	}
	get DifficultyOptions() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.difficultyoptionsLength(),
			(t) => this.difficultyoptions(t),
		);
	}
	get Desc() {
		return this.desc();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsKillMonstersScores(t, s) {
		return (s || new KillMonstersScores()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	instanceid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	scoremin() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	scoremax() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	reward() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetDifficultyoptionsAt(t) {
		return this.difficultyoptions(t);
	}
	difficultyoptions(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	difficultyoptionsLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	difficultyoptionsArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	desc(t) {
		var s = this.J7.__offset(this.z7, 16);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.KillMonstersScores = KillMonstersScores;
//# sourceMappingURL=KillMonstersScores.js.map
