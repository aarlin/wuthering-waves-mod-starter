"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class RoleInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get QualityId() {
		return this.qualityid();
	}
	get RoleType() {
		return this.roletype();
	}
	get IsTrial() {
		return this.istrial();
	}
	get Name() {
		return this.name();
	}
	get NickName() {
		return this.nickname();
	}
	get Introduction() {
		return this.introduction();
	}
	get Tag() {
		return GameUtils_1.GameUtils.ConvertToArray(this.tagLength(), (t) =>
			this.tag(t),
		);
	}
	get ParentId() {
		return this.parentid();
	}
	get Priority() {
		return this.priority();
	}
	get PropertyId() {
		return this.propertyid();
	}
	get ShowProperty() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.showpropertyLength(),
			(t) => this.showproperty(t),
		);
	}
	get ElementId() {
		return this.elementid();
	}
	get RoleHeadIconCircle() {
		return this.roleheadiconcircle();
	}
	get RoleHeadIconLarge() {
		return this.roleheadiconlarge();
	}
	get RoleHeadIconBig() {
		return this.roleheadiconbig();
	}
	get Card() {
		return this.card();
	}
	get RoleHeadIcon() {
		return this.roleheadicon();
	}
	get FormationRoleCard() {
		return this.formationrolecard();
	}
	get RoleStand() {
		return this.rolestand();
	}
	get RolePortrait() {
		return this.roleportrait();
	}
	get SpilloverItem() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.spilloveritemLength(),
			(t) => this.spilloveritem(t)?.key(),
			(t) => this.spilloveritem(t)?.value(),
		);
	}
	get MeshId() {
		return this.meshid();
	}
	get UiMeshId() {
		return this.uimeshid();
	}
	get RoleBody() {
		return this.rolebody();
	}
	get BreachModel() {
		return this.breachmodel();
	}
	get SpecialEnergyBarId() {
		return this.specialenergybarid();
	}
	get CameraConfig() {
		return this.cameraconfig();
	}
	get CameraFloatHeight() {
		return this.camerafloatheight();
	}
	get EntityProperty() {
		return this.entityproperty();
	}
	get MaxLevel() {
		return this.maxlevel();
	}
	get LevelConsumeId() {
		return this.levelconsumeid();
	}
	get BreachId() {
		return this.breachid();
	}
	get SkillId() {
		return this.skillid();
	}
	get SkillTreeGroupId() {
		return this.skilltreegroupid();
	}
	get ResonanceId() {
		return this.resonanceid();
	}
	get ResonantChainGroupId() {
		return this.resonantchaingroupid();
	}
	get IsShow() {
		return this.isshow();
	}
	get ExchangeConsume() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.exchangeconsumeLength(),
			(t) => this.exchangeconsume(t)?.key(),
			(t) => this.exchangeconsume(t)?.value(),
		);
	}
	get InitWeaponItemId() {
		return this.initweaponitemid();
	}
	get WeaponType() {
		return this.weapontype();
	}
	get SkillDAPath() {
		return this.skilldapath();
	}
	get SkillLockDAPath() {
		return this.skilllockdapath();
	}
	get UiScenePerformanceABP() {
		return this.uisceneperformanceabp();
	}
	get LockOnDefaultId() {
		return this.lockondefaultid();
	}
	get LockOnLookOnId() {
		return this.lockonlookonid();
	}
	get SkillEffectDA() {
		return this.skilleffectda();
	}
	get FootStepState() {
		return this.footstepstate();
	}
	get PartyId() {
		return this.partyid();
	}
	get AttributesDescription() {
		return this.attributesdescription();
	}
	get Icon() {
		return this.icon();
	}
	get ItemQualityId() {
		return this.itemqualityid();
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
	get WeaponScale() {
		return GameUtils_1.GameUtils.ConvertToArray(this.weaponscaleLength(), (t) =>
			this.weaponscale(t),
		);
	}
	get Intervene() {
		return this.intervene();
	}
	get CharacterVoice() {
		return this.charactervoice();
	}
	get TrialRole() {
		return this.trialrole();
	}
	get IsAim() {
		return this.isaim();
	}
	get RoleGuide() {
		return this.roleguide();
	}
	get RedDotDisableRule() {
		return this.reddotdisablerule();
	}
	get SkinDamage() {
		return GameUtils_1.GameUtils.ConvertToArray(this.skindamageLength(), (t) =>
			this.skindamage(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRoleInfo(t, i) {
		return (i || new RoleInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	qualityid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roletype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	istrial() {
		var t = this.J7.__offset(this.z7, 10);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	nickname(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	introduction(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetTagAt(t) {
		return this.tag(t);
	}
	tag(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	tagLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	tagArray() {
		var t = this.J7.__offset(this.z7, 18);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	parentid() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	priority() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	propertyid() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetShowpropertyAt(t) {
		return this.showproperty(t);
	}
	showproperty(t) {
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	showpropertyLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	showpropertyArray() {
		var t = this.J7.__offset(this.z7, 26);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	elementid() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roleheadiconcircle(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	roleheadiconlarge(t) {
		var i = this.J7.__offset(this.z7, 32);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	roleheadiconbig(t) {
		var i = this.J7.__offset(this.z7, 34);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	card(t) {
		var i = this.J7.__offset(this.z7, 36);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	roleheadicon(t) {
		var i = this.J7.__offset(this.z7, 38);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	formationrolecard(t) {
		var i = this.J7.__offset(this.z7, 40);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	rolestand(t) {
		var i = this.J7.__offset(this.z7, 42);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	roleportrait(t) {
		var i = this.J7.__offset(this.z7, 44);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetSpilloveritemAt(t, i) {
		return this.spilloveritem(t);
	}
	spilloveritem(t, i) {
		var r = this.J7.__offset(this.z7, 46);
		return r
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	spilloveritemLength() {
		var t = this.J7.__offset(this.z7, 46);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	meshid() {
		var t = this.J7.__offset(this.z7, 48);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	uimeshid() {
		var t = this.J7.__offset(this.z7, 50);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rolebody(t) {
		var i = this.J7.__offset(this.z7, 52);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	breachmodel() {
		var t = this.J7.__offset(this.z7, 54);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	specialenergybarid() {
		var t = this.J7.__offset(this.z7, 56);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	cameraconfig(t) {
		var i = this.J7.__offset(this.z7, 58);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	camerafloatheight() {
		var t = this.J7.__offset(this.z7, 60);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	entityproperty() {
		var t = this.J7.__offset(this.z7, 62);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxlevel() {
		var t = this.J7.__offset(this.z7, 64);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levelconsumeid() {
		var t = this.J7.__offset(this.z7, 66);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	breachid() {
		var t = this.J7.__offset(this.z7, 68);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skillid() {
		var t = this.J7.__offset(this.z7, 70);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skilltreegroupid() {
		var t = this.J7.__offset(this.z7, 72);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	resonanceid() {
		var t = this.J7.__offset(this.z7, 74);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	resonantchaingroupid() {
		var t = this.J7.__offset(this.z7, 76);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	isshow() {
		var t = this.J7.__offset(this.z7, 78);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	GetExchangeconsumeAt(t, i) {
		return this.exchangeconsume(t);
	}
	exchangeconsume(t, i) {
		var r = this.J7.__offset(this.z7, 80);
		return r
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	exchangeconsumeLength() {
		var t = this.J7.__offset(this.z7, 80);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	initweaponitemid() {
		var t = this.J7.__offset(this.z7, 82);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	weapontype() {
		var t = this.J7.__offset(this.z7, 84);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skilldapath(t) {
		var i = this.J7.__offset(this.z7, 86);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	skilllockdapath(t) {
		var i = this.J7.__offset(this.z7, 88);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	uisceneperformanceabp(t) {
		var i = this.J7.__offset(this.z7, 90);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	lockondefaultid() {
		var t = this.J7.__offset(this.z7, 92);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	lockonlookonid() {
		var t = this.J7.__offset(this.z7, 94);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skilleffectda(t) {
		var i = this.J7.__offset(this.z7, 96);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	footstepstate(t) {
		var i = this.J7.__offset(this.z7, 98);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	partyid() {
		var t = this.J7.__offset(this.z7, 100);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	attributesdescription(t) {
		var i = this.J7.__offset(this.z7, 102);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 104);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	itemqualityid() {
		var t = this.J7.__offset(this.z7, 106);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	obtainedshowdescription(t) {
		var i = this.J7.__offset(this.z7, 108);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	numlimit() {
		var t = this.J7.__offset(this.z7, 110);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showinbag() {
		var t = this.J7.__offset(this.z7, 112);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	GetWeaponscaleAt(t) {
		return this.weaponscale(t);
	}
	weaponscale(t) {
		var i = this.J7.__offset(this.z7, 114);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	weaponscaleLength() {
		var t = this.J7.__offset(this.z7, 114);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	weaponscaleArray() {
		var t = this.J7.__offset(this.z7, 114);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	intervene() {
		var t = this.J7.__offset(this.z7, 116);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	charactervoice(t) {
		var i = this.J7.__offset(this.z7, 118);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	trialrole() {
		var t = this.J7.__offset(this.z7, 120);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	isaim() {
		var t = this.J7.__offset(this.z7, 122);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	roleguide() {
		var t = this.J7.__offset(this.z7, 124);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	reddotdisablerule() {
		var t = this.J7.__offset(this.z7, 126);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetSkindamageAt(t) {
		return this.skindamage(t);
	}
	skindamage(t, i) {
		var r = this.J7.__offset(this.z7, 128);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	skindamageLength() {
		var t = this.J7.__offset(this.z7, 128);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.RoleInfo = RoleInfo;
//# sourceMappingURL=RoleInfo.js.map
