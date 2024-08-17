"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.noBroadCastBuff =
		exports.HANDLE_MASK =
		exports.BUFF_HANDLE_PREFIX_BYTE =
		exports.BUFF_HANDLE_ID_BYTE =
		exports.MIN_BUFF_EXECUTION_EFFECT_PERIOD =
		exports.MIN_BUFF_PERIOD =
		exports.INFINITY_DURATION =
		exports.SUCCESS_INSTANT_BUFF_HANDLE =
		exports.MIN_BUFF_REMAIN_DURATION =
		exports.NULL_INSTIGATOR_ID =
		exports.INVALID_BUFF_HANDLE =
		exports.USE_INTERNAL_DURATION =
		exports.DEFAULT_SERVER_GE_DURATION =
		exports.DEFAULT_GE_SERVER_ID =
		exports.DEFAULT_BUFF_LEVEL =
		exports.DYNAMIC_BUFF_ID =
		exports.NULL_BUFF_ID =
			void 0),
	(exports.NULL_BUFF_ID = 0),
	(exports.DYNAMIC_BUFF_ID = -3n),
	(exports.DEFAULT_BUFF_LEVEL = 1),
	(exports.DEFAULT_GE_SERVER_ID = -1),
	(exports.DEFAULT_SERVER_GE_DURATION = -1),
	(exports.USE_INTERNAL_DURATION = void 0),
	(exports.INVALID_BUFF_HANDLE = -1),
	(exports.NULL_INSTIGATOR_ID = 0),
	(exports.MIN_BUFF_REMAIN_DURATION = 1e-4),
	(exports.SUCCESS_INSTANT_BUFF_HANDLE = -2),
	(exports.INFINITY_DURATION = -1),
	(exports.MIN_BUFF_PERIOD = 0.034),
	(exports.MIN_BUFF_EXECUTION_EFFECT_PERIOD = 0.2),
	(exports.BUFF_HANDLE_ID_BYTE = 28),
	(exports.BUFF_HANDLE_PREFIX_BYTE = 4),
	(exports.HANDLE_MASK = (1 << exports.BUFF_HANDLE_ID_BYTE) - 1),
	(exports.noBroadCastBuff = new Set([
		BigInt(1201),
		BigInt(3015),
		BigInt(1101003010),
		BigInt(1101003012),
		BigInt(1101003013),
	]));
