"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionTargetTagCheck = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionTargetTagCheck extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, t) {
		if (e.LimitParams) {
			var r = e.LimitParams.get("CreatureGen"),
				i = e.LimitParams.get("Tag"),
				a = e.LimitParams.get("CheckTag");
			if (r && i && a) {
				var n = e.LimitParams.get("MatchAll"),
					o =
						((e = e.LimitParams.get("Negative")),
						(r = UE.KismetStringLibrary.Conv_StringToInt64(r)),
						new Array());
				if (
					(ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(
						r,
						o,
					),
					o.length)
				) {
					r = n && n === StringUtils_1.ONE_STRING;
					var s = e && e === StringUtils_1.ONE_STRING;
					let t = !1;
					if (r) {
						for (const e of o) {
							var g = e.Entity.GetComponent(0);
							if (!g.ContainsTag(i)) return t;
							if (((t = g.ContainsTag(a)), s && t)) return !1;
							if (!t) return t;
						}
						return t;
					}
					for (const e of o) {
						var l = e.Entity.GetComponent(0);
						if (l.ContainsTag(i)) {
							if (((t = l.ContainsTag(a)), s && !t)) return !0;
							if (t) return t;
						}
					}
				}
			}
		}
		return !1;
	}
}
exports.LevelConditionTargetTagCheck = LevelConditionTargetTagCheck;
