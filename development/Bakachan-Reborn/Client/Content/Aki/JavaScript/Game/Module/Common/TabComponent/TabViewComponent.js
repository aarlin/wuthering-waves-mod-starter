"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TabViewComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	UiTabViewStorage_1 = require("../../../Ui/UiTabViewStorage");
class TabViewComponent {
	constructor(e) {
		(this.kBt = e),
			(this.IVe = void 0),
			(this.y9 = void 0),
			(this.FBt = new Map()),
			(this.VBt = (e, t) => {
				var i = this.IVe ?? this.y9;
				t.DynamicTabName === i &&
					(t = this.FBt.get(i)) &&
					e.ViewData.SetAttachedView(t);
			}),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GuideFocusNeedUiTabView,
				this.VBt,
			);
	}
	HBt(e, t) {
		e?.RegisterViewModule?.(t);
	}
	jBt() {
		for (const e of this.FBt.values()) e.Destroy();
		this.FBt.clear();
	}
	WBt() {
		var e = this.FBt.get(this.IVe);
		e &&
			(e.InAsyncLoading() &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiTabModule", 11, "取消页签异步加载", [
						"TabViewName",
						this.IVe,
					]),
				e.CancelAsyncLoad(),
				this.FBt.delete(this.IVe)),
			e.HideUiTabView(!0));
	}
	ToggleCallBack(e, t, i = void 0, a = void 0) {
		void 0 !== this.IVe && this.WBt(), (this.IVe = t);
		let s = this.FBt.get(t);
		var o;
		s ||
			((s = new (o =
				UiTabViewStorage_1.UiTabViewStorage.GetUiTabViewBase(
					t,
				)).CreateUiTabView()).SetTabViewName(t),
			this.HBt(i, s),
			this.FBt.set(t, s),
			s.CreateThenShowByResourceIdAsync(o.ResourceId, this.kBt)),
			s.SetParams(e),
			s.SetExtraParams(a),
			s.InAsyncLoading() || s.ShowUiTabViewFromToggle();
	}
	GetCurrentTabViewName() {
		return this.IVe;
	}
	GetCurrentTabView() {
		return this.GetTabViewByTabName(this.IVe);
	}
	GetTabViewByTabName(e) {
		return this.FBt.get(e);
	}
	SetCurrentTabViewState(e) {
		var t;
		this.IVe &&
			(t = this.FBt.get(this.IVe)) &&
			(e && t.IsHideOrHiding
				? t.ShowUiTabViewFromView()
				: e || t.IsHideOrHiding || t.HideUiTabView(!1));
	}
	DestroyTabViewComponent() {
		this.jBt(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GuideFocusNeedUiTabView,
				this.VBt,
			);
	}
}
exports.TabViewComponent = TabViewComponent;
