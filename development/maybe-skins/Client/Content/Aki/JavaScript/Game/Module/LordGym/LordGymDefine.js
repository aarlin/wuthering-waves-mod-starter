"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NONE_FILTER_TYPE = exports.LordGymChallengeRecord = void 0);
class LordGymChallengeRecord {
	constructor() {
		this.Uc = new Map();
	}
	GetLordChallengeRecord(e, r) {
		if (this.Uc.has(e)) return this.Uc.get(e)[r];
	}
}
(exports.LordGymChallengeRecord = LordGymChallengeRecord),
	(exports.NONE_FILTER_TYPE = 0);
