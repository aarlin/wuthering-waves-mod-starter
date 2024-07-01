"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var i,
			a = arguments.length,
			s =
				a < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, o, n);
		else
			for (var r = e.length - 1; 0 <= r; r--)
				(i = e[r]) && (s = (a < 3 ? i(s) : 3 < a ? i(t, o, s) : i(t, o)) || s);
		return 3 < a && s && Object.defineProperty(t, o, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayingMontageInfo =
		exports.PlayMontageConfig =
		exports.BasePerformComponent =
			void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CharacterNameDefines_1 = require("../CharacterNameDefines"),
	SECOND_TO_MILLISECOND = 1e3;
let BasePerformComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.AnimComp = void 0),
			(this.sFr = 0),
			(this.aFr = new Map()),
			(this.hFr = new Set()),
			(this.InLevelAiControl = () => !0),
			(this.lFr = (e) => {
				const t = (o, n) => {
					this.RemoveOnMontageEnded(t), this.RemoveMontageInfo(e);
				};
				e.BodyMontage?.IsValid() &&
				this.AnimComp.MainAnimInstance.Montage_IsPlaying(e.BodyMontage) &&
				!this.GetCurrentSection().op_Equality(
					CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
				)
					? (this.AddOnMontageEnded(t), this.Stop(!0, e.BodyMontage))
					: (this.ForceStop(0.5, e.BodyMontage), this.RemoveMontageInfo(e));
			});
	}
	_Fr() {
		return ++this.sFr;
	}
	IsPlayingMontage(e) {
		return this.aFr.has(e);
	}
	GetMontageController() {
		return this;
	}
	LoadAndPlayMontageById(e, t, o = void 0, n = void 0, i = void 0) {
		let a;
		return (a = e.IsAbp
			? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(e.MontageId)
			: ModelManager_1.ModelManager.PlotModel.GetMontageConfig(e.MontageId))
			? this.LoadAndPlayMontage(a.ActionMontage, t, o, n, i)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"NPC",
						43,
						"当前MontageId无效,找不到相关蒙太奇配置,请检查注册蒙太奇csv表格",
						["EntityId", this.AnimComp.Actor.EntityId],
						["MontageId", e.MontageId],
						["IsABP", e.IsAbp],
					),
				-1);
	}
	LoadAndPlayMontage(e, t, o = void 0, n = void 0, i = void 0) {
		if (this.hFr.has(e))
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"NPC",
						43,
						"当前正在播放该蒙太奇动画,应先停止当前动画",
						["EntityId", this.AnimComp.Actor.EntityId],
						["无限循环", t.IsInfiniteLoop],
						["剩余时间", t.PlayMontageTime],
						["MontagePath", e],
					),
				-1
			);
		var a = this._Fr();
		const s = new PlayingMontageInfo(a, e, t, this, o, n, i);
		return (
			this.aFr.set(a, s),
			this.hFr.add(e),
			this.LoadAsync(e, (e, t) => {
				e?.IsValid() &&
					s.CheckPlayCondition() &&
					((e = 1e3 * (s.BodyMontage = e).SequenceLength),
					0 === s.MontageConfig.PlayMontageTime
						? s.MontageConfig.CalculatePlayTime(e)
						: (s.MontageConfig.OncePlayTime = e),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"NPC",
							43,
							"开始播放蒙太奇动画",
							["EntityId", this.AnimComp.Actor.EntityId],
							["无限循环", s.MontageConfig.IsInfiniteLoop],
							["剩余时间", s.MontageConfig.PlayMontageTime],
							["MontagePath", s.MontagePath],
						),
					s.PlayMontageLoop(this.lFr));
			}) !== ResourceSystem_1.ResourceSystem.InvalidId
				? a
				: -1
		);
	}
	ClearAndStopMontage(e, t = 0) {
		this.aFr.has(e) &&
			(e = this.aFr.get(e)) &&
			(e.BodyMontage?.IsValid() && this.ForceStop(t, e.BodyMontage),
			this.RemoveMontageInfo(e));
	}
	RemoveMontageInfo(e) {
		e &&
			(e.OnClearInfo(), this.hFr.delete(e.MontagePath), this.aFr.delete(e.Uid));
	}
	LoadAsync(e, t) {
		return this.AnimComp.LoadAsync(e, t);
	}
	Play(e, t) {
		this.AnimComp.Play(e, t);
	}
	PlayOnce(e, t) {
		this.AnimComp.PlayOnce(e, t);
	}
	PlayFromLoop(e, t) {
		this.AnimComp.PlayFromLoop(e, t);
	}
	PlayFromEnd(e, t) {
		this.AnimComp.PlayFromEnd(e, t);
	}
	Stop(e = !1, t) {
		this.AnimComp.Stop(e, t);
	}
	StopMontage(e = 0) {
		this.AnimComp.StopMontage(e);
	}
	ForceStop(e, t) {
		this.AnimComp.ForceStop(e, t);
	}
	ForceStopWithBlendOut(e, t) {
		this.AnimComp.ForceStopWithBlendOut(e, t);
	}
	AddOnMontageEnded(e) {
		this.AnimComp.AddOnMontageEnded(e);
	}
	RemoveOnMontageEnded(e) {
		this.AnimComp.RemoveOnMontageEnded(e);
	}
	ClearOnMontageEnded() {
		this.AnimComp.ClearOnMontageEnded();
	}
	GetCurrentSection() {
		return this.AnimComp.GetCurrentSection();
	}
	PlayMontageByName(e, t) {
		return this.AnimComp.PlayMontageByName(e, t);
	}
	PlayMontageById(e, t) {
		return this.AnimComp.PlayMontageById(e, t);
	}
};
(BasePerformComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(37)],
	BasePerformComponent,
)),
	(exports.BasePerformComponent = BasePerformComponent);
class PlayMontageConfig {
	constructor(e = 0, t = 0, o = !1, n = !1) {
		(this.PlayMontageTime = 0),
			(this.OncePlayTime = 0),
			(this.IsInfiniteLoop = !1),
			(this.IsPlayLoop = !1),
			(this.NTe = 0),
			(this.OTe = 0),
			(this.OTe = e),
			(this.NTe = t),
			(this.IsPlayLoop = o || 0 !== this.NTe),
			(this.IsInfiniteLoop = n || -1 === this.NTe || -1 === this.OTe);
	}
	CalculatePlayTime(e) {
		(this.OncePlayTime = e),
			(this.PlayMontageTime =
				this.NTe && 0 < this.NTe
					? 1e3 * this.NTe
					: this.OTe && 0 < this.OTe
						? this.OTe * e
						: e),
			this.IsInfiniteLoop ||
				(this.PlayMontageTime < TimerSystem_1.MIN_TIME &&
					(this.PlayMontageTime = Math.max(e, TimerSystem_1.MIN_TIME)),
				this.PlayMontageTime > TimerSystem_1.MAX_TIME &&
					(this.IsInfiniteLoop = !0));
	}
}
exports.PlayMontageConfig = PlayMontageConfig;
class PlayingMontageInfo {
	constructor(e, t, o, n, i = void 0, a = void 0, s = void 0) {
		(this.Uid = 0),
			(this.MontagePath = ""),
			(this.MontageConfig = void 0),
			(this.BodyMontage = void 0),
			(this.TimerHandle = void 0),
			(this.R$o = void 0),
			(this.U$o = void 0),
			(this.A$o = void 0),
			(this.P$o = void 0),
			(this.Uid = e),
			(this.MontagePath = t),
			(this.MontageConfig = o),
			(this.U$o = i),
			(this.A$o = a),
			(this.R$o = s),
			(this.P$o = n);
	}
	CheckPlayCondition() {
		return !this.R$o || this.R$o();
	}
	OnClearInfo() {
		this.A$o && this.A$o(),
			this.TimerHandle &&
				TimerSystem_1.TimerSystem.Has(this.TimerHandle) &&
				(TimerSystem_1.TimerSystem.Remove(this.TimerHandle),
				(this.TimerHandle = void 0)),
			(this.MontageConfig = void 0),
			(this.U$o = void 0),
			(this.A$o = void 0),
			(this.R$o = void 0);
	}
	PlayMontageLoop(e) {
		this.U$o && this.U$o(), this.x$o(e);
	}
	x$o(e) {
		if (this.MontageConfig.IsInfiniteLoop && this.MontageConfig.IsPlayLoop)
			this.P$o.Play(this.BodyMontage);
		else {
			let t = 0;
			this.MontageConfig.IsPlayLoop
				? ((t = this.MontageConfig.PlayMontageTime),
					this.P$o.Play(this.BodyMontage))
				: ((t = this.MontageConfig.OncePlayTime),
					this.P$o.PlayOnce(this.BodyMontage)),
				(this.MontageConfig.PlayMontageTime =
					this.MontageConfig.PlayMontageTime - t),
				!this.MontageConfig.IsInfiniteLoop &&
				this.MontageConfig.PlayMontageTime <= TimerSystem_1.MIN_TIME
					? (this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
							(this.TimerHandle = void 0), e(this);
						}, t))
					: (this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
							(this.TimerHandle = void 0), this.PlayMontageLoop(e);
						}, t));
		}
	}
}
exports.PlayingMontageInfo = PlayingMontageInfo;
