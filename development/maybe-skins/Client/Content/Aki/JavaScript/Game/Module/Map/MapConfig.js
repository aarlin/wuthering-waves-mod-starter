"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	BlockSwitchById_1 = require("../../../Core/Define/ConfigQuery/BlockSwitchById"),
	CustomMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/CustomMarkByMarkId"),
	DynamicMapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/DynamicMapMarkByMarkId"),
	FogBlockAll_1 = require("../../../Core/Define/ConfigQuery/FogBlockAll"),
	FogBlockByBlock_1 = require("../../../Core/Define/ConfigQuery/FogBlockByBlock"),
	FogTextureConfigAll_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigAll"),
	FogTextureConfigByBlock_1 = require("../../../Core/Define/ConfigQuery/FogTextureConfigByBlock"),
	LevelEntityConfigByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByMapIdAndEntityId"),
	MapBorderAll_1 = require("../../../Core/Define/ConfigQuery/MapBorderAll"),
	MapBorderByBorderId_1 = require("../../../Core/Define/ConfigQuery/MapBorderByBorderId"),
	MapMarkByMapId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMapId"),
	MapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
	MapMarkRelativeSubTypeAll_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeAll"),
	MapMarkRelativeSubTypeByFunctionId_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeByFunctionId"),
	MapMarkRelativeSubTypeById_1 = require("../../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeById"),
	MultiMapAll_1 = require("../../../Core/Define/ConfigQuery/MultiMapAll"),
	MultiMapAreaConfigAll_1 = require("../../../Core/Define/ConfigQuery/MultiMapAreaConfigAll"),
	MultiMapAreaConfigByBlock_1 = require("../../../Core/Define/ConfigQuery/MultiMapAreaConfigByBlock"),
	MultiMapByGroupId_1 = require("../../../Core/Define/ConfigQuery/MultiMapByGroupId"),
	MultiMapById_1 = require("../../../Core/Define/ConfigQuery/MultiMapById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	SoundBoxMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/SoundBoxMarkByMarkId"),
	TaskMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TaskMarkByMarkId"),
	TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById"),
	TemporaryTeleportMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TemporaryTeleportMarkByMarkId"),
	TreasureBoxDetectorMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TreasureBoxDetectorMarkByMarkId"),
	TreasureBoxMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TreasureBoxMarkByMarkId"),
	UiResourceById_1 = require("../../../Core/Define/ConfigQuery/UiResourceById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	DEFAULT_CONFIG_ID = 1;
class MapConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.pLi = void 0), (this.vLi = void 0);
	}
	OnInit() {
		(this.pLi = new Map()), (this.vLi = new Map());
		var r =
			MapMarkRelativeSubTypeAll_1.configMapMarkRelativeSubTypeAll.GetConfigList();
		if (r) for (const e of r) this.pLi.set(e.FunctionId, !0);
		if ((r = FogBlockAll_1.configFogBlockAll.GetConfigList()))
			for (const e of r) this.vLi.set(e.Block, !0);
		return !0;
	}
	OnClear() {
		return (
			this.pLi?.clear(),
			this.vLi?.clear(),
			(this.pLi = void 0),
			!(this.vLi = void 0)
		);
	}
	GetTaskMarkConfig(r) {
		return TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(r);
	}
	GetConfigMarks(r) {
		return (
			(r = MapMarkByMapId_1.configMapMarkByMapId.GetConfigList(r)) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "找不到MapMark表")),
			r
		);
	}
	GetConfigMark(r) {
		return MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(r);
	}
	GetDynamicConfigMark(r) {
		return (
			(r =
				DynamicMapMarkByMarkId_1.configDynamicMapMarkByMarkId.GetConfig(r)) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 50, "找不到DynamicMapMark表")),
			r
		);
	}
	SearchGetMarkConfig(r) {
		return this.GetConfigMark(r) ?? this.GetDynamicConfigMark(r);
	}
	GetTeleportConfigById(r) {
		var e = TeleporterById_1.configTeleporterById.GetConfig(r);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "找不到Teleporter表的配置,Id = ", [
						"teleportId",
						r,
					])),
			e
		);
	}
	GetDefaultDetectorMarkConfigId() {
		return 1;
	}
	GetDefaultTemporaryTeleportMarkConfigId() {
		return 1;
	}
	GetTemporaryTeleportMarkConfigById(r) {
		var e =
			TemporaryTeleportMarkByMarkId_1.configTemporaryTeleportMarkByMarkId.GetConfig(
				r,
			);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Map",
						50,
						"找不到TemporaryTeleportMark表的配置,Id = ",
						["markId", r],
					)),
			e
		);
	}
	GetTileConfig(r, e = !1) {
		var o =
			FogTextureConfigByBlock_1.configFogTextureConfigByBlock.GetConfig(r);
		return (
			o ||
				e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "找不到FogTextureConfig表的配置", [
						"Block",
						r,
					])),
			o
		);
	}
	GetAllTileConfig() {
		return FogTextureConfigAll_1.configFogTextureConfigAll.GetConfigList();
	}
	GetSubMapConfigByGroupId(r) {
		return MultiMapByGroupId_1.configMultiMapByGroupId.GetConfigList(r);
	}
	GetSubMapConfigById(r) {
		return MultiMapById_1.configMultiMapById.GetConfig(r);
	}
	GetUnlockMapTileConfigById(r) {
		return BlockSwitchById_1.configBlockSwitchById.GetConfig(r);
	}
	GetAllSubMapConfig() {
		return MultiMapAll_1.configMultiMapAll.GetConfigList();
	}
	GetSubMapConfigByAreaId(r) {
		var e = MultiMapAll_1.configMultiMapAll.GetConfigList();
		if (e) for (const o of e) if (o.Area.includes(r)) return o;
	}
	GetCustomMarkConfig(r) {
		var e = CustomMarkByMarkId_1.configCustomMarkByMarkId.GetConfig(r);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "找不到CustomMark表的配置", [
						"MarkId",
						r,
					])),
			e
		);
	}
	GetFogBlockConfig(r) {
		if (this.vLi.has(r))
			return FogBlockByBlock_1.configFogBlockByBlock.GetConfig(r);
	}
	GetLocalText(r) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r) ?? "";
	}
	GetEntityConfigByMapIdAndEntityId(r, e) {
		return LevelEntityConfigByMapIdAndEntityId_1.configLevelEntityConfigByMapIdAndEntityId.GetConfig(
			r,
			e,
		);
	}
	GetMapBorderConfig(r) {
		return MapBorderByBorderId_1.configMapBorderByBorderId.GetConfig(r);
	}
	GetMapBorderConfigList() {
		return MapBorderAll_1.configMapBorderAll.GetConfigList();
	}
	GetMapDissolveTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"MapDissolveTime",
		);
	}
	GetSoundBoxMarkConfig(r) {
		var e = SoundBoxMarkByMarkId_1.configSoundBoxMarkByMarkId.GetConfig(r);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 50, "找不到SoundBoxMark表的配置", [
						"MarkId",
						r,
					])),
			e
		);
	}
	GetTreasureBoxMarkConfig(r) {
		var e =
			TreasureBoxMarkByMarkId_1.configTreasureBoxMarkByMarkId.GetConfig(r);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 50, "找不到TreasureBoxMark表的配置", [
						"MarkId",
						r,
					])),
			e
		);
	}
	GetTreasureBoxDetectorMarkConfig(r) {
		var e =
			TreasureBoxDetectorMarkByMarkId_1.configTreasureBoxDetectorMarkByMarkId.GetConfig(
				r,
			);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 50, "找不到TreasureBoxDetectorMark表的配置", [
						"MarkId",
						r,
					])),
			e
		);
	}
	GetMapMarkFuncTypeConfigByFuncId(r) {
		if (this.pLi.has(r))
			return MapMarkRelativeSubTypeByFunctionId_1.configMapMarkRelativeSubTypeByFunctionId.GetConfig(
				r,
			);
	}
	GetMapMarkFuncTypeConfigById(r) {
		return MapMarkRelativeSubTypeById_1.configMapMarkRelativeSubTypeById.GetConfig(
			r,
		);
	}
	GetUiResourcePathById(r) {
		return StringUtils_1.StringUtils.IsEmpty(r)
			? ""
			: UiResourceById_1.configUiResourceById.GetConfig(r).Path;
	}
	GetMultiMapAreaConfigList() {
		return MultiMapAreaConfigAll_1.configMultiMapAreaConfigAll.GetConfigList();
	}
	GetMultiMapAreaConfigById(r) {
		return MultiMapAreaConfigByBlock_1.configMultiMapAreaConfigByBlock.GetConfig(
			r,
		);
	}
}
exports.MapConfig = MapConfig;
