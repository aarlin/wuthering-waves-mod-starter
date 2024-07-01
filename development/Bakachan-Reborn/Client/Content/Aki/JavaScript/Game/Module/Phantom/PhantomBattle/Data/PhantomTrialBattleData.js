"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomTrialBattleData = void 0);
const AttributeDefine_1 = require("../../../Attribute/AttributeDefine"),
	PhantomBattleData_1 = require("../PhantomBattleData");
class PhantomTrialBattleData extends PhantomBattleData_1.PhantomBattleData {
	constructor() {
		super(...arguments),
			(this.F5i = new Map()),
			(this.V5i = void 0),
			(this.H5i = new Map()),
			(this.B5i = 0),
			(this.j5i = 0);
	}
	SetMainPropValue(t, e, a) {
		(e = new AttributeDefine_1.AttributeValueData(t, e, a)), this.F5i.set(t, e);
	}
	SetSubPropValue(t, e, a) {
		(e = new AttributeDefine_1.AttributeValueData(t, e, a)), this.H5i.set(t, e);
	}
	SetFetterGroupId(t) {
		this.j5i = t;
	}
	GetFetterGroupId() {
		return this.j5i;
	}
	SetSlotIndex(t) {
		this.B5i = t;
	}
	GetIfMain() {
		return 0 === this.B5i;
	}
	GetUniqueId() {
		return this.GetIncrId();
	}
	GetMainTrailProp() {
		return this.F5i;
	}
	GetSubTrailPropMap() {
		return this.H5i;
	}
	GetBreachProp() {
		return this.V5i;
	}
	IsBreach() {
		return !0;
	}
}
exports.PhantomTrialBattleData = PhantomTrialBattleData;
