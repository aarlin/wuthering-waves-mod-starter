"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialPanelHandleBase = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	UiNavigationNewController_1 = require("../UiNavigationNewController");
class SpecialPanelHandleBase {
	constructor(e) {
		(this.DefaultNavigationListener = []),
			(this._wo = new Set()),
			(this.Ffo = new Map()),
			(this.S9 = "Default"),
			(this.S9 = e);
	}
	SetNavigationGroupDefaultListener(e) {
		var t = this.GetNavigationGroup(e.GroupName);
		t
			? t.DefaultListener || (t.DefaultListener = e)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiNavigation",
					11,
					"找不到导航组信息",
					["导航组名字", e.GroupName],
					["导航监听对象", e.RootUIComp.displayName],
				);
	}
	GetNavigationGroup(e) {
		if (!StringUtils_1.StringUtils.IsEmpty(e)) return this.Ffo.get(e);
	}
	SetGroupMap(e) {
		this.Ffo = e;
	}
	AddListener(e) {
		this._wo.add(e);
	}
	DeleteListener(e) {
		this._wo.delete(e);
	}
	GetListenerListByTag(e) {
		var t = [];
		for (const i of this._wo) i.TagArray.Contains(e) && t.push(i);
		return t;
	}
	SetDefaultNavigationListenerList(e) {
		this.OnDefaultNavigationListenerList(e);
	}
	ReplaceDefaultNavigationListener(e, t) {
		this.DefaultNavigationListener.length <= t
			? this.DefaultNavigationListener.push(e)
			: (this.DefaultNavigationListener[t] = e),
			this.SetNavigationGroupDefaultListener(e);
	}
	GetSuitableNavigationListenerList(e) {
		return this.OnGetSuitableNavigationListenerList(e);
	}
	NotifyFindResult(e) {
		this.OnNotifyFindResult(e);
	}
	GetLoopOrLayoutListener(e) {
		return this.OnGetLoopOrLayoutListener(e);
	}
	ResetGroupConfigMemory() {
		for (const e of this.Ffo.values())
			e.SelectableMemory && (e.LastSelectListener = void 0);
	}
	OnGetSuitableNavigationListenerList(e) {
		return this.DefaultNavigationListener;
	}
	OnDefaultNavigationListenerList(e) {
		var t = [];
		for (let a = 0, r = e.Num(); a < r; ++a) {
			var i = e
				.Get(a)
				?.GetComponentByClass(
					UE.TsUiNavigationBehaviorListener_C.StaticClass(),
				);
			t.push(i), i && this.SetNavigationGroupDefaultListener(i);
		}
		this.DefaultNavigationListener = t;
	}
	OnGetLoopOrLayoutListener(e) {
		return (
			(e = this.GetNavigationGroup(e.GroupName)),
			UiNavigationNewController_1.UiNavigationNewController.FindLoopOrDynListener(
				e,
			)
		);
	}
	OnNotifyFindResult(e) {}
	Clear() {
		this.OnClear(), this.Ffo.clear(), this._wo?.clear();
	}
	GetType() {
		return this.S9;
	}
	OnClear() {}
}
exports.SpecialPanelHandleBase = SpecialPanelHandleBase;
