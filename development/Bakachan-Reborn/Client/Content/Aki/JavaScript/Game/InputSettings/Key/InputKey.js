"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputKey = void 0);
const UE = require("ue"),
	Global_1 = require("../../Global"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager");
class InputKey {
	constructor(e) {
		(this.HSe = ""),
			(this.IsKeyboardKey = !1),
			(this.IsModifierKey = !1),
			(this.IsGamepadKey = !1),
			(this.IsMouseButton = !1),
			(this.IsDigital = !1),
			(this.IsAnalog = !1),
			(this.IsButtonAxis = !1),
			(this.IsAxis1D = !1),
			(this.IsAxis2D = !1),
			(this.IsAxis3D = !1),
			(this.jSe = void 0),
			(this.HSe = e),
			(this.jSe = new UE.Key(new UE.FName(e))),
			(this.IsKeyboardKey = UE.KismetInputLibrary.Key_IsKeyboardKey(this.jSe)),
			(this.IsModifierKey = UE.KismetInputLibrary.Key_IsModifierKey(this.jSe)),
			(this.IsGamepadKey = UE.KismetInputLibrary.Key_IsGamepadKey(this.jSe)),
			(this.IsMouseButton = UE.KismetInputLibrary.Key_IsMouseButton(this.jSe)),
			(this.IsDigital = UE.KismetInputLibrary.Key_IsDigital(this.jSe)),
			(this.IsAnalog = UE.KismetInputLibrary.Key_IsAnalog(this.jSe)),
			(this.IsButtonAxis = UE.KismetInputLibrary.Key_IsButtonAxis(this.jSe)),
			(this.IsAxis1D = UE.KismetInputLibrary.Key_IsAxis1D(this.jSe)),
			(this.IsAxis2D = UE.KismetInputLibrary.Key_IsAxis2D(this.jSe)),
			(this.IsAxis3D = UE.KismetInputLibrary.Key_IsAxis3D(this.jSe));
	}
	GetKeyName() {
		return this.HSe;
	}
	ToUeKey() {
		return this.jSe;
	}
	GetConfig() {
		return this.IsKeyboardKey || this.IsMouseButton
			? ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfig(
					this.HSe,
				)
			: this.IsGamepadKey
				? ConfigManager_1.ConfigManager.InputSettingsConfig.GetGamepadKeyConfig(
						this.HSe,
					)
				: void 0;
	}
	GetKeyIconPath() {
		var e, t;
		return this.IsKeyboardKey || this.IsMouseButton
			? ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfig(
					this.HSe,
				)?.KeyIconPath ?? ""
			: this.IsGamepadKey &&
					((e = ModelManager_1.ModelManager.PlatformModel.PlatformType),
					(t =
						ConfigManager_1.ConfigManager.InputSettingsConfig.GetGamepadKeyConfig(
							this.HSe,
						)))
				? 7 === e
					? t.PsKeyIconPath
					: t.KeyIconPath
				: "";
	}
	IsInputKeyDown() {
		return Global_1.Global.CharacterController.IsInputKeyDown(this.ToUeKey());
	}
	GetInputAnalogKeyState() {
		return Global_1.Global.CharacterController.GetInputAnalogKeyState(
			this.ToUeKey(),
		);
	}
}
exports.InputKey = InputKey;
