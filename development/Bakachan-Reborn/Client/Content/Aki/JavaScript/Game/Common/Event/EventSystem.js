"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EventSystem = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Event_1 = require("../../../Core/Event/Event"),
	EventDefine_1 = require("./EventDefine");
class EventSystem {
	static Has(e, t) {
		return EventSystem.Me.Has(e, t);
	}
	static HasWithTarget(e, t, n) {
		return !!(e = EventSystem.hde(e)) && e.Has(t, n);
	}
	static Add(e, t) {
		return EventSystem.Me.Add(e, t);
	}
	static AddWithTarget(e, t, n) {
		return EventSystem.lde(e).Add(t, n);
	}
	static Once(e, t) {
		return EventSystem.Me.Once(e, t);
	}
	static OnceWithTarget(e, t, n) {
		return EventSystem.lde(e).Once(t, n);
	}
	static Remove(e, t) {
		return EventSystem.Me.Remove(e, t);
	}
	static RemoveWithTarget(e, t, n) {
		return EventSystem.hde(e)?.Remove(t, n) ?? !1;
	}
	static Emit(e, ...t) {
		return EventSystem.Me.Emit(e, ...t);
	}
	static EmitWithTarget(e, t, ...n) {
		return EventSystem.hde(e)?.Emit(t, ...n) ?? !1;
	}
	static EmitWithTargets(e, t, ...n) {
		if (e && !(e.length <= 0))
			for (const r of e) EventSystem.hde(r)?.Emit(t, ...n);
	}
	static hde(e) {
		if (e) return EventSystem._de.get(e);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Event", 1, "事件系统目标不存在，请检查目标", [
				"target",
				e,
			]);
	}
	static lde(e) {
		let t = EventSystem.hde(e);
		return (
			t ||
				((t = new Event_1.Event(EventDefine_1.EEventName)),
				EventSystem._de.set(e, t)),
			t
		);
	}
}
((exports.EventSystem = EventSystem).Me = new Event_1.Event(
	EventDefine_1.EEventName,
)),
	(EventSystem._de = new WeakMap());
