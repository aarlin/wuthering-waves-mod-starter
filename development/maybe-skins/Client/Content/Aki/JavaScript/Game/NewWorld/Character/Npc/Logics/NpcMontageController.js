"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcMontageController = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
class NpcMontageController {
	constructor(e) {
		(this.Jh = void 0),
			(this.oRe = void 0),
			(this.Jh = e),
			(this.oRe = this.Jh.GetComponent(35));
	}
	LoadAsync(e, n) {
		return ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AnimMontage, n);
	}
	Play(e, n) {
		this.oRe.MainAnimInstance.Montage_Play(e),
			n && this.oRe.MainAnimInstance.OnMontageEnded.Add(n);
	}
	PlayOnce(e, n) {
		this.oRe.MainAnimInstance.Montage_Play(e),
			this.oRe.MainAnimInstance.Montage_SetNextSection(
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
				e,
			),
			n && this.oRe.MainAnimInstance.OnMontageEnded.Add(n);
	}
	PlayFromLoop(e, n) {
		this.oRe.MainAnimInstance.Montage_Play(e),
			this.oRe.MainAnimInstance.Montage_JumpToSection(
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				e,
			),
			n && this.oRe.MainAnimInstance.OnMontageEnded.Add(n);
	}
	PlayFromEnd(e, n) {
		this.oRe.MainAnimInstance.Montage_Play(e),
			this.oRe.MainAnimInstance.Montage_JumpToSection(
				CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
				e,
			),
			n && this.oRe.MainAnimInstance.OnMontageEnded.Add(n);
	}
	Stop(e = !1, n) {
		e
			? this.oRe.MainAnimInstance.Montage_JumpToSection(
					CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
					n,
				)
			: this.oRe.MainAnimInstance.Montage_SetNextSection(
					CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
					CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
					n,
				);
	}
	ForceStop(e, n) {
		this.oRe.MainAnimInstance.Montage_Stop(e ?? 0, n);
	}
	ForceStopWithBlendOut(e, n) {
		var a, t;
		n
			? ((a = this.oRe.MainAnimInstance.Montage_GetPosition(n)),
				(t = 1e3 * e) < (a = n.SequenceLength - a) &&
					this.oRe.MainAnimInstance.Montage_SetPlayRate(n, a / t),
				this.oRe.MainAnimInstance.Montage_SetNextSection(
					CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
					CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
					n,
				))
			: this.oRe.MainAnimInstance.Montage_Stop(e ?? 0);
	}
	AddOnMontageEnded(e) {
		e && this.oRe.MainAnimInstance?.OnMontageEnded.Add(e);
	}
	RemoveOnMontageEnded(e) {
		e && this.oRe.MainAnimInstance?.OnMontageEnded.Remove(e);
	}
}
exports.NpcMontageController = NpcMontageController;
