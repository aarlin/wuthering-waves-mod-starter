"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FilterGroup = exports.FilterItem = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../../../Util/Layout/GenericLayoutNew");
class FilterItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.Pe = void 0),
			(this.U4e = void 0),
			(this.cLt = (t) => {
				this.U4e?.(t, this.Pe.FilterId, this.Pe.Content);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
			[2, UE.UITexture],
			[3, UE.UISprite],
			[4, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.cLt]]);
	}
	mLt() {
		var t = this.Pe.Content;
		this.GetText(4).SetText(t);
	}
	Dnt() {
		var t,
			e,
			i = this.Pe.GetIconPath(),
			r = this.GetItem(1);
		StringUtils_1.StringUtils.IsBlank(i)
			? r.SetUIActive(!1)
			: (r.SetUIActive(!0),
				(r = i.includes("Atlas")),
				(t = this.GetTexture(2)).SetUIActive(!r),
				(e = this.GetSprite(3)).SetUIActive(r),
				r
					? (this.SetSpriteByPath(i, e, !1),
						e.SetChangeColor(this.Pe.NeedChangeColor, e.changeColor))
					: (this.SetTextureByPath(i, t),
						t.SetChangeColor(this.Pe.NeedChangeColor, t.changeColor)));
	}
	SetToggleFunction(t) {
		this.U4e = t;
	}
	SetToggleState(t) {
		(t = t ? 1 : 0), this.GetExtendToggle(0).SetToggleState(t, !1);
	}
	ShowTemp(t, e) {
		(this.Pe = t), this.mLt(), this.Dnt(), this.SetToggleState(e);
	}
}
exports.FilterItem = FilterItem;
class FilterGroup extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.dLt = 0),
			(this.CLt = 2),
			(this.gLt = void 0),
			(this.U4e = void 0),
			(this.fLt = void 0),
			(this.Mne = 0),
			(this.Layout = void 0),
			(this.CurrentSelectedDataMap = void 0),
			(this.pLt = void 0),
			(this.vLt = (t) => {
				if (1 === t)
					for (const i of this.Layout.GetLayoutItemMap().keys()) {
						var e = i;
						this.gLt.set(e.FilterId, e.Content),
							this.fLt?.(t, e.FilterId, e.Content);
					}
				else
					0 === t &&
						(this.gLt.forEach((e, i) => {
							this.fLt?.(t, i, e);
						}),
						this.ResetTempFilterDataMap());
				this.RefreshGroupItem();
			}),
			(this.MLt = (t, e, i) => {
				var r =
					((e = new FilterItem(e)).SetToggleFunction(this.SLt),
					this.gLt.has(t.FilterId));
				return e.ShowTemp(t, r), { Key: t, Value: e };
			}),
			(this.SLt = (t, e, i) => {
				1 === t ? this.gLt.set(e, i) : this.gLt.delete(e),
					this.RefreshSelectAllToggleState(),
					this.U4e?.(t, e, i);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIExtendToggle],
			[3, UE.UILayoutBase],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[2, this.vLt]]);
	}
	OnStart() {
		this.Layout = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetLayoutBase(3),
			this.MLt,
			this.GetItem(4),
		);
	}
	OnBeforeDestroy() {}
	SetToggleFunction(t) {
		this.U4e = t;
	}
	SetOnSelectAllFunction(t) {
		this.fLt = t;
	}
	ELt() {
		var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(
			this.dLt,
		);
		this.CLt = t.FilterType;
	}
	yLt() {
		this.gLt = new Map();
		var t = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(
			this.Mne,
		).GetSelectRuleDataById(this.CLt);
		if (t) for (var [e, i] of t) this.gLt.set(e, i);
	}
	AddCurrentSelectedFilterData() {
		this.pLt.forEach((t) => {
			t = t.FilterId;
			var e = this.CurrentSelectedDataMap?.get(t);
			e && this.gLt.set(t, e);
		});
	}
	ILt() {
		var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(
			this.dLt,
		);
		this.GetText(0).ShowTextNew(t.Title);
	}
	TLt() {
		this.Layout.RebuildLayoutByDataNew(this.pLt);
	}
	LLt() {
		var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
			this.Mne,
		);
		this.GetItem(1).SetUIActive(t.IsSupportSelectAll);
	}
	RefreshSelectAllToggleState() {
		var t;
		ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(this.Mne)
			.IsSupportSelectAll &&
			((t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(
				this.dLt,
			)),
			(t = this.gLt.size === t.IdList.length ? 1 : 0),
			this.GetExtendToggle(2).SetToggleState(t, !1));
	}
	SetSelectedDataMap(t) {
		this.CurrentSelectedDataMap = t;
	}
	InitFilterSetData() {
		this.yLt(), this.AddCurrentSelectedFilterData();
	}
	ShowTemp(t, e) {
		(this.dLt = t),
			(this.Mne = e),
			(this.pLt = ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(
				this.dLt,
				this.Mne,
			)),
			this.ELt(),
			this.InitFilterSetData(),
			this.ILt(),
			this.LLt(),
			this.RefreshSelectAllToggleState(),
			this.TLt();
	}
	RefreshGroupItem() {
		var t, e;
		for ([t, e] of this.Layout.GetLayoutItemMap()) {
			var i = t;
			e.SetToggleState(this.gLt.has(i.FilterId));
		}
	}
	GetTempFilterDataMap() {
		return this.gLt;
	}
	ResetTempFilterDataMap() {
		this.gLt.clear();
	}
	GetFilterType() {
		return this.CLt;
	}
}
exports.FilterGroup = FilterGroup;
