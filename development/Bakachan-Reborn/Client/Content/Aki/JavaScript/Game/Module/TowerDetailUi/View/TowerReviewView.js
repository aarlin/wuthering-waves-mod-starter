"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerReviewView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	TowerData_1 = require("../TowerData"),
	TowerReviewItem_1 = require("./TowerReviewItem");
class TowerReviewView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.KLo = void 0),
			(this.sBi = () => new TowerReviewItem_1.TowerReviewItem()),
			(this._Do = () => {
				ModelManager_1.ModelManager.TowerModel.ClearHandleData(),
					this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIVerticalLayout],
			[2, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this._Do]]);
	}
	OnStart() {
		(this.KLo = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(1),
			this.sBi,
		)),
			this.Og();
	}
	OnBeforeDestroy() {
		this.KLo = void 0;
	}
	Og() {
		var e = TowerData_1.VARIATION_RISK_DIFFICULTY,
			t = ModelManager_1.ModelManager.TowerModel.GetDifficultyAllAreaFirstFloor(
				e,
				!0,
			);
		t &&
			(this.KLo.RefreshByData(t),
			this.GetText(2).SetText(
				ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(e, !0) +
					"/" +
					ModelManager_1.ModelManager.TowerModel.GetDifficultyAllStars(e, !0),
			));
	}
}
exports.TowerReviewView = TowerReviewView;
