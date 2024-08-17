"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotFormation = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
class PlotFormation {
	ChangeFormation() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Plot", 27, "[剧情加载等待] 剧情切编队-开始"),
			(ModelManager_1.ModelManager.PlotModel.InSeamlessFormation = !0);
	}
	async CheckFormationPromise() {
		ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise &&
			(LevelLoadingController_1.LevelLoadingController.OpenLoading(
				13,
				3,
				void 0,
				0,
			),
			await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise.Promise);
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		e?.Entity?.IsInit
			? ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
					e.Entity,
					!0,
					"Sequence Change Formation Done",
					!1,
				)
			: ControllerHolder_1.ControllerHolder.FlowController.LogError(
					"编队准备好了，但当前出战角色却没了",
				),
			(ModelManager_1.ModelManager.PlotModel.InSeamlessFormation = !1),
			LevelLoadingController_1.LevelLoadingController.CloseLoading(13),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "检查剧情编队完成通过");
	}
}
exports.PlotFormation = PlotFormation;
