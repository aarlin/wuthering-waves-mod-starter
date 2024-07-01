"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonGuideController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	GuideController_1 = require("../Guide/GuideController"),
	JoinTeamController_1 = require("../JoinTeam/JoinTeamController");
class InstanceDungeonGuideController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.mEe(), !0;
	}
	static OnClear() {
		return this.dEe(), !0;
	}
	static mEe() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.WorldDoneAndCloseLoading,
			this.nye,
		);
	}
	static dEe() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WorldDoneAndCloseLoading,
			this.nye,
		);
	}
	static StartReplayGuide() {
		ModelManager_1.ModelManager.GuideModel.ClearAllGroup(),
			InstanceDungeonGuideController.ali();
	}
	static ali() {
		var e =
				ModelManager_1.ModelManager.InstanceDungeonGuideModel.GetCurrentInstanceDungeonGuideType(),
			n =
				ModelManager_1.ModelManager.InstanceDungeonGuideModel.GetCurrentInstanceDungeonGuideValue();
		switch (e) {
			case 0:
				break;
			case 1:
				JoinTeamController_1.JoinTeamController.OpenJoinTeamView(n);
				break;
			case 2:
				UiManager_1.UiManager.OpenView("InstanceDungeonGuideView");
				break;
			case 3:
				UiManager_1.UiManager.IsViewShow("GuideTutorialTipsView") ||
					GuideController_1.GuideController.TryStartGuide(n);
				break;
			case 4:
				UiManager_1.UiManager.OpenView("RoleIntroductionView", n);
		}
	}
	static GetHaveGuide() {
		return (
			0 !==
			ModelManager_1.ModelManager.InstanceDungeonGuideModel.GetCurrentInstanceDungeonGuideType()
		);
	}
}
(exports.InstanceDungeonGuideController = InstanceDungeonGuideController),
	((_a = InstanceDungeonGuideController).nye = () => {
		ModelManager_1.ModelManager.InstanceDungeonGuideModel.RefreshCurrentDungeonGuide(),
			ModelManager_1.ModelManager.InstanceDungeonGuideModel.GetHaveGuide() &&
				_a.StartReplayGuide();
	});
