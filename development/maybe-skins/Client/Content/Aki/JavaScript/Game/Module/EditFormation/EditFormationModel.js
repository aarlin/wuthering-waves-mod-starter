"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditFormationModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	EditFormationData_1 = require("./EditFormationData"),
	EditFormationDefine_1 = require("./EditFormationDefine"),
	HEALTH_ID = 3;
class EditingRoleData {
	constructor(t) {
		(this.Position = 0), (this.RoleId = 0), (this.Position = t);
	}
}
class EditFormationModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.s4t = new Map()),
			(this.a4t = void 0),
			(this.h4t = new Map());
	}
	UpdatePlayerFormations(t) {
		this.s4t.clear();
		let e = 0;
		var o = new Map();
		for (const s of t) {
			var a = s.aFn,
				r = a === ModelManager_1.ModelManager.PlayerInfoModel.GetId();
			for (const t of s.J4n) {
				var n = t.$4n;
				if (r || !(0 < n)) {
					r && t.X4n && (e = n);
					let s = o.get(n);
					s || ((s = new Array()), o.set(n, s));
					for (const e of t.FLs) {
						var i = r && e.l3n === t.Y4n;
						s.push([e, a, i]);
					}
				}
			}
		}
		for (const t of o) {
			var s = t[0],
				d = new EditFormationData_1.EditFormationData(s);
			this.s4t.set(s, d);
			for (const e of t[1]) {
				var l = e[0],
					M = e[1],
					f = e[2];
				d.AddRoleData(l.l3n, l.r3n, M, f);
			}
			s === e && (this.a4t = d);
		}
	}
	ChangeEditedMainRole() {
		var t = ModelManager_1.ModelManager.RoleModel;
		for (const a of this.h4t.values())
			for (const r of a) {
				var e,
					o = r.RoleId;
				t.IsMainRole(o) &&
					(e = t.GetNewMainRoleId(o)) &&
					o !== e &&
					(r.RoleId = e);
			}
	}
	InitEditingFormationMap() {
		this.h4t.clear();
		for (const e of this.s4t.values()) {
			var t = e.FormationId;
			for (const o of e.GetRoleDataMap().values())
				this.SetEditingRoleId(t, o.Position, o.ConfigId);
		}
	}
	IsRoleDead(t) {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
			ParamType: 0,
			OnlyMyRole: !0,
		});
		return e
			? e.IsDead()
			: !(e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)) ||
					e.GetAttributeData().GetAttrValueById(3) <= 0;
	}
	SetEditingRoleId(t, e, o = 0, a = !0) {
		if (e > EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM || e <= 0) return !1;
		if (!this.IsMyPosition(e)) return !1;
		let r = this.h4t.get(t);
		if (!r) {
			(r = new Array()), this.h4t.set(t, r);
			for (let t = 1; t <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; t++)
				r.push(new EditingRoleData(t));
		}
		var n = [];
		for (const t of r) {
			t.Position === e && (t.RoleId = o);
			var i = t.RoleId;
			i && n.push(i);
		}
		if (!ModelManager_1.ModelManager.GameModeModel.IsMulti && a)
			for (const t of r) {
				const e = n[t.Position - 1];
				t.RoleId = e ?? 0;
			}
		return !0;
	}
	GetEditingRoleId(t, e) {
		if ((t = this.h4t.get(t)))
			for (const o of t) if (o.Position === e) return o.RoleId;
		return 0;
	}
	GetEditingRolePosition(t, e) {
		if ((t = this.h4t.get(t)))
			for (const o of t) if (o.RoleId === e) return o.Position;
		return -1;
	}
	GetEditingRoleIdList(t) {
		var e = new Array();
		if ((t = this.h4t.get(t)))
			for (const a of t) {
				var o = a.RoleId;
				o && e.push(o);
			}
		return e;
	}
	GetAllEditingFormation() {
		var t,
			e,
			o = new Map();
		for ([t, e] of this.h4t) {
			var a = [];
			for (const t of e) {
				var r = t.RoleId;
				r && a.push(r);
			}
			o.set(t, a);
		}
		return o;
	}
	IsInEditingFormation(t, e) {
		return 0 < this.GetEditingRolePosition(t, e);
	}
	GetFormationData(t) {
		return this.s4t.get(t);
	}
	get GetCurrentFormationData() {
		return this.a4t;
	}
	get GetCurrentFormationId() {
		return this.a4t?.FormationId;
	}
	ApplyCurrentFormationData(t) {
		(t = this.s4t.get(t)) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Formation",
					49,
					"设置当前编队数据 [ApplyCurrentFormationData]",
					["data", t],
				),
			(this.a4t = t));
	}
	IsMyPosition(t) {
		var e;
		return (
			!ModelManager_1.ModelManager.GameModeModel.IsMulti ||
			((e = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()),
			(t = this.GetCurrentFormationData?.GetRoleDataByPosition(t))?.ConfigId
				? ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t.PlayerId
				: e)
		);
	}
}
exports.EditFormationModel = EditFormationModel;
