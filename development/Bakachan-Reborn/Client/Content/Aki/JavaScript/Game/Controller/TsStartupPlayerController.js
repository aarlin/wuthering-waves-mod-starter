"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsStartupPlayerController = void 0);
const InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine"),
	TsBasePlayerController_1 = require("./TsBasePlayerController");
class TsStartupPlayerController extends TsBasePlayerController_1.TsBasePlayerController {
	BindActionHandle() {
		super.BindActionHandle(),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.Ui左键点击),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.Ui右键点击),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.Ui方向上),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.Ui方向下),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.Ui方向左),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.Ui方向右),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.Ui返回),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI键盘F手柄A),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI键盘R手柄X),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI键盘T手柄Y),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI键盘Q手柄LB),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI键盘E手柄RB),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI键盘Z手柄LT),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI键盘C手柄RT),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI手柄右摇杆上),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI手柄右摇杆下),
			this.AddActionHandle(
				InputMappingsDefine_1.actionMappings.UI键盘G手柄特右,
			),
			this.AddActionHandle(
				InputMappingsDefine_1.actionMappings.UI键盘X手柄特左,
			),
			this.AddActionHandle(
				InputMappingsDefine_1.actionMappings.UI键盘U手柄左摇杆,
			),
			this.AddActionHandle(
				InputMappingsDefine_1.actionMappings.UI键盘G手柄右摇杆,
			),
			this.AddActionHandle(
				InputMappingsDefine_1.actionMappings.UI键盘Y手柄特右,
			),
			this.AddActionHandle(
				InputMappingsDefine_1.actionMappings.UI键盘H手柄特左,
			),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI键盘ESC手柄B),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI键鼠F空格),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI手柄A方向右),
			this.AddActionHandle(InputMappingsDefine_1.actionMappings.UI手柄B方向左);
	}
	BindAxisHandle() {
		super.BindAxisHandle(),
			this.AddAxisHandle(InputMappingsDefine_1.axisMappings.WheelAxis),
			this.AddAxisHandle(
				InputMappingsDefine_1.axisMappings.NavigationLeftRight,
			),
			this.AddAxisHandle(InputMappingsDefine_1.axisMappings.NavigationTopDown),
			this.AddAxisHandle(InputMappingsDefine_1.axisMappings.Ui左摇杆),
			this.AddAxisHandle(InputMappingsDefine_1.axisMappings.Ui右摇杆),
			this.AddAxisHandle(InputMappingsDefine_1.axisMappings.NextGroup),
			this.AddAxisHandle(InputMappingsDefine_1.axisMappings.PrevGroup),
			this.AddAxisHandle(InputMappingsDefine_1.axisMappings.MouseMove);
	}
}
(exports.TsStartupPlayerController = TsStartupPlayerController),
	(exports.default = TsStartupPlayerController);
