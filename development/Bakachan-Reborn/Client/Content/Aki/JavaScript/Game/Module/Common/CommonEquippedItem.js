"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonEquippedItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../Util/LguiUtil");
class CommonEquippedItem extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UITexture],
			[2, UE.UIText],
		];
	}
	SetEquipIcon(e) {
		this.SetTextureByPath(e, this.GetTexture(1));
	}
	SetEquipText(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), e, ...t);
	}
	SetCurrentEquippedState(e) {
		this.GetItem(0).SetUIActive(e);
	}
	SetIconRootItemState(e) {
		this.RootItem.SetUIActive(e);
	}
}
exports.CommonEquippedItem = CommonEquippedItem;
