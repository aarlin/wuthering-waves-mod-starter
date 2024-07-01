"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeConfig = void 0);
const ElementLevelByLevel_1 = require("../../../Core/Define/ConfigQuery/ElementLevelByLevel"),
	RogueAffixById_1 = require("../../../Core/Define/ConfigQuery/RogueAffixById"),
	RogueBuffPoolById_1 = require("../../../Core/Define/ConfigQuery/RogueBuffPoolById"),
	RogueCharacterBuffById_1 = require("../../../Core/Define/ConfigQuery/RogueCharacterBuffById"),
	RogueCharacterById_1 = require("../../../Core/Define/ConfigQuery/RogueCharacterById"),
	RogueCurrencyById_1 = require("../../../Core/Define/ConfigQuery/RogueCurrencyById"),
	RogueEventById_1 = require("../../../Core/Define/ConfigQuery/RogueEventById"),
	RogueParamById_1 = require("../../../Core/Define/ConfigQuery/RogueParamById"),
	RoguePokemonById_1 = require("../../../Core/Define/ConfigQuery/RoguePokemonById"),
	RoguePopularEntrieArgBySeasonIdAndInstId_1 = require("../../../Core/Define/ConfigQuery/RoguePopularEntrieArgBySeasonIdAndInstId"),
	RogueQualityConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueQualityConfigById"),
	RogueRoomTypeById_1 = require("../../../Core/Define/ConfigQuery/RogueRoomTypeById"),
	RogueSeasonAll_1 = require("../../../Core/Define/ConfigQuery/RogueSeasonAll"),
	RogueSeasonById_1 = require("../../../Core/Define/ConfigQuery/RogueSeasonById"),
	RogueSeasonRewardBySeasonId_1 = require("../../../Core/Define/ConfigQuery/RogueSeasonRewardBySeasonId"),
	RogueTalentTreeAll_1 = require("../../../Core/Define/ConfigQuery/RogueTalentTreeAll"),
	RogueTalentTreeById_1 = require("../../../Core/Define/ConfigQuery/RogueTalentTreeById"),
	RogueTalentTreeDescById_1 = require("../../../Core/Define/ConfigQuery/RogueTalentTreeDescById"),
	RogueTokenBySeasonId_1 = require("../../../Core/Define/ConfigQuery/RogueTokenBySeasonId"),
	RougeMiraclecreationById_1 = require("../../../Core/Define/ConfigQuery/RougeMiraclecreationById"),
	RougePopularEntrieAll_1 = require("../../../Core/Define/ConfigQuery/RougePopularEntrieAll"),
	RougePopularEntrieById_1 = require("../../../Core/Define/ConfigQuery/RougePopularEntrieById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RoguelikeConfig extends ConfigBase_1.ConfigBase {
	GetRogueBuffConfig(e) {
		return RogueBuffPoolById_1.configRogueBuffPoolById.GetConfig(e);
	}
	GetRogueCharacterConfig(e) {
		return RogueCharacterById_1.configRogueCharacterById.GetConfig(e);
	}
	GetRoguePhantomConfig(e) {
		if (0 !== e) return RoguePokemonById_1.configRoguePokemonById.GetConfig(e);
	}
	GetRogueAffixConfig(e) {
		return RogueAffixById_1.configRogueAffixById.GetConfig(e);
	}
	GetRogueCharacterBuffConfig(e) {
		return RogueCharacterBuffById_1.configRogueCharacterBuffById.GetConfig(e);
	}
	GetRogueTalentTreeConfig() {
		return RogueTalentTreeAll_1.configRogueTalentTreeAll.GetConfigList() ?? [];
	}
	GetRogueTalentTreeById(e) {
		return RogueTalentTreeById_1.configRogueTalentTreeById.GetConfig(e);
	}
	GetRogueTalentTreeDescConfig(e) {
		return RogueTalentTreeDescById_1.configRogueTalentTreeDescById.GetConfig(e);
	}
	GetRogueParamConfig(e = 1) {
		return RogueParamById_1.configRogueParamById.GetConfig(e);
	}
	GetRogueCurrencyConfig(e) {
		return RogueCurrencyById_1.configRogueCurrencyById.GetConfig(e);
	}
	GetRogueSeasonReward(e) {
		return RogueSeasonRewardBySeasonId_1.configRogueSeasonRewardBySeasonId.GetConfigList(
			e,
		);
	}
	GetRogueTokenBySeasonId(e = 0) {
		return RogueTokenBySeasonId_1.configRogueTokenBySeasonId.GetConfigList(e);
	}
	GetRogueSeasonConfigById(e) {
		return RogueSeasonById_1.configRogueSeasonById.GetConfig(e);
	}
	GetRogueSeasonConfigList() {
		return RogueSeasonAll_1.configRogueSeasonAll.GetConfigList();
	}
	GetRogueEventConfigById(e) {
		return RogueEventById_1.configRogueEventById.GetConfig(e);
	}
	GetRogueQualityConfigByQualityId(e) {
		return RogueQualityConfigById_1.configRogueQualityConfigById.GetConfig(e);
	}
	GetElementLevelConfigById(e) {
		return ElementLevelByLevel_1.configElementLevelByLevel.GetConfig(e);
	}
	GetRoguelikeRoomTypeConfigById(e) {
		return RogueRoomTypeById_1.configRogueRoomTypeById.GetConfig(e);
	}
	GetRoguelikePopularEntriesById(e) {
		return RougePopularEntrieById_1.configRougePopularEntrieById.GetConfig(e);
	}
	GetRoguelikePopularEntries() {
		return RougePopularEntrieAll_1.configRougePopularEntrieAll.GetConfigList();
	}
	GetRoguelikeSpecialConfig(e) {
		return RougeMiraclecreationById_1.configRougeMiraclecreationById.GetConfig(
			e,
		);
	}
	GetRoguePopularEntrieArg(e, o) {
		return RoguePopularEntrieArgBySeasonIdAndInstId_1.configRoguePopularEntrieArgBySeasonIdAndInstId.GetConfig(
			e,
			o,
		);
	}
}
exports.RoguelikeConfig = RoguelikeConfig;
