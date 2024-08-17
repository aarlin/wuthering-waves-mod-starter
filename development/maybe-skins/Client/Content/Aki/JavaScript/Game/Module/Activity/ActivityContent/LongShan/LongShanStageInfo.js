"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LongShanStageInfo = void 0);
class LongShanStageInfo {
	constructor(o) {
		if (
			((this.ProtoStageInfo = void 0),
			(this.TaskInfoMap = new Map()),
			(this.ProtoStageInfo = o),
			this.ProtoStageInfo.V0s)
		)
			for (const t of o.V0s) this.TaskInfoMap.set(t.Ekn, t);
	}
}
exports.LongShanStageInfo = LongShanStageInfo;
