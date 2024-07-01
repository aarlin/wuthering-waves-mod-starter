"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CreateCharacterInputDistribute = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	UiManager_1 = require("../../UiManager"),
	InputDistributeDefine_1 = require("../InputDistributeDefine"),
	InputDistributeSetup_1 = require("./InputDistributeSetup");
class CreateCharacterInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
	OnRefresh() {
		return (
			!!UiManager_1.UiManager.IsViewShow("CreateCharacterView") &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Input",
					8,
					"[InputDistribute]在创角中，则设置输入分发tag为 UiInputRootTag",
				),
			this.SetInputDistributeTag(
				InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag,
			),
			!0)
		);
	}
}
exports.CreateCharacterInputDistribute = CreateCharacterInputDistribute;
