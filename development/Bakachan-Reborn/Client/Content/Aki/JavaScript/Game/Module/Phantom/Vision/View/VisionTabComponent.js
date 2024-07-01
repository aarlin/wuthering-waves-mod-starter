"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionTabComponent = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class VisionTabComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.lji = void 0),
			(this._ji = void 0),
			(this.uji = () => {
				this.lji?.();
			}),
			(this.cji = () => {
				this._ji?.();
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [
				[0, this.uji],
				[1, this.cji],
			]);
	}
	SetToggleOneButtonClick(e) {
		this.lji = e;
	}
	SetToggleTwoButtonClick(e) {
		this._ji = e;
	}
}
exports.VisionTabComponent = VisionTabComponent;
