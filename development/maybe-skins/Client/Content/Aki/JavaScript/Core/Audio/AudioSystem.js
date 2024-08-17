"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AudioSystem =
		exports.parseAudioEventPath =
		exports.parseAudioEventPathInConfig =
			void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../Common/Info"),
	Log_1 = require("../Common/Log"),
	FNameUtil_1 = require("../Utils/FNameUtil"),
	AudioEventPool_1 = require("./AudioEventPool"),
	ExecutionQueue_1 = require("./ExecutionQueue"),
	INVALID_PLAYING_ID = 0;
function instanceOf(e, t) {
	return e.IsValid() && e.IsA(t.StaticClass()) && e.GetWorld()?.IsValid();
}
function parseAudioEventPathInConfig(e) {
	var t = /^\/Game\/Aki\/WwiseAudio\/Events\/(?<name>\w+)/.exec(e);
	return (
		t ||
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Audio",
					57,
					"[Core.AudioSystem] 非法的 AudioEvent 路径",
					["path", e],
					[
						"reason",
						"未在 /Game/Aki/WwiseAudio/Events/ 路径下或命名不符合规范",
					],
				)),
		t?.groups?.name
	);
}
function parseAudioEventPath(e) {
	e = "string" == typeof e ? e : e.ToAssetPathName();
	return e ? e.split(".").at(-1)?.toLowerCase() : void 0;
}
(exports.parseAudioEventPathInConfig = parseAudioEventPathInConfig),
	(exports.parseAudioEventPath = parseAudioEventPath);
class AudioSystem {
	static Tick(e) {
		this.a8.Tick(e);
	}
	static PostEvent(i, o, n) {
		return this.h8.Enqueue(async (e) => {
			var t = await this.l8(i, o, n);
			t && (this._8.set(e, t), this.u8.set(t, e));
		});
	}
	static async l8(t, i, o = {}) {
		var n = await this.a8.GetAudioEvent(t);
		if (n) {
			var { ExternalSourceName: s, ExternalSourceMediaName: r } = o,
				{ CallbackMask: s = 1, CallbackHandler: r } =
					(s &&
						r &&
						UE.WwiseExternalSourceStatics.SetExternalSourceMediaByName(s, r),
					o),
				s = 1 | s,
				r = this.c8(r);
			let e = void 0;
			if (void 0 === i) e = n.PostOnActor(void 0, r, s, !1);
			else if (i instanceof UE.Transform) {
				var a = i.GetLocation(),
					u = i.GetRotation().Rotator();
				e = n.PostAtLocation(a, u, r, s, Info_1.Info.World);
			} else if (instanceOf(i, UE.Actor)) {
				var { StopWhenOwnerDestroyed: a = !1 } = o;
				e = n.PostOnActor(i, r, s, a);
			} else {
				if (!instanceOf(i, UE.AkComponent))
					return void (
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Audio",
							57,
							"[Core.AudioSystem] PostEvent 执行失败",
							["Event", t],
							["Args", o],
							["Reason", "目标对象无效"],
						)
					);
				var { StopWhenOwnerDestroyed: u = !1 } = o;
				e = n.PostOnComponent(i, r, s, u);
			}
			if (e !== INVALID_PLAYING_ID) return e;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Audio",
					57,
					"[Core.AudioSystem] PostEvent 执行失败",
					["Event", t],
					[
						"Target",
						void 0 === i
							? "Global"
							: i instanceof UE.Transform
								? i.ToString()
								: i.GetName(),
					],
					["Args", o],
					["Reason", "SoundEngine 内部异常"],
				);
		}
	}
	static c8(i) {
		const o = (e, t) => {
			i?.(e, t),
				0 === e &&
					((0, puerts_1.releaseManualReleaseDelegate)(o),
					(e = t.PlayingID),
					(t = this.u8.get(e))) &&
					(this.u8.delete(e), this._8.delete(t));
		};
		return (0, puerts_1.toManualReleaseDelegate)(o);
	}
	static ExecuteAction(...e) {
		if ("string" == typeof e[0]) {
			const [o, n, s = {}] = e;
			this.h8.Enqueue(() => {
				var { Actor: e, TransitionDuration: t, TransitionFadeCurve: i } = s;
				UE.KuroAudioStatics.ExecuteActionOnEventName(o, n, e, t, i);
			});
		} else {
			const [r, a, u = {}] = e;
			(0 === a && this.h8.Cancel(r)) ||
				this.h8.Enqueue(() => {
					var e,
						t,
						i = this._8.get(r);
					i &&
						(({ TransitionDuration: e, TransitionFadeCurve: t } = u),
						UE.KuroAudioStatics.ExecuteActionOnPlayingId(i, a, e, t));
				});
		}
	}
	static SeekOnEvent(e, t, i = {}) {
		var o;
		void 0 === i.Handle
			? UE.KuroAudioStatics.SeekOnEventName(
					e,
					t,
					i.Actor,
					void 0,
					i.SnapToMarker,
				)
			: (o = this._8.get(i.Handle)) &&
				UE.KuroAudioStatics.SeekOnEventName(e, t, i.Actor, o, i.SnapToMarker);
	}
	static GetSourcePlayPosition(e) {
		var e = this._8.get(e);
		return !e || -1 === (e = UE.KuroAudioStatics.GetSourcePlayPosition(e))
			? void 0
			: e;
	}
	static SetSwitch(e, t, i) {
		UE.KuroAudioStatics.SetSwitch(e, t, i);
	}
	static SetState(e, t) {
		UE.KuroAudioStatics.SetState(e, t);
	}
	static SetRtpcValue(e, t, i = {}) {
		var { Actor: i, TransitionDuration: o, TransitionFadeCurve: n } = i;
		UE.KuroAudioStatics.SetRtpcValue(e, t, i, o, n);
	}
	static StopAll(e) {
		UE.KuroAudioStatics.StopAll(e);
	}
	static GetAkComponent(e, t = {}) {
		var { SocketName: t, OnCreated: i } = t;
		let o = void 0;
		o =
			"string" == typeof t
				? FNameUtil_1.FNameUtil.GetDynamicFName(0 < t.length ? t : "None")
				: t && 0 < t.toString().length
					? t
					: FNameUtil_1.FNameUtil.GetDynamicFName("None");
		t = (0, puerts_1.$ref)(!1);
		let n = void 0;
		return (
			instanceOf(e, UE.Actor)
				? (n = UE.KuroAudioStatics.GetAkComponent(e.RootComponent, o, t))
				: instanceOf(e, UE.SceneComponent) &&
					(n = UE.KuroAudioStatics.GetAkComponent(e, o, t)),
			(0, puerts_1.$unref)(t) && ((e = n?.GetOwner()), i) && e && n && i(e, n),
			n
		);
	}
}
((exports.AudioSystem = AudioSystem).a8 =
	new AudioEventPool_1.AudioEventPool()),
	(AudioSystem.h8 = new ExecutionQueue_1.ExecutionQueue()),
	(AudioSystem._8 = new Map()),
	(AudioSystem.u8 = new Map());
//# sourceMappingURL=AudioSystem.js.map
