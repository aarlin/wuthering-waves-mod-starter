"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiSetPanelData = void 0);
class BattleUiSetPanelData {
	constructor(t, e) {
		(this.iCt = new Map()), (this.IsOnlyPanelEdit = !1), (this.PanelIndex = t);
		for (const t of e) {
			var a = t.PanelItemIndex;
			if (-1 === a)
				return (
					(this.IsOnlyPanelEdit = !0), this.iCt.clear(), void this.iCt.set(a, t)
				);
			this.iCt.set(a, t);
		}
	}
	GetPanelItemData(t) {
		return this.iCt.get(t);
	}
	GetPanelItemDataMap() {
		return this.iCt;
	}
}
exports.BattleUiSetPanelData = BattleUiSetPanelData;
