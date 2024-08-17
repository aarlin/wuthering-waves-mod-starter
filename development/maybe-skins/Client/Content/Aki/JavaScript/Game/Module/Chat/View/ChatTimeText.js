"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatTimeText = void 0);
const UE = require("ue"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ChatTimeText extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	Refresh(e) {
		var t = this.GetText(0);
		e = TimeUtil_1.TimeUtil.DateFormatString(e);
		t.SetText(e);
	}
}
exports.ChatTimeText = ChatTimeText;
