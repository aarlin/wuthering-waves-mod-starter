"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkipTaskEnterEntrance = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
	WorldMapController_1 = require("../../WorldMap/WorldMapController"),
	SkipTask_1 = require("./SkipTask"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class SkipTaskEnterEntrance extends SkipTask_1.SkipTask {
	OnRun(e, r, n) {
		(e = Number(e)),
			InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.InstEntranceDetailRequest(
				e,
			).then(
				(e) => {
					e || this.Finish(),
						ModelManager_1.ModelManager.InstanceDungeonEntranceModel
							.EntranceInstanceIdList.length <= 0 &&
							(ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"InstanceTime",
							),
							this.Finish());
					e = Number(r);
					var o,
						a = Number(n);
					UiManager_1.UiManager.IsViewShow("WorldMapView") &&
					(o = ModelManager_1.ModelManager.WorldMapModel)
						.CurrentFocalMarkType === e &&
					o.CurrentFocalMarkId === a
						? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"IsInView",
							)
						: WorldMapController_1.WorldMapController.FocalMarkItem(e, a),
						this.Finish();
				},
				() => {},
			);
	}
}
exports.SkipTaskEnterEntrance = SkipTaskEnterEntrance;
