"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Global_1 = require("../Global"),
	ModelManager_1 = require("../Manager/ModelManager"),
	InputDistributeDefine_1 = require("../Ui/InputDistribute/InputDistributeDefine"),
	InputController_1 = require("./InputController"),
	InputEnums_1 = require("./InputEnums"),
	ControllerHolder_1 = require("../Manager/ControllerHolder");
class InputBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static PreProcessInput(t, e) {
		InputController_1.InputController.PreProcessInput(t, e);
	}
	static PostProcessInput(t, e) {
		InputController_1.InputController.PostProcessInput(t, e);
	}
	static IsKeyDown(t) {
		return InputController_1.InputController.IsKeyDown(t);
	}
	static SetTimeDilation(t) {
		ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(t);
	}
	static GetActionInputDistributeTag(t) {
		return InputDistributeDefine_1.actionTagMap.get(t);
	}
	static GetAxisInputDistributeTag(t) {
		return InputDistributeDefine_1.axisTagMap.get(t);
	}
	static GetAllInputDistributeTag() {
		var t = UE.NewArray(UE.BuiltinString);
		for (const e of InputDistributeDefine_1.initializeInputDistributeTagDefine)
			t.Add(e.Tag);
		return t;
	}
	static HasMoveAxisInput() {
		var t, e;
		return (
			!(
				1 !== ModelManager_1.ModelManager.PlatformModel?.OperationType ||
				!ModelManager_1.ModelManager.BattleUiModel?.IsPressJoyStick
			) ||
			!(
				!(t = ModelManager_1.ModelManager.InputModel?.GetAxisValues()) ||
				!(
					(e = t.get(InputEnums_1.EInputAxis.MoveForward)) ||
					(t = t.get(InputEnums_1.EInputAxis.MoveRight)) ||
					(0 !== e &&
						0 !== t &&
						(e =
							Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(
								52,
							)) &&
						(e.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward) ||
							e.QueryInputAxis(InputEnums_1.EInputAxis.MoveRight)))
				)
			)
		);
	}
}
exports.default = InputBlueprintFunctionLibrary;
