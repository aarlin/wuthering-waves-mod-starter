"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BuffItemModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	BuffItemData_1 = require("./BuffItemData"),
	UseBuffItemRoleData_1 = require("./UseBuffItemRoleData");
class BuffItemModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Ugt = new Map()),
			(this.Jot = new Map()),
			(this.Agt = 0),
			(this.Pgt = void 0),
			(this.xgt = void 0),
			(this.wgt = 0),
			(this.Bgt = (e) => {
				this.GetBuffItemRemainCdTime(this.wgt) <= 0 &&
					(this.xgt && this.xgt(), this.bgt());
			});
	}
	OnInit() {
		return !0;
	}
	OnClear() {
		return this.ClearAllUseBuffItemRoleData(), this.ClearAllBuffItemData(), !0;
	}
	OnLeaveLevel() {
		return this.ClearAllUseBuffItemRoleData(), !0;
	}
	NewBuffItemData(e, t, i) {
		(t = new BuffItemData_1.BuffItemData(e, t, i)), this.Jot.set(e, t);
	}
	GetBuffItemData(e) {
		return this.Jot.get(e);
	}
	GetBuffItemMap() {
		return this.Jot;
	}
	GetInCdBuffItemMap(e) {
		for (const i of this.Jot.values()) {
			var t;
			i.GetBuffItemRemainCdTime() <= 0 || ((t = i.ItemConfigId), e.set(t, i));
		}
	}
	ClearAllBuffItemData() {
		this.Ugt.clear(), this.Jot.clear();
	}
	NewUseBuffItemRoleData(e, t, i, s, f, m, a, r) {
		(e = new UseBuffItemRoleData_1.UseBuffItemRoleData(e, t, i, s, f, m, a, r)),
			this.Ugt.set(t, e);
	}
	SetCurrentUseBuffItemId(e) {
		this.Agt = e;
	}
	GetCurrentUseBuffItemId() {
		return this.Agt;
	}
	GetAllUseBuffItemRole() {
		return this.Ugt;
	}
	GetUseBuffItemRole(e) {
		return this.Ugt.get(e);
	}
	GetUseItemRoleByRoleConfigId(e) {
		for (const t of this.Ugt.values()) if (t.RoleConfigId === e) return t;
	}
	ClearAllUseBuffItemRoleData() {
		this.Ugt.clear();
	}
	GetBuffItemRemainCdTime(e) {
		return (e = this.GetBuffItemData(e)) ? e.GetBuffItemRemainCdTime() : 0;
	}
	GetBuffItemTotalCdTime(e) {
		return (e = this.GetBuffItemData(e)) ? e.GetBuffItemTotalCdTime() : 0;
	}
	SetBuffItemCdTimeStamp(e, t, i) {
		var s = this.GetBuffItemData(e);
		s
			? (s.SetEndCdTimeStamp(t), s.SetTotalCdTime(i))
			: this.NewBuffItemData(e, t, i);
	}
	SetBuffItemCdEndCallback(e, t) {
		this.GetBuffItemData(e) &&
			((this.wgt = e),
			(this.xgt = t),
			(this.Pgt = TimerSystem_1.TimerSystem.Forever(
				this.Bgt,
				TimeUtil_1.TimeUtil.InverseMillisecond,
			)));
	}
	bgt() {
		TimerSystem_1.TimerSystem.Has(this.Pgt) &&
			TimerSystem_1.TimerSystem.Remove(this.Pgt),
			(this.wgt = 0),
			(this.xgt = void 0),
			(this.Pgt = void 0);
	}
}
exports.BuffItemModel = BuffItemModel;
