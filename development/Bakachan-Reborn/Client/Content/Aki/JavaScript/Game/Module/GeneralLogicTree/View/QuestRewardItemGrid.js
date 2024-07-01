"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestRewardItemGrid = void 0);
const UE = require("ue"),
	LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class QuestRewardItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.ComponentRegisterInfos.push([7, UE.UIText]);
	}
	OnRefresh(e, t, o) {
		var r = e.GetConfig();
		e = {
			Data: e,
			Type: 4,
			ItemConfigId: e.ConfigId,
			BottomText: "x" + e.Count,
			QualityType: "MediumItemGridQualitySpritePath",
		};
		this.Apply(e), this.GetText(7)?.ShowTextNew(r.Name);
	}
}
exports.QuestRewardItemGrid = QuestRewardItemGrid;
