"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SliderReduceInsideComponent =
		exports.SliderIncreaseInsideComponent =
		exports.SliderInsideComponent =
			void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	SliderComponent_1 = require("./SliderComponent"),
	INTERVAL = 0.05;
class SliderInsideComponent extends SliderComponent_1.SliderComponent {
	SetValue(e) {
		UiNavigationNewController_1.UiNavigationNewController.SliderInsideComponentSetValue(
			this.GetBindButtonTag(),
			e,
		);
	}
	OnRefreshSelfHotKeyState(e) {
		var n = this.GetBindButtonTag();
		StringUtils_1.StringUtils.IsEmpty(n) ||
			((e = e.GetFocusListener()) &&
			(e =
				UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(
					e,
					n,
				))
				? this.SetVisibleMode(2, e.IsListenerActive())
				: this.SetVisibleMode(2, !1));
	}
}
class SliderIncreaseInsideComponent extends (exports.SliderInsideComponent =
	SliderInsideComponent) {
	OnRelease(e) {
		this.SetValue(0.05);
	}
	OnInputAxis(e, n) {
		n <= 0 || this.SetValue(0.05 * n);
	}
}
exports.SliderIncreaseInsideComponent = SliderIncreaseInsideComponent;
class SliderReduceInsideComponent extends SliderInsideComponent {
	OnRelease(e) {
		this.SetValue(-0.05);
	}
	OnInputAxis(e, n) {
		0 <= n || this.SetValue(0.05 * n);
	}
}
exports.SliderReduceInsideComponent = SliderReduceInsideComponent;
