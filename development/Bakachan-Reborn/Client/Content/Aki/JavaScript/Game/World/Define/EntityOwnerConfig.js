"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityOwnerConfig = void 0);
const EntityOwnerDataByGuid_1 = require("../../../Core/Define/ConfigQuery/EntityOwnerDataByGuid"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class EntityOwnerConfig extends ConfigBase_1.ConfigBase {
	GetEntityOwnerConfig(e) {
		if (
			(e = EntityOwnerDataByGuid_1.configEntityOwnerDataByGuid.GetConfig(e, !1))
		)
			return e;
	}
}
exports.EntityOwnerConfig = EntityOwnerConfig;
