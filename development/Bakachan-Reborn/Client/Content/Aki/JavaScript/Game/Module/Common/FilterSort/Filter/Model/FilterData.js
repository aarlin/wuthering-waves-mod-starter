"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FilterItemData = void 0);
class FilterItemData {
	constructor(t = 0, e = void 0, i = void 0) {
		(this.FilterId = t),
			(this.Content = e),
			(this.vnt = i),
			(this.eLt = !0),
			(this.NeedChangeColor = !1);
	}
	SetIsShowIcon(t) {
		this.eLt = t;
	}
	GetIconPath() {
		if (this.eLt) return this.vnt;
	}
}
exports.FilterItemData = FilterItemData;
