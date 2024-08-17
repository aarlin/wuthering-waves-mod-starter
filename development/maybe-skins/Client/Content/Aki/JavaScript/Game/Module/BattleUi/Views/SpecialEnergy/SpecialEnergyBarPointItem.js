"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarPointItem = exports.SpecialEnergyBarPointEffectInfo =
		void 0);
const UE = require("ue"),
	Time_1 = require("../../../../../Core/Common/Time"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	POINT_EFFECT_NUM = 3,
	EFFECT_DURATION = 500;
class SpecialEnergyBarPointEffectInfo {
	constructor() {
		(this.Effect = void 0), (this.FinishTime = 0), (this.IsPlaying = !1);
	}
}
exports.SpecialEnergyBarPointEffectInfo = SpecialEnergyBarPointEffectInfo;
class SpecialEnergyBarPointItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Smt = 1),
			(this.Emt = 0),
			(this.ymt = !0),
			(this.Imt = 0),
			(this.Tmt = 0),
			(this.Lmt = 0),
			(this.Dmt = []),
			(this.Rmt = 0),
			(this.Umt = !1),
			(this.Amt = 1),
			(this.pGn = void 0);
	}
	InitPrefabInfo(t, i, e = !0) {
		(this.Smt = t), (this.Emt = i), (this.ymt = e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UINiagara],
			[2, UE.UINiagara],
		];
		for (let t = 0; t < 3; t++)
			this.ComponentRegisterInfos.push([t + 3, UE.UINiagara]);
	}
	OnStart() {
		for (let i = 0; i < 3; i++) {
			var t = new SpecialEnergyBarPointEffectInfo();
			(t.Effect = this.GetUiNiagara(i + 3)),
				t.Effect.SetUIActive(!1),
				this.Dmt.push(t);
		}
	}
	SetFullEffectColor(t, i = !1) {
		this.GetUiNiagara(1).SetNiagaraVarLinearColor("Color", t),
			this.GetUiNiagara(2).SetNiagaraVarLinearColor("Color", t);
		for (const i of this.Dmt) i.Effect.SetNiagaraVarLinearColor("Color", t);
		this.GetUiNiagara(1).SetNiagaraVarFloat("Default", i ? 0 : 1),
			this.GetUiNiagara(1).SetNiagaraVarFloat("Shift", i ? 1 : 0);
	}
	SetEffectBasePercent(t) {
		(this.Amt = t),
			this.GetUiNiagara(1).SetNiagaraVarFloat("Dissolve", this.Amt),
			this.GetUiNiagara(2).SetNiagaraVarFloat("Dissolve", this.Amt);
	}
	UpdatePercent(t, i = !0) {
		var e = Math.ceil(t * this.Smt);
		t = (this.Amt * e) / this.Smt;
		if (
			(this.GetUiNiagara(1).SetNiagaraVarFloat("Dissolve", t),
			this.GetUiNiagara(2).SetNiagaraVarFloat("Dissolve", t),
			this.GetUiNiagara(1).SetUIActive(0 < t),
			this.GetUiNiagara(2).SetUIActive(0 < t),
			i && this.Imt > e)
		) {
			var a = 500 + Time_1.Time.Now;
			for (let t = Math.min(e + 3, this.Imt) - 1; t >= e; t--) {
				let i = t;
				this.ymt || (i = this.Smt - i - 1);
				var s = this.Emt * (i - (this.Smt - 1) / 2),
					r = this.Pmt(),
					h = r.Effect;
				h.SetAnchorOffsetX(s),
					r.IsPlaying || h.SetUIActive(!0),
					h.ActivateSystem(!0),
					(r.FinishTime = a);
			}
			this.Umt = !0;
		}
		this.Imt = e;
	}
	UpdatePercentWithVisible(t, i, e, a) {
		(e || a) && this.RootItem.SetUIActive(i),
			i && this.UpdatePercent(t, !e && !a);
	}
	UpdateLeftRightPercent(t, i) {
		var e;
		(t = Math.ceil(t * this.Smt)), (i = Math.ceil(i * this.Smt));
		(this.Tmt === t && this.Lmt === i) ||
			((this.Tmt = t),
			(this.Lmt = t),
			(e = this.Emt * t),
			this.GetItem(0).SetAnchorOffsetX(e),
			(e = (i - t) / this.Smt),
			this.GetUiNiagara(1).SetNiagaraVarFloat("Dissolve", e),
			this.GetUiNiagara(2).SetNiagaraVarFloat("Dissolve", e));
	}
	Pmt() {
		var t = this.Dmt[this.Rmt];
		return this.Rmt++, this.Rmt >= 3 && (this.Rmt = 0), t;
	}
	Tick(t) {
		if (this.Umt) {
			this.Umt = !1;
			for (const t of this.Dmt)
				t.IsPlaying &&
					(t.FinishTime <= Time_1.Time.Now
						? (t.Effect.SetUIActive(!1), (t.IsPlaying = !1))
						: (this.Umt = !0));
		}
	}
	ReplaceFullEffect(t) {
		var i = this.GetUiNiagara(1);
		this.pGn || (this.pGn = i.NiagaraSystemReference), i.SetNiagaraSystem(t);
	}
	OnBeforeDestroy() {
		this.pGn &&
			(this.GetUiNiagara(1).SetNiagaraSystem(this.pGn), (this.pGn = void 0));
	}
}
exports.SpecialEnergyBarPointItem = SpecialEnergyBarPointItem;
