"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ButtonAndSpriteItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ButtonAndSpriteItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.yVe = void 0),
			(this.RefreshAllTransitionSprite = () => {
				var e,
					t = this.GetUiSpriteTransition(2);
				t && (e = this.GetSprite(1)) && t.SetAllTransitionSprite(e.GetSprite());
			}),
			(this.Kyt = () => {
				this.yVe && this.yVe();
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UISprite],
			[2, UE.UISpriteTransition],
		]),
			(this.BtnBindInfo = [[0, this.Kyt]]);
	}
	RefreshSprite(e) {
		(e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Temp", 44, "realPath:  ", ["realPath", e]),
			this.SetSpriteByPath(
				e,
				this.GetSprite(1),
				!1,
				void 0,
				this.RefreshAllTransitionSprite,
			);
	}
	RefreshEnable(e) {
		this.GetButton(0).SetSelfInteractive(e);
	}
	BindCallback(e) {
		this.yVe = e;
	}
}
exports.ButtonAndSpriteItem = ButtonAndSpriteItem;
