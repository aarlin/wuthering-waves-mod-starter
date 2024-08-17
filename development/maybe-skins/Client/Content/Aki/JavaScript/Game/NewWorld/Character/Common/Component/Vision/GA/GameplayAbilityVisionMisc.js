"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.getLineTrace =
		exports.skillTag =
		exports.invincibleTag =
		exports.summonTag =
		exports.morphTag =
		exports.controlVisionEnergy =
		exports.VISION_END_BULLET =
		exports.EXPLORE_SKILL_ID =
		exports.VISION_HIDDEN_DELAY =
		exports.CHARACTER_HIDDEN_DELAY =
		exports.summonParticleCueId =
		exports.morphParticleCueId =
		exports.materialCueId =
		exports.damageReductionBuffId =
		exports.roleAppearBuffId =
		exports.visionAppearBuffId =
		exports.roleHideBuffId =
		exports.visionSummonBuffId =
		exports.roleSummonBuffId =
			void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../../../../../Core/Define/QueryTypeDefine"),
	GlobalData_1 = require("../../../../../../GlobalData"),
	CharacterBuffIds_1 = require("../../Abilities/CharacterBuffIds");
(exports.roleSummonBuffId =
	CharacterBuffIds_1.gameplayAbilityVisionBuffId.RoleSummonBuffId),
	(exports.visionSummonBuffId =
		CharacterBuffIds_1.gameplayAbilityVisionBuffId.VisionSummonBuffId),
	(exports.roleHideBuffId =
		CharacterBuffIds_1.gameplayAbilityVisionBuffId.RoleHideBuffId),
	(exports.visionAppearBuffId =
		CharacterBuffIds_1.gameplayAbilityVisionBuffId.VisionAppearBuffId),
	(exports.roleAppearBuffId =
		CharacterBuffIds_1.gameplayAbilityVisionBuffId.RoleAppearBuffId),
	(exports.damageReductionBuffId =
		CharacterBuffIds_1.gameplayAbilityVisionBuffId.DamageReductionBuffId),
	(exports.materialCueId =
		CharacterBuffIds_1.gameplayAbilityVisionBuffId.MaterialCueId),
	(exports.morphParticleCueId =
		CharacterBuffIds_1.gameplayAbilityVisionBuffId.MorphParticleCueId),
	(exports.summonParticleCueId =
		CharacterBuffIds_1.gameplayAbilityVisionBuffId.SummonParticleCueId),
	(exports.CHARACTER_HIDDEN_DELAY = 300),
	(exports.VISION_HIDDEN_DELAY = 1e3),
	(exports.EXPLORE_SKILL_ID = 12e5),
	(exports.VISION_END_BULLET = "210000004"),
	(exports.controlVisionEnergy = Protocol_1.Aki.Protocol.Bks.Proto_Life),
	(exports.morphTag = -2100129479),
	(exports.summonTag = -1369542279),
	(exports.invincibleTag = -208062360),
	(exports.skillTag = -1371021686);
let lineTrace = void 0;
function getLineTrace() {
	return (
		lineTrace ||
			(((lineTrace = UE.NewObject(
				UE.TraceLineElement.StaticClass(),
			)).bIsSingle = !0),
			(lineTrace.bIgnoreSelf = !0),
			lineTrace.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
			),
			lineTrace.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
			)),
		(lineTrace.WorldContextObject = GlobalData_1.GlobalData.World),
		lineTrace.ClearCacheData(),
		lineTrace
	);
}
exports.getLineTrace = getLineTrace;
//# sourceMappingURL=GameplayAbilityVisionMisc.js.map
