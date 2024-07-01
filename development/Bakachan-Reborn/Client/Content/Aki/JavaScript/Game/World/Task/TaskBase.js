"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TaskBase = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
class TaskBase {
	constructor(s, t, e) {
		(this.Name = s),
			(this.LogPrefix = ""),
			(this.InitHandle = t),
			(this.FinishedCallback = e),
			(this.XMr = new CustomPromise_1.CustomPromise());
	}
	SetLogPrefix(s) {
		this.LogPrefix = s;
	}
	Init() {
		return !(this.InitHandle && !this.InitHandle()) && this.OnInit();
	}
	get Promise() {
		return this.XMr.Promise;
	}
	async Run() {
		var s = await this.OnRun();
		return this.OnExit(), this.XMr.SetResult(s), s;
	}
	OnInit() {
		return !0;
	}
	OnExit() {}
}
exports.TaskBase = TaskBase;
