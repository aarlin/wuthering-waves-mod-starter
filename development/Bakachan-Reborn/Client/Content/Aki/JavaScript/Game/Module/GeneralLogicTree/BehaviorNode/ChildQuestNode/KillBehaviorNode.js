"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KillBehaviorNode = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class KillBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	constructor() {
		super(...arguments), (this.xQt = void 0), (this.PQt = []), (this.$Qt = 0);
	}
	get CorrelativeEntities() {
		return this.PQt;
	}
	OnCreate(e) {
		if (!super.OnCreate(e)) return !1;
		if ("Kill" !== (e = e.Condition).Type) return !1;
		(this.TrackTextRuleInner = 1), (this.PQt = []);
		for (const t of e.ExistTargets) this.PQt.push(t);
		for (const t of e.TargetsToAwake) this.PQt.push(t);
		return (this.$Qt = e.ExistTargets.length + e.TargetsToAwake.length), !0;
	}
	OnUpdateProgress(e) {
		return (
			!!e.Hfs &&
			((this.xQt = e.Hfs),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.GeneralLogicTreeEntityKilled,
				this.NodeId,
				this.xQt.Jfs,
			),
			!0)
		);
	}
	GetProgress() {
		return this.IsSuccess
			? this.GetProgressMax()
			: this.xQt?.Jfs?.length.toString() ?? "0";
	}
	GetProgressMax() {
		return this.xQt ? this.xQt?.evs?.toString() ?? "0" : this.$Qt.toString();
	}
}
exports.KillBehaviorNode = KillBehaviorNode;
