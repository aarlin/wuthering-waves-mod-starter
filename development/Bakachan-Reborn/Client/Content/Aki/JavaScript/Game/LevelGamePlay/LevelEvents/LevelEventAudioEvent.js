"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventAudioEvent = void 0);
const AudioController_1 = require("../../../Core/Audio/AudioController"),
	Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAudioEvent extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, l) {
		var o;
		e &&
			((e = e.get("EventPath")),
			(o = Global_1.Global.BaseCharacter),
			AudioController_1.AudioController.PostEvent(e, o));
	}
}
exports.LevelEventAudioEvent = LevelEventAudioEvent;
