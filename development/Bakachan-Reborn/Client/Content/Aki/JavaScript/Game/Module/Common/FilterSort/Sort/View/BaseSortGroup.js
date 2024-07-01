"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseSortGroup = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../../../Util/Layout/GenericLayoutNew");
class SortItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.dLt = 0),
			(this.CRt = 1),
			(this.he = ""),
			(this.U4e = void 0),
			(this.gRt = void 0),
			(this.cLt = (t) => {
				1 === t && this.U4e?.(this.dLt, this.he);
			}),
			(this.T7e = () => !this.gRt || this.gRt(this.dLt)),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIExtendToggle],
			[2, UE.UITexture],
		]),
			(this.BtnBindInfo = [[1, this.cLt]]);
	}
	OnStart() {
		this.GetExtendToggle(1).CanExecuteChange.Bind(this.T7e);
	}
	OnBeforeDestroy() {
		this.GetExtendToggle(1).CanExecuteChange.Unbind();
	}
	Ije() {
		(this.he = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(
			this.dLt,
			this.CRt,
		)),
			this.GetText(0).SetText(this.he);
	}
	IIt() {
		var t =
				0 <
				(e = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleAttributeId(
					this.dLt,
					this.CRt,
				)),
			e = t
				? ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexIcon(
						e,
					)
				: ConfigManager_1.ConfigManager.SortConfig.GetSortRuleIcon(
						this.dLt,
						this.CRt,
					),
			i = this.GetTexture(2);
		StringUtils_1.StringUtils.IsBlank(e)
			? i.SetUIActive(!1)
			: (i.SetUIActive(!0),
				this.SetTextureByPath(e, i),
				i.SetChangeColor(t, i.changeColor));
	}
	SetToggleFunction(t) {
		this.U4e = t;
	}
	SetCanExecuteChange(t) {
		this.gRt = t;
	}
	SetToggleStateForce(t) {
		this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0);
	}
	ShowSortItem(t, e, i) {
		(this.dLt = t),
			(this.CRt = e),
			this.Ije(),
			this.IIt(),
			this.SetToggleStateForce(i);
	}
}
class BaseSortGroup extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.eGe = void 0),
			(this.DRt = void 0),
			(this.Mne = 0),
			(this.CRt = 1),
			(this.MRt = (t, e, i) => (
				(e = new SortItem(e)).SetToggleFunction(this.SRt),
				e.SetCanExecuteChange(this.T7e),
				e.ShowSortItem(t, this.CRt, this.DRt[0] === t),
				{ Key: t, Value: e }
			)),
			(this.SRt = (t, e) => {
				this.RRt(), (this.DRt = [t, e]);
			}),
			(this.T7e = (t) => this.DRt[0] !== t),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UILayoutBase],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetLayoutBase(0),
			this.MRt,
			this.GetItem(1),
		);
	}
	OnBeforeDestroy() {}
	RRt() {
		this.eGe.GetLayoutItemByKey(this.DRt[0]).SetToggleStateForce(!1);
	}
	URt() {
		var t = ModelManager_1.ModelManager.SortModel.GetSortResultData(this.Mne);
		this.DRt = t.GetSelectBaseSort();
	}
	LRt() {
		var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
		(this.CRt = t.DataId), this.eGe.RebuildLayoutByDataNew(t.BaseSortList);
	}
	Init(t) {
		(this.Mne = t), this.URt(), this.LRt();
	}
	Reset() {
		var t,
			e,
			i = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne)
				.BaseSortList[0],
			o = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(i, this.CRt);
		(this.DRt = [i, o]), (o = this.eGe.GetLayoutItemMap());
		for ([t, e] of o) {
			var s = t;
			e.ShowSortItem(s, this.CRt, i === s);
		}
	}
	GetTempSelect() {
		return this.DRt;
	}
}
exports.BaseSortGroup = BaseSortGroup;
