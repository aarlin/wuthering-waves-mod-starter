"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AudioPool = void 0);
const UE = require("ue"),
	Log_1 = require("../Common/Log"),
	Time_1 = require("../Common/Time"),
	ResourceSystem_1 = require("../Resource/ResourceSystem"),
	StringUtils_1 = require("../Utils/StringUtils"),
	AudioPoolItem_1 = require("./AudioPoolItem");
class AudioPool {
	constructor() {
		(this.J6 = 1e4),
			(this.z6 = 12e4),
			(this.Z6 = new Map()),
			(this.e8 = 0),
			(this.t8 = new Map());
	}
	GetAudioPool(e, o = !0) {
		var t = this.Z6.get(e);
		if (t) return t.AudioEvent;
		o &&
			(this.Z6.set(e, new AudioPoolItem_1.AudioPoolItem(e)),
			this.i8(e, (o) => {
				var t = this.Z6.get(e);
				t
					? ((t.AudioEvent = o), t.DoCallback())
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Audio",
							22,
							"GetAudioPool 没有找到对应路径的音效缓存！",
							["path", e],
						);
			}));
	}
	AddCallbackToLoad(o, t) {
		var e = this.Z6.get(o);
		if (e) return e.AddCallback(t);
		Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"Audio",
				22,
				"AddCallbackToLoad 没有找到对应路径的音效缓存！",
				["path", o],
			);
	}
	LoadAndAddCallback(e, o, t) {
		let i = this.Z6.get(e);
		i || ((i = new AudioPoolItem_1.AudioPoolItem(e)), this.Z6.set(e, i));
		o = i.AddCallback(o);
		t && t.AddCallbackId(o),
			this.i8(e, (o) => {
				var t = this.Z6.get(e);
				t
					? ((t.AudioEvent = o), t.DoCallback())
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Audio",
							34,
							"LoadAndAddCallback 没有找到对应路径的音效缓存！",
							["path", e],
						);
			});
	}
	DeleteCallback(o, t) {
		var e = this.Z6.get(o);
		e
			? e.DeleteCallback(t)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Audio",
					22,
					"DeleteCallback 没有找到对应路径的音效缓存！",
					["path", o],
				);
	}
	SetPlayFlag(o) {
		var t = this.Z6.get(o);
		t
			? (t.UseTime = Time_1.Time.Now)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Audio",
					22,
					"SetPlayFlag 没有找到对应路径的音效缓存！",
					["path", o],
				);
	}
	Tick(o) {
		if (((this.e8 += o), this.e8 > this.J6)) {
			this.e8 = 0;
			var t,
				e,
				i,
				s,
				a = Time_1.Time.Now;
			for ([t, e] of this.Z6)
				a - e.UseTime >= this.z6 && (e.Destroy(), this.Z6.delete(t));
			for ([i, s] of this.t8)
				a - s.UseTime >= this.z6 && (s.ClearData(i), this.t8.delete(i));
		}
	}
	i8(t, e) {
		StringUtils_1.StringUtils.IsNothing(t)
			? e(void 0)
			: ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AkAudioEvent, (o) => {
					o?.IsValid() ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Audio",
								22,
								"音效加载资源失败：",
								["eventPath: ", t],
								["time: ", Time_1.Time.Now],
							)),
						e(o);
				});
	}
	AddExternalSources(o, t) {
		this.t8.get(o) ||
			((t = new AudioPoolItem_1.ExternalSourcesPoolItem(t)), this.t8.set(o, t));
	}
	SetExternalSourcesPlayFlag(o) {
		var t = this.t8.get(o);
		t
			? (t.UseTime = Time_1.Time.Now)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Audio",
					22,
					"SetExternalSourcesPlayFlag 没有找到对应路径的ExternalSources音效缓存！",
					["path", o],
				);
	}
}
exports.AudioPool = AudioPool;
//# sourceMappingURL=AudioPool.js.map
