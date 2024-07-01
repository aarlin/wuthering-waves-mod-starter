"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, n, i) {
		var o,
			r = arguments.length,
			a =
				r < 3
					? e
					: null === i
						? (i = Object.getOwnPropertyDescriptor(e, n))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(t, e, n, i);
		else
			for (var s = t.length - 1; 0 <= s; s--)
				(o = t[s]) && (a = (r < 3 ? o(a) : 3 < r ? o(e, n, a) : o(e, n)) || a);
		return 3 < r && a && Object.defineProperty(e, n, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmartObjectComponent = void 0);
const AudioController_1 = require("../../../../../Core/Audio/AudioController"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	Global_1 = require("../../../../Global"),
	CharacterUnifiedStateTypes_1 = require("../../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let SmartObjectComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.ktn = void 0),
			(this.aun = void 0),
			(this.hun = []),
			(this.lun = !1),
			(this._un = (t, e) => {
				var n;
				e = e.Entity;
				0 <=
					this.aun.ExcludeEntities?.indexOf(e.GetComponent(0).GetPbDataId()) ||
					(this.uun(e) &&
						((n = this.hun.indexOf(e)),
						t ? n < 0 && this.hun.push(e) : 0 <= n && this.hun.splice(n, 1)));
			}),
			(this.cun = () => {
				var t, e;
				this.lun &&
					void 0 !== (t = this.aun.AlertSound) &&
					((e = Global_1.Global.BaseCharacter),
					AudioController_1.AudioController.PostEvent(t, e));
			}),
			(this.mun = (t, e) => {
				e === CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop ||
				e === CharacterUnifiedStateTypes_1.ECharMoveState.RunStop ||
				e === CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop
					? (this.lun = !1)
					: (e !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk &&
							e !== CharacterUnifiedStateTypes_1.ECharMoveState.Run &&
							e !== CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) ||
						(this.lun = !0);
			});
	}
	OnStart() {
		var t;
		return (
			(this.Hte = this.Entity.GetComponent(1)),
			(this.ktn = this.Entity.GetComponent(74)),
			this.Hte &&
				(t = this.Hte.CreatureData?.GetPbEntityInitData()?.ComponentsData) &&
				((this.aun = (0, IComponent_1.getComponent)(
					t,
					"AiAlertNotifyComponent",
				)),
				this.aun) &&
				this.dun(),
			!0
		);
	}
	dun() {
		for (var [, t] of this.ktn.GetEntitiesInRangeLocal())
			(this.aun.ExcludeEntities?.length &&
				0 < this.aun.ExcludeEntities?.length &&
				0 <=
					this.aun.ExcludeEntities?.indexOf(
						t.Entity.GetComponent(0).GetPbDataId(),
					)) ||
				(this.uun(t.Entity) && this.hun.push(t.Entity));
		this.ktn.AddOnEntityOverlapCallback(this._un), this.Cun();
	}
	uun(t) {
		return (
			!!(t = t.GetComponent(38)) &&
			!!(t = t.AiController?.AiAlert) &&
			!!t.AiAlertConfig
		);
	}
	OnEnd() {
		return this.ktn.RemoveOnEntityOverlapCallback(this._un), this.gun(), !0;
	}
	OnTick(t) {
		this.fun(t);
	}
	fun(t) {
		if (void 0 !== this.aun && !(this.hun.length <= 0)) {
			let n = 0;
			if (this.lun) {
				var e = this.aun.ExtraAiAlert.MoveAlert;
				if (!e) return;
				n = e * t * TimeUtil_1.TimeUtil.Millisecond;
			} else {
				if (!(e = this.aun.ExtraAiAlert.StopAlert)) return;
				n = e * t * TimeUtil_1.TimeUtil.Millisecond;
			}
			for (const t of this.hun)
				EventSystem_1.EventSystem.EmitWithTarget(
					t,
					EventDefine_1.EEventName.SmartObjectAiAlterNotify,
					n,
				);
		}
	}
	Cun() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnCharFootOnTheGround,
			this.cun,
		),
			EventSystem_1.EventSystem.AddWithTarget(
				Global_1.Global.BaseCharacter.CharacterActorComponent.Entity,
				EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
				this.mun,
			);
	}
	gun() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnCharFootOnTheGround,
			this.cun,
		),
			EventSystem_1.EventSystem.RemoveWithTarget(
				Global_1.Global.BaseCharacter.CharacterActorComponent.Entity,
				EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
				this.mun,
			);
	}
};
(SmartObjectComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(120)],
	SmartObjectComponent,
)),
	(exports.SmartObjectComponent = SmartObjectComponent);
