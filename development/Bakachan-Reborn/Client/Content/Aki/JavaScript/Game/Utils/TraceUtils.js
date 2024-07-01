"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TraceUtils = void 0);
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager"),
	PROFILE_KEY = "TraceUtil";
class TraceUtils {
	static LineTraceWithLocation(e, a, o) {
		((e =
			((a =
				((t =
					ModelManager_1.ModelManager.TraceElementModel
						.CommonStartLocation).Set(e.X, e.Y, e.Z + a),
				ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation)).Set(
				e.X,
				e.Y,
				e.Z + o,
			),
			ModelManager_1.ModelManager.TraceElementModel.GetLineTrace())).WorldContextObject =
			GlobalData_1.GlobalData.World),
			e.ActorsToIgnore.Empty(),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, t),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, a),
			(o = TraceElementCommon_1.TraceElementCommon.LineTrace(e, "TraceUtil"));
		var t = e.HitResult;
		return e.ClearCacheData(), [o, t];
	}
}
exports.TraceUtils = TraceUtils;
