"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectLifeTime = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../Core/Common/Info"),
	Log_1 = require("../../Core/Common/Log"),
	Stats_1 = require("../../Core/Common/Stats"),
	EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
	TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
	TimeUtil_1 = require("../Common/TimeUtil"),
	NEAR_ZERO = 0.001,
	CHECK_CAN_STOP_INTERVAL = 1e3;
class EffectLifeTime {
	constructor(e) {
		(this.Rge = e),
			(this.DefaultPassTime = 0),
			(this.PassTime = 0),
			(this.TotalPassTime = 0),
			(this.StartTime = -1),
			(this.LoopTime = 0),
			(this.EndTime = 0),
			(this.LoopTimeStamp = 0),
			(this.LifeTimeStamp = 0),
			(this.Uge = !1),
			(this.Age = !1),
			(this.gW = void 0),
			(this.Pge = void 0),
			(this.xge = void 0),
			(this.wge = !1),
			(this.Bge = void 0),
			(this.bge = 1),
			(this.qge = void 0),
			(this.Gge = () => {
				(this.qge = void 0),
					this.Rge?.GetHandle()?.SetTimeScale(1),
					EffectEnvironment_1.EffectEnvironment.UseLog &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"RenderEffect",
							37,
							"特效框架：特效设置TimeScale为极小值，没有及时置回，造成泄漏",
							["句柄Id", this.Rge?.GetHandle()?.Id],
							["Path", this.Rge?.GetHandle()?.Path],
							["CreateReason", this.Rge?.GetHandle()?.CreateReason],
						);
			}),
			(this.Nge = () => {
				var e,
					i = this.Rge;
				(this.Bge = void 0),
					i.GetHandle().IsRoot()
						? i.CanStop()
							? (Info_1.Info.IsGameRunning() &&
									((e = i.GetHandle().GetSureEffectActor()) &&
										!i.GetHandle().IsExternalActor &&
										(e.K2_DetachFromActor(), e.SetActorHiddenInGame(!0)),
									this.Rge.GetHandle().UnregisterTick()),
								this.Rge.GetHandle()?.OnPlayFinished())
							: (this.Bge = TimerSystem_1.TimerSystem.Delay(this.Nge, 1e3))
						: i.GetHandle().Stop("[EffectLifeTime.PlayFinished] 播放完成", !0);
			}),
			Stats_1.Stat.Enable &&
				((this.gW = void 0), (this.Pge = void 0), (this.xge = void 0));
	}
	get IsLoop() {
		return this.Uge;
	}
	GetLifeTime() {
		return this.LifeTimeStamp;
	}
	get GetPassTime() {
		return this.PassTime;
	}
	get GetEndTime() {
		return this.EndTime;
	}
	GetTotalPassTime() {
		return this.TotalPassTime;
	}
	SetTotalPassTime(e) {
		this.TotalPassTime = e;
	}
	SetTime(e, i, t) {
		(this.wge = !0),
			(this.StartTime = e),
			(this.LoopTime = i),
			(this.EndTime = t),
			(this.LoopTimeStamp = e + i),
			(this.LifeTimeStamp = e + i + t),
			(this.Uge = this.StartTime < 0 || 0 < this.LoopTime),
			(this.Age = this.Uge || this.LifeTimeStamp <= 0),
			this.IsLoop || this.Bge || this.SetLifeCycle(this.LifeTimeStamp);
	}
	SetLifeCycle(e) {
		this.Bge &&
			(this.IsLoop ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						37,
						"特效框架：SetLifeCycle时非循环特效仍然存在上一次的生命周期计时器，可能之前已经泄漏，或者不正确使用多次设置生命周期",
						["句柄Id", this.Rge?.GetHandle()?.Id],
						["Path", this.Rge?.GetHandle()?.Path],
						["TimerHandler", this.Bge.Id],
					)),
			TimerSystem_1.TimerSystem.Remove(this.Bge),
			(this.Bge = void 0)),
			(e *= TimeUtil_1.TimeUtil.InverseMillisecond),
			(this.Bge = this.Oge(e)),
			EffectEnvironment_1.EffectEnvironment.UseLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderEffect",
					37,
					"特效框架：设置生命周期计时器",
					["句柄Id", this.Rge?.GetHandle()?.Id],
					["Path", this.Rge?.GetHandle()?.Path],
					["TimerHandle", this.Bge?.Id],
					["LifeTime", e],
				);
	}
	WhenEnterStopping() {
		this.kge(this.LifeTimeStamp - this.PassTime);
	}
	kge(e) {
		var i, t;
		this.Bge
			? ((i = this.Bge.Id),
				TimerSystem_1.TimerSystem.Remove(this.Bge),
				(this.Bge = void 0),
				(t = e * TimeUtil_1.TimeUtil.InverseMillisecond),
				(this.Bge = this.Oge(t)),
				EffectEnvironment_1.EffectEnvironment.UseLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"RenderEffect",
						37,
						"特效框架：更新生命周期计时器",
						["句柄Id", this.Rge?.GetHandle()?.Id],
						["Path", this.Rge?.GetHandle()?.Path],
						["OldTimerHandle", i],
						["TimerHandle", this.Bge?.Id],
						["LifeTime", t],
					))
			: this.SetLifeCycle(e);
	}
	SetTimeScale(e) {
		this.bge !== e &&
			((this.bge = e), this.Bge) &&
			(0 < e
				? (TimerSystem_1.TimerSystem.IsPause(this.Bge) &&
						TimerSystem_1.TimerSystem.Resume(this.Bge),
					TimerSystem_1.TimerSystem.ChangeDilation(this.Bge, e))
				: TimerSystem_1.TimerSystem.IsPause(this.Bge) ||
					TimerSystem_1.TimerSystem.Pause(this.Bge));
	}
	RegisterWaitMiniTimeScale(e) {
		this.qge || (this.qge = TimerSystem_1.TimerSystem.Delay(this.Gge, e));
	}
	UnregisterWaitMiniTimeScale() {
		this.qge &&
			(TimerSystem_1.TimerSystem.Remove(this.qge), (this.qge = void 0));
	}
	Tick(e) {
		e <= 0 ||
			((this.TotalPassTime += e), this.SeekTo(this.PassTime + e, !0, !0));
	}
	SeekTo(e, i, t, s = !0) {
		return (
			t || (!this.Uge && this.Bge && this.kge(this.LifeTimeStamp - e)),
			(this.PassTime = e),
			!!this.Rge.IsPlaying() &&
				(this.Uge &&
					!this.Rge.IsStopping() &&
					this.PassTime >= this.LoopTimeStamp &&
					s &&
					this.Fge(),
				!!i) &&
				!(
					(this.Age && !this.Rge.IsStopping()) ||
					(this.PassTime > this.LoopTimeStamp &&
						this.Rge?.GetHandle()?.PreStop(),
					this.PassTime < this.LifeTimeStamp) ||
					(Info_1.Info.IsGameRunning() || this.Nge(), 0)
				)
		);
	}
	Fge() {
		var e, i;
		this.LoopTime <= 0.001
			? (this.PassTime = this.StartTime)
			: this.PassTime >= this.LoopTimeStamp + this.LoopTime
				? ((e = this.PassTime - this.StartTime),
					(i = (0, puerts_1.$ref)(0)),
					UE.KismetMathLibrary.FMod(e, this.LoopTime, i),
					(this.PassTime = this.StartTime + (0, puerts_1.$unref)(i)))
				: (this.PassTime -= this.LoopTime);
	}
	get IsAfterStart() {
		return this.wge && this.PassTime > this.StartTime - 0.001;
	}
	OnReplay() {
		this.Clear(), (this.wge = !1), (this.bge = 1);
	}
	Clear() {
		(this.PassTime = this.DefaultPassTime),
			(this.TotalPassTime = 0),
			this.Bge &&
				(TimerSystem_1.TimerSystem.Remove(this.Bge), (this.Bge = void 0));
	}
	Oge(e) {
		if (e > TimerSystem_1.MIN_TIME)
			return (
				(e = TimerSystem_1.TimerSystem.Delay(
					this.Nge,
					e,
					void 0,
					"EffectLifeTime",
					!1,
				)) &&
					1 !== this.bge &&
					(0 < this.bge
						? TimerSystem_1.TimerSystem.ChangeDilation(e, this.bge)
						: TimerSystem_1.TimerSystem.Pause(e)),
				e
			);
		this.Nge();
	}
}
exports.EffectLifeTime = EffectLifeTime;
