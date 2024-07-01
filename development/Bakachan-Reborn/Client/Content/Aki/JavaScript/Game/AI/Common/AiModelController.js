"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiModelController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	ModelManager_1 = require("../../Manager/ModelManager");
class AiModelController extends ControllerBase_1.ControllerBase {
	static get Model() {
		return ModelManager_1.ModelManager.AiModel;
	}
	static AddAiToTeam(e, r) {
		(e.AiTeam = this.Model.GetAiTeam(r)), e.AiTeam.AddMember(e);
	}
	static RemoveAiFromTeam(e) {
		var r = e.AiTeam;
		r && (r.RemoveMember(e), (e.AiTeam = void 0));
	}
	static OnTick(e) {
		for (var [, r] of (this.Model.AiScoreManager.Update(),
		this.Model.ActiveAiTeams))
			0 < r.TeamMemberToGroup.size && r.Tick();
		this.Dte();
	}
	static Dte() {
		for (var [, e] of this.Model.HatredGroups)
			for (const r of e)
				(r.CharAiDesignComp?.Valid && r.CharAiDesignComp.Entity.Valid) ||
					e.delete(r);
		for (var [, r] of this.Model.HatredGroups)
			for (const e of r)
				if (e.AiHateList.IsCurrentTargetInMaxArea) {
					var o = e.AiHateList.GetCurrentTarget().Id;
					for (const t of r) e !== t && t.AiHateList.SharedHatredTarget(o);
				}
	}
}
exports.AiModelController = AiModelController;
