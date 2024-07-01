"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TutorialPageItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TutorialPageItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), (this.jPt = void 0), (this.jPt = e);
	}
	Init() {
		this.CreateThenShowByActor(this.jPt.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [[0, UE.UIItem]]), (this.BtnBindInfo = []);
	}
	UpdateShow(e) {
		this.GetItem(0).SetUIActive(e);
	}
}
exports.TutorialPageItem = TutorialPageItem;
