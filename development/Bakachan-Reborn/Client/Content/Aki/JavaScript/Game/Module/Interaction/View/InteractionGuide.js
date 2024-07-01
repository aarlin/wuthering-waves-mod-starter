"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InteractionGuide = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	InteractionDefine_1 = require("../InteractionDefine");
class InteractionGuide extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos.push([0, UE.UIItem], [1, UE.UIText]);
	}
	OnStart() {
		this.SetActive(!1);
	}
	OnBeforeDestroy() {}
	Refresh(e) {
		var t = this.GetText(1);
		LguiUtil_1.LguiUtil.SetLocalText(t, e),
			LguiUtil_1.LguiUtil.ReplaceWildCard(t),
			this.SetActive(!0);
	}
	RefreshTextWidth() {
		var e = this.GetText(1);
		e?.IsValid() &&
			e.GetWidth() > InteractionDefine_1.INTERACT_GUIDE_MAX_TEXT_WIDTH &&
			(e.SetWidth(InteractionDefine_1.INTERACT_GUIDE_MAX_TEXT_WIDTH),
			e.SetOverflowType(1));
	}
}
exports.InteractionGuide = InteractionGuide;
