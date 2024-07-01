"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LongShanStageItem = void 0);
const UE = require("ue"),
	LongShanStageById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageById"),
	LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ActivityLongShanController_1 = require("./ActivityLongShanController");
class LongShanStageItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.xOe = 0),
			(this.OnClickStageDetail = void 0),
			(this.EGn = () => {
				this.OnClickStageDetail?.(this.xOe);
			}),
			(this.xOe = e);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIText],
			[7, UE.UIItem],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.EGn]]);
	}
	OnStart() {
		this.RefreshState();
	}
	RefreshState() {
		var e = LongShanStageById_1.configLongShanStageById.GetConfig(this.xOe),
			t =
				ActivityLongShanController_1.ActivityLongShanController.GetActivityData(),
			i = t.GetStageInfoById(this.xOe),
			n =
				(LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Title),
				void 0 === i);
		this.GetItem(5).SetUIActive(n),
			this.GetItem(8).SetUIActive(!n),
			(n = t.GetProgress(this.xOe));
		this.GetItem(4).SetUIActive(100 === n),
			i ||
				((i =
					LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
						e.OpenConditionId,
					)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(3),
				"LongShanStage_ProgressPercentage02",
				n,
			),
			this.GetItem(7).SetUIActive(t.CheckStageRed(this.xOe));
	}
	SetButtonInteractive(e) {
		this.GetButton(0)?.SetSelfInteractive(e);
	}
}
exports.LongShanStageItem = LongShanStageItem;
