"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DraggableNextInsideComponent = exports.DraggablePrevInsideComponent =
		void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	DraggableComponent_1 = require("./DraggableComponent");
class DraggableInsideComponent extends DraggableComponent_1.DraggableComponent {
	OnRefreshSelfHotKeyState(e) {
		var t = this.GetBindButtonTag();
		StringUtils_1.StringUtils.IsEmpty(t) ||
			((e = e.GetFocusListener())
				? ((e =
						UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(
							e,
							t,
						)),
					this.SetVisibleMode(2, e?.IsListenerActive() ?? !1))
				: this.SetVisibleMode(2, !1));
	}
}
class DraggablePrevInsideComponent extends DraggableInsideComponent {
	TriggerEvent() {
		UiNavigationNewController_1.UiNavigationNewController.DraggableInsideComponentNavigate(
			this.GetBindButtonTag(),
			!1,
		);
	}
}
exports.DraggablePrevInsideComponent = DraggablePrevInsideComponent;
class DraggableNextInsideComponent extends DraggableInsideComponent {
	TriggerEvent() {
		UiNavigationNewController_1.UiNavigationNewController.DraggableInsideComponentNavigate(
			this.GetBindButtonTag(),
			!0,
		);
	}
}
exports.DraggableNextInsideComponent = DraggableNextInsideComponent;
