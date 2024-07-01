"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraAdjustController = void 0);
const Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	CameraControllerBase_1 = require("./CameraControllerBase");
class CameraAdjustController extends CameraControllerBase_1.CameraControllerBase {
	constructor() {
		super(...arguments),
			(this.CheckLowAdjustPitchMin = 0),
			(this.CheckLowAdjustPitchMax = 0),
			(this.CheckTallAdjustPitchMin = 0),
			(this.CheckTallAdjustPitchMax = 0),
			(this.CheckAdjustNearerRange = 0),
			(this.CheckAdjustNearerYawAngleMin = 0),
			(this.CheckAdjustNearerYawAngleMax = 0),
			(this.CheckAdjustFartherYawAngleMin = 0),
			(this.CheckAdjustFartherYawAngleMax = 0),
			(this.CheckInScreenMinX = 0),
			(this.CheckInScreenMaxX = 0),
			(this.CheckInScreenMinY = 0),
			(this.CheckInScreenMaxY = 0),
			(this.DefaultAdjustFadeTime = -0),
			(this.DefaultAdjustFadeCurve = void 0),
			(this.tle = !1),
			(this.ile = !1),
			(this.ole = 0),
			(this.rle = 0),
			(this.nle = !1),
			(this.sle = 0),
			(this.ale = 0),
			(this.hle = -0),
			(this.lle = Vector_1.Vector.Create());
	}
	Name() {
		return "AdjustController";
	}
	OnInit() {
		this.SetConfigMap(1, "CheckLowAdjustPitchMin"),
			this.SetConfigMap(2, "CheckLowAdjustPitchMax"),
			this.SetConfigMap(3, "CheckTallAdjustPitchMin"),
			this.SetConfigMap(4, "CheckTallAdjustPitchMax"),
			this.SetConfigMap(5, "CheckAdjustNearerRange"),
			this.SetConfigMap(6, "CheckAdjustNearerYawAngleMin"),
			this.SetConfigMap(7, "CheckAdjustNearerYawAngleMax"),
			this.SetConfigMap(8, "CheckAdjustFartherYawAngleMin"),
			this.SetConfigMap(9, "CheckAdjustFartherYawAngleMax"),
			this.SetConfigMap(10, "CheckInScreenMinX"),
			this.SetConfigMap(11, "CheckInScreenMaxX"),
			this.SetConfigMap(12, "CheckInScreenMinY"),
			this.SetConfigMap(13, "CheckInScreenMaxY"),
			this.SetConfigMap(14, "DefaultAdjustFadeTime"),
			this.SetCurveConfigMap(14, "DefaultAdjustFadeCurve");
	}
	OnDisable() {
		this.tle && this._le();
	}
	ApplyCameraAdjust() {
		var t, e, i, a, s, h, r, l, n;
		this.IsActivate &&
			this.Camera.TargetEntity &&
			this.Camera.IsTargetLocationValid &&
			((i = this.Camera.PlayerLocation),
			(t = this.Camera.TargetLocation),
			(l = this.Camera.CurrentCamera.ArmRotation),
			(e = Vector_1.Vector.Create()),
			l.Vector(e),
			t.Subtraction(i, this.lle),
			(i = !this.lle.IsNearlyZero() && !e.IsNearlyZero()),
			(a = this.lle.CosineAngle2D(e)),
			(h = this.lle.Size()),
			(r =
				this.lle.Z < 0
					? this.CheckLowAdjustPitchMin
					: this.CheckTallAdjustPitchMin),
			(n =
				this.lle.Z < 0
					? this.CheckLowAdjustPitchMax
					: this.CheckTallAdjustPitchMax),
			(s =
				h < this.CheckAdjustNearerRange
					? this.CheckAdjustNearerYawAngleMin
					: this.CheckAdjustFartherYawAngleMin),
			(h =
				h < this.CheckAdjustNearerRange
					? this.CheckAdjustNearerYawAngleMax
					: this.CheckAdjustFartherYawAngleMax),
			(this.ile = l.Pitch < r || l.Pitch > n),
			(this.nle =
				!i ||
				a > Math.cos(s * MathUtils_1.MathUtils.DegToRad) ||
				a < Math.cos(h * MathUtils_1.MathUtils.DegToRad)),
			!(r = this.Camera.CheckPositionInScreen(
				t,
				this.CheckInScreenMinX,
				this.CheckInScreenMaxX,
				this.CheckInScreenMinY,
				this.CheckInScreenMaxY,
			)) ||
				this.ile ||
				this.nle) &&
			(this.Camera.CameraAutoController.EnableForce(this),
			this.ResetBreakModifyInfo(),
			(this.nle = !0),
			(this.tle = !0),
			(this.hle = 0),
			this.nle &&
				((l = this.lle.SineAngle2D(e)),
				(this.sle = this.Camera.CurrentCamera.ArmRotation.Yaw),
				(n = Rotator_1.Rotator.Create()),
				this.lle.Rotation(n),
				(this.ale = n.Yaw),
				0 < l
					? !r || a > Math.cos(s * MathUtils_1.MathUtils.DegToRad)
						? (this.ale += s)
						: a < Math.cos(h * MathUtils_1.MathUtils.DegToRad)
							? (this.ale += h)
							: (this.ale = this.sle)
					: !r || a > Math.cos(s * MathUtils_1.MathUtils.DegToRad)
						? (this.ale -= s)
						: a < Math.cos(h * MathUtils_1.MathUtils.DegToRad)
							? (this.ale -= h)
							: (this.ale = this.sle),
				180 < this.sle - this.ale
					? (this.ale += 360)
					: 180 < this.ale - this.sle && (this.ale -= 360)),
			this.ile) &&
			((this.ole = MathUtils_1.MathUtils.StandardizingPitch(
				this.Camera.CurrentCamera.ArmRotation.Pitch,
			)),
			(this.rle = MathUtils_1.MathUtils.StandardizingPitch(
				this.Camera.AdjustPitch(this.lle),
			)));
	}
	UpdateInternal(t) {}
	_le() {
		this.Camera.CameraAutoController.DisableForce(this),
			(this.tle = !1),
			(this.ile = !1),
			(this.nle = !1);
	}
}
exports.CameraAdjustController = CameraAdjustController;
