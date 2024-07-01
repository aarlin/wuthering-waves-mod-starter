"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineTask = void 0);
class AiStateMachineTask {
	constructor(t, e) {
		(this.Node = void 0),
			(this.bne = void 0),
			(this.CanBeInterrupt = !1),
			(this.Node = t),
			(this.bne = e),
			(this.CanBeInterrupt = e.CanBeInterrupt);
	}
	get Type() {
		return this.bne.Type;
	}
	Init() {
		return this.OnInit(this.bne);
	}
	OnInit(t) {
		return !0;
	}
	OnEnter(t) {}
	OnExit(t) {}
	OnActivate(t) {}
	OnDeactivate(t) {}
	OnExecuted(t) {}
	Tick(t, e) {
		this.OnTick(t, e);
	}
	OnTick(t, e) {}
	Clear() {
		this.OnClear(), (this.Node = void 0), (this.bne = void 0);
	}
	OnClear() {}
	ToString(t, e = 0) {}
}
exports.AiStateMachineTask = AiStateMachineTask;
