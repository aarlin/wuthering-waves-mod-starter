"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TestModuleBridge = void 0);
const Log_1 = require("../../Core/Common/Log");
class TestModuleBridge {
	static async TryGetTestModuleExports() {
		if (this.RIa) return this.RIa;
		try {
			var e = await Promise.resolve().then(() =>
				require("../../Test/TestModuleExports"),
			);
			if (e) return (this.RIa = e.TestModuleExports), this.RIa;
		} catch (e) {
			e instanceof Error
				? Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Game", 63, "找不到Test模块入口", [
						"error",
						e.stack || e.message,
					])
				: Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Game", 63, "找不到Test模块入口", ["error", e]);
		}
	}
}
(exports.TestModuleBridge = TestModuleBridge).RIa = void 0;
//# sourceMappingURL=TestModuleBridge.js.map
