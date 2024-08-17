"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	EffectSystem_1 = require("./EffectSystem");
class TsEffectActor extends UE.Actor {
	constructor() {
		super(...arguments),
			(this.Handle = void 0),
			(this.InPool = 0),
			(this.HandleId = 0),
			(this.TimeScale = 1);
	}
	SetEffectHandle(e) {
		(this.Handle = e), (this.HandleId = e?.Id ?? 0);
	}
	SetTimeScale(e) {
		this.TimeScale !== e && (this.TimeScale = e);
	}
	GetTimeScale() {
		return this.TimeScale ?? 1;
	}
	GetHandle() {
		return this.HandleId ?? 0;
	}
	SetHandle(e) {}
	RemoveHandle() {
		(this.Handle = void 0), (this.HandleId = 0);
	}
	ReceiveEndPlay() {}
	StopEffect(e, t = !1, s = !1) {
		EffectSystem_1.EffectSystem.IsValid(this.HandleId) &&
			this.Handle.StopEffect(e, t, s);
	}
	GetEffectPath() {
		return this.Handle?.Path;
	}
}
exports.default = TsEffectActor;
