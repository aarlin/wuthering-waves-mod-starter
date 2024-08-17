"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponConf = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	ConfigPropValue_1 = require("./SubType/ConfigPropValue"),
	StringArray_1 = require("./SubType/StringArray");
class WeaponConf {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ItemId() {
		return this.itemid();
	}
	get WeaponName() {
		return this.weaponname();
	}
	get QualityId() {
		return this.qualityid();
	}
	get WeaponType() {
		return this.weapontype();
	}
	get ModelId() {
		return this.modelid();
	}
	get TransformId() {
		return this.transformid();
	}
	get Models() {
		return GameUtils_1.GameUtils.ConvertToArray(this.modelsLength(), (t) =>
			this.models(t),
		);
	}
	get ResonLevelLimit() {
		return this.resonlevellimit();
	}
	get FirstPropId() {
		return this.firstpropid();
	}
	get FirstCurve() {
		return this.firstcurve();
	}
	get SecondPropId() {
		return this.secondpropid();
	}
	get SecondCurve() {
		return this.secondcurve();
	}
	get ResonId() {
		return this.resonid();
	}
	get LevelId() {
		return this.levelid();
	}
	get BreachId() {
		return this.breachid();
	}
	get Desc() {
		return this.desc();
	}
	get DescParams() {
		return GameUtils_1.GameUtils.ConvertToArray(this.descparamsLength(), (t) =>
			this.descparams(t),
		);
	}
	get TypeDescription() {
		return this.typedescription();
	}
	get AttributesDescription() {
		return this.attributesdescription();
	}
	get BgDescription() {
		return this.bgdescription();
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
	get ResonanceIcon() {
		return this.resonanceicon();
	}
	get HiddenTime() {
		return this.hiddentime();
	}
	get Destructible() {
		return this.destructible();
	}
	get RedDotDisableRule() {
		return this.reddotdisablerule();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsWeaponConf(t, i) {
		return (i || new WeaponConf()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	weaponname(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	qualityid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	weapontype() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	modelid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	transformid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetModelsAt(t) {
		return this.models(t);
	}
	models(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	modelsLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	modelsArray() {
		var t = this.J7.__offset(this.z7, 16);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	resonlevellimit() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	firstpropid(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i
			? (t || new ConfigPropValue_1.ConfigPropValue()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	firstcurve() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	secondpropid(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i
			? (t || new ConfigPropValue_1.ConfigPropValue()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	secondcurve() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	resonid() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levelid() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	breachid() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	desc(t) {
		var i = this.J7.__offset(this.z7, 34);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetDescparamsAt(t, i) {
		return this.descparams(t);
	}
	descparams(t, i) {
		var s = this.J7.__offset(this.z7, 36);
		return s
			? (i || new StringArray_1.StringArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	descparamsLength() {
		var t = this.J7.__offset(this.z7, 36);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	typedescription(t) {
		var i = this.J7.__offset(this.z7, 38);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	attributesdescription(t) {
		var i = this.J7.__offset(this.z7, 40);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	bgdescription(t) {
		var i = this.J7.__offset(this.z7, 42);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 44);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	iconmiddle(t) {
		var i = this.J7.__offset(this.z7, 46);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	iconsmall(t) {
		var i = this.J7.__offset(this.z7, 48);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	mesh(t) {
		var i = this.J7.__offset(this.z7, 50);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	maxcapcity() {
		var t = this.J7.__offset(this.z7, 52);
		return t ? this.J7.readInt32(this.z7 + t) : 999999999;
	}
	GetItemaccessAt(t) {
		return this.itemaccess(t);
	}
	itemaccess(t) {
		var i = this.J7.__offset(this.z7, 54);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	itemaccessLength() {
		var t = this.J7.__offset(this.z7, 54);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	itemaccessArray() {
		var t = this.J7.__offset(this.z7, 54);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	obtainedshow() {
		var t = this.J7.__offset(this.z7, 56);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	obtainedshowdescription(t) {
		var i = this.J7.__offset(this.z7, 58);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	numlimit() {
		var t = this.J7.__offset(this.z7, 60);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showinbag() {
		var t = this.J7.__offset(this.z7, 62);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	sortindex() {
		var t = this.J7.__offset(this.z7, 64);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	resonanceicon(t) {
		var i = this.J7.__offset(this.z7, 66);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	hiddentime() {
		var t = this.J7.__offset(this.z7, 68);
		return t ? this.J7.readFloat32(this.z7 + t) : 10;
	}
	destructible() {
		var t = this.J7.__offset(this.z7, 70);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	reddotdisablerule() {
		var t = this.J7.__offset(this.z7, 72);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.WeaponConf = WeaponConf;
//# sourceMappingURL=WeaponConf.js.map
