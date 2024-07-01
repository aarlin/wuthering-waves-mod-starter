"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditBattleTeamConfig = void 0);
const FightFormationById_1 = require("../../../Core/Define/ConfigQuery/FightFormationById"),
	InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class EditBattleTeamConfig extends ConfigBase_1.ConfigBase {
	GetDungeonConfig(e) {
		return InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e);
	}
	GetFightFormationConfig(e) {
		if (e) return FightFormationById_1.configFightFormationById.GetConfig(e);
	}
}
exports.EditBattleTeamConfig = EditBattleTeamConfig;
