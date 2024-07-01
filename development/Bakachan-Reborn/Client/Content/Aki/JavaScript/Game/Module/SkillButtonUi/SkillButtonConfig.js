"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillButtonConfig = void 0);
const SkillButtonByRoleId_1 = require("../../../Core/Define/ConfigQuery/SkillButtonByRoleId"),
	SkillButtonEffectById_1 = require("../../../Core/Define/ConfigQuery/SkillButtonEffectById"),
	SkillButtonIndexById_1 = require("../../../Core/Define/ConfigQuery/SkillButtonIndexById"),
	SkillCommonButtonAll_1 = require("../../../Core/Define/ConfigQuery/SkillCommonButtonAll"),
	SkillIconByTag_1 = require("../../../Core/Define/ConfigQuery/SkillIconByTag"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SkillButtonConfig extends ConfigBase_1.ConfigBase {
	GetAllSkillButtonConfig(o) {
		return SkillButtonByRoleId_1.configSkillButtonByRoleId.GetConfigList(o);
	}
	GetAllSkillCommonButtonConfig() {
		return SkillCommonButtonAll_1.configSkillCommonButtonAll.GetConfigList();
	}
	GetSkillIndexConfig(o) {
		return SkillButtonIndexById_1.configSkillButtonIndexById.GetConfig(o);
	}
	GetSkillIconConfigByTag(o) {
		return SkillIconByTag_1.configSkillIconByTag.GetConfig(o);
	}
	GetSkillButtonEffectConfig(o) {
		return SkillButtonEffectById_1.configSkillButtonEffectById.GetConfig(o);
	}
}
exports.SkillButtonConfig = SkillButtonConfig;
