"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ForgingSort = void 0);
const ForgingController_1 = require("../../../../../Manufacture/Forging/ForgingController"),
	CommonSort_1 = require("./CommonSort");
class ForgingSort extends CommonSort_1.CommonSort {
	constructor() {
		super(...arguments),
			(this.XLt = (o, r, t) => {
				var n =
						ForgingController_1.ForgingController.CheckCanForgingOrCanUnlock(
							o.ItemId,
						)
							? 1
							: 0,
					e = ForgingController_1.ForgingController.CheckCanForgingOrCanUnlock(
						r.ItemId,
					)
						? 1
						: 0;
				if (1 == n && n == e) {
					if (o.IsUnlock === r.IsUnlock) return 0;
					return (o.IsUnlock - r.IsUnlock) * (t ? -1 : 1);
				}
				if (0 == n && n == e) {
					if (o.IsUnlock === r.IsUnlock) return 0;
					return (r.IsUnlock - o.IsUnlock) * (t ? -1 : 1);
				}
				return (e - n) * (t ? -1 : 1);
			}),
			(this.K7e = (o, r, t) =>
				r.WeaponType !== o.WeaponType
					? (r.WeaponType - o.WeaponType) * (t ? -1 : 1)
					: 0),
			(this.zLt = (o, r, t) =>
				o.ItemId !== r.ItemId ? (r.ItemId - o.ItemId) * (t ? -1 : 1) : 0);
	}
	OnInitSortMap() {
		this.SortMap.set(1, this.XLt),
			this.SortMap.set(2, this.K7e),
			this.SortMap.set(3, this.zLt);
	}
}
exports.ForgingSort = ForgingSort;
