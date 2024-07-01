"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiPopFrameViewStorage = void 0);
class UiPopFrameViewStorage {
	static RegisterUiBehaviourPop(e, r) {
		UiPopFrameViewStorage.nCr.set(e, r);
	}
	static GetUiBehaviourPopInfo(e) {
		return UiPopFrameViewStorage.nCr.get(e);
	}
}
(exports.UiPopFrameViewStorage = UiPopFrameViewStorage).nCr = new Map();
