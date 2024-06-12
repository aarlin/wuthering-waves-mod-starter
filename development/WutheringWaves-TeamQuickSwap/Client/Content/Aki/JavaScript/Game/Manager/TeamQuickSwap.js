"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeamQuickSwap = void 0);
const UiManager_1 = require("../../Ui/UiManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputSettings_1 = require("../InputSettings/InputSettings"),
  InputController_1 = require("../Input/InputController"),
  ModelManager_1 = require("../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController");

class TeamQuickSwap extends UiControllerBase_1.UiControllerBase {
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
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("Changed to Team 1");
      this.swapTeam(1);
    } else if (this.listenKey("ChangeToTeam2", "F9")) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("Changed to Team 2");
      this.swapTeam(2);
    }
    else if (this.listenKey("ChangeToTeam3", "F10")) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("Changed to Team 3");
      this.swapTeam(3);
    }
    else if (this.listenKey("ChangeToTeam4", "F11")) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("Changed to Team 4");
      this.swapTeam(4);
    }
    else if (this.listenKey("ChangeToTeam5", "F12")) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("Changed to Team 5");
      this.swapTeam(5);
    } else {
      return;
    }
  }

  static AddToggle(desc, key) {
    InputSettings_1.InputSettings.AddActionMapping(desc, key);
  }
  static RemoveToggle(desc, key) {
    InputSettings_1.InputSettings.RemoveActionMapping(desc, key);
  }

  static RemoveKey(desc, key) {
    InputSettings_1.InputSettings.RemoveActionMapping(desc, key);
  }

  static Toggle(func) {
    if (this.Settings.hasOwnProperty(func)) {
      this.Settings[func] = !this.Settings[func];
    }
  }

  static listenKey(desc, key) {
    return InputController_1.InputController.IsModKeyUp(key);
  }

  static swapTeam(teamIndex) {
    ModelManager_1.ModelManager.RoleSelectModel.ClearData();
    ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(teamIndex)
  }

}
exports.TeamQuickSwap = TeamQuickSwap;
