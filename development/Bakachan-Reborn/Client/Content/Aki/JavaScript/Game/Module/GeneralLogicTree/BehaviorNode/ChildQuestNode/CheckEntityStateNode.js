"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CheckEntityStateNode = void 0);
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class CheckEntityStateNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	constructor() {
		super(...arguments), (this.xQt = void 0), (this.PQt = []);
	}
	get CorrelativeEntities() {
		return this.PQt;
	}
	OnCreate(t) {
		if (!super.OnCreate(t)) return !1;
		if ("CheckEntityState" !== (t = t.Condition).Type) return !1;
		if (t.Conditions) {
			this.PQt = [];
			for (const e of t.Conditions) this.PQt.push(e.EntityId);
		}
		return (this.TrackTextRuleInner = 1), !0;
	}
	OnUpdateProgress(t) {
		return !!t.Yfs && ((this.xQt = t.Yfs), !0);
	}
	GetProgress() {
		return this.xQt?.rkn?.length.toString() ?? "0";
	}
	GetProgressMax() {
		return this.PQt?.length.toString() ?? "0";
	}
}
exports.CheckEntityStateNode = CheckEntityStateNode;
