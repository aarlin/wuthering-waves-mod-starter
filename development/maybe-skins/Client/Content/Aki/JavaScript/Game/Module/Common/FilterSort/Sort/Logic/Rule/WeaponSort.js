"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	CommonSort_1 = require("./CommonSort");
class WeaponSort extends CommonSort_1.CommonSort {
	constructor() {
		super(...arguments),
			(this.ZLt = (e, t, a) => {
				(e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
					e.GetUniqueId(),
				)),
					(t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
						t.GetUniqueId(),
					));
				var o = e ? e.GetLevel() : 0,
					n = t ? t.GetLevel() : 0;
				return o !== n
					? (n - o) * (a ? -1 : 1)
					: (n = e ? e.GetResonanceLevel() : 0) !==
							(o = t ? t.GetResonanceLevel() : 0)
						? (o - n) * (a ? -1 : 1)
						: void 0;
			}),
			(this.nRt = (e, t, a) => {
				if (
					((e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
						e.GetUniqueId(),
					)),
					(t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
						t.GetUniqueId(),
					)),
					(e = e ? e.GetBreachLevel() : 0) !== (t = t ? t.GetBreachLevel() : 0))
				)
					return (t - e) * (a ? -1 : 1);
			}),
			(this.sRt = (e, t, a) => {
				if (
					((e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
						e.GetUniqueId(),
					)),
					(t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
						t.GetUniqueId(),
					)),
					(e = e ? e.GetResonanceLevel() : 0) !==
						(t = t ? t.GetResonanceLevel() : 0))
				)
					return (t - e) * (a ? -1 : 1);
			}),
			(this.VLt = (e, t, a) => {
				if (e.GetQuality() !== t.GetQuality())
					return (t.GetQuality() - e.GetQuality()) * (a ? -1 : 1);
			}),
			(this.VDt = (e, t, a) => {
				if (e.GetIsLock() !== t.GetIsLock())
					return -1 * ((e.GetIsLock() ? 1 : 0) - (t.GetIsLock() ? 1 : 0));
			}),
			(this.iDt = (e, t, a) => {
				if (
					(e =
						ModelManager_1.ModelManager.WeaponModel.GetWeaponItemBaseExp(e)) !==
					(t = ModelManager_1.ModelManager.WeaponModel.GetWeaponItemBaseExp(t))
				)
					return (t - e) * (a ? -1 : 1);
			}),
			(this.eDt = (e, t, a) =>
				(t.GetUniqueId() - e.GetUniqueId()) * (a ? -1 : 1)),
			(this.kLt = (e, t, a) =>
				(t.GetConfigId() - e.GetConfigId()) * (a ? -1 : 1)),
			(this.oDt = (e, t, a) => {
				if ((e = 4 === e.GetType()) != (t = 4 === t.GetType()))
					return (t ? 1 : 0) - (e ? 1 : 0);
			}),
			(this.aRt = (e, t, a) => (
				(e = this.hRt(e)),
				(t = this.hRt(t)),
				void 0 !== e && void 0 !== t && e !== t ? e - t : void 0
			)),
			(this.lRt = (e, t, a) => {
				if ((e = 2 === e.GetType()) != (t = 2 === t.GetType()))
					return (t ? 1 : 0) - (e ? 1 : 0);
			});
	}
	OnInitSortMap() {
		this.SortMap.set(1, this.ZLt),
			this.SortMap.set(2, this.VLt),
			this.SortMap.set(3, this.VDt),
			this.SortMap.set(4, this.iDt),
			this.SortMap.set(5, this.eDt),
			this.SortMap.set(6, this.nRt),
			this.SortMap.set(7, this.sRt),
			this.SortMap.set(8, this.kLt),
			this.SortMap.set(9, this.oDt),
			this.SortMap.set(10, this.aRt),
			this.SortMap.set(11, this.lRt);
	}
	hRt(e) {
		var t;
		if (e)
			return 4 === (t = e.GetType())
				? 2
				: 2 === t
					? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
							e.GetUniqueId(),
						)?.HasWeaponCultivated()
						? 3
						: 1
					: void 0;
	}
}
exports.WeaponSort = WeaponSort;
