"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComposeStructureSort = void 0);
const CommonSort_1 = require("./CommonSort");
class ComposeStructureSort extends CommonSort_1.CommonSort {
	constructor() {
		super(...arguments),
			(this.$Lt = (t, o, r) =>
				t.SubType !== o.SubType ? (o.SubType - t.SubType) * (r ? -1 : 1) : 0),
			(this.XLt = (t, o, r) => {
				var s = t.IsUnlock,
					e = o.IsUnlock;
				(t = t.IsStructure), (o = o.IsStructure);
				return s !== e
					? r
						? e - s
						: s - e
					: o !== t
						? r
							? o - t
							: t - o
						: 0;
			}),
			(this.VLt = (t, o, r) => {
				var s;
				return o.IsUnlock !== t.IsUnlock
					? ((s = o.IsUnlock - t.IsUnlock), r ? s : -s)
					: t.Quality !== o.Quality
						? (o.Quality - t.Quality) * (r ? -1 : 1)
						: 0;
			});
	}
	OnInitSortMap() {
		this.SortMap.set(1, this.$Lt),
			this.SortMap.set(2, this.XLt),
			this.SortMap.set(3, this.VLt);
	}
}
exports.ComposeStructureSort = ComposeStructureSort;
