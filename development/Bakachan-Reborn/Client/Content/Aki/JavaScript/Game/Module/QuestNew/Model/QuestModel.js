"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestNewModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	IGlobal_1 = require("../../../../UniverseEditor/Interface/IGlobal"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GeneralLogicTreeConfigUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeConfigUtil"),
	QuestDefine_1 = require("../QuestDefine"),
	QuestTypeDefine_1 = require("./Quest/QuestTypeDefine");
class QuestNewModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.rro = void 0),
			(this.nro = void 0),
			(this.sro = void 0),
			(this.aro = void 0),
			(this.hro = void 0),
			(this.lro = 0),
			(this._ro = void 0),
			(this.uro = void 0),
			(this.CurShowUpdateTipsQuest = void 0),
			(this.ActivityIdsByQuestId = void 0),
			(this.zfi = (e) => {
				for (const t of JSON.parse(e).Quests)
					this.aro.set(t.Id, t),
						t.Tree &&
							GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.InitBehaviorNodeConfig(
								this.hro,
								t.Id,
								t.Tree,
							);
			});
	}
	OnInit() {
		return (
			(this.rro = new Map()),
			(this.nro = new Map()),
			(this.sro = new Map()),
			(this.aro = new Map()),
			(this.hro = new Map()),
			(this.uro = new Map()),
			(this.ActivityIdsByQuestId = new Map()),
			this.InitQuestConfig(),
			PublicUtil_1.PublicUtil.RegisterEditorLocalConfig(),
			!0
		);
	}
	OnClear() {
		if (this.rro) {
			for (var [, e] of this.rro) e.Destroy();
			this.rro.clear(), (this.rro = void 0);
		}
		return (
			(this._ro = void 0),
			this.aro?.clear(),
			(this.aro = void 0),
			this.hro?.clear(),
			(this.hro = void 0),
			this.nro?.clear(),
			(this.nro = void 0),
			this.sro?.clear(),
			(this.sro = void 0),
			this.ActivityIdsByQuestId?.clear(),
			!(this.ActivityIdsByQuestId = void 0)
		);
	}
	OnLeaveLevel() {
		return !0;
	}
	InitQuestConfig() {
		var e;
		PublicUtil_1.PublicUtil.UseDbConfig() ||
			(this.aro.clear(),
			this.hro.clear(),
			(e = (0, PublicUtil_1.getConfigPath)(
				IGlobal_1.globalConfig.QuestListDir,
			)),
			GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.InitConfig(
				e,
				this.zfi,
			));
	}
	AddQuest(e) {
		var t,
			i = this.GetQuestConfig(e);
		if (i)
			return (
				(t = this.rro.get(e)) ||
					((t = (0, QuestTypeDefine_1.createQuestObj)(i)),
					this.rro.set(e, t),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnAddNewQuest,
						t,
					)),
				t
			);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Quest",
				19,
				"添加任务时找不到任务配置",
				["配置路径", QuestDefine_1.QUEST_CONFIGPATH],
				["任务Id", e],
			);
	}
	RemoveQuest(e) {
		var t = this.rro.get(e);
		t && (t.Destroy(), this.rro.delete(e));
	}
	AddFinishedQuest(e) {
		this.sro.set(e, !0);
	}
	GetCanAcceptQuest() {
		return this.nro;
	}
	AddCanAcceptQuest(e) {
		this.nro.set(e, !0);
	}
	RemoveCanAcceptQuest(e) {
		this.nro.delete(e);
	}
	IsTrackingQuest(e) {
		return this.GetCurTrackedQuest()?.Id === e;
	}
	GetCurTrackedQuest() {
		return this._ro;
	}
	SetQuestTrackState(e, t, i = 0) {
		if (t)
			if (((t = this.GetQuest(e)), t?.IsProgressing)) {
				if (this._ro) {
					if (this._ro.Id === t.Id) return;
					this._ro.SetTrack(!1, i);
				}
				(this._ro = t).SetTrack(!0, i);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Quest", 19, "更新任务追踪时,找不到进行中的任务", [
						"任务Id",
						e,
					]);
		else
			this._ro &&
				this._ro.Id === e &&
				(this._ro.SetTrack(!1, i),
				(this._ro = void 0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.CurTrackQuestUnTrackedCheck,
				));
	}
	GetCurQuestTrackPosition(e = 0, t) {
		var i = this.GetCurTrackedQuest();
		if (i) {
			var r = i.GetActiveChildQuestNodesId();
			if (!(0 === r.length || e > r.length - 1))
				return i.GetNodeTrackPosition(r[e]);
		}
	}
	TryGetMapMarkIdByQuestId(e) {
		if ((e = this.GetQuest(e))) {
			var t = e.TreeId;
			if (
				(e = ModelManager_1.ModelManager.MapModel.GetAllDynamicMarks().get(12))
			)
				for (const r of e.values()) {
					var i = r;
					if (i.TreeId === t) return i.MarkId;
				}
		}
	}
	GetQuestConfig(e) {
		if (!PublicUtil_1.PublicUtil.UseDbConfig()) return this.aro.get(e);
		let t = this.aro.get(e);
		if (!t) {
			var i = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestConfig(e);
			if (!i) return;
			(t = JSON.parse(i.Data)), this.aro.set(e, t);
		}
		return t;
	}
	GetQuestNodeConfig(e, t) {
		if (!PublicUtil_1.PublicUtil.UseDbConfig()) return this.hro.get(e)?.get(t);
		let i = this.hro.get(e),
			r = (i = i || new Map()).get(t);
		if (!r) {
			if (
				!(e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestNodeConfig(
					e,
					t,
				))
			)
				return;
			(r = JSON.parse(e.Data)), i.set(t, r);
		}
		return r;
	}
	UpdateGuideLineStartShowTime() {
		this.lro = TimeUtil_1.TimeUtil.GetServerTime();
	}
	GetGuideLineStartShowTime() {
		return this.lro;
	}
	GetQuest(e) {
		return this.rro.get(e);
	}
	GetQuestState(e) {
		var t = this.GetQuest(e);
		return t ? t.Status : this.sro.get(e) ? 3 : this.nro.get(e) ? 1 : 0;
	}
	CheckQuestFinished(e) {
		return 3 === this.GetQuestState(e);
	}
	GetQuestsByType(e) {
		var t,
			i = [];
		for ([, t] of this.rro) t.Type === e && i.push(t);
		return i;
	}
	GetFirstShowQuestByType(e) {
		for (const t of this.GetQuestsByType(e)) if (t.CanShowInUiPanel()) return t;
	}
	GetQuestName(e) {
		return (e = this.GetQuest(e)) ? e.Name : "";
	}
	SetQuestStageName(e, t) {
		(e = this.GetQuest(e)) && e.SetQuestStageName(t);
	}
	SetQuestStageDesc(e, t) {
		(e = this.GetQuest(e)) && e.SetQuestStageDesc(t);
	}
	SetQuestStageReward(e, t) {
		(e = this.GetQuest(e)) && e.SetQuestStageReward(t);
	}
	GetQuestDetails(e) {
		return (e = this.GetQuest(e)) ? e.QuestDescribe : "";
	}
	GetShowQuestConditionDescribe(e) {
		return (e = this.GetQuest(e)) ? e.QuestShowConditionDescribe : "";
	}
	GetUnlockConditions(e) {
		if ((e = this.GetQuest(e))) return e.UnlockCondition;
	}
	GetShowQuestChapterIdFromConfig(e) {
		return (e = this.GetQuestConfig(e)) ? e.ChapterId : 0;
	}
	GetShowQuestConditionFromConfig(e) {
		return (e = this.GetQuestConfig(e))
			? PublicUtil_1.PublicUtil.GetConfigTextByKey(
					e.PreShowInfo?.TidPreShowDesc ?? "",
				)
			: "";
	}
	GetDisplayRewardInfo(e) {
		if ((e = this.GetQuest(e))) {
			const s = ConfigManager_1.ConfigManager.QuestNewConfig.GetDropConfig(
				e.RewardId,
			);
			if (s && 0 !== s.DropPreview.size) {
				var t,
					i = [];
				for ([t] of s.DropPreview) {
					var r =
							ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
								t,
							),
						o = s.DropPreview.get(t);
					if (r) {
						const e = new QuestDefine_1.QuestRewardInfo(t, o);
						i.push(e);
					}
				}
				return i;
			}
		}
	}
	GetDisplayRewardCommonInfo(e) {
		if ((e = this.GetQuest(e))) {
			var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetDropConfig(
				e.RewardId,
			);
			if (t && 0 !== t.DropPreview.size) {
				var i,
					r = [];
				for ([i] of t.DropPreview) {
					var o =
							ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
								i,
							),
						s = t.DropPreview.get(i);
					o && r.push([{ IncId: 0, ItemId: i }, s]);
				}
				return r;
			}
		}
	}
	GetQuestLockIconPath(e) {
		if ((e = this.GetQuest(e))) {
			let t;
			return (
				e.IsSuspend()
					? (t =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								"SP_IconOccupy",
							))
					: e.IsQuestCanPreShow()
						? (t =
								ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
									"SP_FuncLock",
								))
						: e.IsQuestHasRecommendPreQuest()
							? (t =
									ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
										"SP_ComExclamation",
									))
							: e.HasRefOccupiedEntity() &&
								(t =
									ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
										"SP_IconOccupy",
									)),
				t
			);
		}
	}
	SetQuestRedDot(e, t) {
		t ? this.uro.set(e, !0) : this.uro.delete(e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Quest",
					19,
					"任务红点状态改变",
					["questId", e],
					["bAdd", t],
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnQuestRedDotStateChange,
				e,
			);
	}
	CheckQuestRedDotDataState(e) {
		return this.uro.get(e);
	}
	GetAllRedDotData() {
		return this.uro;
	}
	GetCurWorldLevelBreakQuest() {
		var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"WorldLevelBreakthroughTask",
		);
		if (void 0 === e) return -1;
		let t = -1;
		return (
			e.forEach((e) => {
				void 0 !== this.GetQuest(e) && (t = e);
			}),
			t
		);
	}
	SetActivityQuestData(e, t) {
		if (t && 0 !== t.length)
			for (const i of t) this.ActivityIdsByQuestId.set(i, e);
	}
	GetQuestBindingActivityId(e) {
		return this.ActivityIdsByQuestId.get(e) ?? 0;
	}
	GetActivityGuideQuestRemainTimeText(e, t) {
		e = Math.max(e, 1);
		var i = this.FOe(e);
		e =
			TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, i[0], i[1])
				.CountDownText ?? "";
		return StringUtils_1.StringUtils.Format(t, e);
	}
	FOe(e) {
		return e > CommonDefine_1.SECOND_PER_DAY
			? [3, 2]
			: e > CommonDefine_1.SECOND_PER_HOUR
				? [2, 1]
				: e > CommonDefine_1.SECOND_PER_MINUTE
					? [1, 0]
					: [0, 0];
	}
}
exports.QuestNewModel = QuestNewModel;
