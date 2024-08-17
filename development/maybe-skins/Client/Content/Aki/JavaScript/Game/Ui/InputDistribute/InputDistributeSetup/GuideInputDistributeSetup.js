"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideInputDistributeSetup = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	InputDistributeDefine_1 = require("../InputDistributeDefine"),
	InputDistributeSetup_1 = require("./InputDistributeSetup");
class GuideInputDistributeSetup extends InputDistributeSetup_1.InputDistributeSetup {
	OnRefresh() {
		return (
			!!ModelManager_1.ModelManager.GuideModel.IsGuideLockingInput &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Input",
					8,
					"[InputDistribute]引导遮罩中，则设置输入分发tag为 BlockAllInputTag",
				),
			this.SetInputDistributeTag(
				InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag,
			),
			!0)
		);
	}
}
exports.GuideInputDistributeSetup = GuideInputDistributeSetup;
