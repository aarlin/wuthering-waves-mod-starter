"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotographValueSetup = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	PhotographController_1 = require("../PhotographController");
class PhotographValueSetup extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.AWi = 0),
			(this.PWi = void 0),
			(this.MKi = (e, t = 0) => {
				var i;
				this.PWi.IsReverseSet
					? ((i = this.PWi.ValueRange),
						(i = MathUtils_1.MathUtils.RangeClamp(e, i[0], i[1], i[1], i[0])),
						PhotographController_1.PhotographController.SetPhotographOption(
							this.PWi.ValueType,
							i,
						))
					: PhotographController_1.PhotographController.SetPhotographOption(
							this.PWi.ValueType,
							e,
						);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UISliderComponent],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		this.GetSlider(1).OnValueChangeCb.Bind(this.MKi);
	}
	OnBeforeDestroy() {
		this.GetSlider(1).OnValueChangeCb.Unbind();
	}
	Initialize(e) {
		(this.AWi = e), this.Refresh();
	}
	Refresh() {
		if (
			((this.PWi =
				ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoSetupConfig(
					this.AWi,
				)),
			0 !== this.PWi.Type)
		) {
			var e = this.PWi.Name,
				t = this.GetText(0);
			(t = (LguiUtil_1.LguiUtil.SetLocalTextNew(t, e), this.GetSlider(1))),
				(e = this.PWi.ValueRange);
			t.SetMinValue(e[0], !1, !1), t.SetMaxValue(e[1], !1, !1);
			let i = ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(
				this.AWi,
			);
			this.PWi.IsReverseSet &&
				(i = MathUtils_1.MathUtils.RangeClamp(
					i ?? e[2],
					e[0],
					e[1],
					e[1],
					e[0],
				)),
				t.SetValue(i ?? e[2], !1);
		}
	}
	SetEnable(e) {
		this.SetActive(e);
	}
	GetSetupId() {
		return this.AWi;
	}
	GetSetupConfig() {
		return this.PWi;
	}
}
exports.PhotographValueSetup = PhotographValueSetup;
