"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiWorldState = void 0);
class LevelAiWorldState {
	constructor() {
		(this.Uid = ++LevelAiWorldState.MIe),
			(this.BooleanWorldState = new Map()),
			(this.IntWorldState = new Map());
	}
	SetBooleanWorldState(t, e) {
		this.BooleanWorldState.set(t, e);
	}
	SetIntWorldState(t, e) {
		this.IntWorldState.set(t, e);
	}
	RemoveBooleanWorldState(t) {
		this.BooleanWorldState.delete(t);
	}
	RemoveIntWorldState(t) {
		this.IntWorldState.delete(t);
	}
	GetBooleanWorldState(t) {
		return this.BooleanWorldState.get(t);
	}
	GetIntWorldState(t) {
		return this.IntWorldState.get(t);
	}
	MakeCopy() {
		var t = new LevelAiWorldState();
		for (const e of this.BooleanWorldState) t.BooleanWorldState.set(e[0], e[1]);
		for (const e of this.IntWorldState) t.IntWorldState.set(e[0], e[1]);
		return t;
	}
}
(exports.LevelAiWorldState = LevelAiWorldState).MIe = 0;
