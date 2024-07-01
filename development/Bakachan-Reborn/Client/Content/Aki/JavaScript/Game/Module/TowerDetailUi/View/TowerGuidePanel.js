"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerGuidePanel = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	TowerBuffShowItem_1 = require("./TowerBuffShowItem");
class TowerGuidePanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(),
			(this.xLo = void 0),
			(this.bLo = () => new TowerBuffShowItem_1.TowerBuffShowItem());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UITexture],
			[4, UE.UIScrollViewWithScrollbarComponent],
		];
	}
	OnStart() {
		this.xLo = new GenericScrollViewNew_1.GenericScrollViewNew(
			this.GetScrollViewWithScrollbar(4),
			this.bLo,
		);
		var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
			"T_ImgHelp_DailyTower_001_UI",
		);
		this.SetTextureByPath(e, this.GetTexture(3)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "TowerGuideDes");
	}
	OnBeforeShow() {
		var e = ModelManager_1.ModelManager.TowerModel.CurrentTowerId;
		e &&
			(e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e)) &&
			this.xLo.RefreshByData(e.ShowBuffs);
	}
}
exports.TowerGuidePanel = TowerGuidePanel;
