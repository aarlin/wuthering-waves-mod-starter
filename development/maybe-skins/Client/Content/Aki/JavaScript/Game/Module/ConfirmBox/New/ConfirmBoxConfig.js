"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConfirmBoxConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ConfirmBoxById_1 = require("../../../../Core/Define/ConfigQuery/ConfirmBoxById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class ConfirmBoxConfig extends ConfigBase_1.ConfigBase {
	GetConfirmBoxConfig(e) {
		var o = ConfirmBoxById_1.configConfirmBoxById.GetConfig(e);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"ConfirmBox",
						11,
						"原因:确认框.xlsx表格查找不到对应的配置id 解决:策划查看是否有配置对应的id",
						["配置id", e],
					)),
			o
		);
	}
	GetTitle(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
	}
	GetContent(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
	}
	GetSecondaryContent(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
	}
	GetButtonText(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
	}
	GetUiShowType(e) {
		return this.GetConfirmBoxConfig(e).UiShowType;
	}
}
exports.ConfirmBoxConfig = ConfirmBoxConfig;
