"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MailConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	MailFilterAll_1 = require("../../../Core/Define/ConfigQuery/MailFilterAll"),
	MailFilterById_1 = require("../../../Core/Define/ConfigQuery/MailFilterById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class MailConfig extends ConfigBase_1.ConfigBase {
	GetMailSize() {
		return CommonParamById_1.configCommonParamById.GetIntConfig("mail_size");
	}
	GetAllMailFilterConfig() {
		return MailFilterAll_1.configMailFilterAll.GetConfigList() || [];
	}
	GetFilterTypeList() {
		let e = [];
		for (const i of this.GetAllMailFilterConfig()) 3 !== i.Id && e.push(i.Id);
		return e.sort((e, i) => e - i);
	}
	GetMailFilterConfigById(e) {
		var i = MailFilterById_1.configMailFilterById.GetConfig(e);
		return (
			i ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Mail", 50, "缺少邮件筛选配置 ID:", ["id", e])),
			i
		);
	}
}
exports.MailConfig = MailConfig;
