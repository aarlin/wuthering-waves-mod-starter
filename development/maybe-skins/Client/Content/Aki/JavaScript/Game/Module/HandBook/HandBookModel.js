"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookModel = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	HandBookController_1 = require("./HandBookController"),
	HandBookDefine_1 = require("./HandBookDefine");
class HandBookModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.kZt = new Map()),
			(this.FZt = []),
			(this.VZt = new Map()),
			(this.HZt = new Map());
	}
	UpdateHandBookActiveStateMap(o, e) {
		o = this.GetClientHandBookType(o, e.qRs);
		var t = e.Ekn,
			n = TimeUtil_1.TimeUtil.DateFormat4(
				new Date(e.BRs * TimeUtil_1.TimeUtil.InverseMillisecond),
			),
			a = e.cfs,
			r = e.O3n,
			i = new HandBookDefine_1.HandBookEntry(t, n, r, a),
			s = this.kZt.get(o);
		if (s) {
			var k = s.length;
			let o = !1;
			for (let e = 0; e < k; e++) {
				const t = s[e];
				if (t.Id === i.Id) {
					(t.CreateTime = i.CreateTime),
						(t.IsRead = i.IsRead),
						(t.Num = i.Num),
						(o = !0);
					break;
				}
			}
			o || s.push(i);
		} else (t = []).push(i), this.kZt.set(o, t);
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnHandBookDataUpdate,
			o,
			e.Ekn,
		);
	}
	ClearHandBookActiveStateMap() {
		this.kZt.clear();
	}
	InitHandBookActiveStateMap(o, e) {
		var t = this.GetClientHandBookEntryList(e),
			n = [],
			a = t.length;
		if (o !== Protocol_1.Aki.Protocol.Hks.Proto_Photograph) {
			var r = this.GetClientHandBookType(o);
			for (let o = 0; o < a; o++) {
				var i = t[o];
				HandBookController_1.HandBookController.CheckConfigIsLegal(r, i.Id) &&
					n.push(i);
			}
			this.kZt.set(r, n);
		} else {
			this.ZBn();
			for (let n = 0; n < a; n++) {
				var s = t[n],
					k = this.GetClientHandBookType(o, e[n].qRs);
				HandBookController_1.HandBookController.CheckConfigIsLegal(k, s.Id) &&
					this.kZt.get(k).push(s);
			}
		}
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHandBookDataInit);
	}
	ZBn() {
		this.kZt.set(9, []), this.kZt.set(8, []), this.kZt.set(7, []);
	}
	InitHandBookRedDotList(o) {
		this.FZt = [];
		var e = o.length;
		for (let i = 0; i < e; i++) {
			var t = this.GetClientHandBookType(o[i]);
			if (5 === t) {
				var n =
						ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookTypeConfigList(),
					a = n.length;
				for (let o = 0; o < a; o++) {
					var r = n[o];
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnItemReadRedDotUpdate,
						r.Id,
					);
				}
			}
			this.FZt.push(t);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnHandBookRedDotUpdate,
		);
	}
	UpdateRedDot(o, e) {
		var t = this.kZt.get(o);
		if (t) {
			var n = t.length;
			for (let r = 0; r < n; r++) {
				var a = t[r];
				if (a.Id === e) {
					(a.IsRead = !0),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnHandBookRead,
							o,
							a.Id,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnPhantomReadRedDotUpdate,
						),
						5 === o &&
							((a =
								ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigById(
									e,
								)),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnItemReadRedDotUpdate,
								a.Type,
							));
					break;
				}
			}
		}
	}
	IsShowRedDot(o) {
		var e = this.FZt.length;
		for (let t = 0; t < e; t++) if (o === this.FZt[t]) return !0;
		return !1;
	}
	GetCollectCount(o) {
		return (o = this.kZt.get(o)) ? o.length : 0;
	}
	GetClientHandBookEntryList(o) {
		var e = [],
			t = o.length;
		for (let s = 0; s < t; s++) {
			var n = (i = o[s]).Ekn,
				a = TimeUtil_1.TimeUtil.DateFormat4(
					new Date(i.BRs * TimeUtil_1.TimeUtil.InverseMillisecond),
				),
				r = i.cfs,
				i = i.O3n;
			n = new HandBookDefine_1.HandBookEntry(n, a, i, r);
			e.push(n);
		}
		return e;
	}
	GetHandBookInfo(o, e) {
		var t = this.kZt.get(o);
		if (t) {
			var n = t.length;
			for (let o = 0; o < n; o++) {
				var a = t[o];
				if (a.Id === e) return a;
			}
		}
	}
	GetHandBookInfoList(o) {
		if ((o = this.kZt.get(o))) return o;
	}
	GetClientHandBookType(o, e) {
		let t;
		switch (o) {
			case Protocol_1.Aki.Protocol.Hks.Proto_Monster:
				t = 0;
				break;
			case Protocol_1.Aki.Protocol.Hks.Proto_VocalCorpse:
				t = 1;
				break;
			case Protocol_1.Aki.Protocol.Hks.Proto_ViewPoint:
				t = 2;
				break;
			case Protocol_1.Aki.Protocol.Hks.Proto_Weapon:
				t = 3;
				break;
			case Protocol_1.Aki.Protocol.Hks.Proto_Animal:
				t = 4;
				break;
			case Protocol_1.Aki.Protocol.Hks.pbs:
				t = 5;
				break;
			case Protocol_1.Aki.Protocol.Hks.Proto_Chip:
				t = 6;
				break;
			case Protocol_1.Aki.Protocol.Hks.Proto_Photograph:
				if (e)
					switch (e) {
						case Protocol_1.Aki.Protocol.qRs.Proto_PhotographSub:
							t = 7;
							break;
						case Protocol_1.Aki.Protocol.qRs.OMs:
							t = 9;
							break;
						case Protocol_1.Aki.Protocol.qRs.tRs:
							t = 8;
							break;
						default:
							t = 7;
					}
				else t = 7;
		}
		return t;
	}
	GetServerHandBookType(o) {
		let e;
		switch (o) {
			case 0:
				e = Protocol_1.Aki.Protocol.Hks.Proto_Monster;
				break;
			case 1:
				e = Protocol_1.Aki.Protocol.Hks.Proto_VocalCorpse;
				break;
			case 2:
				e = Protocol_1.Aki.Protocol.Hks.Proto_ViewPoint;
				break;
			case 3:
				e = Protocol_1.Aki.Protocol.Hks.Proto_Weapon;
				break;
			case 4:
				e = Protocol_1.Aki.Protocol.Hks.Proto_Animal;
				break;
			case 5:
				e = Protocol_1.Aki.Protocol.Hks.pbs;
				break;
			case 6:
				e = Protocol_1.Aki.Protocol.Hks.Proto_Chip;
				break;
			default:
				e = Protocol_1.Aki.Protocol.Hks.Proto_Photograph;
		}
		return e;
	}
	GetServerHandBookTypeList(o) {
		var e = o.length,
			t = [];
		for (let a = 0; a < e; a++) {
			var n = this.GetServerHandBookType(o[a]);
			t.push(n);
		}
		return t;
	}
	GetConfigListIdByType(o) {
		var e = this.VZt.get(o);
		if (e) return e;
		let t;
		switch (o) {
			case 0:
				t =
					ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigList();
				break;
			case 1:
				t =
					ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfig();
				break;
			case 2:
				t =
					ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig();
				break;
			case 3:
				t =
					ConfigManager_1.ConfigManager.HandBookConfig.GetWeaponHandBookConfigList();
				break;
			case 4:
				t =
					ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList();
				break;
			case 5:
				t =
					ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigList();
				break;
			case 6:
				t =
					ConfigManager_1.ConfigManager.HandBookConfig.GetAllChipHandBookConfig();
				break;
			default:
				t =
					ConfigManager_1.ConfigManager.HandBookConfig.GetAllPlotHandBookConfig();
		}
		var n = t.length,
			a = [];
		for (let o = 0; o < n; o++) {
			var r = t[o];
			a.push(r.Id);
		}
		return this.VZt.set(o, a), a;
	}
	GetAnimalConfigByMeshId(o) {
		if (0 === this.HZt.size) {
			var e =
					ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList(),
				t = e.length;
			for (let o = 0; o < t; o++) {
				var n = e[o];
				this.HZt.set(n.MeshId, n);
			}
		}
		return this.HZt.get(o);
	}
}
exports.HandBookModel = HandBookModel;
