"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleFormationChildView = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
	BattleEntityChildView_1 = require("./BattleEntityChildView");
class BattleFormationChildView extends BattleEntityChildView_1.BattleEntityChildView {
	constructor() {
		super(...arguments), (this.FormationInstance = void 0);
	}
	OnActivate() {
		var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
			this.GetEntityId(),
			{ ParamType: 1 },
		);
		this.FormationInstance = t;
	}
	OnDeactivate() {
		this.FormationInstance = void 0;
	}
	GetFormationInstance() {
		return this.FormationInstance;
	}
	IsValid() {
		return !!super.IsValid() && void 0 !== this.FormationInstance;
	}
}
exports.BattleFormationChildView = BattleFormationChildView;
