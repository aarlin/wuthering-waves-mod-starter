"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterDitherEffectController = void 0);
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
	TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter"),
	MILLISECOND_TO_SECOND = 0.001;
class CharacterDitherEffectController {
	constructor(t, e) {
		(this.O$o = !1),
			(this.k$o = 1),
			(this.F$o = 0),
			(this.V$o = 1),
			(this.H$o = !1),
			(this.Ane = void 0),
			(this.Pne = void 0),
			(this.dHs = !1),
			(this.OC = t),
			(this.$6e = e),
			ObjectUtils_1.ObjectUtils.IsValid(this.$6e) || (this.H$o = !1);
	}
	get j$o() {
		return !this.OC || !this.OC.IsValid() || this.OC.bHidden;
	}
	get CurrentDitherValue() {
		return this.k$o;
	}
	get IsInAutoAnimationValue() {
		return this.O$o;
	}
	get DitherSpeedRateValue() {
		return this.V$o;
	}
	get IsDisableValue() {
		return this.H$o;
	}
	SetIsDisable(t, e = 0) {
		this.H$o !== t &&
			((this.H$o = t)
				? this.SetHiddenInGame(!0, !1)
				: (!this.O$o &&
					MathUtils_1.MathUtils.IsNearlyZero(
						this.k$o,
						MathUtils_1.MathUtils.KindaSmallNumber,
					)
						? this.SetHiddenInGame(!0, !1)
						: this.SetHiddenInGame(!1, !1),
					0 !== this.F$o && this.$6e.SetDitherEffect(this.k$o, this.F$o)));
	}
	EnterAppearEffect(t = 1, e = 3, i = !0) {
		this.j$o && this.SetHiddenInGame(!1, !0),
			(this.dHs = !1),
			(this.O$o = !0),
			(this.F$o = e),
			(this.V$o = t),
			i && ((this.k$o = 0), this.$6e.SetDitherEffect(this.k$o, this.F$o));
	}
	EnterDisappearEffect(t = 1, e = 3, i = !0) {
		this.j$o
			? ((this.k$o = 0), (this.F$o = e), this.sHs())
			: ((this.O$o = !0),
				(this.F$o = e),
				(this.V$o = -t),
				i && ((this.k$o = 1), this.$6e.SetDitherEffect(this.k$o, this.F$o)));
	}
	SetDitherEffect(t, e = 3, i = !0) {
		require("../../../../../Manager/ModManager").ModManager.Settings.AntiDither
			? (this.k$o = 1)
			: (this.k$o = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
			(this.F$o = e),
			this.H$o ||
				(this.SetHiddenInGame(
					MathUtils_1.MathUtils.IsNearlyZero(
						this.k$o,
						MathUtils_1.MathUtils.KindaSmallNumber,
					),
					i,
				),
				this.$6e?.SetDitherEffect(this.k$o, e));
	}
	SetHiddenInGame(t, e) {
		this.j$o !== t &&
			this.OC &&
			(t && e && this.O$o && ((this.O$o = !1), (this.k$o = 0)),
			this.OC instanceof TsBaseCharacter_1.default
				? (e = this.OC.CharacterActorComponent) &&
					(t
						? ((this.Ane = e.DisableActor(
								"[CharacterDitherEffectController.SetHiddenInGame]",
							)),
							e.IsNpcOutShowRange ||
								(this.Pne = e.DisableCollision(
									"[CharacterDitherEffectController.SetHiddenInGame]",
								)))
						: (this.Ane && (e.EnableActor(this.Ane), (this.Ane = void 0)),
							this.Pne && (e.EnableCollision(this.Pne), (this.Pne = void 0))))
				: this.OC.IsValid() &&
					(this.OC.SetActorHiddenInGame(t),
					this.OC.SetActorEnableCollision(!t)));
	}
	Update(t) {
		!this.H$o &&
			this.O$o &&
			((t = 0.001 * t * this.V$o), this.W$o(t, this.F$o));
	}
	sHs() {
		this.dHs || ((this.dHs = !0), this.$6e.SetDitherEffect(this.k$o, this.F$o));
	}
	ForceResetDither() {
		(this.k$o = 0), (this.F$o = 1), this.sHs();
	}
	W$o(t, e) {
		(this.k$o = MathUtils_1.MathUtils.Clamp(this.k$o + t, 0, 1)),
			0 === this.k$o && t < 0
				? ((this.O$o = !1), this.SetHiddenInGame(!0, !0))
				: 1 === this.k$o && 0 < t && (this.O$o = !1),
			this.$6e.SetDitherEffect(this.k$o, e);
	}
	Clear() {
		(this.OC = void 0),
			this.$6e && this.$6e.ResetAllRenderingState(),
			(this.$6e = void 0),
			(this.Ane = void 0),
			(this.Pne = void 0);
	}
}
exports.CharacterDitherEffectController = CharacterDitherEffectController;
