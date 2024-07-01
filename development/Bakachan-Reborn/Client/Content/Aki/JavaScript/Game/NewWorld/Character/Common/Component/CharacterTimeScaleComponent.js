"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, i, o) {
		var r,
			n = arguments.length,
			a =
				n < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, i))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, t, i, o);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(r = e[s]) && (a = (n < 3 ? r(a) : 3 < n ? r(t, i, a) : r(t, i)) || a);
		return 3 < n && a && Object.defineProperty(t, i, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterTimeScaleComponent = void 0);
const AudioDefine_1 = require("../../../../../Core/Audio/AudioDefine"),
	AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	PawnTimeScaleComponent_1 = require("../../../Pawn/Component/PawnTimeScaleComponent");
let CharacterTimeScaleComponent = class extends PawnTimeScaleComponent_1.PawnTimeScaleComponent {
	constructor() {
		super(...arguments),
			(this.BKr = 1),
			(this.bKr = 1),
			(this.qKr = 1),
			(this.TimeStopEntitySet = new Set());
	}
	OnStart() {
		return !!super.OnStart();
	}
	IsTimescaleValid(e, t) {
		if (ModelManager_1.ModelManager.GameModeModel?.IsMulti)
			switch (e.SourceType) {
				case 3:
				case 4:
				case 6:
				case 5:
					break;
				default:
					return !1;
			}
		return super.IsTimescaleValid(e, t);
	}
	OnTick(e) {
		var t = Time_1.Time.WorldTimeSeconds;
		let i = 1,
			o = 0,
			r = 1;
		for (; !this.TimeScaleList.Empty; ) {
			var n = this.TimeScaleList.Top;
			if (!n) break;
			if (this.IsTimescaleValid(n, t)) {
				(i = n.CalculateTimeScale()),
					(o = n.SourceType),
					(r =
						n.EndTime - n.StartTime >=
						AudioDefine_1.ENTITY_TIMESCALE_ENABLE_THRESHOLD
							? i
							: this.bKr);
				break;
			}
			this.TimeScaleMap.delete(n.Id), this.TimeScaleList.Pop();
		}
		var a,
			s = this.Entity.GetComponent(15);
		(s =
			(!this.ActorComp ||
				this.ActorComp.IsMoveAutonomousProxy ||
				(s && s.IsDead()) ||
				((i = this.qKr), (r = this.qKr)),
			r * this.Entity.TimeDilation)) !== this.BKr &&
			((a = this.ActorComp?.Actor)
				? (AudioSystem_1.AudioSystem.SetRtpcValue(
						"entity_time_scale_combat",
						s,
						{ Actor: a },
					),
					s < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
						this.BKr >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
						AudioSystem_1.AudioSystem.PostEvent("time_scale_pause", a))
				: s >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
					this.BKr < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
					AudioSystem_1.AudioSystem.PostEvent("time_scale_resume", a)),
			(this.BKr = s),
			(this.bKr = r),
			i !== this.TimeScaleInternal &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Character",
						20,
						"实体流速变化",
						["entityId", this.Entity.Id],
						["newScale", i],
						["oldScale", this.TimeScaleInternal],
						["sourceType", o],
					),
				(this.TimeScaleInternal = i),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharBeHitTimeScale,
					i,
					o,
				),
				this.Entity.SetTimeDilation(this.TimeDilation));
	}
	SetMoveSyncTimeScale(e) {
		this.qKr = e;
	}
};
(CharacterTimeScaleComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(162)],
	CharacterTimeScaleComponent,
)),
	(exports.CharacterTimeScaleComponent = CharacterTimeScaleComponent);
