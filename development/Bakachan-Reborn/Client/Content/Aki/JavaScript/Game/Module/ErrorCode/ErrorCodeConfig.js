"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ErrorCodeConfig = void 0);
const Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	ErrorCodeById_1 = require("../../../Core/Define/ConfigQuery/ErrorCodeById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
class ErrorCodeConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.Q4t = 0);
	}
	SetForceShowDebugErrorType(e) {
		this.Q4t = e;
	}
	GetConfigByCode(e) {
		var r = ErrorCodeById_1.configErrorCodeById.GetConfig(e);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("ErrorCode", 9, "没有错误码配置", ["code", e])),
			r
		);
	}
	GetTextByErrorId(e) {
		return (e = this.GetConfigByCode(e))
			? Info_1.Info.IsBuildDevelopmentOrDebug && 0 === this.Q4t
				? e.DebugText
				: StringUtils_1.StringUtils.IsEmpty(e.Text)
					? ConfigManager_1.ConfigManager.TextConfig.GetTextById(
							"UnknownErrorCodeText",
						)
					: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Text) ?? ""
			: "";
	}
	GetTextKeyByErrorId(e) {
		return (e = this.GetConfigByCode(e))
			? StringUtils_1.StringUtils.IsEmpty(e.Text)
				? ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
						"UnknownErrorCodeText",
					)
				: e.Text
			: "";
	}
	IsTipsOnly(e) {
		return this.GetConfigByCode(e)?.IsTip ?? !1;
	}
}
exports.ErrorCodeConfig = ErrorCodeConfig;
