"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HudUnitManager = void 0);
class HudUnitManager {
	static New(t) {
		var i = new t();
		i.Initialize(), (t = t.name);
		this.Hri.set(t, i);
	}
	static TryNew(t) {
		this.Get(t) || this.New(t);
	}
	static Destroy(t) {
		this.Get(t)?.Destroy(), (t = typeof t), this.Hri.delete(t);
	}
	static ShowHud() {
		if (this.Hri.size <= 0)
			for (const t of this.HudUnitHandleClassArray) this.New(t);
		for (const t of this.Hri.values()) t.OnShowHud();
	}
	static HideHud() {
		for (const t of this.Hri.values()) t.OnHideHud();
	}
	static Get(t) {
		return (t = t.name), this.Hri.get(t);
	}
	static Clear() {
		for (const t of this.Hri.values()) t.Destroy();
		this.Hri.clear();
	}
	static Tick(t) {
		for (const i of this.Hri.values()) i.Tick(t);
		this.TickCount++;
	}
	static AfterTick(t) {
		for (const i of this.Hri.values()) i.AfterTick(t);
	}
}
((exports.HudUnitManager = HudUnitManager).HudUnitHandleClassArray =
	new Array()),
	(HudUnitManager.Hri = new Map()),
	(HudUnitManager.TickCount = 0);
