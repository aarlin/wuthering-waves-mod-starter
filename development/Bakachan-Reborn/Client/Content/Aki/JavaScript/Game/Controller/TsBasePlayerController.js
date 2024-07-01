"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsBasePlayerController = void 0),
	(Error.stackTraceLimit = 500);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
	Vector2D_1 = require("../../Core/Utils/Math/Vector2D"),
	ObjectUtils_1 = require("../../Core/Utils/ObjectUtils"),
	ModelManager_1 = require("../Manager/ModelManager"),
	LogReportModel_1 = require("../Module/LogReport/LogReportModel"),
	HotKeyViewDefine_1 = require("../Module/UiNavigation/HotKeyViewDefine"),
	PlayerInputHandle_1 = require("./PlayerInputHandle");
class TsBasePlayerController extends UE.BasePlayerController {
	constructor() {
		super(...arguments),
			(this.ActionHandleClass = void 0),
			(this.AxisHandleClass = void 0),
			(this.ActionHandleMap = void 0),
			(this.AxisHandleMap = void 0),
			(this.CurrentInputPosition = void 0),
			(this.OnInputActionCallback = void 0),
			(this.OnInputAxisCallback = void 0),
			(this.PlayerInputHandle = void 0);
	}
	ReceiveSetupInputComponent() {
		this.InitInputHandle(),
			this.AddInputBinding(),
			this.OnSetupInputComponent();
	}
	ReceiveBeginPlay() {
		super.ReceiveBeginPlay(), this.InitInputHandle();
	}
	ReceiveDestroyed() {
		ObjectUtils_1.ObjectUtils.IsValid(this) &&
			(this.ClearInputBinding(),
			this.PlayerInputHandle &&
				(this.PlayerInputHandle.Clear(), (this.PlayerInputHandle = void 0)),
			super.ReceiveDestroyed());
	}
	ReceiveTick(e) {
		super.ReceiveTick(e), this.PlayerInputHandle?.Tick(e);
	}
	OnReceivedPlayer() {
		UE.KuroInputFunctionLibrary.ResetInputMode(this);
	}
	InitInputHandle() {
		this.PlayerInputHandle ||
			((this.PlayerInputHandle = new PlayerInputHandle_1.PlayerInputHandle()),
			this.PlayerInputHandle.Initialize());
	}
	AddInputBinding() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "添加PlayerController绑定输入", [
				"PlayerController",
				this.GetName(),
			]),
			this.BindActionHandle(),
			this.BindAxisHandle(),
			this.BindKeyHandle(),
			this.BindTouchHandle();
	}
	ClearInputBinding() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "清理PlayerController绑定输入", [
				"PlayerController",
				this.GetName(),
			]),
			this.ClearActionBindings(),
			this.ClearAxisBindings(),
			this.ClearKeyBindings(),
			this.ClearTouchBindings(),
			this.ClearActionHandle(),
			this.ClearAxisHandle(),
			(this.OnInputActionCallback = void 0),
			(this.OnInputAxisCallback = void 0);
	}
	OnSetupInputComponent() {
		this.CurrentInputPosition = Vector2D_1.Vector2D.Create(0, 0);
	}
	BindActionHandle() {}
	BindAxisHandle() {}
	BindKeyHandle() {
		this.AddKeyBinding(
			new UE.InputChord(
				new UE.Key(
					FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.ANY_KEY),
				),
				!1,
				!1,
				!1,
				!1,
			),
			0,
			this,
			new UE.FName(this.OnPressAnyKey.name),
		),
			this.AddKeyBinding(
				new UE.InputChord(
					new UE.Key(
						FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.ANY_KEY),
					),
					!1,
					!1,
					!1,
					!1,
				),
				1,
				this,
				new UE.FName(this.OnReleaseAnyKey.name),
			);
	}
	BindTouchHandle() {
		this.AddTouchBinding(0, this, new UE.FName(this.OnTouchBegin.name)),
			this.AddTouchBinding(1, this, new UE.FName(this.OnTouchEnd.name)),
			this.AddTouchBinding(2, this, new UE.FName(this.OnTouchMove.name));
	}
	OnInputAction(e, t, n) {
		LogReportModel_1.LogReportModel.RecordOperateTime(),
			this.PlayerInputHandle.InputAction(e, t, n);
	}
	OnInputAxis(e, t) {
		LogReportModel_1.LogReportModel.RecordOperateTime(!0, e, t),
			this.PlayerInputHandle.InputAxis(e, t);
	}
	OnTouchBegin(e, t) {
		this.PlayerInputHandle.TouchBegin(e, t),
			LogReportModel_1.LogReportModel.RecordOperateTime();
	}
	OnTouchEnd(e, t) {
		this.PlayerInputHandle.TouchEnd(e, t);
	}
	OnTouchMove(e, t) {
		this.PlayerInputHandle.TouchMove(e, t);
	}
	OnPressAnyKey(e) {
		ModelManager_1.ModelManager.PlatformModel.OnPressAnyKey(e),
			LogReportModel_1.LogReportModel.RecordOperateTime(),
			this.PlayerInputHandle.PressAnyKey(e);
	}
	OnReleaseAnyKey(e) {
		this.PlayerInputHandle.ReleaseAnyKey(e);
	}
	AddActionHandle(e) {
		let t = this.GetActionHandle(e);
		(t = t || this.NewActionHandle(e)),
			(this.OnInputActionCallback = (e, t, n) => {
				this.OnInputAction(e, t, n);
			}),
			t.AddActionBinding(e, this.OnInputActionCallback);
	}
	NewActionHandle(e) {
		var t;
		if (this.ActionHandleClass && this.ActionHandleClass.IsValid())
			return (
				(t = UE.NewObject(this.ActionHandleClass, this)).Initialize(this),
				this.ActionHandleMap.Add(e, t),
				t
			);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Controller",
				8,
				"当前Controller中的ActionHandleClass不存在",
				["ControllerName", this.GetName()],
			);
	}
	RemoveActionHandle(e) {
		var t = this.GetActionHandle(e);
		t && (t.Reset(), this.ActionHandleMap.Remove(e));
	}
	GetActionHandle(e) {
		return this.ActionHandleMap.Get(e);
	}
	ClearActionHandle() {
		for (let t = 0; t < this.ActionHandleMap.Num(); t++) {
			var e = this.ActionHandleMap.GetKey(t);
			if (!(e = this.ActionHandleMap.Get(e))) return;
			e.Reset();
		}
		this.ActionHandleMap.Empty();
	}
	AddAxisHandle(e) {
		let t = this.GetAxisHandle(e);
		(t = t || this.NewAxisHandle(e)),
			(this.OnInputAxisCallback = (e, t) => {
				this.OnInputAxis(e, t);
			}),
			t.AddAxisBinding(e, this.OnInputAxisCallback);
	}
	NewAxisHandle(e) {
		var t;
		if (this.AxisHandleClass && this.AxisHandleClass.IsValid())
			return (
				(t = UE.NewObject(this.AxisHandleClass, this)).Initialize(this),
				this.AxisHandleMap.Add(e, t),
				t
			);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Controller",
				8,
				"当前Controller中的AxisHandleClass不存在",
				["ControllerName", this.GetName()],
			);
	}
	RemoveAxisHandle(e) {
		var t = this.GetActionHandle(e);
		t && (t.Reset(), this.ActionHandleMap.Remove(e));
	}
	GetAxisHandle(e) {
		return this.AxisHandleMap.Get(e);
	}
	ClearAxisHandle() {
		for (let t = 0; t < this.AxisHandleMap.Num(); t++) {
			var e = this.AxisHandleMap.GetKey(t);
			if (!(e = this.AxisHandleMap.Get(e))) return;
			e.Reset();
		}
		this.AxisHandleMap.Empty();
	}
	GetInputPosition(e = 0) {
		var t = ModelManager_1.ModelManager.PlatformModel;
		return t.IsPc()
			? this.GetCursorPosition()
			: t.IsMobile()
				? this.GetTouchPosition(e)
				: void 0;
	}
	GetCursorPosition() {
		var e = (0, puerts_1.$ref)(0),
			t = (0, puerts_1.$ref)(0);
		if (this.GetMousePosition(e, t))
			return (
				(this.CurrentInputPosition.X = (0, puerts_1.$unref)(e)),
				(this.CurrentInputPosition.Y = (0, puerts_1.$unref)(t)),
				this.CurrentInputPosition
			);
	}
	GetTouchPosition(e) {
		var t = (0, puerts_1.$ref)(0),
			n = (0, puerts_1.$ref)(0);
		return (
			this.GetInputTouchState(e, t, n, void 0),
			(this.CurrentInputPosition.X = (0, puerts_1.$unref)(t)),
			(this.CurrentInputPosition.Y = (0, puerts_1.$unref)(n)),
			this.CurrentInputPosition
		);
	}
	IsInTouch(e) {
		var t = (0, puerts_1.$ref)(!1);
		return (
			this.GetInputTouchState(e, void 0, void 0, t), (0, puerts_1.$unref)(t)
		);
	}
	SetIsPrintKeyName(e) {
		this.PlayerInputHandle.IsPrintKeyName = e;
	}
}
(exports.TsBasePlayerController = TsBasePlayerController),
	(exports.default = TsBasePlayerController);
