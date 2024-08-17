"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CheckLevelPlayBehaviorNode = void 0);
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class CheckLevelPlayBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	constructor() {
		super(...arguments), (this.xQt = -0);
	}
	get CorrelativeEntities() {}
	OnCreate(e) {
		return (
			!!super.OnCreate(e) &&
			"CheckLevelPlay" === e.Condition.Type &&
			((this.xQt = 0), (this.TrackTextRuleInner = 1), !0)
		);
	}
	OnUpdateProgress(e) {
		return (this.xQt = e.Kfs ?? 0), !0;
	}
	GetProgress() {
		return this.xQt.toString();
	}
}
exports.CheckLevelPlayBehaviorNode = CheckLevelPlayBehaviorNode;
