"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterDetection = void 0);
class MonsterDetection {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BlueprintType() {
		return this.blueprinttype();
	}
	get Name() {
		return this.name();
	}
	get ShowReward() {
		return this.showreward();
	}
	get EntityConfigId() {
		return this.entityconfigid();
	}
	get DangerType() {
		return this.dangertype();
	}
	get TypeDescription2() {
		return this.typedescription2();
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
	get TemporaryIconUnLock() {
		return this.temporaryiconunlock();
	}
	get TemporaryIconlock() {
		return this.temporaryiconlock();
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
	get MonsterInfoId() {
		return this.monsterinfoid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMonsterDetection(t, i) {
		return (i || new MonsterDetection()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	blueprinttype(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	showreward() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entityconfigid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	dangertype() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	typedescription2() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	attributesdescriptionlock(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	attributesdescriptionunlock(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	bigicon(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	temporaryiconunlock(t) {
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	temporaryiconlock(t) {
		var i = this.J7.__offset(this.z7, 28);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	begintimestamp() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	markid() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	lockcon() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	monsterinfoid() {
		var t = this.J7.__offset(this.z7, 36);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.MonsterDetection = MonsterDetection;
//# sourceMappingURL=MonsterDetection.js.map
