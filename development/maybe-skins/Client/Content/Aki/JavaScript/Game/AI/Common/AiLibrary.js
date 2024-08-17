"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiLibrary = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils");
class AiLibrary {
	static IsSkillAvailable(i, e, l, o, a, t, n, g, r, s, I = !1) {
		var L,
			A = i.AiSkill.SkillInfos.get(e);
		return (
			!!A &&
			!!(L = i.AiSkill.SkillPreconditionMap.get(A.SkillPreconditionId)) &&
			!(
				!L.NeedTarget ||
				(I &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("AI", 6, "Detect Skill", ["SkillInfoId", e]),
				0 <= a && A.SkillType !== a
					? (I &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("AI", 6, "FailType", ["Type", a]),
						1)
					: i.AiSkill.CanActivate(e) &&
							l.IsCanUseSkill(Number(A.SkillId)) &&
							i.AiSkill.CanActivate(e)
						? L.NeedTag &&
							(!o.Valid ||
								(i.AiSkill.PreconditionTagMap.has(A.SkillPreconditionId) &&
									!o.HasTag(
										i.AiSkill.PreconditionTagMap.get(A.SkillPreconditionId)
											.TagId,
									)))
							? (I &&
									Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("AI", 6, "FailTag"),
								1)
							: !(
									MathUtils_1.MathUtils.InRangeAngle(t, L.TargetAngleRange) &&
									MathUtils_1.MathUtils.InRange(n, L.HeightRange) &&
									(!s ||
										(MathUtils_1.MathUtils.InRange(g, L.DistanceRange) &&
											MathUtils_1.MathUtils.InRangeAngle(r, L.AngleRange)))
								) &&
								(I &&
									Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"AI",
										6,
										"FailLocation",
										["TargetAngle", t],
										["Distance", g],
										["Angle", r],
										["Height", n],
									),
								1)
						: (I && Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, "FailCD"),
							1))
			)
		);
	}
}
exports.AiLibrary = AiLibrary;
