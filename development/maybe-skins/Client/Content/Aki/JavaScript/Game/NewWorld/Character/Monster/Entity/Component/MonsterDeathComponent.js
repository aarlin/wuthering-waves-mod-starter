"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, i) {
		var a,
			o = arguments.length,
			s =
				o < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, n))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, n, i);
		else
			for (var r = e.length - 1; 0 <= r; r--)
				(a = e[r]) && (s = (o < 3 ? a(s) : 3 < o ? a(t, n, s) : a(t, n)) || s);
		return 3 < o && s && Object.defineProperty(t, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterDeathComponent = void 0);
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	BaseDeathComponent_1 = require("../../../Common/Component/Abilities/BaseDeathComponent"),
	CharacterUnifiedStateTypes_1 = require("../../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
	DIE_IN_AIE_REMOVE_DELAY = 5e3;
let MonsterDeathComponent = class extends BaseDeathComponent_1.BaseDeathComponent {
	constructor() {
		super(...arguments),
			(this.Xte = void 0),
			(this.L7r = void 0),
			(this.DelayDestroyCallback = (e, t) => {
				t || this.PlayDeathAnimation();
			}),
			(this.DeathTagTask = void 0),
			(this.DeathTimerTask = void 0),
			(this.OnDeathEnded = () => {
				this.ClearDeathTasks(),
					this.Xte?.Valid &&
						(this.Xte.AddTag(1963731483), this.Xte.AddTag(-208062360)),
					this.Entity.Disable("[DeathComponent.SetActive] 死亡隐藏"),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.DropItemStarted,
						this.Entity?.Id,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.DelayRemoveEntityFinished,
						this.Entity,
					);
			});
	}
	OnInitData() {
		return (this.Xte = this.Entity.CheckGetComponent(185)), !0;
	}
	OnStart() {
		return (
			this.Entity.CheckGetComponent(0)?.GetLivingStatus() ===
				Protocol_1.Aki.Protocol.Rvs.Proto_Dead && this.ExecuteDeath(),
			!0
		);
	}
	OnClear() {
		return this.ClearDeathTasks(), !0;
	}
	ExecuteDeath() {
		return (
			!!super.ExecuteDeath() &&
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnCharDeathLogicBegin,
				this.Entity.Id,
			),
			this.Entity.GetComponent(157)?.RemoveBuffByEffectType(
				36,
				"实体死亡移除冰冻buff",
			),
			this.Xte.AddTag(1008164187),
			this.Xte?.HasTag(-1615707547)
				? (this.L7r = this.Xte.ListenForTagAddOrRemove(
						-1615707547,
						this.DelayDestroyCallback,
					))
				: (this.Entity.GetComponent(33)?.StopAllSkills(
						"MonsterDeathComponent.ExecuteDeath",
					),
					this.Entity.GetComponent(89)?.ResetCharState(),
					this.Entity.GetComponent(157)?.RemoveAllDurationBuffs(
						"实体死亡清理持续型buff",
					),
					this.PlayDeathAnimation()),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CharOnRoleDead,
				this.Entity.Id,
			),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
			),
			!0)
		);
	}
	PlayDeathAnimation() {
		const e = this.Entity.CheckGetComponent(22);
		if (
			!ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim &&
			!this.Xte?.HasTag(-1943786195) &&
			e?.Valid &&
			this.Entity.IsInit &&
			this.Entity.Active
		) {
			var t = this.Entity.GetComponent(89)?.PositionState;
			if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Water)
				e.PlayMontageWithCallBack(1, this.OnDeathEnded);
			else {
				if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
					if (this.Xte?.HasTag(31862857))
						return (
							(this.DeathTagTask = this.Xte.ListenForTagAddOrRemove(
								31862857,
								(t, n) => {
									n ||
										(e.HasMontage(3)
											? e.PlayMontageWithCallBack(3, this.OnDeathEnded)
											: this.OnDeathEnded());
								},
							)),
							void (this.DeathTimerTask = TimerSystem_1.TimerSystem.Delay(
								this.OnDeathEnded,
								5e3,
							))
						);
					if (e.HasMontage(2))
						return void e.PlayMontageWithCallBack(2, this.OnDeathEnded);
				} else if (
					t === CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
					e.HasMontage(0)
				)
					return void e.PlayMontageWithCallBack(0, this.OnDeathEnded);
				this.OnDeathEnded();
			}
		} else this.OnDeathEnded();
	}
	ClearDeathTasks() {
		this.L7r?.EndTask(),
			(this.L7r = void 0),
			this.DeathTagTask?.EndTask(),
			(this.DeathTagTask = void 0),
			this.DeathTimerTask?.Remove(),
			(this.DeathTimerTask = void 0);
	}
};
(MonsterDeathComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(165)],
	MonsterDeathComponent,
)),
	(exports.MonsterDeathComponent = MonsterDeathComponent);
