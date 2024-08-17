"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckTeamWeaponCouldLevelUp = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	WeaponInstance_1 = require("../../Module/Weapon/WeaponInstance"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTeamWeaponCouldLevelUp extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(
			!0,
		)) {
			var a = e.GetConfigId;
			if (
				(a =
					ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
						a,
					)) &&
				typeof a == typeof WeaponInstance_1.WeaponInstance
			) {
				let e = !1;
				for (const o of ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemList(
					a.GetIncId(),
				))
					if (
						0 <
						ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
							o.GetConfigId(),
						)
					) {
						e = !0;
						break;
					}
				if (e && a.GetLevel() < a.GetCurrentMaxLevel()) return !0;
			}
		}
		return !1;
	}
}
exports.LevelConditionCheckTeamWeaponCouldLevelUp =
	LevelConditionCheckTeamWeaponCouldLevelUp;
