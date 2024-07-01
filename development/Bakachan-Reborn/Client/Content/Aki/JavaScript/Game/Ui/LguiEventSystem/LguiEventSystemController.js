"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LguiEventSystemController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	InputDistributeController_1 = require("../InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine"),
	LguiEventSystemManager_1 = require("./LguiEventSystemManager");
class LguiEventSystemController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.Ore(), !0;
	}
	static OnClear() {
		return this.kre(), !0;
	}
	static Ore() {
		InputDistributeController_1.InputDistributeController.BindActions(
			[
				InputMappingsDefine_1.actionMappings.Ui左键点击,
				InputMappingsDefine_1.actionMappings.Ui右键点击,
			],
			this.kmr,
		),
			InputDistributeController_1.InputDistributeController.BindAxis(
				InputMappingsDefine_1.axisMappings.WheelAxis,
				this.cui,
			);
	}
	static kre() {
		InputDistributeController_1.InputDistributeController.UnBindActions(
			[
				InputMappingsDefine_1.actionMappings.Ui左键点击,
				InputMappingsDefine_1.actionMappings.Ui右键点击,
			],
			this.kmr,
		),
			InputDistributeController_1.InputDistributeController.UnBindAxis(
				InputMappingsDefine_1.axisMappings.WheelAxis,
				this.cui,
			);
	}
}
((exports.LguiEventSystemController = LguiEventSystemController).kmr = (
	t,
	e,
) => {
	LguiEventSystemManager_1.LguiEventSystemManager.ClickedMouse(t, e);
}),
	(LguiEventSystemController.cui = (t, e) => {
		LguiEventSystemManager_1.LguiEventSystemManager.InputWheelAxis(t, e);
	});
