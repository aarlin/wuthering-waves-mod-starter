"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapSceneGameplayUnlock = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	GeneralLogicTreeUtil_1 = require("../../../../../GeneralLogicTree/GeneralLogicTreeUtil"),
	MapLifeEventListener_1 = require("./MapLifeEventListener");
class MapSceneGameplayUnlock extends MapLifeEventListener_1.MapLifeEventListener {
	constructor() {
		super(...arguments), (this.Pe = void 0);
	}
	OnWorldMapBeforeShow() {
		this.Pe =
			ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(
				0,
			).Data;
		var e = [],
			r = this.TargetExpressionMap.GetMarkItemsByType(19),
			i = this.TargetExpressionMap.GetMarkItemsByType(10);
		r && e.push(...r.values()),
			i && e.push(...i.values()),
			e.forEach((e) => {
				e &&
					e.MarkConfig &&
					((e.IsCanShowView = !1),
					e
						.ViewUpdateAsync(
							GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
						)
						.finally(void 0));
			});
	}
	OnWorldMapAfterShow() {
		this.TargetExpressionMap.HandleSceneGamePlayMarkItemOpen(
			19,
			this.Pe.RelativeType,
			this.Pe.RelativeSubType,
		),
			this.TargetExpressionMap.HandleSceneGamePlayMarkItemOpen(
				10,
				this.Pe.RelativeType,
				this.Pe.RelativeSubType,
			),
			(ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(
				0,
			).State = !1);
	}
}
exports.MapSceneGameplayUnlock = MapSceneGameplayUnlock;
//# sourceMappingURL=MapSceneGameplayUnlock.js.map
