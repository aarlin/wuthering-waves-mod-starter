"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComposeSort = void 0);
const CommonSort_1 = require("./CommonSort");
class ComposeSort extends CommonSort_1.CommonSort {
	constructor() {
		super(...arguments),
			(this.$Lt = (o, t, s) =>
				o.SubType !== t.SubType ? (t.SubType - o.SubType) * (s ? -1 : 1) : 0),
			(this.XLt = (o, t, s) => {
				var e;
				return t.IsUnlock !== o.IsUnlock
					? ((e = t.IsUnlock - o.IsUnlock), s ? e : -e)
					: t.IsCompose !== o.IsCompose
						? ((e = t.IsCompose - o.IsCompose), s ? e : -e)
						: 0;
			}),
			(this.VLt = (o, t, s) => {
				var e;
				return t.IsUnlock !== o.IsUnlock
					? ((e = t.IsUnlock - o.IsUnlock), s ? e : -e)
					: o.Quality !== t.Quality
						? (t.Quality - o.Quality) * (s ? -1 : 1)
						: 0;
			});
	}
	OnInitSortMap() {
		this.SortMap.set(1, this.$Lt),
			this.SortMap.set(2, this.XLt),
			this.SortMap.set(3, this.VLt);
	}
}
exports.ComposeSort = ComposeSort;
