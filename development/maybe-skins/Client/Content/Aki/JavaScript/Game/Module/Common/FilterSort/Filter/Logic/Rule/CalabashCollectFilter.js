"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashCollectFilter = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	CommonFilter_1 = require("./CommonFilter");
class CalabashCollectFilter extends CommonFilter_1.CommonFilter {
	constructor() {
		super(...arguments),
			(this.GetPhantomItemId = (t) => t.DevelopRewardData.MonsterId),
			(this.GetPhantomRarity = (t) => (
				(t = t.DevelopRewardData.MonsterId),
				ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterRarity(t)
			));
	}
	OnInitFilterMap() {
		this.FilterMap.set(3, this.GetPhantomItemId),
			this.FilterMap.set(14, this.GetPhantomRarity),
			this.FilterMap.set(18, this.GetPhantomItemId),
			this.FilterMap.set(19, this.GetPhantomItemId),
			this.FilterMap.set(20, this.GetPhantomItemId),
			this.FilterMap.set(21, this.GetPhantomItemId);
	}
}
exports.CalabashCollectFilter = CalabashCollectFilter;
