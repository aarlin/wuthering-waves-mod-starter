"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckJigsawInfo = void 0);
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckJigsawInfo extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e) {
		if (!e) return !1;
		var n = e;
		let t = !1;
		switch (n.JigsawCondition.Type) {
			case ICondition_1.ECheckJigsawInfoType.CheckJigsawItemPlaceIndex:
				t = this.r9s(n.JigsawCondition);
				break;
			case ICondition_1.ECheckJigsawInfoType.CheckJigsawItemMove:
				t = this.o9s(n.JigsawCondition);
		}
		return "Eq" === n.JigsawCondition.Compare ? t : !t;
	}
	r9s(e) {
		var n,
			t = e.FoundationEntityId;
		t =
			ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				t,
			)?.Entity?.GetComponent(121);
		return (
			!!t &&
			((n = e.ItemEntityId),
			!!(n =
				ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
					n,
				)?.Entity?.GetComponent(122))) &&
			!!t.GetAllItemOnBase().includes(n) &&
			((t = t.GetPutItemIndex(n)),
			(n = e.PlaceIndex),
			t.Col === n.ColumnIndex) &&
			t.Row === n.RowIndex
		);
	}
	o9s(e) {
		(e = e.ItemEntityId),
			(e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e));
		return (
			!!e?.Entity?.GetComponent(139) &&
			!!(e = e?.Entity?.GetComponent(113)) &&
			e.IsMoving
		);
	}
}
exports.LevelConditionCheckJigsawInfo = LevelConditionCheckJigsawInfo;
