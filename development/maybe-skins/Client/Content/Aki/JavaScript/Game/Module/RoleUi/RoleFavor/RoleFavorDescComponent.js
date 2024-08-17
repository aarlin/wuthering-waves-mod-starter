"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorDescComponent = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleFavorDescComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(), (this.b1o = t), e && this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UIText],
			[2, UE.UIText],
		];
	}
	OnStart() {
		var e = this.GetText(1),
			t = this.GetText(2);
		this.b1o
			? (e.SetText(this.b1o.Title), t.SetText(this.b1o.Desc))
			: (e.SetText(""), t.SetText("")),
			this.GetScrollViewWithScrollbar(0).SetScrollProgress(0);
	}
}
exports.RoleFavorDescComponent = RoleFavorDescComponent;
