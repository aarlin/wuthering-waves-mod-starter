"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StaticTabComponent = void 0);
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class StaticTabComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.ProxyCreate = e),
			(this.ToggleCallBack = t),
			(this.eGe = void 0),
			(this.NOe = CommonDefine_1.INVALID_VALUE),
			(this.gRt = void 0),
			(this.Z3e = (e, t) => (
				((e = this.ProxyCreate(e, t)).GridIndex = t),
				e.InitTabItem(),
				e.SetSelectedCallBack(this.cLt),
				e.SetCanExecuteChange(this.T7e),
				{ Key: t, Value: e }
			)),
			(this.cLt = (e) => {
				this.xBt(), (this.NOe = e), this.ToggleCallBack(e);
			}),
			(this.T7e = (e, t) =>
				!(this.NOe === e && !t) && (!this.gRt || this.gRt(e)));
	}
	Init(e) {
		this.RegistTabItem(e);
	}
	RegistTabItem(e) {
		this.eGe = new Array();
		var t = e.length;
		for (let s = 0; s < t; s++) {
			var i = e[s];
			i = this.Z3e(i, s);
			this.eGe.push(i);
		}
		this.NOe = 0;
	}
	OnStart() {
		var e = this.GetItem(0).GetAttachUIChildren(),
			t = ((this.eGe = new Array()), e.Num());
		for (let s = 0; s < t; s++) {
			var i = e.Get(s);
			i = this.Z3e(i, s);
			this.eGe.push(i);
		}
		this.NOe = 0;
	}
	OnBeforeDestroy() {
		this.eGe &&
			(this.eGe.forEach((e) => {
				e.Value.Destroy();
			}),
			(this.eGe = []));
	}
	xBt() {
		var e;
		this.NOe !== CommonDefine_1.INVALID_VALUE &&
			(e = this.eGe[this.NOe]) &&
			e.Value.SetForceSwitch(0);
	}
	SelectToggleByIndex(e, t = !1) {
		if (t) {
			const e = this.eGe[this.NOe];
			e && e.Value.SetForceSwitch(0), (this.NOe = CommonDefine_1.INVALID_VALUE);
		}
		if (e !== this.NOe) {
			const t = this.eGe[e];
			t && t.Value.SetForceSwitch(1, !0);
		}
	}
	GetSelectedIndex() {
		return this.NOe;
	}
	SetCanChange(e) {
		this.gRt = e;
	}
}
exports.StaticTabComponent = StaticTabComponent;
