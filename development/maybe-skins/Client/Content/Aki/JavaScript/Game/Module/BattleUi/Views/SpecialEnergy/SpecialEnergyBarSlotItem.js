"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarSlotItem = void 0);
const UE = require("ue"),
	Time_1 = require("../../../../../Core/Common/Time"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	EFFECT_DURATION = 500;
class SpecialEnergyBarSlotItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ac = 0),
			(this.Umt = !1),
			(this.Bmt = 0),
			(this.bmt = 0),
			(this.Amt = 1),
			(this.qmt = 0),
			(this.Gmt = 0),
			(this.Nmt = 0),
			(this.pGn = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UIItem],
			[3, UE.UINiagara],
			[4, UE.UINiagara],
			[5, UE.UINiagara],
			[6, UE.UINiagara],
			[7, UE.UISprite],
			[8, UE.UISprite],
		];
	}
	OnStart() {
		this.GetSprite(0).SetUIActive(!0),
			this.GetSprite(1).SetUIActive(!0),
			this.GetSprite(7).SetUIActive(!0),
			this.GetSprite(8).SetUIActive(!0),
			this.GetUiNiagara(3).SetUIActive(!1),
			this.GetUiNiagara(4).SetUIActive(!1),
			this.GetUiNiagara(5).SetUIActive(!1),
			this.GetUiNiagara(6).SetUIActive(!1);
		var t = this.GetSprite(7);
		this.GetSprite(8).SetStretchLeft(t.GetStretchLeft()),
			(this.qmt = t.GetStretchRight()),
			(this.Gmt = t.Width),
			(this.Nmt = t.tileX);
	}
	SetBarColor(t) {
		this.GetSprite(1).SetColor(t);
	}
	SetPointColor(t) {
		this.GetSprite(8).SetColor(t);
	}
	SetFullEffectColor(t, i = !1) {
		this.GetUiNiagara(3).SetNiagaraVarLinearColor("Color", t),
			this.GetUiNiagara(4).SetNiagaraVarLinearColor("Color", t),
			this.GetUiNiagara(6).SetNiagaraVarLinearColor("Color", t),
			this.GetUiNiagara(3).SetNiagaraVarFloat("Default", i ? 0 : 1),
			this.GetUiNiagara(3).SetNiagaraVarFloat("Shift", i ? 1 : 0);
	}
	SetEffectBasePercent(t) {
		(this.Amt = t),
			this.GetUiNiagara(3).SetNiagaraVarFloat("Dissolve", this.Amt),
			this.GetUiNiagara(4).SetNiagaraVarFloat("Dissolve", this.Amt),
			this.GetUiNiagara(5).SetNiagaraVarFloat("Dissolve", this.Amt),
			this.GetUiNiagara(6).SetNiagaraVarFloat("Dissolve", this.Amt);
	}
	UpdatePercent(t, i) {
		let e = 0;
		t <= MathUtils_1.MathUtils.SmallNumber
			? (e = -1)
			: t >= 1 - MathUtils_1.MathUtils.SmallNumber && i && (e = 1),
			this.ac !== e &&
				(-1 === e
					? (this.GetSprite(0).SetUIActive(!0),
						this.GetSprite(7).SetUIActive(!0),
						this.GetSprite(8).SetUIActive(!1),
						this.GetSprite(1).SetUIActive(!1),
						this.GetUiNiagara(3).SetUIActive(!1),
						this.GetUiNiagara(4).SetUIActive(!1),
						this.GetUiNiagara(5).SetUIActive(!1),
						1 === this.ac && this.Omt())
					: 1 === e
						? (this.GetSprite(0).SetUIActive(!1),
							this.GetSprite(7).SetUIActive(!1),
							this.GetSprite(8).SetUIActive(!1),
							this.GetSprite(1).SetUIActive(!1),
							this.GetUiNiagara(3).SetUIActive(!0),
							this.GetUiNiagara(4).SetUIActive(!0),
							this.GetUiNiagara(6).SetUIActive(!1),
							this.kmt())
						: (this.GetSprite(0).SetUIActive(!0),
							this.GetSprite(7).SetUIActive(!0),
							this.GetSprite(8).SetUIActive(!0),
							this.GetSprite(1).SetUIActive(!0),
							this.GetUiNiagara(3).SetUIActive(!1),
							this.GetUiNiagara(4).SetUIActive(!1),
							this.GetUiNiagara(5).SetUIActive(!1),
							1 === this.ac && this.Omt()),
				(this.ac = e)),
			0 === e && (this.GetSprite(1).SetFillAmount(t), this.Fmt(t));
	}
	UpdatePercentWithVisible(t, i, e, a, s) {
		i && (this.GetSprite(1).SetFillAmount(t), this.Fmt(t)),
			a
				? (this.GetSprite(0).SetUIActive(i),
					this.GetSprite(1).SetUIActive(i),
					this.GetSprite(7).SetUIActive(i),
					this.GetSprite(8).SetUIActive(i),
					this.GetUiNiagara(5).SetUIActive(!1),
					this.GetUiNiagara(6).SetUIActive(!1))
				: e &&
					(this.GetSprite(0).SetUIActive(i),
					this.GetSprite(1).SetUIActive(i),
					this.GetSprite(7).SetUIActive(i),
					this.GetSprite(8).SetUIActive(i),
					i
						? this.GetUiNiagara(5).SetUIActive(!1)
						: (this.GetUiNiagara(5).SetNiagaraVarFloat(
								"Dissolve",
								t * this.Amt,
							),
							this.kmt()),
					i && 0 === t
						? (this.GetUiNiagara(6).SetNiagaraVarFloat(
								"Dissolve",
								s * this.Amt,
							),
							this.Omt())
						: this.GetUiNiagara(6).SetUIActive(!1));
	}
	Fmt(t) {
		t = Math.max(0, Math.min(1, t));
		var i = this.GetSprite(8);
		i.SetStretchRight(this.qmt + this.Gmt * (1 - t)), i.SetTileX(this.Nmt * t);
	}
	PlayUseEffectWithPercent(t) {
		this.GetUiNiagara(6).SetNiagaraVarFloat("Dissolve", t * this.Amt),
			this.Omt();
	}
	kmt() {
		this.GetUiNiagara(5).SetUIActive(!0),
			(this.Umt = !0),
			(this.Bmt = 500 + Time_1.Time.Now);
	}
	Omt() {
		this.GetUiNiagara(6).SetUIActive(!0),
			(this.Umt = !0),
			(this.bmt = 500 + Time_1.Time.Now);
	}
	Tick(t) {
		this.Umt &&
			((this.Umt = !1),
			0 < this.Bmt &&
				(this.Bmt <= Time_1.Time.Now
					? (this.GetUiNiagara(5).SetUIActive(!1), (this.Bmt = 0))
					: (this.Umt = !0)),
			0 < this.bmt) &&
			(this.bmt <= Time_1.Time.Now
				? (this.GetUiNiagara(6).SetUIActive(!1), (this.bmt = 0))
				: (this.Umt = !0));
	}
	ReplaceFullEffect(t) {
		var i = this.GetUiNiagara(3);
		this.pGn || (this.pGn = i.NiagaraSystemReference), i.SetNiagaraSystem(t);
	}
	OnBeforeDestroy() {
		this.pGn &&
			(this.GetUiNiagara(3).SetNiagaraSystem(this.pGn), (this.pGn = void 0));
	}
}
exports.SpecialEnergyBarSlotItem = SpecialEnergyBarSlotItem;
