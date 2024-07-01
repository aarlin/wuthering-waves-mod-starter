"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectModelAudioSpec = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	EffectAudioContext_1 = require("../EffectContext/EffectAudioContext"),
	EffectSpec_1 = require("./EffectSpec");
class EffectModelAudioSpec extends EffectSpec_1.EffectSpec {
	constructor() {
		super(...arguments),
			(this.ege = void 0),
			(this.zge = void 0),
			(this.Zge = void 0);
	}
	OnInit() {
		return (
			(this.ege = this.Handle?.GetSureEffectActor()),
			this.ege &&
				((this.zge = AudioSystem_1.AudioSystem.GetAkComponent(this.ege, {
					OnCreated: (e) => {
						var t = this.Handle?.GetContext();
						t instanceof EffectAudioContext_1.EffectAudioContext &&
							AudioSystem_1.AudioSystem.SetSwitch(
								"char_p1orp3",
								t.FromPrimaryRole ? "p1" : "p3",
								e,
							);
					},
				})),
				this.EffectModel?.LocationOffsets) &&
				0 < this.EffectModel.LocationOffsets.Num() &&
				this.zge?.SetLocationOffsets(this.EffectModel.LocationOffsets),
			!0
		);
	}
	OnPlay() {
		var e = this.EffectModel?.AudioEvent;
		e?.IsValid()
			? this.e0e(e)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Audio",
					57,
					"[Game.Effect] 无效的 AudioEvent",
					["EffectModel", this.EffectModel?.GetName()],
					["EffectActor", this.ege?.GetName()],
				);
	}
	OnClear() {
		return this.zge?.K2_DestroyComponent(this.ege), !0;
	}
	OnStop() {
		var e;
		this.EffectModel?.IsValid() &&
			(this.Zge &&
				!this.EffectModel.KeepAlive &&
				(AudioSystem_1.AudioSystem.ExecuteAction(this.Zge, 0, {
					TransitionDuration: this.EffectModel.FadeOutTime,
				}),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Audio",
						57,
						"[Game.Effect] StopEvent",
						["Handle", this.Zge],
						["EffectModel", this.EffectModel?.GetName()],
						["EffectActor", this.ege?.GetName()],
					),
				(this.Zge = void 0)),
			(e = this.EffectModel?.TrailingAudioEvent)?.IsValid()) &&
			this.e0e(e, !0);
	}
	e0e(e, t = !1) {
		(e = e.GetName()),
			this.zge &&
				(t
					? ((t = new UE.Transform(this.zge.K2_GetComponentLocation())),
						AudioSystem_1.AudioSystem.PostEvent(e, t))
					: (this.Zge = AudioSystem_1.AudioSystem.PostEvent(e, this.zge, {
							StopWhenOwnerDestroyed: !Info_1.Info.IsGameRunning(),
						})),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info(
					"Audio",
					57,
					"[Game.Effect] PostEvent",
					["EventName", e],
					["Handle", this.Zge],
					["EffectModel", this.EffectModel?.GetName()],
					["EffectActor", this.ege?.GetName()],
				);
	}
}
exports.EffectModelAudioSpec = EffectModelAudioSpec;
