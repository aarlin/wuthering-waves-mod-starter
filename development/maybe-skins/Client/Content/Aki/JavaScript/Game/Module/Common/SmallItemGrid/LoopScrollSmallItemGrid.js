"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoopScrollSmallItemGrid = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	SmallItemGrid_1 = require("./SmallItemGrid");
class LoopScrollSmallItemGrid extends SmallItemGrid_1.SmallItemGrid {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.CBt = void 0);
	}
	Refresh(e, t, i) {
		this.OnRefresh(e, t, i);
	}
	Clear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	OnAddEvents() {
		(this.CBt = (e, t) => {
			this.OnShowGridAnimation(e, t);
		}),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnShowGridAnimation,
				this.CBt,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnShowGridAnimation,
			this.CBt,
		),
			(this.CBt = void 0);
	}
	OnShowGridAnimation(e, t) {
		e === this.GridIndex &&
			this.IsSelected &&
			(this.SetSelected(!1), this.SetSelected(!0));
	}
	GetKey(e, t) {
		return this.GridIndex;
	}
}
exports.LoopScrollSmallItemGrid = LoopScrollSmallItemGrid;
