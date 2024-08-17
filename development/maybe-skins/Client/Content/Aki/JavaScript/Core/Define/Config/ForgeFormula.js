"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ForgeFormula = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	OneItemConfig_1 = require("./SubType/OneItemConfig");
class ForgeFormula {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get FormulaItemId() {
		return this.formulaitemid();
	}
	get ItemId() {
		return this.itemid();
	}
	get TypeId() {
		return this.typeid();
	}
	get Unlock() {
		return this.unlock();
	}
	get Name() {
		return this.name();
	}
	get ConsumeItems() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.consumeitemsLength(),
			(t) => this.consumeitems(t),
		);
	}
	get ForgeContent() {
		return this.forgecontent();
	}
	get Background() {
		return this.background();
	}
	get RoleList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.rolelistLength(), (t) =>
			this.rolelist(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsForgeFormula(t, s) {
		return (s || new ForgeFormula()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	formulaitemid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	typeid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	unlock() {
		var t = this.J7.__offset(this.z7, 12);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetConsumeitemsAt(t, s) {
		return this.consumeitems(t);
	}
	consumeitems(t, s) {
		var i = this.J7.__offset(this.z7, 16);
		return i
			? (s || new OneItemConfig_1.OneItemConfig()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	consumeitemsLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	forgecontent(t) {
		var s = this.J7.__offset(this.z7, 18);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	background(t) {
		var s = this.J7.__offset(this.z7, 20);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetRolelistAt(t) {
		return this.rolelist(t);
	}
	rolelist(t) {
		var s = this.J7.__offset(this.z7, 22);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	rolelistLength() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	rolelistArray() {
		var t = this.J7.__offset(this.z7, 22);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.ForgeFormula = ForgeFormula;
//# sourceMappingURL=ForgeFormula.js.map
