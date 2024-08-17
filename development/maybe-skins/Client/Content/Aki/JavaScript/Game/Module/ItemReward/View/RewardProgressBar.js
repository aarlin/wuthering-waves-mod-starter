"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardProgressBar = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ANIMATION_LENGTH = 500;
class RewardProgressBar extends UiPanelBase_1.UiPanelBase {
	constructor(i) {
		super(),
			(this.x0i = -0),
			(this.w0i = -0),
			(this.B0i = -0),
			(this.b0i = -0),
			(this.q0i = void 0),
			(this.G0i = []),
			this.CreateThenShowByActor(i);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UISprite],
		]),
			(this.BtnBindInfo = []);
	}
	Clear() {
		(this.q0i = 0), (this.G0i.length = 0);
	}
	Refresh(i, t, s = 500) {
		var e;
		this.LBt(i),
			t &&
				0 !== t.length &&
				(s <= 0
					? (i = t[t.length - 1]) &&
						((e = i.ToProgress),
						(i = i.MaxProgress),
						this.N0i(e, i),
						this.dkt(e, i))
					: this.PlayProgressAnimation(t, s));
	}
	PlayProgressAnimation(i, t = 500) {
		var s, e;
		(this.G0i = i),
			(i = this.G0i.shift()) &&
				((s = i.FromProgress),
				(e = i.ToProgress),
				(i = i.MaxProgress),
				this.N0i(s, i),
				this.dkt(s, i),
				this.O0i(s, e, i, t));
	}
	O0i(i, t, s, e) {
		s < t
			? (this.N0i(t, s), this.k0i(), this.dkt(t, s))
			: ((this.b0i = e),
				(this.q0i = e),
				(this.x0i = i),
				(this.w0i = t),
				(this.B0i = s));
	}
	Tick(i) {
		var t;
		void 0 !== this.q0i &&
			((t = 1 - this.q0i / this.b0i),
			(t = MathUtils_1.MathUtils.Lerp(this.x0i, this.w0i, t)),
			this.N0i(Math.ceil(Math.min(t, this.w0i)), this.B0i),
			this.dkt(Math.min(t, this.w0i), this.B0i),
			this.q0i < 0 ? this.k0i() : (this.q0i -= i));
	}
	k0i() {
		(this.q0i = void 0),
			0 < this.G0i.length && this.PlayProgressAnimation(this.G0i, this.b0i);
	}
	LBt(i) {
		var t = this.GetText(0);
		StringUtils_1.StringUtils.IsEmpty(i)
			? t.SetUIActive(!1)
			: (LguiUtil_1.LguiUtil.SetLocalTextNew(t, i), t.SetUIActive(!0));
	}
	N0i(i, t) {
		this.GetText(1).SetText(Math.min(t, i) + "/" + t);
	}
	dkt(i, t) {
		this.GetSprite(2).SetFillAmount(i / t);
	}
}
exports.RewardProgressBar = RewardProgressBar;
