"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraSidestepController = void 0);
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	FightCameraLogicComponent_1 = require("../FightCameraLogicComponent"),
	CameraControllerBase_1 = require("./CameraControllerBase");
class CameraSidestepController extends CameraControllerBase_1.CameraControllerBase {
	constructor() {
		super(...arguments),
			(this.YawInterpSpeed = 0),
			(this.PitchInterpSpeed = 0),
			(this.PitchAccelerate = 0),
			(this.yce = 0),
			(this.PitchOffset = 0),
			(this.MaxYawSpeed = 0),
			(this.MaxPitch = 0),
			(this.MinPitch = 0),
			(this.MoveDurationThreshold = 1),
			(this.Tce = 0),
			(this.Lce = -0),
			(this.InputRecoverArmLengthMin = 0),
			(this.InputRecoverArmLengthMax = 0),
			(this.InputRecoverArmLengthSpeedMin = 0),
			(this.InputRecoverArmLengthSpeedMax = 0),
			(this.InputRecoverArmLengthLimit = 0),
			(this.InputRecoverArmLengthCurve = void 0),
			(this.Dce = Vector_1.Vector.Create()),
			(this.Rce = Vector_1.Vector.Create());
	}
	Name() {
		return "SidestepController";
	}
	OnInit() {
		this.SetConfigMap(1, "YawInterpSpeed"),
			this.SetConfigMap(2, "PitchInterpSpeed"),
			this.SetConfigMap(7, "PitchAccelerate"),
			this.SetConfigMap(5, "MaxPitch"),
			this.SetConfigMap(4, "MinPitch"),
			this.SetConfigMap(3, "PitchOffset"),
			this.SetConfigMap(6, "MoveDurationThreshold"),
			this.SetConfigMap(8, "MaxYawSpeed"),
			this.SetConfigMap(9, "InputRecoverArmLengthMin"),
			this.SetConfigMap(10, "InputRecoverArmLengthMax"),
			this.SetConfigMap(11, "InputRecoverArmLengthSpeedMin"),
			this.SetConfigMap(12, "InputRecoverArmLengthSpeedMax"),
			this.SetConfigMap(13, "InputRecoverArmLengthLimit"),
			this.SetCurveConfigMap(13, "InputRecoverArmLengthCurve");
	}
	UpdateInternal(e) {
		ModelManager_1.ModelManager.CameraModel.IsEnableSidestepCamera &&
			this.Camera.Character &&
			(this.Uce(e), this.Lce <= 0 || (this.Ace(e), this.Pce(e), this.xce(e)));
	}
	Uce(e) {
		var t = Rotator_1.Rotator.Create(0, this.Camera.PlayerRotator.Yaw, 0),
			r = Rotator_1.Rotator.Create(
				0,
				this.Camera.CurrentCamera.ArmRotation.Yaw,
				0,
			);
		t.Vector(this.Rce),
			r.Vector(this.Dce),
			this.Camera.IsModifiedArmRotation ||
			this.Camera.IsModifiedArmLength ||
			!this.IsCharacterMoving()
				? ((this.Lce = 0), (this.Tce = 0))
				: ((this.Lce += e),
					(this.Tce = MathUtils_1.MathUtils.InterpTo(
						this.Tce,
						this.MaxYawSpeed,
						e,
						this.YawInterpSpeed,
					)));
	}
	Ace(e) {
		e = this.Dce.SineAngle2D(this.Rce) * e * this.Tce;
		var t = this.Camera.DesiredCamera.ArmRotation;
		(t.Yaw = (t.Yaw + e) % 360), (this.Camera.IsModifiedArmRotation = !0);
	}
	Pce(e) {
		var t, r, a;
		this.Lce < this.MoveDurationThreshold ||
			((a = this.Camera.CharacterEntityHandle?.Entity?.GetComponent(160)) &&
				((a = a.MovementTerrainNormal),
				(a = Vector_1.Vector.Create(0, 0, 1)
					.CrossProductEqual(this.Dce)
					.CrossProductEqual(a)),
				(t = MathUtils_1.MathUtils.WrapAngle(
					this.Camera.DesiredCamera.ArmRotation.Pitch,
				)),
				(a =
					MathUtils_1.MathUtils.Clamp(
						Math.atan2(
							a.Z,
							a.Size2D() + MathCommon_1.MathCommon.KindaSmallNumber,
						) *
							MathCommon_1.MathCommon.RadToDeg -
							this.PitchOffset,
						this.MinPitch,
						this.MaxPitch,
					) - t),
				(r = Math.abs(a)),
				(a = this.PitchInterpSpeed * a),
				(this.yce = MathUtils_1.MathUtils.InterpConstantTo(
					this.yce,
					a,
					e,
					this.PitchAccelerate,
				)),
				(this.Camera.DesiredCamera.ArmRotation.Pitch =
					t + MathUtils_1.MathUtils.Clamp(this.yce * e, -r, r)),
				(this.Camera.IsModifiedArmRotation = !0)));
	}
	IsCharacterMoving() {
		var e;
		return (
			!!this.Camera.Character &&
			void 0 !==
				(e = this.Camera.CharacterEntityHandle.Entity.GetComponent(161)) &&
			e.Valid &&
			e.Speed > FightCameraLogicComponent_1.CLEAN_TARGET_SPEED_THRESHOLD &&
			!this.Camera.ContainsTag(-1371021686) &&
			!this.Camera.ContainsTag(1008164187)
		);
	}
	xce(e) {
		var t =
			this.Camera.Character?.CharacterActorComponent.Entity.GetComponent(161);
		if (t && t.HasMoveInput) {
			let h = 0;
			t = this.Camera.GetArmLengthWithSettingAndZoom(this.Camera.CurrentCamera);
			var r,
				a =
					(i = this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera)) -
					this.Camera.CurrentCamera.ArmLength,
				i =
					((a = this.InputRecoverArmLengthMin + a),
					Math.max(i, this.InputRecoverArmLengthMax));
			(i =
				(t < a
					? ((a -= t),
						(r = MathUtils_1.MathUtils.Lerp(
							this.InputRecoverArmLengthSpeedMin,
							this.InputRecoverArmLengthSpeedMax,
							this.InputRecoverArmLengthCurve.GetCurrentValue(
								a / this.InputRecoverArmLengthLimit,
							),
						)),
						(h = Math.min(r * e, a)))
					: i < t &&
						((r = t - i),
						(a = MathUtils_1.MathUtils.Lerp(
							this.InputRecoverArmLengthSpeedMin,
							this.InputRecoverArmLengthSpeedMax,
							this.InputRecoverArmLengthCurve.GetCurrentValue(
								r / this.InputRecoverArmLengthLimit,
							),
						)),
						(h = -Math.min(a * e, r))),
				t + h)),
				(a = t / this.Camera.DesiredCamera.ZoomModifier);
			this.Camera.DesiredCamera.ZoomModifier = i / a;
		}
	}
}
exports.CameraSidestepController = CameraSidestepController;
