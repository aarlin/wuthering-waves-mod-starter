"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BUFF_END_REMAINING_TIME =
		exports.DELAY_REFRESH_ELEMENT_BALL =
		exports.bossStateViewResourceIdMap =
		exports.hideInputTagMap =
		exports.UI_EFFECT_CUE_TYPE =
		exports.elementTagToElementType =
		exports.elementTypeToElementTag =
		exports.AREAL_BOX_WIETH_C =
		exports.AREAL_BOX_WIETH_B =
		exports.AREAL_BOX_WIETH_A =
		exports.SPECIAL_ENERGY_BAR_WIDTH =
		exports.INPUT_SKILL_ACTION_NUM =
		exports.CLAMP_RANGE =
		exports.REFRESH_POSITION_INTERVAL =
		exports.DAMAGE_VIEW_OFFSET_MIN_RATIO =
		exports.DAMAGE_VIEW_OFFSET_MAX_DISTANCE =
		exports.BE_HIT_DELAY =
		exports.CHANGE_COOLDOWN_LOOP_INTERVAL =
		exports.CHANGE_COOLDOWN_DELAY =
		exports.CHANGE_COOLDOWN_INTERVAL =
		exports.HEAD_STATE_RANGE =
		exports.SECOND_TO_MILLISECOND =
		exports.SKILL_COOLDOWN_LOOP_INTERVAL =
		exports.SKILL_COOLDOWN_DELAY =
		exports.SKILL_COOLDOWN_INTERVAL =
		exports.IMMUNITY_DAMAGE_TEXT =
		exports.ATK_DAMAGE_TEXT =
		exports.IMMUNITY_DAMAGE_TEXT_ID =
		exports.CURE_DAMAGE_TEXT =
		exports.DAMAGE_ANIMATION_MAX_LENGTH =
		exports.DAMAGE_RIGHT_RATIO =
		exports.DAMAGE_MIDDLE_RATIO =
		exports.DAMAGE_LEFT_RATIO =
			void 0),
	(exports.DAMAGE_LEFT_RATIO = 0.25),
	(exports.DAMAGE_MIDDLE_RATIO = 0.75),
	(exports.DAMAGE_RIGHT_RATIO = 1),
	(exports.DAMAGE_ANIMATION_MAX_LENGTH = 240),
	(exports.CURE_DAMAGE_TEXT = 8),
	(exports.IMMUNITY_DAMAGE_TEXT_ID = 9),
	(exports.ATK_DAMAGE_TEXT = 10),
	(exports.IMMUNITY_DAMAGE_TEXT = "Immune"),
	(exports.SKILL_COOLDOWN_INTERVAL = 100),
	(exports.SKILL_COOLDOWN_DELAY = 100),
	(exports.SKILL_COOLDOWN_LOOP_INTERVAL = 0.1),
	(exports.SECOND_TO_MILLISECOND = 1e3),
	(exports.HEAD_STATE_RANGE = 1e6),
	(exports.CHANGE_COOLDOWN_INTERVAL = 100),
	(exports.CHANGE_COOLDOWN_DELAY = 100),
	(exports.CHANGE_COOLDOWN_LOOP_INTERVAL = 0.1),
	(exports.BE_HIT_DELAY = 5e3),
	(exports.DAMAGE_VIEW_OFFSET_MAX_DISTANCE = 64e4),
	(exports.DAMAGE_VIEW_OFFSET_MIN_RATIO = 0.2),
	(exports.REFRESH_POSITION_INTERVAL = 1e3),
	(exports.CLAMP_RANGE = 130),
	(exports.INPUT_SKILL_ACTION_NUM = 6),
	(exports.SPECIAL_ENERGY_BAR_WIDTH = 440),
	(exports.AREAL_BOX_WIETH_A = 35.2),
	(exports.AREAL_BOX_WIETH_B = 123.2),
	(exports.AREAL_BOX_WIETH_C = 250),
	(exports.elementTypeToElementTag = new Map([
		[1, -1520065071],
		[2, 1781618160],
		[3, -448812252],
		[4, 237625775],
		[5, -1939505546],
		[6, -967538492],
	])),
	(exports.elementTagToElementType = new Map([
		[-1520065071, 1],
		[1781618160, 2],
		[-448812252, 3],
		[237625775, 4],
		[-1939505546, 5],
		[-967538492, 6],
	])),
	(exports.UI_EFFECT_CUE_TYPE = 2),
	(exports.hideInputTagMap = new Map([
		[4, -1823030825],
		[6, -1949137153],
		[7, -2112257652],
		[9, 1725229954],
		[5, 1381320300],
		[1, -571871026],
		[8, -800147974],
	])),
	(exports.bossStateViewResourceIdMap = new Map([
		[1, "UiItem_BossState_Prefab"],
	])),
	(exports.DELAY_REFRESH_ELEMENT_BALL = 3e3),
	(exports.BUFF_END_REMAINING_TIME = 2);
