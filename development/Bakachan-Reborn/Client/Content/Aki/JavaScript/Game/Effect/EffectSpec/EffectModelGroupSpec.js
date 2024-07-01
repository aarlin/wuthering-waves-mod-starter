"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectModelGroupSpec = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
	EffectSystem_1 = require("../EffectSystem"),
	EffectSpec_1 = require("./EffectSpec");
class EffectModelGroupSpec extends EffectSpec_1.EffectSpec {
	constructor() {
		super(...arguments),
			(this.EffectSpecMap = new Map()),
			(this.d0e = new Set()),
			(this.C0e = new Array()),
			(this.g0e = new Array()),
			(this.GroupComponent = void 0),
			(this.HasTransformAnim = !1),
			(this.CachedLocationCurve = void 0),
			(this.CachedRotationCurve = void 0),
			(this.CachedScaleCurve = void 0),
			(this.f0e = void 0),
			(this.p0e = void 0),
			(this.v0e = void 0),
			(this.M0e = void 0);
	}
	SetEffectType(e) {
		super.SetEffectType(e);
		for (const t of this.EffectSpecMap.values())
			t.GetEffectSpec().SetEffectType(e);
	}
	SetEffectParameterNiagara(e) {
		for (var [, t] of this.EffectSpecMap) t.SetEffectParameterNiagara(e);
	}
	SetTimeScale(e, t = !1) {
		super.SetTimeScale(e, t);
		for (const s of this.EffectSpecMap.values()) s.SetTimeScale(e, t);
	}
	SetExtraState(e) {
		for (const t of this.EffectSpecMap.values())
			t.GetEffectSpec().SetExtraState(e);
	}
	OnInit() {
		Stats_1.Stat.Enable &&
			((this.f0e = void 0),
			(this.p0e = void 0),
			(this.v0e = void 0),
			(this.M0e = void 0)),
			(this.InitPromise = new CustomPromise_1.CustomPromise());
		const e = this.Handle.GetSureEffectActor();
		if (e?.IsValid()) {
			var t = (t = this.Handle.Parent)
					? t.GetEffectSpec()?.GetSceneComponent()
					: void 0,
				s =
					((t = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
						e,
						UE.SceneComponent.StaticClass(),
						t,
						void 0,
						!1,
						this.EffectModel,
					)),
					(this.GroupComponent = t),
					this.GroupComponent.SetComponentTickEnabled(!1),
					(this.SceneComponent = t),
					this.EffectModel.EffectData.Num());
			const c = this.EffectModel.EffectData;
			let i = s;
			for (let e = 0; e < s; ++e) {
				const t = c.GetKey(e);
				if (!t?.IsValid())
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"RenderEffect",
								3,
								"特效框架:EffectModelGroupSpec.Init失败，原因:EffectData存在无效的子特效",
								["句柄Id", this.Handle.Id],
								["Path", this.Handle.Path],
							),
						this.InitPromise.SetResult(0),
						!1
					);
				const s = this.Handle.GetSureEffectActor();
				var f = s.GetOuter(),
					o = UE.KismetSystemLibrary.GetPathName(t);
				let a = !1;
				(f = EffectSystem_1.EffectSystem.SpawnChildEffect(
					f,
					this.Handle,
					s,
					o,
					this.Handle.CreateReason,
					!1,
					this.Handle.GetContext(),
					void 0,
					(e, s) => {
						switch ((i--, e)) {
							case 1:
							case 2:
								this.EffectSpecMap.delete(s);
								break;
							case 0:
								a = !0;
								break;
							case 5:
								var f = c.Get(t);
								0 < f && (this.C0e.push([s, f]), this.d0e.add(s));
						}
						i ||
							(a
								? ((this.C0e.length = 0),
									this.d0e.clear(),
									this.InitPromise.SetResult(0))
								: this.InitPromise.SetResult(5));
					},
				)),
					EffectSystem_1.EffectSystem.IsValid(f?.Id ?? 0) &&
						this.EffectSpecMap.set(f.Id, f);
			}
		} else this.InitPromise.SetResult(2);
		return !0;
	}
	OnStart() {
		let e = !1;
		for (const t of this.EffectSpecMap.values())
			t.Start() ||
				((e = !0),
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderEffect", 3, "EffectHandle执行Start失败", [
						"Path",
						t.Path,
					]));
		return (
			(this.CachedLocationCurve = this.EffectModel.Location),
			(this.CachedRotationCurve = this.EffectModel.Rotation),
			(this.CachedScaleCurve = this.EffectModel.Scale),
			(this.HasTransformAnim =
				this.CachedLocationCurve.bUseCurve ||
				this.CachedRotationCurve.bUseCurve ||
				this.CachedScaleCurve.bUseCurve),
			!e
		);
	}
	OnEnd() {
		let e = !1;
		for (const t of this.EffectSpecMap.values()) t.End() || (e = !0);
		return !e;
	}
	OnClear() {
		let e = !1;
		for (const t of this.EffectSpecMap.values()) t.Clear() || (e = !0);
		for (const e of this.EffectSpecMap.values())
			EffectSystem_1.EffectSystem.StopEffect(
				e,
				"[EffectModelGroupSpec.OnClear]",
				!0,
			);
		return (
			(this.f0e = void 0),
			(this.M0e = void 0),
			(this.v0e = void 0),
			(this.p0e = void 0),
			this.d0e.clear(),
			(this.C0e.length = 0),
			(this.g0e.length = 0),
			!e
		);
	}
	Destroy() {
		super.Destroy();
		for (const e of this.EffectSpecMap.values()) e.Destroy();
		this.EffectSpecMap.clear();
	}
	Tick(e) {
		super.Tick(e);
		for (const t of this.EffectSpecMap.values()) t.Tick(e);
	}
	OnTick(e) {
		if (0 < this.g0e.length)
			for (let f = 0; f < this.g0e.length; ++f) {
				var t = this.g0e[f],
					s = t[1] - e;
				(t[1] = s) <= 0 &&
					((s = t[0]),
					this.g0e.splice(f, 1),
					this.EffectSpecMap.get(s)?.Play(
						"[EffectModelGroupSpec.OnTick] 延迟播放",
					),
					f--);
			}
		this.HasTransformAnim &&
			this.GroupComponent?.IsValid() &&
			this.IsPlaying() &&
			UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(
				this.GetPlayInEditor(),
				this.GroupComponent,
				this.CachedLocationCurve,
				this.CachedRotationCurve,
				this.CachedScaleCurve,
				this.LifeTime.PassTime,
			);
	}
	OnBodyEffectChanged(e) {
		for (const t of this.EffectSpecMap.values())
			t.GetEffectSpec().UpdateBodyEffect(e, !0);
	}
	SetPlaying(e) {
		super.SetPlaying(e);
		for (const t of this.EffectSpecMap.values())
			t.GetEffectSpec().SetPlaying(e);
	}
	SetStopping(e) {
		super.SetStopping(e);
		for (const t of this.EffectSpecMap.values())
			t.GetEffectSpec().SetStopping(e);
	}
	OnPlay(e) {
		for (var [t, s] of this.EffectSpecMap) this.d0e.has(t) || s.Play(e);
		if (this.C0e.length) {
			this.g0e.length = 0;
			for (const e of this.C0e) this.g0e.push([e[0], e[1]]);
		}
		this.GroupComponent &&
			UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(
				!0,
				this.GroupComponent,
				this.CachedLocationCurve,
				this.CachedRotationCurve,
				this.CachedScaleCurve,
				this.LifeTime.PassTime,
			);
	}
	IsReallyPlaying() {
		for (const e of this.EffectSpecMap.values())
			if (e.GetEffectSpec()?.IsReallyPlaying()) return !0;
		return !1;
	}
	OnReplay() {
		for (const e of this.EffectSpecMap.values()) e.Replay();
	}
	OnEnterPool() {
		for (const e of this.EffectSpecMap.values()) e.OnEnterPool();
	}
	OnStop(e, t) {
		for (const s of this.EffectSpecMap.values()) s.Stop(e, t);
	}
	OnPreStop() {
		for (const e of this.EffectSpecMap.values()) e.PreStop();
	}
	OnEnableChanged(e) {
		for (const t of this.EffectSpecMap.values()) t.OnEnabledChange(e, 0);
	}
	NeedVisibilityTest() {
		for (const e of this.EffectSpecMap.values())
			if (e.GetEffectSpec()?.NeedVisibilityTest()) return !0;
		return !1;
	}
	OnVisibilityChanged(e) {
		for (const t of this.EffectSpecMap.values()) t.OnVisibilityChanged(e);
	}
	ChaseFrame(e, t, s) {
		super.ChaseFrame(e, t, s);
		for (const f of this.EffectSpecMap.values())
			f.GetEffectSpec()?.ChaseFrame(e, t, s);
	}
	SeekTo(e, t, s) {
		super.SeekTo(e, t, s);
		for (const f of this.EffectSpecMap.values())
			f.GetEffectSpec()?.SeekTo(e, t, s);
	}
	SeekDelta(e, t, s) {
		super.SeekDelta(e, t, s);
		for (const f of this.EffectSpecMap.values())
			f.GetEffectSpec()?.SeekDelta(e, t, s);
	}
	DebugErrorNiagaraPauseCount() {
		let e = 0;
		for (const t of this.EffectSpecMap.values())
			e += t.GetEffectSpec()?.DebugErrorNiagaraPauseCount() ?? 0;
		return e;
	}
	NeedAlwaysTick() {
		for (const e of this.EffectSpecMap.values())
			if (e.GetEffectSpec()?.NeedAlwaysTick()) return !0;
		return !1;
	}
	TickNeedAlwaysTick(e) {
		for (const t of this.EffectSpecMap.values())
			t.GetEffectSpec()?.TickNeedAlwaysTick(e);
	}
	SeekTimeWithoutAlwaysTick(e, t) {
		for (const s of this.EffectSpecMap.values())
			s.GetEffectSpec()?.SeekTimeWithoutAlwaysTick(e, t);
	}
	IsVisible() {
		for (const e of this.EffectSpecMap.values())
			if (e.GetEffectSpec()?.IsVisible()) return !0;
		return this.Visible;
	}
	IsUseBoundsCalculateDistance() {
		for (const e of this.EffectSpecMap.values())
			if (e.GetEffectSpec()?.IsUseBoundsCalculateDistance()) return !0;
		return !1;
	}
}
exports.EffectModelGroupSpec = EffectModelGroupSpec;
