"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookConfig = void 0);
const AnimalHandBookAll_1 = require("../../../Core/Define/ConfigQuery/AnimalHandBookAll"),
	AnimalHandBookById_1 = require("../../../Core/Define/ConfigQuery/AnimalHandBookById"),
	AnimalHandBookByMeshId_1 = require("../../../Core/Define/ConfigQuery/AnimalHandBookByMeshId"),
	ChipHandBookAll_1 = require("../../../Core/Define/ConfigQuery/ChipHandBookAll"),
	ChipHandBookById_1 = require("../../../Core/Define/ConfigQuery/ChipHandBookById"),
	ChipHandBookByType_1 = require("../../../Core/Define/ConfigQuery/ChipHandBookByType"),
	ChipTypeAll_1 = require("../../../Core/Define/ConfigQuery/ChipTypeAll"),
	ChipTypeById_1 = require("../../../Core/Define/ConfigQuery/ChipTypeById"),
	GeographyHandBookAll_1 = require("../../../Core/Define/ConfigQuery/GeographyHandBookAll"),
	GeographyHandBookById_1 = require("../../../Core/Define/ConfigQuery/GeographyHandBookById"),
	GeographyHandBookByType_1 = require("../../../Core/Define/ConfigQuery/GeographyHandBookByType"),
	GeographyTypeAll_1 = require("../../../Core/Define/ConfigQuery/GeographyTypeAll"),
	GeographyTypeById_1 = require("../../../Core/Define/ConfigQuery/GeographyTypeById"),
	HandBookEntranceAll_1 = require("../../../Core/Define/ConfigQuery/HandBookEntranceAll"),
	HandBookEntranceById_1 = require("../../../Core/Define/ConfigQuery/HandBookEntranceById"),
	HandBookQuestTabAll_1 = require("../../../Core/Define/ConfigQuery/HandBookQuestTabAll"),
	ItemHandBookAll_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookAll"),
	ItemHandBookById_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookById"),
	ItemHandBookByType_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookByType"),
	ItemHandBookTypeAll_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookTypeAll"),
	ItemHandBookTypeById_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookTypeById"),
	MonsterHandBookAll_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookAll"),
	MonsterHandBookById_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookById"),
	MonsterHandBookByType_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookByType"),
	MonsterHandBookTypeAll_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookTypeAll"),
	PhantomFetterHandBookAll_1 = require("../../../Core/Define/ConfigQuery/PhantomFetterHandBookAll"),
	PhantomHandBookAll_1 = require("../../../Core/Define/ConfigQuery/PhantomHandBookAll"),
	PhantomHandBookById_1 = require("../../../Core/Define/ConfigQuery/PhantomHandBookById"),
	PhantomHandBookPageAll_1 = require("../../../Core/Define/ConfigQuery/PhantomHandBookPageAll"),
	PhotographHandBookAll_1 = require("../../../Core/Define/ConfigQuery/PhotographHandBookAll"),
	PhotographHandBookById_1 = require("../../../Core/Define/ConfigQuery/PhotographHandBookById"),
	PhotographHandBookByType_1 = require("../../../Core/Define/ConfigQuery/PhotographHandBookByType"),
	PlotHandBookConfigByQuestId_1 = require("../../../Core/Define/ConfigQuery/PlotHandBookConfigByQuestId"),
	PlotTypeAll_1 = require("../../../Core/Define/ConfigQuery/PlotTypeAll"),
	PlotTypeById_1 = require("../../../Core/Define/ConfigQuery/PlotTypeById"),
	WeaponHandBookAll_1 = require("../../../Core/Define/ConfigQuery/WeaponHandBookAll"),
	WeaponHandBookById_1 = require("../../../Core/Define/ConfigQuery/WeaponHandBookById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class HandBookConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.RZt = void 0);
	}
	GetPhantomHandBookConfig() {
		return PhantomHandBookAll_1.configPhantomHandBookAll.GetConfigList();
	}
	GetPhantomFetterHandBookConfig() {
		return PhantomFetterHandBookAll_1.configPhantomFetterHandBookAll.GetConfigList();
	}
	GetPhantomHandBookConfigById(o) {
		return PhantomHandBookById_1.configPhantomHandBookById.GetConfig(o);
	}
	GetPhantomHandBookPageConfig() {
		return PhantomHandBookPageAll_1.configPhantomHandBookPageAll.GetConfigList();
	}
	GetHandBookEntranceConfig(o) {
		return HandBookEntranceById_1.configHandBookEntranceById.GetConfig(o);
	}
	GetHandBookEntranceConfigList() {
		return HandBookEntranceAll_1.configHandBookEntranceAll.GetConfigList();
	}
	GetWeaponHandBookConfig(o) {
		return WeaponHandBookById_1.configWeaponHandBookById.GetConfig(o);
	}
	GetWeaponHandBookConfigList() {
		return WeaponHandBookAll_1.configWeaponHandBookAll.GetConfigList();
	}
	GetMonsterHandBookConfigById(o) {
		return MonsterHandBookById_1.configMonsterHandBookById.GetConfig(o);
	}
	GetMonsterHandBookConfigByType(o) {
		return MonsterHandBookByType_1.configMonsterHandBookByType.GetConfigList(o);
	}
	GetMonsterHandBookTypeConfig() {
		return MonsterHandBookTypeAll_1.configMonsterHandBookTypeAll.GetConfigList();
	}
	GetMonsterHandBookConfigList() {
		return MonsterHandBookAll_1.configMonsterHandBookAll.GetConfigList();
	}
	GetItemHandBookConfigById(o) {
		return ItemHandBookById_1.configItemHandBookById.GetConfig(o);
	}
	GetItemHandBookConfigList() {
		return ItemHandBookAll_1.configItemHandBookAll.GetConfigList();
	}
	GetItemHandBookConfigByType(o) {
		return ItemHandBookByType_1.configItemHandBookByType.GetConfigList(o);
	}
	GetItemHandBookTypeConfigList() {
		return ItemHandBookTypeAll_1.configItemHandBookTypeAll.GetConfigList();
	}
	GetItemHandBookTypeConfig(o) {
		return ItemHandBookTypeById_1.configItemHandBookTypeById.GetConfig(o);
	}
	GetAnimalHandBookConfigList() {
		return AnimalHandBookAll_1.configAnimalHandBookAll.GetConfigList();
	}
	GetAnimalHandBookConfigById(o) {
		return AnimalHandBookById_1.configAnimalHandBookById.GetConfig(o);
	}
	GetAnimalHandBookConfigByMeshId(o) {
		if (!this.RZt) {
			this.RZt = new Map();
			for (const o of AnimalHandBookAll_1.configAnimalHandBookAll.GetConfigList())
				this.RZt.set(o.MeshId, o.Id);
		}
		if (this.RZt.get(o))
			return AnimalHandBookByMeshId_1.configAnimalHandBookByMeshId.GetConfig(o);
	}
	GetAllChipHandBookConfig() {
		return ChipHandBookAll_1.configChipHandBookAll.GetConfigList();
	}
	GetChipHandBookConfigList(o) {
		return ChipHandBookByType_1.configChipHandBookByType.GetConfigList(o);
	}
	GetChipHandBookConfig(o) {
		return ChipHandBookById_1.configChipHandBookById.GetConfig(o);
	}
	GetChipTypeConfigList() {
		return ChipTypeAll_1.configChipTypeAll.GetConfigList();
	}
	GetChipTypeConfig(o) {
		return ChipTypeById_1.configChipTypeById.GetConfig(o);
	}
	GetGeographyHandBookConfig(o) {
		return GeographyHandBookById_1.configGeographyHandBookById.GetConfig(o);
	}
	GetAllGeographyHandBookConfig() {
		return GeographyHandBookAll_1.configGeographyHandBookAll.GetConfigList();
	}
	GetGeographyHandBookConfigByType(o) {
		return GeographyHandBookByType_1.configGeographyHandBookByType.GetConfigList(
			o,
		);
	}
	GetGeographyTypeConfig(o) {
		return GeographyTypeById_1.configGeographyTypeById.GetConfig(o);
	}
	GetGeographyTypeConfigList() {
		return GeographyTypeAll_1.configGeographyTypeAll.GetConfigList();
	}
	GetAllPlotHandBookConfig() {
		return PhotographHandBookAll_1.configPhotographHandBookAll.GetConfigList();
	}
	GetPlotHandBookConfig(o) {
		return PhotographHandBookById_1.configPhotographHandBookById.GetConfig(o);
	}
	GetPlotHandBookConfigByType(o) {
		return PhotographHandBookByType_1.configPhotographHandBookByType.GetConfigList(
			o,
		);
	}
	GetPlotTypeConfig(o) {
		return PlotTypeById_1.configPlotTypeById.GetConfig(o);
	}
	GetPlotTypeConfigList() {
		return PlotTypeAll_1.configPlotTypeAll.GetConfigList();
	}
	GetQuestTabList() {
		return HandBookQuestTabAll_1.configHandBookQuestTabAll.GetConfigList();
	}
	GetQuestTab(o) {
		for (const e of HandBookQuestTabAll_1.configHandBookQuestTabAll.GetConfigList())
			if (e.Type === o) return e;
	}
	GetQuestPlotConfig(o) {
		return PlotHandBookConfigByQuestId_1.configPlotHandBookConfigByQuestId.GetConfig(
			o,
		);
	}
}
exports.HandBookConfig = HandBookConfig;
