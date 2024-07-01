"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GeneralLogicTreeUtil = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	QuestChapterById_1 = require("../../../Core/Define/ConfigQuery/QuestChapterById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LguiUtil_1 = require("../Util/LguiUtil");
class GeneralLogicTreeUtil {
	static GetEntityConfigPosition(e) {
		let o;
		return (e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e))
			? Vector_1.Vector.Create(
					e.Transform?.Pos.X ?? 0,
					e.Transform?.Pos.Y ?? 0,
					e.Transform?.Pos.Z ?? 0,
				)
			: o;
	}
	static GetEntityConfigRotator(e) {
		let o;
		return (e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e))
			? Rotator_1.Rotator.Create(
					e.Transform?.Rot?.Y ?? 0,
					e.Transform?.Rot?.Z ?? 0,
					e.Transform?.Rot?.X ?? 0,
				)
			: o;
	}
	static GetPlayerLocation() {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		if (e && (e = e.Entity.GetComponent(3))) return e.ActorLocationProxy;
	}
	static GetNodeConfig(e, o, r) {
		let t;
		switch (e) {
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:
				t = ModelManager_1.ModelManager.QuestNewModel.GetQuestNodeConfig(o, r);
				break;
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:
				t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayNodeConfig(
					o,
					r,
				);
		}
		return t;
	}
	static GetLogicTreeContainer(e, o) {
		let r;
		switch (e) {
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:
				r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(o);
				break;
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:
				r =
					ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
						o,
					);
				break;
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:
				r =
					ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
		}
		return r;
	}
	static OpenQuestChapterView(e, o, r) {
		var t;
		e &&
			((t =
				ModelManager_1.ModelManager.QuestNewModel.GetShowQuestChapterIdFromConfig(
					o,
				)) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						19,
						"任务没有配章节ID，章节内容显示不对找策划同学补上章节Id，目前章节提示需要读取“r.任务章节”的ID来显示内容",
						["出问题的任务Id", o],
					)),
			(o =
				ModelManager_1.ModelManager.QuestNewModel.GetShowQuestConditionFromConfig(
					o,
				)),
			GeneralLogicTreeUtil.OpenChapterViewV2(e.ChapterState, t, !1, o),
			KuroSdkReport_1.KuroSdkReport.OnChapterStart(t, e.ChapterState));
	}
	static OpenChapterViewV2(e, o, r = !1, t) {
		let a = 0;
		var n,
			l,
			i = [o.toString()];
		switch (e) {
			case 2:
				(a = r ? 16 : 10), t && i.push(t);
				break;
			case 0:
				a = r ? 16 : 10;
				break;
			case 1:
				a = r ? 17 : 11;
				var s =
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"QuestChapterFinish",
					);
				i.push(s);
		}
		a
			? ((n = QuestChapterById_1.configQuestChapterById.GetConfig(o)),
				(n = new LguiUtil_1.TableTextArgNew(n.ActName)),
				(l = {}),
				r && (l.CanOpenInPlot = !0),
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
					a,
					n,
					void 0,
					[],
					i,
					void 0,
					void 0,
					l,
				),
				KuroSdkReport_1.KuroSdkReport.OnChapterStart(o, e))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("LevelEvent", 19, "配置了客户端还未支持的状态", [
					"ChapterState",
					e,
				]);
	}
}
exports.GeneralLogicTreeUtil = GeneralLogicTreeUtil;
