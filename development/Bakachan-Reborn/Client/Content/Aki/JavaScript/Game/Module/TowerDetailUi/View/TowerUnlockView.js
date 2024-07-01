"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerUnlockView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class TowerUnlockView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.gDo = !1),
			(this.ACt = () => {
				this.gDo && this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.ACt]]);
	}
	OnStart() {
		var e =
			ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(
				this.OpenParam,
			);
		this.GetText(1)?.SetText(e);
	}
	OnAfterPlayStartSequence() {
		this.gDo = !0;
	}
}
exports.TowerUnlockView = TowerUnlockView;
