"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FilterEntrance = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
	FilterSortController_1 = require("../../FilterSortController"),
	FilterViewData_1 = require("../Model/FilterViewData");
class FilterEntrance extends UiPanelBase_1.UiPanelBase {
	constructor(t, e) {
		super(),
			(this.UpdateDataListFunction = e),
			(this.rLt = void 0),
			(this.uft = []),
			(this.nLt = []),
			(this.sLt = void 0),
			(this.Mne = 0),
			(this.aLt = () => {
				var t = new FilterViewData_1.FilterViewData(this.Mne, this.cIt);
				FilterSortController_1.FilterSortController.OpenFilterView(t);
			}),
			(this.cIt = () => {
				this.C4e(), this.Ift(!1);
			}),
			(this.gPe = () => {
				ModelManager_1.ModelManager.FilterModel.ClearData(this.Mne),
					this.GetItem(1).SetUIActive(!1),
					this.Ift(!1);
			}),
			(this.hLt = (t) => {
				this.Mne === t && (this.Ift(!0), this.C4e());
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[0, this.aLt],
				[3, this.gPe],
			]);
	}
	OnStart() {
		this.GetItem(1).SetUIActive(!1), this.AddEventListener();
	}
	OnBeforeDestroy() {
		ModelManager_1.ModelManager.FilterModel.DeleteFilterResultData(this.Mne),
			this.RemoveEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnFilterDataUpdate,
			this.hLt,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnFilterDataUpdate,
			this.hLt,
		);
	}
	C4e() {
		var t = this.rLt.ShowAllFilterContent(),
			e = this.GetItem(1);
		StringUtils_1.StringUtils.IsBlank(t)
			? e.SetUIActive(!1)
			: (e.SetUIActive(!0), this.GetText(2).SetText(t));
	}
	Ift(t) {
		var e = (n = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(
				this.Mne,
			)).DataType,
			i = this.rLt.GetSelectRuleData(),
			n =
				((e = ModelManager_1.ModelManager.FilterModel.GetFilterList(
					this.uft,
					e,
					n.IsSupportSelectAll,
					i,
				)),
				ConfigManager_1.ConfigManager.SortConfig.GetSortId(this.sLt));
		(i = ModelManager_1.ModelManager.SortModel.GetSortResultData(n)) &&
			ModelManager_1.ModelManager.SortModel.SortDataList(e, n, i, ...this.nLt),
			this.UpdateDataListFunction?.(e, t, 0);
	}
	lLt(t) {
		(this.sLt = t),
			(this.Mne = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(t));
	}
	_Lt() {
		(this.rLt = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(
			this.Mne,
		)),
			this.rLt ||
				((this.rLt = new FilterViewData_1.FilterResultData()),
				this.rLt.SetConfigId(this.Mne),
				ModelManager_1.ModelManager.FilterModel.SetFilterResultData(
					this.Mne,
					this.rLt,
				));
	}
	uLt() {
		this.SetActive(0 < this.Mne);
	}
	UpdateData(t, e, ...i) {
		this.lLt(t),
			this.uLt(),
			this.Mne <= 0 ||
				((this.uft = e),
				(this.nLt = i),
				this._Lt(),
				this.C4e(),
				0 === ConfigManager_1.ConfigManager.SortConfig.GetSortId(this.sLt) &&
					this.Ift(!0));
	}
}
exports.FilterEntrance = FilterEntrance;
