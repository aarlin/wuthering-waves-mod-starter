"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NoticeConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	CommonParamLang_1 = require("../../../Core/Define/ConfigCommon/CommonParamLang");
class NoticeConfig {
	static GetNoticeTitle() {
		var o =
			CommonParamById_1.configCommonParamById.GetIntConfig("NoticeTitle") ?? 0;
		return CommonParamLang_1.configCommonParamLang.GetLocalText(o);
	}
	static GetNoticeUrl() {
		return CommonParamById_1.configCommonParamById.GetStringConfig("NoticeUrl");
	}
}
exports.NoticeConfig = NoticeConfig;
