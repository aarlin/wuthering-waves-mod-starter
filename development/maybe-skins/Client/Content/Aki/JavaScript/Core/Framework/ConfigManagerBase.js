"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConfigManagerBase = void 0);
const Log_1 = require("../Common/Log");
class ConfigManagerBase {
	constructor() {}
	static Add(t) {
		this.pK.push(t);
	}
	static Init() {
		for (const t of this.pK)
			if (!t.Init())
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							1,
							"配置初始化失败，请往上查看具体出错模块日志解决问题",
							["config", t.constructor.name],
						),
					!1
				);
		return !0;
	}
	static Clear() {
		for (const t of this.pK)
			if (!t.Clear())
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							1,
							"配置清理失败，请往上查看具体出错模块日志解决问题",
							["config", t.constructor.name],
						),
					!1
				);
		return !(this.pK.length = 0);
	}
	static OnInit() {
		return !0;
	}
	static OnClear() {
		return !0;
	}
}
(exports.ConfigManagerBase = ConfigManagerBase).pK = [];
//# sourceMappingURL=ConfigManagerBase.js.map
