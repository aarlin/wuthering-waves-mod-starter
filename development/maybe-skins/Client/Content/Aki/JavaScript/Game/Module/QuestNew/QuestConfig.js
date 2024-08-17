"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestNewConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById"),
	GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
	ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	NewOccupationConfigById_1 = require("../../../Core/Define/ConfigQuery/NewOccupationConfigById"),
	OccupationConfigById_1 = require("../../../Core/Define/ConfigQuery/OccupationConfigById"),
	QuestChapterById_1 = require("../../../Core/Define/ConfigQuery/QuestChapterById"),
	QuestDataById_1 = require("../../../Core/Define/ConfigQuery/QuestDataById"),
	QuestMainTypeById_1 = require("../../../Core/Define/ConfigQuery/QuestMainTypeById"),
	QuestNodeDataByKey_1 = require("../../../Core/Define/ConfigQuery/QuestNodeDataByKey"),
	QuestTypeAll_1 = require("../../../Core/Define/ConfigQuery/QuestTypeAll"),
	QuestTypeById_1 = require("../../../Core/Define/ConfigQuery/QuestTypeById"),
	QuestTypeByMainId_1 = require("../../../Core/Define/ConfigQuery/QuestTypeByMainId"),
	TaskMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TaskMarkByMarkId"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	PublicUtil_1 = require("../../Common/PublicUtil");
class QuestNewConfig extends ConfigBase_1.ConfigBase {
	OnInit() {
		return !0;
	}
	GetTrackEffectPath(e) {
		if (!StringUtils_1.StringUtils.IsEmpty(e)) {
			var r = `Name = 'ETrackEffect.${e}'`;
			if (
				(e =
					GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
						"ETrackEffect." + e,
					))
			)
				return e.Value;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Quest",
					19,
					"找不到全局配置表的配置",
					["全局表路径", "Source/Config/Raw/Tables/q.全局配置"],
					["查询条件", r],
				);
		}
	}
	GetGlobalConfig(e) {
		if (!StringUtils_1.StringUtils.IsEmpty(e)) {
			var r = `Name = '${e}'`;
			if (
				(e =
					GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
						e,
					))
			)
				return e.Value;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Quest",
					19,
					"找不到全局配置表的配置",
					["全局表路径", "Source/Config/Raw/Tables/q.全局配置"],
					["查询条件", r],
				);
		}
	}
	GetDropConfig(e) {
		var r;
		if (e)
			return (
				(r = DropPackageById_1.configDropPackageById.GetConfig(e)) ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("Quest", 19, "DropPackage表配置没找到", [
							"rewardId",
							e,
						])),
				r
			);
	}
	GetItemInfoConfig(e) {
		var r = ItemInfoById_1.configItemInfoById.GetConfig(e);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Quest", 19, "ItemInfo表配置没找到", ["Id", e])),
			r
		);
	}
	GetQuestTypeConfigs() {
		return QuestTypeAll_1.configQuestTypeAll.GetConfigList();
	}
	GetQuestTypeConfig(e) {
		var r = QuestTypeById_1.configQuestTypeById.GetConfig(e);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Quest", 19, "QuestType表配置没找到", ["Id", e])),
			r
		);
	}
	GetQuestMainTypeConfig(e) {
		var r = QuestMainTypeById_1.configQuestMainTypeById.GetConfig(e);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Quest", 19, "QuestMainType表配置没找到", ["Id", e])),
			r
		);
	}
	GetQuesTypesByMainType(e) {
		return QuestTypeByMainId_1.configQuestTypeByMainId.GetConfigList(e);
	}
	GetQuestMainTypeName(e) {
		return (e = this.GetQuestMainTypeConfig(e))
			? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MainTypeName) ??
					""
			: "";
	}
	GetQuestTabIcon(e) {
		return (e = this.GetQuestMainTypeConfig(e)) ? e.QuestTabIcon : "";
	}
	GetQuestTypeMark(e) {
		var r = TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
		return r
			? r.MarkPic
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Quest",
						19,
						"地图标记表TaskMark：MarkId = 的配置找不到",
						["markId", e],
					),
				"");
	}
	GetQuestMarkConfig(e) {
		var r = TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
		if (r) return r;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Quest",
				19,
				"地图标记表TaskMark：MarkId = 的配置找不到",
				["markId", e],
			);
	}
	GetQuestTypeMarkId(e) {
		if ((e = this.GetQuestMainTypeConfig(e))) return e.TrackIconId;
	}
	GetChapterConfig(e) {
		var r = QuestChapterById_1.configQuestChapterById.GetConfig(e);
		if (r) return r;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Quest", 19, "任务章节表：id = 的配置找不到", [
				"chapterId",
				e,
			]);
	}
	GetOccupationConfig(e) {
		var r = OccupationConfigById_1.configOccupationConfigById.GetConfig(e);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Quest",
						19,
						"找不到占用配置表的配置",
						[
							"全局表路径",
							"Source/Config/Raw/Tables/k.可视化编辑/z.占用组配置",
						],
						["Id", e],
					)),
			r
		);
	}
	GetNewOccupationConfig(e) {
		var r =
			NewOccupationConfigById_1.configNewOccupationConfigById.GetConfig(e);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Quest",
						19,
						"找不到占用配置表的配置",
						[
							"全局表路径",
							"Source/Config/Raw/Tables/k.可视化编辑/z.占用组配置",
						],
						["Id", e],
					)),
			r
		);
	}
	GetOccupationResourceName(e) {
		return (e = this.GetOccupationConfig(e))
			? PublicUtil_1.PublicUtil.GetConfigTextByTable(4, e.Id)
			: "";
	}
	GetQuestConfig(e) {
		var r = QuestDataById_1.configQuestDataById.GetConfig(e, !1);
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Quest", 19, "找不到任务配置", ["questId", e])),
			r
		);
	}
	GetQuestNodeConfig(e, r) {
		var o = QuestNodeDataByKey_1.configQuestNodeDataByKey.GetConfig(
			e + "_" + r,
			!1,
		);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Quest",
						19,
						"找不到任务节点配置",
						["questId", e],
						["nodeId", r],
					)),
			o
		);
	}
	GetQuestTypeColor(e) {
		var r = this.GetQuestTypeConfig(e);
		if (r) return r.TypeColor;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Quest", 19, "任务类型表：id = 的配置找不到", [
				"questType",
				e,
			]);
	}
	GetQuestTypeTextColor(e) {
		var r = this.GetQuestTypeConfig(e);
		if (r) return r.TextColor;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Quest", 19, "任务类型表：id = 的配置找不到", [
				"questType",
				e,
			]);
	}
	GetNewTipsShowTime(e) {
		return (e = this.GetQuestMainTypeConfig(e)) ? e.NewQuestTipTime : 0;
	}
	GetQuestUpdateShowTime(e) {
		return (e = this.GetQuestMainTypeConfig(e)) ? e.QuestUpdateTipsTime : 0;
	}
}
exports.QuestNewConfig = QuestNewConfig;
