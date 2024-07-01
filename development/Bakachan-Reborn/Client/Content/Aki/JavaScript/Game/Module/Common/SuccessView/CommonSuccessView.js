"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonSuccessView = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	CommonSuccessData_1 = require("./CommonSuccessData");
class CommonSuccessView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.TimerId = void 0),
			(this.gpt = () => {
				this.Pe.GetNeedDelay() || this.$Oe();
			});
	}
	OnBeforeCreate() {
		(this.Pe = this.OpenParam ?? new CommonSuccessData_1.CommonSuccessData()),
			this.IBt();
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[3, this.gpt]]);
	}
	OnAfterPlayStartSequence() {
		this.UiViewSequence.PlaySequencePurely("Xunhuan"), this.TBt();
	}
	OnAfterShow() {
		this.LBt(), this.DBt(), this.RBt();
	}
	IBt() {
		var e = this.Pe.GetAudioPath();
		e && this.SetAudioEvent(e);
	}
	LBt() {
		var e,
			t = this.Pe.GetTitleText();
		t && ((e = this.GetText(0)), LguiUtil_1.LguiUtil.SetLocalText(e, t));
	}
	DBt() {
		var e = this.Pe.GetSubTitleText(),
			t = this.GetText(1);
		e
			? (t.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalText(t, e))
			: t.SetUIActive(!1);
	}
	RBt() {
		var e,
			t = this.Pe.GetClickText();
		t &&
			(this.GetItem(4).SetUIActive(!0),
			(e = this.GetText(2)),
			LguiUtil_1.LguiUtil.SetLocalText(e, t));
	}
	TBt() {
		this.Pe.GetNeedDelay() &&
			(this.TimerId = TimerSystem_1.TimerSystem.Delay(() => {
				this.$Oe();
			}, CommonSuccessView.tBt));
	}
	$Oe() {
		var e = this.Pe.GetClickFunction();
		e && e(), (this.TimerId = void 0), this.CloseMe();
	}
	OnBeforeDestroy() {
		void 0 !== this.TimerId &&
			(TimerSystem_1.TimerSystem.Remove(this.TimerId), (this.TimerId = void 0));
	}
}
(exports.CommonSuccessView = CommonSuccessView).tBt = 1500;
