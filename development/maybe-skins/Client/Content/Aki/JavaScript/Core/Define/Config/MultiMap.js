"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MultiMap = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MultiMap {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GroupId() {
		return this.groupid();
	}
	get MapId() {
		return this.mapid();
	}
	get Floor() {
		return this.floor();
	}
	get MapTilePath() {
		return GameUtils_1.GameUtils.ConvertToArray(this.maptilepathLength(), (t) =>
			this.maptilepath(t),
		);
	}
	get MiniMapTilePath() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.minimaptilepathLength(),
			(t) => this.minimaptilepath(t),
		);
	}
	get Area() {
		return GameUtils_1.GameUtils.ConvertToArray(this.areaLength(), (t) =>
			this.area(t),
		);
	}
	get Mark() {
		return GameUtils_1.GameUtils.ConvertToArray(this.markLength(), (t) =>
			this.mark(t),
		);
	}
	get ConditionId() {
		return this.conditionid();
	}
	get FloorName() {
		return this.floorname();
	}
	get FloorIcon() {
		return this.flooricon();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMultiMap(t, i) {
		return (i || new MultiMap()).__init(
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
	mapid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	floor() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetMaptilepathAt(t) {
		return this.maptilepath(t);
	}
	maptilepath(t, i) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	maptilepathLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetMinimaptilepathAt(t) {
		return this.minimaptilepath(t);
	}
	minimaptilepath(t, i) {
		var s = this.J7.__offset(this.z7, 14);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	minimaptilepathLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetAreaAt(t) {
		return this.area(t);
	}
	area(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	areaLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	areaArray() {
		var t = this.J7.__offset(this.z7, 16);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetMarkAt(t) {
		return this.mark(t);
	}
	mark(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	markLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	markArray() {
		var t = this.J7.__offset(this.z7, 18);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	conditionid() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	floorname(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	flooricon(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.MultiMap = MultiMap;
//# sourceMappingURL=MultiMap.js.map
