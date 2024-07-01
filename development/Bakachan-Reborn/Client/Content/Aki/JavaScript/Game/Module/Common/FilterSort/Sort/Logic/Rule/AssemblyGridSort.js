"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AssemblyGridSort = void 0);
const CommonSort_1 = require("./CommonSort");
class AssemblyGridSort extends CommonSort_1.CommonSort {
	constructor() {
		super(...arguments),
			(this.OLt = (t, s, r) => t.Id - s.Id),
			(this.kLt = (t, s, r) => ((t = t.Id), (s.Id - t) * (r ? -1 : 1))),
			(this.FLt = (t, s, r) => (t.SortId - s.SortId) * (r ? -1 : 1)),
			(this.VLt = (t, s, r) => {
				let e = 0;
				return (
					2 === t.GridType && ((t = t.QualityId), (e = (s = s.QualityId) - t)),
					e * (r ? -1 : 1)
				);
			}),
			(this.HLt = (t, s, r) => {
				let e = 0;
				return (
					2 === t.GridType && (e = (t = t.ItemNum) - (s = s.ItemNum)),
					e * (r ? -1 : 1)
				);
			});
	}
	OnInitSortMap() {
		this.SortMap.set(1, this.kLt),
			this.SortMap.set(3, this.OLt),
			this.SortMap.set(2, this.FLt),
			this.SortMap.set(4, this.VLt),
			this.SortMap.set(5, this.HLt);
	}
}
exports.AssemblyGridSort = AssemblyGridSort;
