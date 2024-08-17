"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InteractReleaseComponent = void 0);
const UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class InteractReleaseComponent extends HotKeyComponent_1.HotKeyComponent {
	OnPress(e) {
		UiNavigationNewController_1.UiNavigationNewController.Interact(!0);
	}
	OnRelease(e) {
		UiNavigationNewController_1.UiNavigationNewController.Interact(!1);
	}
	OnRefreshSelfHotKeyState(e) {
		(e = e.GetFocusListener()), this.SetVisibleMode(2, void 0 !== e);
	}
	OnRefreshHotKeyText(e) {
		(e = e.GetFocusListener()?.GetTextChangeComponent()),
			e
				? this.SetHotKeyDescTextForce(e.Text.GetText())
				: this.ResetHotKeyDescTextForce();
	}
	OnRefreshHotKeyTextId(e) {
		(e = e.GetFocusListener()) &&
			((e = e.GetTipsTextIdByState()),
			this.SetHotKeyTextId(e),
			this.RefreshHotKeyNameText());
	}
}
exports.InteractReleaseComponent = InteractReleaseComponent;
