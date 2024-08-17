"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationButton = void 0);
const puerts_1 = require("puerts"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	UiNavigationNewController_1 = require("../UiNavigationNewController"),
	NavigationSelectableBase_1 = require("./NavigationSelectableBase");
class NavigationButton extends NavigationSelectableBase_1.NavigationSelectableBase {
	constructor() {
		super(...arguments),
			(this.uwo = void 0),
			(this.j7e = () => {
				this.OnButtonClick();
			});
	}
	OnInit() {
		this.cwo();
	}
	OnClear() {
		this.mwo();
	}
	cwo() {
		var e, t;
		this.NeedAddButtonClick() &&
			((e = this.Selectable),
			(t = (0, puerts_1.toManualReleaseDelegate)(this.j7e)),
			(this.uwo = e.RegisterClickEvent(t)));
	}
	mwo() {
		this.uwo &&
			(this.Selectable.UnregisterClickEvent(this.uwo),
			(0, puerts_1.releaseManualReleaseDelegate)(this.j7e),
			(this.uwo = void 0));
	}
	OnButtonClick() {}
	NeedAddButtonClick() {
		return "Button" !== this.GetType();
	}
	OnHandlePointerSelect(e) {
		this.Listener.ScrollView &&
			this.Listener.ScrollView.ScrollToSelectableComponent(this.Selectable);
		var t = (t = this.Listener.GetNavigationGroup()) ? t.InsideGroupName : "";
		return (
			!StringUtils_1.StringUtils.IsBlank(t) &&
			((t =
				UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener()),
			UiNavigationNewController_1.UiNavigationNewController.IsInFocusInsideListenerList(
				this.Listener,
				t,
			))
		);
	}
}
exports.NavigationButton = NavigationButton;
