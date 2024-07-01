"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UseItemBehaviorNode = void 0);
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class UseItemBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	constructor() {
		super(...arguments), (this.xQt = void 0);
	}
	get CorrelativeEntities() {}
	OnCreate(e) {
		return (
			!!super.OnCreate(e) &&
			"UseItem" === e.Condition.Type &&
			((this.TrackTextRuleInner = 1), !0)
		);
	}
	OnUpdateProgress(e) {
		return !!e.K4n && ((this.xQt = e.K4n), !0);
	}
	GetProgress() {
		return this.xQt?.I5n?.toString() ?? "0";
	}
}
exports.UseItemBehaviorNode = UseItemBehaviorNode;
