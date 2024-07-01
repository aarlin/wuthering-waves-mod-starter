"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomFetterFilter = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	CommonFilter_1 = require("./CommonFilter");
class PhantomFetterFilter extends CommonFilter_1.CommonFilter {
	constructor() {
		super(...arguments),
			(this.GetPhantomItemIdList = (t) => (
				(t =
					ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(
						t.Id,
					)),
				Array.from(t)
			));
	}
	OnInitFilterMap() {
		this.FilterMap.set(18, this.GetPhantomItemIdList),
			this.FilterMap.set(19, this.GetPhantomItemIdList),
			this.FilterMap.set(20, this.GetPhantomItemIdList),
			this.FilterMap.set(21, this.GetPhantomItemIdList);
	}
}
exports.PhantomFetterFilter = PhantomFetterFilter;
