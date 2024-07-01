"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiComponentsTween = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log");
class UiComponentsTween {
	constructor(e) {
		(this.G1r = void 0), (this.N1r = void 0), (this.DIt = e);
	}
	O1r(e = !1) {
		var t = this.G1r.Time,
			s = this.G1r.TargetAlpha,
			o = e ? s : 1,
			i = e ? 1 : s;
		for (const e of this.N1r) e.PlayUIItemAlphaTween(o, i, t);
		s = this.G1r.TargetSize;
		var r = e ? s : 1,
			n = e ? 1 : s;
		for (const e of this.N1r) e.PlayUIItemScaleTween(r, n, t);
	}
	CollectUnSafeItem() {
		if (!this.N1r) {
			let s = !(this.N1r = []);
			var e = this.DIt.GetAttachUIChildren();
			for (let o = 0, i = e.Num(); o < i; ++o) {
				var t = e.Get(o);
				s || !t.GetOwner().GetComponentByClass(UE.UISafeZone.StaticClass())
					? this.N1r.push(t)
					: (s = !0);
			}
			s || ((this.N1r.length = 0), this.N1r.push(this.DIt));
		}
	}
	SetUiComponentsTweenData(e) {
		e &&
			(this.G1r = new UiComponentsTweenData(
				e.GetTweenAlpha(),
				e.GetTweenSize(),
				e.GetTweenTime(),
			));
	}
	PlayStartTween() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("UiCore", 11, "关卡序列:播放界面间的Tween"),
			this.CollectUnSafeItem(),
			this.O1r();
	}
	PlayCloseTween() {
		this.O1r(!0);
	}
	Destroy() {
		(this.G1r = void 0), (this.DIt = void 0), (this.N1r = []);
	}
}
exports.UiComponentsTween = UiComponentsTween;
class UiComponentsTweenData {
	constructor(e, t, s) {
		(this.TargetAlpha = e), (this.TargetSize = t), (this.Time = s);
	}
}
