"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventExitDungeon = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	InstanceDungeonController_1 = require("../../Module/InstanceDungeon/InstanceDungeonController"),
	ScrollingTipsController_1 = require("../../Module/ScrollingTips/ScrollingTipsController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventExitDungeon extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.SDe = () => {
				this.FinishExecute(!0);
			});
	}
	ExecuteInGm(e, n, o) {
		this.FinishExecute(!0);
	}
	ExecuteNew(e, n) {
		ModelManager_1.ModelManager.SundryModel?.IsBlockTpDungeon()
			? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
					"ExitDungeon被GM屏蔽，跳过执行",
				),
				this.FinishExecute(!0))
			: e.IsNeedSecondaryConfirmation
				? InstanceDungeonController_1.InstanceDungeonController.OnClickInstanceDungeonExitButton(
						this.SDe,
						this.SDe,
					)
				: this.FinishExecute(!0);
	}
}
exports.LevelEventExitDungeon = LevelEventExitDungeon;
