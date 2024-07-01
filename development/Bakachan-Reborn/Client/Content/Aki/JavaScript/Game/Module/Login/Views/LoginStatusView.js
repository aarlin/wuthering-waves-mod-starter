"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoginStatusView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LoginDefine_1 = require("../Data/LoginDefine");
class LoginStatusView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.RefreshStatus = () => {
				var e = ModelManager_1.ModelManager.LoginModel.GetLoginStatus(),
					t = ModelManager_1.ModelManager.LoginModel.GetLastFailStatus();
				let n = "";
				(n = t
					? `登录状态:${LoginDefine_1.ELoginStatus[e]}, 上一次失败:` +
						LoginDefine_1.ELoginStatus[t]
					: "登录状态:" + LoginDefine_1.ELoginStatus[e]),
					this.GetText(0).SetText(n);
			});
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.LoginStatusChange,
			this.RefreshStatus,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.LoginStatusChange,
			this.RefreshStatus,
		);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnStart() {
		this.RefreshStatus();
	}
}
exports.LoginStatusView = LoginStatusView;
