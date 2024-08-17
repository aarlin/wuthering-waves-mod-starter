"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardItemBar = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
class RewardItemBar extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.DFe = void 0),
			(this.JGe = (e, t, r) => {
				var i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
				return i.Initialize(t.GetOwner()), i.Refresh(e), { Key: r, Value: i };
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIGridLayout],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		(this.DFe = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetGridLayout(1),
			this.JGe,
		)),
			this.GetText(0).SetText(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PassReward") ?? "",
			);
	}
	RebuildRewardsByData(e) {
		this.DFe.RebuildLayoutByDataNew(e);
	}
}
exports.RewardItemBar = RewardItemBar;
