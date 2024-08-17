"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DraggableNextComponent =
		exports.DraggablePrevComponent =
		exports.DraggableComponent =
			void 0);
const TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent"),
	TRIGGER_TIME = 20;
class DraggableComponent extends HotKeyComponent_1.HotKeyComponent {
	constructor() {
		super(...arguments),
			(this.LDe = TickSystem_1.TickSystem.InvalidId),
			(this.e8 = 20),
			(this.J_ = (e) => {
				(this.e8 += e), this.e8 > 20 && ((this.e8 -= 20), this.TriggerEvent());
			});
	}
	OnPress(e) {
		(this.e8 = 20),
			(this.LDe = TickSystem_1.TickSystem.Add(
				this.J_,
				"NavigationDraggableComponent",
				0,
				!0,
			).Id);
	}
	OnRelease(e) {
		this.LDe &&
			(TickSystem_1.TickSystem.Remove(this.LDe),
			(this.LDe = TickSystem_1.TickSystem.InvalidId));
	}
	OnRefreshSelfHotKeyState(e) {
		var t = this.GetBindButtonTag();
		StringUtils_1.StringUtils.IsEmpty(t) ||
			((e = e.GetActiveListenerByTag(t)),
			this.SetVisibleMode(2, e?.IsListenerActive() ?? !1));
	}
	TriggerEvent() {}
}
class DraggablePrevComponent extends (exports.DraggableComponent =
	DraggableComponent) {
	TriggerEvent() {
		UiNavigationNewController_1.UiNavigationNewController.DraggableComponentNavigate(
			this.GetBindButtonTag(),
			!1,
		);
	}
}
exports.DraggablePrevComponent = DraggablePrevComponent;
class DraggableNextComponent extends DraggableComponent {
	TriggerEvent() {
		UiNavigationNewController_1.UiNavigationNewController.DraggableComponentNavigate(
			this.GetBindButtonTag(),
			!0,
		);
	}
}
exports.DraggableNextComponent = DraggableNextComponent;
