"use strict";
var RoleFrozenComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, o, n, t) {
			var i,
				r = arguments.length,
				d =
					r < 3
						? o
						: null === t
							? (t = Object.getOwnPropertyDescriptor(o, n))
							: t;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				d = Reflect.decorate(e, o, n, t);
			else
				for (var a = e.length - 1; 0 <= a; a--)
					(i = e[a]) &&
						(d = (r < 3 ? i(d) : 3 < r ? i(o, n, d) : i(o, n)) || d);
			return 3 < r && d && Object.defineProperty(o, n, d), d;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFrozenComponent = void 0);
const GameplayCueById_1 = require("../../../../../Core/Define/ConfigQuery/GameplayCueById"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	BaseFrozenComponent_1 = require("../../Common/Component/Abilities/BaseFrozenComponent"),
	CustomMovementDefine_1 = require("../../Common/Component/Move/CustomMovementDefine"),
	frozenCueId = 1003n,
	cancelFrozenCueId = 100302n;
let RoleFrozenComponent = (RoleFrozenComponent_1 = class extends (
	BaseFrozenComponent_1.BaseFrozenComponent
) {
	constructor() {
		super(...arguments),
			(this.MoveForbidHandle = void 0),
			(this.AnimForbidHandle = void 0),
			(this.AbilityForbidHandle = void 0),
			(this.SkillForbidHandle = void 0),
			(this.FrozenCueHandle = void 0),
			(this.IsFrozenInternal = !1);
	}
	IsFrozen() {
		return this.IsFrozenInternal;
	}
	SetFrozen(e) {
		var o, n, t, i, r, d;
		this.IsFrozenInternal !== e &&
			((this.IsFrozenInternal = e),
			(o = this.Entity.GetComponent(161)),
			(n = this.Entity.GetComponent(99)),
			(t = this.Entity.GetComponent(17)),
			(i = this.Entity.GetComponent(33)),
			(r = this.Entity.GetComponent(19)),
			(d = this.Entity.GetComponent(185)?.TagContainer),
			(this.Entity.GetComponent(98).Frozen = e)
				? ((this.MoveForbidHandle =
						this.MoveForbidHandle ?? o?.Disable("RoleFrozen")),
					(this.AnimForbidHandle =
						this.AnimForbidHandle ?? n?.Disable("RoleFrozen")),
					(this.AbilityForbidHandle =
						this.AbilityForbidHandle ?? t?.Disable("RoleFrozen")),
					(this.SkillForbidHandle =
						this.SkillForbidHandle ?? i?.Disable("RoleFrozen")),
					(this.FrozenCueHandle =
						this.FrozenCueHandle ??
						r?.CreateGameplayCue(
							GameplayCueById_1.configGameplayCueById.GetConfig(frozenCueId),
						)),
					d &&
						(d.AddExactTag(6, -752177221),
						d.AddExactTag(6, 1098729489),
						d.AddExactTag(6, -8769906),
						d.AddExactTag(6, -1927813876),
						d.AddExactTag(6, 477750727),
						d.AddExactTag(6, 1448371427),
						d.AddExactTag(6, 930178923),
						d.AddExactTag(6, -291592299)),
					this.ChangeMovementModeInFrozen(o),
					this.ActorComponent &&
						(RoleFrozenComponent_1.TmpVector.DeepCopy(
							this.ActorComponent.ActorVelocityProxy,
						),
						0 < RoleFrozenComponent_1.TmpVector.Z) &&
						((RoleFrozenComponent_1.TmpVector.Z = 0),
						o.SetForceSpeed(RoleFrozenComponent_1.TmpVector)))
				: (void 0 !== this.MoveForbidHandle &&
						(o?.Enable(
							this.MoveForbidHandle,
							"[RoleFrozenComponent.SetFrozen] this.MoveForbidHandle !== undefined",
						),
						(this.MoveForbidHandle = void 0)),
					void 0 !== this.AnimForbidHandle &&
						(n?.Enable(
							this.AnimForbidHandle,
							"[RoleFrozenComponent.SetFrozen] this.AnimForbidHandle !== undefined",
						),
						(this.AnimForbidHandle = void 0)),
					void 0 !== this.AbilityForbidHandle &&
						(t?.Enable(
							this.AbilityForbidHandle,
							"[RoleFrozenComponent.SetFrozen] this.AbilityForbidHandle !== undefined",
						),
						(this.AbilityForbidHandle = void 0)),
					void 0 !== this.SkillForbidHandle &&
						(i?.Enable(
							this.SkillForbidHandle,
							"[RoleFrozenComponent.SetFrozen] this.SkillForbidHandle !== undefined",
						),
						(this.SkillForbidHandle = void 0)),
					this.FrozenCueHandle?.Destroy(),
					(this.FrozenCueHandle = r?.CreateGameplayCue(
						GameplayCueById_1.configGameplayCueById.GetConfig(
							cancelFrozenCueId,
						),
						{
							EndCallback: () => {
								this.FrozenCueHandle?.Destroy(),
									(this.FrozenCueHandle = void 0);
							},
						},
					)),
					d &&
						(d.RemoveTag(6, -752177221),
						d.RemoveTag(6, 1098729489),
						d.RemoveTag(6, -8769906),
						d.RemoveTag(6, -1927813876),
						d.RemoveTag(6, 477750727),
						d.RemoveTag(6, 1448371427),
						d.RemoveTag(6, 930178923),
						d.RemoveTag(6, -291592299)),
					(e = this.Entity.GetComponent(160)) &&
						e.MainAnimInstance.冰冻结束事件()));
	}
	ChangeMovementModeInFrozen(e) {
		var o, n;
		e.CharacterMovement &&
			((o = e.CharacterMovement.MovementMode),
			(n = e.CharacterMovement.CustomMovementMode),
			1 === o ||
				3 === o ||
				(6 === o && n === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM) ||
				e.CharacterMovement.SetMovementMode(3));
	}
});
(RoleFrozenComponent.TmpVector = Vector_1.Vector.Create()),
	(RoleFrozenComponent = RoleFrozenComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(173)],
			RoleFrozenComponent,
		)),
	(exports.RoleFrozenComponent = RoleFrozenComponent);
