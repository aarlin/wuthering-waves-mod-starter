"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExternalSourcesPoolItem = exports.AudioPoolItem = void 0);
const Log_1 = require("../Common/Log"),
	Time_1 = require("../Common/Time");
class AudioPoolItem {
	constructor(t) {
		(this.AudioEvent = void 0),
			(this.UseTime = -0),
			(this.o8 = new Map()),
			(this.r8 = 0),
			(this.n8 = t),
			(this.UseTime = Time_1.Time.Now);
	}
	AddCallback(t) {
		return (
			this.o8 || (this.o8 = new Map()),
			this.r8++,
			this.o8.set(this.r8, t),
			this.r8
		);
	}
	DeleteCallback(t) {
		if (this.o8) {
			if (this.o8.has(t)) return this.o8.delete(t), !0;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Audio",
					22,
					"没有找到对应paramFlag的回调注册！",
					["callbackFlag", t],
					["Path", this.n8],
				);
		}
		return !1;
	}
	DoCallback() {
		if (this.o8) {
			for (var [, t] of this.o8) t();
			this.o8.clear();
		}
	}
	Destroy() {
		this.AudioEvent
			? (this.AudioEvent = void 0)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Audio", 22, "Destroy 没有找到对应AudioEvent对象！", [
					"Path",
					this.n8,
				]);
	}
}
exports.AudioPoolItem = AudioPoolItem;
class ExternalSourcesPoolItem {
	constructor(t) {
		(this.UseTime = -0),
			(this.s8 = void 0),
			(this.s8 = t),
			(this.UseTime = Time_1.Time.Now);
	}
	ClearData(t) {
		this.s8
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Audio",
						22,
						"ExternalSources资源存在，现在进行销毁",
						["Path", t],
					),
				(this.s8 = void 0))
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Audio", 22, "ExternalSources资源已经不存在", [
					"Path",
					t,
				]);
	}
}
exports.ExternalSourcesPoolItem = ExternalSourcesPoolItem;
//# sourceMappingURL=AudioPoolItem.js.map
