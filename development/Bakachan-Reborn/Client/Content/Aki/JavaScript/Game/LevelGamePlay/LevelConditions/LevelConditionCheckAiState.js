"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckAiState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ICondition_1 = require("../../../UniverseEditor/Interface/ICondition"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckAiState extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, o, t) {
		if (!e)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelCondition", 30, "参数不合法"),
				!1
			);
		if (!t)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelCondition", 30, "上下文不合法"),
				!1
			);
		if (
			((t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
				t.EntityId,
			)),
			!t?.Valid)
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelCondition", 30, "对象Entity不合法"),
				!1
			);
		var r = t.Entity.GetComponent(185);
		let n = !1;
		switch (e.StateType) {
			case ICondition_1.EAiStateType.AnimalRandomAction:
				n = r?.HasTag(502364103) || !1;
				break;
			case ICondition_1.EAiStateType.AnimalStandUp:
				n = r?.HasTag(1900394806) || r?.HasTag(379545977) || !1;
				break;
			case ICondition_1.EAiStateType.AnimalSitDown:
				n = r?.HasTag(393622611) || r?.HasTag(276015887) || !1;
		}
		return "Eq" === e.Compare ? n : !n;
	}
}
exports.LevelConditionCheckAiState = LevelConditionCheckAiState;
