"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BrightnessView = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	RenderConfig_1 = require("../../../Render/Config/RenderConfig"),
	RenderDataManager_1 = require("../../../Render/Data/RenderDataManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LongPressButtonItem_1 = require("../../Common/Button/LongPressButtonItem"),
	MenuController_1 = require("../MenuController"),
	MenuTool_1 = require("../MenuTool"),
	STEP = 5,
	SLIDER_MIN_VALUE = 0,
	SLIDER_MAX_VALUE = 100;
class BrightnessView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.MenuDataIns = void 0),
			(this.IsConfirm = !1),
			(this.ewi = 0),
			(this.twi = 0),
			(this.iwi = void 0),
			(this.Oxt = void 0),
			(this.owi = void 0),
			(this.rwi = () => {
				var t = this.GetSlider(2).GetValue() - 5;
				this.nwi(t);
			}),
			(this._o = () => {
				var t = this.GetSlider(2).GetValue() + 5;
				this.nwi(t);
			}),
			(this.mIt = () => {
				this.CloseMe();
			}),
			(this.swi = () => {
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"AdjustBrighness",
				),
					(this.IsConfirm = !0),
					this.mIt();
			}),
			(this.awi = (t) => {
				let e = 2.2;
				t < 0 && (e = MathUtils_1.MathUtils.Lerp(1.5, 2.2, (t + 1) / this.ewi)),
					0 < t && (e = MathUtils_1.MathUtils.Lerp(2.2, 3.5, t / this.ewi)),
					UE.KismetMaterialLibrary.SetScalarParameterValue(
						GlobalData_1.GlobalData.World,
						RenderDataManager_1.RenderDataManager.Get().GetUiShowBrightnessMaterialParameterCollection(),
						RenderConfig_1.RenderConfig.UIShowBrightness,
						e,
					),
					this.nwi(t, !1);
			}),
			(this.hwi = () => {
				var t = this.MenuDataIns.MenuDataSliderDefault;
				t = MenuTool_1.FunctionItemViewTool.GetSliderPosition(
					this.MenuDataIns.MenuDataSliderRange,
					t * this.ewi,
					this.MenuDataIns.MenuDataSliderDigits,
				);
				this.GetSlider(2).SetValue(t, !0);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UISliderComponent],
			[3, UE.UITexture],
			[4, UE.UITexture],
			[5, UE.UITexture],
			[6, UE.UIButtonComponent],
			[7, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[0, this.swi],
				[1, this.hwi],
				[2, this.awi],
			]);
	}
	nwi(t, e = !0) {
		100 <= t
			? this.GetButton(7).SetSelfInteractive(!1)
			: t <= 0
				? this.GetButton(6).SetSelfInteractive(!1)
				: (this.GetButton(6).SetSelfInteractive(!0),
					this.GetButton(7).SetSelfInteractive(!0)),
			this.GetSlider(2).SetValue(MathUtils_1.MathUtils.Clamp(t, 0, 100), e);
	}
	OnStart() {
		this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
			this.mIt();
		}),
			(this.iwi = this.OpenParam),
			(this.MenuDataIns = this.iwi[0]);
		var t = this.MenuDataIns.MenuDataSliderRange[0],
			e = this.MenuDataIns.MenuDataSliderRange[1];
		(this.ewi = 0.5 * Math.abs(e - t)),
			(this.twi =
				MenuController_1.MenuController.GetTargetConfig(
					this.MenuDataIns.MenuDataFunctionId,
				) * this.ewi),
			this.iwi[1](this.MenuDataIns.MenuDataFunctionId, this.twi / this.ewi),
			(t = MathUtils_1.MathUtils.RangeClamp(this.twi, t, e, 0, 100));
		(e = this.GetSlider(2)).SetMaxValue(100, !0, !1),
			e.SetMinValue(0, !0, !1),
			e.SetValue(t, !0),
			(this.Oxt = new LongPressButtonItem_1.LongPressButtonItem(
				this.GetButton(7),
				1,
				this._o,
			)),
			(this.owi = new LongPressButtonItem_1.LongPressButtonItem(
				this.GetButton(6),
				1,
				this.rwi,
			));
	}
	OnBeforeDestroy() {
		var t = this.MenuDataIns.MenuDataSliderRange[0],
			e = this.MenuDataIns.MenuDataSliderRange[1],
			i = this.GetSlider(2).GetValue();
		i = MathUtils_1.MathUtils.RangeClamp(i, 0, 100, t, e);
		this.IsConfirm && this.twi !== i
			? (this.iwi[1](this.MenuDataIns.MenuDataFunctionId, i / this.ewi),
				(this.IsConfirm = !1))
			: this.iwi[1](this.MenuDataIns.MenuDataFunctionId, this.twi / this.ewi),
			this.Oxt?.Clear(),
			this.owi?.Clear(),
			(this.Oxt = void 0),
			(this.owi = void 0);
	}
}
exports.BrightnessView = BrightnessView;
