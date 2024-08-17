"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PausePanel = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction"),
	UiManager_1 = require("../../../../Ui/UiManager");
class PausePanel extends UiComponentsAction_1.UiComponentsAction {
	constructor() {
		super(...arguments),
			(this.wvo = () => {
				UiManager_1.UiManager.CloseView("SignalDecodeView");
			}),
			(this.Bvo = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSignalCatchStartAgain,
				);
			}),
			(this.bvo = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSignalCatchContinue,
				);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[0, this.wvo],
				[1, this.Bvo],
				[2, this.bvo],
			]);
	}
}
exports.PausePanel = PausePanel;
