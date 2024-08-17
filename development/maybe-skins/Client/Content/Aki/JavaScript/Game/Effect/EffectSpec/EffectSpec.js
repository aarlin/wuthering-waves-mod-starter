"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectSpec = void 0);
const UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	EEffectFlag_1 = require("../EEffectFlag"),
	EffectLifeTime_1 = require("../EffectLifeTime"),
	SMALLER_ONE = 0.99,
	LARGER_ONE = 1.01,
	MAX_WAIT_TIME_SCALE_ZERO_TIME = 1e4,
	MAX_WAIT_TIME_SCALE_VALUE = 0.01;
class EffectSpec {
	constructor() {
		(this.Handle = void 0),
			(this.afe = void 0),
			(this.LifeTime = new EffectLifeTime_1.EffectLifeTime(this)),
			(this.InitPromise = void 0),
			(this.EffectModel = void 0),
			(this.hfe = !1),
			(this.SceneComponent = void 0),
			(this.lfe = !1),
			(this.Stopping = !1),
			(this.StopFlag = !1),
			(this._fe = !1),
			(this.LastPlayTime = 0),
			(this.bge = 1),
			(this.StoppingTimeInternal = !1),
			(this.LastStopTime = 0),
			(this.ige = 0),
			(this.ufe = 3),
			(this.cfe = !1),
			(this.BodyEffectVisible = !0),
			(this.BodyEffectOpacity = 1),
			(this.mfe = !1),
			(this.ae = -0),
			(this.dfe = -0),
			(this.Cfe = -0),
			(this.gW = void 0),
			(this.gfe = void 0),
			(this.ffe = void 0),
			(this.pfe = void 0),
			(this.Visible = !0),
			(this.Enable = !0),
			(this.sbn = !1),
			(this.abn = !1);
	}
	GetHandle() {
		return this.Handle;
	}
	SetHandle(e) {
		this.Handle = e;
	}
	GetProxyHandle() {
		return this.afe;
	}
	SetProxyHandle(e) {
		this.afe = e;
	}
	GetEffectModel() {
		return this.EffectModel;
	}
	GetPlayInEditor() {
		return this.hfe;
	}
	SetPlayInEditor(e) {
		this.hfe = e;
	}
	GetSceneComponent() {
		return this.SceneComponent;
	}
	SetPlaying(e) {
		this.lfe = e;
	}
	SetStopping(e) {
		this.Stopping !== e &&
			((this.Stopping = e), this.Stopping) &&
			this.LifeTime.WhenEnterStopping();
	}
	SetStopFlag(e) {
		this.StopFlag = e;
	}
	GetStopFlag() {
		return this.StopFlag;
	}
	DebugErrorNiagaraPauseCount() {
		return 0;
	}
	SetEffectParameterNiagara(e) {}
	SetExtraState(e) {}
	GetTimeScale() {
		return this.StoppingTimeInternal ? 0 : this.bge;
	}
	GetGlobalTimeScale() {
		return 1 === this.ufe
			? 1
			: EffectEnvironment_1.EffectEnvironment.GlobalTimeScale;
	}
	SetTimeScale(e, t = !1) {
		var i;
		(this.bge === e && !t) ||
			(this.GetIgnoreTimeScale() ||
				((t = e * this.GetGlobalTimeScale()),
				this.Handle?.IsRoot() &&
					(i = this.Handle?.GetSureEffectActor()) &&
					((i.CustomTimeDilation = t),
					i.IsA(UE.TsEffectActor_C.StaticClass())) &&
					i.SetTimeScale(t),
				this.Handle?.StoppingTime) ||
				(this.LifeTime.SetTimeScale(t),
				e < 0.01 && this.bge >= 0.01 && this.Handle?.IsRoot
					? this.LifeTime.RegisterWaitMiniTimeScale(1e4)
					: e >= 0.01 &&
						this.bge < 0.01 &&
						this.Handle?.IsRoot &&
						this.LifeTime.UnregisterWaitMiniTimeScale()),
			(this.bge = e));
	}
	OnGlobalTimeScaleChange() {
		this.Handle?.StoppingTime ||
			(this.LifeTime.SetTimeScale(this.bge * this.GetGlobalTimeScale()),
			this.SetTimeScale(this.bge, !0));
	}
	OnGlobalStoppingTimeChange(e) {
		this.SetStoppingTime(!1),
			e
				? (this.LifeTime.UnregisterWaitMiniTimeScale(),
					this.LifeTime.SetTimeScale(0))
				: this.SetTimeScale(this.bge, !0);
	}
	SetStoppingTime(e) {
		this.StoppingTimeInternal = e;
	}
	RDn() {
		var e;
		this.SetStoppingTime(!0),
			this.GetIgnoreTimeScale() ||
				(this.Handle?.IsRoot() &&
					(e = this.Handle?.GetSureEffectActor()) &&
					((e.CustomTimeDilation = 0),
					e.IsA(UE.TsEffectActor_C.StaticClass())) &&
					e.SetTimeScale(0));
	}
	SetLifeCycle(e) {
		e < 0 || this.LifeTime.SetLifeCycle(e);
	}
	GetLastPlayTime() {
		return this.LastPlayTime;
	}
	GetLastStopTime() {
		return this.LastStopTime;
	}
	IsPlaying() {
		return this.lfe || this.Stopping;
	}
	IsStopping() {
		return this.Stopping;
	}
	IsReallyPlaying() {
		return this.lfe;
	}
	IsClear() {
		return !!(64 & this.ige);
	}
	IsValid() {
		return !!(2 & this.ige) && !this.IsClear();
	}
	GetTotalPassTime() {
		return this.LifeTime.TotalPassTime;
	}
	get PassTime() {
		return this.LifeTime.PassTime;
	}
	GetEffectType() {
		return this.ufe;
	}
	SetEffectType(e) {
		this.ufe !== e && ((this.ufe = e), this.OnEffectTypeChange());
	}
	OnEffectTypeChange() {}
	GetLifeTime() {
		return this.LifeTime;
	}
	get IsLoop() {
		return this.LifeTime.IsLoop;
	}
	GetIgnoreTimeScale() {
		return this.cfe;
	}
	vfe() {
		let e;
		(this.BodyEffectOpacity = 1), (this.BodyEffectVisible = !0);
		var t = this.Handle?.GetEffectActor()?.GetAttachParentActor(),
			i = this.Handle.GetContext(),
			s = i;
		(0 < this.EffectModel.LoopTime || this.EffectModel.NeedDisableWithActor) &&
			(s &&
				((s = s.SkeletalMeshComp?.GetOwner()),
				(e = s?.GetComponentByClass(
					UE.CharRenderingComponent_C.StaticClass(),
				))),
			(e =
				e ||
				t?.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass()))),
			e ||
				!this.EffectModel.NeedDisableWithActor ||
				((s = i?.SourceObject),
				(e =
					s && s !== t
						? s.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())
						: e)) ||
				((s = i?.SourceObject?.GetOwner()) &&
					s !== t &&
					(e = s.GetComponentByClass(
						UE.CharRenderingComponent_C.StaticClass(),
					))),
			e && e.RegisterBodyEffect(this.Handle);
	}
	UpdateBodyEffect(e, t) {
		(this.BodyEffectOpacity = e),
			this.Handle.IsRoot() &&
				this.BodyEffectVisible !== t &&
				((this.BodyEffectVisible = t),
				this.Handle.GetSureEffectActor().SetActorHiddenInGame(!t)),
			t && this.OnBodyEffectChanged(this.BodyEffectOpacity);
	}
	GetHideOnBurstSkill() {
		return this.mfe;
	}
	async Init(e) {
		if (
			((this.ige |= 1),
			(this.EffectModel = e),
			Stats_1.Stat.Enable &&
				((this.gW = void 0),
				(this.gfe = void 0),
				(this.ffe = void 0),
				(this.pfe = void 0)),
			!this.Handle.IsRoot())
		) {
			if (e.IsA(UE.EffectModelGroup_C.StaticClass()))
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							3,
							"子特效不能是DA_Fx_Group",
							["父特效Path", this.Handle.GetRoot().Path],
							["Path", this.Handle.Path],
						),
					0
				);
			this.SetEffectType(this.Handle.Parent.GetEffectSpec().GetEffectType()),
				this.SetTimeScale(this.Handle.Parent.GetTimeScale());
		}
		return (
			(this.cfe = e.IgnoreTimeDilation),
			(this.mfe = e.HideOnBurstSkill),
			(this.ae = e.StartTime),
			(this.dfe = e.LoopTime),
			(this.Cfe = e.EndTime),
			(this._fe = this.OnTick !== EffectSpec.prototype.OnTick),
			this.OnInit()
				? this.InitPromise
					? await this.InitPromise.Promise
					: 5
				: 0
		);
	}
	Start() {
		return (this.ige |= 2), !!this.OnStart();
	}
	Tick(e) {
		if (this.IsPlaying()) {
			if (
				this.Handle?.GetRoot()?.StoppingTime &&
				this.Handle?.GetGlobalStoppingTime()
			) {
				if (this.StoppingTimeInternal) return;
				this.LifeTime.IsAfterStart &&
					this.LifeTime.TotalPassTime >=
						this.Handle.GetGlobalStoppingPlayTime() &&
					this.RDn();
			}
			let s = e;
			var t, i;
			!this.GetIgnoreTimeScale() &&
				((t = this.GetGlobalTimeScale()),
				(i = this.GetTimeScale()),
				t < 0.99 || t > 1.01 || i < 0.99 || i > 1.01) &&
				(s = e * t * i),
				this._fe && this.OnTick(s),
				!this.sbn &&
					this.LifeTime.IsAfterStart &&
					((this.sbn = !0),
					this.VisibilityChanged(!this.Handle || this.Handle.HandleVisible)),
				!this.abn &&
					this.HasBounds() &&
					((this.abn = !0),
					this.VisibilityChanged(!this.Handle || this.Handle.HandleVisible)),
				this.LifeTime.Tick(s);
		}
	}
	IsVisible() {
		return this.Visible;
	}
	IsEnable() {
		return this.Enable;
	}
	VisibilityChanged(e) {
		Info_1.Info.IsGameRunning() &&
			!this.Handle?.IgnoreVisibilityOptimize &&
			this.LifeTime.IsAfterStart &&
			(e || this.HasBounds()) &&
			this.Visible !== e &&
			((this.Visible = e), this.OnVisibilityChanged(e));
	}
	HasBounds() {
		return !0;
	}
	EnableChanged(e) {
		(this.Enable = e), this.OnEnableChanged(e);
	}
	End() {
		return (
			!(2 & this.ige) ||
			(32 & this.ige
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							3,
							"重复执行End",
							["EffectSpec", this.constructor.name],
							["Path", this.Handle.Path],
						),
					!1)
				: ((this.ige |= 32), this.OnEnd()))
		);
	}
	Clear() {
		var e;
		return 64 & this.ige
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"重复执行Clear",
						["EffectSpec", this.constructor.name],
						["Path", this.Handle.Path],
					),
				!1)
			: ((e = this.OnClear()),
				(this.ige |= 64),
				this.SceneComponent?.IsValid() &&
					this.SceneComponent.K2_DestroyComponent(
						this.Handle.GetSureEffectActor(),
					),
				(this.SceneComponent = void 0),
				(this.lfe = !1),
				(this.EffectModel = void 0),
				this.LifeTime.Clear(),
				(this.Handle = void 0),
				(this.hfe = !1),
				(this._fe = !1),
				(this.Stopping = !1),
				e);
	}
	Destroy() {
		this.ige |= 128;
	}
	OnInit() {
		return !0;
	}
	OnStart() {
		return !0;
	}
	OnEnd() {
		return !0;
	}
	OnClear() {
		return !0;
	}
	OnTick(e) {}
	OnReplay() {}
	OnPlay(e) {}
	OnCanStop() {
		return !0;
	}
	OnPreStop() {}
	OnStop(e, t) {}
	NeedVisibilityTest() {
		return !1;
	}
	OnVisibilityChanged(e) {}
	OnBodyEffectChanged(e) {}
	OnEnableChanged(e) {}
	Replay() {
		(this.ige &= EEffectFlag_1.RESET_PLAY_FLAG),
			(this.ige &= EEffectFlag_1.RESET_STOP_FLAG),
			(this.ige &= EEffectFlag_1.RESET_PRESTOP_FLAG),
			(this.bge = 1),
			this.LifeTime.OnReplay(),
			(this.Visible = !0),
			(this.Enable = !0),
			(this.StoppingTimeInternal = !1),
			(this.sbn = !1),
			(this.abn = !1),
			this.OnReplay();
	}
	Play(e) {
		(this.lfe = !0),
			this.IsValid() &&
				(this.LifeTime.SetTime(this.ae, this.dfe, this.Cfe),
				this.Handle?.StoppingTime ||
					this.LifeTime.SetTimeScale(this.bge * this.GetGlobalTimeScale()),
				(this.LastPlayTime =
					EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.BeforePlayEffect,
					this.Handle.Id,
					e,
				),
				this.OnPlay(e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.AfterPlayEffect,
					this.Handle.Id,
					e,
				),
				this.Handle.IsRoot()) &&
				this.vfe();
	}
	CanStop() {
		return this.OnCanStop();
	}
	PreStop() {
		8 & this.ige || ((this.ige |= 8), this.OnPreStop());
	}
	Stop(e, t) {
		16 & this.ige ||
			((this.ige |= 16),
			(this.lfe = !1),
			this.Stopping && (this.Stopping = !1),
			(this.LastStopTime =
				EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.FinishEffect,
				this.Handle.Id,
				e,
				t,
			),
			this.IsValid() && this.OnStop(e, t));
	}
	OnEnterPool() {}
	SeekTo(e, t = !0, i = !1, s = 0) {
		(e !== this.LifeTime.GetPassTime && this.LifeTime.SeekTo(e, i, !1, t)) ||
			(this._fe &&
				((i = 0 !== s ? s : e - this.LifeTime.GetPassTime),
				this.OnTick(0 < i ? i : 0)));
	}
	SeekDelta(e, t = !0, i = !1, s = 0) {
		(e = this.LifeTime.PassTime + e),
			this.SeekTo(e, t, i),
			this._fe && 0 !== s && this.OnTick(s);
	}
	ChaseFrame(e, t = !0, i = !1) {
		var s = this.LifeTime.PassTime + e;
		this.LifeTime.SeekTo(s, i, !1, t) || this.OnTick(0), this.OnChaseFrame(e);
	}
	OnChaseFrame(e) {}
	SetThreeStageTime(e, t, i, s) {
		this.LifeTime.SetTime(e, t, i), s && this.LifeTime.Clear();
	}
	NeedAlwaysTick() {
		return !1;
	}
	TickNeedAlwaysTick(e) {
		this.NeedAlwaysTick() && this.Tick(e);
	}
	SeekTimeWithoutAlwaysTick(e, t = !1) {
		this.NeedAlwaysTick() || this.ChaseFrame(e, t);
	}
	IsUseBoundsCalculateDistance() {
		return !1;
	}
}
exports.EffectSpec = EffectSpec;
