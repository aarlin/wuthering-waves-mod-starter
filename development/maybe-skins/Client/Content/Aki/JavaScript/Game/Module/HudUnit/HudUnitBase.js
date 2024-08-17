"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HudUnitBase = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	VisibleStateUtil_1 = require("../BattleUi/VisibleStateUtil");
class HudUnitBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ResourceId = void 0),
			(this.VisibleState = 0),
			(this.TweenAnimMap = void 0);
	}
	async Initialize(e, t) {
		(this.ResourceId = e),
			t
				? await this.CreateThenShowByResourceIdAsync(
						e,
						UiLayer_1.UiLayer.GetBattleViewUnit(1),
						!0,
					)
				: await this.CreateByResourceIdAsync(
						e,
						UiLayer_1.UiLayer.GetBattleViewUnit(1),
						!0,
					);
	}
	Tick(e) {}
	AfterTick(e) {}
	SetVisible(e, t = 0) {
		(this.GetVisible() ===
			(t =
				((this.VisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(
					this.VisibleState,
					e,
					t,
				)),
				this.GetVisible())) &&
			this.GetActive() === t) ||
			this.SetActive(e);
	}
	GetVisible() {
		return VisibleStateUtil_1.VisibleStateUtil.GetVisible(this.VisibleState);
	}
	OnBeforeDestroy() {
		this.TweenAnimMap?.clear();
	}
	SetAnchorOffset(e, t) {
		this.RootItem &&
			(this.RootItem.SetAnchorOffsetX(e), this.RootItem.SetAnchorOffsetY(t));
	}
	InitTweenAnim(e) {
		var t = [],
			i = this.GetItem(e)
				.GetOwner()
				.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
			s = i.Num();
		for (let e = 0; e < s; e++) t.push(i.Get(e));
		this.TweenAnimMap || (this.TweenAnimMap = new Map()),
			this.TweenAnimMap.set(e, t);
	}
	PlayTweenAnim(e) {
		if ((e = this.TweenAnimMap.get(e))) for (const t of e) t.Play();
	}
	StopTweenAnim(e) {
		if ((e = this.TweenAnimMap.get(e))) for (const t of e) t.Stop();
	}
}
exports.HudUnitBase = HudUnitBase;
