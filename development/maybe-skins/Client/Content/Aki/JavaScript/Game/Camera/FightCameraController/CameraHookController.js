"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraHookController = void 0);
const Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CameraControllerBase_1 = require("./CameraControllerBase");
class CameraHookController extends CameraControllerBase_1.CameraControllerBase {
	constructor() {
		super(...arguments),
			(this.U_e = void 0),
			(this.f_e = 0),
			(this.H6 = 0),
			(this.p_e = 0),
			(this.A_e = Vector_1.Vector.Create()),
			(this.P_e = Vector_1.Vector.Create()),
			(this.x_e = Vector_1.Vector.Create()),
			(this.WI = !1);
	}
	Name() {
		return "HookController";
	}
	ApplyCameraHook(e) {
		(this.U_e = e), (this.WI = !0), this.w_e();
	}
	ExitCameraHook(e = !0) {
		(this.WI = !1), 0 !== this.f_e && this.B_e(e);
	}
	w_e() {
		this.ResetBreakModifyInfo(),
			(this.f_e = 1),
			(this.H6 = 0),
			(this.p_e = 0),
			this.A_e.DeepCopy(this.Camera.CameraForward),
			this.U_e.CameraGaze.LockCamera &&
				(ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraInputController.Lock(
					this,
				),
				ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraFocusController.Lock(
					this,
				));
	}
	UpdateCustomEnableCondition() {
		return this.WI;
	}
	UpdateInternal(e) {
		if (this.U_e.Valid)
			switch (
				(this.UpdateBreakModifyInfo(),
				(this.H6 += e),
				(this.BreakModifyArmRotation || this.BreakModifyArmLength) &&
					this.B_e(),
				this.b_e(),
				this.f_e)
			) {
				case 1:
					var a =
						0 < this.U_e.CameraGaze.FadeInTime
							? this.H6 / this.U_e.CameraGaze.FadeInTime
							: 1;
					a = MathUtils_1.MathUtils.Clamp(a, 0, 1);
					this.q_e(a),
						this.H6 > this.U_e.CameraGaze.FadeInTime && (this.f_e = 2);
					break;
				case 2:
					this.G_e(),
						0 <= this.U_e.CameraGaze.StayTime &&
							this.H6 >
								this.U_e.CameraGaze.FadeInTime + this.U_e.CameraGaze.StayTime &&
							(void 0 === this.U_e.CameraGaze.FadeOutTime
								? ((this.f_e = 0), this.B_e())
								: ((this.f_e = 3),
									this.P_e.DeepCopy(this.Camera.CameraForward)));
					break;
				case 3:
					(this.p_e += e),
						(a =
							0 < this.U_e.CameraGaze.FadeOutTime
								? this.p_e / this.U_e.CameraGaze.FadeOutTime
								: 1),
						(a = MathUtils_1.MathUtils.Clamp(a, 0, 1)),
						this.D_e(a),
						this.p_e > this.U_e.CameraGaze.FadeOutTime &&
							((this.f_e = 0), this.B_e());
			}
		else this.ExitCameraHook();
	}
	UpdateDeactivateInternal(e) {
		3 === this.f_e &&
			((this.p_e += e),
			(e =
				0 < this.U_e.CameraGaze.FadeOutTime
					? this.p_e / this.U_e.CameraGaze.FadeOutTime
					: 1),
			(e = MathUtils_1.MathUtils.Clamp(e, 0, 1)),
			this.D_e(e),
			this.p_e > this.U_e.CameraGaze.FadeOutTime) &&
			((this.f_e = 0), this.B_e());
	}
	q_e(e) {
		var a = Vector_1.Vector.Create();
		Vector_1.Vector.LerpSin(this.A_e, this.x_e, e, a),
			(e = a.ToUeVector().Rotation());
		this.Camera.DesiredCamera.ArmRotation.DeepCopy(e),
			(this.Camera.IsModifiedArmRotation = !0);
	}
	G_e() {
		var e = this.x_e.ToUeVector().Rotation();
		this.Camera.DesiredCamera.ArmRotation.DeepCopy(e),
			(this.Camera.IsModifiedArmRotation = !0);
	}
	D_e(e) {
		var a = Vector_1.Vector.Create();
		Vector_1.Vector.LerpSin(this.P_e, this.A_e, e, a),
			(e = a.ToUeVector().Rotation());
		this.Camera.DesiredCamera.ArmRotation.DeepCopy(e),
			(this.Camera.IsModifiedArmRotation = !0);
	}
	b_e() {
		var e = this.U_e.Location,
			a = this.Camera.PlayerLocation;
		e.Subtraction(a, this.x_e),
			this.x_e.Normalize(),
			Math.abs(this.x_e.X) < MathUtils_1.MathUtils.SmallNumber &&
				Math.abs(this.x_e.Y) < MathUtils_1.MathUtils.SmallNumber &&
				(this.x_e = Vector_1.Vector.ZeroVectorProxy);
	}
	B_e(e = !0) {
		(this.WI = !1),
			(1 !== this.f_e && 2 !== this.f_e) ||
			!this.U_e?.Valid ||
			void 0 === this.U_e?.CameraGaze?.FadeOutTime
				? (ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraInputController.Unlock(
						this,
					),
					ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraFocusController.Unlock(
						this,
					))
				: ((this.f_e = 3),
					(this.p_e = e ? 0 : this.U_e.CameraGaze.FadeOutTime),
					this.P_e.DeepCopy(this.Camera.CameraForward));
	}
}
exports.CameraHookController = CameraHookController;
