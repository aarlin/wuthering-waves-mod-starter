"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerMonsterItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class TowerMonsterItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UITexture],
			[3, UE.UITexture],
			[4, UE.UIItem],
		];
	}
	Refresh(e, t, n) {
		var o = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(e);
		this.SetTextureByPath(o, this.GetTexture(2)),
			(o =
				ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
					e,
				).ElementId),
			(o = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(o)),
			this.SetTextureByPath(o.Icon, this.GetTexture(3)),
			this.GetItem(4)?.SetColor(UE.Color.FromHex(o.ElementColor)),
			(o = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(e)),
			(o = (e =
				(this.GetText(0).SetText(o),
				ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
					ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
				))).InstanceId),
			(e =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
					o,
					ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
				));
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(1),
			"Text_InstanceDungeonRecommendLevel_Text",
			e,
		);
	}
	SetLevelText(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(1),
			"Text_InstanceDungeonRecommendLevel_Text",
			e,
		);
	}
}
exports.TowerMonsterItem = TowerMonsterItem;
