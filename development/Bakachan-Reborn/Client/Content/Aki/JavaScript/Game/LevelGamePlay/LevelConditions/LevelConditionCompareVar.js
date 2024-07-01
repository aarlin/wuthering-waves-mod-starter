"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCompareVar = void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	IVar_1 = require("../../../UniverseEditor/Interface/IVar"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareVar extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, r, t) {
		if (!e) return !1;
		var a = e.Var1,
			n = e.Var2;
		if (a.Type !== n.Type) return !1;
		var o = this.VTn(a, t),
			l = this.VTn(n, t);
		if (void 0 === o || void 0 === l) return !1;
		switch (e.Compare) {
			case "Eq":
				return o === l;
			case "Ne":
				return o !== l;
			case "Ge":
				return l <= o;
			case "Gt":
				return l < o;
			case "Le":
				return o <= l;
			case "Lt":
				return o < l;
			default:
				return !1;
		}
	}
	VTn(e, r) {
		switch (e.Source) {
			case "Constant":
				return e.Value;
			case "Global":
				return ModelManager_1.ModelManager.WorldModel?.WorldStateMap.get(
					e.Keyword,
				);
			case "Other":
				var t = this.HTn(e.Name, e.RefId, e.RefType);
				return this.E$(t);
			case "Self":
				return r ? ((t = this.jTn(e.Name, r)), this.E$(t)) : void 0;
			default:
				return;
		}
	}
	jTn(e, r) {
		switch (r.Type) {
			case 1:
				var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
					r.EntityId,
				);
				if (t) return t.Entity?.GetComponent(0)?.GetEntityVar(e);
				break;
			case 6:
				return ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
					r.TreeIncId,
				)?.GetTreeVarByKey(e);
			case 5:
				if (
					((t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
						r.TriggerEntityId,
					)),
					t)
				)
					return t.Entity?.GetComponent(0)?.GetEntityVar(e);
				break;
			default:
				return;
		}
	}
	HTn(e, r, t) {
		switch (t) {
			case "Entity":
				var a =
					ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(r);
				if (a) return a.Entity?.GetComponent(0)?.GetEntityVar(e);
				break;
			case "Quest":
				return ModelManager_1.ModelManager.QuestNewModel.GetQuest(
					r,
				)?.Tree?.GetTreeVarByKey(e);
			case "LevelPlay":
				return ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
					r,
				)?.Tree?.GetTreeVarByKey(e);
			default:
				return;
		}
	}
	E$(e) {
		if (e)
			switch ((0, IVar_1.getVarTypeByIndex)(e.xMs)) {
				case "Boolean":
					return e.bMs;
				case "Float":
					return e.GMs;
				case "Int":
					return MathUtils_1.MathUtils.LongToNumber(e.BMs);
				case "String":
					return e.qMs;
				default:
					return;
			}
	}
}
exports.LevelConditionCompareVar = LevelConditionCompareVar;
