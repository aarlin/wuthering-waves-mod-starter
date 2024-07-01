"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuData = void 0);
const GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
class MenuData {
	constructor(t) {
		(this.ixi = 0),
			(this.oxi = void 0),
			(this.he = void 0),
			(this.rxi = 0),
			(this.nxi = 0),
			(this.sxi = 0),
			(this.axi = 0),
			(this.hxi = 0),
			(this.lxi = []),
			(this._xi = 0),
			(this.uxi = 0),
			(this.cxi = 0),
			(this.mxi = []),
			(this.dxi = []),
			(this.Cxi = void 0),
			(this.gxi = void 0),
			(this.uSe = void 0),
			(this.fxi = void 0),
			(this.pxi = void 0),
			(this.vxi = []),
			(this.YO = 0),
			(this.AffectedValueSet = new Set()),
			(this.AffectedFunction = new Map()),
			(this.DisableValueSet = new Set()),
			(this.DisableFunction = []),
			(this.IsEnable = !0),
			(this.ValueTipsMap = new Map()),
			(this.ClickedTipsMap = new Map()),
			(this.ClickedTips = void 0),
			(this.ixi = t.SubType),
			(this.oxi = t.SubName),
			(this.he = t.Name),
			(this.rxi = t.Platform),
			(this.nxi = t.FunctionSort),
			(this.sxi = t.SubSort),
			(this.axi = t.FunctionId),
			(this.hxi = t.SetType),
			(this.lxi = t.SliderRange),
			(this._xi = t.SliderDefault),
			(this.uxi = t.Digits),
			(this.cxi = t.OptionsDefault),
			(this.mxi = t.OptionsName),
			(this.dxi = t.OptionsValue),
			(this.Cxi = t.SubImage),
			(this.gxi = t.FunctionImage),
			(this.uSe = t.KeyMap),
			(this.fxi = t.ButtonText),
			(this.pxi = t.OpenView),
			(this.YO = t.ConditionGroup),
			(this.AffectedFunction = t.AffectedFunction),
			(this.DisableFunction = t.DisableFunction),
			(this.ValueTipsMap = t.ValueTipsMap),
			(this.ClickedTipsMap = t.ClickedTipsMap),
			(this.ClickedTips = t.ClickedTips);
		for (const e of t.AffectedValue) this.AffectedValueSet.add(e);
		for (const e of t.DisableValue) this.DisableValueSet.add(e);
		6 === this.MenuDataFunctionId
			? (this.vxi = MenuData.Mxi)
			: (this.vxi = t.RelationFunction),
			11 !== this.MenuDataFunctionId ||
				"MenuConfig_6_OptionsName_4" !== this.mxi[this.mxi.length - 1] ||
				GameQualitySettingsManager_1.GameQualitySettingsManager.IsDlssGpuDevice() ||
				(this.mxi.pop(), this.dxi.pop());
	}
	get MenuDataRelationFuncIds() {
		return this.vxi;
	}
	get MenuDataSubType() {
		return this.ixi;
	}
	get MenuDataSubName() {
		return this.oxi;
	}
	get MenuDataFunctionName() {
		return this.he;
	}
	get MenuDataPlatform() {
		return this.rxi;
	}
	get MenuDataFunctionSort() {
		return this.nxi;
	}
	get MenuDataSubSort() {
		return this.sxi;
	}
	get MenuDataFunctionId() {
		return this.axi;
	}
	get MenuDataSetType() {
		return this.hxi;
	}
	get MenuDataSliderRange() {
		return this.lxi;
	}
	get MenuDataSliderDefault() {
		return this._xi;
	}
	get MenuDataSliderDigits() {
		return this.uxi;
	}
	get MenuDataOptionsDefault() {
		return this.cxi;
	}
	get MenuDataOptionsNameList() {
		return this.mxi;
	}
	get MenuDataOptionsValueList() {
		return this.dxi;
	}
	get MenuDataSubImage() {
		return this.Cxi;
	}
	get MenuDataFunctionImage() {
		return this.gxi;
	}
	get MenuDataFunctionKeyMap() {
		return this.uSe;
	}
	get MenuDataButtonTextId() {
		return this.fxi;
	}
	get MenuDataButtonViewName() {
		return this.pxi;
	}
	GetConditionGroup() {
		return this.YO;
	}
	CheckCondition() {
		var t;
		return !(
			(0 < this.YO &&
				!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
					this.YO.toString(),
					void 0,
				)) ||
			((t = MenuData.nGn.get(this.MenuDataFunctionId)) && t.Check())
		);
	}
	CanAffectedFunction(t) {
		return !!this.AffectedValueSet.has(t) && 0 < this.AffectedFunction.size;
	}
	IsAffectedDisable(t) {
		return this.DisableValueSet.has(t);
	}
	HasDisableFunction() {
		return 0 < this.DisableFunction.length;
	}
}
((exports.MenuData = MenuData).Mxi = [5]),
	(MenuData.KeySettingInputControllerType = 0),
	(MenuData.nGn = new Map([
		[
			113,
			FeatureRestrictionTemplate_1.FeatureRestrictionTemplate
				.TemplateForPioneerClient,
		],
		[
			123,
			FeatureRestrictionTemplate_1.FeatureRestrictionTemplate
				.TemplateForPioneerClient,
		],
		[
			112,
			FeatureRestrictionTemplate_1.FeatureRestrictionTemplate
				.TemplateForPioneerClient,
		],
	]));
