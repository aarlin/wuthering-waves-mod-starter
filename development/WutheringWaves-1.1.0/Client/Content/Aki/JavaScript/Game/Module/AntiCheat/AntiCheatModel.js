"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AntiCheatModel = void 0);
const UE = require("ue"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	AntiCheatData_1 = require("./AntiCheatData"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	BUNDLE_DATA_EVENT_ID = "8",
	HEARTBEAT_DATA_EVENT_ID = "9";
class AntiCheatModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.Eoe = ""), (this.Q9e = ""), (this.$9e = 0);
	}
	GetVersion() {
		return this.Eoe;
	}
	GetBundleId() {
		return this.Q9e;
	}
	OnInit() {
		var e = UE.KuroLauncherLibrary.GetAppVersion();
		return (
			(this.Eoe = LocalStorage_1.LocalStorage.GetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.PatchVersion,
				e,
			)),
			(this.Q9e = UE.KismetSystemLibrary.GetGameBundleId()),
			!0
		);
	}
	static GetBundleData() {
		var e = new AntiCheatData_1.AntiCheatBundleData();
		e.event_id = BUNDLE_DATA_EVENT_ID;
		let t = ModelManager_1.ModelManager.LoginModel.GetAccount();
		return (
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				(t = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid),
			(e.unique_id = t),
			(e.s_bundle_id =
				ModelManager_1.ModelManager.AntiCheatModel.GetBundleId()),
			(e.s_version = ModelManager_1.ModelManager.AntiCheatModel.GetVersion()),
			e
		);
	}
	ResetHeartbeatException() {
		this.$9e = 0;
	}
	HitHeartbeatException() {
		this.$9e += 1;
	}
	GetHeartbeatException() {
		return this.$9e;
	}
	HasHeartbeatException() {
		return 0 < this.$9e;
	}
	GetHeartbeatData() {
		var e = new AntiCheatData_1.AntiCheatHeartbeatData();
		e.event_id = HEARTBEAT_DATA_EVENT_ID;
		let t = ModelManager_1.ModelManager.LoginModel.GetAccount();
		return (
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				(t = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid),
			(e.unique_id = t),
			(e.i_exception_count = this.$9e),
			e
		);
	}
}
exports.AntiCheatModel = AntiCheatModel;
//# sourceMappingURL=AntiCheatModel.js.map
