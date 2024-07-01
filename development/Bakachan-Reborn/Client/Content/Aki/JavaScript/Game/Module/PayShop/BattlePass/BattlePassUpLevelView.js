"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassUpLevelView = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager");
class BattlePassUpLevelView extends UiViewBase_1.UiViewBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	OnStart() {
		var e = ModelManager_1.ModelManager.BattlePassModel.BattlePassLevel,
			t = this.OpenParam.IncreasedLevel;
		this.GetText(1).SetText(e.toString()),
			this.GetText(0).SetText((e - t).toString()),
			TimerSystem_1.TimerSystem.Delay(() => {
				UiManager_1.UiManager.CloseView(this.Info.Name);
			}, 2e3);
	}
	OnAfterHide() {
		this.OpenParam.FirstUnlockPass &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.BattlePassFirstUnlockAnime,
			);
	}
}
exports.BattlePassUpLevelView = BattlePassUpLevelView;
