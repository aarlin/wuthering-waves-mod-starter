"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TextConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	GenderTextByMaleText_1 = require("../../../Core/Define/ConfigQuery/GenderTextByMaleText"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	TextById_1 = require("../../../Core/Define/ConfigQuery/TextById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class TextConfig extends ConfigBase_1.ConfigBase {
	GetTextById(e) {
		if ((e = this.GetTextContentIdById(e)))
			return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
	}
	GetTextContentIdById(e) {
		var t = TextById_1.configTextById.GetConfig(e)?.Text ?? void 0;
		return (
			t ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("TextUtil", 17, "Text表查找不到Id = ", ["id", e])),
			t
		);
	}
	GetGenderTextById(e, t) {
		var r = GenderTextByMaleText_1.configGenderTextByMaleText.GetConfig(e);
		if (r) return t ? r.MaleText : r.FemaleText;
		Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn("TextUtil", 36, "GenderText表查找不到Id = ", ["id", e]);
	}
}
exports.TextConfig = TextConfig;
