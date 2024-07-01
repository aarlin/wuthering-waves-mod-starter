"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SortView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
	AttributeSortGroup_1 = require("./AttributeSortGroup"),
	BaseSortGroup_1 = require("./BaseSortGroup");
class SortView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.VRt = void 0),
			(this.HRt = void 0),
			(this.ogt = void 0),
			(this.O8e = () => {
				this.VRt.Reset(), this.HRt.Reset();
			}),
			(this.RLt = () => {
				var t = ModelManager_1.ModelManager.SortModel.GetSortResultData(
					this.ogt.ConfigId,
				);
				t.SetSelectBaseSort(this.VRt.GetTempSelect()),
					t.SetSelectAttributeSort(this.HRt.GetTempSelectMap()),
					this.ogt.ConfirmFunction?.(),
					this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIItem],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.O8e],
				[1, this.RLt],
			]);
	}
	OnStart() {
		(this.VRt = new BaseSortGroup_1.BaseSortGroup(this.GetItem(2))),
			(this.HRt = new AttributeSortGroup_1.AttributeSortGroup(this.GetItem(3))),
			(this.ogt = this.OpenParam),
			this.LRt();
	}
	OnBeforeDestroy() {
		this.VRt.Destroy(), this.HRt.Destroy();
	}
	LRt() {
		this.VRt.Init(this.ogt.ConfigId), this.HRt.Init(this.ogt.ConfigId);
	}
}
exports.SortView = SortView;
