"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ModDebuger = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	ModManager_1 = require("../ModManager"),
	ModUtils_1 = require("./ModUtils"),
	UiManager_1 = require("../../../Ui/UiManager");
class ModDebuger {
	static Setting = { EnableDebug: !1, debugcount: 0 };
	static EnableDebug() {
		if (ModManager_1.ModManager.listenKey("EnableDebug", "Tab")) {
			if (this.Setting.debugcount < 2) return void ++this.Setting.debugcount;
			2 != this.Setting.debugcount ||
				this.Setting.EnableDebug ||
				((this.Setting.EnableDebug = !0),
				ModManager_1.ModManager.ShowTip("ModDebuger | Enabled"),
				ModManager_1.ModManager.AddKey("TPto", "g")),
				1 == this.Setting.EnableDebug && this.showdedbugmenu();
		}
	}
	static showdedbugmenu() {
		ModManager_1.ModManager.ShowConfirmBox("ModDebuger Menu", "TPto[G]", 50);
	}
	static TestMethod() {
		ModManager_1.ModManager.AddKey("EnableDebug", "Tab");
	}
	static ListenDebug() {
		ModManager_1.ModManager.listenKey("TPto", "g") && this.Tpto();
	}
	static Tpto() {
		ModUtils_1.ModUtils.KuroSingleInputBox({
			title: "ModDebuger:TP to",
			customFunc: async (e) => {
				if (/^(-?\d+(\.\d+)?,){2}-?\d+(\.\d+)?$/.test(e)) {
					var t = e.split(",").map(Number);
					ModManager_1.ModManager.TpNoloadingTo(
						100 * t[0],
						100 * t[1],
						100 * t[2],
					);
				} else ModManager_1.ModManager.ShowTip("is not a pos");
			},
			inputText: "0.00,0.00,0.00",
			defaultText: "Please enter pos",
			isCheckNone: !0,
			needFunctionButton: !1,
		});
	}
	static 单输入框测试() {
		ModUtils_1.ModUtils.KuroSingleInputBox({
			title: "你的标题",
			customFunc: async (e) => {},
			inputText: "你的输入文本",
			defaultText: "你的默认文本",
			isCheckNone: !1,
			needFunctionButton: !1,
		});
	}
	static 多输入框测试() {
		UiManager_1.UiManager.OpenView("CommonMultiInputView", {
			Title: "多输入框测试",
			CustomFunc: async (e) => {},
			InputText: "多输入框测试",
			DefaultText: "多输入框测试",
			IsCheckNone: !0,
			NeedFunctionButton: !1,
		});
	}
}
exports.ModDebuger = ModDebuger;
