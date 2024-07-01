"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditMobileBattleView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	EditMobileBattleViewPanel_1 = require("./EditMobileBattleViewPanel");
class EditMobileBattleView extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Pit = new Map()),
			this.CreateThenShowByResourceIdAsync("UiView_FightEdit", e);
	}
	async OnBeforeStartAsync() {
		await this.xCt();
	}
	OnAfterShow() {
		var e = ModelManager_1.ModelManager.BattleUiSetModel;
		for (const t of e.GetPanelItemDataMap().values())
			if (t.IsDefaultSelected) {
				e.SetPanelItemSelected(t);
				break;
			}
	}
	async xCt() {
		var e = ModelManager_1.ModelManager.BattleUiSetModel.GetPanelDataMap(),
			t = this.RootActor.GetComponentByClass(
				UE.LGUIComponentsRegistry.StaticClass(),
			).Components,
			a = [];
		for (let r = 0; r < t.Num(); r++) {
			var i,
				l,
				n = t.Get(r);
			n &&
				n.GetUIItem().IsUIActiveSelf() &&
				(i = e.get(r)) &&
				((i = { PanelData: i, BattleViewBaseActor: this.RootActor }),
				(n = (l =
					new EditMobileBattleViewPanel_1.EditMobileBattleViewPanel()).CreateThenShowByActorAsync(
					n,
					i,
				)),
				a.push(n),
				this.Pit.set(r, l));
		}
		await Promise.all(a);
	}
	ResetAllPanelItem() {
		for (const e of this.Pit.values()) e.ResetAllPanelItem();
	}
	SavePanelItem() {
		for (const e of this.Pit.values()) e.SavePanelItem();
	}
	GetPanel(e) {
		return this.Pit.get(e);
	}
	GetPanelItem(e) {
		var t = this.Pit.get(e.PanelIndex);
		if (t) return t.GetPanelItem(e.PanelItemIndex);
	}
	RefreshHierarchyIndex() {
		for (const a of this.Pit.values()) {
			var e = a.PanelData,
				t = a.GetRootItem();
			e && ((e = t.GetHierarchyIndex()), a.RefreshHierarchyIndex(e));
		}
	}
	IsAnyItemOverlap(e) {
		for (const t of this.Pit.values()) if (t.IsAnyItemOverlap(e)) return !0;
		return !1;
	}
}
exports.EditMobileBattleView = EditMobileBattleView;
