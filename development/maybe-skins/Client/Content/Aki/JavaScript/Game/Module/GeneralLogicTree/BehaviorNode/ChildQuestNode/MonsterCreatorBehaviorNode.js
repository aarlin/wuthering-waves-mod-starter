"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterCreatorBehaviorNode = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class MonsterCreatorBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	constructor() {
		super(...arguments),
			(this.YQt = 0),
			(this.JQt = 0),
			(this.PQt = []),
			(this.zQt = !1),
			(this.ZQt = void 0);
	}
	get CorrelativeEntities() {
		return this.PQt;
	}
	OnCreate(e) {
		if (!super.OnCreate(e)) return !1;
		if (
			"MonsterCreator" !== (e = e.Condition).Type ||
			!e.MonsterCreatorEntityIds
		)
			return !1;
		(this.TrackTextRuleInner = 1), (this.PQt = []);
		for (const t of e.MonsterCreatorEntityIds) this.PQt.push(t);
		return (
			(this.zQt = e.ShowMonsterMergedHpBar ?? !1),
			(this.ZQt = e.TidMonsterGroupName),
			!(this.YQt = 0)
		);
	}
	OnUpdateProgress(e) {
		if (!e.Wfs) return !1;
		(this.YQt = 0), (this.JQt = e.Wfs.evs);
		for (const t of e.Wfs.ovs)
			(this.YQt += t.svs.length),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.GeneralLogicTreeEntityKilled,
					this.NodeId,
					t.svs,
				);
		return !0;
	}
	GetProgress() {
		return this.YQt.toString();
	}
	GetProgressMax() {
		return this.JQt.toString();
	}
	GetShowMonsterMergedHpBar() {
		return this.zQt;
	}
	GetTidMonsterGroupName() {
		return this.ZQt;
	}
	GetTest() {
		return this.PQt;
	}
}
exports.MonsterCreatorBehaviorNode = MonsterCreatorBehaviorNode;
