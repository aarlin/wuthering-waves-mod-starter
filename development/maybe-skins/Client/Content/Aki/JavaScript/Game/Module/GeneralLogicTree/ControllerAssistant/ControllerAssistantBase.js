"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ControllerAssistantBase = void 0);
class ControllerAssistantBase {
	Init() {
		this.OnInit();
	}
	OnInit() {}
	OnRegisterNetEvent() {}
	OnUnRegisterNetEvent() {}
	OnAddEvents() {}
	OnRemoveEvents() {}
	Destroy() {
		this.OnDestroy();
	}
}
exports.ControllerAssistantBase = ControllerAssistantBase;
