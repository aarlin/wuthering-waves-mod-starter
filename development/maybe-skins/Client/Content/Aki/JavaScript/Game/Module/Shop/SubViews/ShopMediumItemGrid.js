"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShopMediumItemGrid = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class ShopMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments), (this.ItemInfo = void 0);
	}
	OnRefresh(e, t, o) {
		e &&
			(this.SetSelected(t, !1),
			(t = {
				Type: 4,
				Data: (this.ItemInfo = e),
				ItemConfigId: e.ItemId,
				IsProhibit: e.IsLocked,
				StarLevel: e.ItemInfo.QualityId,
				BottomTextId: e.ItemInfo.Name,
				IsDisable: e.IsSoldOut(),
				IsOmitBottomText: !0,
			}),
			this.Apply(t));
	}
	OnSelected(e) {
		(ModelManager_1.ModelManager.ShopModel.OpenItemInfo = this.ItemInfo),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenItemInfo),
			this.SetSelected(!0, !1);
	}
	OnDeselected(e) {
		this.SetSelected(!1, !1);
	}
}
exports.ShopMediumItemGrid = ShopMediumItemGrid;
