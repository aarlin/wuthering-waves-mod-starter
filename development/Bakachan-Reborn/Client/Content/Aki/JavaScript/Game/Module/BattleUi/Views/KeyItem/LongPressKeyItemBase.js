"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LongPressKeyItemBase = void 0);
const KeyItemBase_1 = require("./KeyItemBase");
class LongPressKeyItemBase extends KeyItemBase_1.KeyItemBase {
	constructor() {
		super(...arguments), (this.g_t = -0), (this.K1t = -0), (this.f_t = !1);
	}
	RefreshActionLongPress(t, s = 0) {
		this.ActionName !== t &&
			((this.g_t = s), this.RefreshAction(t), this.p_t(0 < s), this.v_t(0));
	}
	ForceShowLongPress() {
		(this.g_t = 0), this.p_t(!0), this.v_t(100);
	}
	RefreshAxis(t) {
		this.AxisName !== t && ((this.g_t = 0), this.p_t(!1), super.RefreshAxis(t));
	}
	OnBeforeDestroy() {
		this.M_t();
	}
	OnInputAction(t, s) {
		this.IsEnable && 0 === s ? this.S_t() : this.M_t();
	}
	Tick(t) {
		this.f_t &&
			(!this.IsEnable ||
				((this.K1t += t),
				this.v_t(this.K1t / this.g_t),
				this.K1t >= this.g_t)) &&
			this.M_t();
	}
	S_t() {
		(this.K1t = 0), this.v_t(0), (this.f_t = !0);
	}
	M_t() {
		(this.K1t = 0), this.v_t(0), (this.f_t = !1);
	}
	p_t(t) {
		this.GetLongPressItem()?.SetUIActive(t);
	}
	v_t(t) {
		this.GetLongPressTexture()?.SetFillAmount(t);
	}
}
exports.LongPressKeyItemBase = LongPressKeyItemBase;
