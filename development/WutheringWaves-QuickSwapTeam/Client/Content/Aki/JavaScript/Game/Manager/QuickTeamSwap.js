"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuickTeamSwap = void 0);
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	InputSettings_1 = require("../InputSettings/InputSettings"),
	InputController_1 = require("../Input/InputController"),
	ModelManager_1 = require("../Manager/ModelManager"),
	ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController");

class QuickTeamSwap extends UiControllerBase_1.UiControllerBase {
	static Settings = {
		CurrentTeam: -1,
	};

	static StartMod() {
		InputSettings_1.InputSettings.AddActionMapping("ChangeToTeam1", "F8");
		InputSettings_1.InputSettings.AddActionMapping("ChangeToTeam2", "F9");
		InputSettings_1.InputSettings.AddActionMapping("ChangeToTeam3", "F10");
		InputSettings_1.InputSettings.AddActionMapping("ChangeToTeam4", "F11");
		InputSettings_1.InputSettings.AddActionMapping("ChangeToTeam5", "F12");
	}

	static HandleKeyInputs() {
		// ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(JSON.stringify(ModelManager_1.ModelManager.RoleModel.GetRoleList()))
		if (this.listenKey("ChangeToTeam1", "F8")) {
			this.changeTeam();
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
				"Changed to Team 1",
			);
			// this.swapTeam(1);
		}
		if (this.listenKey("ChangeToTeam2", "F9")) {
			this.changeTeam();
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
				"Changed to Team 2",
			);
			// this.swapTeam(2);
		}
		if (this.listenKey("ChangeToTeam3", "F10")) {
			this.changeTeam();
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
				"Changed to Team 3",
			);
			// this.swapTeam(3);
		}
		if (this.listenKey("ChangeToTeam4", "F11")) {
			this.changeTeam();
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
				"Changed to Team 4",
			);
			// this.swapTeam(4);
		}
		if (this.listenKey("ChangeToTeam5", "F12")) {
			this.changeTeam();
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
				"Changed to Team 5",
			);
			// this.swapTeam(5);
		}
	}

	static AddToggle(description, key) {
		InputSettings_1.InputSettings.AddActionMapping(description, key);
	}
	static RemoveToggle(description, key) {
		InputSettings_1.InputSettings.RemoveActionMapping(description, key);
	}

	static RemoveKey(description, key) {
		InputSettings_1.InputSettings.RemoveActionMapping(description, key);
	}

	static Toggle(func) {
		if (this.Settings.hasOwnProperty(func)) {
			this.Settings[func] = !this.Settings[func];
		}
	}

	static listenKey(description, key) {
		return InputController_1.InputController.IsModKeyUp(key);
	}

	static swapTeam(teamNumber) {
		ModelManager_1.ModelManager.RoleSelectModel.ClearData();
		ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(teamNumber);
	}

	static changeTeam() {
		UiManager_1.UiManager.OpenView("CommonSingleInputView", {
			Title: "Quick Team Swap",
			CustomFunc: async (string) => {
				this.Settings.CurrentTeam = string;
				this.ShowTip("CurrentTeam Changed to: " + string);
				UiManager_1.UiManager.CloseView("UidView");
				UiManager_1.UiManager.OpenView("UidView");
			},
			InputText: this.Settings.CurrentTeam,
			DefaultText: "CurrentTeam",
			IsCheckNone: true,
			NeedFunctionButton: false,
		});
	}
}
exports.QuickTeamSwap = QuickTeamSwap;
