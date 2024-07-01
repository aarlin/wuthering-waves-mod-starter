"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayFlowBehaviorNode = void 0);
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class PlayFlowBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	get CorrelativeEntities() {}
	OnCreate(e) {
		return !!super.OnCreate(e) && "PlayFlow" === e.Condition.Type;
	}
}
exports.PlayFlowBehaviorNode = PlayFlowBehaviorNode;
