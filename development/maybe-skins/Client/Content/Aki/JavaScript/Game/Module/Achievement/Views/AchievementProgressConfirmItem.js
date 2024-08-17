"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementProgressConfirmItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementProgressConfirmItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Zqe = () => {}),
			(this.nqe = () => {
				this.Zqe && this.Zqe();
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.nqe]]);
	}
	SetClickCallback(e) {
		this.Zqe = e;
	}
	RefreshRedPoint(e) {
		this.GetItem(1).SetUIActive(e);
	}
}
exports.AchievementProgressConfirmItem = AchievementProgressConfirmItem;
