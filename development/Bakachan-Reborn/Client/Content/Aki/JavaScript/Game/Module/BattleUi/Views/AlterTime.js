"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AlterTime = void 0);
const UE = require("ue"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AlterTime extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.m$e = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	OnBeforeDestroy() {
		this.m$e = void 0;
	}
	OnStart() {
		(this.m$e = this.GetText(0)), this.SetUiActive(!1);
	}
	SetCountdownText(e) {
		var t = Math.floor(e / TimeUtil_1.TimeUtil.InverseMillisecond);
		let i = String(e % TimeUtil_1.TimeUtil.InverseMillisecond);
		(i = i.substring(0, 2)), this.m$e.SetText(t + ":" + i);
	}
}
exports.AlterTime = AlterTime;
