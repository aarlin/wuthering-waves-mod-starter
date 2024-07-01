"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DropDownItemBase = void 0);
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class DropDownItemBase extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Xy = 0),
			(this.U4e = void 0),
			(this.fTt = void 0),
			(this.LTt = () => {
				this.U4e?.(this.Xy);
			}),
			(this.DTt = () => this.fTt?.(this.Xy) ?? !1),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnStartImplement() {
		var e = this.GetDropDownToggle();
		e.OnStateChange.Add(this.LTt), e.CanExecuteChange.Bind(this.DTt);
	}
	OnBeforeDestroyImplement() {
		var e = this.GetDropDownToggle();
		e.OnStateChange.Clear(), e.CanExecuteChange.Unbind();
	}
	ShowDropDownItemBase(e, t) {
		(this.Xy = t), this.OnShowDropDownItemBase(e);
	}
	SetToggleFunction(e) {
		this.U4e = e;
	}
	SetCanExecuteFunction(e) {
		this.fTt = e;
	}
	SetToggle(e) {
		var t = e ? 1 : 0;
		this.GetDropDownToggle().SetToggleState(t, e);
	}
	SetToggleForce(e) {
		var t = e ? 1 : 0;
		this.GetDropDownToggle().SetToggleStateForce(t, e);
	}
}
exports.DropDownItemBase = DropDownItemBase;
