"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoopScrollMediumItemGrid = void 0);
const MediumItemGrid_1 = require("./MediumItemGrid");
class LoopScrollMediumItemGrid extends MediumItemGrid_1.MediumItemGrid {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0);
	}
	Refresh(e, r, i) {
		this.OnRefresh(e, r, i);
	}
	Clear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	GetKey(e, r) {
		return this.GridIndex;
	}
}
exports.LoopScrollMediumItemGrid = LoopScrollMediumItemGrid;
