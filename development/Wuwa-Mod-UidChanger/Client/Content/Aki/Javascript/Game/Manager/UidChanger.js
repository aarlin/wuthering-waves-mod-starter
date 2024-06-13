"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UidChanger = void 0);
const UiManager_1 = require("../../Ui/UiManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	InputSettings_1 = require("../InputSettings/InputSettings"),
	InputController_1 = require("../Input/InputController"),
	ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController"),
	UidView_1 = require("../Module/UidShow/UidView");

class UidChanger extends UiControllerBase_1.UiControllerBase {
	static Settings = {
		ChangeUid: false,
		Uid: "000000001",
	};

	static AddModkeys() {
		this.AddKey("ChangeUid", "End");
	}

	static listenModsToggle() {
		if (this.listenKey("ChangeUid", "End")) {
			this.ChangeUid();
		}
	}

	static AddToggle(desc, key) {
		InputSettings_1.InputSettings.AddActionMapping(desc, key);
	}
	static RemoveToggle(desc, key) {
		InputSettings_1.InputSettings.RemoveActionMapping(desc, key);
	}
	static AddKey(desc, key) {
		InputSettings_1.InputSettings.AddActionMapping(desc, key);
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
		return InputController_1.InputController.IsMyKeyUp(key);
	}

	static ShowTip(string) {
		ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(string);
	}

	static ChangeUid() {
		UiManager_1.UiManager.OpenView("CommonSingleInputView", {
			Title: "UID Changer",
			CustomFunc: async (string) => {
				this.Settings.Uid = string;
				this.ShowTip("UID Changed to: " + string);
				UiManager_1.UiManager.CloseView("UidView");
				UiManager_1.UiManager.OpenView("UidView");
			},
			InputText: this.Settings.Uid,
			DefaultText: "UID",
			IsCheckNone: true,
			NeedFunctionButton: false,
		});
	}
}
exports.UidChanger = UidChanger;
