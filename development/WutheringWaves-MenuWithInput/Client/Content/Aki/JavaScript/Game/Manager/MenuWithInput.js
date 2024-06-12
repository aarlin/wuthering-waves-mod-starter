"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuWithInput = void 0);
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  InputSettings_1 = require("../InputSettings/InputSettings"),
  InputController_1 = require("../Input/InputController"),
  ModelManager_1 = require("./ModelManager"),
  ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController");

class MenuWithInput extends UiControllerBase_1.UiControllerBase {
  static Settings = {
    CurrentString: -1,
  };

  static StartMod() {
    InputSettings_1.InputSettings.AddActionMapping("ShowMenuWithInput", "g");
  }

  static HandleKeyInputs(keyPressed) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(keyPressed)
    if (InputController_1.InputController.IsCustomKeyUp("g")) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("g key was pressed")
      this.showMenuWithInput();
    }
  }

  static listenKey(description, key) {
    return InputController_1.InputController.IsCustomKeyUp(key);
  }

  static showMenuWithInput() {
    // UiManager_1.UiManager.OpenView("CdKeyInputView", {
    //   Title: "Menu With Input",
    //   CustomFunc: async (string) => {
    //     this.Settings.CurrentString = string;
    //     ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("Showing menu with input");
    //     UiManager_1.UiManager.CloseView("UidView");
    //     UiManager_1.UiManager.OpenView("UidView");
    //   },
    //   InputText: this.Settings.CurrentString,
    //   DefaultText: "CurrentString",
    //   IsCheckNone: true,
    //   NeedFunctionButton: false,
    // });

    UiManager_1.UiManager.OpenView("CommonSingleInputView", {
      Title: "Menu With Input",
      CustomFunc: async (string) => {
        this.Settings.CurrentString = string;
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("Showing menu with input");
        UiManager_1.UiManager.CloseView("UidView");
        UiManager_1.UiManager.OpenView("UidView");
      },
      InputText: this.Settings.CurrentString,
        DefaultText: "CurrentString",
        IsCheckNone: true,
        NeedFunctionButton: false,
    });

    // var e = {
    // 	TitleTextArgs: new LguiUtil_1.TableTextArgNew(
    // 		"PrefabTextItem_CDKey_Title",
    // 	),
    // 	ConfirmFunc: CdKeyInputController_1.CdKeyInputController.RequestCdKey,
    // 	DefaultText:
    // 		MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
    // 			"CDKey_InputEmpty",
    // 		) ?? "",
    // 	InputText: "",
    // 	IsCheckNone: !0,
    // 	NeedFunctionButton: !0,
    // };
    // UiManager_1.UiManager.OpenView("CdKeyInputView", e);
  }

}
exports.MenuWithInput = MenuWithInput;
