"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelPlayInfo = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil"),
	LogicTreeContainer_1 = require("../GeneralLogicTree/LogicTreeContainer"),
	QuestDefine_1 = require("../QuestNew/QuestDefine"),
	LevelPlayDefine_1 = require("./LevelPlayDefine");
class LevelPlayInfo extends LogicTreeContainer_1.LogicTreeContainer {
	constructor(e) {
		super(),
			(this.uli = 0),
			(this.Tfi = !1),
			(this.Lfi = 0),
			(this.ac = 0),
			(this.Dfi = !1),
			(this.TrackRadiusSquared = 0),
			(this.CacheDistanceSquared = 0),
			(this.cli = ""),
			(this.mli = 0),
			(this.dli = 0),
			(this.Cli = 0),
			(this.Rfi = void 0),
			(this.Ufi = void 0),
			(this.fli = void 0),
			(this.pli = 0),
			(this.Afi = 0),
			(this.vli = 0),
			(this.Mli = void 0),
			(this.Sli = void 0),
			(this.Pfi = void 0),
			(this.xfi = void 0),
			(this.wfi = "Local"),
			(this.Bfi = void 0),
			(this.uli = e),
			(this.Tfi = !1),
			(this.Lfi = 0),
			(this.ac = 0),
			(this.CacheDistanceSquared = -1);
	}
	get Id() {
		return this.uli;
	}
	get PlayState() {
		return this.ac;
	}
	get IsClose() {
		return 0 === this.ac;
	}
	get IsFinish() {
		return 3 === this.ac;
	}
	get CanExecOpenAction() {
		return this.ac < 3;
	}
	get CanTrack() {
		if (
			this.LevelPlayEntityId !== QuestDefine_1.INVALID_ENTITYDATAID &&
			2 === this.ac &&
			this.Ufi &&
			this.BehaviorTree
		) {
			if (this.BehaviorTree.IsChallengeUi()) return !0;
			var e = this.BehaviorTree.GetActiveChildQuestNodesId();
			if (e)
				for (const r of e) {
					var i = this.BehaviorTree.GetNode(r),
						t = i
							? PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TrackTextConfig)
							: void 0;
					if (t && !StringUtils_1.StringUtils.IsBlank(t) && !i.ContainTag(2))
						return !0;
				}
		}
		return !1;
	}
	get IsFirstPass() {
		return this.Tfi;
	}
	get RefreshTime() {
		return this.Lfi;
	}
	get CanGetReward() {
		return this.Dfi;
	}
	get Name() {
		return this.cli;
	}
	get LevelPlayEntityId() {
		return this.mli;
	}
	get MapId() {
		return this.dli;
	}
	get InstanceId() {
		return this.Cli;
	}
	get MarkConfig() {
		return this.Rfi;
	}
	get NeedShowInMap() {
		return void 0 !== this.MarkConfig;
	}
	get TrackPriority() {
		return (
			this.Ufi?.TrackPriority ??
			LevelPlayDefine_1.INVALID_LEVELPLAY_TRACKPRIORITY
		);
	}
	get RewardConfig() {
		return this.fli;
	}
	get RewardId() {
		return this.pli;
	}
	get FirstRewardId() {
		return this.Afi;
	}
	get RewardEntityId() {
		return this.vli;
	}
	get AfterGetRewardAction() {
		return this.Mli;
	}
	get LevelPlayOpenAction() {
		return this.Sli;
	}
	get LevelPlayFirstPassAction() {
		return this.Pfi;
	}
	get LevelPlayEnterAction() {
		return this.xfi;
	}
	get OnlineType() {
		return this.wfi;
	}
	get IsInteractValid() {
		return (
			!ModelManager_1.ModelManager.GameModeModel.IsMulti ||
			"Local" !== this.OnlineType
		);
	}
	get LevelPlayType() {
		return this.Bfi;
	}
	InitConfig() {
		var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
			this.uli,
		);
		if (e) {
			switch (
				((this.dli = e.LevelId),
				(this.mli = e.LevelPlayEntityId),
				(this.Cli = e.InstanceId ?? 0),
				(this.cli = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TidName)),
				(this.Rfi = e.LevelPlayMark),
				(this.Ufi = e.LevelPlayTrack),
				(this.Dfi = !0),
				(this.Sli = e.LevelPlayOpenActions),
				(this.xfi = e.EnterInRangeActions),
				(this.wfi = e.OnlineType),
				(this.Bfi = e.Type),
				e.LevelPlayRewardConfig.Type)
			) {
				case "Interact":
					(this.pli = e.LevelPlayRewardConfig.RewardId),
						(this.Afi = e.LevelPlayRewardConfig.FirstRewardId ?? 0),
						(this.vli = e.LevelPlayRewardConfig.RewardEntityId),
						(this.Mli = e.LevelPlayRewardConfig.RewardCompleteActions),
						(this.Pfi = e.LevelPlayRewardConfig.FirstCompleteActions);
					break;
				case "Automatic":
					(this.pli = e.LevelPlayRewardConfig.RewardId),
						(this.Afi = e.LevelPlayRewardConfig.FirstRewardId ?? 0);
			}
			this.Ufi && this.ChangeLevelPlayTrackRange(this.Ufi.TrackRadius);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("SceneGameplay", 19, "创建玩法时找不到玩法配置", [
					"玩法id",
					this.uli,
				]);
	}
	UpdateFirstPass(e) {
		this.Tfi = e ?? !1;
	}
	UpdateState(e) {
		(this.ac = e ?? 0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnLevelPlayStateChange,
				this.uli,
			);
	}
	UpdateRefreshTime(e) {
		this.Lfi = Number(MathUtils_1.MathUtils.LongToBigInt(e));
	}
	UpdateCanGetReward(e) {
		this.Dfi = e;
	}
	UpdateDistanceSquared(e) {
		var i = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetEntityConfigPosition(
			this.LevelPlayEntityId,
		);
		i
			? (this.CacheDistanceSquared = this.bfi(i, e))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("SceneGameplay", 19, "配置的玩法追踪坐标为空", [
					"玩法id",
					this.uli,
				]);
	}
	IsInTrackRange() {
		return (
			!(this.CacheDistanceSquared < 0) &&
			this.CacheDistanceSquared < this.TrackRadiusSquared
		);
	}
	bfi(e, i) {
		return (
			Math.pow(i.X - e.X, 2) + Math.pow(i.Y - e.Y, 2) + Math.pow(i.Z - e.Z, 2)
		);
	}
	GetUiPriority() {
		return this.Ufi ? this.Ufi.TrackPriority : super.GetUiPriority();
	}
	ChangeLevelPlayTrackRange(e) {
		(e = e ?? this.Ufi.TrackRadius), (this.TrackRadiusSquared = e * e);
	}
}
exports.LevelPlayInfo = LevelPlayInfo;
