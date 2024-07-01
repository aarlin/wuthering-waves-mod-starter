"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameAudioController = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	StateRef_1 = require("../../../Core/Utils/Audio/StateRef"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	TOLERANCE = 0.01,
	DYNAMIC_REVERB_RTPC_1 = "reverb_azi_count",
	DYNAMIC_REVERB_RTPC_2 = "reverb_eleva_distance";
class EnvironmentCache {
	constructor() {
		(this.StateEvent = ""),
			(this.StateEvent_MusicCompatible = ""),
			(this.DynamicReverbRtpc1 = 0),
			(this.DynamicReverbRtpc2 = 0),
			(this.DynamicReverbEnabled = !1);
	}
}
class GameAudioController extends ControllerBase_1.ControllerBase {
	static UpdatePlayerLocation(e) {
		this.zin(e), this.UIn(e), this.Rje(e);
	}
	static OnInit() {
		return (
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				this.Uje,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ClearWorld,
				this.uMe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WeatherChange,
				this.dIe,
			),
			Net_1.Net.Register(25063, GameAudioController.PDn),
			!0
		);
	}
	static OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				this.Uje,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ClearWorld,
				this.uMe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WeatherChange,
				this.dIe,
			),
			Net_1.Net.UnRegister(25063),
			!0
		);
	}
	static WDn() {
		switch (ModelManager_1.ModelManager.WeatherModel?.GetCurrentWeatherType()) {
			case 1:
				this.KDn.State = "sunny";
				break;
			case 2:
				this.KDn.State = "cloudy";
				break;
			case 3:
				this.KDn.State = "rainy";
				break;
			case 4:
				this.KDn.State = "thunder_rain";
				break;
			case 5:
				this.KDn.State = "snowy";
				break;
			default:
				this.KDn.State = "none";
		}
	}
	static zin(e) {
		var t,
			o,
			n = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
		n?.IsValid()
			? ((t = n.GetEnvironmentInfo(e)).StateEvent !== this.PIn.StateEvent &&
					((this.PIn.StateEvent = t.StateEvent),
					(o = t.StateEvent || this.Pje?.ResetEvent)
						? (AudioSystem_1.AudioSystem.PostEvent(o),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Audio", 57, "[Game.Environment] PostEvent", [
									"Event",
									o,
								]))
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Audio",
								57,
								"[Game.Environment] 当前地图未配置重置音频事件",
							)),
				t.bEnableDynamicReverb
					? ((this.PIn.DynamicReverbEnabled = !0),
						(o = n.CalculateDynamicReverbParam(e)),
						this.xIn(o))
					: this.PIn.DynamicReverbEnabled &&
						((this.PIn.DynamicReverbEnabled = !1), this.xIn(void 0)))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Audio",
					57,
					"[Game.Controller] AudioEnvironmentSubsystem 无效",
				);
	}
	static UIn(e) {
		var t = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
		t?.IsValid()
			? (t = t.GetEnvironmentInfo_MusicCompatible(e)).StateEvent !==
					this.PIn.StateEvent_MusicCompatible &&
				((this.PIn.StateEvent_MusicCompatible = t.StateEvent),
				(e = t.StateEvent || this.Pje?.MusicResetEvent)
					? (AudioSystem_1.AudioSystem.PostEvent(e),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Audio", 57, "[Game.Environment] PostEvent", [
								"Event",
								e,
							]))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Audio",
							57,
							"[Game.Environment] 当前地图未配置重置音频事件",
						))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Audio",
					57,
					"[Game.Controller] AudioEnvironmentSubsystem 无效",
				);
	}
	static xIn(e) {
		var t;
		e
			? ((t = Math.trunc((e.HorizontalHitCount - 1) / 2)),
				Math.abs(this.PIn.DynamicReverbRtpc1 - t) > 0.01 &&
					((this.PIn.DynamicReverbRtpc1 = t),
					AudioSystem_1.AudioSystem.SetRtpcValue("reverb_azi_count", t)),
				(t = e.VerticalHitDistance),
				Math.abs(this.PIn.DynamicReverbRtpc2 - t) > 0.01 &&
					((this.PIn.DynamicReverbRtpc2 = t),
					AudioSystem_1.AudioSystem.SetRtpcValue(DYNAMIC_REVERB_RTPC_2, t)))
			: ((this.PIn.DynamicReverbRtpc1 = 0),
				(this.PIn.DynamicReverbRtpc2 = 0),
				AudioSystem_1.AudioSystem.SetRtpcValue("reverb_azi_count", 0),
				AudioSystem_1.AudioSystem.SetRtpcValue(DYNAMIC_REVERB_RTPC_2, 0));
	}
	static Rje(e) {
		var t = UE.KuroAudioStatics.GetAudioEnvironmentSubsystem(Info_1.Info.World);
		if (t?.IsValid()) {
			var o,
				n,
				a = t.GetEnvironmentStates(e);
			for ([o, n] of this.Aje.entries()) {
				var i = a.Get(o);
				i
					? (a.Remove(o),
						i !== n &&
							(this.Aje.set(o, i),
							UE.KuroAudioStatics.SetState(o, i),
							Log_1.Log.CheckInfo()) &&
							Log_1.Log.Info(
								"Audio",
								57,
								"[Game.Environment] SetState",
								["Group", o],
								["State", i],
							))
					: (this.Aje.delete(o),
						UE.KuroAudioStatics.SetState(o, "none"),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Audio",
								57,
								"[Game.Environment] SetState",
								["Group", o],
								["State", "none"],
							));
			}
			for (let e = 0; e < a.Num(); e++) {
				var r = a.GetKey(e),
					s = a.Get(r);
				s &&
					(this.Aje.set(r, s),
					UE.KuroAudioStatics.SetState(r, s),
					Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info(
						"Audio",
						57,
						"[Game.Environment] SetState",
						["Group", r],
						["State", s],
					);
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Audio",
					57,
					"[Game.Controller] AudioEnvironmentSubsystem 无效",
				);
	}
	static UpdateAudioState(e) {
		for (const t of e)
			t.ckn
				? UE.KuroAudioStatics.SetState(t.afs, t.ckn)
				: UE.KuroAudioStatics.SetState(t.afs, "none");
	}
}
(exports.GameAudioController = GameAudioController),
	((_a = GameAudioController).Pje = void 0),
	(GameAudioController.PIn = new EnvironmentCache()),
	(GameAudioController.Aje = new Map()),
	(GameAudioController.KDn = new StateRef_1.StateRef("weather_type", "none")),
	(GameAudioController.nye = () => {
		_a.WDn();
	}),
	(GameAudioController.Uje = () => {
		var e = ModelManager_1.ModelManager.GameModeModel?.MapConfig.MapId;
		(_a.Pje = e
			? ConfigManager_1.ConfigManager.AudioConfig?.GetMapConfig(e)
			: void 0),
			_a.Pje?.EnterEvent &&
				(AudioSystem_1.AudioSystem.PostEvent(_a.Pje.EnterEvent),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info("Audio", 57, "[Game.World] PostEvent", [
					"Event",
					_a.Pje.EnterEvent,
				]),
			_a.Pje?.Event &&
				(AudioSystem_1.AudioSystem.PostEvent(_a.Pje.Event),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info("Audio", 57, "[Game.World] PostEvent", [
					"Event",
					_a.Pje.Event,
				]);
	}),
	(GameAudioController.uMe = () => {
		_a.Pje?.Event &&
			(AudioSystem_1.AudioSystem.ExecuteAction(_a.Pje.Event, 0),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("Audio", 57, "[Game.World] StopEvent", [
				"Event",
				_a.Pje.Event,
			]),
			_a.Pje?.ExitEvent &&
				(AudioSystem_1.AudioSystem.PostEvent(_a.Pje.ExitEvent),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info("Audio", 57, "[Game.World] PostEvent", [
					"Event",
					_a.Pje.ExitEvent,
				]),
			(_a.Pje = void 0),
			AudioSystem_1.AudioSystem.PostEvent("on_world_cleanup");
	}),
	(GameAudioController.uht = () => {
		_a.WDn();
	}),
	(GameAudioController.dIe = () => {
		_a.WDn();
	}),
	(GameAudioController.PDn = (e) => {
		_a.UpdateAudioState(e.hfs);
	});
