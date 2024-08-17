"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldMapInteractComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
	TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine"),
	TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	WorldMapUtil_1 = require("../WorldMapUtil"),
	WorldMapComponentBase_1 = require("./WorldMapComponentBase"),
	MULTI_TOUCH_DELAY_TIME = 0.5,
	SCALE_STEP = 0.05;
class WorldMapInteractComponent extends WorldMapComponentBase_1.WorldMapComponentBase {
	constructor(e, t) {
		super(e),
			(this.T2o = !1),
			(this.L2o = !1),
			(this.D2o = -0),
			(this.R2o = !1),
			(this.U2o = !1),
			(this.A2o = !1),
			(this.P2o = ""),
			(this.x2o = Vector2D_1.Vector2D.Create()),
			(this.w2o = void 0),
			(this.B2o = void 0),
			(this.b2o = -0),
			(this.q2o = void 0),
			(this.G2o = void 0),
			(this.FCo = (e) => {
				(this.T2o = !1),
					e &&
						!this.IsMultiFingerControl &&
						this.N2o(e.pointerPosition) &&
						((e = this.O2o(e.pointerPosition.X, e.pointerPosition.Y)),
						this.w2o.DeepCopy(e),
						(this.b2o = Time_1.Time.NowSeconds),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.WorldMapPointerDown,
						));
			}),
			(this.aWe = (e) => {
				var t;
				!e || this.IsMultiFingerControl || 1 < this.q2o.size
					? ((this.T2o = !1), this.B2o.Reset())
					: ((this.T2o = !0),
						(e = this.O2o(e.pointerPosition.X, e.pointerPosition.Y)),
						(0 ===
							(t = Vector2D_1.Vector2D.Create(e.X, e.Y).SubtractionEqual(
								this.w2o,
							)).X &&
							0 === t.Y) ||
							(this.B2o.DeepCopy(t),
							this.w2o.DeepCopy(e),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.WorldMapPointerDrag,
								this.B2o,
							)));
			}),
			(this.k2o = (e) => {
				var t = Time_1.Time.NowSeconds;
				this.IsMultiFingerControl || t - this.D2o < 0.5
					? Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Map", 19, "正在进行双指缩放")
					: this.N2o(e.pointerPosition)
						? this.T2o
							? ((this.T2o = !1), this.F2o())
							: EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.WorldMapPointerUp,
									e,
								)
						: (this.T2o = !1);
			}),
			(this.pbt = (e, t) => {
				var i = t.TouchType,
					o = Number(e);
				switch (i) {
					case 0:
						this.hCt(!0, o, t);
						break;
					case 1:
						this.hCt(!1, o);
				}
			}),
			(this.V2o = (e) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.WorldMapWheelAxisInput,
					0.05 * e.scrollAxisValue,
					5,
				);
			}),
			(this.H2o = (e) => {
				e
					? ((this.U2o = !0),
						(this.A2o = !1),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.WorldMapJoystickMoveForward,
							-this.G2o.GamePadMoveSpeed * e,
						))
					: (this.U2o = !1);
			}),
			(this.j2o = (e) => {
				e
					? ((this.R2o = !0),
						(this.A2o = !1),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.WorldMapJoystickMoveRight,
							-this.G2o.GamePadMoveSpeed * e,
						))
					: (this.R2o = !1);
			}),
			(this.W2o = (e, t) => {
				0 === t
					? this.P2o === e && (this.P2o = "")
					: ((this.P2o = e),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.WorldMapHandleTriggerAxisInput,
							0.05 * t,
							2,
						));
			}),
			(e = e
				.GetRootActor()
				.GetComponentByClass(UE.UIDraggableComponent.StaticClass())),
			ObjectUtils_1.ObjectUtils.IsValid(e) &&
				((this.q2o = new Map()),
				e.OnPointerDownCallBack.Bind(this.FCo),
				e.OnPointerDragCallBack.Bind(this.aWe),
				e.OnPointerUpCallBack.Bind(this.k2o),
				e.OnPointerScrollCallBack.Bind(this.V2o),
				(this.B2o = Vector2D_1.Vector2D.Create()),
				(this.w2o = Vector2D_1.Vector2D.Create()),
				(this.G2o = t));
	}
	get IsJoystickMoving() {
		return this.R2o || this.U2o;
	}
	get IsJoystickFocus() {
		return this.A2o;
	}
	SetJoystickFocus(e) {
		this.A2o = e;
	}
	get IsJoystickZoom() {
		return "" !== this.P2o;
	}
	get MultiTouchOriginCenter() {
		return this.x2o;
	}
	get IsDragging() {
		return this.T2o;
	}
	get IsMultiFingerControl() {
		return this.L2o;
	}
	set IsMultiFingerControl(e) {
		e === this.L2o ||
			(!e && 0 < this.q2o.size) ||
			((this.L2o = e), this.L2o) ||
			(this.D2o = Time_1.Time.NowSeconds);
	}
	AddEventListener() {
		InputDistributeController_1.InputDistributeController.BindTouches(
			[
				InputMappingsDefine_1.touchIdMappings.Touch1,
				InputMappingsDefine_1.touchIdMappings.Touch2,
			],
			this.pbt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.NavigationTriggerMapForward,
				this.H2o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.NavigationTriggerMapRight,
				this.j2o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.NavigationTriggerMapZoom,
				this.W2o,
			);
	}
	RemoveEventListener() {
		InputDistributeController_1.InputDistributeController.UnBindTouches(
			[
				InputMappingsDefine_1.touchIdMappings.Touch1,
				InputMappingsDefine_1.touchIdMappings.Touch2,
			],
			this.pbt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.NavigationTriggerMapForward,
				this.H2o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.NavigationTriggerMapRight,
				this.j2o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.NavigationTriggerMapZoom,
				this.W2o,
			);
	}
	OnDestroy() {
		super.OnDestroy(), (this.w2o = void 0), (this.B2o = void 0);
	}
	CheckTouch() {
		var e = this.q2o.get(TouchFingerDefine_1.EFingerIndex.One),
			t = this.q2o.get(TouchFingerDefine_1.EFingerIndex.Two);
		if (
			((this.IsMultiFingerControl = void 0 !== e && void 0 !== t),
			this.IsMultiFingerControl)
		) {
			var { State: e, ChangeRate: i } =
				TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseType(
					TouchFingerDefine_1.EFingerIndex.One,
					TouchFingerDefine_1.EFingerIndex.Two,
				);
			switch (e) {
				case TouchFingerDefine_1.EFingerExpandCloseType.Expand:
				case TouchFingerDefine_1.EFingerExpandCloseType.Close:
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.WorldMapFingerExpandClose,
						i,
						4,
					);
			}
		}
	}
	F2o() {
		if (0 !== this.B2o.X || 0 !== this.B2o.Y) {
			var e = Time_1.Time.NowSeconds - this.b2o;
			let t = ((2 * this.B2o.Size()) / (e * e)) * e;
			(e =
				((e =
					WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool()).IsNearlyZero() ||
					(t = MathCommon_1.MathCommon.Clamp(t, 0, e.Size())),
				this.B2o.Normalize(0))) &&
				((e = Vector2D_1.Vector2D.Create()),
				this.B2o.Multiply(t, e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.WorldMapDragInertia,
					e,
				)),
				this.B2o.Reset();
		}
	}
	hCt(e, t, i) {
		e
			? LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
					t,
				) && this.q2o.set(t, i)
			: this.q2o.delete(t),
			this.x2o.Reset(),
			this.q2o.forEach((e) => {
				(e = Vector2D_1.Vector2D.Create(e.TouchPosition.X, e.TouchPosition.Y)),
					this.x2o.AdditionEqual(e);
			}),
			0 < this.q2o.size && this.x2o.DivisionEqual(this.q2o.size);
	}
	N2o(e) {
		return !(
			(e = this.O2o(e.X, e.Y)).X < 0 ||
			e.X > this.ViewportSize.X ||
			e.Y < 0 ||
			e.Y > this.ViewportSize.Y
		);
	}
	O2o(e, t) {
		return (
			(e = Vector2D_1.Vector2D.Create(e, t)).FromUeVector2D(
				UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
					e.ToUeVector2D(!0),
				),
			),
			(e.X = MathCommon_1.MathCommon.Clamp(e.X, 0, this.ViewportSize.X)),
			(e.Y = MathCommon_1.MathCommon.Clamp(e.Y, 0, this.ViewportSize.Y)),
			e
		);
	}
}
exports.WorldMapInteractComponent = WorldMapInteractComponent;
