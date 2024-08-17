"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LogCaptureController = void 0);
const Info_1 = require("./Info");
class LogCaptureController {
	static AddCaptureCallback(o) {
		return o.Callback
			? (LogCaptureController._A++,
				(LogCaptureController.RegisterCapture[o.LogLevel] = !0),
				LogCaptureController.l9.set(LogCaptureController._A, o),
				LogCaptureController._9.get(o.LogLevel) ||
					LogCaptureController._9.set(o.LogLevel, new Set()),
				LogCaptureController._9.get(o.LogLevel).add(LogCaptureController._A),
				LogCaptureController._A)
			: 0;
	}
	static RemoveCaptureCallback(o) {
		var r;
		LogCaptureController.l9.has(o) &&
			((r = LogCaptureController.l9.get(o).LogLevel),
			LogCaptureController._9.get(r).delete(o),
			LogCaptureController.l9.delete(o),
			(LogCaptureController.RegisterCapture[r] =
				0 !== LogCaptureController.l9.size));
	}
	static LogCapture(o, r, e, t, l) {
		if (
			LogCaptureController.RegisterCapture[o] &&
			Info_1.Info.IsBuildDevelopmentOrDebug &&
			LogCaptureController._9.get(o)
		)
			for (const C of LogCaptureController._9.get(o))
				LogCaptureController.l9.get(C)?.Callback(r, e, t, l);
	}
}
((exports.LogCaptureController = LogCaptureController)._A = 0),
	(LogCaptureController.RegisterCapture = []),
	(LogCaptureController.l9 = new Map()),
	(LogCaptureController._9 = new Map());
//# sourceMappingURL=LogCaptureController.js.map
