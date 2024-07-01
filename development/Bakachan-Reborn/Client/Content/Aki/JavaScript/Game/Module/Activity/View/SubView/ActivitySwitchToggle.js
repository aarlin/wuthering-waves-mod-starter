"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySwitchToggle = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivitySwitchToggle extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.R4e = void 0),
			(this.U4e = void 0),
			(this.A4e = void 0),
			(this.P4e = 0),
			(this.x4e = (e) => {
				this.U4e && this.U4e(this.P4e, e);
			}),
			(this.d4e = () =>
				!this.A4e || this.A4e(this.P4e, this.R4e.GetToggleState())),
			(this.P4e = e);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.x4e]]);
	}
	OnStart() {
		(this.R4e = this.GetExtendToggle(0)),
			this.R4e.CanExecuteChange.Bind(this.d4e);
	}
	BindOnCanToggleExecuteChange(e) {
		this.A4e = e;
	}
	BindOnToggleFunction(e) {
		this.U4e = e;
	}
	SetToggleState(e, t = !0) {
		this.R4e.SetToggleStateForce(e ? 1 : 0, t);
	}
	SetToggleTextId(e) {
		this.GetText(1).ShowTextNew(e);
	}
	GetToggleRedDot() {
		return this.GetItem(2);
	}
}
exports.ActivitySwitchToggle = ActivitySwitchToggle;
