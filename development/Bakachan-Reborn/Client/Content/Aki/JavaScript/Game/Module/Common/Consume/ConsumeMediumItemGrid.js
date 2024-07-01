"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConsumeMediumItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LoopScrollMediumItemGrid_1 = require("../MediumItemGrid/LoopScrollMediumItemGrid");
class ConsumeMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	OnRefresh(e, t, o) {
		var a = ConfigManager_1.ConfigManager.InventoryConfig,
			n = e[0].ItemId,
			i = e[0].IncId,
			r = e[1];
		if (0 === n) {
			const e = { Type: 1 };
			this.Apply(e);
		} else {
			var d =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(n);
			if (d)
				if (3 === (a = a.GetItemDataTypeByConfigId(n))) {
					var l =
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
							i,
						);
					const t = {
						Type: 4,
						Data: e,
						ItemConfigId: n,
						BottomTextId: d.Name,
						StarLevel: d.QualityId,
						Level: l.GetCost(),
						IsLevelTextUseChangeColor: !0,
						ReduceButtonInfo: { IsVisible: !0, LongPressConfigId: 1 },
					};
					(t.BottomTextId = "VisionLevel"),
						(t.BottomTextParameter = [l.GetPhantomLevel()]),
						(t.VisionFetterGroupId = l.GetFetterGroupId()),
						this.Apply(t);
				} else if (2 === a) {
					const t = {
						Type: 4,
						Data: e,
						ItemConfigId: n,
						BottomTextId: "Text_LevelShow_Text",
						BottomTextParameter: [
							(l =
								ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
									i,
								)).GetLevel(),
						],
						StarLevel: d.QualityId,
						Level: l.GetResonanceLevel(),
						ReduceButtonInfo: { IsVisible: !0, LongPressConfigId: 1 },
					};
					this.Apply(t);
				} else {
					const t = {
						Type: 4,
						Data: e,
						ItemConfigId: n,
						StarLevel: d.QualityId,
						ReduceButtonInfo: { IsVisible: !0, LongPressConfigId: 1 },
					};
					void 0 !== i && 0 < i
						? (t.BottomTextId = d.Name)
						: (t.BottomText = r.toString()),
						this.Apply(t);
				}
		}
	}
}
exports.ConsumeMediumItemGrid = ConsumeMediumItemGrid;
