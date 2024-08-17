"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CursorController = void 0);
const UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class CursorController extends UiControllerBase_1.UiControllerBase {
	static Init() {
		return super.Init(), !0;
	}
	static DOt(r) {
		var e = Global_1.Global.CharacterController;
		e && (e.CurrentMouseCursor = r ? 16 : 1);
	}
	static InitMouseByMousePos() {
		var r,
			e = UE.KuroStaticLibrary.GetSlateApplicationCursorPos();
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"UiCommon",
				28,
				"InitMouseByMousePos",
				["viewPortMousePosition.X", e.X],
				["viewPortMousePosition.Y", e.Y],
			),
			(0 < e.X || 0 < e.Y) &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCommon", 28, "Mouse在屏幕内"),
				(r = UE.KuroStaticLibrary.GetGameViewPort()),
				UE.KuroStaticLibrary.DoGameViewPortMouseEnter(r, e.X, e.Y));
	}
	static SetWindowCursorStyle() {
		if (
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("UiCommon", 28, "SetWindowCursorStyle"),
			ModelManager_1.ModelManager.PlatformModel.IsPc())
		) {
			let o, t, a;
			a = Info_1.Info.IsPlayInEditor
				? ((o = FNameUtil_1.FNameUtil.GetDynamicFName(
						"Aki/UI/Module/Cursor/SourceResource/CursorNor",
					)),
					(t = FNameUtil_1.FNameUtil.GetDynamicFName(
						"Aki/UI/Module/Cursor/SourceResource/CursorHi",
					)),
					FNameUtil_1.FNameUtil.GetDynamicFName(
						"Aki/UI/Module/Cursor/SourceResource/CursorPre",
					))
				: ((o = FNameUtil_1.FNameUtil.GetDynamicFName("Aki/Cursor/CursorNor")),
					(t = FNameUtil_1.FNameUtil.GetDynamicFName("Aki/Cursor/CursorHi")),
					FNameUtil_1.FNameUtil.GetDynamicFName("Aki/Cursor/CursorPre"));
			var r = new UE.Vector2D(0, 0),
				e = GlobalData_1.GlobalData.World.GetWorld();
			UE.WidgetBlueprintLibrary.SetHardwareCursor(e, 1, o, r),
				UE.WidgetBlueprintLibrary.SetHardwareCursor(e, 16, t, r),
				UE.WidgetBlueprintLibrary.SetHardwareCursor(e, 15, a, r);
		}
	}
}
(exports.CursorController = CursorController).CursorEnterExit = (r) => {
	CursorController.DOt(r);
};
