"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionItemCountByType = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionItemCountByType extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, t) {
		var a, o;
		return (
			!!e.LimitParams &&
			void 0 !== (a = Number(e.LimitParams.get("ItemType"))) &&
			((o = Number(e.LimitParams.get("Value"))),
			!!(e = e.LimitParams.get("Op"))) &&
			this.CheckCompareValue(
				e,
				ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByItemType(a)
					.size,
				o,
			)
		);
	}
}
exports.LevelConditionItemCountByType = LevelConditionItemCountByType;
