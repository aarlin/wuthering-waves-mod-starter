"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, i) {
		var o,
			s = arguments.length,
			r =
				s < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, n))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			r = Reflect.decorate(e, t, n, i);
		else
			for (var m = e.length - 1; 0 <= m; m--)
				(o = e[m]) && (r = (s < 3 ? o(r) : 3 < s ? o(t, n, r) : o(t, n)) || r);
		return 3 < s && r && Object.defineProperty(t, n, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemPropertyComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem");
let SceneItemPropertyComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Xte = void 0),
			(this.J1n = void 0),
			(this.z1n = 0),
			(this.Z1n = !1),
			(this.Ioo = !1),
			(this.e_n = (e, t) => {
				e.includes(-662723379)
					? TimerSystem_1.TimerSystem.Next(() => {
							this.Xte?.AddTag(this.z1n),
								(this.Z1n = !0),
								EventSystem_1.EventSystem.EmitWithTarget(
									this.Entity,
									EventDefine_1.EEventName.OnSceneItemLockPropChange,
									!0,
								);
						})
					: t.includes(-662723379) &&
						TimerSystem_1.TimerSystem.Next(() => {
							this.Xte?.RemoveTag(this.z1n),
								(this.Z1n = !1),
								EventSystem_1.EventSystem.EmitWithTarget(
									this.Entity,
									EventDefine_1.EEventName.OnSceneItemLockPropChange,
									!1,
								);
						});
			});
	}
	get IsMoving() {
		return this.Ioo;
	}
	set IsMoving(e) {
		this.Ioo !== e &&
			((this.Ioo = e)
				? (this.Xte?.AddTag(197059111), this.Xte?.RemoveTag(-1443491052))
				: (this.Xte?.AddTag(-1443491052), this.Xte?.RemoveTag(197059111)));
	}
	get IsLocked() {
		return this.Z1n;
	}
	OnStart() {
		var e = this.Entity?.GetComponent(0);
		return (
			e &&
				(e = e.GetPbEntityInitData()) &&
				((e = (0, IComponent_1.getComponent)(
					e.ComponentsData,
					"EntityStateComponent",
				)),
				(this.J1n = e?.LockConfig),
				this.J1n) &&
				((this.Xte = this.Entity?.GetComponent(177)),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnLevelTagChanged,
					this.e_n,
				),
				this.t_n()),
			!0
		);
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.HasWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnLevelTagChanged,
				this.e_n,
			) &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnLevelTagChanged,
					this.e_n,
				),
			!0
		);
	}
	t_n() {
		if (this.J1n) {
			switch (this.J1n?.LockType) {
				case "Program":
					this.z1n = -2073998558;
					break;
				case "Blackstone":
					this.z1n = 1023182128;
					break;
				case "Holovision":
					this.z1n = 1479110609;
					break;
				default:
					this.z1n = -1900469744;
			}
			(this.Z1n = !1),
				this.Xte.HasTag(-662723379) &&
					((this.Z1n = !0), this.Xte.AddTag(this.z1n));
		}
	}
	RemoveLockPerformanceTagLocal() {
		this.J1n && this.z1n && this.Xte.RemoveTag(this.z1n);
	}
	SetIsBeingTargeted(e) {
		e
			? this.Xte.HasTag(712704422) || this.Xte.AddTag(712704422)
			: this.Xte.HasTag(712704422) && this.Xte.RemoveTag(712704422);
	}
};
(SceneItemPropertyComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(115)],
	SceneItemPropertyComponent,
)),
	(exports.SceneItemPropertyComponent = SceneItemPropertyComponent);
