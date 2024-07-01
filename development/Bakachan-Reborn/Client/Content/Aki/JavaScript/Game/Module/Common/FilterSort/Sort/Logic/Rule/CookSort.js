"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookSort = void 0);
const CommonSort_1 = require("./CommonSort");
class CookSort extends CommonSort_1.CommonSort {
	constructor() {
		super(...arguments),
			(this.$Lt = (t, o, s) =>
				t.SubType !== o.SubType ? (o.SubType - t.SubType) * (s ? -1 : 1) : 0),
			(this.XLt = (t, o, s) => {
				var e;
				return o.IsUnLock !== t.IsUnLock
					? ((e = o.IsUnLock ? 1 : -1), s ? e : -e)
					: o.IsCook !== t.IsCook
						? ((e = o.IsCook - t.IsCook), s ? e : -e)
						: 0;
			}),
			(this.YLt = (t, o, s) => {
				let e = 0;
				return (
					t.IsUnLock === o.IsUnLock
						? (e = o.IsMachining - t.IsMachining)
						: t.IsUnLock
							? (e = -1)
							: o.IsUnLock && (e = 1),
					s ? e : -1 * e
				);
			}),
			(this.VLt = (t, o, s) =>
				t.Quality !== o.Quality ? (o.Quality - t.Quality) * (s ? -1 : 1) : 0),
			(this.JLt = (t, o, s) =>
				t.ItemId !== o.ItemId ? t.ItemId - o.ItemId : 0);
	}
	OnInitSortMap() {
		this.SortMap.set(1, this.$Lt),
			this.SortMap.set(2, this.YLt),
			this.SortMap.set(3, this.VLt),
			this.SortMap.set(4, this.JLt),
			this.SortMap.set(5, this.XLt);
	}
}
exports.CookSort = CookSort;
