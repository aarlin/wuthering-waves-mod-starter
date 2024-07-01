"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectModelNiagaraSpec = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	TickSystem_1 = require("../../../Core/Tick/TickSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
	SkeletalMeshEffectContext_1 = require("../EffectContext/SkeletalMeshEffectContext"),
	EffectSystem_1 = require("../EffectSystem"),
	EffectSpec_1 = require("./EffectSpec"),
	NEAR_ZERO = 0.001,
	niagaraCharBodyOpacityParameterName = new UE.FName("BodyOpacity");
class EffectModelNiagaraSpec extends EffectSpec_1.EffectSpec {
	constructor() {
		super(...arguments),
			(this.IsTickWhenPaused = !1),
			(this.T0e = void 0),
			(this.t0e = !1),
			(this.IsEffectFinish = !1),
			(this.ExtraState = -1),
			(this.L0e = void 0),
			(this.D0e = !1),
			(this.R0e = !1),
			(this.U0e = !0),
			(this.A0e = !0),
			(this.P0e = -0);
	}
	OnBodyEffectChanged(e) {
		this.T0e?.SetFloatParameter(niagaraCharBodyOpacityParameterName, e);
	}
	SetEffectParameterNiagara(e) {
		if (this.IsPlaying() && this.T0e) {
			if (e.UserParameterFloat)
				for (var [t, a] of e.UserParameterFloat)
					this.T0e.SetFloatParameter(t, a);
			if (e.UserParameterColor)
				for (var [i, s] of e.UserParameterColor)
					this.T0e.SetColorParameter(i, s);
			if (e.UserParameterVector)
				for (var [r, o] of e.UserParameterVector)
					this.T0e.SetVectorParameter(r, o);
			if (e.MaterialParameterFloat)
				for (var [n, c] of e.MaterialParameterFloat)
					this.T0e.SetKuroNiagaraEmitterFloatParam(
						EffectModelNiagaraSpec.NoneEmitterString,
						n.toString(),
						c,
					);
			if (e.MaterialParameterColor)
				for (var [f, l] of e.MaterialParameterColor)
					this.T0e.SetKuroNiagaraEmitterVectorParam(
						EffectModelNiagaraSpec.NoneEmitterString,
						f.toString(),
						new UE.Vector4(l),
					);
		}
	}
	SetExtraState(e) {
		(this.ExtraState = e), (this.D0e = !0);
	}
	OnInit() {
		var e = this.Handle.GetContext();
		if (!(e && 1 & e.PlayFlag)) {
			if (
				(!this.L0e &&
					this.EffectModel.NiagaraRef &&
					(this.L0e = this.EffectModel.NiagaraRef),
				!(e = this.L0e))
			)
				return !1;
			Stats_1.Stat.Enable &&
				!EffectModelNiagaraSpec.B0e &&
				((EffectModelNiagaraSpec.B0e = void 0),
				(EffectModelNiagaraSpec.b0e = void 0),
				(EffectModelNiagaraSpec.q0e = void 0),
				(EffectModelNiagaraSpec.E0e = void 0),
				(EffectModelNiagaraSpec.G0e = void 0));
			var t = this.Handle.GetSureEffectActor(),
				a = (a = this.Handle.Parent)
					? a.GetEffectSpec()?.GetSceneComponent()
					: t.K2_GetRootComponent(),
				i = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
					t,
					UE.NiagaraComponent.StaticClass(),
					a,
					void 0,
					!0,
					this.EffectModel,
				);
			(this.SceneComponent = i),
				(this.T0e = i),
				(this.t0e = this.T0e.IsComponentTickEnabled()),
				UE.KuroEffectLibrary.InitModelNiagaraSpec(
					this.T0e,
					1 === this.GetEffectType(),
					this.EffectModel.ReceiveDecal,
					this.EffectModel.TranslucencySortPriority,
				),
				this.N0e(),
				t.FinishAddComponent(
					this.T0e,
					void 0 !== a,
					MathUtils_1.MathUtils.DefaultTransform,
				),
				(this.A0e = this.EffectModel.DeactivateOnStop),
				this.T0e.SetAsset(e),
				(this.IsTickWhenPaused = e.bEvenTickWhenPaused),
				this.IsTickWhenPaused ||
					(!GlobalData_1.GlobalData.IsUiSceneLoading &&
						!GlobalData_1.GlobalData.IsUiSceneOpen) ||
					(e.bEvenTickWhenPaused = this.IsTickWhenPaused = !0),
				(this.Handle.IsTickWhenPaused = this.IsTickWhenPaused);
		}
		return !0;
	}
	OnTick(e) {
		this.T0e &&
			(this.O0e() ? this.k0e(e) : this.F0e(!1),
			this.UpdateParameter(!1),
			!Info_1.Info.IsGameRunning() ||
				this.Handle?.IsPreview ||
				TickSystem_1.TickSystem.IsPaused ||
				(this.LifeTime.IsAfterStart &&
					0 < this.P0e &&
					((this.P0e -= e), this.P0e <= 0) &&
					(this.HasBounds()
						? this.Handle?.GetSureEffectActor()?.WasRecentlyRenderedOnScreen() ||
							this.Handle?.OnVisibilityChanged(!1)
						: (this.P0e = 1))));
	}
	HasBounds() {
		return (
			!!this.T0e && UE.KuroEffectLibrary.IsNiagaraComponentHasBound(this.T0e)
		);
	}
	O0e() {
		return (
			!this.Handle?.GetIgnoreTimeScale() &&
			Math.abs(this.GetTimeScale() * this.GetGlobalTimeScale() - 1) > 0.001
		);
	}
	k0e(e) {
		var t;
		TickSystem_1.TickSystem.IsPaused ||
		0 == (t = this.GetTimeScale() * this.GetGlobalTimeScale())
			? this.F0e(!0)
			: (this.F0e(!1),
				1 != t && UE.KuroEffectLibrary.SetNiagaraFrameDeltaTime(this.T0e, e));
	}
	UpdateParameter(e) {
		UE.KuroEffectLibrary.UpdateEffectModelNiagaraSpec(
			this.EffectModel,
			this.T0e,
			e || this.D0e,
			this.LifeTime.PassTime,
			this.ExtraState,
		),
			(this.D0e = !1);
	}
	F0e(e) {
		(e = e || !this.Visible || !this.Enable || this.StoppingTimeInternal),
			this.U0e
				? ((this.U0e = !1),
					this.T0e?.IsValid() && (this.T0e.SetPaused(e, !1), (this.R0e = e)))
				: this.R0e !== e &&
					this.T0e?.IsValid() &&
					(this.T0e.SetPaused(e, !1), (this.R0e = e));
	}
	GetSkeletalMeshComp() {
		let e;
		var t = this.Handle?.GetContext();
		return (
			t &&
				(t instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext
					? (e = t.SkeletalMeshComp)
					: t.SourceObject instanceof UE.Actor &&
						(e = t.SourceObject.GetComponentByClass(
							UE.SkeletalMeshComponent.StaticClass(),
						))),
			void 0 ===
				(e =
					void 0 === e &&
					((t = this.Handle.GetSureEffectActor().GetParentComponent()),
					UE.KismetSystemLibrary.IsValid(t)) &&
					((t = t.GetAttachParent()), UE.KismetSystemLibrary.IsValid(t)) &&
					t.GetClass() === UE.SkeletalMeshComponent.StaticClass()
						? t
						: e) &&
			((t = this.Handle.GetSureEffectActor().RootComponent.GetAttachParent()),
			UE.KismetSystemLibrary.IsValid(t)) &&
			t.GetClass() === UE.SkeletalMeshComponent.StaticClass()
				? t
				: e
		);
	}
	N0e() {
		this.T0e &&
			(EffectModelNiagaraSpec.V0e ||
				((EffectModelNiagaraSpec.V0e = !0),
				UE.KuroEffectLibrary.SetOnSystemFinishedDelegate(
					(0, puerts_1.toManualReleaseDelegate)(EffectModelNiagaraSpec.H0e),
				)),
			UE.KuroEffectLibrary.RegisterOnSystemFinished(this.T0e),
			EffectModelNiagaraSpec.j0e ||
				((EffectModelNiagaraSpec.j0e = !0),
				UE.KuroEffectLibrary.SetOnSystemPausedDelegate(
					(0, puerts_1.toManualReleaseDelegate)(EffectModelNiagaraSpec.W0e),
				)),
			UE.KuroEffectLibrary.RegisterOnSystemPaused(this.T0e));
	}
	OnStart() {
		return this.T0e && EffectModelNiagaraSpec.K0e.set(this.T0e, this), !0;
	}
	OnPlay(e) {
		var t;
		(this.IsEffectFinish = !1),
			this.L0e &&
				this.T0e?.IsValid() &&
				(EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.TestEffectAddEffectRec,
					this.Handle.Path,
				),
				this.F0e(!1),
				EffectSystem_1.EffectSystem.OpenVisibilityOptimize &&
					!this.Handle?.GetRoot().IgnoreVisibilityOptimize &&
					(this.P0e = 1),
				this.T0e.GetWorld().GetName() &&
					this.T0e.SetComponentTickEnabled(this.t0e),
				this.T0e.SetVisibility(!0, !1),
				this.T0e.ResetOverrideParametersAndActivate(),
				this.T0e.HasAnyEmittersComplete() &&
					(this.T0e.SetAsset(void 0),
					this.T0e.SetAsset(this.L0e),
					Log_1.Log.CheckDebug()) &&
					Log_1.Log.Debug("RenderEffect", 37, "彻底重启NiagaraComponent"),
				this.T0e.HasSkeletalMeshDataInterface() &&
					UE.KuroRenderingRuntimeBPPluginBPLibrary.SetNiagaraSkeletalMeshComponentWithoutWarning(
						this.T0e,
						EffectModelNiagaraSpec.SkeletalMeshString,
						this.GetSkeletalMeshComp(),
					),
				(t = this.Handle?.GetContext()) &&
					EffectModelNiagaraSpec.IsNeedQualityBias(t.EntityId) &&
					this.T0e.SetEmitterQualityLevelBias(
						EffectEnvironment_1.EffectEnvironment.EffectQualityBiasRemote,
					),
				this.UpdateParameter(!0));
	}
	OnPreStop() {
		this.T0e?.IsValid() && this.A0e && this.T0e.Deactivate();
	}
	OnStop(e, t) {
		this.T0e?.IsValid() &&
			(t && this.T0e.SetVisibility(!1),
			this.T0e.Deactivate(),
			this.T0e.SetComponentTickEnabled(!1));
	}
	SetNiagaraSolo(e) {
		this.T0e &&
			this.T0e.GetForceSolo() !== e &&
			(this.T0e.SetForceSolo(e),
			e ? this.T0e.Activate(!0) : this.T0e.Deactivate());
	}
	DebugTick(e) {
		this.IsPlaying() &&
			(this.LifeTime.Tick(e), this.T0e) &&
			(this.F0e(!1),
			this.T0e.AdvanceSimulation(1, e),
			this.F0e(!0),
			this.UpdateParameter(!1));
	}
	OnEnd() {
		return (
			this.T0e &&
				EffectModelNiagaraSpec.K0e.has(this.T0e) &&
				EffectModelNiagaraSpec.K0e.delete(this.T0e),
			!0
		);
	}
	NeedVisibilityTest() {
		return !0;
	}
	OnEnableChanged(e) {
		this.T0e?.IsValid() && this.IsPlaying() && this.F0e(!e);
	}
	OnVisibilityChanged(e) {
		this.T0e?.IsValid() && (e || this.IsPlaying()) && this.F0e(!e);
	}
	OnChaseFrame(e) {
		super.OnChaseFrame(e),
			this.T0e?.IsValid() &&
				!this.IsEffectFinish &&
				UE.KuroEffectLibrary.SetNiagaraFrameDeltaTime(this.T0e, e);
	}
	OnReplay() {
		(this.U0e = !0), (this.R0e = !1);
	}
	DebugErrorNiagaraPauseCount() {
		return this.T0e && this.T0e.IsPaused() !== this.R0e
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"RenderEffect",
						37,
						"NiagaraPauseError",
						["CachePaused", this.R0e],
						["UePause", this.T0e.IsPaused()],
						["Path", this.Handle.Path],
					),
				1)
			: 0;
	}
	static IsNeedQualityBias(e) {
		var t;
		return (
			!!e &&
			!(
				!(e = ModelManager_1.ModelManager.CharacterModel.GetHandle(e))?.Valid ||
				(((t = (e = e.Entity).GetComponent(0)).GetEntityType() !==
					Protocol_1.Aki.Protocol.HBs.Proto_Player ||
					e.GetComponent(3).IsAutonomousProxy) &&
					((t = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
						t.GetSummonerId(),
					)),
					!(t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(0)) ||
						t.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Player ||
						e.GetComponent(3).IsAutonomousProxy))
			)
		);
	}
	IsUseBoundsCalculateDistance() {
		return !0;
	}
	OnEffectTypeChange() {
		this.T0e?.IsValid() &&
			this.T0e.SetIsUIScenePrimitive(1 === this.GetEffectType());
	}
}
(exports.EffectModelNiagaraSpec = EffectModelNiagaraSpec),
	((_a = EffectModelNiagaraSpec).SkeletalMeshString = "UserSkeletalMesh"),
	(EffectModelNiagaraSpec.NoneEmitterString = "None"),
	(EffectModelNiagaraSpec.G0e = void 0),
	(EffectModelNiagaraSpec.B0e = void 0),
	(EffectModelNiagaraSpec.b0e = void 0),
	(EffectModelNiagaraSpec.q0e = void 0),
	(EffectModelNiagaraSpec.E0e = void 0),
	(EffectModelNiagaraSpec.K0e = new Map()),
	(EffectModelNiagaraSpec.V0e = !1),
	(EffectModelNiagaraSpec.j0e = !1),
	(EffectModelNiagaraSpec.H0e = (e) => {
		EffectModelNiagaraSpec.K0e.has(e) &&
			(e = EffectModelNiagaraSpec.K0e.get(e)) &&
			(e.IsEffectFinish = !0);
	}),
	(EffectModelNiagaraSpec.Q0e = 0),
	(EffectModelNiagaraSpec.W0e = (e, t) => {
		_a.Q0e++,
			EffectModelNiagaraSpec.K0e.has(e) &&
				((e = EffectModelNiagaraSpec.K0e.get(e)) && (e.R0e = t),
				Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug("RenderEffect", 37, "OnSystemPausedDelegate", [
					"Count",
					_a.Q0e,
				]);
	});
