"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BagTagNavigationNextComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	NavigationGroupComponent_1 = require("./NavigationGroupComponent");
class BagTagNavigationNextComponent extends NavigationGroupComponent_1.NavigationGroupNextComponent {
	OnRefreshSelfHotKeyState(t) {
		if ((e = t.GetFocusListener())) {
			var e = e.GetNavigationGroup(),
				o = this.GetBindButtonTag();
			let i;
			(i = o ? e.GroupNameMap.Get(o) : e.NextGroupName),
				!StringUtils_1.StringUtils.IsEmpty(i) &&
				(o = t.GetNavigationGroupByName(e.NextGroupName))
					? ((t = o.DefaultListener),
						this.SetVisibleMode(2, t.IsScrollOrLayoutActive()))
					: this.SetVisibleMode(2, !1);
		} else this.SetVisibleMode(2, !1);
	}
}
exports.BagTagNavigationNextComponent = BagTagNavigationNextComponent;
