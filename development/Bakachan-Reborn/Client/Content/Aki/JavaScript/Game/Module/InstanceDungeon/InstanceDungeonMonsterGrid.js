"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonMonsterGrid = void 0);
const ue_1 = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../Util/LguiUtil");
class InstanceDungeonMonsterGrid extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(), (this.Vli = 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, ue_1.UIText],
			[1, ue_1.UIText],
			[2, ue_1.UITexture],
			[3, ue_1.UITexture],
		];
	}
	Refresh(e, n, t) {
		this.Vli = e;
		var o,
			r = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(
				this.Vli,
			);
		this.GetText(0).SetText(r);
		let a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId,
		).EntityLevel;
		a ||
			((r =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel
					.SelectInstanceId),
			(o = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel),
			([i, g] =
				ModelManager_1.ModelManager.ActivityModel.CheckActivityLevelBelongToType(
					r,
				)),
			(a = i
				? ModelManager_1.ModelManager.ActivityModel.GetActivityLevelRecommendLevel(
						r,
						o,
						g,
					)
				: ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
						r,
						o,
					))),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "LevelText", a);
		var i = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(
				this.Vli,
			),
			g =
				(this.SetTextureByPath(i, this.GetTexture(2)),
				ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(e)
					.ElementId);
		r = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(g);
		this.SetTextureByPath(r.Icon, this.GetTexture(3));
	}
}
exports.InstanceDungeonMonsterGrid = InstanceDungeonMonsterGrid;
