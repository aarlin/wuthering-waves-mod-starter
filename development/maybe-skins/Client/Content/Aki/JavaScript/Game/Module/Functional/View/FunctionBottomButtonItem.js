"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionBottomButtonItem = void 0);
const UE = require("ue"),
	RedDotController_1 = require("../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FunctionBottomButtonItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(), (this.QFe = t), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	BindRedDot() {
		var e = this.GetItem(0);
		RedDotController_1.RedDotController.BindRedDot(this.QFe, e);
	}
	UnBindRedDot() {
		var e = this.GetItem(0);
		RedDotController_1.RedDotController.UnBindGivenUi(this.QFe, e);
	}
}
exports.FunctionBottomButtonItem = FunctionBottomButtonItem;
