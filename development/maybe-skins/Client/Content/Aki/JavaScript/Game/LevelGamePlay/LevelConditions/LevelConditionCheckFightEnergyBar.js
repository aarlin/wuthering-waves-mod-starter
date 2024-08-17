"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckFightEnergyBar = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	Log_1 = require("../../../Core/Common/Log");
class LevelConditionCheckFightEnergyBar extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, t) {
		var r, a, o;
		return 0 === e.LimitParams.size
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1)
			: (r = Number(e.LimitParams.get("机制条状态"))) < 0 || 2 < r
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelCondition",
							17,
							`配置错误！条件${e.Id}的机制条状态只能是0，1`,
						),
					!1)
				: ((e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
					(a = this.GetCurrentSpecialEnergyAttributeId(e.Entity))
						? ((o = e.Entity.GetComponent(156)?.GetCurrentValue(a.AttributeId)),
							(e = e.Entity.GetComponent(156)?.GetCurrentValue(
								a.MaxAttributeId,
							)),
							(0 === o && 0 === r) ||
								(0 < o && o < e && 2 === r) ||
								(e <= o && 1 === r))
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"LevelCondition",
									17,
									"查询角色特殊能量条属性错误",
								),
							!1));
	}
	GetCurrentSpecialEnergyAttributeId(e) {
		var t = e.GetComponent(185);
		if (
			t &&
			(e = this.GetRoleConfig(e)) &&
			((e = e.SpecialEnergyBarId),
			(e =
				ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
					e,
				)))
		) {
			if (!e.TagEnergyBarIdMap || e.TagEnergyBarIdMap.size <= 0)
				return { AttributeId: e.AttributeId, MaxAttributeId: e.MaxAttributeId };
			for (var [r, a] of e.TagEnergyBarIdMap)
				if (
					t.HasTag(r) &&
					(r =
						ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
							a,
						))
				)
					return {
						AttributeId: r.AttributeId,
						MaxAttributeId: r.MaxAttributeId,
					};
		}
	}
	GetRoleConfig(e) {
		if (
			(e = e.GetComponent(0)) &&
			((e = e.GetRoleId()),
			(e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)))
		)
			return e.GetRoleConfig();
	}
	GetDefaultSpecialEnergyAttributeId(e) {
		if (
			(e = this.GetRoleConfig(e)) &&
			((e = e.SpecialEnergyBarId),
			(e =
				ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
					e,
				)))
		)
			return { AttributeId: e.AttributeId, MaxAttributeId: e.MaxAttributeId };
	}
}
exports.LevelConditionCheckFightEnergyBar = LevelConditionCheckFightEnergyBar;
