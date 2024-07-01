"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharDecalShadow = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	Info_1 = require("../../../../../Core/Common/Info"),
	Log_1 = require("../../../../../Core/Common/Log"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	RenderConfig_1 = require("../../../Config/RenderConfig"),
	RenderDataManager_1 = require("../../../Data/RenderDataManager"),
	CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharDecalShadow extends CharRenderBase_1.CharRenderBase {
	constructor() {
		super(...arguments),
			(this.DecalShadowEnabled = !1),
			(this.RealtimeShadowEnabled = !0),
			(this.tar = void 0),
			(this.Lo = void 0),
			(this.iar = new Map()),
			(this.oar = void 0),
			(this.rar = void 0),
			(this.nar = void 0),
			(this.sar = 1),
			(this.aar = new UE.FName("Opacity"));
	}
	static OnSetDecalShadowEnabled(a) {
		if (0 < a) for (const a of CharDecalShadow.har) a.EnableDecalShadow();
		else for (const a of CharDecalShadow.har) a.DisableDecalShadow();
	}
	Start() {
		(this.tar = this.GetRenderingComponent().GetOwner()),
			(this.Lo = this.GetRenderingComponent().DecalShadowConfig),
			this.Lo ||
				(this.Lo =
					RenderDataManager_1.RenderDataManager.Get().GetGlobalDecalShadowConfig()),
			this.Lo &&
				(this.lar(),
				CharDecalShadow.har.add(this),
				CharDecalShadow._ar ||
					(EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.SetDecalShadowEnabled,
						CharDecalShadow.OnSetDecalShadowEnabled,
					),
					(CharDecalShadow._ar = !0)),
				this.OnInitSuccess());
	}
	Destroy() {
		this.oar?.K2_DestroyActor(), CharDecalShadow.har.delete(this);
	}
	lar() {
		var a = this.tar.K2_GetComponentsByClass(
				UE.PrimitiveComponent.StaticClass(),
			),
			e = a.Num();
		for (let r = 0; r < e; r++) {
			var t = a.Get(r);
			t.CastShadow && this.iar.set(t.GetName(), t);
		}
	}
	AddPrimitiveComponent(a, e) {
		e.CastShadow &&
			(this.RemovePrimitiveComponent(a),
			this.iar.set(a, e),
			this.RealtimeShadowEnabled || (e.CastShadow = !1));
	}
	RemovePrimitiveComponent(a) {
		var e = this.iar.get(a);
		e && ((e.CastShadow = !0), this.iar.delete(a));
	}
	EnableDecalShadow() {
		var a, e, t;
		this.DecalShadowEnabled ||
			((a = this.Lo) &&
				((t = (e = this.tar).GetComponentByClass(
					UE.CapsuleComponent.StaticClass(),
				))
					? (this.oar
							? (this.rar.SetVisibility(!0),
								Info_1.Info.IsGameRunning() ||
									this.uar(a, t.CapsuleRadius, t.CapsuleHalfHeight))
							: ((this.oar = ActorSystem_1.ActorSystem.Spawn(
									UE.Actor.StaticClass(),
									void 0,
									this.tar,
								)),
								(this.rar = this.oar.AddComponentByClass(
									UE.DecalComponent.StaticClass(),
									!1,
									void 0,
									!1,
								)),
								ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
									this.oar,
									this.tar,
									2,
									"CharDecalShadow.EnableDecalShadow",
									void 0,
									0,
									0,
									0,
									!1,
								),
								this.oar.K2_SetActorRotation(
									UE.Rotator.MakeFromEuler(new UE.Vector(0, -90, 0)),
									!0,
								),
								this.oar.K2_SetActorRelativeLocation(
									new UE.Vector(0, 0, -t.CapsuleHalfHeight),
									!1,
									void 0,
									!0,
								),
								this.uar(a, t.CapsuleRadius, t.CapsuleHalfHeight)),
						(this.DecalShadowEnabled = !0),
						this.SetDecalShadowOpacity(this.sar))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Render", 26, "Decal Shadow找不到胶囊体", [
							"Actor: ",
							e.GetName(),
						])));
	}
	DisableDecalShadow() {
		this.DecalShadowEnabled &&
			(this.rar?.SetVisibility(!1),
			(this.DecalShadowEnabled = !1),
			this.SetDecalShadowOpacity(this.sar));
	}
	EnableRealtimeShadow() {
		if (!this.RealtimeShadowEnabled) {
			for (const a of this.iar.values()) a.SetCastShadow(!0);
			(this.RealtimeShadowEnabled = !0),
				this.SetRealtimeShadowOpacity(this.sar);
		}
	}
	DisableRealtimeShadow() {
		if (this.RealtimeShadowEnabled) {
			for (const a of this.iar.values()) a.SetCastShadow(!1);
			(this.RealtimeShadowEnabled = !1),
				this.SetRealtimeShadowOpacity(this.sar);
		}
	}
	DisableAllShadow() {
		this.DisableDecalShadow(), this.DisableRealtimeShadow();
	}
	SetDecalShadowOpacity(a) {
		(this.sar = a),
			this.DecalShadowEnabled &&
				(a < MathUtils_1.MathUtils.KindaSmallNumber
					? this.rar.SetVisibility(!1)
					: (this.rar.SetVisibility(!0),
						this.nar.SetScalarParameterValue(this.aar, a)));
	}
	SetRealtimeShadowOpacity(a) {
		if (
			((this.sar = a),
			this.RealtimeShadowEnabled &&
				3 == this.GetRenderingComponent().RenderType)
		) {
			var e = a > CharDecalShadow.car;
			for (const a of this.iar.values()) a.SetCastShadow(e);
		}
	}
	uar(a, e, t) {
		(this.rar.ZFadingFactor = a.ZDistanceFadeFactor),
			(this.rar.ZFadingPower = a.ZDistanceFadePower),
			(this.nar = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
				this.rar,
				a.DecalShadowMaterial,
			)),
			this.rar.SetDecalMaterial(this.nar);
		var r = 25 * a.DecalBoxScaleHori;
		t *= a.DecalBoxScaleVerti;
		this.rar.SetWorldScale3D(new UE.Vector(t, r, r));
	}
	GetStatName() {
		return "CharDecalShadow";
	}
	GetComponentId() {
		return RenderConfig_1.RenderConfig.IdDecalShadow;
	}
}
((exports.CharDecalShadow = CharDecalShadow)._ar = !1),
	(CharDecalShadow.har = new Set()),
	(CharDecalShadow.car = 0.2);
