"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerRecommendView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	TowerRecommendItem_1 = require("./TowerRecommendItem");
class TowerRecommendView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.aDo = void 0),
			(this.sBi = () => new TowerRecommendItem_1.TowerRecommendItem());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UIText],
		];
	}
	OnStart() {
		(this.aDo = new GenericScrollViewNew_1.GenericScrollViewNew(
			this.GetScrollViewWithScrollbar(0),
			this.sBi,
		)),
			this.Og();
	}
	OnBeforeDestroy() {
		this.aDo = void 0;
	}
	Og() {
		ModelManager_1.ModelManager.TowerModel.RecommendFormation &&
		0 < ModelManager_1.ModelManager.TowerModel.RecommendFormation?.length
			? (this.aDo.SetActive(!0),
				this.aDo.RefreshByData(
					ModelManager_1.ModelManager.TowerModel.RecommendFormation,
				),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(1),
					"Text_DataFromOther_Text",
				))
			: (this.aDo.SetActive(!1),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(1),
					"Text_DataCollation_Text",
				));
	}
}
exports.TowerRecommendView = TowerRecommendView;
