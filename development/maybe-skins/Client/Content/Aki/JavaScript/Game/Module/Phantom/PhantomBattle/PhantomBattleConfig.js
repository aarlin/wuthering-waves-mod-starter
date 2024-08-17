"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomBattleConfig = exports.COSTLIST = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ItemInfoById_1 = require("../../../../Core/Define/ConfigQuery/ItemInfoById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	PhantomExpItemAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomExpItemAll"),
	PhantomExpItemByItemId_1 = require("../../../../Core/Define/ConfigQuery/PhantomExpItemByItemId"),
	PhantomFetterAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterAll"),
	PhantomFetterById_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterById"),
	PhantomFetterGroupAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterGroupAll"),
	PhantomFetterGroupById_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterGroupById"),
	PhantomGrowthByGrowthIdAndLevel_1 = require("../../../../Core/Define/ConfigQuery/PhantomGrowthByGrowthIdAndLevel"),
	PhantomItemAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomItemAll"),
	PhantomItemByItemId_1 = require("../../../../Core/Define/ConfigQuery/PhantomItemByItemId"),
	PhantomItemByMonsterId_1 = require("../../../../Core/Define/ConfigQuery/PhantomItemByMonsterId"),
	PhantomLevelByGroupId_1 = require("../../../../Core/Define/ConfigQuery/PhantomLevelByGroupId"),
	PhantomLevelByGroupIdAndLevel_1 = require("../../../../Core/Define/ConfigQuery/PhantomLevelByGroupIdAndLevel"),
	PhantomMainPropertyById_1 = require("../../../../Core/Define/ConfigQuery/PhantomMainPropertyById"),
	PhantomMainPropItemById_1 = require("../../../../Core/Define/ConfigQuery/PhantomMainPropItemById"),
	PhantomQualityByQuality_1 = require("../../../../Core/Define/ConfigQuery/PhantomQualityByQuality"),
	PhantomRarityByRare_1 = require("../../../../Core/Define/ConfigQuery/PhantomRarityByRare"),
	PhantomSkillById_1 = require("../../../../Core/Define/ConfigQuery/PhantomSkillById"),
	PhantomSkillByPhantomSkillId_1 = require("../../../../Core/Define/ConfigQuery/PhantomSkillByPhantomSkillId"),
	PhantomSubPropertyById_1 = require("../../../../Core/Define/ConfigQuery/PhantomSubPropertyById"),
	PhantomSubPropertyByPropId_1 = require("../../../../Core/Define/ConfigQuery/PhantomSubPropertyByPropId"),
	PhantomWildItemAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomWildItemAll"),
	TrailPhantomPropById_1 = require("../../../../Core/Define/ConfigQuery/TrailPhantomPropById"),
	TrialPhantomPropItemById_1 = require("../../../../Core/Define/ConfigQuery/TrialPhantomPropItemById"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	COST3 = 3,
	COST1 = 1;
exports.COSTLIST = [1, 3, 4];
class PhantomBattleConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.W5i = new Map());
	}
	GetPhantomItemList() {
		var o = PhantomItemAll_1.configPhantomItemAll.GetConfigList();
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						28,
						"获取幻象道具配置列表失败, 请检查配置表",
					)),
			o
		);
	}
	GetPhantomItemById(o) {
		var e = PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Phantom", 28, "获取幻象道具配置失败, 请检查配置表", [
						"id",
						o,
					])),
			e
		);
	}
	GetPhantomItemByMonsterId(o) {
		return PhantomItemByMonsterId_1.configPhantomItemByMonsterId.GetConfigList(
			o,
		);
	}
	GetPhantomSkillList(o) {
		var e =
			PhantomSkillByPhantomSkillId_1.configPhantomSkillByPhantomSkillId.GetConfigList(
				o,
			);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						28,
						"获取幻象技能配置列表失败, 请检查配置表",
						["SkillId", o],
					)),
			e
		);
	}
	GetPhantomSkillDescExByPhantomSkillIdAndQuality(o, e = 2) {
		var t = (o =
			PhantomSkillByPhantomSkillId_1.configPhantomSkillByPhantomSkillId.GetConfigList(
				o,
			)[0]).LevelDescStrArray.length;
		return (t < e ? o.LevelDescStrArray[t - 1] : o.LevelDescStrArray[e - 1])
			.ArrayString;
	}
	GetPhantomSkillDescExBySkillIdAndQuality(o, e = 2) {
		var t = (o = PhantomSkillById_1.configPhantomSkillById.GetConfig(o))
			.LevelDescStrArray.length;
		return (t < e ? o.LevelDescStrArray[t - 1] : o.LevelDescStrArray[e - 1])
			.ArrayString;
	}
	GetPhantomSkillBySkillId(o) {
		var e =
			PhantomSkillByPhantomSkillId_1.configPhantomSkillByPhantomSkillId.GetConfigList(
				o,
			);
		return (
			0 === e?.length &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Phantom",
					28,
					"获取幻象技能配置失败, 请检查配置表, 也可能是探索技能",
					["SkillId", o],
				),
			e[0]
		);
	}
	GetPhantomRareConfig(o) {
		return PhantomRarityByRare_1.configPhantomRarityByRare.GetConfig(o);
	}
	GetPhantomQualityByItemQuality(o) {
		var e =
			PhantomQualityByQuality_1.configPhantomQualityByQuality.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Phantom", 28, "获取幻象品质配置失败, 请检查配置表", [
						"id",
						o,
					])),
			e
		);
	}
	GetPhantomMainPropertyById(o) {
		var e =
			PhantomMainPropertyById_1.configPhantomMainPropertyById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						28,
						"获取幻象主属性配置失败, 请检查配置表",
						["id", o],
					)),
			e
		);
	}
	GetPhantomMainPropertyItemId(o) {
		var e =
			PhantomMainPropItemById_1.configPhantomMainPropItemById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						28,
						"获取幻象主属性配置失败, 请检查配置表",
						["id", o],
					)),
			e
		);
	}
	GetPhantomSubPropertyById(o) {
		var e = PhantomSubPropertyById_1.configPhantomSubPropertyById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Phantom", 28, "获取幻象属性配置失败, 请检查配置表", [
						"id",
						o,
					])),
			e
		);
	}
	GetPhantomFetterList() {
		var o = PhantomFetterAll_1.configPhantomFetterAll.GetConfigList();
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						28,
						"获取幻象羁绊配置列表失败, 请检查配置表",
					)),
			o
		);
	}
	GetPhantomFetterGroupList() {
		var o = PhantomFetterGroupAll_1.configPhantomFetterGroupAll.GetConfigList();
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						28,
						"获取幻象羁绊配置列表失败, 请检查配置表",
					)),
			o
		);
	}
	GetPhantomFetterById(o) {
		var e = PhantomFetterById_1.configPhantomFetterById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Phantom", 28, "获取幻象羁绊配置失败, 请检查配置表", [
						"Id",
						o,
					])),
			e
		);
	}
	GetPhantomLevelExpByGroupIdAndLevel(o, e) {
		var t =
			PhantomLevelByGroupIdAndLevel_1.configPhantomLevelByGroupIdAndLevel.GetConfig(
				o,
				e,
			);
		return (
			t ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						28,
						"获取幻象升级消耗配置失败, 请检查配置表",
						["groupId", o],
						["level", e],
					)),
			t.Exp
		);
	}
	GetPhantomLevelListByGroupId(o) {
		var e =
			PhantomLevelByGroupId_1.configPhantomLevelByGroupId.GetConfigList(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						28,
						"获取幻象升级消耗配置列表失败, 请检查配置表",
						["groupId", o],
					)),
			e
		);
	}
	GetItemInfoById(o) {
		var e = ItemInfoById_1.configItemInfoById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Phantom", 28, "获取道具配置失败, 请检查配置表", [
						"itemId",
						o,
					])),
			e
		);
	}
	GetPhantomExpItemById(o) {
		var e = PhantomExpItemByItemId_1.configPhantomExpItemByItemId.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						28,
						"获取幻象经验道具配置失败, 请检查配置表",
						["itemId", o],
					)),
			e
		);
	}
	GetPhantomExpItemList() {
		return PhantomExpItemAll_1.configPhantomExpItemAll.GetConfigList();
	}
	GetPhantomWildItem() {
		return PhantomWildItemAll_1.configPhantomWildItemAll.GetConfigList();
	}
	GetPhantomGrowthValueByGrowthIdAndLevel(o, e) {
		var t =
			PhantomGrowthByGrowthIdAndLevel_1.configPhantomGrowthByGrowthIdAndLevel.GetConfig(
				o,
				e,
			);
		return (
			t ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						28,
						"获取幻象成长曲线值配置失败, 请检查配置表",
						["growthId", o],
						["level", e],
					)),
			t.Value
		);
	}
	GetPhantomSubPropertyByPropId(o) {
		return PhantomSubPropertyByPropId_1.configPhantomSubPropertyByPropId.GetConfigList(
			o,
		);
	}
	GetPhantomLevelUpCostRatio() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"PhantomLevelUpCoinCost",
			) / 1e3
		);
	}
	GetTrailPhantomPropItemById(o) {
		var e =
			TrialPhantomPropItemById_1.configTrialPhantomPropItemById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						28,
						"获取configTrialPhantomPropItemById, 请检查配置表",
						["id", o],
					)),
			e.Prop
		);
	}
	GetQualityIdentifyCost(o) {
		return this.GetPhantomQualityByItemQuality(o).IdentifyCoin;
	}
	GetFetterGroupById(o) {
		return PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(o);
	}
	GetFetterGroupFetterDataById(o) {
		return PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(o)
			.FetterMap;
	}
	GetFetterGroupArray() {
		return PhantomFetterGroupAll_1.configPhantomFetterGroupAll.GetConfigList();
	}
	GetFetterGroupSourceMonster(o) {
		var e = this.GetPhantomItemList();
		const t = new Array();
		return (
			e.forEach((e) => {
				!e.ParentMonsterId && e.FetterGroup.includes(o) && t.push(e.MonsterId);
			}),
			t
		);
	}
	GetFetterMapResultBySuitMap(o) {
		const e = new Map();
		return (
			o.forEach((o, t) => {
				var r =
					PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(
						t,
					).FetterMap;
				let n = 0,
					i = 0;
				const a = new Map();
				r.forEach((e, t) => {
					t <= o && ((n = e), (i = t)), 0 < n && a.set(n, i);
				}),
					0 < a.size && e.set(t, a);
			}),
			e
		);
	}
	GetFetterResultBySuitMap(o) {
		const e = new Array();
		return (
			o.forEach((o, t) => {
				t =
					PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(
						t,
					).FetterMap;
				let r = 0;
				t.forEach((e, t) => {
					t <= o && (r = e);
				}),
					0 < r && e.push(r);
			}),
			e
		);
	}
	GetPhantomQualityBgSprite(o) {
		return void 0 === o || 0 === o
			? CommonParamById_1.configCommonParamById.GetStringConfig(
					"VisionQualityDefaultSprite",
				)
			: this.GetPhantomQualityByItemQuality(o).QualitySprite;
	}
	GetPhantomSlotUnlockLevel(o) {
		return this.GetPhantomQualityByItemQuality(o).SlotUnlockLevel;
	}
	GetPhantomIdentifyCost(o) {
		return this.GetPhantomQualityByItemQuality(o).IdentifyCost;
	}
	GetMonsterIdName(o) {
		return (
			(o = this.GetPhantomItemByMonsterId(o)),
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o[0].MonsterName)
		);
	}
	GetFetterNameByFetterNameId(o) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o);
	}
	GetTrialPhantomPropConfig(o) {
		return TrailPhantomPropById_1.configTrailPhantomPropById.GetConfig(o);
	}
	GetVisionLevelUpQualityLimit() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"VisionHighQuality",
		);
	}
	GetVisionLevelUpRareLimit() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"VisionHighRare",
		);
	}
	GetVisionLevelUpLevelLimit() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"VisionHighLevel",
		);
	}
	GetVisionScrollerMoveDistance() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"VisionScrollerMoveDistance",
		);
	}
	GetVisionScrollerPressTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"VisionScrollerLongPressTime",
		);
	}
	GetVisionBeforeScrollerLongPressTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"VisionBeforeScrollerLongPressTime",
		);
	}
	GetVisionScrollerOffsetX() {
		return ModelManager_1.ModelManager.PlatformModel.IsMobile()
			? CommonParamById_1.configCommonParamById.GetFloatConfig(
					"VisionScrollerOffsetX",
				)
			: 0;
	}
	GetVisionScrollerOffsetY() {
		return ModelManager_1.ModelManager.PlatformModel.IsMobile()
			? CommonParamById_1.configCommonParamById.GetFloatConfig(
					"VisionScrollerOffsetY",
				)
			: 0;
	}
	GetVisionScrollerOffsetXDir() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"VisionScrollerOffsetXDir",
		);
	}
	GetVisionScrollerOffsetYDir() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"VisionScrollerOffsetYDir",
		);
	}
	GetVisionDragCurve() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionDragCurve",
		);
	}
	GetVisionDragCurveTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"VisionDragAnimationTime",
		);
	}
	GetFilterOwnTexture() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionFilterSpriteOwn",
		);
	}
	GetFilterNotOwnTexture() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionFilterSpriteNotOwn",
		);
	}
	GetFilterEquipTexture() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionFilterSpriteEquipped",
		);
	}
	GetFilterNoEquipTexture() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionFilterSpriteNotEquipped",
		);
	}
	GetVisionLevelUpTexture() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionLevelUpUnlockTexture",
		);
	}
	GetVisionHeadSprBgB() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionHeadSprBgB",
		);
	}
	GetVisionHeadSprBgA() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionHeadSprBgA",
		);
	}
	GetVisionHeadLightBgA() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionHeadLightBgA",
		);
	}
	GetVisionHeadLightBgB() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionHeadLightBgB",
		);
	}
	GetVisionReachableCostMax() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"PhantomTotalCost",
		);
	}
	GetVisionFetterDefaultColor() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionFetterDefaultColor",
		);
	}
	GetVisionFetterDefaultTexture() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionFetterDefaultTexture",
		);
	}
	GetVisionLevelUpDelay() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"VisionLevelUpDelay",
		);
	}
	GetVisionIdentifyDelay() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"VisionIdentifyDelay",
		);
	}
	GetVisionCostColorBase() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionCostColorBase",
		);
	}
	GetVisionCostColorFull() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionCostColorFull",
		);
	}
	GetVisionCostColorAlert() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionCostColorAlert",
		);
	}
	GetVisionIdentifyAnimationTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"VisionIdentifyAnimationTime",
		);
	}
	GetVisionMainAttributeSortArray() {
		return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"VisionMainAttributeSortArray",
		);
	}
	GetVisionMainPercentageAttributeSortArray() {
		return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"VisionMainPercentageAttributeSortArray",
		);
	}
	GetVisionSubAttributeSortArray() {
		return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"VisionSubAttributeSortArray",
		);
	}
	GetVisionSubPercentageAttributeSortArray() {
		return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"VisionSubPercentageAttributeSortArray",
		);
	}
	GetVisionDestroyCostSpriteByCost(o) {
		return 1 === o
			? this.GetVisionDestroyCost1()
			: 3 === o
				? this.GetVisionDestroyCost3()
				: this.GetVisionDestroyCost4();
	}
	GetVisionDestroyCost1() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionFilterSpriteCost1",
		);
	}
	GetVisionDestroyCost3() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionFilterSpriteCost3",
		);
	}
	GetVisionDestroyCost4() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"VisionFilterSpriteCost4",
		);
	}
	OnClear() {
		return this.W5i.clear(), !0;
	}
}
exports.PhantomBattleConfig = PhantomBattleConfig;
