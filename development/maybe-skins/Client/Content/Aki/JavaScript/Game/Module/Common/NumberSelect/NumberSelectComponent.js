"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NumberSelectComponent = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LongPressButtonItem_1 = require("../Button/LongPressButtonItem"),
	MAX_VALUE = 9999;
class NumberSelectComponent extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.Nxt = void 0),
			(this.Oxt = void 0),
			(this.kxt = void 0),
			(this.Fxt = void 0),
			(this.Pe = void 0),
			(this.Vxt = 0),
			(this.BY = 0),
			(this.Hxt = 9999),
			(this.bY = 1),
			(this.jxt = () => {
				this.SelectMax();
			}),
			(this.Wxt = (t) => {
				(this.Vxt = t),
					this.Oxt.SetInteractive(t !== this.kxt.MaxValue),
					this.Nxt.SetInteractive(t !== this.kxt.MinValue),
					this.GetButton(7).SetSelfInteractive(t !== this.kxt.MaxValue);
				var e = this.Pe.GetExchangeTableText?.(t);
				e &&
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.Fxt, e.TextKey, ...e.Params),
					this.Pe.ValueChangeFunction?.(t);
			}),
			(this.Kxt = () => {
				this.kxt.SetValue(this.Vxt - 1, !0);
			}),
			(this.Qxt = () => {
				this.kxt.SetValue(this.Vxt + 1, !0);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UISliderComponent],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[7, this.jxt]]);
	}
	OnStart() {
		(this.kxt = this.GetSlider(4)),
			this.kxt.OnValueChangeCb.Bind(this.Wxt),
			(this.Nxt = new LongPressButtonItem_1.LongPressButtonItem(
				this.GetButton(0),
				1,
				this.Kxt,
			)),
			(this.Oxt = new LongPressButtonItem_1.LongPressButtonItem(
				this.GetButton(1),
				1,
				this.Qxt,
			)),
			(this.Fxt = this.GetText(5)),
			(this.Vxt = 1);
	}
	OnBeforeDestroy() {
		this.kxt.OnValueChangeCb.Unbind(), this.Nxt.Clear(), this.Oxt.Clear();
	}
	Xxt() {
		var t = this.GetText(2),
			e = this.GetText(3),
			i = this.GetIfLimit(),
			s = i ? 0 : 1;
		t.SetText(s.toString()),
			e.SetText(this.BY.toString()),
			this.kxt.SetMaxValue(this.BY, !1),
			this.kxt.SetMinValue(s, !1),
			this.kxt.SetValue(1, !1),
			this.Wxt(1),
			this.SetComponentLimitState(i);
	}
	SetMaxBtnShowState(t) {
		this.GetButton(7)?.RootUIComp.SetUIActive(t);
	}
	GetIfLimit() {
		return this.BY <= 1;
	}
	GetIfSelectMax() {
		return this.Vxt === this.BY;
	}
	SelectMax() {
		this.kxt.SetValue(this.BY, !1), this.Wxt(this.BY);
	}
	SetNumberSelectTipsText(t) {
		this.Fxt.SetText(t);
	}
	SetNumberSelectTipsVisible(t) {
		this.Fxt.SetUIActive(t);
	}
	SetComponentLimitState(t) {
		this.SetMinTextShowState(!t),
			this.GetItem(6).SetRaycastTarget(!t),
			this.kxt.SetSelfInteractive(!t),
			this.SetAddReduceButtonActive(!t);
	}
	SetMinTextShowState(t) {
		this.GetText(2).SetUIActive(t);
	}
	SetAddReduceButtonActive(t) {
		this.Nxt.SetActive(t), this.Oxt.SetActive(t);
	}
	SetAddReduceButtonInteractive(t) {
		this.SetAddButtonInteractive(t), this.SetReduceButtonInteractive(t);
	}
	SetAddButtonInteractive(t) {
		this.GetButton(1).SetSelfInteractive(t);
	}
	SetReduceButtonInteractive(t) {
		this.GetButton(0).SetSelfInteractive(t);
	}
	Init(t) {
		(this.Pe = t), this.Refresh(this.Pe.MaxNumber);
	}
	GetSelectNumber() {
		return this.Vxt;
	}
	SetLimitMaxValue(t) {
		this.Hxt = Math.min(t, 9999);
	}
	SetLimitMaxValueForce(t) {
		this.Hxt = t;
	}
	ResetLimitMaxValue() {
		this.Hxt = 9999;
	}
	SetMinValue(t) {
		this.bY = t;
	}
	Refresh(t) {
		(this.BY = MathUtils_1.MathUtils.Clamp(t, this.bY, this.Hxt)), this.Xxt();
	}
}
exports.NumberSelectComponent = NumberSelectComponent;
