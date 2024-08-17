"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ModelBase = void 0);
class ModelBase {
	Init() {
		return this.OnInit();
	}
	Clear() {
		return this.OnClear();
	}
	LeaveLevel() {
		return this.OnLeaveLevel();
	}
	ChangeMode() {
		return this.OnChangeMode();
	}
	OnInit() {
		return !0;
	}
	OnClear() {
		return !0;
	}
	OnLeaveLevel() {
		return !0;
	}
	OnChangeMode() {
		return !0;
	}
}
exports.ModelBase = ModelBase;
//# sourceMappingURL=ModelBase.js.map
