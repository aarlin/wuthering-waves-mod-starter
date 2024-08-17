"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AudioController = exports.PlayResult = void 0);
const UE = require("ue"),
	Log_1 = require("../Common/Log"),
	Stats_1 = require("../Common/Stats"),
	ResourceSystem_1 = require("../Resource/ResourceSystem"),
	StringBuilder_1 = require("../Utils/StringBuilder"),
	StringUtils_1 = require("../Utils/StringUtils"),
	AudioPool_1 = require("./AudioPool");
class PlayResult {
	constructor() {
		(this.EventPath = ""), (this.PlayingIds = []), (this.CallbackIds = []);
	}
	Reset() {
		(this.PlayingIds = []), (this.CallbackIds = []);
	}
	AddPlayingId(t) {
		t && !this.PlayingIds.includes(t) && this.PlayingIds.push(t);
	}
	AddCallbackId(t) {
		t && !this.CallbackIds.includes(t) && this.CallbackIds.push(t);
	}
	RemoveCallbackId(t) {
		t = this.CallbackIds.indexOf(t, 0);
		-1 < t && this.CallbackIds.splice(t, 1);
	}
}
exports.PlayResult = PlayResult;
class AudioController {
	static PostEventByUi(t, o, e, i) {
		this.PostEvent(t, void 0, o, e, i);
	}
	static PostEvent(t, o, e, i, r, l, s = !0, a = "") {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Audio",
				40,
				"[AudioController.PostEvent] 播放AkEvent: ",
				["eventPath", t],
				["callbackMask", i],
			);
		let n = 0;
		function u() {
			(n = AudioController.PlayAudioByEventPath(t, o, i, r, l, s, a)),
				e && (e.AddPlayingId(n), (e.CallbackIds = [])),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Audio",
						40,
						"[AudioController.PostEvent] PlayAudioByEventPath",
						["eventPath", t],
						["callbackMask", i],
						["playingId", n],
						["playingIds", e?.PlayingIds],
					);
		}
		e && (e.EventPath = t),
			AudioController.GetAudioEvent(t, !1)
				? u()
				: AudioController.LoadAndAddCallback(
						t,
						() => {
							u();
						},
						e,
					);
	}
	static PostEventByComponent(t, o, e, i, r, l, s = !0) {
		let a = 0;
		function n() {
			(a = AudioController.P6(t, o, r, l, s)),
				e && (e.AddPlayingId(a), (e.CallbackIds = [])),
				i && i();
		}
		e && (e.EventPath = t),
			AudioController.GetAudioEvent(t, !1)
				? n()
				: AudioController.LoadAndAddCallback(
						t,
						() => {
							n();
						},
						e,
					);
	}
	static StopEvent(t, o = !0, e) {
		if (o && 0 < t.PlayingIds.length) {
			for (const i of t.PlayingIds) AudioController.StopAudioByPlayId(i, e);
			t.PlayingIds = [];
		}
		if (0 < t.CallbackIds.length) {
			for (const r of t.CallbackIds)
				AudioController.x6(t.EventPath, r),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Audio",
							34,
							"停止加载音频",
							["eventPath", t.EventPath],
							["CallbackId", r],
						);
			t.CallbackIds = [];
		}
	}
	static LoadAudioEvent(t) {
		return t && 0 !== t.length
			? void 0 !== AudioController.w6.GetAudioPool(t)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Audio", 22, "没有传入音频事件资源路径"),
				!1);
	}
	static AddAudioEventCallback(t, o) {
		return AudioController.w6.AddCallbackToLoad(t, o);
	}
	static LoadAndAddCallback(t, o, e = void 0) {
		AudioController.w6.LoadAndAddCallback(t, o, e);
	}
	static x6(t, o) {
		AudioController.w6.DeleteCallback(t, o);
	}
	static PlayAudioByEventPath(o, e, i, r, l, s = !0, a = "") {
		var n = AudioController.GetAudioEvent(o, !1);
		if (o && n) {
			AudioController.w6.SetPlayFlag(o);
			let t = 0;
			return (t = e
				? s
					? UE.AkGameplayStatics.PostEvent(n, e, i, r, l, a)
					: UE.AkGameplayStatics.PostEventAtLocation(
							n,
							e.K2_GetActorLocation(),
							new UE.Rotator(0, 0, 0),
							a,
							e.GetWorld(),
						)
				: n.PostOnActor(void 0, r, i ?? 0, !1));
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Audio",
				22,
				"没有对应的音频事件资源，请检查是否已经加载！",
				["eventPath", o],
			);
	}
	static P6(t, o, e, i, r = !0) {
		var l = AudioController.GetAudioEvent(t, !1);
		if (l)
			return (
				AudioController.w6.SetPlayFlag(t),
				o
					? r
						? o.PostAkEvent(l, e, i, l.GetName())
						: UE.AkGameplayStatics.PostEventAtLocation(
								l,
								o.K2_GetComponentLocation(),
								new UE.Rotator(0, 0, 0),
								"",
								o.GetWorld(),
							)
					: l.PostOnActor(void 0, i, e ?? 0, !1)
			);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Audio",
				22,
				"没有对应的音频事件资源，请检查是否已经加载！",
				["eventPath", t],
			);
	}
	static StopAudio(t) {
		UE.KuroAudioStatics.StopAll(t);
	}
	static StopAudioByPlayId(t, o) {
		UE.AkGameplayStatics.ExecuteActionOnPlayingID(0, t, o);
	}
	static PauseAudioByPlayId(t) {
		UE.AkGameplayStatics.ExecuteActionOnPlayingID(1, t);
	}
	static ResumeAudioByPlayId(t) {
		UE.AkGameplayStatics.ExecuteActionOnPlayingID(2, t);
	}
	static ExecuteActionOnEvent(t, o, e) {
		UE.AkGameplayStatics.ExecuteActionOnEvent(t, o, e);
	}
	static SetSwitch(t, o, e) {
		UE.KuroAudioStatics.SetSwitch(t, o, e);
	}
	static SetSwitchValue(t, o) {
		UE.AkGameplayStatics.SetSwitch(t, o, void 0, void 0);
	}
	static SetState(t, o) {
		UE.KuroAudioStatics.SetState(t, o);
	}
	static Tick(t) {
		this.w6.Tick(t);
	}
	static SetRTPCValue(t, o, e, i, r) {
		UE.AkGameplayStatics.SetRTPCValue(e, t, i ?? 0, r, new UE.FName(o));
	}
	static GetRTPCValue(t, o, e, i, r = 0) {
		UE.AkGameplayStatics.GetRTPCValue(e, r, 3, t, void 0, i, new UE.FName(o));
	}
	static GetAudioEvent(t, o = !0) {
		if (t && 0 !== t.length) return AudioController.w6.GetAudioPool(t, o);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Audio", 22, "没有传入音频事件资源路径");
	}
	static PostEventNotInputPool(t, e, i, r, l, s, a = !0) {
		StringUtils_1.StringUtils.IsNothing(t)
			? i && i(void 0)
			: ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AkAudioEvent, (o) => {
					if (o?.IsValid()) {
						let t = 0;
						(t = e
							? a
								? UE.AkGameplayStatics.PostEvent(o, e, r, l, s)
								: UE.AkGameplayStatics.PostEventAtLocation(
										o,
										e.K2_GetActorLocation(),
										new UE.Rotator(0, 0, 0),
										"",
										e.GetWorld(),
									)
							: o.PostOnActor(void 0, l, r ?? 0, !1)),
							i && i(o, t);
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("Audio", 22, "不进入缓存池音效加载资源失败：", [
								"eventPath: ",
								t,
							]),
							i && i(void 0);
				});
	}
	static PostEventByExternalSourcesByUi(t, o, e, i, r, l, s) {
		this.PostEventByExternalSources(t, void 0, o, e, i, r, l, s);
	}
	static PostEventByExternalSources(t, o, e, i, r, l, s, a) {
		(StringUtils_1.StringUtils.IsNothing(e) ||
			StringUtils_1.StringUtils.IsNothing(i)) &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Audio",
				22,
				"输入MediaName 或者 ExternalSourceName 异常",
				["MediaName", e],
				["ExternalSourceName", i],
			),
			UE.WwiseExternalSourceStatics.SetExternalSourceMediaByName(i, e),
			AudioController.PostEvent(t, o, r, s, a);
	}
	static SetMultiplePositions(t, o, e) {
		UE.AkGameplayStatics.SetMultiplePositions(t, o, e);
	}
	static PostSelectableAudioEvent(t, o) {
		(o = this.b6(t, o.GetName())), (o = this.q6(o));
		o
			? (AudioController.PostEventByUi(t, o),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("UiCore", 22, "点击声音!!!!!!!!!!!", [
						"eventPath",
						t,
					]))
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("UiCore", 22, "没有点击声音!!!!!!!!");
	}
	static StopSelectableAudioEventByName(t) {
		t = this.G6(t);
		t && this.N6(t);
	}
	static StopSelectableAudioEvent(t) {
		t = this.G6(t.GetName());
		t && this.N6(t);
	}
	static N6(t) {
		for (const e of t) {
			var o = this.O6(e);
			o && AudioController.StopEvent(o, !1);
		}
	}
	static q6(o) {
		if (!StringUtils_1.StringUtils.IsEmpty(o)) {
			let t = this.k6.get(o);
			return t || ((t = new PlayResult()), this.k6.set(o, t)), t;
		}
	}
	static F6() {
		for (const t of this.V6.values()) this.N6(t);
		this.V6.clear(), this.k6.clear();
	}
	static O6(t) {
		var o = this.k6.get(t);
		return o && this.k6.delete(t), o;
	}
	static b6(t, o) {
		t = new StringBuilder_1.StringBuilder(t, o).ToString();
		let e = this.V6.get(o);
		return e || ((e = new Set()), this.V6.set(o, e)), e.add(t), t;
	}
	static G6(t) {
		return this.V6.get(t);
	}
	static Clear() {
		Log_1.Log.CheckDebug() && Log_1.Log.Debug("UiCore", 22, "缓存音效数据清除"),
			this.F6();
	}
}
((exports.AudioController = AudioController).w6 = new AudioPool_1.AudioPool()),
	(AudioController.V6 = new Map()),
	(AudioController.k6 = new Map()),
	(AudioController.B6 = void 0);
//# sourceMappingURL=AudioController.js.map
