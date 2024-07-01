"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassFirstOpenView = void 0);
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	BattlePassController_1 = require("./BattlePassController");
class BattlePassFirstOpenView extends UiViewBase_1.UiViewBase {
	OnBeforeShow() {
		BattlePassController_1.BattlePassController.SetBattlePassEnter(),
			this.PlaySequence("BpStart", () => {
				UiManager_1.UiManager.OpenViewAsync("BattlePassMainView").finally(
					() => {
						this.CloseMe();
					},
				);
			});
	}
}
exports.BattlePassFirstOpenView = BattlePassFirstOpenView;
