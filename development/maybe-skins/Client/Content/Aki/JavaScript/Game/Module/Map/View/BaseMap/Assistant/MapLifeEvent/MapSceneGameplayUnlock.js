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
			a = this.TargetExpressionMap.GetMarkItemsByType(19),
			r = this.TargetExpressionMap.GetMarkItemsByType(10);
		a && e.push(...a.values()),
			r && e.push(...r.values()),
			e.forEach((e) => {
				e &&
					e.MarkConfig &&
					((e.IsCanShowView = !1),
					e.ViewUpdateAsync(
						GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
					));
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
