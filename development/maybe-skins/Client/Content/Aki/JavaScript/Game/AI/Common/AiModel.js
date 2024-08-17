"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	AiTeam_1 = require("../Team/AiTeam"),
	ScoreUpdateManager_1 = require("./ScoreUpdateManager");
class AiModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.ActiveAiTeams = new Map()),
			(this.ActiveAiControllers = new Map()),
			(this.AiScoreManager = new ScoreUpdateManager_1.ScoreUpdateManager()),
			(this.HatredGroups = new Map()),
			(this.Lte = 0);
	}
	AddAiScore(e) {
		this.AiScoreManager.AddScore(e);
	}
	RemoveObject(e) {
		this.AiScoreManager.RemoveObject(e);
	}
	GetAiTeam(e = 1) {
		let t = this.ActiveAiTeams.get(e);
		return (
			t ||
				(((t = new AiTeam_1.AiTeam()).TeamId = ++this.Lte),
				t.Init(e),
				this.ActiveAiTeams.set(e, t)),
			t
		);
	}
	AddActiveAiController(e) {
		var t = e.CharAiDesignComp.Entity.Id;
		if (
			!this.ActiveAiControllers.has(t) &&
			(this.ActiveAiControllers.set(t, e), e.HatredGroupId)
		) {
			let t = this.HatredGroups.get(e.HatredGroupId);
			t || ((t = new Set()), this.HatredGroups.set(e.HatredGroupId, t)),
				t.add(e);
		}
	}
	RemoveActiveAiController(e) {
		this.ActiveAiControllers.delete(e.CharAiDesignComp.Entity.Id) &&
			e.HatredGroupId &&
			this.HatredGroups.get(e.HatredGroupId)?.delete(e);
	}
}
exports.AiModel = AiModel;
