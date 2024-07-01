"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AttributeSortGroup = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../../../Util/LguiUtil");
class SortItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.dLt = 0),
			(this.he = ""),
			(this.CRt = 1),
			(this.U4e = void 0),
			(this.gRt = void 0),
			(this.cLt = (t) => {
				this.U4e?.(t, this.dLt, this.he);
			}),
			(this.T7e = () =>
				1 === this.GetExtendToggle(1).ToggleState || !this.gRt || this.gRt()),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIExtendToggle],
			[2, UE.UITexture],
			[3, UE.UIText],
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
	fRt(t) {
		this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0);
	}
	SetToggleFunction(t) {
		this.U4e = t;
	}
	SetCanExecuteChange(t) {
		this.gRt = t;
	}
	ShowSortItem(t, e, i) {
		(this.dLt = t),
			(this.CRt = e),
			this.Ije(),
			this.IIt(),
			this.fRt(0 < i),
			this.RefreshIndex(i);
	}
	RefreshIndex(t) {
		var e = this.GetText(3);
		0 === t ? e.SetUIActive(!1) : (e.SetUIActive(!0), e.SetText(t.toString()));
	}
}
class AttributeSortGroup extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.eGe = void 0),
			(this.pRt = new Map()),
			(this.Mne = 0),
			(this.CRt = 1),
			(this.vRt = 0),
			(this.MRt = (t, e, i) => {
				var s =
					((e = new SortItem(e)).SetToggleFunction(this.SRt),
					e.SetCanExecuteChange(this.T7e),
					this.ERt(t));
				return e.ShowSortItem(t, this.CRt, s + 1), { Key: t, Value: e };
			}),
			(this.SRt = (t, e, i) => {
				1 === t ? this.pRt.set(e, i) : (this.pRt.delete(e), this.yRt(e)),
					this.IRt(),
					this.ILt();
			}),
			(this.T7e = () => 0 === this.vRt || this.pRt.size < this.vRt),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UILayoutBase],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetLayoutBase(1),
			this.MRt,
			this.GetItem(2),
		);
	}
	OnBeforeDestroy() {}
	ERt(t) {
		let e = 0;
		for (const i of this.pRt.keys()) {
			if (i === t) return e;
			e++;
		}
		return -1;
	}
	yRt(t) {
		this.eGe.GetLayoutItemByKey(t).RefreshIndex(0);
	}
	IRt() {
		let t = 0;
		for (const e of this.pRt.keys())
			this.eGe.GetLayoutItemByKey(e).RefreshIndex(t + 1), t++;
	}
	TRt() {
		var t = ModelManager_1.ModelManager.SortModel.GetSortResultData(
			this.Mne,
		).GetSelectAttributeSort();
		if (t) for (var [e, i] of t) this.pRt.set(e, i);
	}
	LRt() {
		var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
		(this.vRt = t.LimitNum),
			(this.CRt = t.DataId),
			this.eGe.RebuildLayoutByDataNew(t.AttributeSortList);
	}
	ILt() {
		var t = this.GetText(0);
		0 === this.vRt
			? LguiUtil_1.LguiUtil.SetLocalText(t, "AttributeSortName")
			: LguiUtil_1.LguiUtil.SetLocalText(
					t,
					"AttributeSortLimitName",
					this.pRt.size,
					this.vRt,
				);
	}
	Init(t) {
		(this.Mne = t), this.TRt(), this.LRt(), this.ILt();
	}
	Reset() {
		var t, e;
		for ([t, e] of (this.pRt.clear(), this.eGe.GetLayoutItemMap())) {
			var i = t;
			e.ShowSortItem(i, this.CRt, 0);
		}
		this.ILt();
	}
	GetTempSelectMap() {
		return this.pRt;
	}
}
exports.AttributeSortGroup = AttributeSortGroup;
