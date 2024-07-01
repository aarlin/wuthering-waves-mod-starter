"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponLevelTextView = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../Util/LguiUtil");
class WeaponLevelTextView extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	OnStart() {
		this.GetText(0).SetUIActive(!0), this.GetText(1).SetUIActive(!0);
	}
	SetCurrentLevelText(e) {
		LguiUtil_1.LguiUtil.SetLocalText(
			this.GetText(0),
			"WeaponLevelUpLevelText",
			e,
		);
	}
	SetMaxLevelText(e) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "WeaponMaxLevelText", e);
	}
}
exports.WeaponLevelTextView = WeaponLevelTextView;
