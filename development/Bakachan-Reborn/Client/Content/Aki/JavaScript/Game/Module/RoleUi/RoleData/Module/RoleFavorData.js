"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorData = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	FavorItemInfo_1 = require("./DataInfo/FavorItemInfo"),
	RoleModuleDataBase_1 = require("./RoleModuleDataBase");
class RoleFavorData extends RoleModuleDataBase_1.RoleModuleDataBase {
	constructor() {
		super(...arguments),
			(this.Level = 0),
			(this.Exp = 0),
			(this.Ylo = new Map());
	}
	GetFavorLevel() {
		return this.Level;
	}
	SetFavorLevel(e) {
		this.Level = e;
	}
	GetFavorExp() {
		return this.Exp;
	}
	SetFavorExp(e) {
		(this.Exp = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RoleFavorExpChange,
			);
	}
	UpdateRoleFavorData(e, t) {
		this.Ylo.set(e, this.Jlo(t)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.UpdateRoleFavorData,
				this.RoleId,
			);
	}
	UpdateUnlockId(e, t, o) {
		e = this.GetClientFavorTabType(e);
		var r = this.Ylo.get(e),
			a = r.length;
		for (let e = 0; e < a; e++) {
			var n = r[e];
			n.Id === o && (n.Status = 2);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.UpdateRoleFavorData,
			this.RoleId,
		),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.UnLockRoleFavorItem,
				t,
				o,
			);
	}
	UpdateCanUnlockId(e, t) {
		e = this.GetClientFavorTabType(e);
		var o,
			r = this.Ylo.get(e);
		if (r) {
			var a = r.length;
			let e = !1;
			for (let o = 0; o < a; o++) {
				var n = r[o];
				if (n.Id === t) {
					(e = !0), (n.Status = 1);
					break;
				}
			}
			e || r.push(new FavorItemInfo_1.FavorItemInfo(t, 1)),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.UpdateRoleFavorData,
					this.RoleId,
				);
		} else
			(o = []).push(new FavorItemInfo_1.FavorItemInfo(t, 1)),
				this.Ylo.set(e, o);
	}
	Jlo(e) {
		var t = [],
			o = e.length;
		for (let a = 0; a < o; a++) {
			var r = e[a];
			t.push(this.zlo(r));
		}
		return t;
	}
	zlo(e) {
		var t = this.GetClientFavorItemStatus(e.n3n);
		return new FavorItemInfo_1.FavorItemInfo(e.Ekn, t);
	}
	GetFavorItemState(e, t) {
		var o = this.Ylo.get(t),
			r = o.length;
		for (let t = 0; t < r; t++) {
			var a = o[t];
			if (a.Id === e) return a.Status;
		}
		return 0;
	}
	GetClientFavorItemStatus(e) {
		let t;
		return (
			e === Protocol_1.Aki.Protocol.cks.Proto_ItemLocked
				? (t = 0)
				: e === Protocol_1.Aki.Protocol.cks.Proto_ItemCanUnLock
					? (t = 1)
					: e === Protocol_1.Aki.Protocol.cks.Proto_ItemUnLocked && (t = 2),
			t
		);
	}
	GetClientFavorTabType(e) {
		return e === Protocol_1.Aki.Protocol.dks.I3n
			? 0
			: e === Protocol_1.Aki.Protocol.dks.Proto_Story
				? 1
				: e === Protocol_1.Aki.Protocol.dks.Proto_Goods
					? 3
					: void 0;
	}
	IsExistCanUnlockFavorItem() {
		for (var [e] of this.Ylo) if (this.IsFavorItemCanUnlock(e)) return !0;
		return !1;
	}
	IsFavorItemCanUnlock(e) {
		if (2 === e)
			return ModelManager_1.ModelManager.MotionModel.IfRoleMotionCanUnlock(
				this.RoleId,
			);
		var t = this.Ylo.get(e);
		if (t) {
			var o = t.length;
			for (let e = 0; e < o; e++) if (1 === t[e].Status) return !0;
		}
		return !1;
	}
	GetUnlockActionIndexList() {
		var e = [],
			t = this.Ylo.get(2);
		if (t) {
			var o = t.length;
			for (let a = 0; a < o; a++) {
				var r = t[a];
				2 === r.Status &&
					((r = ConfigManager_1.ConfigManager.MotionConfig.GetMotionConfig(
						r.Id,
					)),
					e.push(r.Sort));
			}
		}
		return e;
	}
}
exports.RoleFavorData = RoleFavorData;
