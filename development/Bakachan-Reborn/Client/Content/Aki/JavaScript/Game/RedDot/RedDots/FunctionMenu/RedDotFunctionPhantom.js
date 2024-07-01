"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotFunctionPhantom = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionPhantom extends RedDotBase_1.RedDotBase {
	OnCheck() {
		return ModelManager_1.ModelManager.FunctionModel.RedDotFunctionPhantomCondition();
	}
}
exports.RedDotFunctionPhantom = RedDotFunctionPhantom;
