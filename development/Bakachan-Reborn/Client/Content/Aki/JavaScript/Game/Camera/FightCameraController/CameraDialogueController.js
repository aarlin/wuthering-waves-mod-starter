"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraDialogueController = void 0);
const Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	CameraControllerBase_1 = require("./CameraControllerBase"),
	MIDDLE_OFFSET_ANGLE = 90;
class CameraDialogueController extends CameraControllerBase_1.CameraControllerBase {
	constructor() {
		super(...arguments),
			(this.FadeInExp = 0),
			(this.FadeInDuration = -0),
			(this.FadeOutInterpSpeed = 0),
			(this.CheckYaw = 0),
			(this.CheckPitchMin = 0),
			(this.CheckPitchMax = 0),
			(this.AdjustYaw = 0),
			(this.AdjustPitchMin = 0),
			(this.AdjustPitchMax = 0),
			(this.OffsetRate = 0),
			(this.OffsetLengthMax = 0),
			(this.DefaultArmLength = 0),
			(this.v1e = -0),
			(this.M1e = !1),
			(this.State = 0),
			(this.S1e = Vector_1.Vector.Create()),
			(this.E1e = Vector_1.Vector.Create()),
			(this.y1e = Vector_1.Vector.Create()),
			(this.I1e = Vector_1.Vector.Create()),
			(this.T1e = !1),
			(this.ile = !1),
			(this.sle = 0),
			(this.ale = 0),
			(this.ole = 0),
			(this.rle = 0),
			(this.L1e = 0);
	}
	Name() {
		return "DialogueController";
	}
	OnInit() {
		this.SetConfigMap(1, "FadeInExp"),
			this.SetConfigMap(2, "FadeInDuration"),
			this.SetConfigMap(3, "FadeOutInterpSpeed"),
			this.SetConfigMap(5, "CheckPitchMin"),
			this.SetConfigMap(4, "CheckYaw"),
			this.SetConfigMap(6, "CheckPitchMax"),
			this.SetConfigMap(7, "AdjustYaw"),
			this.SetConfigMap(8, "AdjustPitchMin"),
			this.SetConfigMap(9, "AdjustPitchMax"),
			this.SetConfigMap(10, "OffsetRate"),
			this.SetConfigMap(11, "OffsetLengthMax"),
			this.SetConfigMap(12, "DefaultArmLength"),
			(this.State = 0);
	}
	UpdateInternal(t) {
		var e = this.Camera.CharacterController;
		if (e && this.M1e)
			switch (this.State) {
				case 1:
					{
						(this.v1e += t),
							this.v1e > this.FadeInDuration &&
								(this.v1e = this.FadeInDuration);
						var i = this.v1e / this.FadeInDuration,
							a =
								((i = isNaN(i) ? 1 : i),
								Vector_1.Vector.VectorBlendEaseIn(
									this.S1e,
									this.E1e,
									i,
									this.FadeInExp,
									this.I1e,
								),
								this.Camera.SetArmLocation(this.I1e),
								e.GetControlRotation()),
							s =
								(a.Yaw,
								MathUtils_1.MathUtils.BlendEaseIn(
									this.sle,
									this.ale,
									i,
									this.FadeInExp,
								));
						let h = a.Pitch;
						this.ile &&
							(h = MathUtils_1.MathUtils.BlendEaseIn(
								this.ole,
								this.rle,
								i,
								this.FadeInExp,
							)),
							(this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(
								h,
								s,
								0,
							)),
							(this.Camera.IsModifiedArmRotation = !0),
							(a = MathUtils_1.MathUtils.BlendEaseIn(
								this.L1e,
								this.DefaultArmLength,
								i,
								this.FadeInExp,
							)),
							(this.Camera.DesiredCamera.ArmLength = a),
							(this.Camera.IsModifiedArmLength = !0),
							this.v1e === this.FadeInDuration &&
								((this.State = 2), this.Camera.SetArmLocation(this.E1e));
					}
					break;
				case 2:
					this.Camera.SetArmLocation(this.E1e);
					break;
				case 3:
					this.y1e.IsNearlyZero()
						? (this.y1e.Reset(), (this.M1e = !1), (this.State = 0))
						: (MathUtils_1.MathUtils.VectorInterpTo(
								this.y1e,
								Vector_1.Vector.ZeroVectorProxy,
								t,
								this.FadeOutInterpSpeed,
								this.y1e,
							),
							this.Camera.PlayerLocation.Addition(this.y1e, this.I1e),
							this.Camera.SetArmLocation(this.I1e));
			}
		else this.State = 0;
	}
	EnterSequenceDialogue(t, e = !1) {
		1 !== this.State &&
			2 !== this.State &&
			((this.M1e = !0),
			(this.T1e = !1),
			(this.v1e = 0),
			e || !t
				? this.E1e.DeepCopy(this.Camera.CurrentCamera.ArmLocation)
				: ((this.State = 1),
					this.S1e.DeepCopy(this.Camera.CurrentCamera.ArmLocation),
					(this.L1e = this.Camera.CurrentCamera.ArmLength),
					(e = t ?? this.S1e),
					this.D1e(e),
					this.R1e(e)));
	}
	ExitSequenceDialogue() {
		this.Camera.CurrentCamera.ArmLocation.Subtraction(
			this.Camera.PlayerLocation,
			this.y1e,
		),
			(this.State = 3),
			this.T1e &&
				this.Camera.CameraConfigController.DisableHookConfigByType(
					IAction_1.EAdjustPlayerCamera.Dialog,
				);
	}
	D1e(t) {
		var e = Vector_1.Vector.Create(t),
			i = Vector_1.Vector.Create(this.Camera.PlayerLocation);
		e.SubtractionEqual(i), (e = e.Size());
		let a = this.OffsetRate;
		e * this.OffsetRate > this.OffsetLengthMax &&
			(a = this.OffsetLengthMax / e),
			Vector_1.Vector.Lerp(i, t, a, this.E1e);
	}
	R1e(t, e = !0, i = !0) {
		var a,
			s = this.Camera.CameraActor.K2_GetActorRotation(),
			h = Vector_1.Vector.Create(s.Vector());
		e &&
			(s.Pitch < this.CheckPitchMin
				? ((this.ile = !0),
					(this.ole = s.Pitch),
					(this.rle = this.AdjustPitchMin))
				: s.Pitch > this.CheckPitchMax
					? ((this.ile = !0),
						(this.ole = s.Pitch),
						(this.rle = this.AdjustPitchMax))
					: (this.ile = !1)),
			i &&
				((e = this.Camera.PlayerLocation),
				(t = (i = Vector_1.Vector.Create(
					t.X - e.X,
					t.Y - e.Y,
					t.Z - e.Z,
				)).CosineAngle2D(h)),
				(e = Math.cos(this.CheckYaw)) <= Math.abs(t)
					? ((a = i.SineAngle2D(h)),
						(this.sle = s.Yaw),
						(s = Rotator_1.Rotator.Create()),
						i.Rotation(s),
						(this.ale = s.Yaw),
						0 < a
							? (this.ale += e < t ? this.AdjustYaw : 180 - this.AdjustYaw)
							: (this.ale -= e < t ? this.AdjustYaw : 180 - this.AdjustYaw))
					: ((s = i.SineAngle2D(h)),
						(this.sle = this.Camera.CameraActor.K2_GetActorRotation().Yaw),
						(a = Rotator_1.Rotator.Create()),
						i.Rotation(a),
						(this.ale = a.Yaw),
						0 < s ? (this.ale += 90) : (this.ale -= 90)),
				180 < this.sle - this.ale
					? (this.ale += 360)
					: 180 < this.ale - this.sle && (this.ale -= 360));
	}
	AdjustDialogueParams(t, e, i, a) {
		(this.T1e = !0),
			(this.v1e = 0),
			(this.State = 1),
			t &&
				(this.S1e.DeepCopy(this.Camera.CurrentCamera.ArmLocation),
				this.E1e.Set(t.X ?? 0, t.Y ?? 0, t.Z ?? 0)),
			(t = this.Camera.CameraActor.K2_GetActorRotation()),
			void 0 !== e &&
				((this.ile = !0),
				(this.ole = t.Pitch),
				(this.rle = this.AdjustPitchMin)),
			void 0 !== i &&
				((this.sle = t.Yaw),
				(this.ale = i),
				180 < this.sle - this.ale
					? (this.ale += 360)
					: 180 < this.ale - this.sle && (this.ale -= 360)),
			void 0 !== a && (this.DefaultArmLength = a);
	}
}
exports.CameraDialogueController = CameraDialogueController;
