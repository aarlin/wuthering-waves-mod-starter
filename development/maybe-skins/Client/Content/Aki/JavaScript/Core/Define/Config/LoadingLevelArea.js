"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoadingLevelArea = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class LoadingLevelArea {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get LevelRange() {
		return GameUtils_1.GameUtils.ConvertToArray(this.levelrangeLength(), (t) =>
			this.levelrange(t),
		);
	}
	get AreaId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.areaidLength(), (t) =>
			this.areaid(t),
		);
	}
	get MapId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.mapidLength(), (t) =>
			this.mapid(t),
		);
	}
	get ConditionGroup() {
		return this.conditiongroup();
	}
	get IsLimitShow() {
		return this.islimitshow();
	}
	get BeginTime() {
		return this.begintime();
	}
	get EndTime() {
		return this.endtime();
	}
	get ActivityId() {
		return this.activityid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsLoadingLevelArea(t, i) {
		return (i || new LoadingLevelArea()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetLevelrangeAt(t) {
		return this.levelrange(t);
	}
	levelrange(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	levelrangeLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	levelrangeArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetAreaidAt(t) {
		return this.areaid(t);
	}
	areaid(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	areaidLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	areaidArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetMapidAt(t) {
		return this.mapid(t);
	}
	mapid(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	mapidLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	mapidArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	conditiongroup() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	islimitshow() {
		var t = this.J7.__offset(this.z7, 14);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	begintime() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	endtime() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	activityid() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.LoadingLevelArea = LoadingLevelArea;
//# sourceMappingURL=LoadingLevelArea.js.map
