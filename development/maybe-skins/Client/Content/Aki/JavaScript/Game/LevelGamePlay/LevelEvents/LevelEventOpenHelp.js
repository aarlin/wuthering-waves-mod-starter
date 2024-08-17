"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventOpenHelp = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	HelpController_1 = require("../../Module/Help/HelpController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventOpenHelp extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, l) {
		var r;
		e &&
			((r = (e = e.get("HelpGroupId")) ? parseInt(e) : 0) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						17,
						"显示帮助提示事件执行失败，参数解析错误！",
						["helpGroupIdParam", e],
					)),
			HelpController_1.HelpController.OpenHelpById(r));
	}
}
exports.LevelEventOpenHelp = LevelEventOpenHelp;
