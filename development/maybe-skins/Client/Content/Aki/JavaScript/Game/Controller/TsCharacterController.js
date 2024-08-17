"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsCharacterController = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	Vector2D_1 = require("../../Core/Utils/Math/Vector2D"),
	CameraController_1 = require("../Camera/CameraController"),
	InputController_1 = require("../Input/InputController"),
	ModelManager_1 = require("../Manager/ModelManager"),
	InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine"),
	UiLayer_1 = require("../Ui/UiLayer"),
	TsBasePlayerController_1 = require("./TsBasePlayerController"),
	LEFT_BARACKET_NAME = new UE.FName("LeftBracket"),
	RIGHT_BARACKET_NAME = new UE.FName("RightBracket");
class TsCharacterController extends TsBasePlayerController_1.TsBasePlayerController {
	constructor() {
		super(...arguments),
			(this.CursorInputVector = void 0),
			(this.MoveInputVector = void 0);
	}
	ReceiveBeginPlay() {
		super.ReceiveBeginPlay(),
			(this.ChangeRotationOnPossess = !1),
			(this.bShowMouseCursor = !0),
			UE.KuroInputFunctionLibrary.ApplyInputMode(this);
	}
	ReceivePossess(e) {
		super.ReceivePossess(e), CameraController_1.CameraController.OnPossess(e);
	}
	ReceiveUnPossess(e) {
		super.ReceiveUnPossess(e),
			CameraController_1.CameraController.OnPossess(void 0);
	}
	OnSetupInputComponent() {
		super.OnSetupInputComponent(),
			(this.CursorInputVector = Vector2D_1.Vector2D.Create(0, 0)),
			(this.MoveInputVector = Vector2D_1.Vector2D.Create(0, 0));
	}
	BindActionHandle() {
		super.BindActionHandle();
		var e = (0, puerts_1.$ref)(void 0),
			r =
				(UE.InputSettings.GetInputSettings().GetActionNames(e),
				(0, puerts_1.$unref)(e));
		for (let e = 0; e < r.Num(); e++) {
			var t = r.Get(e);
			this.AddActionHandle(t.toString());
		}
	}
	BindAxisHandle() {
		super.BindAxisHandle();
		var e = (0, puerts_1.$ref)(void 0),
			r =
				(UE.InputSettings.GetInputSettings().GetAxisNames(e),
				(0, puerts_1.$unref)(e));
		for (let e = 0; e < r.Num(); e++) {
			var t = r.Get(e);
			this.AddAxisHandle(t.toString());
		}
	}
	BindKeyHandle() {
		super.BindKeyHandle(),
			this.AddKeyBinding(
				new UE.InputChord(new UE.Key(LEFT_BARACKET_NAME), !1, !1, !1, !1),
				1,
				this,
				new UE.FName(this.OnSetUiRootDeactivate.name),
			),
			this.AddKeyBinding(
				new UE.InputChord(new UE.Key(RIGHT_BARACKET_NAME), !1, !1, !1, !1),
				1,
				this,
				new UE.FName(this.OnSetUiRootActive.name),
			);
	}
	OnInputAxis(e, r) {
		super.OnInputAxis(e, r),
			e === InputMappingsDefine_1.axisMappings.LookUp &&
				(this.CursorInputVector.Y = r),
			e === InputMappingsDefine_1.axisMappings.Turn &&
				(this.CursorInputVector.X = r),
			e === InputMappingsDefine_1.axisMappings.MoveForward &&
				(this.MoveInputVector.Y = r),
			e === InputMappingsDefine_1.axisMappings.MoveRight &&
				(this.MoveInputVector.X = r);
	}
	ReceivePreProcessInput(e, r) {
		InputController_1.InputController.PreProcessInput(e, r);
	}
	ReceivePostProcessInput(e, r) {
		InputController_1.InputController.PostProcessInput(e, r);
	}
	OnSetUiRootActive() {
		ModelManager_1.ModelManager.SundryModel.CanOpenGmView &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Input", 8, "按下 】 键显示所有界面"),
			UiLayer_1.UiLayer.ForceShowUi());
	}
	OnSetUiRootDeactivate() {
		ModelManager_1.ModelManager.SundryModel.CanOpenGmView &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Input", 8, "按下 【 键隐藏所有界面"),
			UiLayer_1.UiLayer.ForceHideUi());
	}
	GetCursorInputVector() {
		return this.CursorInputVector;
	}
	GetMoveInputVector() {
		return this.MoveInputVector;
	}
}
(exports.TsCharacterController = TsCharacterController),
	(exports.default = TsCharacterController);
