"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimeOfDaySecondToggleItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class TimeOfDaySecondToggleItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.kqe = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSelectTimePreset,
					this.GridIndex,
				);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.kqe]]);
	}
	Refresh(e, t, i) {
		this.GetExtendToggle(0).SetToggleState(t ? 1 : 0),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title);
	}
	OnSelected(e) {
		this.GetExtendToggle(0).SetToggleState(1),
			e &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSelectTimePreset,
					this.GridIndex,
				);
	}
	OnDeselected(e) {
		this.GetExtendToggle(0).SetToggleState(0);
	}
}
exports.TimeOfDaySecondToggleItem = TimeOfDaySecondToggleItem;
