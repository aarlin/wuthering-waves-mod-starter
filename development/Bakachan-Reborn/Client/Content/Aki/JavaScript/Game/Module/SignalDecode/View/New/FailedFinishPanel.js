"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FailedFinishPanel = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../../Util/LguiUtil");
class FailedFinishPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.LevelSequencePlayer = void 0),
			(this.wvo = () => {
				UiManager_1.UiManager.CloseView("SignalDecodeView");
			}),
			(this.Bvo = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSignalCatchStartAgain,
				),
					this.Close();
			}),
			(this.aut = (e) => {
				"Close" === e && this.SetUiActive(!1);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[0, this.wvo],
				[1, this.Bvo],
			]);
	}
	OnStart() {
		(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
			this.RootItem,
		)),
			this.LevelSequencePlayer.BindSequenceCloseEvent(this.aut),
			3 === ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType &&
				(LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(3),
					"SignalMusicFailTips2",
				),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(4),
					"SignalMusicFailTips",
				));
	}
	Open() {
		this.SetUiActive(!0),
			this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
	}
	Close() {
		this.LevelSequencePlayer.PlayLevelSequenceByName("Close");
	}
}
exports.FailedFinishPanel = FailedFinishPanel;
