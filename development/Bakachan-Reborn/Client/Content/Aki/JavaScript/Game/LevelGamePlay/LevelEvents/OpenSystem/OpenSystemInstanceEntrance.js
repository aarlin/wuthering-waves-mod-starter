"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemInstanceEntrance = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	InstanceDungeonEntranceConfig_1 = require("../../../Module/InstanceDungeon/InstanceDungeonEntranceConfig"),
	InstanceDungeonEntranceController_1 = require("../../../Module/InstanceDungeon/InstanceDungeonEntranceController"),
	TowerData_1 = require("../../../Module/TowerDetailUi/TowerData"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemInstanceEntrance extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, n) {
		if (!e.BoardId) return !1;
		if (!ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed)
			return !1;
		let a;
		switch (n.Type) {
			case 5:
				a = n.TriggerEntityId;
				break;
			case 1:
				a = n.EntityId;
		}
		return InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterEntrance(
			e.BoardId,
			a,
		);
	}
	GetViewName(e) {
		return (e =
			ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(
				e.BoardId,
			)) ===
			InstanceDungeonEntranceConfig_1.EInstanceEntranceFlowType.SingleTimeTower
			? "SingleTimeTowerView"
			: e ===
					InstanceDungeonEntranceConfig_1.EInstanceEntranceFlowType.CycleTower
				? "CycleTowerView"
				: e ===
						InstanceDungeonEntranceConfig_1.EInstanceEntranceFlowType.BossRush
					? "BossRushMainView"
					: e ===
							InstanceDungeonEntranceConfig_1.EInstanceEntranceFlowType.NewTower
						? ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty() !==
							TowerData_1.VARIATION_RISK_DIFFICULTY
							? "TowerNormalView"
							: "TowerVariationView"
						: "InstanceDungeonEntranceView";
	}
}
exports.OpenSystemInstanceEntrance = OpenSystemInstanceEntrance;
