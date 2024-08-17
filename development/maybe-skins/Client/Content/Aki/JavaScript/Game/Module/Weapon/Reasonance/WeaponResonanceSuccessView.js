"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponResonanceSuccessView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class WeaponResonanceSuccessView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.xUt = () => {
				UiManager_1.UiManager.CloseView("WeaponResonanceSuccessView");
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.xUt]]);
	}
	OnBeforeShow() {
		var e = (n = this.OpenParam).WeaponIncId,
			n = n.LastLevel;
		e =
			ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
				e,
			).GetResonanceLevel();
		LguiUtil_1.LguiUtil.SetLocalText(
			this.GetText(1),
			"WeaponResonanceLevelText",
			n,
		),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(2),
				"WeaponResonanceLevelText",
				e,
			);
	}
}
exports.WeaponResonanceSuccessView = WeaponResonanceSuccessView;
