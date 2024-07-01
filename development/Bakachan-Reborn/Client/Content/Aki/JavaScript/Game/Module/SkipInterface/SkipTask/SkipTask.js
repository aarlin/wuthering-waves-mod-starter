"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkipTask = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log");
class SkipTask {
	constructor() {
		(this.cp = !1), (this.Lbi = void 0);
	}
	Initialize() {
		this.OnAddEvents(), this.OnInitialize();
	}
	Destroy() {
		this.pii(), this.OnDestroyed(), this.OnRemoveEvents();
	}
	Run(...i) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("SkipInterface", 8, "开始跳转任务", [
				"Name",
				this.constructor.name,
			]),
			this.fii(...i);
	}
	async AsyncRun(...i) {
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("SkipInterface", 8, "开始跳转任务", [
					"Name",
					this.constructor.name,
				]),
			(this.Lbi = new CustomPromise_1.CustomPromise()),
			this.fii(...i),
			this.Lbi.Promise
		);
	}
	GetIsRunning() {
		return this.cp;
	}
	Finish() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("SkipInterface", 8, "结束跳转任务", [
				"Name",
				this.constructor.name,
			]),
			this.Lbi && this.Lbi.SetResult(0),
			this.OnFinished(),
			this.pii();
	}
	Stop() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("SkipInterface", 8, "停止跳转任务", [
				"Name",
				this.constructor.name,
			]),
			this.Lbi && this.Lbi.SetResult(1),
			this.OnStopped(),
			this.pii();
	}
	fii(...i) {
		(this.cp = !0), this.OnRun(...i);
	}
	pii() {
		(this.cp = !1), (this.Lbi = void 0);
	}
	OnInitialize() {}
	OnRun() {}
	OnFinished() {}
	OnStopped() {}
	OnDestroyed() {}
	OnAddEvents() {}
	OnRemoveEvents() {}
}
exports.SkipTask = SkipTask;
