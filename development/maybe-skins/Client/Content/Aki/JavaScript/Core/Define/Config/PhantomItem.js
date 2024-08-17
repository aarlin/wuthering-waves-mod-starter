"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomItem = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomItem {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ItemId() {
		return this.itemid();
	}
	get MonsterId() {
		return this.monsterid();
	}
	get MonsterName() {
		return this.monstername();
	}
	get ElementType() {
		return GameUtils_1.GameUtils.ConvertToArray(this.elementtypeLength(), (t) =>
			this.elementtype(t),
		);
	}
	get LevelUpGroupId() {
		return this.levelupgroupid();
	}
	get SkillId() {
		return this.skillid();
	}
	get CalabashBuffs() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.calabashbuffsLength(),
			(t) => this.calabashbuffs(t),
		);
	}
	get Rarity() {
		return this.rarity();
	}
	get MeshId() {
		return this.meshid();
	}
	get Zoom() {
		return GameUtils_1.GameUtils.ConvertToArray(this.zoomLength(), (t) =>
			this.zoom(t),
		);
	}
	get Location() {
		return GameUtils_1.GameUtils.ConvertToArray(this.locationLength(), (t) =>
			this.location(t),
		);
	}
	get Rotator() {
		return GameUtils_1.GameUtils.ConvertToArray(this.rotatorLength(), (t) =>
			this.rotator(t),
		);
	}
	get StandAnim() {
		return this.standanim();
	}
	get TypeDescription() {
		return this.typedescription();
	}
	get AttributesDescription() {
		return this.attributesdescription();
	}
	get Icon() {
		return this.icon();
	}
	get IconMiddle() {
		return this.iconmiddle();
	}
	get IconSmall() {
		return this.iconsmall();
	}
	get Mesh() {
		return this.mesh();
	}
	get QualityId() {
		return this.qualityid();
	}
	get MaxCapcity() {
		return this.maxcapcity();
	}
	get ItemAccess() {
		return GameUtils_1.GameUtils.ConvertToArray(this.itemaccessLength(), (t) =>
			this.itemaccess(t),
		);
	}
	get ObtainedShow() {
		return this.obtainedshow();
	}
	get ObtainedShowDescription() {
		return this.obtainedshowdescription();
	}
	get NumLimit() {
		return this.numlimit();
	}
	get ShowInBag() {
		return this.showinbag();
	}
	get SortIndex() {
		return this.sortindex();
	}
	get SkillIcon() {
		return this.skillicon();
	}
	get Destructible() {
		return this.destructible();
	}
	get RedDotDisableRule() {
		return this.reddotdisablerule();
	}
	get FetterGroup() {
		return GameUtils_1.GameUtils.ConvertToArray(this.fettergroupLength(), (t) =>
			this.fettergroup(t),
		);
	}
	get PhantomType() {
		return this.phantomtype();
	}
	get ParentMonsterId() {
		return this.parentmonsterid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPhantomItem(t, i) {
		return (i || new PhantomItem()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	monsterid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	monstername(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetElementtypeAt(t) {
		return this.elementtype(t);
	}
	elementtype(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	elementtypeLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	elementtypeArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	levelupgroupid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skillid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetCalabashbuffsAt(t) {
		return this.calabashbuffs(t);
	}
	calabashbuffs(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	calabashbuffsLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	rarity() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	meshid() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetZoomAt(t) {
		return this.zoom(t);
	}
	zoom(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	zoomLength() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	zoomArray() {
		var t = this.J7.__offset(this.z7, 22);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetLocationAt(t) {
		return this.location(t);
	}
	location(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	locationLength() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	locationArray() {
		var t = this.J7.__offset(this.z7, 24);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetRotatorAt(t) {
		return this.rotator(t);
	}
	rotator(t) {
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	rotatorLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	rotatorArray() {
		var t = this.J7.__offset(this.z7, 26);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	standanim(t) {
		var i = this.J7.__offset(this.z7, 28);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	typedescription(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	attributesdescription(t) {
		var i = this.J7.__offset(this.z7, 32);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 34);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	iconmiddle(t) {
		var i = this.J7.__offset(this.z7, 36);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	iconsmall(t) {
		var i = this.J7.__offset(this.z7, 38);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	mesh(t) {
		var i = this.J7.__offset(this.z7, 40);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	qualityid() {
		var t = this.J7.__offset(this.z7, 42);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxcapcity() {
		var t = this.J7.__offset(this.z7, 44);
		return t ? this.J7.readInt32(this.z7 + t) : 999999999;
	}
	GetItemaccessAt(t) {
		return this.itemaccess(t);
	}
	itemaccess(t) {
		var i = this.J7.__offset(this.z7, 46);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	itemaccessLength() {
		var t = this.J7.__offset(this.z7, 46);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	itemaccessArray() {
		var t = this.J7.__offset(this.z7, 46);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	obtainedshow() {
		var t = this.J7.__offset(this.z7, 48);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	obtainedshowdescription(t) {
		var i = this.J7.__offset(this.z7, 50);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	numlimit() {
		var t = this.J7.__offset(this.z7, 52);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showinbag() {
		var t = this.J7.__offset(this.z7, 54);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	sortindex() {
		var t = this.J7.__offset(this.z7, 56);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skillicon(t) {
		var i = this.J7.__offset(this.z7, 58);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	destructible() {
		var t = this.J7.__offset(this.z7, 60);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	reddotdisablerule() {
		var t = this.J7.__offset(this.z7, 62);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetFettergroupAt(t) {
		return this.fettergroup(t);
	}
	fettergroup(t) {
		var i = this.J7.__offset(this.z7, 64);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	fettergroupLength() {
		var t = this.J7.__offset(this.z7, 64);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	fettergroupArray() {
		var t = this.J7.__offset(this.z7, 64);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	phantomtype() {
		var t = this.J7.__offset(this.z7, 66);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	parentmonsterid() {
		var t = this.J7.__offset(this.z7, 68);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhantomItem = PhantomItem;
//# sourceMappingURL=PhantomItem.js.map
