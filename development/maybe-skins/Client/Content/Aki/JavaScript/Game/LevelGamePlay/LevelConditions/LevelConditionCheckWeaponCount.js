"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckWeaponCount = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckWeaponCount extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a) {
		var t, n, o;
		return (
			!!(
				e.LimitParams &&
				(t = e.LimitParams.get("Level")) &&
				(n = e.LimitParams.get("Type")) &&
				(o = e.LimitParams.get("Quality"))
			) &&
			((e = e.LimitParams.get("Op")),
			this.CheckCompareValue(
				e,
				ModelManager_1.ModelManager.InventoryModel.GetAllWeaponItemDataByQualityAndType(
					parseInt(o),
					parseInt(n),
				).length,
				Number(t),
			))
		);
	}
}
exports.LevelConditionCheckWeaponCount = LevelConditionCheckWeaponCount;
