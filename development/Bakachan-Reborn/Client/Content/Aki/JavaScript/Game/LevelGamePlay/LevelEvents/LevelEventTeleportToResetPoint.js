"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventTeleportToResetPoint = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
	CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
	InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	DAMAGE_PERCENT = 0.1;
class LevelEventTeleportToResetPoint extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		if (e)
			switch (
				((ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim = !0),
				e.Option.Type)
			) {
				case IAction_1.ETeleportToLatestResetPointType.Directly:
					this.JRe();
					break;
				case IAction_1.ETeleportToLatestResetPointType.CheckPlayerIsDead:
					this.zRe() && this.ZRe() ? this.FinishExecute(!0) : this.JRe();
			}
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Event",
					34,
					"LevelEventTeleportToResetPoint 参数不合法",
				),
				this.FinishExecute(!1);
	}
	JRe() {
		this.eUe(),
			LevelLoadingController_1.LevelLoadingController.OpenLoading(1, 3, () => {
				this.FinishExecute(!0);
			});
	}
	zRe() {
		var e =
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
				156,
			);
		return (
			!!e &&
			+e.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life) /
				e.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Tkn) <=
				0.1
		);
	}
	ZRe() {
		for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
			var e = t.EntityHandle?.Entity?.GetComponent(156);
			if (
				e &&
				+e.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life) /
					e.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Tkn) >
					0.1
			)
				return !1;
		}
		return !0;
	}
	eUe() {
		ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(
			InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag,
		);
	}
	OnReset() {}
}
exports.LevelEventTeleportToResetPoint = LevelEventTeleportToResetPoint;
