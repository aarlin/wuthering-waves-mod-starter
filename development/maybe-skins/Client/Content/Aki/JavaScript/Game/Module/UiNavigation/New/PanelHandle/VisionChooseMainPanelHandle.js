"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionChooseMainPanelHandle = void 0);
const UiNavigationGlobalData_1 = require("../UiNavigationGlobalData"),
	SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class VisionChooseMainPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
	constructor() {
		super(...arguments), (this.lwo = void 0);
	}
	OnGetSuitableNavigationListenerList(a) {
		return !a ||
			UiNavigationGlobalData_1.UiNavigationGlobalData
				.VisionReplaceViewFindDefault
			? this.DefaultNavigationListener
			: (this.lwo ||
					((this.lwo = [...this.DefaultNavigationListener]),
					2 <= this.lwo.length &&
						((a = this.lwo[0]),
						(this.lwo[0] = this.lwo[1]),
						(this.lwo[1] = a))),
				this.lwo);
	}
	OnNotifyFindResult(a) {
		a.IsInLoopingProcess() ||
			(UiNavigationGlobalData_1.UiNavigationGlobalData.VisionReplaceViewFindDefault =
				!0);
	}
}
exports.VisionChooseMainPanelHandle = VisionChooseMainPanelHandle;
