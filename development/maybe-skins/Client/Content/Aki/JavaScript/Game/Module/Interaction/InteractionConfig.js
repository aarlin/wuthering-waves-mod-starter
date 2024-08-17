"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InteractionConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	InteractDataByGuid_1 = require("../../../Core/Define/ConfigQuery/InteractDataByGuid"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class InteractionConfig extends ConfigBase_1.ConfigBase {
	GetInteractionConfig(e) {
		var o = InteractDataByGuid_1.configInteractDataByGuid.GetConfig(e, !1);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Interaction", 43, "找不到交互配置", [
						"Interact GUID",
						e,
					])),
			o
		);
	}
}
exports.InteractionConfig = InteractionConfig;
