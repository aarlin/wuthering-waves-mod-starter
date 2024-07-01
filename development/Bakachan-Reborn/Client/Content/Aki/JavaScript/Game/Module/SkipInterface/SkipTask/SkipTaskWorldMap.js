"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkipTaskWorldMap = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	WorldMapController_1 = require("../../WorldMap/WorldMapController"),
	SkipTask_1 = require("./SkipTask"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class SkipTaskWorldMap extends SkipTask_1.SkipTask {
	OnRun(r, e) {
		var o;
		(r = Number(r)), (e = Number(e));
		UiManager_1.UiManager.IsViewShow("WorldMapView") &&
		(o = ModelManager_1.ModelManager.WorldMapModel).CurrentFocalMarkType ===
			r &&
		o.CurrentFocalMarkId === e
			? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"IsInView",
				)
			: WorldMapController_1.WorldMapController.FocalMarkItem(r, e),
			this.Finish();
	}
}
exports.SkipTaskWorldMap = SkipTaskWorldMap;
