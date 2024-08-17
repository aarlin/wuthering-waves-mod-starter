"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DailyActiveTaskController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	RoleController_1 = require("../../RoleUi/RoleController"),
	WorldMapController_1 = require("../../WorldMap/WorldMapController");
class DailyActiveTaskController extends UiControllerBase_1.UiControllerBase {
	static TrackTaskByType(e, r) {
		switch (e) {
			case 1:
				break;
			case 2:
				DailyActiveTaskController.kOt();
				break;
			case 3:
				var o = [];
				for (const e of r) o.push(Number(e));
				DailyActiveTaskController.dOe(o);
				break;
			case 4: {
				let e,
					o = "DailyActivityTabView";
				r && 1 <= r.length && ((o = r[0]), 2 <= r.length) && (e = r.slice(1)),
					DailyActiveTaskController.FOt(o, e);
				break;
			}
			case 5: {
				let e = "DailyActivityTabView";
				r && 1 <= r.length && (e = r[0]), DailyActiveTaskController.COe(e);
				break;
			}
			case 6: {
				let e = 0;
				r && 1 <= r.length && (e = Number(r[0])),
					DailyActiveTaskController.VOt(e);
				break;
			}
			case 7: {
				let e = -1;
				r && 1 <= r.length && (e = Number(r[0])),
					DailyActiveTaskController.HOt(e);
				break;
			}
		}
	}
	static kOt() {
		if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10023005)) {
			let o = new Map();
			ModelManager_1.ModelManager.DailyTaskModel.GetAllDailyQuest().forEach(
				(e) => {
					var r = e.TreeId,
						a = e.GetCurrentActiveChildQuestNode();
					a && ((e = e.GetTrackDistance(a.NodeId)), o.set(e, r));
				},
			);
			var [e] = (o = new Map(
					[...o.entries()].sort((e, r) => e[0] - r[0]),
				)).values(),
				r = ModelManager_1.ModelManager.MapModel.GetAllDynamicMarks().get(12);
			if (r) {
				let o;
				for (const a of r.values())
					if (a.TreeId === e) {
						o = a;
						break;
					}
				o &&
					((r = { MarkId: o.MarkId, MarkType: 12, OpenAreaId: 0 }),
					WorldMapController_1.WorldMapController.OpenView(2, !1, r));
			}
		} else
			ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
				"FunctionDisable",
			);
	}
	static dOe(e) {
		let r;
		var o = ModelManager_1.ModelManager.AreaModel.GetAreaCountryId() ?? 1;
		0 === e.length
			? (r = void 0)
			: 1 === e.length
				? (r = e[0])
				: e.length < o
					? ((r = e[0]),
						Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"AdventureGuide",
								38,
								"[活跃度系统] 地图跳转Id错误,MarkId数量未对应国家Id",
								["当前国家Id", o],
								["MarkId数量", e.length],
							))
					: (r = e[o - 1]),
			void 0 === r ||
			ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(r)
				? ((e = { MarkId: r, MarkType: 0, OpenAreaId: 0 }),
					WorldMapController_1.WorldMapController.OpenView(2, !1, e))
				: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"FunctionDisable",
					);
	}
	static FOt(e = "DailyActivityTabView", r) {
		ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView(
			e,
			r,
		);
	}
	static COe(e) {
		RoleController_1.RoleController.OpenRoleMainView(0, 0, [], e);
	}
	static HOt(e) {
		void 0 === e || e < 0
			? UiManager_1.UiManager.OpenView("QuestView")
			: ((e =
					ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(e)),
				UiManager_1.UiManager.OpenView("QuestView", e?.Id ?? void 0));
	}
	static VOt(e) {
		e &&
			(e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e)) &&
			((e = {
				MarkId: e.DeliveryMarkId,
				MarkType: 0,
				StartScale: ModelManager_1.ModelManager.WorldMapModel.MapScaleMin,
				OpenAreaId: 0,
			}),
			WorldMapController_1.WorldMapController.OpenView(2, !1, e));
	}
}
exports.DailyActiveTaskController = DailyActiveTaskController;
