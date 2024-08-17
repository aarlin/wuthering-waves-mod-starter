"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonConditionFilterItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CommonConditionFilterItem extends UiPanelBase_1.UiPanelBase {
	constructor(t, e) {
		super(),
			(this.QualityInfo = e),
			(this.ToggleFunction = void 0),
			(this.x4e = (t) => {
				this.ToggleFunction &&
					this.ToggleFunction(
						this.QualityInfo.Id,
						this.QualityInfo.ConsumeFilterText,
					);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.x4e]]);
	}
	OnStart() {
		this.GetText(1).ShowTextNew(this.QualityInfo.ConsumeFilterText);
	}
	SetToggleState(t, e = !0) {
		(t = t ? 1 : 0), this.GetExtendToggle(0).SetToggleState(t, e);
	}
	SetToggleFunction(t) {
		this.ToggleFunction = t;
	}
	GetQualityInfo() {
		return this.QualityInfo;
	}
}
exports.CommonConditionFilterItem = CommonConditionFilterItem;
