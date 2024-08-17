"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditMobileBattleViewPanel = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	EditMobileBattleViewPanelItem_1 = require("./EditMobileBattleViewPanelItem");
class EditMobileBattleViewPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.wCt = new Map()), (this.BCt = void 0);
	}
	async OnBeforeStartAsync() {
		var e = this.OpenParam;
		await this.bCt(e.PanelData, e.BattleViewBaseActor);
	}
	OnBeforeDestroy() {
		(this.BCt = void 0),
			(this.PanelData = void 0),
			(this.qCt = void 0),
			this.wCt.clear();
	}
	async bCt(e, t) {
		(this.PanelData = e),
			(this.qCt = t),
			(this.BCt = this.RootActor.GetComponentByClass(
				UE.LGUIComponentsRegistry.StaticClass(),
			));
		var a = [],
			i = e?.GetPanelItemDataMap();
		if (e?.IsOnlyPanelEdit)
			(t = {
				PanelItemData: i.get(-1),
				PanelItem: this.RootItem,
				BattleViewBaseActor: this.qCt,
			}),
				(t = (e =
					new EditMobileBattleViewPanelItem_1.EditMobileBattleViewPanelItem()).CreateThenShowByActorAsync(
					this.RootActor,
					t,
				)),
				a.push(t),
				this.wCt.set(-1, e);
		else {
			var s = this.BCt.Components;
			for (let e = 0; e < s.Num(); e++) {
				var l,
					n,
					o = s.Get(e);
				o &&
					o.GetUIItem().IsUIActiveSelf() &&
					o.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass()) &&
					((l = {
						PanelItemData: i?.get(e),
						PanelItem: this.RootItem,
						BattleViewBaseActor: this.qCt,
					}),
					(o = (n =
						new EditMobileBattleViewPanelItem_1.EditMobileBattleViewPanelItem()).CreateThenShowByActorAsync(
						o,
						l,
					)),
					a.push(o),
					this.wCt.set(e, n));
			}
			await Promise.all(a);
		}
	}
	ResetAllPanelItem() {
		for (const e of this.wCt.values()) e.PanelItemData && e.Reset();
	}
	SavePanelItem() {
		for (const e of this.wCt.values()) e.OnSave();
	}
	GetPanelItem(e) {
		return this.wCt.get(e);
	}
	RefreshHierarchyIndex(e) {
		for (const e of this.wCt.values()) {
			var t,
				a = e.PanelItemData;
			a &&
				((t = e.GetRootItem()),
				(a.EditorHierarchyIndex = t.GetHierarchyIndex()));
		}
	}
	IsAnyItemOverlap(e) {
		var t = this.BCt.Components;
		for (let i = 0; i < t.Num(); i++) {
			var a = this.GetPanelItem(i);
			if (
				a &&
				(!(a = a.PanelItemData) || a.IsCheckOverlap) &&
				(a = t.Get(i)) &&
				a instanceof UE.UIBaseActor &&
				(a = a.GetUIItem()).IsUIActiveInHierarchy() &&
				a.IsRaycastTarget() &&
				a !== e &&
				a.GetOverlapWith(e)
			)
				return !0;
		}
		return !1;
	}
}
exports.EditMobileBattleViewPanel = EditMobileBattleViewPanel;
