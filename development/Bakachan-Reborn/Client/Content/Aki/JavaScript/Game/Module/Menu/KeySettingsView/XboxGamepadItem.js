"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.XboxGamepadItem = void 0);
const UE = require("ue"),
	GamepadItemBase_1 = require("./GamepadItemBase");
class XboxGamepadItem extends GamepadItemBase_1.GamepadItemBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UISprite],
			[6, UE.UISprite],
			[7, UE.UISprite],
			[8, UE.UISprite],
			[9, UE.UISprite],
			[10, UE.UISprite],
			[11, UE.UISprite],
			[12, UE.UISprite],
			[13, UE.UISprite],
			[15, UE.UISprite],
			[14, UE.UISprite],
		];
	}
	OnStart() {
		this.AddKeySprite("Gamepad_LeftY", this.GetSprite(0)),
			this.AddKeySprite("Gamepad_LeftX", this.GetSprite(0)),
			this.AddKeySprite("Gamepad_LeftThumbstick", this.GetSprite(0)),
			this.AddKeySprite("Gamepad_RightY", this.GetSprite(1)),
			this.AddKeySprite("Gamepad_RightX", this.GetSprite(1)),
			this.AddKeySprite("Gamepad_RightThumbstick", this.GetSprite(1)),
			this.AddKeySprite("Gamepad_DPad_Up", this.GetSprite(2)),
			this.AddKeySprite("Gamepad_DPad_Down", this.GetSprite(3)),
			this.AddKeySprite("Gamepad_DPad_Left", this.GetSprite(4)),
			this.AddKeySprite("Gamepad_DPad_Right", this.GetSprite(5)),
			this.AddKeySprite("Gamepad_FaceButton_Top", this.GetSprite(6)),
			this.AddKeySprite("Gamepad_FaceButton_Bottom", this.GetSprite(7)),
			this.AddKeySprite("Gamepad_FaceButton_Left", this.GetSprite(8)),
			this.AddKeySprite("Gamepad_FaceButton_Right", this.GetSprite(9)),
			this.AddKeySprite("Gamepad_LeftShoulder", this.GetSprite(10)),
			this.AddKeySprite("Gamepad_LeftTriggerAxis", this.GetSprite(11)),
			this.AddKeySprite("Gamepad_LeftTrigger", this.GetSprite(11)),
			this.AddKeySprite("Gamepad_RightShoulder", this.GetSprite(12)),
			this.AddKeySprite("Gamepad_RightTriggerAxis", this.GetSprite(13)),
			this.AddKeySprite("Gamepad_RightTrigger", this.GetSprite(13)),
			this.AddKeySprite("Gamepad_Special_Left", this.GetSprite(15)),
			this.AddKeySprite("Gamepad_Special_Right", this.GetSprite(14));
	}
}
exports.XboxGamepadItem = XboxGamepadItem;
