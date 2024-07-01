"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleLevelUpSuccessController = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../../Ui/UiManager");
class RoleLevelUpSuccessController extends UiControllerBase_1.UiControllerBase {
	static OpenSuccessAttributeView(e, r = void 0) {
		UiManager_1.UiManager.OpenView("RoleLevelUpSuccessAttributeView", e, r);
	}
	static OpenSuccessEffectView(e = void 0, r = void 0) {
		(e = e ?? {}),
			UiManager_1.UiManager.OpenView("RoleLevelUpSuccessEffectView", e, r);
	}
	static ConvertsAttrListScrollDataToAttributeInfo(e) {
		var r = {},
			t =
				ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
					e.Id,
				);
		return (
			(r.Name = t.Name),
			(r.IconPath = t.Icon),
			(r.ShowArrow = !0),
			(r.PreText =
				ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
					e.Id,
					e.BaseValue,
					e.IsRatio,
				)),
			(r.CurText =
				ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
					e.Id,
					e.AddValue,
					e.IsRatio,
				)),
			r
		);
	}
}
exports.RoleLevelUpSuccessController = RoleLevelUpSuccessController;
