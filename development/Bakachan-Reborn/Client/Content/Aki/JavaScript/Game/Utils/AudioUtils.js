"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AudioUtils = void 0);
const Log_1 = require("../../Core/Common/Log"),
	ModelManager_1 = require("../Manager/ModelManager");
class AudioUtils {
	static HandleAudioBoxUpdate(e, o) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Audio",
				40,
				"[AudioBox] 更新音频盒子队列",
				["Type", o],
				["Box", e],
			),
			(e = ModelManager_1.ModelManager.AudioModel.UpdateAudioBoxQueue(e, o)) &&
				(o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
					e.PbDataId,
				)) &&
				(e = o.Entity.GetComponent(116)) &&
				e.PostAudioBoxEvent();
	}
}
exports.AudioUtils = AudioUtils;
