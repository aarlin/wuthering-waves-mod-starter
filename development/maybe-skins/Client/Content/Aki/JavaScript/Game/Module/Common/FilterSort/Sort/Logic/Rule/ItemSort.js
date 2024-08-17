"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemSort = void 0);
const CommonItemData_1 = require("../../../../../Inventory/ItemData/CommonItemData"),
	CommonSort_1 = require("./CommonSort");
class ItemSort extends CommonSort_1.CommonSort {
	constructor() {
		super(...arguments),
			(this.OLt = (t, e, o) => t.GetConfigId() - e.GetConfigId()),
			(this.kLt = (t, e, o) => (
				(t = t.GetConfigId()), (e.GetConfigId() - t) * (o ? -1 : 1)
			)),
			(this.ZLt = (t, e, o) => (
				(t = t.GetAttributeLevel()), (e.GetAttributeLevel() - t) * (o ? -1 : 1)
			)),
			(this.VLt = (t, e, o) => (
				(t = t.GetQuality()), (e.GetQuality() - t) * (o ? -1 : 1)
			)),
			(this.HLt = (t, e, o) => (t.GetCount() - e.GetCount()) * (o ? -1 : 1)),
			(this.FLt = (t, e, o) =>
				(t.GetSortIndex() - e.GetSortIndex()) * (o ? -1 : 1)),
			(this.eDt = (t, e, o) =>
				(t.GetUniqueId() - e.GetUniqueId()) * (o ? -1 : 1)),
			(this.tDt = (t, e, o) => {
				(t = t.GetItemDataBase()), (e = e.GetItemDataBase());
				let s = 0,
					i = 0;
				return (
					t instanceof CommonItemData_1.CommonItemData &&
						(s = t.IsLimitTimeItem() ? 1 : 0),
					(i =
						e instanceof CommonItemData_1.CommonItemData
							? e.IsLimitTimeItem()
								? 1
								: 0
							: i) - s
				);
			});
	}
	OnInitSortMap() {
		this.SortMap.set(1, this.kLt),
			this.SortMap.set(4, this.HLt),
			this.SortMap.set(2, this.ZLt),
			this.SortMap.set(3, this.VLt),
			this.SortMap.set(5, this.FLt),
			this.SortMap.set(6, this.eDt),
			this.SortMap.set(7, this.OLt),
			this.SortMap.set(8, this.tDt);
	}
}
exports.ItemSort = ItemSort;
