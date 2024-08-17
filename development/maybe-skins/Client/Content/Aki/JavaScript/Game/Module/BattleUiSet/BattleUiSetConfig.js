"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiSetConfig = void 0);
const MobileBattleUiSetByPanelIndex_1 = require("../../../Core/Define/ConfigQuery/MobileBattleUiSetByPanelIndex"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class BattleUiSetConfig extends ConfigBase_1.ConfigBase {
	GetMobileBattleUiSetConfigList(e) {
		return MobileBattleUiSetByPanelIndex_1.configMobileBattleUiSetByPanelIndex.GetConfigList(
			e,
		);
	}
}
exports.BattleUiSetConfig = BattleUiSetConfig;
