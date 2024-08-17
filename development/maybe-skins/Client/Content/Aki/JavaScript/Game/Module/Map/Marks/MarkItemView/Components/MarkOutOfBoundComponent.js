"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkOutOfBoundComponent = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
	RAD_2_DEG = 180 / Math.PI,
	DEG_PI_4 = 90;
class MarkOutOfBoundComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.cie = void 0);
	}
	OnRegisterComponent() {
		(this.cie = new UE.Rotator(0)),
			(this.ComponentRegisterInfos = [[0, UE.UIItem]]);
	}
	SetOutOfBoundDirection(e) {
		var t = this.GetItem(0);
		t &&
			((e = Math.atan2(e.Y, e.X) * RAD_2_DEG - 90),
			(this.cie.Yaw = e),
			t.SetUIRelativeRotation(this.cie));
	}
	SetActive(e) {
		this.RootItem.SetUIActive(e);
	}
	OnBeforeDestroy() {
		this.cie = void 0;
	}
}
exports.MarkOutOfBoundComponent = MarkOutOfBoundComponent;
