"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionSlotItem = exports.VisionSlotData = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class VisionSlotData {
	constructor() {
		this.SlotState = 0;
	}
}
exports.VisionSlotData = VisionSlotData;
class VisionSlotItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(), this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
		];
	}
	Update(t) {
		this.GetItem(0).SetUIActive(!1),
			this.GetItem(1).SetUIActive(!1),
			this.GetItem(2).SetUIActive(!1),
			this.GetItem(3).SetUIActive(!1),
			0 === t.SlotState
				? this.GetItem(0).SetUIActive(!0)
				: 2 === t.SlotState
					? this.GetItem(1).SetUIActive(!0)
					: 1 === t.SlotState
						? this.GetItem(2).SetUIActive(!0)
						: 3 === t.SlotState && this.GetItem(3).SetUIActive(!0);
	}
}
exports.VisionSlotItem = VisionSlotItem;
