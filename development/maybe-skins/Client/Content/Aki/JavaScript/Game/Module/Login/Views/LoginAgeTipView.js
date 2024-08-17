"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoginAgeTipView = exports.ELoginShowType = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	UiManager_1 = require("../../../Ui/UiManager");
var ELoginShowType;
!(function (e) {
	(e[(e.AgeTip = 0)] = "AgeTip"),
		(e[(e.UserAgreement = 1)] = "UserAgreement"),
		(e[(e.PrivacyAgreement = 2)] = "PrivacyAgreement"),
		(e[(e.ChildPrivacyAgreement = 3)] = "ChildPrivacyAgreement"),
		(e[(e.LoginNotice = 4)] = "LoginNotice");
})((ELoginShowType = exports.ELoginShowType || (exports.ELoginShowType = {})));
class LoginAgeTipView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.BMi = () => {
				UiLayer_1.UiLayer.SetShowNormalMaskLayer(!1),
					UiManager_1.UiManager.CloseView("LoginAgeTipView");
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIText],
		]),
			(this.BtnBindInfo = [[3, this.BMi]]);
	}
	OnStart() {
		this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
			this.BMi();
		});
		var e = this.OpenParam;
		this.bMi(e), this.qMi(e);
	}
	bMi(e) {
		switch (e) {
			case ELoginShowType.AgeTip:
				this.GetText(0).SetUIActive(!0),
					this.GetText(0).SetText(
						ConfigManager_1.ConfigManager.TextConfig.GetTextById("AgeTip"),
					);
				break;
			case ELoginShowType.UserAgreement:
			case ELoginShowType.PrivacyAgreement:
			case ELoginShowType.ChildPrivacyAgreement:
				this.GMi(
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						ELoginShowType[e],
					),
				);
				break;
			case ELoginShowType.LoginNotice:
				ModelManager_1.ModelManager.LoginModel.LoginNotice &&
					this.GMi(ModelManager_1.ModelManager.LoginModel.LoginNotice.content);
		}
	}
	GMi(e) {
		let i = e;
		for (let e = 0; e < 3; e++) {
			var t = i.indexOf("\n", 6e3);
			if (-1 === t) {
				i.length < 6e3 &&
					(this.GetText(0 + e).SetUIActive(!0), this.GetText(0 + e).SetText(i));
				break;
			}
			var o = i.substr(0, t);
			this.GetText(0 + e).SetUIActive(!0),
				this.GetText(0 + e).SetText(o),
				(i = i.substr(t + 1));
		}
	}
	qMi(e) {
		let i;
		switch (e) {
			case ELoginShowType.AgeTip:
				i = "AgeTipTitle";
				break;
			case ELoginShowType.UserAgreement:
				i = "UserTitle";
				break;
			case ELoginShowType.PrivacyAgreement:
				i = "PrivacyTitle";
				break;
			case ELoginShowType.ChildPrivacyAgreement:
				i = "ChildPrivacyTitle";
				break;
			case ELoginShowType.LoginNotice:
				return void (
					ModelManager_1.ModelManager.LoginModel.LoginNotice &&
					this.GetText(4).SetText(
						ModelManager_1.ModelManager.LoginModel.LoginNotice.Title,
					)
				);
		}
		(e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(i)),
			this.GetText(4).SetText(e);
	}
}
exports.LoginAgeTipView = LoginAgeTipView;
