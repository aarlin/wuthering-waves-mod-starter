"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsUiNavigationPlatformChangeListener = void 0);
const UE = require("ue"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class TsUiNavigationPlatformChangeListener extends UE.LGUIBehaviour {
	constructor() {
		super(...arguments), (this.IsChangeAlpha = !1);
	}
	AwakeBP() {
		GlobalData_1.GlobalData.GameInstance &&
			(this.ChangeAlpha(),
			ModelManager_1.ModelManager.UiNavigationModel?.AddPlatformListener(this));
	}
	OnDestroyBP() {
		GlobalData_1.GlobalData.GameInstance &&
			ModelManager_1.ModelManager.UiNavigationModel?.RemovePlatformListener(
				this,
			);
	}
	ChangeAlpha() {
		ModelManager_1.ModelManager.PlatformModel?.IsInGamepad()
			? ((this.IsChangeAlpha = !0), this.GetRootComponent()?.SetAlpha(0))
			: this.IsChangeAlpha &&
				((this.IsChangeAlpha = !1), this.GetRootComponent()?.SetAlpha(1));
	}
}
(exports.TsUiNavigationPlatformChangeListener =
	TsUiNavigationPlatformChangeListener),
	(exports.default = TsUiNavigationPlatformChangeListener);
