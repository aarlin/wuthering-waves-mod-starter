"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ReportRowView = void 0);
const UE = require("ue"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class ReportRowView extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.ToggleFunction = void 0),
			(this.Id = 0),
			(this.ToggleClick = (t) => {
				1 === t ? this.ToggleFunction(this.Id) : this.ToggleFunction(-1);
			});
	}
	Refresh(t, e, i) {
		this.SetData(t), this.SetToggleState(e);
	}
	OnSelected(t) {
		this.ToggleFunction(this.Id);
	}
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			(this.ComponentRegisterInfos = [
				[0, UE.UIText],
				[1, UE.UIExtendToggle],
			]),
			(this.BtnBindInfo = [[1, this.ToggleClick]]);
	}
	SetData(t) {
		this.Id = t.Id;
		var e = this.GetText(0);
		LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.Reason);
	}
	SetToggleFunction(t) {
		this.ToggleFunction = t;
	}
	SetToggleState(t) {
		this.GetExtendToggle(1).SetToggleState(t ? 1 : 0, !0);
	}
}
exports.ReportRowView = ReportRowView;
