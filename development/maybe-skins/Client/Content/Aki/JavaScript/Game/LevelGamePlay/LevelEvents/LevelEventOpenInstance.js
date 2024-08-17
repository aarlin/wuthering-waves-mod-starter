"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventOpenInstance = void 0);
const EditBattleTeamController_1 = require("../../Module/EditBattleTeam/EditBattleTeamController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventOpenInstance extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, t) {
		e &&
			(e = (e = e.get("InstanceId")) ? parseInt(e) : 0) &&
			EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
				e,
			);
	}
}
exports.LevelEventOpenInstance = LevelEventOpenInstance;
