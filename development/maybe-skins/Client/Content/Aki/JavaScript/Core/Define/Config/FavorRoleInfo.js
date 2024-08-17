"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FavorRoleInfo = void 0);
class FavorRoleInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoleId() {
		return this.roleid();
	}
	get Birthday() {
		return this.birthday();
	}
	get Sex() {
		return this.sex();
	}
	get Country() {
		return this.country();
	}
	get Influence() {
		return this.influence();
	}
	get Info() {
		return this.info();
	}
	get TalentName() {
		return this.talentname();
	}
	get TalentDoc() {
		return this.talentdoc();
	}
	get TalentCertification() {
		return this.talentcertification();
	}
	get CondGroupId() {
		return this.condgroupid();
	}
	get CVNameCn() {
		return this.cvnamecn();
	}
	get CVNameJp() {
		return this.cvnamejp();
	}
	get CVNameKo() {
		return this.cvnameko();
	}
	get CVNameEn() {
		return this.cvnameen();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsFavorRoleInfo(t, i) {
		return (i || new FavorRoleInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roleid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	birthday(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	sex(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	country(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	influence(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	info(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	talentname(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	talentdoc(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	talentcertification(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	condgroupid() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	cvnamecn(t) {
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	cvnamejp(t) {
		var i = this.J7.__offset(this.z7, 28);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	cvnameko(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	cvnameen(t) {
		var i = this.J7.__offset(this.z7, 32);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.FavorRoleInfo = FavorRoleInfo;
//# sourceMappingURL=FavorRoleInfo.js.map
