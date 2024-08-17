"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleTriggerController = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	Global_1 = require("../../../Global"),
	CharacterNameDefines_1 = require("../Common/CharacterNameDefines"),
	TRIGGER_HALF_HEIGHT_DEVIATION = 0;
class RoleTriggerController extends ControllerBase_1.ControllerBase {
	static GetMyRoleTrigger() {
		return this.Rtr;
	}
	static DebugTestWorldDone() {
		this.nye();
	}
	static OnInit() {
		return (
			(this.Utr = !1),
			(this.Atr = !1),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ClearWorld,
				this.uMe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			!0
		);
	}
	static OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ClearWorld,
				this.uMe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			this.Ptr(),
			!0
		);
	}
	static Ptr() {
		(this.Utr = !1),
			(this.Atr = !1),
			this.Rtr?.IsValid() &&
				(ActorSystem_1.ActorSystem.Put(this.Rtr), (this.Rtr = void 0)),
			(this.xtr = void 0);
	}
	static OnTick(e) {
		this.Utr &&
			this.Rtr?.IsValid() &&
			Global_1.Global.BaseCharacter &&
			this.Rtr.K2_SetActorTransform(
				Global_1.Global.BaseCharacter.GetTransform(),
				!1,
				void 0,
				!0,
			);
	}
	static OnChangeMode() {
		return (
			this.Utr &&
				this.Rtr?.IsValid() &&
				Global_1.Global.BaseCharacter &&
				((RoleTriggerController.Atr = !0),
				RoleTriggerController.xtr.SetCollisionEnabled(0)),
			!0
		);
	}
}
((exports.RoleTriggerController = RoleTriggerController).Utr = !1),
	(RoleTriggerController.Atr = !1),
	(RoleTriggerController.Rtr = void 0),
	(RoleTriggerController.xtr = void 0),
	(RoleTriggerController.uMe = () => {
		RoleTriggerController.Ptr();
	}),
	(RoleTriggerController.nye = () => {
		if (!RoleTriggerController.Utr) {
			RoleTriggerController.Utr = !0;
			let e,
				r = 77,
				t = 25;
			Global_1.Global.BaseCharacter
				? ((e = Global_1.Global.BaseCharacter.GetTransform()),
					(r =
						Global_1.Global.BaseCharacter.CapsuleComponent.CapsuleHalfHeight +
						0),
					(t = Global_1.Global.BaseCharacter.CapsuleComponent.CapsuleRadius))
				: (e = new UE.Transform()),
				(RoleTriggerController.Rtr = ActorSystem_1.ActorSystem.Get(
					UE.Actor.StaticClass(),
					e,
				)),
				(RoleTriggerController.xtr =
					RoleTriggerController.Rtr.AddComponentByClass(
						UE.CapsuleComponent.StaticClass(),
						!1,
						MathUtils_1.MathUtils.DefaultTransform,
						!1,
					)),
				RoleTriggerController.Rtr.SetActorHiddenInGame(!0),
				RoleTriggerController.xtr.SetCapsuleHalfHeight(r, !1),
				RoleTriggerController.xtr.SetCapsuleRadius(t, !1),
				RoleTriggerController.xtr.SetCollisionProfileName(
					CharacterNameDefines_1.CharacterNameDefines.ROLE_TRIGGER_NAME,
					!1,
				);
		}
	}),
	(RoleTriggerController.xie = (e, r) => {
		RoleTriggerController.Utr &&
			e?.Valid &&
			(e = e.Entity.GetComponent(3)?.Actor)?.IsValid() &&
			(RoleTriggerController.xtr?.SetCapsuleHalfHeight(
				e.CapsuleComponent.CapsuleHalfHeight + 0,
				!1,
			),
			RoleTriggerController.xtr?.SetCapsuleRadius(
				e.CapsuleComponent.CapsuleRadius,
				!1,
			),
			RoleTriggerController.Atr) &&
			((RoleTriggerController.Atr = !1),
			RoleTriggerController.xtr?.SetCollisionEnabled(1));
	});
