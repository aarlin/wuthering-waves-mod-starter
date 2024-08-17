"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConfigBase = void 0);
class ConfigBase {
	Init() {
		return this.OnInit();
	}
	Clear() {
		return this.OnClear();
	}
	OnInit() {
		return !0;
	}
	OnClear() {
		return !0;
	}
}
exports.ConfigBase = ConfigBase;
//# sourceMappingURL=ConfigBase.js.map
