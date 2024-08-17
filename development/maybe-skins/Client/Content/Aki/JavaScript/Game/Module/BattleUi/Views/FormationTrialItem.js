"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FormationTrialItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FormationTrialItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.rat = void 0),
			this.CreateThenShowByResourceIdAsync("UiItem_FigthRoleHeadTest", e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnStart() {
		this.rat && this.GetText(0).SetText(this.rat), (this.rat = void 0);
	}
	SetNameText(e) {
		this.InAsyncLoading() ? (this.rat = e) : this.GetText(0).SetText(e);
	}
}
exports.FormationTrialItem = FormationTrialItem;
