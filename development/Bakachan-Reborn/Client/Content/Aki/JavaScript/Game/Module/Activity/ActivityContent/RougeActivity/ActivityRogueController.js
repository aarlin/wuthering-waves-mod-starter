"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRogueController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	RoguelikeController_1 = require("../../../Roguelike/RoguelikeController"),
	WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivityRogueData_1 = require("./ActivityRogueData"),
	ActivitySubViewRogue_1 = require("./ActivitySubViewRogue");
class ActivityRogueController extends ActivityControllerBase_1.ActivityControllerBase {
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	OnOpenView(e) {
		2 === this.o2e(e.Id) &&
			ActivityRogueController.ActivityFunctionExecute(e.Id);
	}
	o2e(e) {
		if (
			((e =
				ConfigManager_1.ConfigManager.ActivityRogueConfig?.GetActivityUniversalConfig(
					e,
				)),
			e)
		)
			return e.FunctionType;
	}
	OnGetActivityResource(e) {
		return (
			(e =
				ConfigManager_1.ConfigManager.ActivityRogueConfig?.GetActivityUniversalConfig(
					e.Id,
				)),
			e ? e.ActivityResource : "UiItem_ActivityRouge"
		);
	}
	OnCreateSubPageComponent(e) {
		return new ActivitySubViewRogue_1.ActivitySubViewRogue();
	}
	OnCreateActivityData(e) {
		return (
			(ActivityRogueController.ActivityId = e.Ekn),
			new ActivityRogueData_1.ActivityRougeData()
		);
	}
	OnInit() {
		return (
			ActivityRogueController.r2e(),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Activity", 38, "初始化肉鸽活动"),
			!0
		);
	}
	OnClear() {
		return ActivityRogueController.OpenViewFuncMap.clear(), !0;
	}
	static GetCurrentActivityData() {
		var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
			ActivityRogueController.ActivityId,
		);
		if (e) return e;
	}
	static RefreshActivityRedDot() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RefreshCommonActivityRedDot,
			this.ActivityId,
		);
	}
	static ActivityFunctionExecute(e) {
		var t =
			ConfigManager_1.ConfigManager.ActivityRogueConfig?.GetActivityUniversalConfig(
				e,
			);
		if (t) {
			var i,
				o,
				r = t.FunctionParams;
			switch (t.FunctionType) {
				case 0:
					break;
				case 1: {
					let e;
					r && 1 <= r.length && (e = Number(r[0])), this.n2e(e);
					break;
				}
				case 2:
					r.length < 1 || ((i = r[0]), (o = r.slice(1)), this.s2e(i, o));
			}
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Activity",
					38,
					"肉鸽活动功能触发",
					["Type", t.FunctionType],
					["Params", r],
				),
				(e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) &&
					ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
						e,
						t.FunctionType,
					);
		}
	}
	static n2e(e) {
		UiManager_1.UiManager.OpenView("QuestView", e);
	}
	static s2e(e, t) {
		var i = ActivityRogueController.OpenViewFuncMap.get(e);
		i ? i(t) : UiManager_1.UiManager.OpenView(e, t);
	}
	static r2e() {
		this.OpenViewFuncMap.set("WorldMapView", this.a2e),
			this.OpenViewFuncMap.set("RoguelikeActivityView", this.h2e);
	}
}
((exports.ActivityRogueController = ActivityRogueController).ActivityId = 0),
	(ActivityRogueController.OpenViewFuncMap = new Map()),
	(ActivityRogueController.a2e = (e) => {
		var t = e ? Number(e[0]) : void 0;
		void 0 === t || ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(t)
			? ((t = {
					MarkId: e ? Number(e[0]) : void 0,
					MarkType: 0,
					OpenAreaId: 0,
				}),
				WorldMapController_1.WorldMapController.OpenView(2, !1, t))
			: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"FunctionDisable",
				);
	}),
	(ActivityRogueController.h2e = (e) => {
		RoguelikeController_1.RoguelikeController.OpenRoguelikeActivityView().then(
			void 0,
		);
	});
