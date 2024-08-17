"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapLifeEventDispatcher = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	MapSceneGameplayUnlock_1 = require("./MapSceneGameplayUnlock");
class MapLifeEventDispatcher {
	constructor(e) {
		(this.ZDi = void 0),
			(this.eRi = void 0),
			(this.ZDi = e),
			(this.eRi = new Map([
				[0, new MapSceneGameplayUnlock_1.MapSceneGameplayUnlock(this.ZDi)],
			]));
	}
	async OnWorldMapBeforeStartAsync() {
		var e,
			a,
			r = [];
		for ([e, a] of this.eRi)
			ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(e)
				?.State && r.push(a.OnWorldMapBeforeStartAsync());
		await Promise.all(r);
	}
	OnWorldMapBeforeShow() {
		for (var [e, a] of this.eRi)
			ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(e)
				?.State && a.OnWorldMapBeforeShow();
	}
	OnWorldMapAfterShow() {
		for (var [e, a] of this.eRi)
			ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap.get(e)
				?.State && a.OnWorldMapAfterShow();
	}
	OnWorldBeforeDestroy() {}
}
exports.MapLifeEventDispatcher = MapLifeEventDispatcher;
