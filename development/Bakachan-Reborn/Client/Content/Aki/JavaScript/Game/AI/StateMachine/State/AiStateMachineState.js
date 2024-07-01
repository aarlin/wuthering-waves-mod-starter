"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineState = void 0);
class AiStateMachineState {
	constructor(t, e) {
		(this.Node = void 0),
			(this.StateData = void 0),
			(this.Node = t),
			(this.StateData = e);
	}
	Init() {
		return this.OnInit(this.StateData);
	}
	OnInit(t) {
		return !0;
	}
	OnEnter(t, e) {}
	OnExit(t, e) {}
	OnActivate(t, e) {}
	OnDeactivate(t, e) {}
	OnExecuted(t) {}
	Tick(t, e) {
		this.OnTick(t, e);
	}
	OnTick(t, e) {}
	Clear() {
		this.OnClear(), (this.Node = void 0);
	}
	OnClear() {}
	ToString(t, e = 0) {}
}
exports.AiStateMachineState = AiStateMachineState;
