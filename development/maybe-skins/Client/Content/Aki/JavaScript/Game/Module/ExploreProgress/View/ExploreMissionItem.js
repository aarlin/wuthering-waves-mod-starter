"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreMissionItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreMissionItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.xTn = void 0),
			(this.bTn = () => {
				this.xTn &&
					(SkipTaskManager_1.SkipTaskManager.Run(7, this.xTn.QuestId),
					UiManager_1.UiManager.CloseView("ExploreMissionView"));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
			[5, UE.UISprite],
			[6, UE.UIText],
		]),
			(this.BtnBindInfo = [[3, this.bTn]]);
	}
	Refresh(e, t, i) {
		var s = 2 === (this.xTn = e).QuestType,
			r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
				e.QuestId,
			)?.CanShowInUiPanel();
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.QuestNameId),
			this.GetSprite(1)?.SetUIActive(!s),
			this.GetSprite(0)?.SetUIActive(s),
			r
				? (this.GetItem(4)?.SetUIActive(!0),
					this.GetText(6)?.SetUIActive(!1),
					this.GetSprite(5)?.SetUIActive(!1))
				: 3 === e.QuestStatus
					? (this.GetItem(4)?.SetUIActive(!1),
						this.GetText(6)?.SetUIActive(!1),
						this.GetSprite(5)?.SetUIActive(!0))
					: (this.GetItem(4)?.SetUIActive(!1),
						this.GetText(6)?.SetUIActive(!0),
						this.GetSprite(5)?.SetUIActive(!1));
	}
	Clear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	GetKey(e, t) {
		return this.GridIndex;
	}
}
exports.ExploreMissionItem = ExploreMissionItem;
