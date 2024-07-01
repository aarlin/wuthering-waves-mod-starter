"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowServerNotifyCenter = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	LevelGeneralContextUtil_1 = require("../../../LevelGamePlay/LevelGeneralContextUtil"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
	LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
	FlowController_1 = require("./FlowController"),
	FlowNetworks_1 = require("./FlowNetworks");
class FlowServerNotifyCenter extends ControllerAssistantBase_1.ControllerAssistantBase {
	OnDestroy() {}
	HandleFlowStartNotify(e) {
		if (
			ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() &&
			ModelManager_1.ModelManager.AutoRunModel.ShouldFastSkip
		)
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Plot",
					40,
					"GM模式下预处理Flow相关Notify: 快速推进模式下收到FlowStartNotify直接强跳剧情",
					["FlowId", e.qkn],
					["FlowIncId", e.E8n],
					["FlowListName", e.bkn],
					["ContextType", e.Hms?.Xms],
				),
				FlowNetworks_1.FlowNetworks.RequestGmFinish();
		else {
			var o = MathUtils_1.MathUtils.LongToNumber(e.E8n),
				l =
					LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
						e.Hms,
					);
			let r;
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Plot",
					27,
					"服务器下发剧情",
					["Type", l?.Type],
					["FlowIncID", o],
					["isAsync", e.QLs],
					["isSkip", e.I8n],
				),
				e.Hms?.Xms === Protocol_1.Aki.Protocol.Pbs.Proto_GmPlayFlow &&
					(ModelManager_1.ModelManager.PlotModel.PlotConfig.IsGmPlayPlotOnce =
						!0),
				e.E6s &&
					(e.y6s
						? (r = Vector_1.Vector.Create(e.y6s.X, e.y6s.Y, e.y6s.Z))
						: FlowController_1.FlowController.LogError("未配置剧情坐标点", [
								"incId",
								o,
							])),
				ControllerHolder_1.ControllerHolder.FlowController.StartFlow(
					e.bkn,
					e.qkn,
					e.Gkn,
					l,
					o,
					!0,
					e.QLs,
					e.I8n,
					r,
				);
		}
	}
	HandleFlowEndNotify(e) {
		var o = MathUtils_1.MathUtils.LongToNumber(e.E8n);
		e.$0s
			? ModelManager_1.ModelManager.PlotModel.SetPendingPlotState(
					o,
					!1,
					!0,
					!0,
				) ||
				ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
					"服务器通知跳过剧情",
					!0,
					!0,
				)
			: ControllerHolder_1.ControllerHolder.FlowController.FinishFlow(
					"服务器剧情通知打断剧情",
					o,
					!0,
				);
	}
	HandleFlowSkipBlackScreenNotify(e) {
		e &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Plot",
					46,
					"服务器跳过剧情，检查是否有黑幕",
					["FlowListName", e.bkn],
					["FlowId", e.qkn],
					["StateId", e.Gkn],
					["FadeOutScreen", e.YLs],
				),
			LevelLoadingController_1.LevelLoadingController.CloseLoading(0));
	}
}
exports.FlowServerNotifyCenter = FlowServerNotifyCenter;
