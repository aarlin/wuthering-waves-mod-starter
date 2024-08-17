"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ControllerManagerBase = void 0);
const Log_1 = require("../Common/Log"),
	Stats_1 = require("../Common/Stats"),
	TickSystem_1 = require("../Tick/TickSystem");
class ControllerManagerBase {
	constructor() {}
	static Add(o) {
		this.Controllers.set(o.name, o), o.SetControllerManager(this);
	}
	static Init() {
		for (const r of this.Controllers)
			try {
				r[1].Init() ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							1,
							"控制器初始化失败，请往上查看具体出错模块日志解决问题",
							["controller", r[0]],
						));
			} catch (o) {
				o instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							1,
							"控制器初始化执行异常",
							o,
							["error", o.message],
							["controller", r[0]],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							1,
							"控制器初始化执行异常",
							["error", o],
							["controller", r[0]],
						);
			}
	}
	static Tick(o) {
		for (const r of this.TickControllers)
			(TickSystem_1.TickSystem.IsPaused && !r.IsTickEvenPaused) ||
				(r.GetPerformanceStateObject(), r.Tick(o));
	}
	static AddTickController(o) {
		var r;
		this.TickControllers.push(o),
			Stats_1.Stat.Enable &&
				((r = o.prototype.constructor.name), o.SetPerformanceStateObject(r));
	}
	static Clear() {
		for (const r of this.Controllers)
			try {
				r[1].Clear() ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							1,
							"控制器清理失败，请往上查看具体出错模块日志解决问题",
							["controller", r[0]],
						));
			} catch (o) {
				o instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							1,
							"控制器清理执行异常",
							o,
							["error", o.message],
							["controller", r[0]],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							1,
							"控制器清理执行异常",
							["error", o],
							["controller", r[0]],
						);
			}
		this.OnClear() ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiCore",
					1,
					"控制器系统清理失败，请往上查看具体出错模块日志解决问题",
				)),
			this.Controllers.clear(),
			this.TickControllers.splice(0, this.TickControllers.length);
	}
	static Preload() {
		var o = new Array();
		for (const t of this.Controllers) {
			var r = t[1].Preload();
			r && o.push(r);
		}
		return o;
	}
	static LeaveLevel() {
		for (const r of this.Controllers)
			try {
				r[1].LeaveLevel() ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							1,
							"控制器退出关卡失败，请往上查看具体出错模块日志解决问题",
							["controller", r[0]],
						));
			} catch (o) {
				o instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							1,
							"控制器退出关卡执行异常",
							o,
							["error", o.message],
							["controller", r[0]],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							1,
							"控制器退出关卡执行异常",
							["error", o],
							["controller", r[0]],
						);
			}
		this.OnLeaveLevel() ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiCore",
					1,
					"控制器退出关卡失败，请往上查看具体出错模块日志解决问题",
				));
	}
	static ChangeMode() {
		for (const r of this.Controllers)
			try {
				r[1].ChangeMode() ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							3,
							"控制器退出模式失败，请往上查看具体出错模块日志解决问题",
							["controller", r[0]],
						));
			} catch (o) {
				o instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							1,
							"控制器退出模式执行异常",
							o,
							["error", o.message],
							["controller", r[0]],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							1,
							"控制器退出模式执行异常",
							["error", o],
							["controller", r[0]],
						);
			}
		this.OnChangeMode() ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiCore",
					3,
					"控制器退出模式失败，请往上查看具体出错模块日志解决问题",
				));
	}
	static GetControllerByName(o) {
		return this.Controllers.get(o);
	}
	static OnClear() {
		return !0;
	}
	static OnLeaveLevel() {
		return !0;
	}
	static OnChangeMode() {
		return !0;
	}
}
((exports.ControllerManagerBase = ControllerManagerBase).Controllers =
	new Map()),
	(ControllerManagerBase.TickControllers = new Array());
//# sourceMappingURL=ControllerManagerBase.js.map
