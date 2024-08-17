"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectModelPostProcessSpec = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
	EffectSpec_1 = require("./EffectSpec");
class EffectModelPostProcessSpec extends EffectSpec_1.EffectSpec {
	constructor() {
		super(...arguments),
			(this.PostProcessComponent = void 0),
			(this.t0e = !1),
			(this.ModelParameter = void 0),
			(this.NeedUpdateVolume = !1),
			(this.MaterialIndex = 0),
			(this.X0e = void 0),
			(this.o0e = !1),
			(this.CachedLocationCurve = void 0),
			(this.$0e = void 0),
			(this.Y0e = void 0),
			(this.J0e = 0),
			(this.XDn = new UE.FName("EffectActorLocation")),
			(this.$Dn = new UE.LinearColor()),
			(this.HEn = !1),
			(this.jEn = (e) => {
				this.PostProcessComponent?.IsValid() &&
					(this.PostProcessComponent.bEnabled = !e),
					(this.HEn = e);
			});
	}
	OnInit() {
		(this.X0e = new UE.Vector2D(0.5, 0.5)),
			(this.MaterialIndex = -1),
			Stats_1.Stat.Enable &&
				((this.$0e = void 0),
				EffectModelPostProcessSpec.E0e ||
					((EffectModelPostProcessSpec.E0e = void 0),
					(EffectModelPostProcessSpec.z0e = void 0)));
		var e = this.Handle.GetSureEffectActor(),
			t = (t = this.Handle.Parent)
				? t.GetEffectSpec()?.GetSceneComponent()
				: void 0;
		t = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
			e,
			UE.KuroPostProcessComponent.StaticClass(),
			t,
			void 0,
			!1,
			this.EffectModel,
		);
		return (
			(this.PostProcessComponent = t),
			(this.SceneComponent = t),
			(this.t0e = this.PostProcessComponent.IsComponentTickEnabled()),
			this.PostProcessComponent.SetComponentTickEnabled(!1),
			(this.CachedLocationCurve = this.EffectModel.Location),
			(this.o0e = this.CachedLocationCurve?.bUseCurve),
			this.EffectModel.bEnablePostprocessMaterial &&
				this.EffectModel.PostprocessMaterial &&
				(this.Y0e = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
					e,
					this.EffectModel.PostprocessMaterial,
				)),
			!0
		);
	}
	OnStart() {
		return (
			this.PostProcessComponent && (this.PostProcessComponent.bEnabled = !1), !0
		);
	}
	OnTick(e) {
		this.PostProcessComponent && (this.r0e(!1), this.Z0e());
	}
	r0e(e) {
		this.PostProcessComponent?.IsValid() &&
			((this.o0e || e) &&
				UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransformLocation(
					e,
					this.PostProcessComponent,
					this.CachedLocationCurve,
					this.LifeTime.PassTime,
				),
			(this.X0e = UE.KuroEffectLibrary.UpdateEffectModelPostProcessSpec(
				this.EffectModel,
				this.PostProcessComponent,
				e,
				this.LifeTime.PassTime,
				Global_1.Global.CharacterController,
				Global_1.Global.BaseCharacter,
				this.Handle.GetSureEffectActor(),
				this.X0e,
			)),
			this.Y0e) &&
			(e ||
				UE.KuroRenderingRuntimeBPPluginBPLibrary.IsPostprocessMaterialActive(
					this.PostProcessComponent,
					this.J0e,
				)) &&
			(UE.KuroEffectLibrary.UpdateEffectModelPostProcessMaterial(
				this.EffectModel,
				this.Y0e,
				e,
				this.LifeTime.PassTime,
			),
			(e = this.PostProcessComponent.K2_GetComponentLocation()),
			(this.$Dn.R = e.X),
			(this.$Dn.G = e.Y),
			(this.$Dn.B = e.Z),
			this.Y0e.SetVectorParameterValue(this.XDn, this.$Dn));
	}
	OnEnterPool() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
			this.jEn,
		) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
				this.jEn,
			);
	}
	OnStop(e, t) {
		this.PostProcessComponent?.IsValid() &&
			(this.Y0e &&
				UE.KuroRenderingRuntimeBPPluginBPLibrary.RemovePostprocessMaterial(
					this.PostProcessComponent,
					this.J0e,
				),
			this.PostProcessComponent.SetComponentTickEnabled(!1),
			(this.PostProcessComponent.bEnabled = !1));
	}
	OnEnd() {
		return (
			this.PostProcessComponent?.IsValid() &&
				this.PostProcessComponent.K2_DestroyComponent(
					this.PostProcessComponent,
				),
			!0
		);
	}
	static efe(e) {
		var t;
		return (
			!e ||
			!(e = ModelManager_1.ModelManager.CharacterModel.GetHandle(e))?.Valid ||
			!(
				((t = (e = e.Entity).GetComponent(0)).GetEntityType() ===
					Protocol_1.Aki.Protocol.wks.Proto_Player &&
					!e.GetComponent(3).IsAutonomousProxy) ||
				((t = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
					t.GetSummonerId(),
				)),
				(t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(0)) &&
					t.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player &&
					!e.GetComponent(3).IsAutonomousProxy)
			)
		);
	}
	WEn(e) {
		return (
			!e ||
			!(e = ModelManager_1.ModelManager.CharacterModel.GetHandle(e))?.Valid ||
			(e = e.Entity).GetComponent(0).GetEntityType() !==
				Protocol_1.Aki.Protocol.wks.Proto_Player ||
			!e.GetComponent(3).IsAutonomousProxy
		);
	}
	OnPlay() {
		var e;
		this.PostProcessComponent?.IsValid() &&
			((e = this.Handle?.GetContext()),
			EffectModelPostProcessSpec.efe(e?.EntityId)) &&
			(this.PostProcessComponent.SetComponentTickEnabled(this.t0e),
			this.PostProcessComponent.SetPriority(this.EffectModel.WeatherPriority),
			this.Y0e &&
				(this.J0e =
					UE.KuroRenderingRuntimeBPPluginBPLibrary.AddPostprocessMaterial(
						this.PostProcessComponent,
						this.Y0e,
						this.EffectModel.WeatherPriority,
					)),
			this.r0e(!0),
			this.Z0e(),
			0 === this.GetEffectType()) &&
			this.WEn(e?.EntityId) &&
			(EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
				this.jEn,
			),
			ModelManager_1.ModelManager.RoleModel.InUltraSkill()) &&
			(this.HEn = !0);
	}
	Z0e() {
		let e = 0;
		var t = Global_1.Global.CharacterCameraManager;
		if (this.PostProcessComponent?.IsValid()) {
			e = this.EffectModel.UseVolumeHardnessCurve
				? this.EffectModel.VolumeHardnessCurve.bUseCurve
					? UE.KuroCurveLibrary.GetValue_Float(
							this.EffectModel.VolumeHardnessCurve,
							this.LifeTime.PassTime,
						)
					: this.EffectModel.VolumeHardnessCurve.Constant
				: this.EffectModel.VolumeHardness;
			var o = Math.max(e, 1e-4);
			let i = o;
			if (this.EffectModel.EnableVolume) {
				let e;
				(e = t
					? t.GetCameraLocation()
					: ((r = (0, puerts_1.$ref)(Vector_1.Vector.ZeroVector)),
						(s = (0, puerts_1.$ref)(new UE.Rotator(0, 0, 0))),
						UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLevelEditorCameraLocationAndForward(
							this.Handle.GetSureEffectActor(),
							r,
							s,
						),
						(0, puerts_1.$unref)(r))),
					t ||
						UE.KismetSystemLibrary.DrawDebugSphere(
							this.Handle.GetSureEffectActor(),
							this.PostProcessComponent.K2_GetComponentLocation(),
							this.EffectModel.VolumeRadius,
							30,
							new UE.LinearColor(0, 1, 0, 0.8),
							0,
							0,
						);
				var s = this.PostProcessComponent.K2_GetComponentLocation(),
					r = UE.KismetMathLibrary.Subtract_VectorVector(e, s);
				t = r.Size();
				i =
					UE.KismetMathLibrary.Vector_GetAbsMax(r) >=
						this.EffectModel.VolumeRadius || t >= this.EffectModel.VolumeRadius
						? ((this.PostProcessComponent.bEnabled = !1), 0)
						: ((s = MathCommon_1.MathCommon.Clamp(
								(this.EffectModel.VolumeRadius - t) /
									this.EffectModel.VolumeRadius,
								0,
								1,
							)),
							Math.min(s / o, 1));
			}
			(this.PostProcessComponent.BlendWeight = i),
				(this.PostProcessComponent.bEnabled = 0 < i && !this.HEn);
		}
	}
	UpdateRadialBlur(e, t) {
		var o,
			s = Global_1.Global.CharacterController,
			r = Global_1.Global.BaseCharacter;
		let i = this.EffectModel.ScreenPosition;
		this.EffectModel.UseWorldPosition &&
			(s &&
			r &&
			((r = r.K2_GetActorLocation()),
			(o = (0, puerts_1.$ref)(new UE.Vector2D(0, 0))),
			UE.GameplayStatics.ProjectWorldToScreen(s, r, o, !1))
				? ((s = UE.WidgetLayoutLibrary.GetViewportSize(
						this.Handle.GetSureEffectActor(),
					)),
					(i = UE.KismetMathLibrary.Divide_Vector2DVector2D(
						(0, puerts_1.$unref)(o),
						s,
					)),
					(this.X0e = i))
				: (i = this.X0e)),
			(t.KuroRadialBlurIntensity = e),
			(t.KuroRadialBlurCenter = i),
			(t.KuroRadialBlurMask = this.EffectModel.RadialBlurMask),
			(t.KuroRadialBlurMaskScale = this.EffectModel.RadialBlurMaskScale),
			(t.KuroRadialBlurHardness = UE.KuroCurveLibrary.GetValue_Float(
				this.EffectModel.RadialBlurHardness,
				this.LifeTime.PassTime,
			)),
			(t.KuroRadialBlurRadius = UE.KuroCurveLibrary.GetValue_Float(
				this.EffectModel.RadialBlurRadius,
				this.LifeTime.PassTime,
			));
	}
	NeedAlwaysTick() {
		return !0;
	}
	OnReplay() {
		this.X0e && ((this.X0e.X = 0.5), (this.X0e.Y = 0.5)), (this.HEn = !1);
	}
}
((exports.EffectModelPostProcessSpec = EffectModelPostProcessSpec).E0e =
	void 0),
	(EffectModelPostProcessSpec.z0e = void 0);
