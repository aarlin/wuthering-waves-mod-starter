"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.rouletteInputManager =
		exports.RouletteInputGamepad =
		exports.RouletteInputTouch =
		exports.RouletteInputKeyboard =
		exports.RouletteInputBase =
		exports.AngleCalculator =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	Global_1 = require("../../Global"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	KEYBOARD_DEAD_LIMIT = 100,
	GAMEPAD_DEAD_LIMIT = 0.3;
class AngleCalculator {
	static GetVectorAngle(t, e) {
		var o = Vector_1.Vector.Create(),
			i =
				(Vector_1.Vector.CrossProduct(t, e, o),
				MathUtils_1.MathUtils.DotProduct(t, e));
		i = UE.KismetMathLibrary.DegAcos(i / (t.Size() * e.Size()));
		return 0 < o.Z ? -1 * i : i;
	}
	static AngleToAreaIndex(t) {
		for (let o = 0; o < this.AngleList.length; o++) {
			var e = o + 1;
			if (this.AngleList[o] < t && t <= this.AngleList[e])
				return this.AngleList.length - e;
		}
		return 0;
	}
	static ConvertLguiPosToScreenPos(t, e) {
		var o = UiLayer_1.UiLayer.UiRootItem;
		t = Vector2D_1.Vector2D.Create(t, e);
		return (
			((e =
				UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromLGUICanvasToViewport(
					t.ToUeVector2D(),
				)).X = MathCommon_1.MathCommon.Clamp(e.X, 0, o.GetWidth())),
			(e.Y = MathCommon_1.MathCommon.Clamp(e.Y, 0, o.GetHeight())),
			new Vector2D_1.Vector2D(e.X, e.Y)
		);
	}
}
(exports.AngleCalculator = AngleCalculator).AngleList = [
	-180, -135, -90, -45, 0, 45, 90, 135, 180,
];
class RouletteInputBase {
	constructor(t, e, o) {
		(this.ActivateOn = !1),
			(this.AreaIndex = 0),
			(this.Angle = -1),
			(this.NeedEmptyChoose = !0),
			(this.RouletteViewType = 1),
			(this.BeginPos = void 0),
			(this.ForwardVector = Vector_1.Vector.Create(0, -1, 0)),
			(this.Ggo = () => {}),
			(this.BeginPos = t),
			(this.RouletteViewType = e ?? 1);
	}
	ActivateInput(t) {
		this.ActivateOn = t;
	}
	Destroy() {
		this.ActivateInput(!1), this.UnBindEvent(), this.OnDestroy();
	}
	Reset() {
		(this.AreaIndex = 0), (this.Angle = -1);
	}
	EndInput() {
		(this.ActivateOn = !1), this.Ggo();
	}
	SetEndInputEvent(t) {
		this.Ggo = t;
	}
	SetIsNeedEmpty(t) {
		this.NeedEmptyChoose = t;
	}
	OnInit() {}
	OnDestroy() {}
	BindEvent() {}
	UnBindEvent() {}
	InputTick(t) {}
	Tick(t) {
		var e, o;
		return this.ActivateOn
			? ((e = this.AreaIndex),
				(o = this.Angle),
				this.InputTick(t),
				[
					e !== this.AreaIndex ? this.AreaIndex : void 0,
					o !== this.Angle ? this.Angle : void 0,
				])
			: [void 0, void 0];
	}
}
class RouletteInputKeyboard extends (exports.RouletteInputBase =
	RouletteInputBase) {
	constructor(t, e) {
		super(t, e),
			(this.Ngo = Vector_1.Vector.Create()),
			(this.Ogo = Vector_1.Vector.Create()),
			(this.kgo = Vector_1.Vector.Create()),
			(this.Fgo = Vector_1.Vector.Create());
	}
	OnInit() {
		if (!this.BeginPos) {
			var t = Global_1.Global.CharacterController;
			if (!t) return;
			this.BeginPos = t.GetCursorPosition() ?? Vector2D_1.Vector2D.Create();
		}
		this.Ogo.Set(this.BeginPos.X, this.BeginPos.Y, 0),
			this.kgo.Set(this.BeginPos.X, this.BeginPos.Y, 0),
			this.Ngo.Set(0, 0, 0);
	}
	InputTick(t) {
		var e = Global_1.Global.CharacterController;
		e &&
			(e = e.GetCursorPosition()) &&
			(this.Fgo.Set(e.X, e.Y, 0),
			this.Fgo.Equals(this.kgo, 1) ||
				(this.Fgo.Subtraction(this.Ogo, this.Ngo),
				this.NeedEmptyChoose && this.Ngo.Size() <= 100
					? (this.AreaIndex = 0)
					: (this.kgo.Set(this.Fgo.X, this.Fgo.Y, 0),
						(this.Angle = AngleCalculator.GetVectorAngle(
							this.ForwardVector,
							this.Ngo,
						)),
						(this.AreaIndex = AngleCalculator.AngleToAreaIndex(this.Angle)))));
	}
}
exports.RouletteInputKeyboard = RouletteInputKeyboard;
class RouletteInputTouch extends RouletteInputBase {
	constructor(t, e, o) {
		super(t, e, o),
			(this.Ngo = Vector_1.Vector.Create()),
			(this.Ogo = Vector_1.Vector.Create()),
			(this.kgo = Vector_1.Vector.Create()),
			(this.Fgo = Vector_1.Vector.Create()),
			(this.Vgo = -1),
			(this.V1t = !1),
			(this.Vgo = o ?? -1);
	}
	OnInit() {
		if (!this.BeginPos) {
			var t = Global_1.Global.CharacterController;
			if (!t) return;
			if (this.Vgo < 0)
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						38,
						"当前轮盘输入方式为触屏,未检测到对应触屏Id或初始位置",
					)
				);
			(this.BeginPos =
				t.GetTouchPosition(this.Vgo) ?? Vector2D_1.Vector2D.Create()),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Phantom",
						38,
						"[轮盘界面]触屏开启信息",
						["TouchId", this.Vgo],
						["Pos", this.BeginPos],
					);
		}
		this.Ogo.Set(this.BeginPos.X, this.BeginPos.Y, 0),
			this.kgo.Set(this.BeginPos.X, this.BeginPos.Y, 0),
			this.Ngo.Set(0, 0, 0);
	}
	OnDestroy() {
		this.V1t = !1;
	}
	InputTick(t) {
		var e;
		0 !== this.RouletteViewType &&
			(e = Global_1.Global.CharacterController) &&
			(this.Vgo < 0 || ((this.V1t = e.IsInTouch(this.Vgo)), !this.V1t)
				? this.EndInput()
				: (e = e.GetTouchPosition(this.Vgo)) &&
					(this.Fgo.Set(e.X, e.Y, 0),
					this.Fgo.Equals(this.kgo) ||
						(this.kgo.Set(this.Fgo.X, this.Fgo.Y, 0),
						this.Fgo.Subtraction(this.Ogo, this.Ngo),
						(this.Angle = AngleCalculator.GetVectorAngle(
							this.ForwardVector,
							this.Ngo,
						)),
						(this.AreaIndex = AngleCalculator.AngleToAreaIndex(this.Angle)))));
	}
}
exports.RouletteInputTouch = RouletteInputTouch;
class RouletteInputGamepad extends RouletteInputBase {
	constructor(t, e) {
		super(t, e),
			(this.Hgo = Vector_1.Vector.Create()),
			(this.jgo = void 0),
			(this.Wgo = (t, e) => {
				switch (t) {
					case InputMappingsDefine_1.axisMappings.UiMoveForward:
						this.Hgo.Y = -e;
						break;
					case InputMappingsDefine_1.axisMappings.UiScroll1:
						this.Hgo.Y = e;
						break;
					case InputMappingsDefine_1.axisMappings.UiMoveRight:
					case InputMappingsDefine_1.axisMappings.UiScroll2:
						this.Hgo.X = e;
				}
			});
	}
	OnInit() {
		this.Hgo.Set(0, 0, 0);
	}
	BindEvent() {
		0 === this.RouletteViewType
			? (this.jgo = [
					InputMappingsDefine_1.axisMappings.UiMoveForward,
					InputMappingsDefine_1.axisMappings.UiMoveRight,
				])
			: (this.jgo = [
					InputMappingsDefine_1.axisMappings.UiScroll1,
					InputMappingsDefine_1.axisMappings.UiScroll2,
				]),
			InputDistributeController_1.InputDistributeController.BindAxes(
				this.jgo,
				this.Wgo,
			);
	}
	UnBindEvent() {
		InputDistributeController_1.InputDistributeController.UnBindAxes(
			this.jgo,
			this.Wgo,
		);
	}
	InputTick(t) {
		(!this.NeedEmptyChoose && 0 === this.Hgo.X && 0 === this.Hgo.Y) ||
			(this.NeedEmptyChoose &&
			Math.abs(this.Hgo.X) <= 0.3 &&
			Math.abs(this.Hgo.Y) <= 0.3
				? (this.AreaIndex = 0)
				: ((this.Angle = AngleCalculator.GetVectorAngle(
						this.ForwardVector,
						this.Hgo,
					)),
					(this.AreaIndex = AngleCalculator.AngleToAreaIndex(this.Angle))));
	}
}
(exports.RouletteInputGamepad = RouletteInputGamepad),
	(exports.rouletteInputManager = {
		0: RouletteInputKeyboard,
		1: RouletteInputGamepad,
		2: RouletteInputTouch,
	});
