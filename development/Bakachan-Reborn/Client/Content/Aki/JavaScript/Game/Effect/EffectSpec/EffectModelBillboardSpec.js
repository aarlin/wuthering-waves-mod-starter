"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectModelBillboardSpec = void 0);
const UE = require("ue"),
	EffectSpec_1 = require("./EffectSpec");
class EffectModelBillboardSpec extends EffectSpec_1.EffectSpec {
	constructor() {
		super(...arguments), (this.BillboardComponent = void 0), (this.t0e = !1);
	}
	OnInit() {
		var e = this.Handle.GetSureEffectActor(),
			t = new UE.Transform();
		return (
			(this.BillboardComponent = e.AddComponentByClass(
				UE.KuroBillboardComponent.StaticClass(),
				!1,
				t,
				!1,
			)),
			(this.t0e = this.BillboardComponent.IsComponentTickEnabled()),
			this.BillboardComponent.SetComponentTickEnabled(!1),
			!0
		);
	}
	OnStart() {
		return (
			this.BillboardComponent && this.BillboardComponent.SetActive(!1, !0), !0
		);
	}
	OnClear() {
		return (
			this.BillboardComponent?.K2_DestroyComponent(
				this.Handle.GetSureEffectActor(),
			),
			!0
		);
	}
	OnStop(e, t) {
		this.BillboardComponent?.IsValid() &&
			this.BillboardComponent.SetComponentTickEnabled(!1);
	}
	OnPlay() {
		this.BillboardComponent?.IsValid() &&
			(this.BillboardComponent.Initialize(),
			this.BillboardComponent.SetComponentTickEnabled(this.t0e),
			this.BillboardComponent.SetActive(!0, !0),
			(this.BillboardComponent.IsUpdateEveryFrame =
				this.EffectModel.IsUpdateEveryFrame),
			(this.BillboardComponent.OrientAxis = this.EffectModel.OrientAxis),
			(this.BillboardComponent.IsFixSize = this.EffectModel.IsFixSize),
			(this.BillboardComponent.ScaleSize = this.EffectModel.ScaleSize),
			(this.BillboardComponent.MaxDistance = this.EffectModel.MaxDistance),
			(this.BillboardComponent.MinSize = this.EffectModel.MinSize));
	}
	OnTick(e) {
		this.BillboardComponent.Update();
	}
}
exports.EffectModelBillboardSpec = EffectModelBillboardSpec;
