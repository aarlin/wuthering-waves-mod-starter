"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BuildingUpGradeCurve = void 0);
class BuildingUpGradeCurve {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GroupId() {
		return this.groupid();
	}
	get Level() {
		return this.level();
	}
	get UpGradePrice() {
		return this.upgradeprice();
	}
	get HeatAddition() {
		return this.heataddition();
	}
	get GoldAddition() {
		return this.goldaddition();
	}
	get GoldAdditionFix() {
		return this.goldadditionfix();
	}
	get WishAddition() {
		return this.wishaddition();
	}
	get WishAdditionFix() {
		return this.wishadditionfix();
	}
	get EnergyAddition() {
		return this.energyaddition();
	}
	get ModelId() {
		return this.modelid();
	}
	get IdeaRatioAddition() {
		return this.idearatioaddition();
	}
	get SuccessAddition() {
		return this.successaddition();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsBuildingUpGradeCurve(t, i) {
		return (i || new BuildingUpGradeCurve()).__init(
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
	level() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	upgradeprice() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	heataddition() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	goldaddition() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	goldadditionfix() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	wishaddition() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	wishadditionfix() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	energyaddition() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	modelid() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	idearatioaddition() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	successaddition() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.BuildingUpGradeCurve = BuildingUpGradeCurve;
//# sourceMappingURL=BuildingUpGradeCurve.js.map
