"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalMoveToController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	AiContollerLibrary_1 = require("../../../../AI/Controller/AiContollerLibrary"),
	CharacterNameDefines_1 = require("../../Common/CharacterNameDefines"),
	CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
	DISTANCE_ERROR_THRESHOLD = 100,
	MAX_TURN_SPEED = 360;
class AnimalMoveToController {
	constructor(t) {
		(this.tu = CharacterUnifiedStateTypes_1.ECharMoveState.Other),
			(this.iWo = !1),
			(this.oWo = !1),
			(this.rWo = void 0),
			(this.nWo = 0),
			(this.sWo = 0),
			(this.IC = !1),
			(this.aWo = !1),
			(this.jye = Vector_1.Vector.Create()),
			(this.hWo = 0),
			(this.Hte = t.GetComponent(3)),
			UE.KuroStaticLibrary.IsObjectClassByName(
				this.Hte.Owner,
				CharacterNameDefines_1.CharacterNameDefines.BP_BASEANIMAL,
			)
				? (this.lWo = this.Hte.Owner.TurnSpeedCurve)
				: (this.lWo = void 0),
			(this.mBe = t.GetComponent(89)),
			(this.Gce = t.GetComponent(161)),
			(this._Wo = this.Gce.CharacterMovement.MaxAcceleration);
	}
	Init(t, e) {
		(this.tu = t), this.mBe.SetMoveState(t), (this.iWo = e), (this.IC = !0);
	}
	Start(t, e, o, i = 100) {
		this.IC &&
			((this.oWo = e),
			(this.sWo = o),
			(this.hWo = i),
			(this.aWo = !1),
			this.tu !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim ||
				this.iWo ||
				(this.Gce.CharacterMovement.MaxAcceleration = this._Wo),
			this.rWo ? (this.rWo.length = 0) : (this.rWo = new Array()),
			this.oWo
				? AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
						this.Hte.Owner.GetWorld(),
						this.Hte.ActorLocation,
						t.ToUeVector(),
						this.rWo,
					)
					? (this.nWo = 1)
					: ((e = Vector_1.Vector.Create()).DeepCopy(t),
						this.rWo.push(e),
						(this.nWo = 0))
				: ((o = Vector_1.Vector.Create()).DeepCopy(t),
					this.rWo.push(o),
					(this.nWo = 0)));
	}
	Update(t) {
		var e;
		return this.aWo
			? 2
			: (e = this.rWo[this.nWo]).ContainsNaN()
				? (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Animal",
							30,
							"AnimalMoveToController Update Next Has NaN",
							["Next", e],
						),
					2)
				: (e.Subtraction(this.Hte.ActorLocationProxy, this.jye),
					(this.jye.Z = 0),
					this.jye.Size() < this.hWo
						? this.nWo === this.rWo.length - 1
							? 1
							: (this.nWo++, 0)
						: (this.jye.Normalize(),
							e.ContainsNaN()
								? (Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug(
											"Animal",
											30,
											"AnimalMoveToController Update Input Direct Has NaN",
											["Input Direct", this.jye],
										),
									2)
								: (this.uWo(this.jye), 0)));
	}
	Stop() {
		this.aWo = !0;
	}
	Finish() {
		this.tu !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim ||
			this.iWo ||
			(this.Hte?.ClearInput(),
			(this.Gce.CharacterMovement.MaxAcceleration =
				MathUtils_1.MathUtils.MaxFloat)),
			(this.IC = !1);
	}
	uWo(t) {
		this.Hte.SetInputDirect(t);
		let e = this.sWo;
		var o;
		this.lWo &&
			((o =
				MathUtils_1.MathUtils.GetAngleByVectorDot(
					this.Hte.ActorForwardProxy,
					t,
				) * MathUtils_1.MathUtils.DegToRad),
			(o = this.lWo.GetFloatValue(o)),
			(e = MathUtils_1.MathUtils.Lerp(this.sWo, 360, o))),
			AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(this.Hte, t, e, !1);
	}
}
exports.AnimalMoveToController = AnimalMoveToController;
