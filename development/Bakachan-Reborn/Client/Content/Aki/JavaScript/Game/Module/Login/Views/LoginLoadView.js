"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoginLoadView = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class LoginLoadView extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.xpi = void 0),
			(this.FMi = void 0),
			this.CreateThenShowByActor(e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIText],
		];
	}
	OnStart() {
		(this.xpi = this.GetText(1)), (this.FMi = this.GetText(2));
	}
	SetDownLoadTipsTextActive(e) {
		this.FMi.SetUIActive(e);
	}
	SetDownLoadTipsText(e) {
		LguiUtil_1.LguiUtil.SetLocalText(this.FMi, e);
	}
	SetProgressSprite(e) {
		this.GetSprite(0).SetFillAmount(e);
	}
	SetProgressText(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalText(this.xpi, e, t);
	}
}
exports.LoginLoadView = LoginLoadView;
