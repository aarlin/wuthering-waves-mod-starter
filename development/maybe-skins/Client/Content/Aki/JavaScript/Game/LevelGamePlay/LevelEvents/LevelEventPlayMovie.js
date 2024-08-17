"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventPlayMovie = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	VideoLauncher_1 = require("../../Module/Video/VideoLauncher"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayMovie extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, o) {
		(e = e.get("CgName"))
			? VideoLauncher_1.VideoLauncher.ShowVideoCg(e)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Video",
					17,
					"PlayMovie行为参数配错，请查阅行为类型的参数说明",
				);
	}
}
exports.LevelEventPlayMovie = LevelEventPlayMovie;
