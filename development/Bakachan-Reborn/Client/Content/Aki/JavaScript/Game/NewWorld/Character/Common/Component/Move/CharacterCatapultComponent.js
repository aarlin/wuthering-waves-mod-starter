"use strict";
var CharacterCatapultComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, o, n) {
			var r,
				i = arguments.length,
				a =
					i < 3
						? e
						: null === n
							? (n = Object.getOwnPropertyDescriptor(e, o))
							: n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(t, e, o, n);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(r = t[s]) &&
						(a = (i < 3 ? r(a) : 3 < i ? r(e, o, a) : r(e, o)) || a);
			return 3 < i && a && Object.defineProperty(e, o, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterCatapultComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	BigJumpUnit_1 = require("./BigJumpUnit"),
	CustomMovementDefine_1 = require("./CustomMovementDefine"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	MODEL_BUFFER_TIME_LENGTH = 200,
	SUPER_CATAPULT_SKILL_ID = 400107;
let CharacterCatapultComponent = (CharacterCatapultComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.Gce = void 0),
			(this.J$r = -0),
			(this.z$r = void 0),
			(this.LockRotator = !1),
			(this.Z$r = !1),
			(this.eYr = (t) => {
				t < MathUtils_1.MathUtils.SmallNumber ||
					(this.z$r.GetOffset(this.J$r, t, CharacterCatapultComponent_1.Lz),
					(this.J$r += t),
					this.Gce.MoveCharacter(CharacterCatapultComponent_1.Lz, t),
					this.LockRotator && this.Hte?.SetInputRotator(this.z$r.Rotator),
					this.J$r > this.z$r.TimeLength &&
						(this.Gce.CharacterMovement.SetMovementMode(3),
						this.z$r.GetSpeed(this.J$r, CharacterCatapultComponent_1.Lz),
						this.Gce.SetForceSpeed(CharacterCatapultComponent_1.Lz)));
			});
	}
	static get Dependencies() {
		return [3, 161];
	}
	OnInitData() {
		return (this.z$r = new BigJumpUnit_1.BigJumpUnit()), !0;
	}
	OnStart() {
		return (
			(this.Hte = this.Entity.GetComponent(3)),
			(this.Gce = this.Entity.GetComponent(161)),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CustomMoveCatapult,
				this.eYr,
			),
			!0
		);
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CustomMoveCatapult,
				this.eYr,
			),
			!0
		);
	}
	SetConfig(
		t,
		e,
		o,
		n,
		r = "",
		i = BigJumpUnit_1.DEFAULT_GRAVITY,
		a = void 0,
		s = !1,
	) {
		(this.Z$r = s),
			(this.LockRotator = 0 < i),
			this.z$r.SetAll(t, e, o, n, r, i, a);
	}
	StartCatapult() {
		this.z$r.SetStartPoint(this.Hte.ActorLocationProxy),
			this.z$r.Init(),
			(this.J$r = 0),
			this.Gce.CharacterMovement.SetMovementMode(
				6,
				CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE,
			);
		var t,
			e,
			o = this.Entity.GetComponent(160);
		o &&
			o.SetLocationAndRotatorWithModelBuffer(
				this.Hte.ActorLocationProxy.ToUeVector(),
				this.z$r.Rotator.ToUeRotator(),
				200,
				"Catapult Start",
			),
			this.Z$r &&
				((t = this.Entity.GetComponent(33).GetSkillMontageInstance(
					Number(400107),
					0,
				)),
				o?.MainAnimInstance) &&
				t?.IsValid() &&
				((e = o.MainAnimInstance.Montage_GetPosition(t)),
				(e = (t.SequenceLength - e) / this.z$r.RisingTime),
				o.MainAnimInstance.Montage_SetPlayRate(t, e)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Movement",
					6,
					"StartCatapult",
					["Actor", this.Hte.Actor.GetName()],
					["CatapultUnit", this.z$r],
					["IsSuperCatapult", this.Z$r],
				);
	}
});
(CharacterCatapultComponent.Lz = Vector_1.Vector.Create()),
	(CharacterCatapultComponent = CharacterCatapultComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(30)],
			CharacterCatapultComponent,
		)),
	(exports.CharacterCatapultComponent = CharacterCatapultComponent);
