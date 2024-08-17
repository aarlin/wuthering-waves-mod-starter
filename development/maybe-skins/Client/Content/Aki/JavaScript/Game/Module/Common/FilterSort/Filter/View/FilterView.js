"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FilterView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
	GenericScrollView_1 = require("../../../../Util/ScrollView/GenericScrollView"),
	FilterGroup_1 = require("./FilterGroup");
class FilterView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Scroll = void 0),
			(this.ogt = void 0),
			(this.DLt = void 0),
			(this.O8e = () => {
				for (const e of this.Scroll.GetScrollItemList())
					e.ResetTempFilterDataMap(),
						e.RefreshGroupItem(),
						e.RefreshSelectAllToggleState();
			}),
			(this.RLt = () => {
				var e,
					t,
					i = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(
						this.ogt.ConfigId,
					);
				for ([e, t] of this.Scroll.GetScrollItemMap()) {
					var r = t.GetTempFilterDataMap();
					i.SetSelectRuleData(e, r);
				}
				this.ogt.ConfirmFunction?.(), this.CloseMe();
			}),
			(this.ULt = (e, t, i) => (
				(t = new FilterGroup_1.FilterGroup(t)).ShowTemp(e, this.ogt.ConfigId),
				{ Key: (e = t.GetFilterType()), Value: t }
			));
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[1, this.O8e],
				[2, this.RLt],
			]);
	}
	OnBeforeCreate() {
		this.ogt = this.OpenParam;
	}
	async OnCreateAsync() {
		var e = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
				this.ogt.ConfigId,
			),
			t =
				((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					e.GridType,
				)),
				await this.LoadPrefabAsync(e, void 0));
		t?.IsValid()
			? (this.DLt = t.GetUIItem())
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Filter",
					11,
					"动态加载筛选格子失败",
					["配置项id", this.ogt.ConfigId],
					["路径", e],
				);
	}
	OnStart() {
		this.DLt.SetUIParent(this.GetScrollViewWithScrollbar(0).ContentUIItem),
			this.TLt();
	}
	OnBeforeDestroy() {
		this.Scroll.ClearChildren();
	}
	TLt() {
		this.Scroll = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(0),
			this.ULt,
			this.DLt,
		);
		var e = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
			this.ogt.ConfigId,
		);
		this.Scroll.RefreshByData(e.RuleList);
	}
}
exports.FilterView = FilterView;
