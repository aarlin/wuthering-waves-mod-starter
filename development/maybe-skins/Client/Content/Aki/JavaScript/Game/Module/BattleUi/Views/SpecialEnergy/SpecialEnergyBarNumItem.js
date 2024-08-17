"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarNumItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class SpecialEnergyBarNumItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.Mnt = -1);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	SetNum(e) {
		this.Mnt !== e && ((this.Mnt = e), this.GetText(0)?.SetText(e.toString()));
	}
}
exports.SpecialEnergyBarNumItem = SpecialEnergyBarNumItem;
