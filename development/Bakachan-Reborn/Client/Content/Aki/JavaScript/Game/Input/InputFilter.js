"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputFilter = void 0);
const SetUtility_1 = require("../../Core/Container/SetUtility");
class InputFilter {
	constructor(t, e, i, s) {
		(this.Actions = new Set(t)),
			(this.BlockActions = new Set(e)),
			(this.Axes = new Set(i)),
			(this.BlockAxes = new Set(s));
	}
	ListenToAction(t) {
		return this.Actions?.has(t);
	}
	ListenToAxis(t) {
		return this.Axes?.has(t);
	}
	BlockAction(t) {
		return this.BlockActions?.has(t);
	}
	BlockAxis(t) {
		return this.BlockAxes?.has(t);
	}
	Union(t) {
		var e = new InputFilter(
			this.Actions,
			this.BlockActions,
			this.Axes,
			this.BlockAxes,
		);
		return (
			SetUtility_1.SetUtility.AddToSet(e.Actions, t.Actions),
			SetUtility_1.SetUtility.AddToSet(e.BlockActions, t.BlockActions),
			SetUtility_1.SetUtility.AddToSet(e.Axes, t.Axes),
			SetUtility_1.SetUtility.AddToSet(e.BlockAxes, t.BlockAxes),
			e
		);
	}
}
exports.InputFilter = InputFilter;
