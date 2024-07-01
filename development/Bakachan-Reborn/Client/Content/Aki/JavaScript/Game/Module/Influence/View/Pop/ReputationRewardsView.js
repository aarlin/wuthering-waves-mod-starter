"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ReputationRewardsView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView"),
	InfluenceRewardItem_1 = require("../Item/InfluenceRewardItem");
class ReputationRewardsView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.xqe = void 0),
			(this.wni = void 0),
			(this.sGe = (e, r, i) => {
				r = new InfluenceRewardItem_1.InfluenceRewardItem(r);
				var t = this.wni.RewardIndex >= i;
				return r.UpdateItem(e, t), { Key: i, Value: r };
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent]];
	}
	OnBeforeCreate() {
		var e = this.OpenParam;
		this.wni =
			ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(
				e,
			);
	}
	OnStart() {
		this.xqe = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(0),
			this.sGe,
		);
	}
	OnAfterShow() {
		this.xqe.RefreshByData(this.wni.GetReward());
	}
	OnBeforeDestroy() {
		this.xqe.ClearChildren(), (this.xqe = void 0);
	}
}
exports.ReputationRewardsView = ReputationRewardsView;
