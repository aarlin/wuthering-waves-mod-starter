"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityBeginnerBookController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivityBeginnerBookData_1 = require("./ActivityBeginnerBookData"),
	ActivitySubViewBeginnerBook_1 = require("./ActivitySubViewBeginnerBook");
class ActivityBeginnerBookController extends ActivityControllerBase_1.ActivityControllerBase {
	constructor() {
		super(...arguments), (this.sNe = 0);
	}
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	OnOpenView(e) {}
	OnGetActivityResource(e) {
		return "UiItem_BeginnerBook";
	}
	OnCreateSubPageComponent(e) {
		return new ActivitySubViewBeginnerBook_1.ActivitySubViewBeginnerBook();
	}
	OnCreateActivityData(e) {
		return (
			(this.sNe = e.Ekn),
			new ActivityBeginnerBookData_1.ActivityBeginnerBookData()
		);
	}
	async NewJourneyRequest() {
		const e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
			this.sNe,
		);
		var t =
			(((t = Protocol_1.Aki.Protocol.Ros.create()).XFn =
				e.AllBeginnerTargetList),
			await Net_1.Net.CallAsync(13629, t));
		for (const i of t.RPs)
			e.UnLockBeginnerMap.set(i.IPs, i.TPs),
				e.FinishBeginnerMap.set(i.IPs, i.LPs);
		e.AllBeginnerTargetList.sort((t, i) => {
			var n = e.FinishBeginnerMap.get(t) ? 1 : 0,
				r = e.FinishBeginnerMap.get(i) ? 1 : 0;
			return n == r
				? ((t =
						ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetActivityBeginnerConfig(
							t,
						)),
					(i =
						ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetActivityBeginnerConfig(
							i,
						)),
					t.Sort - i.Sort)
				: n - r;
		});
	}
	OnInit() {
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Activity", 5, "初始化鸣域新程"),
			!0
		);
	}
	OnClear() {
		return !0;
	}
}
exports.ActivityBeginnerBookController = ActivityBeginnerBookController;
