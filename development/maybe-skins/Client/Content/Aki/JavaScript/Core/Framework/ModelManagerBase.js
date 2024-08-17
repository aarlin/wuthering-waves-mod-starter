"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ModelManagerBase = void 0);
const Log_1 = require("../Common/Log");
class ModelManagerBase {
	constructor() {}
	static Add(t) {
		this.MK.push(t);
	}
	static Init() {
		for (const t of this.MK)
			if (!t.Init())
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							1,
							"模块初始化失败，请往上查看具体出错模块日志解决问题",
							["model", t.constructor.name],
						),
					!1
				);
		return !0;
	}
	static Clear() {
		for (const t of this.MK)
			if (!t.Clear())
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							1,
							"模块清理失败，请往上查看具体出错模块日志解决问题",
							["model", t.constructor.name],
						),
					!1
				);
		return !(this.MK.length = 0);
	}
	static LeaveLevel() {
		for (const t of this.MK)
			if (!t.LeaveLevel())
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							1,
							"模块系统退出关卡失败，请往上查看具体出错模块日志解决问题",
							["model", t.constructor.name],
						),
					!1
				);
		return (
			!!this.OnLeaveLevel() ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiCore",
					1,
					"模块系统退出关卡失败，请往上查看具体出错模块日志解决问题",
				),
			!1)
		);
	}
	static ChangeMode() {
		for (const t of this.MK)
			if (!t.ChangeMode())
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							3,
							"模块系统退出模式失败，请往上查看具体出错模块日志解决问题",
							["model", t.constructor.name],
						),
					!1
				);
		return (
			!!this.OnChangeMode() ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiCore",
					3,
					"模块系统退出模式失败，请往上查看具体出错模块日志解决问题",
				),
			!1)
		);
	}
	static OnInit() {
		return !0;
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
(exports.ModelManagerBase = ModelManagerBase).MK = [];
//# sourceMappingURL=ModelManagerBase.js.map
