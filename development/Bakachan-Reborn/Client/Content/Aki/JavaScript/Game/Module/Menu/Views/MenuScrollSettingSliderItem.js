"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuScrollSettingSliderItem = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	MenuController_1 = require("../MenuController"),
	MenuTool_1 = require("../MenuTool"),
	MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingSliderItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
	constructor() {
		super(...arguments),
			(this.Data = void 0),
			(this.uBi = 0),
			(this.cBi = (e, t = !0) => {
				this.GetItemClickLimit(this.GetSlider(1))
					? this.mBi(this.uBi, t)
					: this.mBi(e, t);
			}),
			(this.dBi = () => {
				this.GetItemClickLimit(this.GetSlider(1)) || this.CBi();
			}),
			(this.mBi = (e, t = !0) => {
				this.GetSlider(1).SetValue(e, t), this.gBi(e, t);
			}),
			(this.nwi = (e, t) => {
				var i;
				this.Data.MenuDataFunctionId === e &&
					((i = (e = this.Data.MenuDataSliderRange)[0]),
					(e = e[1]),
					(t = MathUtils_1.MathUtils.GetFloatPointFloor(
						t,
						this.Data.MenuDataSliderDigits,
					)),
					this.mBi(MathUtils_1.MathUtils.Clamp(t, i, e), !1));
			}),
			(this.CBi = () => {
				MenuController_1.MenuController.SaveLocalConfig(),
					(ModelManager_1.ModelManager.MenuModel.IsEdited = !0),
					this.PlaySequenceByName("Flashing");
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UISliderComponent],
			[2, UE.UIText],
		];
	}
	OnStart() {
		this.GetSlider(1).SetCanClickWhenDisable(!0), this.fBi();
	}
	OnClear() {
		this.GetSlider(1).OnValueChangeCb?.Unbind(),
			this.GetSlider(1).OnEndDragCb?.Unbind(),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.ChangeConfigValue,
				this.nwi,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.ChangeConfigValue,
					this.nwi,
				),
			this.Data && (this.Data = void 0);
	}
	Update(e) {
		(this.Data = e), this.mGe(), this.eNt();
	}
	mGe() {
		this.GetText(0).ShowTextNew(this.Data.MenuDataFunctionName ?? "");
	}
	eNt() {
		var e = (t = this.Data.MenuDataSliderRange)[0],
			t = t[1],
			i = MenuController_1.MenuController.GetTargetConfig(
				this.Data.MenuDataFunctionId,
			),
			n =
				((i = MathUtils_1.MathUtils.GetFloatPointFloor(
					i,
					this.Data.MenuDataSliderDigits,
				)),
				this.GetSlider(1));
		n.GetRootComponent()?.SetUIActive(!0),
			n.SetMaxValue(t, !0, !1),
			n.SetMinValue(e, !0, !1),
			this.mBi(MathUtils_1.MathUtils.Clamp(i, e, t), !1);
	}
	fBi() {
		this.GetSlider(1)?.OnValueChangeCb.Bind(this.cBi),
			this.GetSlider(1)?.OnEndDragCb.Bind(this.dBi),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangeConfigValue,
				this.nwi,
			);
	}
	gBi(e, t = !0) {
		(e = MathUtils_1.MathUtils.GetFloatPointFloor(
			e,
			this.Data.MenuDataSliderDigits,
		)),
			this.GetText(2).SetText(e.toString()),
			t && this.FireSaveMenuChange(e),
			MenuTool_1.FunctionItemViewTool.CheckNotice(this.Data) &&
				MenuController_1.MenuController.NoticeChange(
					this.Data.MenuDataFunctionId,
				);
	}
	SetInteractionActive(e) {
		this.GetSlider(1).SetSelfInteractive(e),
			e || (this.uBi = this.GetSlider(1).GetValue());
	}
}
exports.MenuScrollSettingSliderItem = MenuScrollSettingSliderItem;
