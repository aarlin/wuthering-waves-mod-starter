"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UidView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
	ModManager_1 = require("../../Manager/ModManager"),
	LguiUtil_1 = require("../Util/LguiUtil");
class UidView extends UiViewBase_1.UiViewBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	SetUid(e) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "FriendMyUid", e);
	}
	OnStart() {
		ModManager_1.ModManager.ModStart(),
			this.SetUid(ModManager_1.ModManager.Settings.Uid);
	}
}
exports.UidView = UidView;
