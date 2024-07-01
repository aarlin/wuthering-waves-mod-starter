"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FloatViewQueue = void 0);
const UiManager_1 = require("../../UiManager");
class FloatViewQueue {
	constructor() {
		this.Eur = new Array();
	}
	Push(e, r, t) {
		this.Eur.push({ ViewBase: e, Priority: r, OnlyShowInMain: t }),
			this.Eur.sort((e, r) => r.Priority - e.Priority);
	}
	Pop(e) {
		for (let t = 0, i = this.Eur.length; t < i; ++t) {
			var r = this.Eur[t];
			if (!r.OnlyShowInMain || e) return this.yur(r), r;
		}
	}
	yur(e) {
		return !((e = this.Eur.indexOf(e)) < 0 || (this.Eur.splice(e, 1), 0));
	}
	Delete(e, r) {
		for (let i = 0, u = this.Eur.length; i < u; ++i) {
			var t = this.Eur[i];
			if (!(t.ViewBase.Info.Name !== e || (r && t.ViewBase.GetViewId() !== r)))
				return (
					this.yur(t),
					UiManager_1.UiManager.RemoveView(t.ViewBase.GetViewId()),
					!0
				);
		}
		return !1;
	}
	Has(e) {
		for (let r = 0, t = this.Eur.length; r < t; ++r)
			if (this.Eur[r].ViewBase.Info.Name === e) return !0;
		return !1;
	}
	Clear() {
		for (let r = this.Eur.length - 1; 0 <= r; --r) {
			var e = this.Eur[r].ViewBase;
			e.Info.IsPermanent ||
				(this.Eur.pop(), UiManager_1.UiManager.RemoveView(e.GetViewId()));
		}
	}
	get Size() {
		return this.Eur.length;
	}
}
exports.FloatViewQueue = FloatViewQueue;
