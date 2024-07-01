"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementGroupDataItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	AchievementModel_1 = require("../AchievementModel"),
	AchievementDataItem_1 = require("./AchievementDataItem");
class AchievementGroupDataItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.xqe = void 0),
			(this.wqe = void 0),
			(this.Bqe = () => new AchievementDataItem_1.AchievementDataItem()),
			(this.wqe = e);
	}
	async Init() {
		await this.CreateByActorAsync(this.wqe.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UILoopScrollViewComponent],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.xqe = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(0),
			this.GetItem(1).GetOwner(),
			this.Bqe,
		);
	}
	Update(e) {
		(e = ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
			e.GetId(),
		)).sort(AchievementModel_1.AchievementModel.SortByTabIndex),
			this.bqe(e);
	}
	bqe(e) {
		this.xqe.RefreshByData(e, !0),
			0 < e.length && ((e = this.qqe(e)), this.xqe.ScrollToGridIndex(e));
	}
	qqe(e) {
		if (
			-1 ===
			ModelManager_1.ModelManager.AchievementModel.CurrentSelectAchievementId
		)
			return 0;
		let t = 0;
		var r = e.length;
		for (let o = 0; o < r; o++)
			if (
				ModelManager_1.ModelManager.AchievementModel
					.CurrentSelectAchievementId === e[o].GetId()
			) {
				t = o;
				break;
			}
		return (
			(ModelManager_1.ModelManager.AchievementModel.CurrentSelectAchievementId =
				-1),
			t
		);
	}
}
exports.AchievementGroupDataItem = AchievementGroupDataItem;
