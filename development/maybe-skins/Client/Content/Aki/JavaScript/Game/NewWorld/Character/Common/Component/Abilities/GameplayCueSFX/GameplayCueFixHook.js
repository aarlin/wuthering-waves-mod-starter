"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayCueFixHook = void 0);
const GameplayCueHookUp_1 = require("./GameplayCueHookUp");
class GameplayCueFixHook extends GameplayCueHookUp_1.GameplayCueHookUp {
	GetTargetPosition() {
		return this.Entity.GetComponent(87).GetCurrentTargetLocation();
	}
}
exports.GameplayCueFixHook = GameplayCueFixHook;
