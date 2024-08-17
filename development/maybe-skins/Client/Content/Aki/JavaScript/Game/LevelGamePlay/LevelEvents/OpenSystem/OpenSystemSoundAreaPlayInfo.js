"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemSoundAreaPlayInfo = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemSoundAreaPlayInfo extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, r) {
		return (
			!!e.BoardId &&
			ControllerHolder_1.ControllerHolder.SoundAreaPlayTipsController.OpenSoundAreaPlayTips(
				e.BoardId,
			)
		);
	}
	GetViewName(e) {
		return "SoundAreaPlayTips";
	}
}
exports.OpenSystemSoundAreaPlayInfo = OpenSystemSoundAreaPlayInfo;
