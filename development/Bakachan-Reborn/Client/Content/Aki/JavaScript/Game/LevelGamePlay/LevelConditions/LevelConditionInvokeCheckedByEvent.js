"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionPawnInRange =
		exports.LevelConditionFightWithMonster =
		exports.LevelConditionGetNewItem =
		exports.LevelConditionGetWhichRole =
		exports.LevelConditionHarmonyQte =
		exports.LevelConditionHpLowerThan =
		exports.LevelConditionSlotOfCurrentRole =
		exports.LevelConditionFunctionUnlock =
			void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneTeamDefine_1 = require("../../Module/SceneTeam/SceneTeamDefine"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralDefine_1 = require("../LevelGeneralDefine");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
class LevelConditionFunctionUnlock extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o, ...n) {
		var t, r;
		return 0 === e.LimitParams.size
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1)
			: (t = Number(e.LimitParams.get("FunctionId")))
				? n?.length
					? ((r = n[0]), n[1] && r === t)
					: ModelManager_1.ModelManager.FunctionModel.IsOpen(t)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelCondition",
							17,
							`配置错误！条件${e.Id}的FunctionId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.FunctionUnlock}的定义`,
						),
					!1);
	}
}
exports.LevelConditionFunctionUnlock = LevelConditionFunctionUnlock;
class LevelConditionSlotOfCurrentRole extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		var n;
		return 0 === e.LimitParams.size
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1)
			: !(n = Number(e.LimitParams.get("Slot"))) ||
					n > SceneTeamDefine_1.SCENE_TEAM_MAX_NUM
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelCondition",
							17,
							`配置错误！条件${e.Id}的Slot参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.SlotOfCurrentRole}的定义`,
						),
					!1)
				: !!(e =
						ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem) &&
					n ===
						ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0).indexOf(
							e,
						) +
							1;
	}
}
exports.LevelConditionSlotOfCurrentRole = LevelConditionSlotOfCurrentRole;
class LevelConditionHpLowerThan extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		var n, t, r, i;
		return 0 === e.LimitParams.size
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1)
			: (n = Number(e.LimitParams.get("Hp")))
				? !(
						!(t =
							ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) ||
						((r = t.Entity.GetComponent(156)?.GetCurrentValue(
							EAttributeId.Proto_Life,
						)),
						(i = t.Entity.GetComponent(156)?.GetCurrentValue(EAttributeId.Tkn)),
						!r) ||
						!i
					) && r / i < n / CommonDefine_1.RATE_10000
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelCondition",
							17,
							`配置错误！条件${e.Id}的Hp参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.HpLowerThan}的定义`,
						),
					!1);
	}
}
exports.LevelConditionHpLowerThan = LevelConditionHpLowerThan;
class LevelConditionHarmonyQte extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o, ...n) {
		var t;
		return (
			!!n?.length &&
			(0 === e.LimitParams.size
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelCondition",
							17,
							"配置错误！条件的参数不应该为空",
							["inConditionInfo.Id", e.Id],
						),
					!1)
				: !(t = Number(e.LimitParams.get("ElementType"))) && 7 <= t
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelCondition",
								17,
								`配置错误！条件${e.Id}的ElementType参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.HarmonyQte}的定义`,
							),
						!1)
					: ((e = n[0]),
						(n = n[1]),
						10 * (e = e.GetComponent(79)?.RoleElementType) +
							(n = n.GetComponent(79)?.RoleElementType) ===
							t || 10 * n + e === t))
		);
	}
}
exports.LevelConditionHarmonyQte = LevelConditionHarmonyQte;
class LevelConditionGetWhichRole extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		var n;
		return 0 === e.LimitParams.size
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1)
			: (n = Number(e.LimitParams.get("RoleCount")))
				? ModelManager_1.ModelManager.RoleModel.GetRoleMap().size === n
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelCondition",
							17,
							`配置错误！条件${e.Id}的RoleCount参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.GetWhichRole}的定义`,
						),
					!1);
	}
}
exports.LevelConditionGetWhichRole = LevelConditionGetWhichRole;
class LevelConditionGetNewItem extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o, ...n) {
		if (0 === e.LimitParams.size)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1
			);
		var t = Number(e.LimitParams.get("ItemId"));
		if (!t)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						`配置错误！条件${e.Id}的ItemId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.GetNewItem}的定义`,
					),
				!1
			);
		var r = ModelManager_1.ModelManager.InventoryModel;
		if (n)
			return (e = r.GetAttributeItemData(n[0]))
				? t === e.GetConfigId()
				: n[0] === t;
		if (
			ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
				LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
				t,
			)
		)
			return !0;
		e = r.GetNewAttributeItemUniqueIdList();
		var i = new Set();
		for (const o of e) {
			var l = r.GetAttributeItemData(o);
			l && i.add(l.GetConfigId());
		}
		return i.has(t);
	}
}
exports.LevelConditionGetNewItem = LevelConditionGetNewItem;
class LevelConditionFightWithMonster extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o, ...n) {
		var t;
		return (
			!!n?.length &&
			(0 === e.LimitParams.size
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelCondition",
							17,
							"配置错误！条件的参数不应该为空",
							["inConditionInfo.Id", e.Id],
						),
					!1)
				: (t = e.LimitParams.get("MonsterId"))
					? ((n = n[0]),
						t ===
							EntitySystem_1.EntitySystem.Get(n)
								?.GetComponent(0)
								?.GetPbEntityInitData()?.BlueprintType)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelCondition",
								17,
								`配置错误！条件${e.Id}的MonsterId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.FightWithMonster}的定义`,
							),
						!1))
		);
	}
}
exports.LevelConditionFightWithMonster = LevelConditionFightWithMonster;
class LevelConditionPawnInRange extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o, ...n) {
		var t;
		return !(
			!n?.length ||
			(0 === e.LimitParams.size
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelCondition",
							17,
							"配置错误！条件的参数不应该为空",
							["inConditionInfo.Id", e.Id],
						),
					1)
				: ((e = e.LimitParams.get("PawnId")),
					(n = n[0]),
					!(n = EntitySystem_1.EntitySystem.Get(n))?.Active ||
						(t = n?.GetComponent(0))?.IsConcealed ||
						!(
							(t = t?.GetPbEntityInitData()?.BlueprintType) &&
							t === e &&
							n.GetComponent(1) &&
							Global_1.Global.BaseCharacter &&
							Global_1.Global.BaseCharacter.CharacterActorComponent
						)))
		);
	}
}
exports.LevelConditionPawnInRange = LevelConditionPawnInRange;
