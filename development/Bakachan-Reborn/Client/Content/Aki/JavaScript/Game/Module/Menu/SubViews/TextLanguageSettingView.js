"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TextLanguageToggle = exports.TextLanguageSettingView = void 0);
const LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class TextLanguageSettingView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
	CreateToggle(e, t, g) {
		var a = new TextLanguageToggle();
		return a.Initialize(e, t, g), a;
	}
	OnRefreshView(e) {
		var t = this.MenuDataIns.MenuDataOptionsNameList[e.GetIndex()];
		e.SetMainText(t);
	}
	OnSelected(e, t) {
		e.SetSpriteActive(!0);
	}
}
exports.TextLanguageSettingView = TextLanguageSettingView;
class TextLanguageToggle extends LanguageSettingViewBase_1.LanguageToggleBase {
	OnStart() {
		super.OnStart(), this.GetText(2).SetUIActive(!1);
	}
	SetSpriteActive(e) {}
}
exports.TextLanguageToggle = TextLanguageToggle;
