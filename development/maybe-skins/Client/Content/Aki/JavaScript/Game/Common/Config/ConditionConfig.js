"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConditionConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ConditionById_1 = require("../../../Core/Define/ConfigQuery/ConditionById"),
	ConditionGroupById_1 = require("../../../Core/Define/ConfigQuery/ConditionGroupById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ConditionConfig extends ConfigBase_1.ConfigBase {
	GetConditionGroupConfig(o) {
		var n = ConditionGroupById_1.configConditionGroupById.GetConfig(o);
		if (n) return n;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("InstanceDungeon", 17, "获取条件组配置错误", [
				"conditionGroupId",
				o,
			]);
	}
	GetConditionConfig(o) {
		var n = ConditionById_1.configConditionById.GetConfig(o);
		if (n) return n;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("InstanceDungeon", 17, "获取条件配置错误", [
				"conditionId",
				o,
			]);
	}
	GetConditionConfigByType(o, n) {
		for (const e of this.GetConditionGroupConfig(o).GroupId) {
			var i = this.GetConditionConfig(e);
			if (n === i.Type) return i;
		}
	}
	GetGroupConditionIds(o) {
		return (o = this.GetConditionGroupConfig(o)) ? o.GroupId : [];
	}
}
exports.ConditionConfig = ConditionConfig;
