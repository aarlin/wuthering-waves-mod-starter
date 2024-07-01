"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AppLinksController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	AppLinks_1 = require("../../../Launcher/AppLinks"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	FunctionController_1 = require("../Functional/FunctionController");
class AppLinksController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.$bn(), super.OnInit();
	}
	static OnClear() {
		return this.Xbn(), super.OnClear();
	}
	static $bn() {
		AppLinks_1.AppLinks.SetDeepValueHandle("10009", this.Ybn),
			AppLinks_1.AppLinks.SetDeepValueHandle("10053", this.a3e);
	}
	static Xbn() {
		AppLinks_1.AppLinks.RemoveDeepValueHandle("10009"),
			AppLinks_1.AppLinks.RemoveDeepValueHandle("10053");
	}
	static V4e() {
		return !(
			!ModelManager_1.ModelManager.GameModeModel.WorldDone ||
			ModelManager_1.ModelManager.GameModeModel.Loading ||
			!UiManager_1.UiManager.IsViewShow("BattleView")
		);
	}
}
(exports.AppLinksController = AppLinksController),
	((_a = AppLinksController).Ybn = (e, n) => {
		_a.V4e()
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Functional", 22, "打开抽卡界面"),
				FunctionController_1.FunctionController.OpenFunctionRelateView(10009))
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Functional", 22, "未完成游戏登录");
	}),
	(AppLinksController.a3e = (e, n) => {
		_a.V4e()
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Functional", 22, "打开活动界面"),
				FunctionController_1.FunctionController.OpenFunctionRelateView(10053))
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Functional", 22, "未完成游戏登录");
	});
