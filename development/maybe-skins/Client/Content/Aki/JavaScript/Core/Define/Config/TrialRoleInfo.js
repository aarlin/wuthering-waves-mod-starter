"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrialRoleInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	IntPair_1 = require("./SubType/IntPair");
class TrialRoleInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GroupId() {
		return this.groupid();
	}
	get WorldLevel() {
		return this.worldlevel();
	}
	get OnlyTrial() {
		return this.onlytrial();
	}
	get HideTrialLabel() {
		return this.hidetriallabel();
	}
	get ParentId() {
		return this.parentid();
	}
	get Level() {
		return this.level();
	}
	get ResonanceLevel() {
		return this.resonancelevel();
	}
	get UnlockSkillLevel() {
		return this.unlockskilllevel();
	}
	get UnlockSkillNodeList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.unlockskillnodelistLength(),
			(t) => this.unlockskillnodelist(t),
		);
	}
	get TrailWeapon() {
		return this.trailweapon();
	}
	get PhantomEquipList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.phantomequiplistLength(),
			(t) => this.phantomequiplist(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsTrialRoleInfo(t, i) {
		return (i || new TrialRoleInfo()).__init(
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
	worldlevel() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	onlytrial() {
		var t = this.J7.__offset(this.z7, 10);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	hidetriallabel() {
		var t = this.J7.__offset(this.z7, 12);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	parentid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	resonancelevel() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	unlockskilllevel() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	GetUnlockskillnodelistAt(t) {
		return this.unlockskillnodelist(t);
	}
	unlockskillnodelist(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	unlockskillnodelistLength() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	unlockskillnodelistArray() {
		var t = this.J7.__offset(this.z7, 22);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	trailweapon() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPhantomequiplistAt(t, i) {
		return this.phantomequiplist(t);
	}
	phantomequiplist(t, i) {
		var s = this.J7.__offset(this.z7, 26);
		return s
			? (i || new IntPair_1.IntPair()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	phantomequiplistLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.TrialRoleInfo = TrialRoleInfo;
//# sourceMappingURL=TrialRoleInfo.js.map
