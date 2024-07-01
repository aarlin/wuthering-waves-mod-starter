"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraGuideController = void 0);
const UE = require("ue"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../GlobalData"),
	CameraControllerBase_1 = require("./CameraControllerBase"),
	IS_DEBUG = !1,
	DEFAULT_VALUE = -1;
class CameraGuideController extends CameraControllerBase_1.CameraControllerBase {
	constructor() {
		super(...arguments),
			(this.CheckAdjustYawAngleMin = 0),
			(this.CheckAdjustYawAngleMax = 0),
			(this.CameraArmLengthRateHorizontal = 0),
			(this.CameraArmLengthRateVertical = 0),
			(this.CameraArmLengthAdditionMax = 0),
			(this.CameraArmOffsetHorizontalLengthRate = 0),
			(this.CameraArmOffsetHorizontalLengthMax = 0),
			(this.CameraArmOffsetVerticalLengthRate = 0),
			(this.CameraArmOffsetVerticalLengthMax = 0),
			(this.DefaultPitchInRangeMin = 0),
			(this.DefaultPitchInRangeMax = 0),
			(this.DefaultPitchOutRangeMin = 0),
			(this.DefaultPitchOutRangeMax = 0),
			(this.CameraPitchMin = 0),
			(this.CameraPitchMax = 0),
			(this.CameraPitchOffset = 0),
			(this.NearerRange = 0),
			(this.j1e = -0),
			(this.c_e = -0),
			(this.W1e = -0),
			(this.m_e = !1),
			(this.CurrentCameraArmLengthAddition = 0),
			(this.d_e = 0),
			(this.C_e = 0),
			(this.CurrentCameraArmOffset = Vector_1.Vector.Create()),
			(this.B1e = Vector_1.Vector.Create()),
			(this.g_e = Vector_1.Vector.Create()),
			(this.f_e = 0),
			(this.ole = 0),
			(this.rle = 0),
			(this.sle = 0),
			(this.ale = 0),
			(this.H6 = 0),
			(this.p_e = 0),
			(this.v_e = Vector_1.Vector.Create()),
			(this.M_e = -1),
			(this.S_e = 0),
			(this.E_e = !1);
	}
	get IsBlending() {
		return 0 !== this.f_e;
	}
	Name() {
		return "GuideController";
	}
	OnInit() {
		this.SetConfigMap(1, "CheckAdjustYawAngleMin"),
			this.SetConfigMap(2, "CheckAdjustYawAngleMax"),
			this.SetConfigMap(3, "CameraArmLengthRateHorizontal"),
			this.SetConfigMap(4, "CameraArmLengthRateVertical"),
			this.SetConfigMap(5, "CameraArmLengthAdditionMax"),
			this.SetConfigMap(6, "CameraArmOffsetHorizontalLengthRate"),
			this.SetConfigMap(7, "CameraArmOffsetHorizontalLengthMax"),
			this.SetConfigMap(8, "CameraArmOffsetVerticalLengthRate"),
			this.SetConfigMap(9, "CameraArmOffsetVerticalLengthMax"),
			this.SetConfigMap(10, "DefaultPitchInRangeMin"),
			this.SetConfigMap(11, "DefaultPitchInRangeMax"),
			this.SetConfigMap(12, "DefaultPitchOutRangeMin"),
			this.SetConfigMap(13, "DefaultPitchOutRangeMax"),
			this.SetConfigMap(17, "NearerRange"),
			this.SetConfigMap(14, "CameraPitchMin"),
			this.SetConfigMap(15, "CameraPitchMax"),
			this.SetConfigMap(16, "CameraPitchOffset");
	}
	ExitCameraGuide() {
		this.y_e();
	}
	SetConfigs(t, e) {
		super.SetConfigs(t, e), (this.E_e = !0);
	}
	ApplyCameraGuide(t, e, a, i, s, h, r) {
		this.IsActivate &&
			this.E_e &&
			(this.v_e.FromUeVector(t),
			(this.j1e = e),
			(this.c_e = a),
			(this.W1e = i),
			(this.m_e = s),
			this.I_e(),
			(t = this.Camera.PlayerLocation),
			(e = this.Camera.CurrentCamera.ArmRotation),
			(a = Vector_1.Vector.Create()),
			e.Vector(a),
			(i = Vector_1.Vector.Create()).DeepCopy(this.v_e),
			i.SubtractionEqual(h ?? t),
			(s = i.CosineAngle2D(a)),
			(e = i.SineAngle2D(a)),
			(this.sle = this.Camera.CameraActor.K2_GetActorRotation().Yaw),
			(a = Rotator_1.Rotator.Create()),
			i.Rotation(a),
			(this.ale = a.Yaw),
			e < 0
				? s >
					Math.cos(this.CheckAdjustYawAngleMin * MathUtils_1.MathUtils.DegToRad)
					? (this.ale += this.CheckAdjustYawAngleMin)
					: s <
							Math.cos(
								this.CheckAdjustYawAngleMax * MathUtils_1.MathUtils.DegToRad,
							)
						? (this.ale += this.CheckAdjustYawAngleMax)
						: (this.ale = this.sle)
				: s >
						Math.cos(
							this.CheckAdjustYawAngleMin * MathUtils_1.MathUtils.DegToRad,
						)
					? (this.ale -= this.CheckAdjustYawAngleMin)
					: s <
							Math.cos(
								this.CheckAdjustYawAngleMax * MathUtils_1.MathUtils.DegToRad,
							)
						? (this.ale -= this.CheckAdjustYawAngleMax)
						: (this.ale = this.sle),
			180 < this.sle - this.ale
				? (this.ale += 360)
				: 180 < this.ale - this.sle && (this.ale -= 360),
			(a = Rotator_1.Rotator.Create()),
			i.Rotation(a),
			(this.ole = this.Camera.CameraActor.K2_GetActorRotation().Pitch),
			i.Size() > this.NearerRange
				? ((e = a.Pitch + this.CameraPitchOffset),
					(this.rle = MathUtils_1.MathUtils.Clamp(
						e,
						this.CameraPitchMin,
						this.CameraPitchMax,
					)))
				: (this.rle = MathUtils_1.MathUtils.RangeClamp(
						i.Z,
						this.DefaultPitchInRangeMin,
						this.DefaultPitchInRangeMax,
						this.DefaultPitchOutRangeMin,
						this.DefaultPitchOutRangeMax,
					)),
			(s = i.Size2D()),
			(this.C_e =
				s * this.CameraArmLengthRateHorizontal +
				Math.abs(i.Z) * this.CameraArmLengthRateVertical),
			(this.C_e = MathUtils_1.MathUtils.Clamp(
				this.C_e,
				0,
				this.CameraArmLengthAdditionMax,
			)),
			h
				? (this.g_e.DeepCopy(h),
					this.g_e.SubtractionEqual(t),
					(this.M_e = r),
					(this.S_e = this.Camera.CurrentCamera.Fov))
				: ((a = Vector_1.Vector.Create()).DeepCopy(this.v_e),
					a.SubtractionEqual(t),
					(a.Z = 0),
					s * this.CameraArmOffsetHorizontalLengthRate >
					this.CameraArmOffsetHorizontalLengthMax
						? (a.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
							this.g_e.DeepCopy(a),
							this.g_e.MultiplyEqual(this.CameraArmOffsetHorizontalLengthMax))
						: (this.g_e.DeepCopy(a),
							this.g_e.MultiplyEqual(this.CameraArmOffsetHorizontalLengthRate)),
					(e = (this.v_e.Z - t.Z) * this.CameraArmOffsetVerticalLengthRate),
					(e = MathUtils_1.MathUtils.Clamp(
						e,
						-this.CameraArmOffsetVerticalLengthMax,
						this.CameraArmOffsetVerticalLengthMax,
					)),
					(this.g_e.Z = e),
					(this.M_e = -1)));
	}
	T_e(t) {
		var e = MathUtils_1.MathUtils.LerpSin(this.sle, this.ale, t),
			a = MathUtils_1.MathUtils.LerpSin(this.ole, this.rle, t);
		(this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(a, e, 0)),
			(this.Camera.IsModifiedArmRotation = !0),
			this.M_e &&
				-1 !== this.M_e &&
				((a = MathUtils_1.MathUtils.LerpSin(this.S_e, this.M_e, t)),
				(this.Camera.DesiredCamera.Fov = a));
	}
	L_e(t) {
		(this.CurrentCameraArmLengthAddition = MathUtils_1.MathUtils.LerpSin(
			this.d_e,
			this.C_e,
			t,
		)),
			(this.CurrentCameraArmOffset = Vector_1.Vector.Create()),
			Vector_1.Vector.LerpSin(
				this.B1e,
				this.g_e,
				t,
				this.CurrentCameraArmOffset,
			);
	}
	D_e(t) {
		1 <= t &&
			((this.CurrentCameraArmLengthAddition = this.d_e),
			this.B1e.DeepCopy(this.CurrentCameraArmOffset)),
			(this.CurrentCameraArmLengthAddition = MathUtils_1.MathUtils.LerpSin(
				this.d_e,
				0,
				t,
			)),
			Vector_1.Vector.LerpSin(
				this.B1e,
				Vector_1.Vector.ZeroVectorProxy,
				t,
				this.CurrentCameraArmOffset,
			),
			this.M_e &&
				-1 !== this.M_e &&
				((t = MathUtils_1.MathUtils.LerpSin(this.S_e, this.Camera.Fov, t)),
				(this.Camera.DesiredCamera.Fov = t));
	}
	UpdateInternal(t) {
		switch (
			(this.UpdateBreakModifyInfo(),
			(this.H6 += t),
			(this.BreakModifyArmRotation || this.BreakModifyArmLength) && this.y_e(),
			this.f_e)
		) {
			case 1:
				var e = 0 < this.j1e ? this.H6 / this.j1e : 1;
				e = MathUtils_1.MathUtils.Clamp(e, 0, 1);
				this.T_e(e), this.L_e(e), this.H6 > this.j1e && this.R_e();
				break;
			case 2:
				0 <= this.c_e && this.H6 > this.j1e + this.c_e && this.y_e();
				break;
			case 3:
				(this.p_e += t),
					(e = 0 < this.W1e ? this.p_e / this.W1e : 1),
					(e = MathUtils_1.MathUtils.Clamp(e, 0, 1)),
					this.D_e(e),
					this.p_e > this.W1e && (this.f_e = 0);
		}
	}
	OnDisable() {
		this.y_e();
	}
	UpdateDeactivateInternal(t) {
		3 === this.f_e &&
			((this.p_e += t),
			(t = 0 < this.W1e ? this.p_e / this.W1e : 1),
			(t = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
			this.D_e(t),
			this.p_e > this.W1e) &&
			(this.f_e = 0);
	}
	I_e() {
		this.ResetBreakModifyInfo(),
			(this.f_e = 1),
			(this.H6 = 0),
			(this.p_e = 0),
			(this.d_e = this.CurrentCameraArmLengthAddition),
			this.B1e.Set(
				this.CurrentCameraArmOffset.X,
				this.CurrentCameraArmOffset.Y,
				this.CurrentCameraArmOffset.Z,
			),
			this.m_e && this.Camera.CameraInputController.Lock(this);
	}
	R_e() {
		this.f_e = 2;
	}
	y_e() {
		(1 !== this.f_e && 2 !== this.f_e) ||
			((this.f_e = 3),
			(this.p_e = 0),
			(this.d_e = this.CurrentCameraArmLengthAddition),
			this.B1e.DeepCopy(this.CurrentCameraArmOffset),
			this.Camera.CameraInputController.Unlock(this),
			this.M_e &&
				-1 !== this.M_e &&
				(this.S_e = this.Camera.CurrentCamera.Fov));
	}
	IsLockCameraInput() {
		return this.m_e;
	}
}
exports.CameraGuideController = CameraGuideController;
