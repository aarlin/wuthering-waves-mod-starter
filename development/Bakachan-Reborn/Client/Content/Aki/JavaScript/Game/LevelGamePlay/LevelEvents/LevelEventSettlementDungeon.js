"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSettlementDungeon = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ActivityDoubleRewardController_1 = require("../../Module/Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
	ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
	InstanceDungeonController_1 = require("../../Module/InstanceDungeon/InstanceDungeonController"),
	PowerController_1 = require("../../Module/Power/PowerController"),
	ScrollingTipsController_1 = require("../../Module/ScrollingTips/ScrollingTipsController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSettlementDungeon extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, n) {
		if (
			1 !==
			ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess
		)
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("InstanceDungeon", 5, "副本结算行为触发时，副本未成功"),
				this.FinishExecute(!0);
		else if (
			ModelManager_1.ModelManager.InstanceDungeonModel.InstanceRewardHaveTake
		)
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
				"HaveReceiveRewrad",
			),
				this.FinishExecute(!0);
		else if (
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()
		)
			this.FinishExecute(!0);
		else {
			var o =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
			if (
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanReward(
					o,
				)
			)
				if (
					ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(
						o,
					)
				) {
					var r =
							!!ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(
								o,
							),
						l =
							ModelManager_1.ModelManager.InstanceDungeonModel
								.CurrentInstanceIsFinish;
					if (r && !l) this.FinishExecute(!0);
					else if (
						0 ===
						(r =
							ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
								o,
							))
					)
						this.FinishExecute(!0);
					else {
						const e = ModelManager_1.ModelManager.PowerModel.IsPowerEnough(r);
						e
							? (((l = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
									64,
								)).ShowPowerItem = !0),
								l.SetTextArgs(r.toString()),
								l.FunctionMap.set(1, () => {}),
								l.FunctionMap.set(2, () => {
									var n;
									e
										? InstanceDungeonController_1.InstanceDungeonController.GetInstExchangeRewardRequest()
										: ((n =
												ConfigManager_1.ConfigManager.TextConfig.GetTextById(
													"ReceiveLevelPlayPowerNotEnough",
												)),
											ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
												n,
											),
											PowerController_1.PowerController.OpenPowerView());
								}),
								(r =
									ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
										ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
											o,
										).CustomTypes,
									)) &&
									0 < r.LeftUpCount &&
									(l.Tip = r.GetFullTip()),
								this.FinishExecute(!0),
								ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
									l,
								))
							: ((o = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"ReceiveLevelPlayPowerNotEnough",
								)),
								ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
									o,
								),
								PowerController_1.PowerController.OpenPowerView(),
								this.FinishExecute(!0));
					}
				} else
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"InstanceDungeonRewardTimeNotEnough",
					),
						this.FinishExecute(!0);
			else
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"InstanceDungeonRewardTimeNotEnough",
				),
					this.FinishExecute(!0);
		}
	}
}
exports.LevelEventSettlementDungeon = LevelEventSettlementDungeon;
