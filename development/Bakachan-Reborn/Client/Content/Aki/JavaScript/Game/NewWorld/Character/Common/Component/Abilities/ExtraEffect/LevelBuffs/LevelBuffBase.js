"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelBuffBase = void 0);
class LevelBuffBase {
	constructor(e, s, t, a, r) {
		(this.Entity = e),
			(this.BuffId = s),
			(this.Params = t),
			(this.Param1 = a),
			(this.Param2 = r);
	}
	OnCreated() {}
	OnRemoved(e) {}
	OnStackChanged(e, s, t) {}
}
exports.LevelBuffBase = LevelBuffBase;
