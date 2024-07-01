"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueBeamCommonItem = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../../../../../Core/Actor/ActorSystem"),
	ResourceSystem_1 = require("../../../../../../../../Core/Resource/ResourceSystem"),
	Rotator_1 = require("../../../../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../../../../../GlobalData");
class GameplayCueBeamCommonItem {
	constructor(t, e) {
		(this.OKt = t),
			(this.n8 = e),
			(this._Xo = void 0),
			(this.uXo = 0),
			(this.dce = !1);
	}
	static Spawn(t, e) {
		return ((t = new this(t, e)).dce = !0), (t._Xo = t.cXo()), t;
	}
	Tick(t, e) {
		this._Xo
			.GetOwner()
			.K2_SetActorLocation(this.OKt.K2_GetActorLocation(), !1, void 0, !0);
		var o = t.length;
		o !== this.uXo && this.mXo(o);
		for (let e = 0; e < o; e++) this._Xo.SetWorldLocationAtSplinePoint(e, t[e]);
	}
	Destroy() {
		(this.dce = !1),
			this._Xo.GetOwner() && ActorSystem_1.ActorSystem.Put(this._Xo.GetOwner());
	}
	GetOwner() {
		return this._Xo.GetOwner();
	}
	cXo() {
		const t = ActorSystem_1.ActorSystem.Get(
				UE.Actor.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
			),
			e =
				(GlobalData_1.GlobalData.IsPlayInEditor &&
					t.SetActorLabel(
						this.OKt.GetActorLabel() + ":" + GameplayCueBeamCommonItem.name,
					),
				t.AddComponentByClass(
					UE.SplineComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
				));
		return (
			e.ClearSplinePoints(),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				this.n8,
				UE.NiagaraSystem,
				(o) => {
					var r;
					this.dce &&
						o?.IsValid() &&
						t?.IsValid() &&
						((r = t.AddComponentByClass(
							UE.NiagaraComponent.StaticClass(),
							!1,
							MathUtils_1.MathUtils.DefaultTransform,
							!1,
						)).SetAsset(o),
						UE.KuroRenderingRuntimeBPPluginBPLibrary.SetNiagaraSplineComponent(
							r,
							"NewSpline",
							e,
						));
				},
			),
			e
		);
	}
	mXo(t) {
		if (t > this.uXo)
			for (let o = 0; o < t - this.uXo; o++) {
				var e = this.uXo + o;
				e = new UE.SplinePoint(
					e,
					Vector_1.Vector.ZeroVector,
					Vector_1.Vector.ZeroVector,
					Vector_1.Vector.ZeroVector,
					Rotator_1.Rotator.ZeroRotator,
					Vector_1.Vector.OneVector,
					0,
				);
				this._Xo.AddPoint(e);
			}
		else for (let e = this.uXo - 1; e >= t; e--) this._Xo.RemoveSplinePoint(e);
		this.uXo = t;
	}
}
exports.GameplayCueBeamCommonItem = GameplayCueBeamCommonItem;
