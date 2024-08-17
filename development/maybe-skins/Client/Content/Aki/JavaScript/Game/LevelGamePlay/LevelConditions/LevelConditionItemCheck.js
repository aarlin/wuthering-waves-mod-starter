"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionItemCheck = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionItemCheck extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, t) {
		var n;
		return (
			!!e.LimitParams &&
			((n = e.LimitParams.get("ItemID")), (e = e.NeedNum), !!n) &&
			e <=
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					parseInt(n),
				)
		);
	}
	CheckNew(e, t) {
		if (!e) return !1;
		if (!e.Items?.length) return !0;
		let n = !1;
		"Eq" === e.Compare && (n = !0);
		for (const t of e.Items) {
			var r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				t.ItemId,
			);
			if (t.Count > r) return !n;
		}
		return n;
	}
}
exports.LevelConditionItemCheck = LevelConditionItemCheck;
