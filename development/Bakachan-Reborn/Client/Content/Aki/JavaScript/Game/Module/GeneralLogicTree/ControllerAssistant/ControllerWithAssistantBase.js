"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ControllerWithAssistantBase = void 0);
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
class ControllerWithAssistantBase extends ControllerBase_1.ControllerBase {
	static Init() {
		var t = super.Init();
		return this.OnRegisterNetEvent(), this.OnAddEvents(), t;
	}
	static Clear() {
		return this.OnUnRegisterNetEvent(), this.OnRemoveEvents(), super.Clear();
	}
	static OnInit() {
		return this.FXt(), !0;
	}
	static OnClear() {
		return this.VXt(), super.OnClear();
	}
	static OnRegisterNetEvent() {
		this.HXt();
	}
	static OnUnRegisterNetEvent() {
		this.jXt();
	}
	static OnAddEvents() {
		this.WXt();
	}
	static OnRemoveEvents() {
		this.KXt();
	}
	static FXt() {
		(this.Assistants = new Map()), this.RegisterAssistant();
	}
	static RegisterAssistant() {}
	static VXt() {
		if (this.Assistants) {
			for (var [, t] of this.Assistants) t.Destroy();
			this.Assistants.clear(), (this.Assistants = void 0);
		}
	}
	static HXt() {
		if (this.Assistants)
			for (var [, t] of this.Assistants) t.OnRegisterNetEvent();
	}
	static jXt() {
		if (this.Assistants)
			for (var [, t] of this.Assistants) t.OnUnRegisterNetEvent();
	}
	static WXt() {
		if (this.Assistants) for (var [, t] of this.Assistants) t.OnAddEvents();
	}
	static KXt() {
		if (this.Assistants) for (var [, t] of this.Assistants) t.OnRemoveEvents();
	}
	static AddAssistant(t, s) {
		s && (s.Init(), this.Assistants.set(t, s));
	}
}
(exports.ControllerWithAssistantBase = ControllerWithAssistantBase).Assistants =
	void 0;
