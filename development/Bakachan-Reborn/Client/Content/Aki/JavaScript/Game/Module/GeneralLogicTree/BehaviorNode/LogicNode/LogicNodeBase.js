"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LogicNodeBase = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	PublicUtil_1 = require("../../../../Common/PublicUtil"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	SneakController_1 = require("../../../../World/Controller/SneakController"),
	BehaviorNodeBase_1 = require("../BehaviorNodeBase");
class LogicNodeBase extends BehaviorNodeBase_1.BehaviorNodeBase {
	constructor() {
		super(...arguments),
			(this.NodeType = void 0),
			(this.Config = void 0),
			(this.AddTrackViewMode = !1);
	}
	get CustomUiConfig() {
		return this.Config?.UIConfig;
	}
	get SilentAreaInfoViewConfig() {
		return this.Config?.InformationView?.InformationView;
	}
	get SuspendTrackText() {
		return this.Config?.OccupationConfig?.TidDesc;
	}
	OnCreate(e) {
		return (this.Config = e), (this.TrackTarget = e.UIConfig?.TrackTarget), !0;
	}
	OnNodeActive() {
		var e,
			i = this.Config;
		i.DungeonId && (this.Blackboard.DungeonId = i.DungeonId),
			i.DisableOnline && this.LXt(!0),
			this.CustomUiConfig && this.AddTag(0),
			this.SuspendTrackText &&
				!StringUtils_1.StringUtils.IsEmpty(
					PublicUtil_1.PublicUtil.GetConfigTextByKey(this.SuspendTrackText),
				) &&
				this.AddTag(1),
			this.SilentAreaInfoViewConfig &&
				this.Blackboard?.AddSilentShowInfo(
					this.NodeId,
					this.SilentAreaInfoViewConfig,
				),
			i.CompositeTrackViewMode &&
				((this.Blackboard.TrackViewModel = i.CompositeTrackViewMode),
				(this.AddTrackViewMode = !0)),
			this.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
				((e = ModelManager_1.ModelManager.QuestNewModel),
				i.TidQuestAliasName &&
					!StringUtils_1.StringUtils.IsEmpty(
						PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TidQuestAliasName),
					) &&
					e.SetQuestStageName(this.TreeConfigId, i.TidQuestAliasName),
				i.TidQuestAliasDesc &&
					!StringUtils_1.StringUtils.IsEmpty(
						PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TidQuestAliasDesc),
					) &&
					e.SetQuestStageDesc(this.TreeConfigId, i.TidQuestAliasDesc),
				(i = i.RewardConfig?.RewardId)) &&
				e.SetQuestStageReward(this.TreeConfigId, i),
			this.Config?.SpecialGamePlayConfig &&
				SneakController_1.SneakController.StartSneaking();
	}
	OnNodeDeActive(e) {
		var i;
		this.RemoveTag(0),
			this.SilentAreaInfoViewConfig &&
				this.Blackboard?.RemoveSilentShowInfo(this.NodeId),
			this.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
				((i = ModelManager_1.ModelManager.QuestNewModel),
				this.Config.TidQuestAliasName &&
					!StringUtils_1.StringUtils.IsEmpty(
						PublicUtil_1.PublicUtil.GetConfigTextByKey(
							this.Config.TidQuestAliasName,
						),
					) &&
					i.SetQuestStageName(this.TreeConfigId, ""),
				this.Config.TidQuestAliasDesc &&
					!StringUtils_1.StringUtils.IsEmpty(
						PublicUtil_1.PublicUtil.GetConfigTextByKey(
							this.Config.TidQuestAliasDesc,
						),
					) &&
					i.SetQuestStageDesc(this.TreeConfigId, ""),
				this.Config.RewardConfig?.RewardId) &&
				i.SetQuestStageReward(this.TreeConfigId, 0),
			this.AddTrackViewMode && (this.Blackboard.TrackViewModel = "All"),
			this.Config.DungeonId && (this.Blackboard.DungeonId = void 0),
			this.Config?.SpecialGamePlayConfig &&
				SneakController_1.SneakController.EndSneaking(),
			this.Config.DisableOnline && this.LXt(!1),
			super.OnNodeDeActive(e);
	}
	LXt(e) {
		switch (this.BtType) {
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:
				ModelManager_1.ModelManager.OnlineModel.DisableOnline(
					0,
					e,
					this.TreeConfigId,
				);
				break;
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:
				ModelManager_1.ModelManager.OnlineModel.DisableOnline(
					1,
					e,
					this.TreeConfigId,
				);
		}
	}
}
exports.LogicNodeBase = LogicNodeBase;
