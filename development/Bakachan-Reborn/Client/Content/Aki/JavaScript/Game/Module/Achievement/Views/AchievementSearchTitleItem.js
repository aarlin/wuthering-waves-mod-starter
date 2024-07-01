"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementSearchTitleItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementSearchTitleItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), (this.Pe = void 0), (this.wqe = void 0), (this.wqe = e);
	}
	async Init() {
		await this.CreateByActorAsync(this.wqe.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnStart() {}
	OnBeforeDestroy() {}
	Update(e) {
		(this.Pe = e), this.mGe();
	}
	mGe() {
		this.Pe &&
			this.GetText(0).SetText(this.Pe.AchievementCategoryData.GetTitle());
	}
	GetItemSize(e) {
		var t = this.GetRootItem();
		return e.Set(t.GetWidth(), t.GetHeight()), e.ToUeVector2D(!0);
	}
	GetUsingItem() {
		return this.GetRootItem().GetOwner();
	}
	ClearItem() {
		this.Destroy();
	}
}
exports.AchievementSearchTitleItem = AchievementSearchTitleItem;
