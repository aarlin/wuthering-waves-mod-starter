"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkNameComponent = void 0);
const UE = require("ue"),
	MarkComponent_1 = require("./MarkComponent"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
class MarkNameComponent extends MarkComponent_1.MarkComponent {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	SetName(e, t, n, o) {
		var r = this.GetText(0);
		r &&
			(o && r.SetFontSize(o),
			(o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
			(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)),
			r.SetText(StringUtils_1.StringUtils.Format(o, e, n)));
	}
}
exports.MarkNameComponent = MarkNameComponent;
