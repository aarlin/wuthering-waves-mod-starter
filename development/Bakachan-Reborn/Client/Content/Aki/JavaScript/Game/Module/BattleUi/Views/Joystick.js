"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Joystick = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	Global_1 = require("../../../Global"),
	InputController_1 = require("../../../Input/InputController"),
	InputEnums_1 = require("../../../Input/InputEnums"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView"),
	WALK_TO_RUN_RATE = 0.3,
	JOYSTICK_RADIU = 200,
	JOYSTICK_RADIU_SQUARED = 4e4,
	CHECK_IN_TOUCH_INTERVAL = 500;
class Joystick extends BattleVisibleChildView_1.BattleVisibleChildView {
	constructor() {
		super(...arguments),
			(this.P1t = void 0),
			(this.x1t = void 0),
			(this.w1t = void 0),
			(this.B1t = void 0),
			(this.b1t = Vector2D_1.Vector2D.Create(0, 0)),
			(this.q1t = 0),
			(this.G1t = Vector_1.Vector.Create()),
			(this.N1t = Vector_1.Vector.Create()),
			(this.O1t = Vector_1.Vector.Create(0, 0, 0)),
			(this.k1t = Vector_1.Vector.Create(0, 0, 0)),
			(this.F1t = Rotator_1.Rotator.Create()),
			(this.pQe = !1),
			(this.JoystickTouchId = -1),
			(this.V1t = !1),
			(this.gXe = void 0),
			(this.H1t = !1),
			(this.j1t = 500),
			(this.W1t = 1e3),
			(this.K1t = 0),
			(this.Q1t = Vector_1.Vector.Create()),
			(this.X1t = void 0),
			(this.$1t = 0),
			(this.Y1t = (t) => {
				this.J1t(t) &&
					this.pQe &&
					this.H1t &&
					InputDistributeController_1.InputDistributeController.IsAllowFightMoveInput() &&
					(ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Battle", 8, "动态摇杆开始拖动立即响应输入", [
							"Position",
							this.N1t,
						]),
					this.z1t(this.N1t));
			}),
			(this.Z1t = (t) => {
				this.J1t(t);
			}),
			(this.e_t = (t) => {
				this.JoystickTouchId = t.pointerID;
				t = t.GetLocalPointInPlane();
				(this.N1t.X = t.X),
					(this.N1t.Y = t.Y),
					(this.H1t = !0),
					(ModelManager_1.ModelManager.BattleUiModel.IsPressJoyStick = !0),
					(this.V1t = !0),
					this.pQe &&
						((this.O1t.X = this.N1t.X),
						(this.O1t.Y = this.N1t.Y),
						this.b1t.Set(this.O1t.X, this.O1t.Y),
						(t = this.b1t.ToUeVector2D()),
						this.x1t.SetAnchorOffset(t),
						this.w1t.SetAnchorOffset(t),
						this.B1t.SetAnchorOffset(t)),
					ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Battle",
							8,
							"JoystickPress",
							["", this.JoystickTouchId],
							["", this.N1t],
						),
					this.N1t.IsZero() ||
						(this.z1t(this.N1t), this.SaveDodgeStartInfo(this.N1t));
			}),
			(this.t_t = () => {
				this.i_t();
			}),
			(this.OnDynamicChanged = (t) => {
				(this.pQe = t),
					this.pQe ||
						(this.O1t.Set(0, 0, 0),
						this.b1t.Set(this.O1t.X, this.O1t.Y),
						(t = this.b1t.ToUeVector2D()),
						this.x1t.SetAnchorOffset(t),
						this.w1t.SetAnchorOffset(t),
						this.B1t.SetAnchorOffset(t));
			});
	}
	Initialize() {
		super.Initialize(),
			this.InitChildType(12),
			(this.P1t = this.GetRootActor().GetComponentByClass(
				UE.UIDraggableComponent.StaticClass(),
			)),
			this.Ore(),
			(this.x1t = this.GetSprite(0)),
			(this.w1t = this.GetSprite(1)),
			(this.B1t = this.GetSprite(2)),
			(this.gXe = Global_1.Global.CharacterController),
			(this.j1t =
				CommonParamById_1.configCommonParamById.GetIntConfig("DodgeMinLength")),
			(this.W1t = CommonParamById_1.configCommonParamById.GetIntConfig(
				"DodgeJoystickSlideMinTime",
			)),
			(this.pQe =
				ModelManager_1.ModelManager.BattleUiModel.GetIsDynamicJoystick());
	}
	ShowBattleVisibleChildView() {
		ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(
			0,
			12,
			!0,
		),
			super.ShowBattleVisibleChildView();
	}
	HideBattleVisibleChildView() {
		ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(
			0,
			12,
			!1,
		),
			super.HideBattleVisibleChildView();
	}
	Reset() {
		(this.gXe = void 0),
			(this.B1t = void 0),
			(this.H1t = !1),
			(ModelManager_1.ModelManager.BattleUiModel.IsPressJoyStick = !1),
			this.X1t &&
				TimerSystem_1.TimerSystem.Has(this.X1t) &&
				(TimerSystem_1.TimerSystem.Remove(this.X1t), (this.X1t = void 0)),
			this.kre();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UISprite],
		];
	}
	Ore() {
		var t = this.P1t;
		t.OnPointerDownCallBack.Bind((t) => {
			this.e_t(t);
		}),
			t.OnPointerBeginDragCallBack.Bind((t) => {
				this.Y1t(t);
			}),
			t.OnPointerDragCallBack.Bind((t) => {
				this.Z1t(t);
			}),
			t.OnPointerEndDragCallBack.Bind((t) => {
				this.t_t();
			}),
			t.OnPointerUpCallBack.Bind((t) => {
				this.t_t();
			}),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSetJoystickMode,
				this.OnDynamicChanged,
			);
	}
	kre() {
		var t = this.P1t;
		t.OnPointerDownCallBack.Unbind(),
			t.OnPointerBeginDragCallBack.Unbind(),
			t.OnPointerDragCallBack.Unbind(),
			t.OnPointerEndDragCallBack.Unbind(),
			t.OnPointerUpCallBack.Unbind(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSetJoystickMode,
				this.OnDynamicChanged,
			);
	}
	Tick(t) {
		this.JoystickTouchId < 0 ||
			(this.o_t(),
			this.V1t
				? this.H1t &&
					(InputDistributeController_1.InputDistributeController.IsAllowFightMoveInput()
						? (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Battle", 8, "手指滑动摇杆", [
									"Position",
									this.N1t,
								]),
							this.z1t(this.N1t))
						: (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Battle",
									8,
									"手指滑动摇杆时不允许战斗输入,摇杆置回原点",
								),
							this.z1t(this.O1t)))
				: this.i_t());
	}
	o_t() {
		Time_1.Time.Now < this.$1t ||
			((this.$1t = Time_1.Time.Now + 500),
			(this.V1t = this.gXe.IsInTouch(this.JoystickTouchId)));
	}
	J1t(t) {
		return (
			!!this.V1t &&
			(t.pointerID !== this.JoystickTouchId
				? (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Battle", 8, "JoystickDrag No CurTouchId", [
							"",
							this.JoystickTouchId,
						]),
					!1)
				: ((t = t.GetLocalPointInPlane()),
					(this.N1t.X = t.X),
					(this.N1t.Y = t.Y),
					ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Battle",
							8,
							"JoystickDrag",
							["", this.JoystickTouchId],
							["", this.N1t],
						),
					!0))
		);
	}
	z1t(t, e = !0) {
		t.Subtraction(this.O1t, this.k1t),
			this.k1t.IsNearlyZero(0.001) && this.k1t.Reset(),
			this.r_t(this.k1t),
			this.n_t(this.k1t, e);
	}
	SaveDodgeStartInfo(t) {
		(this.K1t = TimeUtil_1.TimeUtil.GetServerTimeStamp()), (this.Q1t = t);
	}
	TryDodge(t) {
		var e = TimeUtil_1.TimeUtil.GetServerTimeStamp();
		e - this.K1t > this.W1t
			? (this.K1t = e)
			: ((this.K1t = e),
				this.Q1t.Subtraction(t, this.k1t),
				(this.Q1t = t),
				this.k1t.Size() < this.j1t ||
					(this.n_t(this.k1t, !0),
					InputController_1.InputController.InputAction(
						InputEnums_1.EInputAction.闪避,
						1,
					),
					InputController_1.InputController.InputAction(
						InputEnums_1.EInputAction.闪避,
						2,
					)));
	}
	i_t() {
		this.z1t(this.O1t, !1),
			(this.JoystickTouchId = -1),
			(this.V1t = !1),
			(this.H1t = !1),
			(ModelManager_1.ModelManager.BattleUiModel.IsPressJoyStick = !1);
	}
	r_t(t) {
		var e = t.SizeSquared();
		if (e <= 0)
			ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Battle",
					8,
					"设置摇杆偏移时，方向向量为0，不会设置角色移动",
					["targetVector", t],
					["distanceSquared2D", e],
				);
		else {
			this.G1t.DeepCopy(t), this.G1t.Normalize();
			let i = 200 * this.G1t.X,
				o = 200 * this.G1t.Y;
			e < 4e4 && ((i = t.X), (o = t.Y)),
				(i += this.O1t.X),
				(o += this.O1t.Y),
				this.b1t.Set(i, o),
				this.pQe && this.B1t.SetAnchorOffset(this.b1t.ToUeVector2D()),
				0 < this.G1t.Y
					? (this.F1t.Yaw =
							Math.atan(-this.G1t.X / this.G1t.Y) *
							MathCommon_1.MathCommon.RadToDeg)
					: this.G1t.Y < 0
						? (this.F1t.Yaw =
								Math.atan(-this.G1t.X / this.G1t.Y) *
									MathCommon_1.MathCommon.RadToDeg +
								180)
						: 0 < this.G1t.X
							? (this.F1t.Yaw = -90)
							: (this.F1t.Yaw = 90),
				(e = this.F1t.ToUeRotator()),
				this.x1t.SetUIRelativeRotation(e),
				this.w1t.SetUIRelativeRotation(e),
				ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Battle",
						8,
						"设置摇杆偏移",
						["targetVector", t],
						["normalTargetVector", this.G1t],
						["resultOffsetX", i],
						["resultOffsetY", o],
					);
		}
	}
	n_t(t, e) {
		!e || t.Equality(Vector_1.Vector.ZeroVectorProxy)
			? (e ? this.s_t() : this.a_t(),
				ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Battle",
						8,
						"[CharacterInput]摇杆移回原位，开始进行调用InputController输入逻辑",
					),
				InputController_1.InputController.InputAxis(
					InputEnums_1.EInputAxis.MoveRight,
					0,
				),
				InputController_1.InputController.InputAxis(
					InputEnums_1.EInputAxis.MoveForward,
					0,
				))
			: ((e = MathUtils_1.MathUtils.RangeClamp(t.X, -200, 200, -1, 1)),
				(t = MathUtils_1.MathUtils.RangeClamp(t.Y, -200, 200, -1, 1)),
				Math.max(Math.abs(e), Math.abs(t)) > 0.3 ? this.h_t() : this.l_t(),
				ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Battle",
						8,
						"[CharacterInput]开始进行调用InputController输入逻辑",
						["resultX", e],
						["resultY", t],
					),
				InputController_1.InputController.InputAxis(
					InputEnums_1.EInputAxis.MoveRight,
					e,
				),
				InputController_1.InputController.InputAxis(
					InputEnums_1.EInputAxis.MoveForward,
					t,
				));
	}
	l_t() {
		2 !== this.q1t &&
			(ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Battle", 8, "控制角色行走"),
			this.x1t.SetUIActive(!0),
			this.w1t.SetUIActive(!1),
			(this.q1t = 2));
	}
	h_t() {
		3 !== this.q1t &&
			(ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Battle", 8, "控制角色奔跑"),
			this.x1t.SetUIActive(!1),
			this.w1t.SetUIActive(!0),
			(this.q1t = 3));
	}
	a_t() {
		0 !== this.q1t &&
			(ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Battle", 8, "松开摇杆时控制角色站立"),
			this.B1t.SetUIActive(!this.pQe),
			1 !== this.q1t && (this.x1t.SetUIActive(!1), this.w1t.SetUIActive(!1)),
			(this.q1t = 0));
	}
	s_t() {
		1 !== this.q1t &&
			(ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Battle", 8, "按下摇杆时控制角色站立"),
			this.B1t.SetUIActive(!0),
			0 !== this.q1t && (this.x1t.SetUIActive(!1), this.w1t.SetUIActive(!1)),
			(this.q1t = 1));
	}
	SetForbidMove(t) {}
}
exports.Joystick = Joystick;
