"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerDefencePhantomLevel = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class TowerDefencePhantomLevel {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GroupId() {
		return this.groupid();
	}
	get Level() {
		return this.level();
	}
	get SkillId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.skillidLength(), (t) =>
			this.skillid(t),
		);
	}
	get Title() {
		return this.title();
	}
	get Description() {
		return this.description();
	}
	get ExpLevel() {
		return this.explevel();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsTowerDefencePhantomLevel(t, e) {
		return (e || new TowerDefencePhantomLevel()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	groupid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetSkillidAt(t) {
		return this.skillid(t);
	}
	skillid(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e
			? this.J7.readInt64(this.J7.__vector(this.z7 + e) + 8 * t)
			: BigInt(0);
	}
	skillidLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	title(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	description(t) {
		var e = this.J7.__offset(this.z7, 14);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	explevel() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TowerDefencePhantomLevel = TowerDefencePhantomLevel;
//# sourceMappingURL=TowerDefencePhantomLevel.js.map
