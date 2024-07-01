"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ModUtils = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	ModManager_1 = require("../ModManager"),
	ModelManager_1 = require("../ModelManager"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	LguiUtil_1 = require("../../Module/Util/LguiUtil"),
	UiManager_1 = require("../../Ui/UiManager");
class ModUtils {
	static KuroSingleInputBox(e) {
		UiManager_1.UiManager.OpenView("CommonSingleInputView", {
			TitleTextArgs: new LguiUtil_1.TableTextArgNew("bugged"),
			ConfirmFunc: e.ConfirmFunc,
			InputText: e.InputText,
			DefaultText: e.DefaultText,
			IsCheckNone: e.IsCheckNone,
			NeedFunctionButton: e.NeedFunctionButton,
		});
	}
	static StringToInt(e) {
		var r = parseInt(e);
		return isNaN(r)
			? (ModManager_1.ModManager.ShowTip("str is not int"), "error")
			: r;
	}
	static IsTping() {
		return ModelManager_1.ModelManager.TeleportModel.IsTeleport;
	}
	static async Sleep(e) {
		await TimerSystem_1.TimerSystem.Wait(e);
	}
}
exports.ModUtils = ModUtils;
