"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FoleySynthModel2Handler = exports.FoleySynthModel1Handler = void 0);
const AudioController_1 = require("../../../../../../../Core/Audio/AudioController"),
	Log_1 = require("../../../../../../../Core/Common/Log"),
	FoleySynthHandlerBase_1 = require("./FoleySynthHandlerBase");
class FoleySynthModel1Handler extends FoleySynthHandlerBase_1.FoleySynthHandlerBase {
	OnInit(o) {
		for (const e of o) this.FoleySynthModelConfigs.push(e);
	}
	OnParseBoneSpeedForAudio() {
		let o = 0,
			e = 0;
		for (let r = 0; r < this.FoleySynthModelConfigs.length; ++r) {
			var t = this.FoleySynthRecordsModel[this.RecordIndex][r].Speed,
				n = this.FoleySynthModelDynamicConfigs[r].State,
				l = this.FoleySynthModelConfigs[r];
			switch (n) {
				case -1:
					t > l.Ceil
						? (AudioController_1.AudioController.PostEventByComponent(
								l.CeilEvent,
								this.UeAkComp,
							),
							(this.FoleySynthModelDynamicConfigs[r].State = 1),
							(o = t),
							(e = l.CeilInterpolation),
							this.IsDebug &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Audio",
									58,
									"-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息",
									["Model", this.constructor?.name],
									["Actor", this.ActorComp.Actor.GetName()],
									["Event", l.CeilEvent],
								))
						: t < l.Floor &&
							(AudioController_1.AudioController.PostEventByComponent(
								l.FloorEvent,
								this.UeAkComp,
							),
							(this.FoleySynthModelDynamicConfigs[r].State = 0),
							(o = 0),
							(e = l.FloorInterpolation),
							this.IsDebug) &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Audio",
								58,
								"-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息",
								["Model", this.constructor?.name],
								["Actor", this.ActorComp.Actor.GetName()],
								["Event", l.FloorEvent],
							),
						this.UeAkComp.SetRTPCValue(l.Rtpc, o, e, "");
					break;
				case 0:
					t > l.Ceil
						? (AudioController_1.AudioController.PostEventByComponent(
								l.CeilEvent,
								this.UeAkComp,
							),
							(this.FoleySynthModelDynamicConfigs[r].State = 1),
							(o = t),
							(e = l.CeilInterpolation),
							this.UeAkComp.SetRTPCValue(l.Rtpc, o, e, ""),
							this.IsDebug &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Audio",
									58,
									"-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息",
									["Model", this.constructor?.name],
									["Actor", this.ActorComp.Actor.GetName()],
									["Event", l.CeilEvent],
								))
						: ((o = 0), (e = l.FloorInterpolation));
					break;
				case 1:
					t < l.Floor
						? (AudioController_1.AudioController.PostEventByComponent(
								l.FloorEvent,
								this.UeAkComp,
							),
							(this.FoleySynthModelDynamicConfigs[r].State = 0),
							(o = 0),
							(e = l.FloorInterpolation),
							this.UeAkComp.SetRTPCValue(l.Rtpc, o, e, ""),
							this.IsDebug &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Audio",
									58,
									"-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息",
									["Model", this.constructor?.name],
									["Actor", this.ActorComp.Actor.GetName()],
									["Event", l.FloorEvent],
								))
						: ((o = t),
							(e = l.CeilInterpolation),
							this.UeAkComp.SetRTPCValue(l.Rtpc, o, e, ""));
			}
		}
		this.IsDebug &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Audio",
				58,
				"-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息",
				["Model", this.constructor?.name],
				["Actor", this.ActorComp.Actor.GetName()],
				["rtpcSpeed", o],
				["interpolation", e],
			);
	}
}
exports.FoleySynthModel1Handler = FoleySynthModel1Handler;
class FoleySynthModel2Handler extends FoleySynthHandlerBase_1.FoleySynthHandlerBase {
	constructor() {
		super(...arguments), (this.VelocityMaxCount = 0), (this.y$o = new Array());
	}
	OnInit(o) {
		for (const e of o) this.FoleySynthModelConfigs.push(e), this.y$o.push(-1);
	}
	OnParseBoneSpeedForAudio() {
		var o = [],
			e = [];
		for (let t = 0; t < this.FoleySynthModelConfigs.length; ++t)
			o.push(0), e.push(0);
		for (let i = 0; i < this.FoleySynthModelConfigs.length; ++i)
			if (-1 === this.y$o[i]) {
				var t = this.FoleySynthModelConfigs[i];
				if (this.GetCurrentRecord(i).Speed > t.Ceil) {
					AudioController_1.AudioController.PostEventByComponent(
						t.CeilEvent,
						this.UeAkComp,
					),
						this.IsDebug &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Audio",
								58,
								"-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息",
								["Model", this.constructor?.name],
								["Actor", this.ActorComp.Actor.GetName()],
								["Event", t.CeilEvent],
							);
					for (let o = 0; o < this.RecordCount; ++o) {
						var n = this.FoleySynthRecordsModel[o][i].Acceleration;
						n > e[i] && (e[i] = n);
					}
					for (let e = 0; e < this.VelocityMaxCount; ++e) {
						var l = this.GetPreRecordIndex(e);
						(l = this.FoleySynthRecordsModel[l][i].Speed) > o[i] && (o[i] = l);
					}
					this.UeAkComp.SetRTPCValue(t.RtpcVelMax, o[i], 0, ""),
						this.UeAkComp.SetRTPCValue(t.RtpcAccMax, e[i], 0, ""),
						(this.y$o[i] = o[i]);
				}
			} else {
				t = this.FoleySynthModelConfigs[i];
				var r = this.GetCurrentRecord(i).Speed;
				r < t.Floor || r < this.y$o[i] * t.FloorPrecent
					? (AudioController_1.AudioController.PostEventByComponent(
							t.FloorEvent,
							this.UeAkComp,
						),
						this.IsDebug &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Audio",
								58,
								"-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息",
								["Model", this.constructor?.name],
								["Actor", this.ActorComp.Actor.GetName()],
								["Event", t.FloorEvent],
							),
						this.UeAkComp.SetRTPCValue(
							t.RtpcVelDur,
							r,
							t.FloorInterpolation,
							"",
						),
						(this.y$o[i] = -1))
					: this.UeAkComp.SetRTPCValue(
							t.RtpcVelDur,
							r,
							t.CeilInterpolation,
							"",
						);
			}
	}
}
exports.FoleySynthModel2Handler = FoleySynthModel2Handler;
