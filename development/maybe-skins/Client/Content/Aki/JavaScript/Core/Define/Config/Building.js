"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Building = void 0);
class Building {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get Sort() {
		return this.sort();
	}
	get Desc() {
		return this.desc();
	}
	get AssociateRole() {
		return this.associaterole();
	}
	get RoleTips() {
		return this.roletips();
	}
	get BuildingTexture() {
		return this.buildingtexture();
	}
	get TipsSprite() {
		return this.tipssprite();
	}
	get MapMarkId() {
		return this.mapmarkid();
	}
	get UnLockPrice() {
		return this.unlockprice();
	}
	get UnlockCondition() {
		return this.unlockcondition();
	}
	get JumpType() {
		return this.jumptype();
	}
	get JumpParam() {
		return this.jumpparam();
	}
	get UpGradeCurve() {
		return this.upgradecurve();
	}
	get FlowListName() {
		return this.flowlistname();
	}
	get FlowId() {
		return this.flowid();
	}
	get StateId() {
		return this.stateid();
	}
	get TriggerEntityId() {
		return this.triggerentityid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsBuilding(t, i) {
		return (i || new Building()).__init(
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
	sort() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	desc(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	associaterole() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roletips(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	buildingtexture(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tipssprite(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	mapmarkid() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	unlockprice() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	unlockcondition() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	jumptype() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	jumpparam() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	upgradecurve() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	flowlistname(t) {
		var i = this.J7.__offset(this.z7, 32);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	flowid() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	stateid() {
		var t = this.J7.__offset(this.z7, 36);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	triggerentityid() {
		var t = this.J7.__offset(this.z7, 38);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.Building = Building;
//# sourceMappingURL=Building.js.map
