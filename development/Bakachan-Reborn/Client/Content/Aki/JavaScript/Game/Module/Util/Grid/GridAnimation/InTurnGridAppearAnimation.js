"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InTurnGridAppearAnimation = void 0);
const GridAppearAnimationBase_1 = require("./GridAppearAnimationBase");
class InTurnGridAppearAnimation extends GridAppearAnimationBase_1.GridAppearAnimationBase {
	constructor() {
		super(...arguments),
			(this.nqo = -0),
			(this.sqo = -0),
			(this.aqo = 0),
			(this.hqo = (i, t) => {
				t.SetUIActive(!1);
			}),
			(this.lqo = 1e3);
	}
	OnStart() {
		this.IsInGridAppearAnimation || this._qo();
	}
	OnEnd() {
		(this.IsInGridAppearAnimation = !1),
			(this.nqo = 0),
			(this.sqo = 0),
			(this.aqo = 0);
	}
	OnInterrupt() {
		super.OnInterrupt(),
			(this.IsInGridAppearAnimation = !1),
			(this.nqo = 0),
			(this.sqo = 0),
			(this.aqo = 0);
	}
	OnUpdate(i) {
		this.IsInGridAppearAnimation && this.uqo(i);
	}
	_qo() {
		(this.GridPreserver.GetGridAnimationInterval() <= 0 &&
			this.GridPreserver.GetGridAnimationStartTime() <= 0) ||
		this.DisplayGridNum <= 0
			? this.RemoveTimer()
			: (this.GridPreserver.NotifyAnimationStart(),
				(this.IsInGridAppearAnimation = !0),
				(this.nqo = 0),
				(this.sqo = 0),
				(this.HasShowFirstGrid = !1),
				(this.aqo = this.GridPreserver.GetDisplayGridStartIndex()),
				this.GridsForEach(this.hqo));
	}
	cqo() {
		(this.nqo = 0),
			(this.sqo = 0),
			(this.HasShowFirstGrid = !1),
			(this.aqo = this.GridPreserver.GetDisplayGridStartIndex());
	}
	uqo(i) {
		(this.sqo += i / this.lqo),
			(!this.HasShowFirstGrid &&
				this.sqo < this.GridPreserver.GetGridAnimationStartTime()) ||
				(this.HasShowFirstGrid &&
					this.sqo - this.nqo <
						this.GridPreserver.GetGridAnimationInterval()) ||
				((this.HasShowFirstGrid = !0), (this.nqo = this.sqo), this.mqo());
	}
	mqo() {
		var i;
		this.aqo < this.GridPreserver.GetDisplayGridStartIndex() ||
		this.aqo > this.GridPreserver.GetDisplayGridEndIndex()
			? this.cqo()
			: (i = this.GridPreserver.GetGrid(this.aqo)) && i.IsValid()
				? (this.ShowGrid(i, this.aqo),
					this.aqo++,
					this.aqo > this.GridPreserver.GetDisplayGridEndIndex() &&
						(this.End(), this.GridPreserver.NotifyAnimationEnd()))
				: this.End();
	}
}
exports.InTurnGridAppearAnimation = InTurnGridAppearAnimation;
