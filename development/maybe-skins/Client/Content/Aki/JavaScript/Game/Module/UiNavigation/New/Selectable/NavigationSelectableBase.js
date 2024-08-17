"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationSelectableBase = void 0);
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	UiLayer_1 = require("../../../../Ui/UiLayer"),
	UiNavigationGlobalData_1 = require("../UiNavigationGlobalData");
class NavigationSelectableBase {
	constructor(e, t) {
		(this.IsInteractive = !0),
			(this.Selectable = void 0),
			(this.Listener = void 0),
			(this.PanelHandle = void 0),
			(this.S9 = "Button"),
			(this.Selectable = e),
			(this.S9 = t);
	}
	Init() {
		this.OnInit();
	}
	Start() {
		this.OnStart();
	}
	Clear() {
		this.OnClear();
	}
	CanFocus() {
		return (
			!!this.IsInteractive &&
			!!this.Selectable.IsValid() &&
			!!this.Selectable.RootUIComp.IsUIActiveInHierarchy()
		);
	}
	CanFocusInScrollOrLayout() {
		return this.OnCanFocusInScrollOrLayout();
	}
	IsActive() {
		return (
			!!this.IsInteractive &&
			!!this.Selectable.IsValid() &&
			!!this.Selectable.RootUIComp.IsUIActiveInHierarchy()
		);
	}
	SetIsInteractive(e) {
		this.IsInteractive = e;
	}
	GetSelectable() {
		return this.Selectable;
	}
	SetListener(e) {
		this.Listener = e;
	}
	SetPanelHandle(e) {
		this.PanelHandle = e;
	}
	GetTipsTextId() {
		return this.OnGetTipsTextId();
	}
	CheckFindNavigationBefore() {
		return !UiLayer_1.UiLayer.IsInMask() && this.OnCheckFindNavigationBefore();
	}
	CheckFindOpposite(e) {
		return (
			!(this.Listener === e || !this.Listener.IsCanFocus()) &&
			this.OnCheckFindOpposite(e)
		);
	}
	CheckFindNavigationAfter(e) {
		return this.OnCheckFindNavigationAfter(e);
	}
	HandlePointerEnter(e) {
		return (
			!!this.IsAllowNavigationByGroup() &&
			!!this.IsAllowNavigationBySelfParam(e) &&
			!!this.dwo() &&
			this.OnHandlePointerEnter(e)
		);
	}
	HandlePointerSelect(e) {
		return !!this.dwo() && this.OnHandlePointerSelect(e);
	}
	IsIgnoreScrollOrLayoutCheckInSwitchGroup() {
		return this.OnIsIgnoreScrollOrLayoutCheck();
	}
	IsAllowNavigationByGroup() {
		var e;
		return (
			!StringUtils_1.StringUtils.IsEmpty(this.Listener.GroupName) &&
			!!(e = this.Listener.PanelConfig.GetNavigationGroup(
				this.Listener.GroupName,
			)) &&
			0 === e.GroupType
		);
	}
	OnGetTipsTextId() {
		return this.Listener.HotKeyTipsTextIdMap.Get(1);
	}
	OnCheckFindNavigationBefore() {
		return !0;
	}
	OnCheckFindOpposite(e) {
		return !0;
	}
	OnCheckFindNavigationAfter(e) {
		return !0;
	}
	IsAllowNavigationBySelfParam(e) {
		return !0;
	}
	OnCanFocusInScrollOrLayout() {
		return (
			!!this.IsInteractive &&
			!!this.Selectable.RootUIComp.IsUIActiveInHierarchy()
		);
	}
	OnHandlePointerEnter(e) {
		return !0;
	}
	OnIsIgnoreScrollOrLayoutCheck() {
		return !1;
	}
	dwo() {
		var e, t;
		return !(
			!this.Listener.PanelConfig ||
			(!UiNavigationGlobalData_1.UiNavigationGlobalData
				.IsAllowCrossNavigationGroup &&
				(e = this.Listener.PanelConfig.GetFocusListener()) &&
				(!(t = this.Listener.PanelConfig.GetNavigationGroup(e.GroupName)) ||
					t.GroupName !== this.Listener.GroupName ||
					(!t.AllowNavigationInSelfDynamic &&
						((void 0 === this.Listener.ScrollViewActor &&
							void 0 === e.ScrollViewActor &&
							void 0 === this.Listener.LayoutActor &&
							void 0 === e.LayoutActor) ||
							this.Listener.ScrollViewActor !== e.ScrollViewActor ||
							this.Listener.LayoutActor !== e.LayoutActor))))
		);
	}
	OnInit() {}
	OnStart() {}
	OnClear() {}
	GetType() {
		return this.S9;
	}
}
exports.NavigationSelectableBase = NavigationSelectableBase;
