"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuaranteeActionBase = void 0);
class GuaranteeActionBase {
	constructor() {
		(this.Type = "EnablePlayerMoveControl"),
			(this.ActionInfo = void 0),
			(this.Context = void 0);
	}
	Execute(e, t) {
		(this.ActionInfo = e), (this.Context = t), this.OnExecute(e.Params);
	}
	OnExecute(e) {}
}
exports.GuaranteeActionBase = GuaranteeActionBase;
