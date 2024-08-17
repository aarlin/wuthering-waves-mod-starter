"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiViewStorage = void 0);
const Log_1 = require("../../Core/Common/Log");
class UiTsInfo {
	constructor() {
		(this.Ctor = void 0), (this.ResourceId = "");
	}
}
class UiViewStorage {
	static GetUiTsInfo(e) {
		return UiViewStorage.uCr.get(e);
	}
	static RegisterUiTsInfo(e) {
		for (const o of e) {
			var r = o[0];
			try {
				UiViewStorage.uCr.set(r, {
					Ctor: o[1],
					ResourceId: o[2],
					SourceType: o[3] ?? 0,
				});
			} catch (e) {
				e instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							17,
							"[RegisterUiTsInfo]流程执行异常 1",
							e,
							["error", e.message],
							["ViewName", r],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"[RegisterUiTsInfo]流程执行异常 2",
							["ViewName", r],
							["error", e],
						);
				continue;
			}
		}
	}
}
(exports.UiViewStorage = UiViewStorage).uCr = new Map();
