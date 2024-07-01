"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreProgressItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	HelpController_1 = require("../../Help/HelpController"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreProgressItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.GTn = void 0),
			(this.OTn = () => {
				this.GTn &&
					UiManager_1.UiManager.OpenView("ExploreMissionView", this.GTn.AreaId);
			}),
			(this.NTn = () => {
				var e = this.GTn?.GetPhantomSkillHelpId();
				e && HelpController_1.HelpController.OpenHelpById(e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UISprite],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
			[7, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[4, this.OTn],
				[6, this.NTn],
			]);
	}
	Refresh(e) {
		var t = (this.GTn = e).GetProgress();
		if (
			(LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.GetNameId()),
			this.GetSprite(2).SetFillAmount(t / 100),
			e.IsPercent()
				? this.GetText(1).SetText(Math.floor(t).toString() + "%")
				: this.GetText(1).SetText(
						e.GetCurrentCount() + "/" + e.GetTotalCount(),
					),
			e.IsCompleted())
		)
			this.GetItem(3).SetUIActive(!1), this.GetItem(5).SetUIActive(!1);
		else {
			let i;
			(t = e.HasPhantomSkill()),
				this.GetItem(3).SetUIActive(6 === e.ExploreType),
				this.GetItem(5).SetUIActive(t),
				(t = this.GetText(7)),
				(i = e.GetIsPhantomSkillUnlock()
					? (t.SetChangeColor(!1), e.GetUnlockTextId())
					: (t.SetChangeColor(!0, t.changeColor), e.GetLockTextId())) &&
					LguiUtil_1.LguiUtil.SetLocalTextNew(t, i);
		}
	}
}
exports.ExploreProgressItem = ExploreProgressItem;
