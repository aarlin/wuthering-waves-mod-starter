"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialItemLogicBase = void 0);
class SpecialItemLogicBase {
	constructor(e) {
		(this.ConfigId = 0), (this.ConfigId = e);
	}
	Init() {}
	Destroy() {}
	CheckUseCondition() {
		return !0;
	}
	OnUse() {}
}
exports.SpecialItemLogicBase = SpecialItemLogicBase;
