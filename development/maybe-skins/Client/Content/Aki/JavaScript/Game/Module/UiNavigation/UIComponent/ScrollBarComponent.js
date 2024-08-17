"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ScrollBarComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent"),
	THRESHOLD = 0.6;
class ScrollBarComponent extends HotKeyComponent_1.HotKeyComponent {
	OnInputAxis(e, o) {
		Math.abs(o) <= 0.6 ||
			UiNavigationNewController_1.UiNavigationNewController.ScrollBarChangeSchedule(
				o,
			);
	}
	OnRefreshSelfHotKeyState(e) {
		var o = this.GetBindButtonTag();
		StringUtils_1.StringUtils.IsEmpty(o)
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("UiNavigationHotKey", 11, "ScrollBar需要配置tag")
			: (e = e.GetScrollbarData().GetCurrentListener()) &&
					e.IsListenerActive() &&
					e.TagArray?.Contains(o)
				? this.SetVisibleMode(2, !0)
				: this.SetVisibleMode(2, !1);
	}
}
exports.ScrollBarComponent = ScrollBarComponent;
