"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleSkillNumItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BattleSkillNumItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.rit = -1),
			(this.nit = new Map()),
			this.CreateByResourceIdAsync("UiItem_BattleSkillNumItem", t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
		];
	}
	OnStart() {
		for (const t of this.nit.values()) t();
	}
	SetComponentActive(t) {
		var e = () => {
			this.SetActive(t);
		};
		this.InAsyncLoading() ? this.nit.set("SetActive", e) : e();
	}
	SetTotalCount(t) {}
	SetRemainingCount(t) {
		var e = () => {
			this.rit !== t && (this.GetText(1).SetText(t.toString()), (this.rit = t));
		};
		this.InAsyncLoading() ? this.nit.set("SetRemainingCount", e) : e();
	}
	RefreshCountType(t) {}
	RefreshTotalCount(t) {}
}
exports.BattleSkillNumItem = BattleSkillNumItem;
