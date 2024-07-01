"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlackScreenView = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BlackScreenView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UITexture]];
	}
	GetBlackScreenTextureActor() {
		return this.GetTexture(0).GetOwner();
	}
}
exports.BlackScreenView = BlackScreenView;
