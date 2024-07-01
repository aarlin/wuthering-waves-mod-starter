"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	GlobalData_1 = require("../GlobalData");
class GlobalBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static GetBpEventManager() {
		return GlobalData_1.GlobalData.BpEventManager;
	}
	static GetBpFightManager() {
		return GlobalData_1.GlobalData.BpFightManager;
	}
}
exports.default = GlobalBlueprintFunctionLibrary;
