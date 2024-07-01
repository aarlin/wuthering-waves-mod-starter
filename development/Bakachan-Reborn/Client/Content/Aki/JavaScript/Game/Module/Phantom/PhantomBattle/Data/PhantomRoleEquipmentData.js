"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomRoleEquipmentData = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	AttrListScrollData_1 = require("../../../RoleUi/View/ViewData/AttrListScrollData"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class PhantomRoleEquipmentData {
	constructor() {
		(this.zke = 0), (this.O5i = [0, 0, 0, 0, 0]), (this.k5i = void 0);
	}
	Phrase(t) {
		t instanceof Protocol_1.Aki.Protocol.iNs
			? ((this.zke = t.l3n), (this.O5i = t.c8n))
			: t instanceof Protocol_1.Aki.Protocol.rNs && (this.k5i = t);
	}
	GetRoleId() {
		return this.zke;
	}
	RemoveIncrIdLocal(t) {
		0 < t && 0 <= (t = this.O5i.indexOf(t)) && (this.O5i[t] = 0);
	}
	GetIncrIdList() {
		return this.O5i;
	}
	GetPropData() {
		return this.k5i;
	}
	CheckPhantomIsMain(t) {
		return 0 < this.O5i.length && this.O5i[0] === t;
	}
	CheckPhantomIsSub(t) {
		return 0 < this.O5i.length && this.O5i[0] !== t && this.O5i.includes(t);
	}
	CheckMonsterIsEquip(t) {
		var e = this.O5i.length;
		for (let o = 0; o < e; o++) {
			var r =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
					this.O5i[o],
				);
			if (r && r.GetMonsterId() === t) return !0;
		}
		return !1;
	}
	GetPhantomIndex(t) {
		var e = this.O5i.length;
		for (let r = 0; r < e; r++) if (this.O5i[r] === t) return r;
		return -1;
	}
	GetIndexPhantomId(t) {
		return this.O5i.length > t ? this.O5i[t] : 0;
	}
	GetSumEquipLevel() {
		let t = 0;
		return (
			this.O5i.forEach((e) => {
				(e =
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
						e,
					)) && (t += e.GetPhantomLevel());
			}),
			t
		);
	}
	GetAverageEquipLevel() {
		var t = this.O5i.length;
		return t <= 0 ? 0 : this.GetSumEquipLevel() / t;
	}
	GetPhantomOperationState(t, e) {
		return 0 === (t = this.O5i[t]) ? 1 : t === e ? 0 : 2;
	}
	GetCombinationActiveNum(t) {
		let e = 0;
		var r = new Array();
		for (const i of t)
			for (const t of this.GetIncrIdList()) {
				var o =
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
						t,
					);
				!o || i !== o.GetMonsterId() || r.includes(i) || (r.push(i), e++);
			}
		return t.length - e;
	}
	GetPropDetailAttributeList() {
		var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"VisionMainViewExtraAttribute",
		);
		const e = this.GetPropShowAttributeList(),
			r = e.length,
			o = [];
		let i = !1;
		return (
			t.forEach((t) => {
				i = !1;
				for (let n = 0; n < r; n++)
					if (e[n].Id === t) {
						o.push(e[n]), (i = !0);
						break;
					}
				var n;
				i ||
					((n =
						ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
							t,
						)),
					o.push(
						new AttrListScrollData_1.AttrListScrollData(
							t,
							0,
							0,
							n.Priority,
							!1,
							1,
						),
					));
			}),
			o
		);
	}
	GetPropShowAttributeList() {
		var t = new Array();
		const e = new Map(),
			r =
				(this.k5i?.hDs.forEach((t) => {
					e.set(t.Ckn, t.gkn);
				}),
				new Map());
		this.k5i?.lDs.forEach((t) => {
			r.set(t.Ckn, t.gkn), e.has(t.Ckn) || e.set(t.Ckn, 0);
		});
		var o = Array.from(e.keys()),
			i = o.length;
		for (let a = 0; a < i; a++) {
			var n =
				ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
					o[a],
				);
			t.push(
				new AttrListScrollData_1.AttrListScrollData(
					o[a],
					e.get(o[a]),
					r.get(o[a]) ?? 0,
					n.Priority,
					!1,
					1,
				),
			);
		}
		return t;
	}
	CheckHasEmpty() {
		return this.O5i && 0 <= this.O5i.findIndex((t) => 0 === t);
	}
	GetEquippedNum() {
		return this.O5i ? this.O5i.filter((t) => 0 < t).length : 0;
	}
}
exports.PhantomRoleEquipmentData = PhantomRoleEquipmentData;
