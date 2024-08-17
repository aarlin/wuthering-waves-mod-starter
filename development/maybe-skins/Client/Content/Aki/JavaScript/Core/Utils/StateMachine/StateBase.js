"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StateBase = void 0);
class StateBase {
	constructor(t, e, s) {
		(this.StateMachine = s), (this.Owner = t), (this.State = e);
	}
	GetState(t) {
		return this.StateMachine?.GetState(t);
	}
	Create(t) {
		this.OnCreate(t);
	}
	Start() {
		this.OnStart();
	}
	Update(t) {
		this.OnUpdate(t);
	}
	Enter(t) {
		this.OnEnter(t);
	}
	ReEnter() {
		this.OnReEnter();
	}
	Exit(t) {
		this.OnExit(t);
	}
	Destroy() {
		this.OnDestroy(), (this.Owner = void 0), (this.State = void 0);
	}
	CanReEnter() {
		return !1;
	}
	CanChangeFrom(t) {
		return !0;
	}
	OnCreate(t) {}
	OnStart() {}
	OnUpdate(t) {}
	OnEnter(t) {}
	OnReEnter() {}
	OnExit(t) {}
	OnDestroy() {}
}
exports.StateBase = StateBase;
//# sourceMappingURL=StateBase.js.map
