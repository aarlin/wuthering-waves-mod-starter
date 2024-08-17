"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckEquippedPhantom = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PhantomBattleDefine_1 = require("../../Module/Phantom/PhantomBattle/PhantomBattleDefine"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder");
class LevelConditionCheckEquippedPhantom extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		var r, n;
		return 0 === e.LimitParams.size
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1)
			: ((r = parseInt(e.LimitParams.get("声骸位置"))),
				(n = parseInt(e.LimitParams.get("是否装备"))),
				r && (r <= 0 || r > PhantomBattleDefine_1.MAX_EQUIP_COUNT)
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelCondition",
								17,
								`配置错误！条件${e.Id}的声骸位置值的范围是[1-${PhantomBattleDefine_1.MAX_EQUIP_COUNT}]`,
							),
						!1)
					: 0 !== n && 1 !== n
						? (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"LevelCondition",
									17,
									`配置错误！条件${e.Id}的是否装备应该是0或1`,
								),
							!1)
						: !!(e =
								ModelManager_1.ModelManager.EditFormationModel
									.GetCurrentFormationData.GetCurrentRoleConfigId) &&
							((e =
								ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
									e,
									r - 1,
								)),
							Boolean(n) === (0 !== e)));
	}
}
exports.LevelConditionCheckEquippedPhantom = LevelConditionCheckEquippedPhantom;
