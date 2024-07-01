"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementSearchResultItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	AchievementDataItem_1 = require("./AchievementDataItem"),
	AchievementSearchDescItem_1 = require("./AchievementSearchDescItem");
class AchievementSearchResultItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Data = void 0),
			(this.EGe = void 0),
			(this.yGe = void 0),
			(this.IGe = void 0);
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		void 0 === this.EGe &&
			((this.EGe = new AchievementSearchDescItem_1.AchievementSearchDescItem(
				this.GetItem(0),
			)),
			await this.EGe.Init()),
			void 0 === this.yGe &&
				((this.yGe = new AchievementDataItem_1.AchievementDataItem()),
				await this.yGe.Init(this.GetItem(1)));
	}
	GetUsingItem(e) {
		return e.AchievementSearchGroupData
			? this.GetItem(0).GetOwner()
			: e.AchievementData
				? this.GetItem(1).GetOwner()
				: void 0;
	}
	Update(e, t) {
		(this.Data = e),
			this.EGe.SetActive(!1),
			this.yGe.SetActive(!1),
			e.AchievementSearchGroupData
				? (this.EGe.SetActive(!0), this.EGe.Update(e))
				: e.AchievementData &&
					(this.yGe.SetActive(!0), this.yGe.RefreshUi(e.AchievementData));
	}
	ClearItem() {
		this.Destroy();
	}
	OnBeforeDestroy() {
		this.EGe && this.EGe.ClearItem(),
			this.yGe && this.yGe.ClearItem(),
			this.IGe && (this.IGe = void 0);
	}
}
exports.AchievementSearchResultItem = AchievementSearchResultItem;
