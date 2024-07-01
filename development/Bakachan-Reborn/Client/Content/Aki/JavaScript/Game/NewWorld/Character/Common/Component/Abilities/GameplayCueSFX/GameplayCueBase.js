"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueBase = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log");
class GameplayCueBase {
	constructor(t, e, i, s, n, a) {
		(this.Entity = t),
			(this.CueConfig = e),
			(this.ActorInternal = i),
			(this.CueComp = s),
			(this.BeginCallback = n),
			(this.EndCallback = a),
			(this.IsActive = !1),
			(this.BuffId = void 0),
			(this.IsInstant = !1),
			(this.ActiveHandleId = 0);
	}
	OnInit() {}
	OnTick(t) {}
	OnCreate() {}
	OnDestroy() {}
	OnEnable() {}
	OnDisable() {}
	OnChangeTimeDilation(t) {}
	static Spawn(t) {
		var e = new this(
			t.Entity,
			t.CueConfig,
			t.Actor,
			t.CueComp,
			t.BeginCallback,
			t.EndCallback,
		);
		return (
			t.Buff
				? ((e.ActiveHandleId = t.Buff.Handle),
					(e.IsInstant = t.Buff.IsInstantBuff()),
					(e.BuffId = t.Buff.Id))
				: (e.IsInstant = !0),
			e.OnInit(),
			(e.IsInstant || t.Buff.IsActive()) && e.Create(),
			e
		);
	}
	Create() {
		this.IsActive ||
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					29,
					"Buff特效开始",
					["HandleID", this.ActiveHandleId],
					["BuffId", this.BuffId],
					["CueId", this.CueConfig.Id],
					["EntityId", this.Entity.Id],
				),
			(this.IsActive = !0),
			this.OnCreate());
	}
	Destroy() {
		this.IsActive &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					29,
					"Buff特效结束",
					["HandleID", this.ActiveHandleId],
					["BuffId", this.BuffId],
					["CueId", this.CueConfig.Id],
					["EntityId", this.Entity.Id],
				),
			(this.IsActive = !1),
			this.OnDestroy());
	}
	Tick(t) {
		this.IsActive && this.OnTick(t);
	}
	Enable() {
		this.OnEnable();
	}
	Disable() {
		this.OnDisable();
	}
	ChangeTimeDilation(t) {
		this.OnChangeTimeDilation(t);
	}
}
exports.GameplayCueBase = GameplayCueBase;
