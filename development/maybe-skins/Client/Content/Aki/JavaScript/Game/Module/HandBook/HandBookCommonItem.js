"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookCommonItem = void 0);
const LoopScrollSmallItemGrid_1 = require("../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class HandBookCommonItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	constructor() {
		super(...arguments), (this.HandBookCommonItemData = void 0);
	}
	OnRefresh(e, o, t) {
		var m = {
			Type: 4,
			Data: e,
			IsNotFoundVisible: (m = (this.HandBookCommonItemData = e).IsLock),
			IsNewVisible: e.IsNew,
			IconPath: m ? void 0 : e.Icon,
			QualityId: m ? 0 : e.QualityId,
		};
		this.Apply(m);
	}
	GetData() {
		return this.HandBookCommonItemData;
	}
	OnDeselected(e) {
		this.SetSelected(!1);
	}
	OnSelected(e) {
		this.SetSelected(!0);
	}
	SetSelected(e, o = !1) {
		super.SetSelected(e, o);
	}
}
exports.HandBookCommonItem = HandBookCommonItem;
