"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionConfig = void 0);
const FunctionConditionByFunctionId_1 = require("../../../Core/Define/ConfigQuery/FunctionConditionByFunctionId"),
	FunctionMenuAll_1 = require("../../../Core/Define/ConfigQuery/FunctionMenuAll"),
	FunctionMenuByFunctionId_1 = require("../../../Core/Define/ConfigQuery/FunctionMenuByFunctionId"),
	PlayerExpByPlayerLevel_1 = require("../../../Core/Define/ConfigQuery/PlayerExpByPlayerLevel"),
	PlayerExpByPlayerLevelArea_1 = require("../../../Core/Define/ConfigQuery/PlayerExpByPlayerLevelArea"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class FunctionConfig extends ConfigBase_1.ConfigBase {
	OnInit() {
		return !0;
	}
	OnClear() {
		return !0;
	}
	GetRangePlayerExpConfig(e, n) {
		return PlayerExpByPlayerLevelArea_1.configPlayerExpByPlayerLevelArea.GetConfigList(
			e,
			n,
		);
	}
	GetPlayerLevelConfig(e) {
		return PlayerExpByPlayerLevel_1.configPlayerExpByPlayerLevel.GetConfig(e);
	}
	GetAllFunctionList() {
		return FunctionMenuAll_1.configFunctionMenuAll.GetConfigList();
	}
	GetFunctionConfig(e) {
		return FunctionMenuByFunctionId_1.configFunctionMenuByFunctionId.GetConfig(
			e,
		);
	}
	GetFunctionCondition(e) {
		return FunctionConditionByFunctionId_1.configFunctionConditionByFunctionId.GetConfig(
			e,
		);
	}
	GetDifferenceExp(e, n, i, o) {
		let r = 0;
		for (const n of PlayerExpByPlayerLevelArea_1.configPlayerExpByPlayerLevelArea.GetConfigList(
			e,
			i,
		))
			r += n.PlayerExp;
		return r - n + o;
	}
}
exports.FunctionConfig = FunctionConfig;
