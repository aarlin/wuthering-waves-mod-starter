"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotSubtitleConfig =
		exports.SequenceEntityInfo =
		exports.MAX_FRAME =
		exports.DEFAULT_LAST_SUBTITLE_TIME =
		exports.PLOT_WAIT_ENTITY_TIME =
		exports.FEMALE_SEQ_MODEL_ID =
		exports.MALE_SEQ_MODEL_ID =
		exports.ABP_Mouth_Slot_Name =
		exports.ABP_Seq_Slot_Name =
		exports.ABP_Base_Name =
		exports.TALK_NPC_TAG =
		exports.CAMERA_TAG =
		exports.BOSS_TAG =
		exports.HERO_TAG =
		exports.FEMALE_TAG =
		exports.MALE_TAG =
		exports.FRAME_PER_MILLISECOND =
			void 0);
const UE = require("ue"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector");
(exports.FRAME_PER_MILLISECOND = 0.03),
	(exports.MALE_TAG = new UE.FName("Male")),
	(exports.FEMALE_TAG = new UE.FName("Female")),
	(exports.HERO_TAG = new UE.FName("Player")),
	(exports.BOSS_TAG = new UE.FName("BOSS")),
	(exports.CAMERA_TAG = new UE.FName("SequenceCamera")),
	(exports.TALK_NPC_TAG = new UE.FName("TalkNPC")),
	(exports.ABP_Base_Name = new UE.FName("ABP_Base")),
	(exports.ABP_Seq_Slot_Name = new UE.FName("KuroSequenceSlot")),
	(exports.ABP_Mouth_Slot_Name = new UE.FName("SeqMouth")),
	(exports.MALE_SEQ_MODEL_ID = 110004),
	(exports.FEMALE_SEQ_MODEL_ID = 110006),
	(exports.PLOT_WAIT_ENTITY_TIME = -1),
	(exports.DEFAULT_LAST_SUBTITLE_TIME = 1),
	(exports.MAX_FRAME = 9999999);
class SequenceEntityInfo {
	constructor(
		e = -1,
		t = -1,
		o = 0,
		s = !1,
		r = Vector_1.Vector.Create(),
		i = Rotator_1.Rotator.Create(),
		_ = !1,
	) {
		(this.MoveCompDisableHandle = e),
			(this.UeMoveCompDisableHandle = t),
			(this.CacheMovementMode = o),
			(this.CacheMovementSync = s),
			(this.CacheLocation = r),
			(this.CacheRotation = i),
			(this.CacheAiEnable = _);
	}
}
exports.SequenceEntityInfo = SequenceEntityInfo;
class PlotSubtitleConfig {
	constructor() {
		(this.Subtitles = void 0),
			(this.GuardTime = 0),
			(this.AudioDelay = 0),
			(this.AudioTransitionDuration = 0);
	}
	CopyFrom(e) {
		(this.Subtitles = e.Subtitles),
			(this.GuardTime = e.GuardTime),
			(this.AudioDelay = e.AudioDelay),
			(this.AudioTransitionDuration = e.AudioTransitionDuration);
	}
	Clear() {
		(this.Subtitles = void 0),
			(this.GuardTime = 0),
			(this.AudioDelay = 0),
			(this.AudioTransitionDuration = 0);
	}
}
exports.PlotSubtitleConfig = PlotSubtitleConfig;
