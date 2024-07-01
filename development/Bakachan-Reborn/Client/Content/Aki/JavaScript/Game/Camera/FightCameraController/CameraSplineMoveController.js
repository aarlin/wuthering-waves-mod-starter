"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraSplineMoveController = void 0);
const Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CameraControllerBase_1 = require("./CameraControllerBase");
class CameraSplineMoveController extends CameraControllerBase_1.CameraControllerBase {
	constructor() {
		super(...arguments),
			(this.YawAngle = 0),
			(this.PitchAngle = 0),
			(this.FadeInTime = -0),
			(this.SplineId = void 0),
			(this.Spline = void 0),
			(this.fle = Rotator_1.Rotator.Create()),
			(this.Bce = Vector_1.Vector.Create()),
			(this.bce = 0),
			(this.Gue = Rotator_1.Rotator.Create());
	}
	Name() {
		return "SplineMoveController";
	}
	OnInit() {
		this.Lock(this);
	}
	ApplyCameraSpline(e, t, a, i) {
		var r;
		this.SplineId === e
			? this.ApplyCameraSplineInternal(e, this.Spline, t, a, i)
			: (this.SplineId &&
					ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
						this.SplineId,
						this.Camera.Entity.Id,
						1,
					),
				(r =
					ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
						e,
						this.Camera.Entity.Id,
						1,
					)),
				this.ApplyCameraSplineInternal(e, r, t, a, i));
	}
	ApplyCameraSplineInternal(e, t, a, i, r) {
		this.SplineId || this.Unlock(this),
			(this.SplineId = e),
			(this.Spline = t),
			(this.YawAngle = a),
			(this.PitchAngle = i),
			(this.FadeInTime = r),
			(this.bce = 0),
			this.fle.DeepCopy(this.Camera.CameraRotation);
	}
	EndCameraSpline() {
		this.SplineId &&
			(ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
				this.SplineId,
				this.Camera.Entity.Id,
				1,
			),
			(this.SplineId = void 0),
			(this.Spline = void 0),
			this.Lock(this));
	}
	OnEnable() {
		this.Camera.CameraAdjustController.Lock(this),
			this.Camera.CameraInputController.Lock(this),
			this.Camera.CameraClimbController.Lock(this),
			this.Camera.CameraFocusController.Lock(this),
			this.Camera.CameraModifyController.Lock(this);
	}
	OnDisable() {
		this.Camera.CameraAdjustController.Unlock(this),
			this.Camera.CameraInputController.Unlock(this),
			this.Camera.CameraClimbController.Unlock(this),
			this.Camera.CameraFocusController.Unlock(this),
			this.Camera.CameraModifyController.Unlock(this);
	}
	UpdateInternal(e) {
		var t;
		this.Spline &&
			Global_1.Global.BaseCharacter &&
			((t = this.Spline.FindInputKeyClosestToWorldLocation(
				Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.ToUeVector(),
			)),
			this.Bce.FromUeVector(this.Spline.GetDirectionAtSplineInputKey(t, 1)),
			(t = this.Bce.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg),
			this.bce < this.FadeInTime
				? ((this.bce = Math.min(this.FadeInTime, this.bce + e)),
					(e = MathUtils_1.MathUtils.GetCubicValue(this.bce / this.FadeInTime)),
					this.Gue.Set(this.PitchAngle, t + this.YawAngle, 0),
					Rotator_1.Rotator.Lerp(
						this.fle,
						this.Gue,
						e,
						this.Camera.DesiredCamera.ArmRotation,
					))
				: this.Camera.DesiredCamera.ArmRotation.Set(
						this.PitchAngle,
						t + this.YawAngle,
						0,
					),
			(this.Camera.IsModifiedArmRotation = !0));
	}
}
exports.CameraSplineMoveController = CameraSplineMoveController;
