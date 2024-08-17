"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GetItemBehaviorNode = void 0);
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class GetItemBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	constructor() {
		super(...arguments), (this.xQt = void 0), (this.KQt = 0);
	}
	get CorrelativeEntities() {}
	OnCreate(e) {
		return (
			!!super.OnCreate(e) &&
			"GetItem" === e.Condition.Type &&
			((this.KQt = e.Condition.Items.length), (this.TrackTextRuleInner = 1), !0)
		);
	}
	OnUpdateProgress(e) {
		return (this.xQt = e.jfs), !0;
	}
	GetProgress() {
		return this.KQt.toString();
	}
	GetProgressMax() {
		return this.xQt?.a5n?.length.toString() ?? "0";
	}
}
exports.GetItemBehaviorNode = GetItemBehaviorNode;
