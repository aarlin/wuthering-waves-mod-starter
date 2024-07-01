"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TipsAttributeItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TipsAttributeItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	UpdateItem(e) {
		var t =
			ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexName(
				e.Id,
			);
		this.GetText(0).ShowTextNew(t),
			this.GetText(1).SetText(
				ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
					e.Id,
					e.Value,
					e.IsRatio,
				),
			);
	}
}
exports.TipsAttributeItem = TipsAttributeItem;
