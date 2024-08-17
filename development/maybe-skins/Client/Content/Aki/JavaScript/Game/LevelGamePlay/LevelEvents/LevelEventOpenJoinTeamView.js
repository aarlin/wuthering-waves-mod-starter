"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventOpenJoinTeamView = void 0);
const JoinTeamController_1 = require("../../Module/JoinTeam/JoinTeamController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventOpenJoinTeamView extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, n) {
		e &&
			(e = (e = e.get("DescriptionId")) ? parseInt(e) : 0) &&
			JoinTeamController_1.JoinTeamController.OpenJoinTeamView(e);
	}
}
exports.LevelEventOpenJoinTeamView = LevelEventOpenJoinTeamView;
