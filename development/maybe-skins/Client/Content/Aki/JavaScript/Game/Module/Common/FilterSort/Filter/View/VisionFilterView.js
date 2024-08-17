"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionFilterView = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../../../Ui/UiManager"),
	GenericScrollView_1 = require("../../../../Util/ScrollView/GenericScrollView"),
	CommonSearchComponent_1 = require("../../../InputView/CommonSearchComponent"),
	FilterGroup_1 = require("./FilterGroup");
class VisionFilterView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Scroll = void 0),
			(this.SearchScroll = void 0),
			(this.ogt = void 0),
			(this.gGe = ""),
			(this.gLt = void 0),
			(this.ALt = void 0),
			(this.dqe = void 0),
			(this.PLt = !1),
			(this.xLt = () => {
				(this.gGe = ""), this.wLt(!1);
				for (const t of this.Scroll.GetScrollItemList())
					t.SetSelectedDataMap(this.gLt),
						t.InitFilterSetData(),
						t.RefreshGroupItem(),
						t.RefreshSelectAllToggleState();
			}),
			(this.BLt = (t) => {
				(this.gGe = t), this.gLt.clear(), this.Og();
			}),
			(this.Mbe = (t) => {
				this.BLt(t);
			}),
			(this.Tqe = () => {
				this.xLt();
			}),
			(this.MLt = (t, e, i) => {
				var o =
					((e = new FilterGroup_1.FilterItem(e)).SetToggleFunction(this.SLt),
					this.gLt.has(t.FilterId));
				return e.ShowTemp(t, o), { Key: t, Value: e };
			}),
			(this.SLt = (t, e, i) => {
				1 === t ? this.gLt.set(e, i) : this.gLt.delete(e);
			}),
			(this.ULt = (t, e, i) => (
				(e = new FilterGroup_1.FilterGroup(e)).SetSelectedDataMap(this.gLt),
				e.SetToggleFunction(this.SLt),
				e.SetOnSelectAllFunction(this.SLt),
				e.ShowTemp(t, this.ogt.ConfigId),
				{ Key: (t = e.GetFilterType()), Value: e }
			)),
			(this.O8e = () => {
				if (this.PLt) {
					this.gLt.clear();
					for (const t of this.SearchScroll.GetScrollItemList())
						t.SetToggleState(!1);
				} else
					for (const t of this.Scroll.GetScrollItemList())
						t.ResetTempFilterDataMap(),
							t.RefreshGroupItem(),
							t.RefreshSelectAllToggleState();
			}),
			(this.RLt = () => {
				const t = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(
					this.ogt.ConfigId,
				);
				t.ClearSelectRuleData(),
					this.gLt.forEach((e, i) => {
						var o = this.ALt.get(i);
						t.AddSingleRuleData(o, i, e);
					}),
					this.ogt.ConfirmFunction?.(),
					UiManager_1.UiManager.CloseView(this.Info.Name);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIScrollViewWithScrollbarComponent],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[1, this.O8e],
				[2, this.RLt],
			]);
	}
	OnStart() {
		(this.ogt = this.OpenParam),
			this.bLt(),
			(this.dqe = new CommonSearchComponent_1.CommonSearchComponent(
				this.GetItem(4),
				this.Mbe,
				this.Tqe,
			));
	}
	bLt() {
		(this.Scroll = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(0),
			this.ULt,
		)),
			(this.SearchScroll = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(3),
				this.MLt,
			));
	}
	qLt() {
		var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
			this.ogt.ConfigId,
		);
		this.Scroll.RefreshByData(t.RuleList), this.wLt(!1);
	}
	GLt() {
		var t,
			e,
			i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
				this.ogt.ConfigId,
			);
		const o = new Array();
		i.RuleList.forEach((t) => {
			ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(
				t,
				this.ogt.ConfigId,
			).forEach((t) => {
				t.Content.includes(this.gGe) && o.push(t);
			});
		});
		for (const i of this.Scroll.GetScrollItemList())
			for ([t, e] of i.GetTempFilterDataMap()) this.gLt.set(t, e);
		this.SearchScroll.RefreshByData(o), this.wLt(!0);
	}
	wLt(t) {
		this.GetScrollViewWithScrollbar(0).RootUIComp.SetUIActive(!t),
			this.GetScrollViewWithScrollbar(3).RootUIComp.SetUIActive(t),
			(this.PLt = t);
	}
	Og() {
		StringUtils_1.StringUtils.IsEmpty(this.gGe) ? this.qLt() : this.GLt();
	}
	OnBeforeShow() {
		(this.ALt = new Map()),
			ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
				this.ogt.ConfigId,
			).RuleList.forEach((t) => {
				const e =
					ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(
						t,
					).FilterType;
				ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(
					t,
					this.ogt.ConfigId,
				).forEach((t) => {
					this.ALt.set(t.FilterId, e);
				});
			}),
			(this.gLt = new Map());
		var t = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(
			this.ogt.ConfigId,
		)?.GetSelectRuleData();
		t &&
			t.forEach((t) => {
				t.forEach((t, e) => {
					this.gLt?.set(e, t);
				});
			}),
			this.Og();
	}
	OnBeforeDestroy() {
		this.dqe.Destroy();
	}
}
exports.VisionFilterView = VisionFilterView;
