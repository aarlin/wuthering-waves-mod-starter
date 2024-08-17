"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventChangeFightIntensity = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventChangeFightIntensity extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, t) {
		var n;
		e &&
			((n = e.get("FightIntensity")), (e = e.get("CreatureGen"))) &&
			n &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Level",
				3,
				"该功能已废弃。",
				["FightIntensity", n],
				["CreatureGenId", e],
			);
	}
}
exports.LevelEventChangeFightIntensity = LevelEventChangeFightIntensity;
