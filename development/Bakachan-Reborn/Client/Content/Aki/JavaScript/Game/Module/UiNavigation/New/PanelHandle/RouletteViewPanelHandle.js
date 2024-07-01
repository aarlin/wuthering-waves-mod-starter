"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteViewPanelHandle = void 0);
const UiNavigationLogic_1 = require("../UiNavigationLogic"),
	SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class RouletteViewPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
	constructor() {
		super(...arguments), (this.lwo = void 0);
	}
	OnGetSuitableNavigationListenerList(e) {
		return e
			? this.DefaultNavigationListener
			: ((e = this.GetNavigationGroup("Group2")),
				UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(e)
					? (this.lwo ||
							((this.lwo = [...this.DefaultNavigationListener]),
							2 <= this.lwo.length &&
								((e = this.lwo[0]),
								(this.lwo[0] = this.lwo[1]),
								(this.lwo[1] = e))),
						this.lwo)
					: ((e = this.DefaultNavigationListener[0]).GetNavigationGroup()
							.LastSelectListener &&
							((e = e.GetNavigationGroup().LastSelectListener),
							(this.DefaultNavigationListener[0] = e)),
						this.DefaultNavigationListener));
	}
}
exports.RouletteViewPanelHandle = RouletteViewPanelHandle;
