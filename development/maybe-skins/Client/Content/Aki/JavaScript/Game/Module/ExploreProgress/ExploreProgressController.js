"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreProgressController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class ExploreProgressController extends UiControllerBase_1.UiControllerBase {
	static async AllExploreProgressAsyncRequest() {
		var e =
				((r =
					ModelManager_1.ModelManager
						.ExploreProgressModel).InitializeExploreAreaData(),
				r.InitializeCurrentCountryIdAndAreaId(),
				new Protocol_1.Aki.Protocol.oJn()),
			r =
				((e.i5n = r.GetAllAreaIdList()),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"ExploreProgress",
						8,
						"客户端请求区域探索度ExploreProgressRequest",
						["request", e],
					),
				await Net_1.Net.CallAsync(12864, e));
		this.$5t(r);
	}
}
(exports.ExploreProgressController = ExploreProgressController).$5t = (e) => {
	Log_1.Log.CheckInfo() &&
		Log_1.Log.Info(
			"ExploreProgress",
			8,
			"服务端返回区域探索度ExploreProgressResponse",
			["response", e],
		);
	var r = ModelManager_1.ModelManager.ExploreProgressModel;
	for (const o of e.uLs) r.RefreshExploreAreaData(o);
	EventSystem_1.EventSystem.Emit(
		EventDefine_1.EEventName.OnExploreProgressResponse,
	);
};
