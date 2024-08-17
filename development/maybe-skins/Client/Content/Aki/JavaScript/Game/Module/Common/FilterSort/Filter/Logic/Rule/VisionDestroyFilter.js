"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionDestroyFilter = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	CommonFilter_1 = require("./CommonFilter"),
	VisionDestroyFilterLogic_1 = require("./VisionDestroyFilterLogic");
class VisionDestroyFilter extends CommonFilter_1.CommonFilter {
	constructor() {
		super(...arguments),
			(this.GetPhantomItemId = (t) =>
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
					t.GetConfigId(),
				).PhantomItem.MonsterId);
	}
	OnInitFilterMap() {
		this.FilterMap.set(3, this.GetPhantomItemId),
			this.FilterMap.set(
				14,
				VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomRarity,
			),
			this.FilterMap.set(18, this.GetPhantomItemId),
			this.FilterMap.set(19, this.GetPhantomItemId),
			this.FilterMap.set(20, this.GetPhantomItemId),
			this.FilterMap.set(21, this.GetPhantomItemId),
			this.FilterMap.set(
				23,
				VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomCost,
			),
			this.FilterMap.set(
				24,
				VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomQuality,
			),
			this.FilterMap.set(
				25,
				VisionDestroyFilterLogic_1.VisionDestroyFilterLogic
					.GetVisionDestroyFetterGroup,
			),
			this.FilterMap.set(
				26,
				VisionDestroyFilterLogic_1.VisionDestroyFilterLogic
					.GetVisionDestroyAttribute,
			);
	}
}
exports.VisionDestroyFilter = VisionDestroyFilter;
