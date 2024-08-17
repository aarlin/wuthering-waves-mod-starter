"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MonsterInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get RarityId() {
		return this.rarityid();
	}
	get Icon() {
		return this.icon();
	}
	get BigIcon() {
		return this.bigicon();
	}
	get Tachine() {
		return this.tachine();
	}
	get ElementId() {
		return this.elementid();
	}
	get MonsterEntityID() {
		return this.monsterentityid();
	}
	get MonsterPose() {
		return this.monsterpose();
	}
	get UndiscoveredDes() {
		return this.undiscovereddes();
	}
	get DiscoveredDes() {
		return this.discovereddes();
	}
	get PerchId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.perchidLength(), (t) =>
			this.perchid(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsMonsterInfo(t, s) {
		return (s || new MonsterInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	rarityid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	icon(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	bigicon(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	tachine(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	elementid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	monsterentityid(t) {
		var s = this.J7.__offset(this.z7, 18);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	monsterpose(t) {
		var s = this.J7.__offset(this.z7, 20);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	undiscovereddes(t) {
		var s = this.J7.__offset(this.z7, 22);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	discovereddes(t) {
		var s = this.J7.__offset(this.z7, 24);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetPerchidAt(t) {
		return this.perchid(t);
	}
	perchid(t) {
		var s = this.J7.__offset(this.z7, 26);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	perchidLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	perchidArray() {
		var t = this.J7.__offset(this.z7, 26);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.MonsterInfo = MonsterInfo;
//# sourceMappingURL=MonsterInfo.js.map
