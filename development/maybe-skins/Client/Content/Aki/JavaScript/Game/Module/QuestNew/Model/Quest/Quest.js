"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Quest = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../../Common/PublicUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LogicTreeContainer_1 = require("../../../GeneralLogicTree/LogicTreeContainer"),
	MapDefine_1 = require("../../../Map/MapDefine"),
	QuestController_1 = require("../../Controller/QuestController"),
	QuestDefine_1 = require("../../QuestDefine");
class Quest extends LogicTreeContainer_1.LogicTreeContainer {
	constructor(e, t) {
		super(),
			(this.InnerId = 0),
			(this.InnerType = void 0),
			(this.InnerMainType = 0),
			(this.InnerStatus = void 0),
			(this.Finished = !1),
			(this.Lo = void 0),
			(this.QuestNameTid = ""),
			(this.Yoo = ""),
			(this.Joo = ""),
			(this.zoo = ""),
			(this.Zoo = 0),
			(this.StageRewardId = 0),
			(this.ero = void 0),
			(this.OnlineType = void 0),
			(this.AutoTrack = !1),
			(this.AutoHideTrackMark = !0),
			(this.DungeonId = 0),
			(this.FunctionId = 0),
			(this.DistributeType = void 0),
			(this.ActiveActions = void 0),
			(this.AcceptActions = void 0),
			(this.FinishActions = void 0),
			(this.TerminateActions = void 0),
			(this.AcceptQuestOptionConfig = void 0),
			(this.tro = 0),
			t
				? ((this.InnerId = t.Id),
					(this.InnerStatus = Protocol_1.Aki.Protocol.kMs.Proto_InActive),
					(this.InnerType = e),
					(this.Lo = t),
					(this.QuestNameTid = t.TidName),
					(this.Yoo = t.TidDesc),
					(this.Zoo = t.RewardId),
					(this.DungeonId = t.DungeonId),
					(this.FunctionId = t.FunctionId),
					(this.DistributeType = t.DistributeType),
					(this.OnlineType = t.OnlineType ?? "SingleHangUpOnline"),
					(this.AcceptQuestOptionConfig = t.AddInteractOption),
					(this.AutoTrack = t.IsAutoTrack),
					(this.ero = t.RecommendPreQuest),
					(e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfig(
						this.Type,
					)) && (this.InnerMainType = e.MainId),
					(e =
						ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
							this.MainTypeId,
						)) && (this.AutoHideTrackMark = e.AutoHideTrack),
					(this.ActiveActions = t.ActiveActions),
					(this.AcceptActions = t.AcceptActions),
					(this.FinishActions = t.FinishActions),
					(this.TerminateActions = t.TerminateActions))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Quest",
						19,
						"找不到任务配置数据",
						["任务Id", this.InnerId],
						["配置路径", QuestDefine_1.QUEST_CONFIGPATH],
					);
	}
	get Id() {
		return this.InnerId ?? QuestDefine_1.INVALID_QUEST_ID;
	}
	get Type() {
		return this.InnerType;
	}
	get MainTypeId() {
		return this.InnerMainType;
	}
	get ChapterId() {
		return this.Lo.ChapterId;
	}
	get HideAcceptQuestMark() {
		return this.Lo.IsHideAcceptMarkOnNpc;
	}
	get Status() {
		return this.InnerStatus;
	}
	get IsProgressing() {
		return this.Status === Protocol_1.Aki.Protocol.kMs.Gms;
	}
	get IsInteractValid() {
		return (
			!ModelManager_1.ModelManager.GameModeModel.IsMulti ||
			"SingleHangUpOnline" !== this.OnlineType
		);
	}
	get RewardId() {
		return 0 !== this.StageRewardId ? this.StageRewardId : this.Zoo;
	}
	get Name() {
		let e = this.Joo;
		return (
			(void 0 !== e && 0 !== e.length) || (e = this.QuestNameTid),
			PublicUtil_1.PublicUtil.GetConfigTextByKey(e)
		);
	}
	get QuestDescribe() {
		let e = this.zoo;
		return (
			(void 0 !== e && 0 !== e.length) || (e = this.Yoo),
			PublicUtil_1.PublicUtil.GetConfigTextByKey(e)
		);
	}
	get QuestShowConditionDescribe() {
		return PublicUtil_1.PublicUtil.GetConfigTextByKey(
			this.Lo.PreShowInfo?.TidPreShowDesc ?? "",
		);
	}
	get QuestShowCondition() {
		return this.Lo.PreShowInfo?.PreShowCondition?.Conditions;
	}
	get UnlockCondition() {
		return this.Lo.ProvideType?.Conditions;
	}
	get QuestMarkId() {
		return ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(
			this.MainTypeId,
		);
	}
	Destroy() {
		(this.Lo = void 0),
			this.AcceptQuestOptionConfig &&
				ModelManager_1.ModelManager.MapModel.RemoveMapMark(12, this.tro),
			super.Destroy();
	}
	UpdateState(e, t) {
		var i = this.InnerStatus;
		if ((i = ((this.InnerStatus = e), i !== this.InnerStatus))) {
			switch (e) {
				case Protocol_1.Aki.Protocol.kMs.WMs:
					this.OnQuestStateToReady();
					break;
				case Protocol_1.Aki.Protocol.kMs.Gms:
					this.OnQuestToProgress();
					break;
				case Protocol_1.Aki.Protocol.kMs.Proto_Finish:
					this.OnQuestToFinish();
					break;
				case Protocol_1.Aki.Protocol.kMs.Proto_Delete:
					this.OnQuestToDelete();
			}
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnQuestStateChange,
				this.Id,
				this.Status,
				t,
			);
		}
	}
	OnQuestStateToReady() {
		switch (this.DistributeType) {
			case "Interact":
				ModelManager_1.ModelManager.QuestNewModel.AddCanAcceptQuest(this.Id),
					this.iro();
				break;
			case "System":
			case "UseItem":
			case "InformationViewCheck":
				break;
			default:
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Quest", 27, "未支持的任务派发类型：", [
						"this.DistributeType",
						this.DistributeType,
					]);
		}
	}
	iro() {
		var e;
		this.HideAcceptQuestMark ||
			((e = this.AcceptQuestOptionConfig)
				? this.oro(e.EntityId)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Quest", 19, "交互接取的任务没有配交互选项", [
						"任务Id",
						this.Id,
					]));
	}
	OnQuestToProgress() {
		ModelManager_1.ModelManager.QuestNewModel.RemoveCanAcceptQuest(this.Id),
			this.AcceptQuestOptionConfig &&
				ModelManager_1.ModelManager.MapModel.RemoveMapMark(12, this.tro);
	}
	OnQuestToFinish() {
		this.Finished = !0;
	}
	OnQuestToDelete() {
		var e;
		ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id ===
			this.Id &&
			((e = this.Finished ? 1 : 0),
			QuestController_1.QuestNewController.RequestTrackQuest(
				this.Id,
				!1,
				2,
				e,
			));
	}
	oro(e) {
		var t;
		ModelManager_1.ModelManager.CreatureModel.GetEntityData(e)
			? (t = this.QuestMarkId) &&
				this.IsInteractValid &&
				((t = new MapDefine_1.QuestMarkCreateInfo(
					this.DungeonId,
					this.Id,
					0,
					e,
					t,
					12,
					5,
				)),
				(this.tro = ModelManager_1.ModelManager.MapModel.CreateMapMark(t)))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Quest",
					50,
					"给任务添加地图标记时,找不到对应的实体",
					["任务Id:", this.Id],
					["实体Id", e],
				);
	}
	CanShowGuideLine() {
		return this.GetCurrentActiveChildQuestNode()?.ContainTag(4) ?? !1;
	}
	CanShowInUiPanel() {
		if (this.IsQuestCanPreShow()) return !0;
		if (this.Status !== Protocol_1.Aki.Protocol.kMs.Gms) return !1;
		var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestBindingActivityId(
			this.Id,
		);
		return (
			!(
				e &&
				!ModelManager_1.ModelManager.ActivityModel.GetActivityById(
					e,
				)?.CheckIfInOpenTime()
			) && super.CanShowInUiPanel()
		);
	}
	IsQuestCanPreShow() {
		return (
			this.Status === Protocol_1.Aki.Protocol.kMs.Proto_InActive &&
			void 0 !== this.Lo.PreShowInfo
		);
	}
	IsQuestHasRecommendPreQuest() {
		return void 0 !== this.ero;
	}
	GetRecommendPreQuest() {
		return this.ero;
	}
	SetQuestStageName(e) {
		this.Joo = e;
	}
	SetQuestStageDesc(e) {
		this.zoo = e;
	}
	SetQuestStageReward(e) {
		this.StageRewardId = e;
	}
	SetTrack(e, t = 0) {
		super.SetTrack(e, t),
			e && QuestController_1.QuestNewController.RedDotRequest(this.Id, 0);
	}
}
exports.Quest = Quest;
