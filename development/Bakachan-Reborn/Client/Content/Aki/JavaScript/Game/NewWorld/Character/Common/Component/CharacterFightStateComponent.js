"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, r, i) {
		var a,
			o = arguments.length,
			n =
				o < 3
					? e
					: null === i
						? (i = Object.getOwnPropertyDescriptor(e, r))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			n = Reflect.decorate(t, e, r, i);
		else
			for (var h = t.length - 1; 0 <= h; h--)
				(a = t[h]) && (n = (o < 3 ? a(n) : 3 < o ? a(e, r, n) : a(e, r)) || n);
		return 3 < o && n && Object.defineProperty(e, r, n), n;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterFightStateComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
	CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let CharacterFightStateComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.zKe = 0),
			(this.aYo = void 0),
			(this.CurrentState = 0),
			(this.SubStatePriority = 0),
			(this.IsLocal = !1),
			(this.WaitConfirm = !1),
			(this.CurrentHandle = 0);
	}
	OnStart() {
		return (this.aYo = this.Entity.GetComponent(158)), !0;
	}
	PreSwitchRemoteFightState(t) {
		var e = t >> 8,
			r = ((t = 255 & t), this.G5r(e, t, !1));
		return (
			r ||
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"FightState",
					this.Entity,
					`预算切换状态失败，目标[[${e}][${t}]，当前[${this.CurrentState}][${this.SubStatePriority}]`,
				),
			r
		);
	}
	TrySwitchHitState(t, e = !1) {
		if (7 === t) return this.TrySwitchState(4, 0, e);
		if (
			e &&
			this.aYo.MoveState ===
				CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp &&
			this.aYo.PositionState ===
				CharacterUnifiedStateTypes_1.ECharPositionState.Air
		)
			return this.TrySwitchState(2, 2, e);
		switch (t) {
			case 4:
				return this.TrySwitchState(2, 2, e);
			case 5:
				return this.TrySwitchState(2, 1, e);
		}
		return this.TrySwitchState(2, 0, e);
	}
	TrySwitchSkillState(t, e = !1) {
		let r = t.InterruptLevel;
		return (
			255 < r && (r = 255),
			1 === t.OverrideType
				? this.TrySwitchState(3, r, e)
				: 2 === t.OverrideType
					? this.TrySwitchState(5, r, e)
					: 3 === t.OverrideType
						? this.TrySwitchState(7, r, e)
						: this.TrySwitchState(1, r, e)
		);
	}
	G5r(t, e, r = !1) {
		return r
			? this.N5r(this.CurrentState, this.SubStatePriority, t, e)
			: !this.WaitConfirm ||
					!this.N5r(t, e, this.CurrentState, this.SubStatePriority);
	}
	N5r(t, e, r, i) {
		if (r !== t) return t < r;
		if (i === e)
			switch (r) {
				case 1:
				case 2:
				case 7:
					return !0;
			}
		return e < i;
	}
	TrySwitchState(t, e, r = !1) {
		return this.G5r(t, e, r)
			? (this.O5r(t, e, r),
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"FightState",
					this.Entity,
					`切换主状态成功[handle:${this.CurrentHandle}][${t}][${e}][local:${r}]`,
				),
				this.CurrentHandle)
			: (CombatDebugController_1.CombatDebugController.CombatInfo(
					"FightState",
					this.Entity,
					`切换主状态失败，目标[[${t}][${e}][local:${r}]，当前[${this.CurrentState}][${this.SubStatePriority}][local:${this.IsLocal}]`,
				),
				0);
	}
	O5r(t, e, r = !1) {
		return (
			(this.CurrentState = t),
			(this.SubStatePriority = e),
			(this.IsLocal = r),
			(this.WaitConfirm = r),
			(this.CurrentHandle = ++this.zKe),
			this.CurrentHandle
		);
	}
	ConfirmState(t) {
		this.CurrentHandle === t
			? ((this.WaitConfirm = !1),
				CombatDebugController_1.CombatDebugController.CombatDebug(
					"FightState",
					this.Entity,
					`确认状态[handle:${t}]`,
				))
			: CombatDebugController_1.CombatDebugController.CombatInfo(
					"FightState",
					this.Entity,
					`确认状态失败[handle:${t}]，当前[handle:${this.CurrentHandle}]`,
				);
	}
	ResetState() {
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"FightState",
			this.Entity,
			`重置主状态[handle:${this.CurrentHandle}]`,
		),
			(this.CurrentState = 0),
			(this.SubStatePriority = 0),
			(this.IsLocal = !1),
			(this.WaitConfirm = !1),
			(this.CurrentHandle = 0);
	}
	ExitState(t) {
		this.CurrentHandle === t
			? (CombatDebugController_1.CombatDebugController.CombatInfo(
					"FightState",
					this.Entity,
					`退出主状态[handle:${t}][${this.CurrentState}]`,
				),
				(this.CurrentState = 0),
				(this.SubStatePriority = 0),
				(this.IsLocal = !1),
				(this.WaitConfirm = !1),
				(this.CurrentHandle = 0))
			: CombatDebugController_1.CombatDebugController.CombatInfo(
					"FightState",
					this.Entity,
					`退出主状态失败[handle:${t}][${this.CurrentState}]，当前[handle:${this.CurrentHandle}]`,
				);
	}
	GetFightState() {
		return this.CurrentHandle
			? (this.CurrentState << 8) | this.SubStatePriority
			: 0;
	}
};
(CharacterFightStateComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(46)],
	CharacterFightStateComponent,
)),
	(exports.CharacterFightStateComponent = CharacterFightStateComponent);
