"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiControllerBase = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
class UiControllerBase extends ControllerBase_1.ControllerBase {
	static Init() {
		var e = super.Init();
		return (
			this.OnRegisterNetEvent(),
			this.OnAddEvents(),
			this.OnAddOpenViewCheckFunction(),
			e
		);
	}
	static Clear() {
		return (
			this.OnUnRegisterNetEvent(),
			this.OnRemoveEvents(),
			this.OnRemoveOpenViewCheckFunction(),
			super.Clear()
		);
	}
	static OnRegisterNetEvent() {}
	static OnUnRegisterNetEvent() {}
	static OnAddEvents() {}
	static OnRemoveEvents() {}
	static OnAddOpenViewCheckFunction() {}
	static OnRemoveOpenViewCheckFunction() {}
}
exports.UiControllerBase = UiControllerBase;
