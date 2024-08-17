"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConfigUtil = void 0);
const Log_1 = require("../../../Core/Common/Log");
class ConfigUtil {
	static Qbo(o) {
		o.size > ConfigUtil.Xbo && o.clear();
	}
	static GetConfigTemplate(o, e, t, i = 0) {
		var r = o.get(t);
		return (
			r ||
			(ConfigUtil.Qbo(o),
			r
				? (o.set(t, r), r)
				: void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Config",
							11,
							"表格查询不到配置ID",
							["表格", e],
							["ID", t],
						)
					))
		);
	}
}
(exports.ConfigUtil = ConfigUtil).Xbo = 50;
