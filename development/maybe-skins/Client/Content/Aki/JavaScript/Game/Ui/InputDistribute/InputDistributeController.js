"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputDistributeController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	InputDistributeDefine_1 = require("./InputDistributeDefine");
class InputDistributeController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.Ore(), !0;
	}
	static OnClear() {
		return this.kre(), !0;
	}
	static Ore() {
		for (const e of InputDistributeDefine_1.inputDistributeEvents)
			EventSystem_1.EventSystem.Add(e, this.kcr);
		EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.UKe),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OpenViewBegined,
				this.Fcr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OpenViewFail,
				this.Vcr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ResetModuleByResetToBattleView,
				this.VUo,
			);
	}
	static kre() {
		for (const e of InputDistributeDefine_1.inputDistributeEvents)
			EventSystem_1.EventSystem.Remove(e, this.kcr);
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OpenView,
			this.UKe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OpenViewBegined,
				this.Fcr,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OpenViewFail,
				this.Vcr,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ResetModuleByResetToBattleView,
				this.VUo,
			);
	}
	static Hcr() {
		ModelManager_1.ModelManager.InputDistributeModel.ClearAllNotAllowFightInputViewNames(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnClearNotAllowFightInputViewName,
			);
	}
	static RefreshInputTag() {
		ModelManager_1.ModelManager.InputDistributeModel.RefreshInputDistributeTag();
	}
	static BindAction(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.BindAction(e, t);
	}
	static ExecuteDelayInputAction(e) {
		ModelManager_1.ModelManager.InputDistributeModel?.ExecuteDelayInputAction(
			e,
		);
	}
	static BindActions(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.BindActions(e, t);
	}
	static UnBindAction(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.UnBindAction(e, t);
	}
	static UnBindActions(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.UnBindActions(e, t);
	}
	static BindAxis(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.BindAxis(e, t);
	}
	static BindAxes(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.BindAxes(e, t);
	}
	static UnBindAxis(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.UnBindAxis(e, t);
	}
	static UnBindAxes(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.UnBindAxes(e, t);
	}
	static BindTouch(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.BindTouch(e, t);
	}
	static BindTouches(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.BindTouches(e, t);
	}
	static UnBindTouch(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.UnBindTouch(e, t);
	}
	static UnBindTouches(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.UnBindTouches(e, t);
	}
	static BindKey(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.BindKey(e, t);
	}
	static UnBindKey(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.UnBindKey(e, t);
	}
	static InputAxis(e, t) {
		Math.abs(t) <= InputDistributeDefine_1.AXIS_TOLERANCE
			? ModelManager_1.ModelManager.InputDistributeModel?.InputAxis(e, 0)
			: ModelManager_1.ModelManager.InputDistributeModel?.InputAxis(e, t);
	}
	static InputAction(e, t) {
		return (
			!!ModelManager_1.ModelManager.InputDistributeModel &&
			ModelManager_1.ModelManager.InputDistributeModel.InputAction(e, t)
		);
	}
	static InputTouch(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.InputTouch(e, t);
	}
	static InputKey(e, t) {
		ModelManager_1.ModelManager.InputDistributeModel?.InputKey(e, t);
	}
	static GetCurrentActionName() {
		return ModelManager_1.ModelManager.InputDistributeModel.GetCurrentActionName();
	}
	static GetCurrentAxisName() {
		return ModelManager_1.ModelManager.InputDistributeModel.GetCurrentAxisName();
	}
	static IsAllowFightInput() {
		return ModelManager_1.ModelManager.InputDistributeModel.IsAllowFightInput();
	}
	static IsAllowFightMoveInput() {
		return ModelManager_1.ModelManager.InputDistributeModel.IsAllowFightMoveInput();
	}
	static IsAllowFightActionInput() {
		return ModelManager_1.ModelManager.InputDistributeModel.IsAllowFightActionInput();
	}
	static IsAllowFightCameraRotationInput() {
		return ModelManager_1.ModelManager.InputDistributeModel.IsAllowFightCameraRotationInput();
	}
	static IsAllowFightCameraZoomInput() {
		return ModelManager_1.ModelManager.InputDistributeModel.IsAllowFightCameraZoomInput();
	}
	static IsAllowHeadRotation() {
		return ModelManager_1.ModelManager.InputDistributeModel.IsAllowHeadRotation();
	}
}
((exports.InputDistributeController = InputDistributeController).kcr = () => {
	InputDistributeController.RefreshInputTag();
}),
	(InputDistributeController.nye = () => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Input", 8, "当世界加载完成时，清理所有输入分发Tag"),
			InputDistributeController.Hcr();
	}),
	(InputDistributeController.VUo = () => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Input",
				8,
				"[InputDistribute]当回到主界面时，清理所有输入分发Tag",
			),
			InputDistributeController.Hcr();
	}),
	(InputDistributeController.UKe = (e) => {
		ConfigManager_1.ConfigManager.InputDistributeConfig.IsViewAllowFightInput(
			e,
		) ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Input",
					8,
					"[InputDistribute]当打开界面时, 记录不允许输入的界面",
					["viewName", e],
				),
			ModelManager_1.ModelManager.InputDistributeModel.AddNotAllowFightInputViewName(
				e,
			)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAddNotAllowFightInputViewName,
			);
	}),
	(InputDistributeController.$Ge = (e) => {
		ConfigManager_1.ConfigManager.InputDistributeConfig.IsViewAllowFightInput(
			e,
		) ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Input",
					8,
					"[InputDistribute]当关闭界面时, 删除不允许输入的界面",
					["viewName", e],
				),
			ModelManager_1.ModelManager.InputDistributeModel.RemoveNotAllowFightInputViewName(
				e,
			)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRemoveNotAllowFightInputViewName,
			);
	}),
	(InputDistributeController.Fcr = (e) => {
		ConfigManager_1.ConfigManager.InputDistributeConfig.IsViewAllowFightInput(
			e,
		) ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Input",
					8,
					"[InputDistribute]当打开界面开始时, 将界面添加至“不允许战斗输入”Set中",
					["viewName", e],
				),
			ModelManager_1.ModelManager.InputDistributeModel.AddNotAllowFightInputViewName(
				e,
			)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAddNotAllowFightInputViewName,
			);
	}),
	(InputDistributeController.Vcr = (e) => {
		ConfigManager_1.ConfigManager.InputDistributeConfig.IsViewAllowFightInput(
			e,
		) ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Input",
					8,
					"[InputDistribute]当打开界面结束时, 清理“不允许战斗输入”Set",
					["viewName", e],
				),
			ModelManager_1.ModelManager.InputDistributeModel.RemoveNotAllowFightInputViewName(
				e,
			)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRemoveNotAllowFightInputViewName,
			);
	});
