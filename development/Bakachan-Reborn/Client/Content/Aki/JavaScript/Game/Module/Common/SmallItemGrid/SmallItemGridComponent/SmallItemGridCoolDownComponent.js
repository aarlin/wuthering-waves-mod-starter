"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SmallItemGridCoolDownComponent = void 0);
const UE = require("ue"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridCoolDownComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
		];
	}
	OnRefresh(e) {
		var t,
			i = e.CoolDown;
		e = e.TotalCdTime;
		i && e
			? (this.GetSprite(0).SetFillAmount(i / e),
				this.SetActive(!0),
				(e = this.GetText(1)),
				i <
				ModelManager_1.ModelManager.SmallItemGridModel.ItemGridCoolDownSecond
					? LguiUtil_1.LguiUtil.SetLocalTextNew(
							e,
							"ItemCdTime_Second",
							i.toFixed(1),
						)
					: ((t = TimeUtil_1.TimeUtil.CalculateRemainingTime(i).TimeValue),
						i < TimeUtil_1.TimeUtil.Hour
							? LguiUtil_1.LguiUtil.SetLocalTextNew(e, "ItemCdTime_Minute", t)
							: i < TimeUtil_1.TimeUtil.OneDaySeconds
								? LguiUtil_1.LguiUtil.SetLocalTextNew(e, "ItemCdTime_Hour", t)
								: LguiUtil_1.LguiUtil.SetLocalTextNew(e, "ItemCdTime_Day", t)))
			: this.SetActive(!1);
	}
	GetResourceId() {
		return "UiItem_ItemBCD";
	}
	GetLayoutLevel() {
		return 1;
	}
}
exports.SmallItemGridCoolDownComponent = SmallItemGridCoolDownComponent;
