"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCompareEntityGroupState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareEntityGroupState extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, t) {
		if (!e) return !1;
		var o = e.GroupCondition.Count;
		const n = e.GroupCondition.Compare;
		let r = 0;
		return (
			e.GroupCondition.Conditions?.forEach((e) => {
				var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
					e.EntityId,
				);
				let o = !0;
				if (void 0 !== e.State) {
					var a = t?.Entity?.GetComponent(177);
					if (!a) return;
					(a = a.ContainsTagByName(e.State)), (o = "Eq" === n ? a : !a);
				}
				let i = !0;
				if (void 0 !== e.IsLocked) {
					if (((a = t?.Entity?.GetComponent(115)), !a)) return;
					(t = e.IsLocked === a.IsLocked), (i = "Eq" === n ? t : !t);
				}
				o && i && ++r;
			}),
			r === o
		);
	}
}
exports.LevelConditionCompareEntityGroupState =
	LevelConditionCompareEntityGroupState;
