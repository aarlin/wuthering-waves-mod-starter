"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventPickupDropItem = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	RewardController_1 = require("../../Module/Reward/RewardController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPickupDropItem extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.q6s = (e) => {
				this.FinishExecute(e);
			});
	}
	ExecuteNew(e, t) {
		(e &&
			((e = e.EntityId), (e = EntitySystem_1.EntitySystem.Get(e))?.Valid) &&
			((e = e.GetComponent(0)),
			RewardController_1.RewardController.PickUpFightDrop(
				e.GetCreatureDataId(),
				e.GetPbDataId(),
				this.q6s,
			))) ||
			this.FinishExecute(!1);
	}
}
exports.LevelEventPickupDropItem = LevelEventPickupDropItem;
