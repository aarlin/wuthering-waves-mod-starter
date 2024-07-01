"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionRequestProxy = exports.FunctionRequestWithPriority = void 0);
const Time_1 = require("../../../../../../Core/Common/Time");
class FunctionRequestWithPriority {
	constructor() {
		(this.ModuleName = ""), (this.Priority = void 0);
	}
	CompareRequest(e) {
		return this.Priority > e.Priority;
	}
}
exports.FunctionRequestWithPriority = FunctionRequestWithPriority;
class FunctionRequestProxy {
	constructor() {
		(this.RequestLastTime = 0), (this.PreFunctionRequestCache = void 0);
	}
	DecideCall(e) {
		return !(
			(this.RequestLastTime === Time_1.Time.Frame &&
				this.PreFunctionRequestCache?.CompareRequest(e)) ||
			((this.PreFunctionRequestCache = e),
			(this.RequestLastTime = Time_1.Time.Frame),
			0)
		);
	}
}
exports.FunctionRequestProxy = FunctionRequestProxy;
