"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ProgressControlHeadState = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	HeadStateViewBase_1 = require("./HeadStateViewBase");
class ProgressControlHeadState extends HeadStateViewBase_1.HeadStateViewBase {
	constructor() {
		super(...arguments),
			(this.xht = 0),
			(this.OnProgressControlDataChange = (t) => {
				"CaptureStrategicPoint" === t.ProgressCtrlType &&
					this.M1t(t.CurrentValue / t.MaxValue);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
		];
	}
	GetResourceId() {
		return "UiItem_BarInteractive";
	}
	ActiveBattleHeadState(t) {
		super.ActiveBattleHeadState(t);
		var e = this.GetSprite(0),
			a = this.GetText(1),
			r = e.GetStretchLeft(),
			s = e.GetParentAsUIItem().GetWidth();
		"CaptureStrategicPoint" ===
			(s =
				((this.xht = s - 2 * r),
				e.SetUIActive(!0),
				a.SetUIActive(!0),
				t.GetProgressControlData())).ProgressCtrlType &&
			this.M1t(s.CurrentValue / s.MaxValue);
	}
	BindCallback() {
		super.BindCallback(),
			this.HeadStateData.BindOnProgressControlDataChange(
				this.OnProgressControlDataChange,
			);
	}
	M1t(t) {
		var e = MathUtils_1.MathUtils.Clamp(t, 0, 1) * this.xht;
		this.GetSprite(0).SetWidth(e),
			(e = Math.round(MathUtils_1.MathUtils.RangeClamp(t, 0, 1, 0, 100)));
		this.GetText(1).SetText(e + "%");
	}
}
exports.ProgressControlHeadState = ProgressControlHeadState;
