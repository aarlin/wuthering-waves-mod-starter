"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineAction = void 0);
class AiStateMachineAction {
	constructor(t, i) {
		(this.Node = void 0), (this.Fre = void 0), (this.Node = t), (this.Fre = i);
	}
	DoAction(t) {}
	Init() {
		return this.OnInit(this.Fre);
	}
	OnInit(t) {
		return !0;
	}
	Clear() {
		this.OnClear(), (this.Node = void 0);
	}
	OnClear() {}
	ToString(t, i = 0) {}
}
exports.AiStateMachineAction = AiStateMachineAction;
