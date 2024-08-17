"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraRotatorController = void 0);
const Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	CameraControllerBase_1 = require("./CameraControllerBase");
class CameraRotatorController extends CameraControllerBase_1.CameraControllerBase {
	constructor() {
		super(...arguments),
			(this.cce = Rotator_1.Rotator.Create()),
			(this.mce = Rotator_1.Rotator.Create()),
			(this.cie = Rotator_1.Rotator.Create()),
			(this.dce = !1),
			(this.Ql = -0),
			(this.Cce = -0),
			(this.gce = 0),
			(this.fce = 0),
			(this.pce = 0),
			(this.vce = void 0);
	}
	Name() {
		return "RotatorController";
	}
	PlayCameraRotator(t, e, r, a) {
		this.Mce(t, e, r, a, 0, 1);
	}
	PlayCameraRotatorWithCurve(t, e, r, a, o, i, s) {
		(this.vce = s), this.Mce(t, e, r, a, o, i);
	}
	PlayCameraEulerRotator(t, e) {
		this.Sce(t, e, 0, 1);
	}
	PlayCameraEulerRotatorWithCurve(t, e, r, a, o) {
		(this.vce = o), this.Sce(t, e, r, a);
	}
	nce(t) {
		var e, r;
		this.dce &&
			(([r, e] =
				this.Camera.CharacterEntityHandle.Entity.GetComponent(
					52,
				).GetCameraInput()),
			0 < Math.abs(r) ||
				0 < Math.abs(e) ||
				((r = this.Cce / this.Ql),
				this.vce ? (this.gce = this.vce.GetCurrentValue(r)) : (this.gce = r),
				(this.gce = MathUtils_1.MathUtils.Clamp(this.gce, this.fce, this.pce)),
				Rotator_1.Rotator.Lerp(this.cce, this.mce, this.gce, this.cie),
				(this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(
					this.cie,
				)),
				(this.Cce += t),
				this.Cce >= this.Ql)) &&
			this.Ece();
	}
	Mce(t, e, r, a, o, i) {
		(this.dce = !0),
			this.cce.FromUeRotator(this.Camera.CurrentCamera.ArmRotation);
		var s = Vector_1.Vector.Create();
		e.Subtraction(t, s),
			s.Rotation(this.mce),
			(this.Ql = a),
			(this.Cce = 0),
			(this.gce = 0),
			(this.fce = o),
			(this.pce = i),
			MathUtils_1.MathUtils.ComposeRotator(this.mce, r, this.mce);
	}
	Sce(t, e, r, a) {
		(this.dce = !0),
			this.cce.FromUeRotator(this.Camera.CurrentCamera.ArmRotation),
			this.mce.Set(t.Pitch, t.Yaw, t.Roll),
			(this.Ql = e),
			(this.Cce = 0),
			(this.gce = 0),
			(this.fce = r),
			(this.pce = a);
	}
	Ece() {
		(this.dce = !1), (this.vce = void 0);
	}
	UpdateInternal(t) {
		this.nce(t);
	}
}
exports.CameraRotatorController = CameraRotatorController;
