"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEntityConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	IntVector_1 = require("./SubType/IntVector");
class LevelEntityConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MapId() {
		return this.mapid();
	}
	get EntityId() {
		return this.entityid();
	}
	get BlueprintType() {
		return this.blueprinttype();
	}
	get Name() {
		return this.name();
	}
	get InSleep() {
		return this.insleep();
	}
	get IsHidden() {
		return this.ishidden();
	}
	get AreaId() {
		return this.areaid();
	}
	get Transform() {
		return GameUtils_1.GameUtils.ConvertToArray(this.transformLength(), (t) =>
			this.transform(t),
		);
	}
	get ComponentsData() {
		return this.componentsdata();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsLevelEntityConfig(t, i) {
		return (i || new LevelEntityConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mapid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entityid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	blueprinttype(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	insleep() {
		var t = this.J7.__offset(this.z7, 14);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	ishidden() {
		var t = this.J7.__offset(this.z7, 16);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	areaid() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetTransformAt(t, i) {
		return this.transform(t);
	}
	transform(t, i) {
		var s = this.J7.__offset(this.z7, 20);
		return s
			? (i || new IntVector_1.IntVector()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	transformLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	componentsdata(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.LevelEntityConfig = LevelEntityConfig;
//# sourceMappingURL=LevelEntityConfig.js.map
