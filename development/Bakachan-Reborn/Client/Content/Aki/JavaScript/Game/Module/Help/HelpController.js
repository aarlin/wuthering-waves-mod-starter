"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HelpController = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager");
class HelpController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return (
			UE.UIExtendButtonComponent.SetDelegateForHelpClick(
				(0, puerts_1.toManualReleaseDelegate)(HelpController._ei),
			),
			!0
		);
	}
	static OpenHelpById(e) {
		var r =
			ConfigManager_1.ConfigManager.HelpConfig.GetHelpContentInfoByGroupId(e);
		if (void 0 !== r && 0 !== r.length)
			switch (((this.HelpGroupId = e), r[0].Type)) {
				case 0:
					UiManager_1.UiManager.OpenView(
						"HelpView",
						this.HelpGroupId,
						this.uei,
					);
					break;
				case 1:
					UiManager_1.UiManager.OpenView(
						"HelpGuideView",
						this.HelpGroupId,
						this.uei,
					);
			}
	}
	static OnClear() {
		return (0, puerts_1.releaseManualReleaseDelegate)(HelpController._ei), !0;
	}
}
(exports.HelpController = HelpController),
	((_a = HelpController).HelpGroupId = void 0),
	(HelpController._ei = (e) => {
		HelpController.OpenHelpById(e);
	}),
	(HelpController.uei = (e) => {
		e && (_a.HelpGroupId = void 0);
	});
