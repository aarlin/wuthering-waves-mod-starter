"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenSystemGameSysOpen = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	FunctionController_1 = require("../../../Module/Functional/FunctionController"),
	OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemGameSysOpen extends OpenSystemBase_1.OpenSystemBase {
	async ExecuteOpenView(e, n) {
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Functional", 11, "行为节点触发功能开启"),
			e.BoardId
				? FunctionController_1.FunctionController.ManualOpenFunctionOpenView(
						e.BoardId,
					)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("Functional", 11, "手动打开功能开启界面参数有问题"),
					!1)
		);
	}
	GetViewName(e, n) {
		return "FunctionOpenView";
	}
}
exports.OpenSystemGameSysOpen = OpenSystemGameSysOpen;
