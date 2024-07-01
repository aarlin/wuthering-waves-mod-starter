"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckTargetAttribute = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ICondition_1 = require("../../../UniverseEditor/Interface/ICondition"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTargetAttribute extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, t) {
		return (
			(e = e.Option).Type === ICondition_1.ETargetType.Player && this.iLe(e)
		);
	}
	iLe(e) {
		return (
			e.Option === ICondition_1.EPlayerCheckType.AnyRole &&
			this.oLe(
				ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(),
				e.AttributeTypes,
			)
		);
	}
	oLe(e, t) {
		let r = !1;
		for (const o of e) {
			let e = !0;
			for (const r of t)
				if (
					(r.Type === ICondition_1.EPlayerAttributeType.Health &&
						(e &&= this.rLe(o, r)),
					!e)
				)
					break;
			if ((r ||= e)) return !0;
		}
		return r;
	}
	rLe(e, t) {
		if (((e = e.Entity?.GetComponent(156)), !e)) return !1;
		var r =
			(e.GetCurrentValue(Protocol_1.Aki.Protocol.KBs.Proto_Life) /
				e.GetCurrentValue(Protocol_1.Aki.Protocol.KBs.Tkn)) *
			100;
		switch (t.Compare) {
			case "Eq":
				return r === t.Value;
			case "Ne":
				return r !== t.Value;
			case "Ge":
				return r >= t.Value;
			case "Gt":
				return r > t.Value;
			case "Le":
				return r <= t.Value;
			case "Lt":
				return r < t.Value;
			default:
				return !1;
		}
	}
}
exports.LevelConditionCheckTargetAttribute = LevelConditionCheckTargetAttribute;
