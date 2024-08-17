"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SilentAreaDetection = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class SilentAreaDetection {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get GuideId() {
		return this.guideid();
	}
	get LevelPlayList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.levelplaylistLength(),
			(t) => this.levelplaylist(t),
		);
	}
	get InstanceSubTypeDescription() {
		return this.instancesubtypedescription();
	}
	get DangerType() {
		return this.dangertype();
	}
	get Secondary() {
		return this.secondary();
	}
	get TypeDescription2() {
		return this.typedescription2();
	}
	get MatType() {
		return this.mattype();
	}
	get AttributesDescriptionLock() {
		return this.attributesdescriptionlock();
	}
	get AttributesDescriptionUnlock() {
		return this.attributesdescriptionunlock();
	}
	get BigIcon() {
		return this.bigicon();
	}
	get Icon() {
		return this.icon();
	}
	get LockBigIcon() {
		return this.lockbigicon();
	}
	get TemporaryIconUnLock() {
		return this.temporaryiconunlock();
	}
	get TemporaryIconlock() {
		return this.temporaryiconlock();
	}
	get ShowReward() {
		return this.showreward();
	}
	get ShowRewardMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.showrewardmapLength(),
			(t) => this.showrewardmap(t)?.key(),
			(t) => this.showrewardmap(t)?.value(),
		);
	}
	get BeginTimeStamp() {
		return this.begintimestamp();
	}
	get MarkId() {
		return this.markid();
	}
	get LockCon() {
		return this.lockcon();
	}
	get PhantomId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.phantomidLength(), (t) =>
			this.phantomid(t),
		);
	}
	get FirstDropId() {
		return this.firstdropid();
	}
	get AdditionalId() {
		return this.additionalid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSilentAreaDetection(t, i) {
		return (i || new SilentAreaDetection()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	guideid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetLevelplaylistAt(t) {
		return this.levelplaylist(t);
	}
	levelplaylist(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	levelplaylistLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	levelplaylistArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	instancesubtypedescription(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	dangertype() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	secondary() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	typedescription2() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mattype() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	attributesdescriptionlock(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	attributesdescriptionunlock(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	bigicon(t) {
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 28);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	lockbigicon(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	temporaryiconunlock(t) {
		var i = this.J7.__offset(this.z7, 32);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	temporaryiconlock(t) {
		var i = this.J7.__offset(this.z7, 34);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	showreward() {
		var t = this.J7.__offset(this.z7, 36);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetShowrewardmapAt(t, i) {
		return this.showrewardmap(t);
	}
	showrewardmap(t, i) {
		var s = this.J7.__offset(this.z7, 38);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	showrewardmapLength() {
		var t = this.J7.__offset(this.z7, 38);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	begintimestamp() {
		var t = this.J7.__offset(this.z7, 40);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	markid() {
		var t = this.J7.__offset(this.z7, 42);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	lockcon() {
		var t = this.J7.__offset(this.z7, 44);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPhantomidAt(t) {
		return this.phantomid(t);
	}
	phantomid(t) {
		var i = this.J7.__offset(this.z7, 46);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	phantomidLength() {
		var t = this.J7.__offset(this.z7, 46);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	phantomidArray() {
		var t = this.J7.__offset(this.z7, 46);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	firstdropid() {
		var t = this.J7.__offset(this.z7, 48);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	additionalid() {
		var t = this.J7.__offset(this.z7, 50);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SilentAreaDetection = SilentAreaDetection;
//# sourceMappingURL=SilentAreaDetection.js.map
