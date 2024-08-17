"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomSort = void 0);
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	CommonItemData_1 = require("../../../../../Inventory/ItemData/CommonItemData"),
	PhantomItemData_1 = require("../../../../../Inventory/ItemData/PhantomItemData"),
	ItemViewData_1 = require("../../../../../Inventory/ItemViewData"),
	CommonSort_1 = require("./CommonSort");
class PhantomSort extends CommonSort_1.CommonSort {
	constructor() {
		super(...arguments),
			(this.ZLt = (t, a, e) => {
				var n, i, o;
				return (t instanceof ItemViewData_1.ItemViewData &&
					a instanceof ItemViewData_1.ItemViewData) ||
					(t instanceof PhantomItemData_1.PhantomItemData &&
						a instanceof PhantomItemData_1.PhantomItemData)
					? ((o = ModelManager_1.ModelManager.PhantomBattleModel),
						(i = t.GetUniqueId()),
						(n = a.GetUniqueId()),
						(i = o.GetPhantomBattleData(i)),
						(o = o.GetPhantomBattleData(n)),
						i.GetPhantomLevel() !== o.GetPhantomLevel()
							? (o.GetPhantomLevel() - i.GetPhantomLevel()) * (e ? -1 : 1)
							: 0)
					: t.Level !== a.Level
						? (a.Level - t.Level) * (e ? -1 : 1)
						: 0;
			}),
			(this.iDt = (t, a, e) => {
				var n = t,
					i = a;
				(t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(
					n.GetUniqueId(),
				)),
					(a =
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(
							i.GetUniqueId(),
						));
				let o = 0,
					s = 0;
				if (t) o = t.GetExp();
				else {
					var h =
							ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList(),
						r = h.length;
					for (let t = 0; t < r; t++)
						if (h[t].ItemId === n.GetConfigId()) {
							o = h[t].Exp;
							break;
						}
				}
				if (a) s = t.GetExp();
				else {
					var M =
							ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList(),
						D = M.length;
					for (let t = 0; t < D; t++)
						if (M[t].ItemId === i.GetConfigId()) {
							s = M[t].Exp;
							break;
						}
				}
				return o !== s ? (s - o) * (e ? -1 : 1) : 0;
			}),
			(this.oDt = (t, a, e) => {
				var n = t,
					i = a,
					o =
						ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList(),
					s = o.length;
				let h = !1;
				for (let t = 0; t < s; t++)
					if (o[t].ItemId === n.GetConfigId()) {
						h = !0;
						break;
					}
				let r = !1;
				for (let t = 0; t < s; t++)
					if (o[t].ItemId === i.GetConfigId()) {
						r = !0;
						break;
					}
				return h !== r ? (r ? 1 : 0) - (t = h ? 1 : 0) : 0;
			}),
			(this.rDt = (t, a, e) => {
				var n, i, o;
				return (t instanceof ItemViewData_1.ItemViewData &&
					a instanceof ItemViewData_1.ItemViewData) ||
					(t instanceof PhantomItemData_1.PhantomItemData &&
						a instanceof PhantomItemData_1.PhantomItemData)
					? ((n = ModelManager_1.ModelManager.PhantomBattleModel),
						(i = t.GetUniqueId()),
						(o = a.GetUniqueId()),
						(i = n.GetPhantomBattleData(i)),
						(n = n.GetPhantomBattleData(o)),
						(o = i.GetPhantomSubProp()),
						(i = n.GetPhantomSubProp()),
						(n = 0 < o?.length ? 1 : 0) != (o = 0 < i?.length ? 1 : 0)
							? (o - n) * (e ? -1 : 1)
							: 0)
					: (i = t.IsBreach ? 1 : 0) != (o = a.IsBreach ? 1 : 0)
						? (o - i) * (e ? -1 : 1)
						: 0;
			}),
			(this.VLt = (t, a, e) => {
				var n, i, o;
				return t instanceof CommonItemData_1.CommonItemData &&
					a instanceof CommonItemData_1.CommonItemData
					? (a.GetQuality() - t.GetQuality()) * (e ? -1 : 1)
					: (t instanceof ItemViewData_1.ItemViewData &&
								a instanceof ItemViewData_1.ItemViewData) ||
							(t instanceof PhantomItemData_1.PhantomItemData &&
								a instanceof PhantomItemData_1.PhantomItemData)
						? ((o = ModelManager_1.ModelManager.PhantomBattleModel),
							(i = t.GetUniqueId()),
							(n = a.GetUniqueId()),
							(i = o.GetPhantomBattleData(i)),
							(o = o.GetPhantomBattleData(n)),
							i.GetQuality() !== o.GetQuality()
								? (o.GetQuality() - i.GetQuality()) * (e ? -1 : 1)
								: 0)
						: t.Quality !== a.Quality
							? (a.Quality - t.Quality) * (e ? -1 : 1)
							: 0;
			}),
			(this.WLt = (t, a, e) => {
				var n, i, o;
				return (t instanceof ItemViewData_1.ItemViewData &&
					a instanceof ItemViewData_1.ItemViewData) ||
					(t instanceof PhantomItemData_1.PhantomItemData &&
						a instanceof PhantomItemData_1.PhantomItemData)
					? ((o = ModelManager_1.ModelManager.PhantomBattleModel),
						(i = t.GetUniqueId()),
						(n = a.GetUniqueId()),
						(i = o.GetPhantomBattleData(i)),
						(o = o.GetPhantomBattleData(n)),
						i.GetConfigId() !== o.GetConfigId()
							? (o.GetConfigId() - i.GetConfigId()) * (e ? -1 : 1)
							: 0)
					: t.MonsterId !== a.MonsterId
						? (a.MonsterId - t.MonsterId) * (e ? -1 : 1)
						: 0;
			}),
			(this.eDt = (t, a, e) => {
				var n, i, o;
				return (t instanceof ItemViewData_1.ItemViewData &&
					a instanceof ItemViewData_1.ItemViewData) ||
					(t instanceof PhantomItemData_1.PhantomItemData &&
						a instanceof PhantomItemData_1.PhantomItemData)
					? ((o = ModelManager_1.ModelManager.PhantomBattleModel),
						(i = t.GetUniqueId()),
						(n = a.GetUniqueId()),
						(i = o.GetPhantomBattleData(i)),
						(o = o.GetPhantomBattleData(n)),
						i.GetUniqueId() !== o.GetUniqueId()
							? (o.GetUniqueId() - i.GetUniqueId()) * (e ? -1 : 1)
							: 0)
					: t.Id !== a.Id
						? (a.Id - t.Id) * (e ? -1 : 1)
						: 0;
			}),
			(this.nDt = (t, a, e = !1) => {
				var n = t.length;
				for (let i = 0; i < n; i++)
					if (t[i].PhantomPropId === a) {
						if (e && t[i].IfPercentage) return t[i].Value;
						if (!e && !t[i].IfPercentage) return t[i].Value;
					}
				return 0;
			}),
			(this.sDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 10002)) !==
				(a = this.nDt(a.MainPropMap, 10002))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.aDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 10002, !0)) !==
				(a = this.nDt(a.MainPropMap, 10002, !0))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.hDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 10007)) !==
				(a = this.nDt(a.MainPropMap, 10007))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.lDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 10007, !0)) !==
				(a = this.nDt(a.MainPropMap, 10007, !0))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this._Dt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 10010)) !==
				(a = this.nDt(a.MainPropMap, 10010))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.uDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 10010, !0)) !==
				(a = this.nDt(a.MainPropMap, 10010, !0))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.cDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 8)) !== (a = this.nDt(a.MainPropMap, 8))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.mDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 9)) !== (a = this.nDt(a.MainPropMap, 9))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.dDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 35)) !== (a = this.nDt(a.MainPropMap, 35))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.CDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 21)) !== (a = this.nDt(a.MainPropMap, 21))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.gDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 22)) !== (a = this.nDt(a.MainPropMap, 22))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.fDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 23)) !== (a = this.nDt(a.MainPropMap, 23))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.pDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 24)) !== (a = this.nDt(a.MainPropMap, 24))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.vDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 25)) !== (a = this.nDt(a.MainPropMap, 25))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.MDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 26)) !== (a = this.nDt(a.MainPropMap, 26))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.SDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 27)) !== (a = this.nDt(a.MainPropMap, 27))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.EDt = (t, a, e) =>
				(t = this.nDt(t.MainPropMap, 11)) !== (a = this.nDt(a.MainPropMap, 11))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.yDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 1)) !== (a = this.nDt(a.SubPropMap, 1))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.IDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 4, !0)) !==
				(a = this.nDt(a.SubPropMap, 4, !0))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.TDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 2)) !== (a = this.nDt(a.SubPropMap, 2))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.LDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 5, !0)) !==
				(a = this.nDt(a.SubPropMap, 5, !0))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.DDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 3)) !== (a = this.nDt(a.SubPropMap, 3))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.RDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 6, !0)) !==
				(a = this.nDt(a.SubPropMap, 6, !0))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.UDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 14)) !== (a = this.nDt(a.SubPropMap, 14))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.ADt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 15)) !== (a = this.nDt(a.SubPropMap, 15))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.PDt = (t, a, e) => 0),
			(this.xDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 7)) !== (a = this.nDt(a.SubPropMap, 7))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.wDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 8)) !== (a = this.nDt(a.SubPropMap, 8))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.BDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 9)) !== (a = this.nDt(a.SubPropMap, 9))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.bDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 10)) !== (a = this.nDt(a.SubPropMap, 10))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.qDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 11)) !== (a = this.nDt(a.SubPropMap, 11))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.GDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 12)) !== (a = this.nDt(a.SubPropMap, 12))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.NDt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 13)) !== (a = this.nDt(a.SubPropMap, 13))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.ODt = (t, a, e) =>
				(t = this.nDt(t.SubPropMap, 16)) !== (a = this.nDt(a.MainPropMap, 16))
					? (a - t) * (e ? -1 : 1)
					: 0),
			(this.kDt = (t, a, e) => {
				if (
					(t instanceof ItemViewData_1.ItemViewData &&
						a instanceof ItemViewData_1.ItemViewData) ||
					(t instanceof PhantomItemData_1.PhantomItemData &&
						a instanceof PhantomItemData_1.PhantomItemData)
				) {
					var n = t.GetUniqueId(),
						i = a.GetUniqueId();
					(n =
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
							n,
						)),
						(i =
							ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
								i,
							));
					const o = 0 < n.GetEquipRoleId() ? 1 : 0,
						s = 0 < i.GetEquipRoleId() ? 1 : 0;
					if (o != s) return (o - s) * (e ? -1 : 1);
				}
				const o = 0 < t.Role ? 1 : 0,
					s = 0 < a.Role ? 1 : 0;
				return o !== s ? (o - s) * (e ? -1 : 1) : 0;
			}),
			(this.FDt = (t, a, e, n) => {
				if (n <= 0) return 0;
				if (
					(t instanceof ItemViewData_1.ItemViewData &&
						a instanceof ItemViewData_1.ItemViewData) ||
					(t instanceof PhantomItemData_1.PhantomItemData &&
						a instanceof PhantomItemData_1.PhantomItemData)
				) {
					var i = t.GetUniqueId(),
						o = a.GetUniqueId();
					(i =
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
							i,
						)),
						(o =
							ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
								o,
							));
					const e = i.GetEquipRoleId() === n ? 1 : 0,
						s = o.GetEquipRoleId() === n ? 1 : 0;
					if ((1 == e || 1 == s) && e != s) return -1 * (e - s);
				}
				const s = t.Role === n ? 1 : 0,
					h = a.Role === n ? 1 : 0;
				return (1 !== s && 1 !== h) || s === h ? 0 : -1 * (s - h);
			}),
			(this.VDt = (t, a, e) => {
				if (
					(t instanceof ItemViewData_1.ItemViewData &&
						a instanceof ItemViewData_1.ItemViewData) ||
					(t instanceof PhantomItemData_1.PhantomItemData &&
						a instanceof PhantomItemData_1.PhantomItemData)
				) {
					var n = t.GetUniqueId(),
						i = a.GetUniqueId();
					(n =
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
							n,
						)),
						(i =
							ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
								i,
							));
					const e = n.GetIfLock() ? 1 : 0,
						o = i.GetIfLock() ? 1 : 0;
					if (e != o) return e - o;
				}
				const o = t.IsLock ? 1 : 0,
					s = a.IsLock ? 1 : 0;
				return o !== s ? -1 * (o - s) : 0;
			}),
			(this.HDt = (t, a, e) => {
				if (
					(t instanceof ItemViewData_1.ItemViewData &&
						a instanceof ItemViewData_1.ItemViewData) ||
					(t instanceof PhantomItemData_1.PhantomItemData &&
						a instanceof PhantomItemData_1.PhantomItemData)
				) {
					var n = t.GetUniqueId(),
						i = a.GetUniqueId();
					(n =
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
							n,
						)),
						(i =
							ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
								i,
							));
					const o = n.GetConfig().Rarity,
						s = i.GetConfig().Rarity;
					if (o !== s) return (o - s) * (e ? 1 : -1);
				}
				const o = t.Rarity,
					s = a.Rarity;
				return o !== s ? (o - s) * (e ? 1 : -1) : 0;
			}),
			(this.QLt = (t, a, e) =>
				(t =
					ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
						t.MonsterId,
					)?.length ?? 0) !==
				(a =
					ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
						a.MonsterId,
					)?.length ?? 0)
					? (a - t) * (e ? -1 : 1)
					: 0);
	}
	OnInitSortMap() {
		this.SortMap.set(1, this.ZLt),
			this.SortMap.set(2, this.rDt),
			this.SortMap.set(3, this.VLt),
			this.SortMap.set(4, this.WLt),
			this.SortMap.set(5, this.eDt),
			this.SortMap.set(8, this.hDt),
			this.SortMap.set(9, this.lDt),
			this.SortMap.set(6, this.sDt),
			this.SortMap.set(7, this.aDt),
			this.SortMap.set(10, this._Dt),
			this.SortMap.set(11, this.uDt),
			this.SortMap.set(12, this.cDt),
			this.SortMap.set(13, this.mDt),
			this.SortMap.set(14, this.dDt),
			this.SortMap.set(15, this.CDt),
			this.SortMap.set(16, this.gDt),
			this.SortMap.set(17, this.fDt),
			this.SortMap.set(18, this.pDt),
			this.SortMap.set(19, this.vDt),
			this.SortMap.set(20, this.MDt),
			this.SortMap.set(21, this.SDt),
			this.SortMap.set(22, this.EDt),
			this.SortMap.set(25, this.TDt),
			this.SortMap.set(26, this.LDt),
			this.SortMap.set(23, this.yDt),
			this.SortMap.set(24, this.IDt),
			this.SortMap.set(27, this.DDt),
			this.SortMap.set(28, this.RDt),
			this.SortMap.set(29, this.UDt),
			this.SortMap.set(30, this.ADt),
			this.SortMap.set(31, this.PDt),
			this.SortMap.set(32, this.xDt),
			this.SortMap.set(33, this.wDt),
			this.SortMap.set(34, this.BDt),
			this.SortMap.set(35, this.bDt),
			this.SortMap.set(36, this.qDt),
			this.SortMap.set(37, this.GDt),
			this.SortMap.set(38, this.NDt),
			this.SortMap.set(39, this.ODt),
			this.SortMap.set(40, this.iDt),
			this.SortMap.set(41, this.oDt),
			this.SortMap.set(42, this.kDt),
			this.SortMap.set(43, this.FDt),
			this.SortMap.set(44, this.VDt),
			this.SortMap.set(45, this.HDt),
			this.SortMap.set(46, this.QLt);
	}
}
exports.PhantomSort = PhantomSort;
