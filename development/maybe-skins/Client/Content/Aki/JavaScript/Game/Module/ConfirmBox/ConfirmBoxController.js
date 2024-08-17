"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConfirmBoxController = void 0);
const UE = require("ue"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	ReconnectDefine_1 = require("../ReConnect/ReconnectDefine"),
	ConfirmBoxDefine_1 = require("./ConfirmBoxDefine");
class ConfirmBoxController extends UiControllerBase_1.UiControllerBase {
	static ShowConfirmBoxNew(o) {
		var e = ConfirmBoxController.GetUiViewName(o.ConfigId);
		return (
			0 < o.FunctionMap.size && (o.IsMultipleView = !0),
			!!e && (UiManager_1.UiManager.OpenView(e, o, o.FinishOpenFunction), !0)
		);
	}
	static CheckIsConfirmBoxOpen() {
		for (const o of ConfirmBoxController._bt.values())
			if (UiManager_1.UiManager.IsViewOpen(o)) return !0;
		return !1;
	}
	static CloseConfirmBoxView() {
		for (const o of ConfirmBoxController._bt.values())
			UiManager_1.UiManager.CloseView(o);
	}
	static ShowNetWorkConfirmBoxView(o, e = void 0) {
		(o.NotAddChildToTopStackView = !0),
			UiManager_1.UiManager.OpenView("NetWorkConfirmBoxView", o, e);
	}
	static CloseNetWorkConfirmBoxView(o, e = void 0) {
		UiManager_1.UiManager.CloseViewById(o, e);
	}
	static ShowFirstCurrencyConfirm() {
		var o = ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency(),
			e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(63);
		o = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(o);
		e.SetTextArgs(o),
			e.FunctionMap.set(2, () => {
				ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewToRecharge();
			}),
			ConfirmBoxController.ShowConfirmBoxNew(e);
	}
	static ShowExitGameConfirmBox() {
		var o;
		ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
			? ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
					5,
				)
			: ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(51)).FunctionMap.set(
					2,
					() => {
						GlobalData_1.GlobalData.IsPlayInEditor
							? UE.KismetSystemLibrary.QuitGame(
									GlobalData_1.GlobalData.World,
									void 0,
									0,
									!1,
								)
							: UE.KuroStaticLibrary.ExitGame(!1);
					},
				),
				ConfirmBoxController.ShowConfirmBoxNew(o));
	}
	static ShowReturnLoginConfirmBox() {
		var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(51);
		o.FunctionMap.set(2, () => {
			ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
				ReconnectDefine_1.ELogoutReason.ExitGameConfirmBox,
			);
		}),
			ConfirmBoxController.ShowConfirmBoxNew(o);
	}
	static GetUiViewName(o) {
		return (
			(o = ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetUiShowType(o)),
			ConfirmBoxController._bt.get(o)
		);
	}
}
(exports.ConfirmBoxController = ConfirmBoxController)._bt = new Map([
	[0, "ConfirmBoxView"],
	[1, "ConfirmBoxMiddleView"],
	[2, "ConfirmBoxMiddleWithoutItemView"],
]);
