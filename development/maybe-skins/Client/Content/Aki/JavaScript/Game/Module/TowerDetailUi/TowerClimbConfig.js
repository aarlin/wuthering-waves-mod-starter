"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerClimbConfig = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	TowerBuffById_1 = require("../../../Core/Define/ConfigQuery/TowerBuffById"),
	TowerConfigById_1 = require("../../../Core/Define/ConfigQuery/TowerConfigById"),
	TowerConfigBySeason_1 = require("../../../Core/Define/ConfigQuery/TowerConfigBySeason"),
	TowerDifficultyByDifficulty_1 = require("../../../Core/Define/ConfigQuery/TowerDifficultyByDifficulty"),
	TowerTargetById_1 = require("../../../Core/Define/ConfigQuery/TowerTargetById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class TowerClimbConfig extends ConfigBase_1.ConfigBase {
	GetAreaFloorNumber(e, o, r) {
		let f = 0;
		for (const i of TowerConfigBySeason_1.configTowerConfigBySeason.GetConfigList(
			o <= 2 ? 0 : e,
		))
			i.Difficulty === o && i.AreaNum === r && f++;
		return f;
	}
	GetDifficultyFloorNumber(e, o) {
		let r = 0;
		for (const f of TowerConfigBySeason_1.configTowerConfigBySeason.GetConfigList(
			o <= 2 ? 0 : e,
		))
			f.Difficulty === o && r++;
		return r;
	}
	GetDifficultyLastFloor(e, o) {
		let r = -1,
			f = -1,
			i = -1;
		for (const t of TowerConfigBySeason_1.configTowerConfigBySeason.GetConfigList(
			o <= 2 ? 0 : e,
		))
			t.Difficulty === o &&
				(r < t.AreaNum && ((r = t.AreaNum), (f = -1)), f < t.Floor) &&
				(i = t.Id);
		return i;
	}
	GetDifficultyAllFloor(e, o) {
		var r = [];
		for (const f of TowerConfigBySeason_1.configTowerConfigBySeason.GetConfigList(
			o <= 2 ? 0 : e,
		))
			f.Difficulty === o && r.push(f.Id);
		return r;
	}
	GetDifficultyAllAreaFirstFloor(e, o) {
		let r = -1;
		var f = [];
		for (const i of TowerConfigBySeason_1.configTowerConfigBySeason.GetConfigList(
			o <= 2 ? 0 : e,
		))
			i.Difficulty === o && r !== i.AreaNum && (f.push(i.Id), (r = i.AreaNum));
		return f;
	}
	GetDifficultyAreaAllFloor(e, o, r) {
		var f = [];
		for (const i of TowerConfigBySeason_1.configTowerConfigBySeason.GetConfigList(
			o <= 2 ? 0 : e,
		))
			o === i.Difficulty && r === i.AreaNum && f.push(i.Id);
		return f;
	}
	GetDifficultyReward(e) {
		return TowerDifficultyByDifficulty_1.configTowerDifficultyByDifficulty.GetConfig(
			e,
		)?.Reward;
	}
	GetTowerBuffDesc(e) {
		return (
			(e = this.GetTowerBuffConfig(e)),
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Desc)
		);
	}
	GetTowerBuffName(e) {
		return (
			(e = this.GetTowerBuffConfig(e)),
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name)
		);
	}
	GetTowerBuffIcon(e) {
		return this.GetTowerBuffConfig(e)?.Icon;
	}
	GetTowerBuffConfig(e) {
		if ((e = TowerBuffById_1.configTowerBuffById.GetConfig(BigInt(e))))
			return e;
	}
	GetFloorTarget(e) {
		return TowerConfigById_1.configTowerConfigById.GetConfig(e)?.TargetConfig;
	}
	GetTargetConfig(e) {
		return TowerTargetById_1.configTowerTargetById.GetConfig(e);
	}
	GetNextFloorInArea(e) {
		var o = TowerConfigById_1.configTowerConfigById.GetConfig(e);
		for (const e of TowerConfigBySeason_1.configTowerConfigBySeason.GetConfigList(
			o.Season,
		))
			if (
				e.Difficulty === o.Difficulty &&
				e.AreaNum === o.AreaNum &&
				e.Floor > o.Floor
			)
				return e.Id;
		return 0;
	}
	GetLastFloorInArea(e) {
		var o = TowerConfigById_1.configTowerConfigById.GetConfig(e);
		if (1 === o.Floor) return 0;
		let r = 0;
		for (const e of TowerConfigBySeason_1.configTowerConfigBySeason.GetConfigList(
			o.Season,
		))
			e.Difficulty === o.Difficulty &&
				e.AreaNum === o.AreaNum &&
				e.Floor < o.Floor &&
				(r = e.Id);
		return r;
	}
	GetTowerInfo(e) {
		return TowerConfigById_1.configTowerConfigById.GetConfig(e);
	}
	GetTowerAreaName(e) {
		return (
			(e = TowerConfigById_1.configTowerConfigById.GetConfig(e)),
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.AreaName)
		);
	}
	GetNewTowerDifficultTitle(e) {
		switch (e) {
			case 1:
			default:
				return (
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"NewTower_Diffcult_1",
					) ?? ""
				);
			case 2:
				return (
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"NewTower_Diffcult_2",
					) ?? ""
				);
			case 3:
				return (
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"NewTower_Diffcult_3",
					) ?? ""
				);
		}
	}
}
exports.TowerClimbConfig = TowerClimbConfig;
