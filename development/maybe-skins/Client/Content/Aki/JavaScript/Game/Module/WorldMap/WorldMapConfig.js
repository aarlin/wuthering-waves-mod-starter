"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldMapConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	AkiMapByMapId_1 = require("../../../Core/Define/ConfigQuery/AkiMapByMapId"),
	AkiMapSourceByMapId_1 = require("../../../Core/Define/ConfigQuery/AkiMapSourceByMapId"),
	AudioById_1 = require("../../../Core/Define/ConfigQuery/AudioById"),
	CustomMarkAll_1 = require("../../../Core/Define/ConfigQuery/CustomMarkAll"),
	ExploreProgressById_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressById"),
	MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById"),
	TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class WorldMapConfig extends ConfigBase_1.ConfigBase {
	GetCommonValue(r) {
		return CommonParamById_1.configCommonParamById.GetIntConfig(r) ?? 0;
	}
	GetCustomMarks() {
		return CustomMarkAll_1.configCustomMarkAll.GetConfigList();
	}
	GetAreaId(r) {
		var o = TeleporterById_1.configTeleporterById.GetConfig(r);
		return o
			? o.AreaId
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "传送表找不到配置", ["Id", r]),
				0);
	}
	GetTeleportEntityConfigId(r) {
		var o = TeleporterById_1.configTeleporterById.GetConfig(r);
		return o
			? o.TeleportEntityConfigId
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "传送表找不到配置", ["Id", r]),
				0);
	}
	GetAkiMapConfig(r) {
		var o = AkiMapByMapId_1.configAkiMapByMapId.GetConfig(r);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "AkiMap表找不到配置", ["MapId", r])),
			o
		);
	}
	GetAkiMapSourceConfig(r) {
		var o = AkiMapSourceByMapId_1.configAkiMapSourceByMapId.GetConfig(r);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 40, "AkiMapSource表找不到配置", ["MapId", r])),
			o
		);
	}
	GetAudioConfig(r) {
		var o = AudioById_1.configAudioById.GetConfig(r);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Map", 19, "Audio表找不到配置", ["Id", r])),
			o
		);
	}
	GetDailyTaskMarkItem(r) {
		var o = MapNoteById_1.configMapNoteById.GetConfig(1).MarkIdMap.get(r);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Map",
						50,
						"d.地图便签表DailyMarkId列找不到对应配置",
						["国家Id:", r],
					)),
			o
		);
	}
	GetExploreProgressInfoById(r) {
		var o = ExploreProgressById_1.configExploreProgressById.GetConfig(r);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Map",
						50,
						"t.探索度配置表\n            找不到对应配置",
						["Id", r],
					)),
			o
		);
	}
}
exports.WorldMapConfig = WorldMapConfig;
