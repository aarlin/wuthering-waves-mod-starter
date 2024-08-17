"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonEntrance = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	IntArray_1 = require("./SubType/IntArray");
class InstanceDungeonEntrance {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MarkId() {
		return this.markid();
	}
	get Name() {
		return this.name();
	}
	get Description() {
		return this.description();
	}
	get InstanceDungeonList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.instancedungeonlistLength(),
			(t) => this.instancedungeonlist(t),
		);
	}
	get FlowId() {
		return this.flowid();
	}
	get HelpButtonId() {
		return this.helpbuttonid();
	}
	get TitleSprite() {
		return this.titlesprite();
	}
	get TeleportEntityConfigId() {
		return this.teleportentityconfigid();
	}
	get UnLockCondition() {
		return this.unlockcondition();
	}
	get RegularReward() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.regularrewardLength(),
			(t) => this.regularreward(t),
		);
	}
	get PowerCostShow() {
		return this.powercostshow();
	}
	get MapBgPath() {
		return this.mapbgpath();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsInstanceDungeonEntrance(t, i) {
		return (i || new InstanceDungeonEntrance()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	markid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	description(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetInstancedungeonlistAt(t) {
		return this.instancedungeonlist(t);
	}
	instancedungeonlist(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	instancedungeonlistLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	instancedungeonlistArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	flowid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	helpbuttonid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	titlesprite(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	teleportentityconfigid() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	unlockcondition() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRegularrewardAt(t, i) {
		return this.regularreward(t);
	}
	regularreward(t, i) {
		var r = this.J7.__offset(this.z7, 24);
		return r
			? (i || new IntArray_1.IntArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	regularrewardLength() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	powercostshow() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mapbgpath(t) {
		var i = this.J7.__offset(this.z7, 28);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.InstanceDungeonEntrance = InstanceDungeonEntrance;
//# sourceMappingURL=InstanceDungeonEntrance.js.map
