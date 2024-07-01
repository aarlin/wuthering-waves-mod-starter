"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	RoleSkillInputById_1 = require("../../../Core/Define/ConfigQuery/RoleSkillInputById"),
	SkillById_1 = require("../../../Core/Define/ConfigQuery/SkillById"),
	SkillBySkillGroupId_1 = require("../../../Core/Define/ConfigQuery/SkillBySkillGroupId"),
	SkillConditionById_1 = require("../../../Core/Define/ConfigQuery/SkillConditionById"),
	SkillDescriptionById_1 = require("../../../Core/Define/ConfigQuery/SkillDescriptionById"),
	SkillDescriptionBySkillLevelGroupId_1 = require("../../../Core/Define/ConfigQuery/SkillDescriptionBySkillLevelGroupId"),
	SkillInputById_1 = require("../../../Core/Define/ConfigQuery/SkillInputById"),
	SkillLevelBySkillLevelGroupId_1 = require("../../../Core/Define/ConfigQuery/SkillLevelBySkillLevelGroupId"),
	SkillLevelBySkillLevelGroupIdAndSkillId_1 = require("../../../Core/Define/ConfigQuery/SkillLevelBySkillLevelGroupIdAndSkillId"),
	SkillTreeById_1 = require("../../../Core/Define/ConfigQuery/SkillTreeById"),
	SkillTreeByNodeGroup_1 = require("../../../Core/Define/ConfigQuery/SkillTreeByNodeGroup"),
	SkillTreeByNodeGroupAndNodeIndex_1 = require("../../../Core/Define/ConfigQuery/SkillTreeByNodeGroupAndNodeIndex"),
	SkillTypeById_1 = require("../../../Core/Define/ConfigQuery/SkillTypeById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RoleSkillConfig extends ConfigBase_1.ConfigBase {
	GetSkillConfigById(e) {
		var l = SkillById_1.configSkillById.GetConfig(e);
		return (
			void 0 === l &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 11, "当前选中的技能配置为空", ["id", e]),
			l
		);
	}
	GetSkillLevelConfigByGroupIdAndLevel(e, l) {
		var i =
			SkillLevelBySkillLevelGroupIdAndSkillId_1.configSkillLevelBySkillLevelGroupIdAndSkillId.GetConfig(
				e,
				l,
			);
		return (
			void 0 === i &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Role",
					11,
					"技能配置为空",
					["skillLevelGroupId", e],
					["level", l],
				),
			i
		);
	}
	GetSkillLevelConfigList(e) {
		return SkillLevelBySkillLevelGroupId_1.configSkillLevelBySkillLevelGroupId.GetConfigList(
			e,
		);
	}
	GetSkillTypeNameLocalText(e) {
		if ((e = SkillTypeById_1.configSkillTypeById.GetConfig(e)))
			return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.TypeName);
	}
	GetSkillList(e) {
		return SkillBySkillGroupId_1.configSkillBySkillGroupId.GetConfigList(e);
	}
	GetSkillTreeNode(e) {
		var l = SkillTreeById_1.configSkillTreeById.GetConfig(e);
		return (
			void 0 === l &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 44, "技能树配置为空，Id = ", ["nodeId", e]),
			l
		);
	}
	GetSkillTreeNodeListByGroupId(e) {
		return SkillTreeByNodeGroup_1.configSkillTreeByNodeGroup.GetConfigList(e);
	}
	GetSkillTreeNodeByGroupIdAndIndex(e, l) {
		var i =
			SkillTreeByNodeGroupAndNodeIndex_1.configSkillTreeByNodeGroupAndNodeIndex.GetConfig(
				e,
				l,
			);
		return (
			void 0 === i &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Role",
					44,
					"技能树配置为空，NodeGroup = " + e + ", NodeIndex = " + l,
				),
			i
		);
	}
	GetSkillTreeNodeByGroupIdAndSkillId(e, l) {
		if (void 0 !== (e = this.GetSkillTreeNodeListByGroupId(e)))
			return e.find((e) => e.SkillId === l);
	}
	GetSkillConditionById(e) {
		var l = SkillConditionById_1.configSkillConditionById.GetConfig(e);
		return (
			void 0 === l &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 44, "技能条件配置为空，Id = ", [
					"skillConditionId",
					e,
				]),
			l
		);
	}
	GetRoleSkillTreeConsume(e, l) {
		if ((e = this.GetSkillTreeNode(e))) {
			var i = e.SkillId;
			if (!i || 0 === i) return e.Consume;
			if (
				(e = this.GetSkillConfigById(i)) &&
				(i = e.SkillLevelGroupId) &&
				0 !== i
			)
				return this.GetSkillLevelConfigByGroupIdAndLevel(i, l)?.Consume;
		}
	}
	GetRoleSkillDescriptionConfigById(e) {
		var l = SkillDescriptionById_1.configSkillDescriptionById.GetConfig(e);
		return (
			void 0 === l &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 44, "技能描述配置为空，Id = ", ["id", e]),
			l
		);
	}
	GetAllRoleSkillDescConfigByGroupId(e) {
		var l =
			SkillDescriptionBySkillLevelGroupId_1.configSkillDescriptionBySkillLevelGroupId.GetConfigList(
				e,
			);
		return (
			void 0 === l &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 38, "技能描述配置为空", ["GroupId", e]),
			l
		);
	}
	GetSkillInputConfigById(e) {
		var l = SkillInputById_1.configSkillInputById.GetConfig(e);
		return (
			void 0 === l &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 44, "技能出招表配置为空，Id = ", [
					"skillInputId",
					e,
				]),
			l
		);
	}
	GetRoleSkillInputConfigById(e) {
		return RoleSkillInputById_1.configRoleSkillInputById.GetConfig(e);
	}
	GetRoleSkillMaxLevelBySkillNodeId(e) {
		if ((e = this.GetSkillTreeNode(e).SkillId) && 0 < e)
			return this.GetSkillConfigById(e)?.MaxSkillLevel;
	}
}
exports.RoleSkillConfig = RoleSkillConfig;
