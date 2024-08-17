"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookInfoTextItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class HandBookInfoTextItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(), (this.Content = e), this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnStart() {
		this.GetText(0).SetText(this.Content);
	}
}
exports.HandBookInfoTextItem = HandBookInfoTextItem;
