"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotSystem = void 0);
class RedDotEventData {
	constructor(t, e) {
		(this.Event = t), (this.Param = e);
	}
	HandleEvent() {
		this.Event(this.Param);
	}
}
const TICK_LIMITCOUNT = 10;
class RedDotSystem {
	static PushToEventQueue(t, e) {
		var s;
		this.Xsr.find((s) => s.Event === t && s.Param === e) ||
			((s = new RedDotEventData(t, e)), this.Xsr.push(s));
	}
	static $sr() {
		var t = RedDotSystem.Xsr.shift();
		t && t.HandleEvent();
	}
	static Tick(t) {
		var e = RedDotSystem.Xsr.length;
		if (!(e <= 0)) {
			var s = e > 10 ? 10 : e;
			for (let t = 0; t < s; t++) RedDotSystem.$sr();
		}
	}
}
(exports.RedDotSystem = RedDotSystem).Xsr = [];
