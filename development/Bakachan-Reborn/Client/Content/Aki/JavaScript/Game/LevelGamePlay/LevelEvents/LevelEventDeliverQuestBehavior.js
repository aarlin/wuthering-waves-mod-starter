"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventDeliverQuestBehavior = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	ItemDeliverController_1 = require("../../Module/ItemDeliver/ItemDeliverController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventDeliverQuestBehavior extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, r) {
		if (e) {
			var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				e.EntityId,
			);
			let r = "";
			t && (r = t.Entity.GetComponent(102)?.PawnName ?? ""),
				ItemDeliverController_1.ItemDeliverController.OpenItemDeliverViewByHandInItem(
					e.Items,
					r,
					void 0,
					e.DescText,
				);
		}
	}
}
exports.LevelEventDeliverQuestBehavior = LevelEventDeliverQuestBehavior;
