"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementStarItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementStarItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, i) {
		super(),
			(this.TGe = 0),
			(this.LGe = new Array()),
			(this.Pe = void 0),
			(this.TGe = e),
			(this.Pe = t),
			this.CreateThenShowByResourceIdAsync(this.DGe(e), i).then(
				() => {},
				() => {},
			);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [];
		for (let e = 0; e < this.TGe + 1; ++e)
			this.ComponentRegisterInfos.push([e, UE.UIItem]);
	}
	OnStart() {
		for (let e = 0; e < this.TGe; ++e) this.LGe.push(this.GetItem(e));
		this.RefreshStar(this.Pe);
	}
	OnBeforeDestroy() {
		void 0 !== this.LGe && ((this.LGe.length = 0), (this.LGe = void 0)),
			this.Pe && (this.Pe = void 0);
	}
	RefreshStar(e) {
		if (
			(this.LGe.forEach((e) => {
				e.SetUIActive(!1);
			}),
			e.IfSingleAchievement())
		) {
			if (e.CanShowStarState())
				for (let e = 0; e < this.TGe; e++) this.LGe[e].SetUIActive(!0);
		} else {
			var t = e.GetAchievementShowStar();
			for (let e = 0; e < t; e++) this.LGe[e].SetUIActive(!0);
		}
	}
	DGe(e) {
		return 1 === e
			? "UiItem_AchvStarA"
			: 2 === e
				? "UiItem_AchvStarB"
				: "UiItem_AchvStarC";
	}
}
exports.AchievementStarItem = AchievementStarItem;
