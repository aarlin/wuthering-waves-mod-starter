"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuickChatText = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class QuickChatText extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.uEt = ""),
			(this.x$e = void 0),
			(this.cEt = () => {
				this.x$e && this.x$e(this.uEt);
			}),
			this.CreateThenShowByActor(e);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[1, this.cEt]]);
	}
	OnBeforeDestroy() {
		this.x$e = void 0;
	}
	Refresh(e) {
		this.GetText(0).SetText(e), (this.uEt = e);
	}
	BindOnClicked(e) {
		this.x$e = e;
	}
}
exports.QuickChatText = QuickChatText;
