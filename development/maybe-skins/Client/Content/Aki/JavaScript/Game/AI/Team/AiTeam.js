"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiTeam = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	BlackboardController_1 = require("../../World/Controller/BlackboardController"),
	AiScheduleGroup_1 = require("./AiScheduleGroup");
class AiTeam {
	constructor() {
		(this.TeamId = 0),
			(this.TeamMemberToGroup = new Map()),
			(this.AiTeamLevel = void 0),
			(this.AiTeamAreas = void 0),
			(this.AiTeamAttacks = void 0),
			(this.AreaCharTypeToPriority = new Array()),
			(this.xse = new Map()),
			(this.xie = (e, t) => {
				var r;
				t &&
					(r = this.xse.get(t)) &&
					(this.xse.delete(t), this.xse.set(e, r), (r.Target = e));
			});
	}
	Init(e) {
		ConfigManager_1.ConfigManager.AiConfig.LoadAiTeamConfigNew(this, e),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			);
		for (const e of this.AiTeamAreas) {
			var t = new Map();
			this.AreaCharTypeToPriority.push(t);
			let r = 0;
			for (const o of e.CharTypes) t.set(o, ++r);
		}
	}
	Clear() {
		this.TeamMemberToGroup.clear(),
			this.xse.clear(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			);
	}
	AddMember(e) {
		this.TeamMemberToGroup.set(e, void 0);
	}
	RemoveMember(e) {
		if (this.TeamMemberToGroup.delete(e))
			for (var [, t] of this.xse) t.Remove(e);
	}
	Tick() {
		for (var [, e] of (this.wse(), this.xse)) e.ScheduleGroup();
	}
	wse() {
		for (var [, e] of this.xse) e.CheckTargetAndRemove();
		for (var [t] of this.TeamMemberToGroup) {
			var r = t.AiHateList.GetCurrentTarget();
			if (r?.Valid) {
				var o = r?.Entity?.GetComponent(1);
				if (o)
					if (
						o.CreatureData.GetEntityType() !==
						Protocol_1.Aki.Protocol.wks.Proto_Player
					)
						BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
							t.CharAiDesignComp.Entity.Id,
							"TeamAttacker",
							!0,
						),
							this.TeamMemberToGroup.set(t, void 0);
					else {
						let e = this.xse.get(r);
						e ||
							((e = new AiScheduleGroup_1.AiScheduleGroup(this, r)),
							this.xse.set(r, e)),
							e.TryAdd(t),
							this.TeamMemberToGroup.set(t, e);
					}
			} else this.TeamMemberToGroup.set(t, void 0);
		}
		for (var [i, a] of this.xse) a.IsEmpty() && this.xse.delete(i);
	}
	GetAiTeamAreaMemberData(e) {
		return this.TeamMemberToGroup.get(e)?.GetMemberData(e);
	}
}
exports.AiTeam = AiTeam;
