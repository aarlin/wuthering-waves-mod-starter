"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuWithText = void 0);
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  InputSettings_1 = require("../InputSettings/InputSettings"),
  InputController_1 = require("../Input/InputController"),
  ModelManager_1 = require("./ModelManager"),
  ConfirmBoxController_1 = require("../Module/ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController");

class MenuWithText extends UiControllerBase_1.UiControllerBase {

  static StartMod() {
    InputSettings_1.InputSettings.AddActionMapping("ShowMenuWithText", "g");
  }

  static HandleKeyInputs() {
    if (InputController_1.InputController.IsCustomKeyUp("g")) {
      this.showConfirmBox('ConfirmBoxTitle', 'ConfirmBoxTextContent', 50)
    }
  }

  static showConfirmBox(title, textContent, id) {
    const confirmBox = new ConfirmBoxDefine_1.ConfirmBoxDataNew(id);
    confirmBox.SetTextArgs(textContent);
    confirmBox.SetTitle(title);
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(confirmBox);
  }
}
exports.MenuWithText = MenuWithText;
