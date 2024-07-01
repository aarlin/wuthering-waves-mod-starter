"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideCountDownItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class GuideCountDownItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.LJt = 0),
			(this.hwe = Rotator_1.Rotator.Create(0, 0, 0)),
			(this.DJt = void 0),
			(this.RJt = void 0),
			(this.LJt = t),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Guide", 17, "[引导计时器初始化:关闭界面倒计时]", [
					"总时间",
					this.LJt,
				]);
	}
	Init(t) {
		this.CreateThenShowByActorAsync(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
		];
	}
	OnStart() {
		(this.DJt = this.GetSprite(0)),
			(this.RJt = this.GetSprite(1)),
			this.DJt.SetFillAmount(1),
			this.hwe.Set(0, 0, 0),
			this.RJt.SetUIRelativeRotation(this.hwe.ToUeRotator()),
			this.RootItem.SetUIActive(!0);
	}
	OnDurationChange(t) {
		this.IsShowOrShowing &&
			((t /= this.LJt),
			this.DJt.SetFillAmount(t),
			this.hwe.Set(0, 360 * (t - 1), 0),
			this.RJt.SetUIRelativeRotation(this.hwe.ToUeRotator()));
	}
}
exports.GuideCountDownItem = GuideCountDownItem;
