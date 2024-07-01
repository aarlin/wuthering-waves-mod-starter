"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationScrollbarData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class NavigationScrollbarData {
	constructor() {
		(this.Qxo = []),
			(this.Xxo = void 0),
			(this.$xo = void 0),
			(this.Yxo = void 0);
	}
	Jxo() {
		if (!this.Xxo?.IsListenerActive()) {
			let i;
			for (const t of this.Qxo)
				if (t.IsListenerActive()) {
					i = t;
					break;
				}
			this.zxo(i);
		}
	}
	zxo(i) {
		this.Xxo && (this.Xxo.IsFocusScrollbar = !1),
			i && (i.IsFocusScrollbar = !0),
			(this.Yxo = this.Xxo),
			(this.Xxo = i),
			(this.$xo = i?.GetBehaviorComponent()),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("UiNavigation", 11, "设置当前的滚动区域对象", [
					"名字",
					i?.RootUIComp.displayName,
				]);
	}
	AddScrollbar(i) {
		this.Qxo = [];
		for (let e = 0, r = i.Num(); e < r; ++e) {
			var t = i.Get(e).ListenerList;
			for (let i = 0, e = t.Num(); i < e; ++i) {
				var o = t.Get(i);
				this.Qxo.push(o);
			}
		}
		this.Qxo.sort((i, t) => i.ScrollbarIndex - t.ScrollbarIndex), this.Jxo();
	}
	DeleteScrollbar(i) {
		var t = i.ListenerList;
		if (t) {
			for (let i = 0, r = t.Num(); i < r; ++i) {
				var o = t.Get(i),
					e = this.Qxo.indexOf(o);
				this.Qxo.splice(e, 1), this.Xxo === o && this.zxo(void 0);
			}
			this.Jxo();
		}
	}
	ResumeLastListener() {
		this.Yxo?.IsValid() ? this.zxo(this.Yxo) : this.Jxo();
	}
	GetCurrentListener() {
		return this.Xxo;
	}
	GetCurrentScrollbar() {
		return this.$xo;
	}
	HasActiveScrollbarList() {
		return 1 < this.Qxo.filter((i) => i.IsListenerActive()).length;
	}
	FindNextScrollbar() {
		if (this.Xxo) {
			var i = this.Qxo.length;
			if (1 === i) return void this.zxo(void 0);
			var t = this.Qxo.indexOf(this.Xxo);
			let o = t + 1 < i ? t + 1 : 0;
			for (; t !== o; ) {
				if (this.Qxo[o].IsListenerActive()) {
					this.zxo(this.Qxo[o]);
					break;
				}
				o = o + 1 < i ? o + 1 : 0;
			}
		} else this.Jxo();
		UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
	}
	FindPrevScrollbar() {
		if (this.Xxo) {
			var i = this.Qxo.length;
			if (1 === i) return;
			var t = this.Qxo.indexOf(this.Xxo);
			let o = 0 <= t - 1 ? t - 1 : i - 1;
			for (; t !== o; ) {
				if (this.Qxo[o].IsListenerActive()) {
					this.zxo(this.Qxo[o]);
					break;
				}
				o = 0 <= o - 1 ? o - 1 : i - 1;
			}
		} else this.Jxo();
		UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
	}
	TryFindScrollbar() {
		this.Jxo();
	}
}
exports.NavigationScrollbarData = NavigationScrollbarData;
