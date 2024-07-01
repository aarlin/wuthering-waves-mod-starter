"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ThreeSectionTimeline = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	RenderModuleController_1 = require("../Manager/RenderModuleController");
class ThreeSectionTimeline {
	constructor() {
		(this.il = -0),
			(this.kC = -0),
			(this.wQt = -0),
			(this.a1r = !1),
			(this.h1r = !1),
			(this.l1r = -0),
			(this._1r = !1),
			(this.u1r = -0),
			(this.c1r = !1),
			(this.m1r = !0),
			(this.Nhr = !1),
			(this.d1r = void 0),
			(this.C1r = -0);
	}
	Setup(r, t, i, s = !0, e = !1) {
		(this.il = r),
			(this.kC = t),
			(this.wQt = i),
			(this.l1r = r + t + i),
			(this._1r = s),
			(this.u1r = 0),
			(this.c1r = !1),
			(this.m1r = !1),
			(this.Nhr = e),
			(this.d1r = 0),
			(this.C1r = 0),
			MathUtils_1.MathUtils.IsNearlyEqual(t, 0, 0.001)
				? (this.a1r = !0)
				: (this.a1r = !1),
			MathUtils_1.MathUtils.IsNearlyEqual(i, 0, 0.001)
				? (this.h1r = !0)
				: (this.h1r = !1);
	}
	Update(r) {
		this.m1r ||
			((r = this.g1r(r)),
			(this.u1r += r),
			this.c1r
				? this.u1r >= this.l1r && (this.m1r = !0)
				: this.u1r >= this.il + this.kC &&
					(this._1r
						? this.a1r
							? (this.u1r = this.il)
							: ((r = this.u1r - this.il),
								(this.u1r = this.il + (r - Math.floor(r / this.kC) * this.kC)))
						: ((this.c1r = !0),
							(this.h1r || this.u1r >= this.l1r) && (this.m1r = !0))),
			this.f1r());
	}
	TriggerEnd() {
		(this.c1r = !0),
			(this.u1r = this.il + this.kC),
			this.h1r && (this.m1r = !0),
			this.f1r();
	}
	SetLoop(r) {
		this._1r = r;
	}
	GetCurrState() {
		return this.d1r;
	}
	IsDead() {
		return this.m1r;
	}
	GetCurrFactor() {
		return this.C1r;
	}
	GetFloatFromGroup(r) {
		switch (this.d1r) {
			case 0:
				return UE.KuroCurveLibrary.GetValue_Float(
					r.Start,
					this.GetCurrFactor(),
				);
			case 1:
				return UE.KuroCurveLibrary.GetValue_Float(r.Loop, this.GetCurrFactor());
			default:
				return UE.KuroCurveLibrary.GetValue_Float(r.End, this.GetCurrFactor());
		}
	}
	GetColorFromGroup(r) {
		switch (this.d1r) {
			case 0:
				return UE.KuroCurveLibrary.GetValue_LinearColor(
					r.Start,
					this.GetCurrFactor(),
				);
			case 1:
				return UE.KuroCurveLibrary.GetValue_LinearColor(
					r.Loop,
					this.GetCurrFactor(),
				);
			default:
				return UE.KuroCurveLibrary.GetValue_LinearColor(
					r.End,
					this.GetCurrFactor(),
				);
		}
	}
	g1r(r) {
		if (
			!this.Nhr &&
			RenderModuleController_1.RenderModuleController.IsGamePaused
		)
			return 0;
		if (this.Nhr) {
			var t =
				RenderModuleController_1.RenderModuleController.GlobalTimeDilation;
			if (!MathUtils_1.MathUtils.IsNearlyEqual(t, 1)) return r * (1 / t);
		}
		return r;
	}
	f1r() {
		this.m1r
			? ((this.d1r = 3), (this.C1r = 1))
			: this.c1r
				? ((this.d1r = 2),
					(this.C1r = (this.u1r - this.il - this.kC) / this.wQt))
				: this.u1r < this.il
					? ((this.d1r = 0), (this.C1r = this.u1r / this.il))
					: ((this.d1r = 1),
						this.a1r && (this.C1r = 1),
						(this.C1r = (this.u1r - this.il) / this.kC));
	}
}
exports.ThreeSectionTimeline = ThreeSectionTimeline;
