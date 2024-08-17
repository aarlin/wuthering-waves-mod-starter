"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleResonanceConfig = void 0);
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ResonantChainByGroupId_1 = require("../../../../Core/Define/ConfigQuery/ResonantChainByGroupId"),
	ResonantChainById_1 = require("../../../../Core/Define/ConfigQuery/ResonantChainById"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class RoleResonanceConfig extends ConfigBase_1.ConfigBase {
	GetRoleResonanceList(e) {
		if (
			(e = ConfigCommon_1.ConfigCommon.ToList(
				ResonantChainByGroupId_1.configResonantChainByGroupId.GetConfigList(e),
			))
		)
			return e.sort((e, n) => e.GroupIndex - n.GroupIndex), e;
	}
	GetRoleResonanceById(e) {
		return ResonantChainById_1.configResonantChainById.GetConfig(e);
	}
	GetResonanceMaxLevel() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"ResonantChainMaxLevel",
		);
	}
}
exports.RoleResonanceConfig = RoleResonanceConfig;
