"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FilterSortEntrance = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	FilterEntrance_1 = require("./Filter/View/FilterEntrance"),
	SortEntrance_1 = require("./Sort/View/SortEntrance");
class FilterSortEntrance extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.UpdateList = t),
			(this.aft = void 0),
			(this.hft = void 0),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		(this.aft = new FilterEntrance_1.FilterEntrance(
			this.GetItem(0),
			this.UpdateList,
		)),
			(this.hft = new SortEntrance_1.SortEntrance(
				this.GetItem(1),
				this.UpdateList,
			));
	}
	UpdateData(e, t) {
		this.aft.UpdateData(e, t), this.hft.UpdateData(e, t);
	}
	ClearData(e) {
		var t;
		(t =
			((t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(e)) &&
				ModelManager_1.ModelManager.FilterModel.ClearData(t),
			ConfigManager_1.ConfigManager.SortConfig.GetSortId(e))) &&
			ModelManager_1.ModelManager.SortModel.DeleteSortResultData(t);
	}
}
exports.FilterSortEntrance = FilterSortEntrance;
