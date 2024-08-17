"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FeedbackConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	CommonParamLang_1 = require("../../../Core/Define/ConfigCommon/CommonParamLang");
class FeedbackConfig {
	static GetFeedbackTitle() {
		var e =
			CommonParamById_1.configCommonParamById.GetIntConfig("FeedbackTitle") ??
			0;
		return CommonParamLang_1.configCommonParamLang.GetLocalText(e);
	}
	static GetFeedbackPreUrl() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"FeedbackUrl",
		);
	}
}
exports.FeedbackConfig = FeedbackConfig;
