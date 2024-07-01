"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityUniversalController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	RoguelikeController_1 = require("../../../Roguelike/RoguelikeController"),
	WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivitySubViewUniversal_1 = require("./ActivitySubViewUniversal"),
	ActivityUniversalData_1 = require("./ActivityUniversalData");
class ActivityUniversalController extends ActivityControllerBase_1.ActivityControllerBase {
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	OnOpenView(e) {
		2 === this.o2e(e.Id) &&
			ActivityUniversalController.ActivityFunctionExecute(e.Id);
	}
	o2e(e) {
		if (
			((e =
				ConfigManager_1.ConfigManager.ActivityUniversalConfig?.GetActivityUniversalConfig(
					e,
				)),
			e)
		)
			return e.FunctionType;
	}
	OnGetActivityResource(e) {
		return (
			(e =
				ConfigManager_1.ConfigManager.ActivityUniversalConfig?.GetActivityUniversalConfig(
					e.Id,
				)),
			e ? e.UiResource : ""
		);
	}
	OnCreateSubPageComponent(e) {
		return new ActivitySubViewUniversal_1.ActivitySubViewUniversal();
	}
	OnCreateActivityData(e) {
		return (
			ActivityUniversalController.UniversalActivityIdSet.add(e.Ekn),
			new ActivityUniversalData_1.ActivityUniversalData()
		);
	}
	OnInit() {
		return (
			ActivityUniversalController.r2e(),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Activity", 38, "初始化通用活动"),
			!0
		);
	}
	OnClear() {
		return (
			ActivityUniversalController.UniversalActivityIdSet.clear(),
			ActivityUniversalController.OpenViewFuncMap.clear(),
			!0
		);
	}
	static ActivityFunctionExecute(e) {
		var i =
			ConfigManager_1.ConfigManager.ActivityUniversalConfig?.GetActivityUniversalConfig(
				e,
			);
		if (i) {
			var t,
				r,
				n = i.FunctionParams;
			switch (i.FunctionType) {
				case 0:
					break;
				case 1: {
					let e;
					n && 1 <= n.length && (e = Number(n[0])), this.n2e(e);
					break;
				}
				case 2:
					n.length < 1 || ((t = n[0]), (r = n.slice(1)), this.s2e(t, r));
			}
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Activity",
					38,
					"通用活动功能触发",
					["Type", i.FunctionType],
					["Params", n],
				),
				(e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) &&
					ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
						e,
						i.FunctionType,
					);
		}
	}
	static n2e(e) {
		UiManager_1.UiManager.OpenView("QuestView", e);
	}
	static s2e(e, i) {
		var t = ActivityUniversalController.OpenViewFuncMap.get(e);
		t ? t(i) : UiManager_1.UiManager.OpenView(e, i);
	}
	static r2e() {
		this.OpenViewFuncMap.set("WorldMapView", this.a2e),
			this.OpenViewFuncMap.set("RoguelikeActivityView", this.h2e);
	}
}
((exports.ActivityUniversalController =
	ActivityUniversalController).UniversalActivityIdSet = new Set()),
	(ActivityUniversalController.OpenViewFuncMap = new Map()),
	(ActivityUniversalController.a2e = (e) => {
		var i = e ? Number(e[0]) : void 0;
		void 0 === i || ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(i)
			? ((i = {
					MarkId: e ? Number(e[0]) : void 0,
					MarkType: 0,
					OpenAreaId: 0,
				}),
				WorldMapController_1.WorldMapController.OpenView(2, !1, i))
			: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"FunctionDisable",
				);
	}),
	(ActivityUniversalController.h2e = (e) => {
		RoguelikeController_1.RoguelikeController.OpenRoguelikeActivityView().then(
			void 0,
		);
	});
