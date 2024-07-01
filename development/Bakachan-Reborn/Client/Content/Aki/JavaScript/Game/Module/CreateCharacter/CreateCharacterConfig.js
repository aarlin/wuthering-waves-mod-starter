"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CreateCharacterConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class CreateCharacterConfig extends ConfigBase_1.ConfigBase {
	GetInitialRoles() {
		var e =
			CommonParamById_1.configCommonParamById.GetIntArrayConfig("initial_role");
		return (
			2 !== e.length &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("CreateCharacter", 9, "初始化角色数量错误, 应该为2", [
					"count",
					e.length,
				]),
			e
		);
	}
	GetInitName() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"default_name_prefix",
		);
	}
}
exports.CreateCharacterConfig = CreateCharacterConfig;
