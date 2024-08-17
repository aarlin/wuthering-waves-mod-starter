"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComboTeachingModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class ComboTeachingModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.vyt = 0),
			(this.Myt = 0),
			(this.Syt = !1),
			(this.Eyt = !1),
			(this.yyt = 0),
			(this.Iyt = 0),
			(this.Tyt = []),
			(this.Lyt = []),
			(this.Dyt = 0),
			(this.Ryt = !1),
			(this.Uyt = !1),
			(this.Ayt = 0);
	}
	get BeforeJumpTime() {
		return this.Ayt;
	}
	set BeforeJumpTime(t) {
		this.Ayt = t;
	}
	get IsClose() {
		return this.Uyt;
	}
	set IsClose(t) {
		this.Uyt = t;
	}
	get IsEmit() {
		return this.Ryt;
	}
	set IsEmit(t) {
		this.Ryt = t;
	}
	get RecoveryComboId() {
		return this.Dyt;
	}
	set RecoveryComboId(t) {
		this.Dyt = t;
	}
	get AddBuffList() {
		return this.Tyt;
	}
	get AddTagList() {
		return this.Lyt;
	}
	get NextAttrSkillId() {
		return this.Iyt;
	}
	set NextAttrSkillId(t) {
		this.Iyt = t;
	}
	set UseSkillId(t) {
		this.vyt = t;
	}
	get UseSkillId() {
		return this.vyt;
	}
	set UseSkillTime(t) {
		this.Myt = t;
	}
	get UseSkillTime() {
		return this.Myt;
	}
	set PreNextAttr(t) {
		this.Syt = t;
	}
	get PreNextAttr() {
		return this.Syt;
	}
	set NextAttr(t) {
		(this.Syt = this.Eyt), (this.Eyt = t);
	}
	get NextAttr() {
		return this.Eyt;
	}
	set HitSkillId(t) {
		this.yyt = t;
	}
	get HitSkillId() {
		return this.yyt;
	}
}
exports.ComboTeachingModel = ComboTeachingModel;
