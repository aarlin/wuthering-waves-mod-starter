"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, i, s) {
		var o,
			n = arguments.length,
			r =
				n < 3
					? t
					: null === s
						? (s = Object.getOwnPropertyDescriptor(t, i))
						: s;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			r = Reflect.decorate(e, t, i, s);
		else
			for (var a = e.length - 1; 0 <= a; a--)
				(o = e[a]) && (r = (n < 3 ? o(r) : 3 < n ? o(t, i, r) : o(t, i)) || r);
		return 3 < n && r && Object.defineProperty(t, i, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectHandle = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../Core/Common/Info"),
	Log_1 = require("../../Core/Common/Log"),
	Stats_1 = require("../../Core/Common/Stats"),
	EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
	EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
	GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
	PerformanceDecorators_1 = require("../../Core/Performance/PerformanceDecorators"),
	TickSystem_1 = require("../../Core/Tick/TickSystem"),
	TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	TimeUtil_1 = require("../Common/TimeUtil"),
	GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator"),
	EEffectFlag_1 = require("./EEffectFlag"),
	EffectActorHandle_1 = require("./EffectActorHandle"),
	EffectModelNiagaraSpec_1 = require("./EffectSpec/EffectModelNiagaraSpec"),
	EffectSystem_1 = require("./EffectSystem"),
	MAX_LOOP_EFFECT_WITHOUT_OWNER_TIME_OF_EXISTENCE = 600;
class EffectHandleInitCache {
	constructor() {
		(this.WorldContext = void 0),
			(this.Path = ""),
			(this.Reason = ""),
			(this.AutoPlay = !1),
			(this.BeforeInitCallback = void 0),
			(this.Callback = void 0),
			(this.BeforePlayCallback = void 0),
			(this.EffectActorHandle = new EffectActorHandle_1.EffectActorHandle()),
			(this.StartTime = -1),
			(this.TimeDiff = 0);
	}
	get Location() {
		return this.EffectActorHandle.GetActorLocation();
	}
}
class EffectHandle {
	constructor() {
		(this.Id = 0),
			(this.BornFrameCount = void 0),
			(this.HoldObjectId = 0),
			(this.Path = ""),
			(this.nx = void 0),
			(this.IsTickWhenPaused = !1),
			(this.NiagaraParameter = void 0),
			(this.ExtraState = -1),
			(this.rbn = !1),
			(this.DDn = !1),
			(this.Parent = void 0),
			(this.zCe = !1),
			(this.CreateReason = ""),
			(this.StopReason = ""),
			(this.PlayReason = ""),
			(this.ZCe = !1),
			(this.IsExternalActor = !1),
			(this.IsPendingStop = !1),
			(this.IsPendingPlay = !1),
			(this.CreateSource = 0),
			(this.SourceEntityId = void 0),
			(this.IsPreview = !1),
			(this.InContainer = !1),
			(this.ege = void 0),
			(this.EffectEnableRange =
				GameBudgetAllocatorConfigCreator_1.EFFECT_ENABLE_RANGE),
			(this.tge = void 0),
			(this.ige = 0),
			(this.gW = void 0),
			(this.oge = void 0),
			(this.cW = void 0),
			(this.rge = void 0),
			(this.nge = void 0),
			(this.sge = void 0),
			(this.mW = void 0),
			(this.uW = void 0),
			(this.age = void 0),
			(this.InitCache = void 0),
			(this.LifeTime = 0),
			(this.CreateTime = 0),
			(this.yW = void 0),
			(this.hge = void 0),
			(this.lge = void 0),
			(this.ScheduledAfterTick = void 0),
			(this._ge = -1),
			(this.uge = 0),
			(this.cge = !1),
			(this.mge = !1),
			(this.TickSystemTick = (e) => {
				this.Tick(e * TimeUtil_1.TimeUtil.Millisecond);
			}),
			(this.dge = !1),
			(this.Cge = 0),
			(this.obn = !0),
			(this.nbn = () => {
				this.IsEffectValid && this.OnVisibilityChanged(this.obn);
			}),
			(this.gge = !1),
			(this.fge = (e, t) => {
				this.IsEffectValid() &&
					2 !== t &&
					4 !== t &&
					(this.InContainer &&
						1 === this.CreateSource &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							3,
							"回收到Lru的特效的actor被意外删除了",
							["Path", this.Path],
						),
					EffectSystem_1.EffectSystem.StopEffect(
						this,
						"[EffectHandle.OnActorDestroy] actor被意外销毁了",
						!0,
						!0,
					));
			}),
			(this.OnCustomCheckOwner = void 0),
			(this.pge = void 0);
	}
	SetBornFrameCount() {
		this.BornFrameCount = UE.KismetSystemLibrary.GetFrameCount();
	}
	GetContext() {
		return this.GetRoot().nx;
	}
	SetContext(e) {
		this.nx = e;
	}
	GetOwnerEntityId() {
		var e = this.GetContext();
		return e ? e.EntityId : void 0;
	}
	SetEffectParameterNiagara(e) {
		e && 4 & this.ige
			? this.tge?.SetEffectParameterNiagara(e)
			: (this.NiagaraParameter = e);
	}
	SetEffectExtraState(e) {
		4 & this.ige
			? ((this.ExtraState = e), this.tge?.SetExtraState(e))
			: (this.ExtraState = e);
	}
	get IgnoreVisibilityOptimize() {
		return (this.IsRoot() ? this : this.GetRoot()).rbn;
	}
	set IgnoreVisibilityOptimize(e) {
		this.rbn !== e &&
			(e
				? (this.OnVisibilityChanged(!0, !1), (this.rbn = e))
				: ((this.rbn = e), TimerSystem_1.TimerSystem.Next(this.nbn)));
	}
	get StoppingTime() {
		return this.DDn;
	}
	set StoppingTime(e) {
		this.nx?.SourceObject instanceof UE.BP_EffectActor_C &&
			this.IsRoot() &&
			this.DDn !== e &&
			((this.DDn = e), EffectSystem_1.EffectSystem.GlobalStoppingTime) &&
			this.GetEffectSpec()?.OnGlobalStoppingTimeChange(e);
	}
	OnGlobalStoppingTimeChange(e) {
		this.StoppingTime && this.GetEffectSpec()?.OnGlobalStoppingTimeChange(e);
	}
	GetRoot() {
		if (!this.Parent) return this;
		let e = this.Parent;
		for (; e.Parent; ) e = e.Parent;
		return e;
	}
	SetNotRecord(e) {
		this.zCe = e;
	}
	GetNotRecord() {
		return this.zCe;
	}
	IsRoot() {
		return !this.Parent;
	}
	IsEffectValid() {
		return !(128 & this.ige || this.InContainer || this.IsPendingStop);
	}
	IsDestroy() {
		return !!(128 & this.ige);
	}
	IsDone() {
		return !(128 & this.ige || !(2 & this.ige));
	}
	IsStop() {
		return this.tge?.GetStopFlag() ?? !1;
	}
	IsPlaying() {
		return this.tge?.IsPlaying() ?? !1;
	}
	get IsPendingInit() {
		return !(1 & this.ige || void 0 === this.InitCache || this.ZCe);
	}
	SetIsInitializing(e) {
		this.ZCe = e;
	}
	IsStopping() {
		return this.tge?.IsStopping() ?? !1;
	}
	GetEffectData() {
		return this.tge?.GetEffectModel();
	}
	GetEffectType() {
		return this.tge.GetEffectType();
	}
	get CreateFromPlayerEffectPool() {
		return 2 <= this.CreateSource && this.CreateSource <= 5;
	}
	GetEffectActor() {
		return this.IsPendingInit ? this.InitCache.EffectActorHandle : this.ege;
	}
	GetSureEffectActor() {
		return this.ege;
	}
	GetNiagaraComponent() {
		return this.IsPendingInit
			? this.InitCache.EffectActorHandle.NiagaraComponent
			: this.ege?.GetComponentByClass(UE.NiagaraComponent.StaticClass());
	}
	GetNiagaraComponents() {
		if (this.IsPendingInit)
			return this.InitCache.EffectActorHandle.NiagaraComponents;
		var e = this.ege?.K2_GetComponentsByClass(
				UE.NiagaraComponent.StaticClass(),
			),
			t = new Array();
		if (e) for (let i = 0; i < e.Num(); i++) t.push(e.Get(i));
		return t;
	}
	GetNiagaraParticleCount() {
		var e = this.GetNiagaraComponents();
		let t = 0,
			i = 0;
		if (e instanceof Array)
			for (const n of e) {
				var s = (0, puerts_1.$ref)(void 0),
					o = (0, puerts_1.$ref)(void 0);
				UE.KuroRenderingRuntimeBPPluginBPLibrary.GetNiagaraParticleCount(
					n,
					s,
					o,
				),
					(t += (0, puerts_1.$unref)(o)),
					(i += (0, puerts_1.$unref)(s));
			}
		return [t, i];
	}
	SetEffectActor(e) {
		this.IsRoot()
			? e
				? (this.ege = e)?.IsValid() &&
					e.IsA(UE.TsEffectActor_C.StaticClass()) &&
					e.SetEffectHandle(this)
				: (this.ege?.IsValid() &&
						this.ege.IsA(UE.TsEffectActor_C.StaticClass()) &&
						this.ege.SetEffectHandle(void 0),
					(this.ege = void 0))
			: (this.ege = e);
	}
	GetEffectSpec() {
		return this.tge;
	}
	SetEffectSpec(e) {
		e
			? (this.tge = e)?.SetHandle(this)
			: (this.tge?.SetHandle(void 0), (this.tge = void 0));
	}
	GetTimeScale() {
		return this.GetEffectSpec().GetTimeScale();
	}
	GetGlobalTimeScale() {
		return this.GetEffectSpec().GetGlobalTimeScale();
	}
	SetTimeScale(e, t = !1) {
		this.GetEffectSpec()?.SetTimeScale(e, t),
			this.IsPendingInit && !this.GetIgnoreTimeScale() && this.vge(e);
	}
	GetIgnoreTimeScale() {
		return this.tge.GetIgnoreTimeScale();
	}
	ClearFinishCallback() {
		this.age = void 0;
	}
	AddFinishCallback(e) {
		e &&
			(this.age || (this.age = new Set()),
			this.age.has(e) ||
				(EffectEnvironment_1.EffectEnvironment.UseLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"RenderEffect",
						37,
						"特效框架:AddFinishCallback",
						["句柄Id", this.Id],
						["Path", this.Path],
					),
				this.age.add(e)));
	}
	RemoveFinishCallback(e) {
		return !!e && !!this.age && this.age.delete(e);
	}
	Replay() {
		(this.ige &= EEffectFlag_1.RESET_PLAY_FLAG),
			(this.ige &= EEffectFlag_1.RESET_STOP_FLAG),
			(this.ige &= EEffectFlag_1.RESET_PRESTOP_FLAG),
			(this.Cge = 0),
			this.tge.Replay(),
			(this.OnCustomCheckOwner = void 0),
			(this.DDn = !1),
			(this.obn = !0);
	}
	Play(e) {
		16 & this.ige ||
			4 & this.ige ||
			((this.Cge = 0),
			(this.ige |= 4),
			this.IsRoot() &&
				Info_1.Info.IsGameRunning() &&
				GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen &&
				!this.Sge &&
				this.RegisterTick(),
			this.tge.Play(e),
			this.ApplyEffectParameters(),
			0 < this.ExtraState && this.SetEffectExtraState(this.ExtraState));
	}
	PreStop() {
		8 & this.ige || ((this.ige |= 8), this.tge.PreStop());
	}
	Stop(e, t) {
		if ((!this.IsRoot() && t && this.ExecuteStopCallback(), !(16 & this.ige))) {
			if (
				((this.ige |= 16),
				(this.OnCustomCheckOwner = void 0),
				this.PreStop(),
				this.IsRoot() && t)
			) {
				if (
					!this.IsExternalActor &&
					this.ege?.IsValid() &&
					!this.IsPreview &&
					(EffectEnvironment_1.EffectEnvironment.UseLog &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"RenderEffect",
							37,
							"特效框架:EffectHandle Detach",
							["句柄Id", this.Id],
							["Path", this.Path],
						),
					this.ege.K2_DetachFromActor(),
					this.ege.SetActorHiddenInGame(!0),
					this.pge)
				) {
					for (const e of this.pge)
						e.IsValid() && e.K2_DetachFromActor(1, 1, 1);
					this.pge = void 0;
				}
				Info_1.Info.IsGameRunning() &&
					GameBudgetInterfaceController_1.GameBudgetInterfaceController
						.IsOpen &&
					this.Sge &&
					this.UnregisterTick(),
					(this.ExtraState = -1);
			}
			this.IsPlaying() && this.tge.Stop(e, t);
		}
	}
	OnEnterPool() {
		this.tge?.OnEnterPool();
	}
	ExecuteStopCallback() {
		if (this.age) {
			EffectEnvironment_1.EffectEnvironment.UseLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderEffect",
					3,
					"特效框架:执行特效完成回调",
					["句柄Id", this.Id],
					["IsRoot", this.IsRoot()],
					["Path", this.Path],
					["Count", this.age.size],
				);
			for (const e of this.age) e(this.Id);
			this.ClearFinishCallback();
		}
	}
	PendingInit(e, t, i, s, o = !0, n, r, a) {
		(this.InitCache = new EffectHandleInitCache()),
			(this.InitCache.WorldContext = e),
			(this.InitCache.Path = t),
			(this.InitCache.Reason = i),
			(this.InitCache.AutoPlay = o),
			(this.InitCache.BeforeInitCallback = n),
			(this.InitCache.Callback = r),
			(this.InitCache.BeforePlayCallback = a),
			this.InitCache.EffectActorHandle.Init(s, t),
			o && this.yge();
	}
	yge() {
		this.IsRoot() &&
			((this.InitCache.StartTime =
				EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds),
			Info_1.Info.IsGameRunning() &&
				GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen &&
				!this.Sge &&
				this.RegisterTick(),
			this.GetEffectSpec()?.SetLifeCycle(this.LifeTime),
			this.GetEffectSpec()?.SetPlaying(!0));
	}
	vge(e) {
		var t =
			EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds -
			this.InitCache.StartTime;
		(this.InitCache.TimeDiff += t * e * this.GetGlobalTimeScale()),
			(this.InitCache.StartTime =
				EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds);
	}
	InitEffectActorAfterPendingInit() {
		this.ege && this.InitCache && this.InitCache.EffectActorHandle
			? (this.InitCache.EffectActorHandle.InitEffectActor(this.ege, this),
				this.Sge &&
					void 0 !== this.yW &&
					GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateRegisterActor(
						this.lge,
						this.yW,
						this.ege,
					))
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"RenderEffect",
					37,
					"[EffectHandle]InitEffectActor Failed",
				);
	}
	PlayEffectAfterPendingInit() {
		var e;
		this.InitCache.StartTime < 0 ||
			(this.InitCache.AutoPlay || this.PlayEffect("PlayEffectAfterPendingInit"),
			0 <
				(e =
					this.InitCache.TimeDiff +
					(EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds -
						this.InitCache.StartTime) *
						this.GetTimeScale() *
						this.GetGlobalTimeScale()) &&
				!this.tge.IsLoop &&
				this.ChaseFrame(e, !0));
	}
	ClearInitCache() {
		this.InitCache = void 0;
	}
	get IsLoop() {
		return this.IsDone() && this.tge ? this.tge.IsLoop : this.LifeTime < 0;
	}
	async Init(e) {
		return e
			? (Stats_1.Stat.Enable &&
					((this.cW = void 0),
					(this.gW = void 0),
					(this.oge = void 0),
					(this.nge = void 0),
					(this.rge = void 0),
					(this.mW = void 0),
					(this.sge = void 0),
					(this.uW = void 0),
					EffectHandle.Ige ||
						((EffectHandle.Ige = void 0),
						(EffectHandle.Tge = void 0),
						(EffectHandle.Mge = void 0),
						(EffectHandle.Ege = void 0))),
				(this.ige = 1),
				(e = this.tge.Init(e)),
				this.SetIsInitializing(!1),
				e)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"EffectHandle执行Init失败，因为effectData无效。",
						["Path", this.Path],
					),
				0);
	}
	Start() {
		return (
			(this.ige |= 2),
			!!this.tge.Start() &&
				(EffectEnvironment_1.EffectEnvironment.UseLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"RenderEffect",
						3,
						"特效框架:特效加载成功",
						["句柄Id", this.Id],
						["Path", this.Path],
						["Location", this.GetEffectActor().K2_GetActorLocation()],
					),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.LoadEffect,
					this.Id,
				),
				!0)
		);
	}
	End() {
		return (
			this.OnEnterPool(),
			!(2 & this.ige) ||
				(32 & this.ige
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error("RenderEffect", 3, "重复执行End", [
								"Path",
								this.Path,
							]),
						!1)
					: ((this.ige |= 32), this.tge.End()))
		);
	}
	Clear() {
		return 64 & this.ige
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"重复执行Clear",
						["EffectHandle", this.constructor.name],
						["Path", this.Path],
					),
				!1)
			: (this.IsRoot() && this.ege?.IsValid() && this.ege.OnEndPlay.Clear(),
				(this.InitCache = void 0),
				(this.gW = void 0),
				(this.oge = void 0),
				(this.rge = void 0),
				(this.sge = void 0),
				(this.mW = void 0),
				(this.IsTickWhenPaused = !1),
				(this.age = void 0),
				!!this.tge.Clear() && ((this.ige |= 64), !0));
	}
	Destroy() {
		(this.ige |= 128), this.tge?.Destroy();
	}
	get Sge() {
		return void 0 !== this.yW || void 0 !== this.hge;
	}
	RegisterTick() {
		if (!Info_1.Info.IsInCg())
			if (this.IsTickWhenPaused || 1 === this.tge.GetEffectType())
				this.hge = TickSystem_1.TickSystem.Add(
					this.TickSystemTick,
					"EffectHandle_" + this.Path + "_" + this.Id,
					0,
					!0,
				);
			else {
				let e;
				this.yW &&
					(Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"RenderEffect",
							25,
							"EffectHandle RegisterTick: 重复注册Tick",
							["EffectHandle", this.constructor.name],
							["Path", this.Path],
						),
					this.UnregisterTick()),
					(e =
						(e = this.tge.NeedAlwaysTick()
							? GameBudgetAllocatorConfigCreator_1
									.GameBudgetAllocatorConfigCreator.TsAlwaysTickConfig
							: this.EffectEnableRange ===
									GameBudgetAllocatorConfigCreator_1.EFFECT_ENABLE_RANGE
								? 3 === this.tge.GetEffectType()
									? GameBudgetAllocatorConfigCreator_1
											.GameBudgetAllocatorConfigCreator.TsEffectGroupConfig
									: 0 === this.tge.GetEffectType()
										? GameBudgetAllocatorConfigCreator_1
												.GameBudgetAllocatorConfigCreator
												.TsFightEffectGroupConfig
										: GameBudgetAllocatorConfigCreator_1
												.GameBudgetAllocatorConfigCreator.TsAlwaysTickConfig
								: GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.GetEffectDynamicGroup(
										this.EffectEnableRange,
									)) ||
						GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
							.TsEffectGroupConfig),
					(this.lge = e.GroupName),
					(this.yW =
						GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(
							e.GroupName,
							e.SignificanceGroup,
							this,
							this.ege,
						)),
					this.GetEffectSpec()?.IsUseBoundsCalculateDistance() &&
						this.EffectEnableRange >
							GameBudgetAllocatorConfigCreator_1.EFFECT_USE_BOUNDS_RANGE &&
						GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetUseBoundsCalculateDistance(
							e.GroupName,
							this.yW,
							!0,
						);
			}
	}
	UnregisterTick() {
		this.hge
			? (TickSystem_1.TickSystem.Remove(this.hge.Id), (this.hge = void 0))
			: this.yW &&
				(GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(
					this,
				),
				(this.yW = void 0));
	}
	ScheduledTick(e, t, i) {
		this.Tick(e);
	}
	OnEnabledChange(e, t) {
		this.IsRoot() &&
			e &&
			this.IsPendingInit &&
			EffectSystem_1.EffectSystem.InitHandleWhenEnable(this),
			EffectEnvironment_1.EffectEnvironment.UseLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderEffect",
					37,
					"特效框架:OnEnabledChange",
					["句柄Id", this.Id],
					["IsRoot", this.IsRoot()],
					["Path", this.Path],
					["Enable", e],
				),
			this.tge?.EnableChanged(e);
	}
	SeekDelta(e, t, i = !1) {
		this.tge?.IsValid()
			? this.tge.SeekDelta(e, i, t)
			: Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderEffect", 37, "[EffectHandle]SeekDelta Failed", [
					"handleId",
					this.Id,
				]);
	}
	SeekTo(e, t, i = !1) {
		this.tge?.IsValid()
			? this.tge.SeekTo(e, i, t)
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("RenderEffect", 37, "[EffectHandle]SeekTo Failed", [
					"handleId",
					this.Id,
				]);
	}
	ChaseFrame(e, t, i = !1) {
		this.tge?.IsValid()
			? this.tge.ChaseFrame(e, i, t)
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("RenderEffect", 37, "[EffectHandle]ChaseFrame Failed", [
					"handleId",
					this.Id,
				]);
	}
	SeekToTimeWithProcess(e, t, i = !1) {
		(this._ge = e), (this.uge = t), (this.cge = i), (this.mge = !0);
	}
	LocationProxyFunction() {
		if (this.IsPendingInit) {
			var e = this.InitCache?.Location;
			if (e) return e;
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"RenderEffect",
					37,
					"LocationProxy is undefined",
					["handleId", this.Id],
					["path", this.InitCache?.Path],
				);
		}
		return Vector_1.Vector.ZeroVector;
	}
	ApplyEffectParameters() {
		this.NiagaraParameter &&
			(this.tge.SetEffectParameterNiagara(this.NiagaraParameter),
			(this.NiagaraParameter = void 0));
	}
	Tick(e) {
		if (!(16 & this.ige) && this.IsDone())
			if (this.InDebugMode()) this.DebugTick(e);
			else if (this.ege?.IsValid()) {
				let t = e;
				if (this.tge?.IsValid()) {
					if (
						this.IsRoot() &&
						!this.IgnoreVisibilityOptimize &&
						this.tge.NeedVisibilityTest() &&
						EffectSystem_1.EffectSystem.OpenVisibilityOptimize
					) {
						if ((t = this.Lge(e)) < 0)
							return void this.tge.TickNeedAlwaysTick(e);
						t > e && this.tge.SeekTimeWithoutAlwaysTick(t, !0);
					}
					if (this.dge) return void this.Dge(e);
					this.tge.Tick(e);
				}
				t !== e && (t += e);
			}
	}
	RegisterActorDestroy() {
		this.IsRoot() && this.ege.OnEndPlay.Add(this.fge);
	}
	FreezeEffect(e) {
		this.dge = e;
	}
	Dge(e) {
		let t = e;
		var i, s;
		this.mge
			? (i = this.GetEffectSpec()) &&
				((s = this._ge - i.PassTime),
				0 < this.uge && (t = this.uge),
				Math.abs(s) < t
					? (i.SeekTo(this._ge, !0, !1, e), (this.mge = !1))
					: ((t *= Math.sign(s)), i.SeekDelta(t, !0, !1, e)))
			: this.cge && this.GetEffectSpec()?.SeekTo(this._ge, !0, !1, e);
	}
	PlayEffect(e) {
		e
			? e.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"PlayEffect的Reason字符串长度必须大于等于限制字符数量",
						["Reason", e],
						["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
					)
				: ((this.PlayReason = e),
					this.IsPendingInit
						? this.yge()
						: this.IsDone()
							? (EffectEnvironment_1.EffectEnvironment.UseLog &&
									Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"RenderEffect",
										3,
										"特效框架:播放特效",
										["句柄Id", this.Id],
										["IsRoot", this.IsRoot()],
										["Path", this.Path],
										["Reason", e],
									),
								this.IsLoop &&
									this.IsRoot() &&
									((this.nx && (this.nx.EntityId || this.nx.SourceObject)) ||
										(Log_1.Log.CheckWarn() &&
											Log_1.Log.Warn(
												"Render",
												37,
												"特效框架:对应循环特效没有指定Owner,设置保底生命周期，保底时间为10分钟",
												["句柄Id", this.Id],
												["Path", this.Path],
												["CreateReason", this.CreateReason],
											),
										this.GetEffectSpec()?.SetLifeCycle(600))),
								this.Play(e))
							: (this.IsPendingPlay = !0))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Entity", 3, "PlayEffect的Reason不能使用undefined", [
					"Reason",
					e,
				]);
	}
	StopEffect(e, t = !1, i = !1) {
		e
			? e.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"StopEffect的Reason字符串长度必须大于等于限制字符数量",
						["Reason", e],
						["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
						["Path", this.Path],
					)
				: this.IsEffectValid()
					? this.IsRoot()
						? (!this.IsPendingInit && !this.GetRoot().IsDone()) || t
							? EffectSystem_1.EffectSystem.StopEffect(this, e, !0, i)
							: (this.tge.SetPlaying(!1), this.tge.SetStopping(!0))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Entity",
								3,
								"子特效不能调用StopEffect",
								["Reason", e],
								["Path", this.Path],
							)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"EffectHandle已失效，不能调用StopEffect()",
							["Reason", e],
							["Path", this.Path],
						)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					3,
					"StopEffect的Reason不能使用undefined",
					["Reason", e],
					["Path", this.Path],
				);
	}
	DestroyEffect(e, t) {
		e
			? e.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"DestroyEffect的Reason字符串长度必须大于等于限制字符数量",
						["Reason", e],
						["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
						["Path", this.Path],
					)
				: this.IsEffectValid()
					? this.IsRoot()
						? EffectSystem_1.EffectSystem.StopEffect(this, e, !0, t)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Entity",
								3,
								"子特效不能调用DestroyEffect",
								["Reason", e],
								["Path", this.Path],
							)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"EffectHandle已失效，不能调用DestroyEffect()",
							["Reason", e],
							["Path", this.Path],
						)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					3,
					"DestroyEffect的Reason不能使用undefined",
					["Reason", e],
					["Path", this.Path],
				);
	}
	get HandleVisible() {
		return this.obn;
	}
	OnVisibilityChanged(e, t = !0) {
		this.tge?.IsValid()
			? (t && (this.obn = e), this.tge.VisibilityChanged(e))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"RenderEffect",
					37,
					"特效框架:OnVisibilityChanged Failed",
					["handleId", this.Id],
				);
	}
	OnGlobalTimeScaleChange() {
		this.GetEffectSpec()?.OnGlobalTimeScaleChange();
	}
	OnWasRecentlyRenderedOnScreenChange(e) {
		EffectSystem_1.EffectSystem.OpenVisibilityOptimize &&
			this.tge?.NeedVisibilityTest() &&
			(e || (this.Cge = 0), this.OnVisibilityChanged(e));
	}
	Lge(e) {
		var t, i;
		return this.tge?.IsReallyPlaying()
			? ((t =
					e *
					(this.GetIgnoreTimeScale()
						? 1
						: this.GetTimeScale() * this.GetGlobalTimeScale())),
				this.tge.IsVisible()
					? !this.tge.IsLoop && this.Cge > e
						? ((i = this.Cge), (this.Cge = 0), i)
						: e
					: ((this.Cge += t), -1))
			: e;
	}
	get DebugUpdate() {
		return this.gge;
	}
	set DebugUpdate(e) {
		Info_1.Info.IsBuildDevelopmentOrDebug && (this.gge = e);
	}
	InDebugMode() {
		return this.DebugUpdate;
	}
	DebugTick(e) {
		this.NiagaraDebugTick(e),
			!this.tge?.IsValid() ||
				this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec ||
				this.tge.Tick(e);
	}
	NiagaraDebugTick(e) {
		this.tge?.IsValid() &&
			this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec &&
			(this.tge.SetNiagaraSolo(!0), this.tge.DebugTick(e));
	}
	OnPlayFinished() {
		Info_1.Info.IsGameRunning()
			? EffectSystem_1.EffectSystem.AddRemoveHandle(
					this,
					"[EffectLifeTime.PlayFinished] 播放完成",
				)
			: EffectSystem_1.EffectSystem.StopEffect(
					this,
					"[EffectLifeTime.PlayFinished] 播放完成",
					!0,
				);
	}
	CheckOwner() {
		if (this.OnCustomCheckOwner) return this.OnCustomCheckOwner(this.Id);
		if (this.nx) {
			if (
				this.nx.EntityId &&
				!EntitySystem_1.EntitySystem.Get(this.nx.EntityId)?.Valid
			)
				return !1;
			if (this.nx.SourceObject && !this.nx.SourceObject.IsValid()) return !1;
		}
		return !0;
	}
	AttachToEffectSkeletalMesh(e, t, i) {
		this.IsPendingInit
			? this.InitCache?.EffectActorHandle.SetBeAttached(e, t, i)
			: this.ege
				? this.ExecuteAttachToEffectSkeletalMesh(e, t, i)
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"RenderEffect",
						37,
						"特效框架: 调用AttachToEffectActor时，EffectActor为空",
					);
	}
	ExecuteAttachToEffectSkeletalMesh(e, t, i) {
		var s;
		e.IsValid() &&
			(this.pge || (this.pge = new Array()),
			(s = this.ege?.GetComponentByClass(
				UE.SkeletalMeshComponent.StaticClass(),
			))) &&
			(this.pge.push(e), e.K2_AttachToComponent(s, t, i, i, i, !1));
	}
	GetGlobalStoppingTime() {
		return EffectSystem_1.EffectSystem.GlobalStoppingTime;
	}
	GetGlobalStoppingPlayTime() {
		return EffectSystem_1.EffectSystem.GlobalStoppingPlayTime;
	}
}
(EffectHandle.Ige = void 0),
	(EffectHandle.Tge = void 0),
	(EffectHandle.Mge = void 0),
	(EffectHandle.Ege = void 0),
	__decorate(
		[(0, PerformanceDecorators_1.TickEffectPerformanceWithEntity)()],
		EffectHandle.prototype,
		"Tick",
		null,
	),
	__decorate(
		[(0, PerformanceDecorators_1.TickEffectPerformanceEx)(!0)],
		EffectHandle.prototype,
		"DebugTick",
		null,
	),
	__decorate(
		[(0, PerformanceDecorators_1.TickPerformanceEx)("NiagaraDebugTick", !0)],
		EffectHandle.prototype,
		"NiagaraDebugTick",
		null,
	),
	(exports.EffectHandle = EffectHandle);
