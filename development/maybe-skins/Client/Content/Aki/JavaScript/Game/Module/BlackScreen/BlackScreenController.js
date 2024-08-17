"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlackScreenController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	BlackScreenGlobalData_1 = require("./BlackScreenGlobalData"),
	BlackScreenTransitionView_1 = require("./BlackScreenTransitionView");
class BlackScreenController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UiManagerInit,
			this.jCt,
		);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UiManagerInit,
			this.jCt,
		);
	}
	static AddBlackScreen(e, t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("BlackScreen", 11, "触发开始黑屏", ["标签", t]),
			0 === this.WCt.size && this.KCt.ShowTemp(e),
			(e = this.WCt.get(t)) ? this.WCt.set(t, ++e) : this.WCt.set(t, 1);
	}
	static async AddBlackScreenAsync(e, t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("BlackScreen", 11, "触发开始黑屏async", ["标签", t]),
			0 === this.WCt.size && this.KCt.ShowTemp(e),
			(e = this.WCt.get(t)) ? this.WCt.set(t, ++e) : this.WCt.set(t, 1),
			await BlackScreenGlobalData_1.BlackScreenGlobalData.ShowPromise.Promise;
	}
	static RemoveBlackScreen(e, t) {
		var r;
		this.KCt &&
			(r = this.WCt.get(t)) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("BlackScreen", 11, "触发结束黑屏", ["标签", t]),
			1 === r ? this.WCt.delete(t) : this.WCt.set(t, --r),
			0 === this.WCt.size) &&
			this.KCt.HideTemp(e);
	}
	static IsBlackScreenActive() {
		return this.KCt?.IsUiActiveInHierarchy() ?? !1;
	}
	static OnClear() {
		return this.KCt && (this.KCt.Destroy(), (this.KCt = void 0)), !0;
	}
}
(exports.BlackScreenController = BlackScreenController),
	((_a = BlackScreenController).KCt = void 0),
	(BlackScreenController.WCt = new Map()),
	(BlackScreenController.jCt = () => {
		_a.KCt ||
			((_a.KCt = new BlackScreenTransitionView_1.BlackScreenTransitionView()),
			_a.KCt.CreateByResourceIdAsync(
				"UiView_BlackScreen_Prefab",
				UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.CG),
				!0,
			));
	});
