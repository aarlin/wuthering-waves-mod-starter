"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComposePurificationSort = void 0);
const CommonSort_1 = require("./CommonSort");
class ComposePurificationSort extends CommonSort_1.CommonSort {
	constructor() {
		super(...arguments),
			(this.XLt = (o, t, i) =>
				o.IsUnlock !== t.IsUnlock
					? (t.IsUnlock - o.IsUnlock) * (i ? -1 : 1)
					: 1 === o.IsUnlock &&
							o.IsUnlock === t.IsUnlock &&
							t.IsPurification !== o.IsPurification
						? t.IsPurification - o.IsPurification
						: 0),
			(this.VLt = (o, t, i) => {
				var s;
				return t.IsUnlock !== o.IsUnlock
					? ((s = t.IsUnlock - o.IsUnlock), i ? s : -s)
					: o.Quality !== t.Quality
						? (t.Quality - o.Quality) * (i ? -1 : 1)
						: o.ItemId - t.ItemId;
			});
	}
	OnInitSortMap() {
		this.SortMap.set(1, this.XLt), this.SortMap.set(2, this.VLt);
	}
}
exports.ComposePurificationSort = ComposePurificationSort;
