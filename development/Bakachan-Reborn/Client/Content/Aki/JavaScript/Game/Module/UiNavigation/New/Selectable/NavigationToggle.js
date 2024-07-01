"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationToggle = void 0);
const UiNavigationViewManager_1 = require("../UiNavigationViewManager"),
	NavigationSelectableBase_1 = require("./NavigationSelectableBase");
class NavigationToggle extends NavigationSelectableBase_1.NavigationSelectableBase {
	constructor() {
		super(...arguments),
			(this.pwo = (e) => {
				UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKeyTextId();
			}),
			(this.x4e = (e) => {
				this.OnToggleClick(e);
			});
	}
	OnInit() {
		this.vwo(), this.Mwo();
	}
	OnClear() {
		this.Swo(), this.Ewo();
	}
	vwo() {
		var e = this.Selectable;
		0 < this.Listener.HotKeyTipsTextIdMap.Num() &&
			e.OnStateChange.Add(this.pwo);
	}
	Swo() {
		var e = this.Selectable;
		0 < this.Listener.HotKeyTipsTextIdMap.Num() &&
			e.OnStateChange.Remove(this.pwo);
	}
	Mwo() {
		this.NeedAddToggleClick() && this.Selectable.OnStateChange.Add(this.x4e);
	}
	Ewo() {
		this.NeedAddToggleClick() && this.Selectable.OnStateChange.Remove(this.x4e);
	}
	OnToggleClick(e) {}
	NeedAddToggleClick() {
		return "Toggle" !== this.GetType();
	}
	OnCanFocusInScrollOrLayout() {
		var e;
		return (
			!!this.IsInteractive &&
			!(
				(1 !== (e = this.Selectable).ToggleState && e.bCheckToggleSelected) ||
				!this.Selectable.RootUIComp.IsUIActiveInHierarchy()
			)
		);
	}
	OnGetTipsTextId() {
		return 1 === this.Selectable.ToggleState
			? this.Listener.HotKeyTipsTextIdMap.Get(2)
			: this.Listener.HotKeyTipsTextIdMap.Get(1);
	}
	OnHandlePointerEnter(e) {
		return !this.Selectable.bToggleOnSelect;
	}
	OnHandlePointerSelect(e) {
		var t;
		return (
			!!this.OnHandlePointerSelectInheritance(e) &&
			(0 === (t = this.Selectable).ToggleState &&
				e &&
				1 === e.inputType &&
				t.bToggleOnSelect &&
				t.SetToggleState(1, !0),
			this.Listener.ScrollView &&
				this.Listener.ScrollView.ScrollToSelectableComponent(t),
			!!this.IsAllowNavigationByGroup())
		);
	}
	OnHandlePointerSelectInheritance(e) {
		return !0;
	}
}
exports.NavigationToggle = NavigationToggle;
