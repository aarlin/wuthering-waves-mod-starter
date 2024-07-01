"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBootQuestDynamicItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class HandBootQuestDynamicItem extends UiPanelBase_1.UiPanelBase {
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	GetItemSize(e) {
		var t = this.GetItem(1);
		return new UE.Vector2D(t.GetWidth(), t.GetHeight());
	}
	ClearItem() {}
}
exports.HandBootQuestDynamicItem = HandBootQuestDynamicItem;
