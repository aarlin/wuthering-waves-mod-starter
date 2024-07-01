"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventClaimDungeonReward = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ActivityDoubleRewardController_1 = require("../../Module/Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
	ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
	InstanceDungeonController_1 = require("../../Module/InstanceDungeon/InstanceDungeonController"),
	PowerController_1 = require("../../Module/Power/PowerController"),
	ScrollingTipsController_1 = require("../../Module/ScrollingTips/ScrollingTipsController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder");
class LevelEventClaimDungeonReward extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, o) {
		var n,
			r = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
			l =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
					r,
				);
		if (l && !(l <= 0))
			if (
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanReward(
					r,
				)
			) {
				const e = ModelManager_1.ModelManager.PowerModel.IsPowerEnough(l);
				e
					? (((n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(64)).ShowPowerItem =
							!0),
						n.SetTextArgs(l.toString()),
						n.FunctionMap.set(2, () => {
							var o;
							e
								? InstanceDungeonController_1.InstanceDungeonController.GetInstExchangeRewardRequest()
								: ((o = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
										"ReceiveLevelPlayPowerNotEnough",
									)),
									ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
										o,
									),
									PowerController_1.PowerController.OpenPowerView());
						}),
						(l =
							ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
								ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r)
									.CustomTypes,
							)) &&
							0 < l.LeftUpCount &&
							(n.Tip = l.GetFullTip()),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							n,
						))
					: ((r = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
							"ReceiveLevelPlayPowerNotEnough",
						)),
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(r),
						PowerController_1.PowerController.OpenPowerView());
			} else
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"InstanceDungeonRewardTimeNotEnough",
				);
	}
}
exports.LevelEventClaimDungeonReward = LevelEventClaimDungeonReward;
