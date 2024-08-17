"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HotFixUtils = void 0);
const Log_1 = require("../../Core/Common/Log");
class HotFixUtils {
	static EvalScript(script) {
		try {
			const ret = String(eval(script));
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Game", 20, "script evaluated", ["result", ret]);
		} catch (r) {
			r instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"Game",
						20,
						"evaluate script error",
						r,
						["err", r.name],
						["msg", r.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Game", 20, "evaluate script error", [
						"error",
						String(r),
					]);
		}
	}
}
exports.HotFixUtils = HotFixUtils;
