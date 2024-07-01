"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TaskMarkItem = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	BattleUiDefine_1 = require("../../../BattleUi/BattleUiDefine"),
	LogReportController_1 = require("../../../LogReport/LogReportController"),
	LogReportDefine_1 = require("../../../LogReport/LogReportDefine"),
	TaskMarkItemView_1 = require("../MarkItemView/TaskMarkItemView"),
	ServerMarkItem_1 = require("./ServerMarkItem"),
	ONE_HUNDRED = 100;
class TaskMarkItem extends ServerMarkItem_1.ServerMarkItem {
	constructor(e, t, i, r) {
		super(e, t, i, r),
			(this.MarkRange = 0),
			(this.RangeMarkShowDisUp = 0),
			(this.RangeMarkShowDisDown = 0),
			(this.RangeMarkShowDis = 0),
			(this.BtType = void 0),
			(this.TreeIncId = void 0),
			(this.TreeConfigId = 0),
			(this.Tree = void 0),
			(this.NodeId = 0),
			(this.iDi = 0),
			(this.oDi = !1),
			(this.rDi = 0),
			(this.nDi = void 0),
			(this.sDi = !0),
			(this.aDi = !1),
			(this.MapId = e.MapId);
	}
	get MarkType() {
		return 12;
	}
	get CanShowInDistance() {
		return this.sDi;
	}
	set CanShowInDistance(e) {
		this.sDi !== e && (this.sDi = e) && 1 === this.MapType && (this.aDi = !1);
	}
	Initialize() {
		super.Initialize();
		var e = this.ServerMarkInfo;
		if (
			(this.SetTrackData(e.TrackTarget),
			(this.rDi = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(
				this.ConfigId,
			).IconDistant),
			(this.NodeId = e.NodeId),
			this.NodeId)
		) {
			if (
				((this.TreeIncId = e.TreeId),
				(this.Tree =
					ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
						this.TreeIncId,
					)),
				!this.Tree)
			)
				return;
			var t;
			(this.BtType = this.Tree.BtType),
				(this.TreeConfigId = this.Tree.TreeConfigId),
				(t =
					((t =
						((t = this.Tree.GetNode(this.NodeId)).TrackTarget &&
							t.TrackTarget.ZaxisViewRange &&
							((this.RangeMarkShowDisUp =
								t.TrackTarget.ZaxisViewRange.Up / 100),
							(this.RangeMarkShowDisDown =
								-t.TrackTarget.ZaxisViewRange.Down / 100)),
						this.Tree.GetRangeMarkSize(this.NodeId))) &&
						(this.MarkRange = t / 100),
					this.Tree.GetRangeMarkShowDis(this.NodeId)))
					? ((this.RangeMarkShowDis = t / 100), (this.iDi = Math.pow(t, 2)))
					: ((t = CommonParamById_1.configCommonParamById.GetIntConfig(
							"dailyquest_trackinfo_mini",
						)),
						(this.iDi = Math.pow(t, 2)));
		} else
			(this.BtType = Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest),
				(this.TreeConfigId = e.TreeId);
		(e =
			((t = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(
				this.ConfigId,
			)) &&
				((e =
					2 ===
					ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(
						this.TreeConfigId,
					)
						? t.MarkPic
						: t.MarkAcceptablePic),
				this.OnAfterSetConfigId({
					ShowRange: t.ShowRange,
					MarkPic: e,
					ShowPriority: t.ShowPriority,
					Scale: t.Scale,
				})),
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)) &&
			(t = e.Entity.GetComponent(3)) &&
			((e = t.ActorLocationProxy), this.UpdateItemIsInDistance(e)),
			this.UpdateTrackState();
	}
	OnDestroy() {
		1 === this.MapType &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange,
				this.TreeConfigId,
				this.NodeId,
				1,
			);
	}
	OnCreateView() {
		this.InnerView = new TaskMarkItemView_1.TaskMarkItemView(this);
	}
	OnUpdate(e) {
		this.UpdateItemIsInDistance(e), this.UpdateTrackState(), this.hDi(e);
	}
	GetTitleText() {
		if (this.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest)
			return ModelManager_1.ModelManager.QuestNewModel.GetQuest(
				this.TreeConfigId,
			)?.Name;
	}
	GetAreaText() {
		if ("number" == typeof this.TrackTarget) {
			var e =
				ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(
					this.MapId,
					this.TrackTarget,
				)?.AreaId;
			if (e) {
				var t,
					i = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(e);
				if (
					void 0 !==
					(e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e))
				)
					return (
						(i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(i)),
						(t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
							e.AreaName,
						)),
						(i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
							i.AreaName,
						)),
						ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryTitle(
							e.CountryId,
						) +
							`-${i}-` +
							t
					);
			}
		}
	}
	lDi(e) {
		this.nDi ||
			(this.nDi = Vector_1.Vector.DistSquared2D(e, this.WorldPosition));
	}
	_Di(e) {
		var t, i;
		this.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
			((t = this.TreeConfigId),
			(i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t))) &&
			4 === i.Type &&
			(this.lDi(e),
			!this.oDi &&
				this.nDi &&
				this.nDi <= this.iDi &&
				((this.oDi = !0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange,
					t,
					this.NodeId,
					0,
				)),
			this.oDi) &&
			this.nDi &&
			this.nDi > this.iDi &&
			((this.oDi = !1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange,
				t,
				this.NodeId,
				1,
			));
	}
	UpdateItemIsInDistance(e) {
		if (0 === this.NodeId) {
			var t = 1 === this.MapType ? BattleUiDefine_1.CLAMP_RANGE : this.rDi;
			if (!t) return;
			this.lDi(e),
				(this.CanShowInDistance = !!this.nDi && this.nDi < t * t * 1e4);
		}
		this._Di(e), (this.nDi = void 0);
	}
	CheckCanShowView() {
		return this.BtType !== Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
			? 1 === this.MapType
			: !(
					("number" == typeof this.TrackTarget &&
						!ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(
							this.TrackTarget,
						)) ||
					(!this.CanShowInDistance && !this.IsTracked)
				);
	}
	hDi(e) {
		var t, i;
		1 === this.MapType &&
			this.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
			0 === this.NodeId &&
			this.IsCanShowView &&
			!this.aDi &&
			((t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
				this.TreeConfigId,
			))
				? (((i = new LogReportDefine_1.QuestDiscoverLogData()).i_quest_id =
						this.TreeConfigId),
					(i.i_quest_type = t.Type ?? 0),
					(i.i_icon_distance = BattleUiDefine_1.CLAMP_RANGE),
					(i.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
					(i.i_father_area_id =
						ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
					(i.f_pos_x = e.X),
					(i.f_pos_y = e.Y),
					(i.f_pos_z = e.Z),
					LogReportController_1.LogReportController.LogReport(i),
					(this.aDi = !0))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("LogReport", 19, "发送任务日志时,找不到任务对象", [
						"questId",
						this.TreeConfigId,
					]));
	}
}
exports.TaskMarkItem = TaskMarkItem;
