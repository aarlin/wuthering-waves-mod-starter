"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdventureGuideRedDotView = void 0);
const RedDotController_1 = require("../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AdventureGuideRedDotView extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), (this.S9 = "Test"), this.CreateThenShowByActor(e);
	}
	EnableRedDot(e) {
		var t = this.GetRootItem();
		RedDotController_1.RedDotController.BindRedDot(e, t), (this.S9 = e);
	}
	OnBeforeDestroy() {
		this.DisableRedDot(this.S9);
	}
	DisableRedDot(e) {
		RedDotController_1.RedDotController.UnBindRedDot(e);
	}
}
exports.AdventureGuideRedDotView = AdventureGuideRedDotView;
