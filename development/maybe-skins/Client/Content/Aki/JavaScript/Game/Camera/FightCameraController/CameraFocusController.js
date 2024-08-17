"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraFocusController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CameraControllerBase_1 = require("./CameraControllerBase"),
	ARM_OFFSET_Y_SPEED = 100,
	DEFAULT_FPS = 60,
	FIRST_THRESHOLD = 0.5,
	FIRST_THRESHOLD_SQUARED = 0.25;
class CameraFocusController extends CameraControllerBase_1.CameraControllerBase {
	constructor() {
		super(...arguments),
			(this.RelativeRotationLagSpeedMin = 0),
			(this.RelativeRotationLagSpeedMax = 0),
			(this.RelativeRotationLagAngleRange = 0),
			(this.RelativeRotationLagCurve = void 0),
			(this.RelativeRotationLagRatioMin = 0),
			(this.RelativeRotationLagRatioMax = 0),
			(this.RelativeRotationLagDistanceRangeMin = 0),
			(this.RelativeRotationLagDistanceRangeMax = 0),
			(this.RelativeRotationLagRatioCurve = void 0),
			(this.YawSignAdaptionOn = 0),
			(this.YawSignAdaptionThreshold = 0),
			(this.YawSignAdaptionCooldown = 0),
			(this.RelativeYawSoftMin = 0),
			(this.RelativeYawSoftMax = 0),
			(this.CameraOffsetSoft = 0),
			(this.CameraOffset = 0),
			(this.HardLockInputYawSensitivity = 0),
			(this.HardLockInputPitchSensitivity = 0),
			(this.HardLockInputYawSensitivityGamepad = 0),
			(this.HardLockInputPitchSensitivityGamepad = 0),
			(this.SoftLockInputYawSensitivity = 0),
			(this.SoftLockInputPitchSensitivity = 0),
			(this.SoftLockInputYawSensitivityGamepad = 0),
			(this.SoftLockInputPitchSensitivityGamepad = 0),
			(this.ChangeShowTargetDamping = 0),
			(this.ChangeShowTargetAngleCoefficient = 0),
			(this.ChangeShowTargetDistCoefficient = 0),
			(this.ChangeShowTargetSensitivity = 0),
			(this.ChangeShowTargetSensitivityGamepad = 0),
			(this.RelativeYawHardMax = 0),
			(this.RelativeYawHardMin = 0),
			(this.RelativePitchHardMax = 0),
			(this.RelativePitchHardMin = 0),
			(this.SoftUnlockYawSpeed = 0),
			(this.SoftUnlockPitchSpeed = 0),
			(this.s_e = Vector_1.Vector.Create()),
			(this.Sle = Rotator_1.Rotator.Create()),
			(this.a_e = !1),
			(this.FocusLimitLength = 0),
			(this.FocusLimitPitchSpeed = 0),
			(this.FocusLimitYawSpeed = 0),
			(this.h_e = 0),
			(this.AddCameraOffsetY = void 0),
			(this.l_e = Vector2D_1.Vector2D.Create()),
			(this.Qyn = !0),
			(this.__e = !0),
			(this.u_e = 0);
	}
	Name() {
		return "FocusController";
	}
	OnInit() {
		this.SetConfigMap(1, "RelativeRotationLagSpeedMin"),
			this.SetConfigMap(2, "RelativeRotationLagSpeedMax"),
			this.SetConfigMap(3, "RelativeRotationLagAngleRange"),
			this.SetCurveConfigMap(3, "RelativeRotationLagCurve"),
			this.SetConfigMap(28, "RelativeRotationLagRatioMin"),
			this.SetConfigMap(29, "RelativeRotationLagRatioMax"),
			this.SetConfigMap(31, "RelativeRotationLagDistanceRangeMin"),
			this.SetConfigMap(30, "RelativeRotationLagDistanceRangeMax"),
			this.SetCurveConfigMap(30, "RelativeRotationLagRatioCurve"),
			this.SetConfigMap(4, "YawSignAdaptionOn"),
			this.SetConfigMap(5, "YawSignAdaptionThreshold"),
			this.SetConfigMap(6, "YawSignAdaptionCooldown"),
			this.SetConfigMap(7, "RelativeYawSoftMin"),
			this.SetConfigMap(8, "RelativeYawSoftMax"),
			this.SetConfigMap(9, "CameraOffsetSoft"),
			this.SetConfigMap(10, "CameraOffset"),
			this.SetConfigMap(11, "HardLockInputYawSensitivity"),
			this.SetConfigMap(12, "HardLockInputPitchSensitivity"),
			this.SetConfigMap(13, "HardLockInputYawSensitivityGamepad"),
			this.SetConfigMap(14, "HardLockInputPitchSensitivityGamepad"),
			this.SetConfigMap(24, "SoftLockInputYawSensitivity"),
			this.SetConfigMap(25, "SoftLockInputPitchSensitivity"),
			this.SetConfigMap(26, "SoftLockInputYawSensitivityGamepad"),
			this.SetConfigMap(27, "SoftLockInputPitchSensitivityGamepad"),
			this.SetConfigMap(15, "ChangeShowTargetDamping"),
			this.SetConfigMap(16, "ChangeShowTargetAngleCoefficient"),
			this.SetConfigMap(17, "ChangeShowTargetDistCoefficient"),
			this.SetConfigMap(18, "RelativeYawHardMin"),
			this.SetConfigMap(19, "RelativeYawHardMax"),
			this.SetConfigMap(20, "RelativePitchHardMin"),
			this.SetConfigMap(21, "RelativePitchHardMax"),
			this.SetConfigMap(22, "SoftUnlockYawSpeed"),
			this.SetConfigMap(23, "SoftUnlockPitchSpeed"),
			this.SetConfigMap(32, "ChangeShowTargetSensitivity"),
			this.SetConfigMap(33, "ChangeShowTargetSensitivityGamepad");
	}
	OnEnable() {
		(this.RelativeYawHardMin < 0 ||
			180 < this.RelativeYawHardMin ||
			this.RelativeYawHardMin > this.RelativeYawHardMax) &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Controller",
				58,
				`锁定镜头配置错误，强锁定-镜头偏角最小值${this.RelativeYawHardMin}不在0-180之间或者大于强锁定-镜头偏角最大值` +
					this.RelativeYawHardMax,
			),
			(this.RelativeYawHardMax < 0 ||
				180 < this.RelativeYawHardMax ||
				this.RelativeYawHardMax < this.RelativeYawHardMin) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Controller",
					58,
					`锁定镜头配置错误，强锁定-镜头偏角最大值${this.RelativeYawHardMax}不在0-180之间或者小于强锁定-镜头偏角最小值` +
						this.RelativeYawHardMin,
				),
			(this.RelativePitchHardMin < 0 ||
				180 < this.RelativePitchHardMin ||
				this.RelativePitchHardMin > this.RelativePitchHardMax) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Controller",
					58,
					`锁定镜头配置错误，强锁定-镜头俯仰角最小值${this.RelativePitchHardMin}不在0-180之间或者大于强锁定-镜头俯仰角最大值` +
						this.RelativePitchHardMax,
				),
			(this.RelativePitchHardMax < 0 ||
				180 < this.RelativePitchHardMax ||
				this.RelativePitchHardMax < this.RelativePitchHardMin) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Controller",
					58,
					`锁定镜头配置错误，强锁定-镜头俯仰角最大值${this.RelativePitchHardMax}不在0-180之间或者小于强锁定-镜头俯仰角最小值` +
						this.RelativePitchHardMin,
				),
			this.Camera.CameraAutoController.EnableForce(this),
			this.Camera.CameraSidestepController.Lock(this),
			(this.AddCameraOffsetY = 0);
	}
	InitFocusData(t, a, i, e) {
		0 !== e &&
			((this.a_e = t),
			(this.FocusLimitLength = e),
			(this.FocusLimitPitchSpeed = i),
			(this.FocusLimitYawSpeed = a));
	}
	OnDisable() {
		(this.a_e = !1),
			this.Camera.CameraAutoController.DisableForce(this),
			this.Camera.CameraSidestepController.Unlock(this),
			(this.h_e = 0),
			(this.u_e = 0),
			this.l_e.Reset();
	}
	UpdateCustomEnableCondition() {
		return (
			!!this.Camera.TargetEntity &&
			(!this.a_e || this.Camera.CharacterEntityHandle.IsInit)
		);
	}
	UpdateInternal(t) {
		this.UpdateArmRotation(t), this.UpdateShowTarget(t);
	}
	UpdateArmRotation(t) {
		if (
			this.Camera.TargetEntity &&
			this.Camera.IsTargetLocationValid &&
			(!this.Camera.IsModifiedArmRotation || this.__e)
		) {
			this.__e = !1;
			var [a, i] =
					this.Camera.CharacterEntityHandle.Entity.GetComponent(
						52,
					).GetCameraInput(),
				e = this.Camera.CurrentCamera.ArmRotation,
				s = this.Camera.PlayerLocation;
			s =
				(this.Camera.TargetLocation.Subtraction(s, this.s_e),
				this.Camera.ContainsAnyTag([-1150819426, 1260125908]));
			void 0 === this.AddCameraOffsetY && (this.AddCameraOffsetY = 0);
			let d = 0,
				C = !1,
				S = 0,
				g = 0,
				R = 0,
				p = 0;
			(this.Sle.Pitch = this.Camera.AdjustPitch(this.s_e)),
				(this.Sle.Yaw =
					Math.atan2(this.s_e.Y, this.s_e.X) * MathUtils_1.MathUtils.RadToDeg);
			var h = MathUtils_1.MathUtils.WrapAngle(
					this.Camera.CameraRotation.Yaw - this.Sle.Yaw,
				),
				o = MathUtils_1.MathUtils.WrapAngle(
					this.Camera.CameraRotation.Pitch - this.Sle.Pitch,
				),
				n = 0 <= h ? 1 : -1,
				r = 0 <= o ? 1 : -1;
			if (s) {
				if (this.YawSignAdaptionOn) {
					s =
						0 <=
						(a *= ModelManager_1.ModelManager.PlatformModel.IsGamepad()
							? this.HardLockInputYawSensitivityGamepad
							: this.HardLockInputYawSensitivity)
							? 1
							: -1;
					var l =
						0 <=
						(i = -(i *= ModelManager_1.ModelManager.PlatformModel.IsGamepad()
							? this.HardLockInputPitchSensitivityGamepad
							: this.HardLockInputPitchSensitivity))
							? 1
							: -1;
					if (
						(0 === this.h_e &&
							((this.h_e = n),
							(this.u_e = Time_1.Time.Now + this.YawSignAdaptionCooldown)),
						Time_1.Time.Now > this.u_e &&
							this.h_e !== n &&
							((this.h_e = n),
							(this.u_e = Time_1.Time.Now + this.YawSignAdaptionCooldown)),
						Math.abs(h) < this.RelativeYawHardMin)
					)
						(R += this.h_e * this.RelativeYawHardMin), s == n && (R += a);
					else if (Math.abs(h) > this.RelativeYawHardMax)
						(R += this.h_e * this.RelativeYawHardMax), s != n && (R += a);
					else {
						const t = h + a;
						n * t < 0 &&
							(n == s &&
								180 !== this.RelativeYawHardMax &&
								((a = MathUtils_1.MathUtils.WrapAngle(
									this.Sle.Yaw + this.h_e * this.RelativeYawHardMax,
								)),
								(M = MathUtils_1.MathUtils.WrapAngle(
									this.Sle.Yaw + this.h_e * this.RelativeYawHardMin,
								)),
								(g = Math.max(M, a)),
								(S = Math.min(M, a)),
								(C = !0)),
							n != s) &&
							0 !== this.RelativeYawHardMin &&
							((M = MathUtils_1.MathUtils.WrapAngle(
								this.Sle.Yaw + this.h_e * this.RelativeYawHardMax,
							)),
							(a = MathUtils_1.MathUtils.WrapAngle(
								this.Sle.Yaw + this.h_e * this.RelativeYawHardMin,
							)),
							(g = Math.max(a, M)),
							(S = Math.min(a, M)),
							(C = !0)),
							(R += t);
					}
					if (Math.abs(o) < this.RelativePitchHardMin)
						(p += r * this.RelativePitchHardMin), l == r && (p += i);
					else if (Math.abs(o) > this.RelativePitchHardMax)
						(p += r * this.RelativePitchHardMax), l != r && (p += i);
					else {
						p += o + i;
					}
					(R = MathUtils_1.MathUtils.Clamp(R, h - 179, h + 179)),
						(p = MathUtils_1.MathUtils.Clamp(p, o - 179, o + 179)),
						(this.Sle.Yaw += R),
						(this.Sle.Pitch += p),
						(this.Sle.Yaw = MathUtils_1.MathUtils.WrapAngle(this.Sle.Yaw)),
						(this.Sle.Pitch = MathUtils_1.MathUtils.WrapAngle(this.Sle.Pitch)),
						(d = n * this.CameraOffset);
				}
			} else
				!ModelManager_1.ModelManager.CameraModel.IsEnableSoftLockCamera ||
				((s = this.Camera.CameraModifyController), this.ShouldSoftUnlock()) ||
				s?.IsModified ||
				s?.IsModifyFadeOut ||
				s?.ModifySettings?.IsModifiedArmRotation
					? ((this.Sle.Yaw = e.Yaw), (this.Sle.Pitch = e.Pitch))
					: (a = this.Camera.CharacterEntityHandle.Entity.GetComponent(29)) &&
						a?.ShowTarget?.Valid &&
						((this.__e = !0),
						Math.abs(h) < this.RelativeYawSoftMin
							? (this.Sle.Yaw += n * this.RelativeYawSoftMin)
							: Math.abs(h) > this.RelativeYawSoftMax
								? (this.Sle.Yaw += n * this.RelativeYawSoftMax)
								: (this.Sle.Yaw = this.Camera.CameraRotation.Yaw)),
					(d = this.h_e * this.CameraOffsetSoft);
			const m = Math.abs(d - this.AddCameraOffsetY);
			this.AddCameraOffsetY =
				m > 100 * t
					? MathUtils_1.MathUtils.Lerp(this.AddCameraOffsetY, d, (100 * t) / m)
					: d;
			var M = MathUtils_1.MathUtils.Lerp(
				this.RelativeRotationLagRatioMin,
				this.RelativeRotationLagRatioMax,
				this.RelativeRotationLagRatioCurve.GetCurrentValue(
					(this.s_e.Size2D() - this.RelativeRotationLagDistanceRangeMin) /
						(this.RelativeRotationLagDistanceRangeMax -
							this.RelativeRotationLagDistanceRangeMin),
				),
			);
			l = MathUtils_1.MathUtils.Lerp(
				this.RelativeRotationLagSpeedMin,
				this.RelativeRotationLagSpeedMax,
				this.RelativeRotationLagCurve.GetCurrentValue(
					Math.abs(R) / this.RelativeRotationLagAngleRange,
				),
			);
			MathUtils_1.MathUtils.RotatorInterpTo(
				e,
				this.Sle,
				t,
				M * l,
				this.Camera.DesiredCamera.ArmRotation,
			),
				C &&
					(this.Camera.DesiredCamera.ArmRotation.Yaw =
						MathUtils_1.MathUtils.Clamp(
							this.Camera.DesiredCamera.ArmRotation.Yaw,
							S,
							g,
						)),
				(this.Camera.IsModifiedArmRotation = !0);
		}
	}
	UpdateShowTarget(t) {
		var a, i, e;
		this.Camera.ContainsTag(-1150819426) &&
		(([i, e] =
			this.Camera.CharacterEntityHandle.Entity.GetComponent(
				52,
			).GetCameraInput()),
		0 !== i || 0 !== e)
			? ((e = -e),
				(a =
					(ModelManager_1.ModelManager.PlatformModel.IsGamepad()
						? this.ChangeShowTargetSensitivityGamepad
						: this.ChangeShowTargetSensitivity) * t),
				i * this.l_e.X + e * this.l_e.Y <= 0
					? ((this.Qyn = !0), this.l_e.Set(i * a, e * a))
					: ((this.l_e.X += i * a), (this.l_e.Y += e * a)),
				(i = this.l_e.SizeSquared()) > (this.Qyn ? 0.25 : 1) &&
					((e = Math.sqrt(i)),
					this.l_e.DivisionEqual(e),
					this.Camera.CharacterEntityHandle.Entity.GetComponent(
						29,
					).ChangeShowTarget(
						this.l_e,
						this.ChangeShowTargetAngleCoefficient,
						this.ChangeShowTargetDistCoefficient,
					),
					this.l_e.MultiplyEqual(e - (this.Qyn ? 0.5 : 1)),
					(this.Qyn = !1)),
				this.l_e.MultiplyEqual(
					Math.pow(1 - this.ChangeShowTargetDamping, 60 * t),
				))
			: (this.l_e.Reset(), (this.Qyn = !0));
	}
	UpdateDeactivateInternal(t) {
		var a;
		void 0 !== this.AddCameraOffsetY &&
			((a = Math.abs(0 - this.AddCameraOffsetY)) > 100 * t
				? (this.AddCameraOffsetY = MathUtils_1.MathUtils.Lerp(
						this.AddCameraOffsetY,
						0,
						(100 * t) / a,
					))
				: (this.AddCameraOffsetY = void 0));
	}
	ShouldSoftUnlock() {
		var [t, a] =
			this.Camera.CharacterEntityHandle.Entity.GetComponent(
				52,
			).GetCameraInput();
		return (
			(t *= ModelManager_1.ModelManager.PlatformModel.IsGamepad()
				? this.SoftLockInputYawSensitivityGamepad
				: this.SoftLockInputYawSensitivity),
			(a *= ModelManager_1.ModelManager.PlatformModel.IsGamepad()
				? this.SoftLockInputPitchSensitivityGamepad
				: this.SoftLockInputPitchSensitivity),
			Math.abs(t) > this.SoftUnlockYawSpeed ||
				Math.abs(a) > this.SoftUnlockPitchSpeed
		);
	}
}
exports.CameraFocusController = CameraFocusController;
