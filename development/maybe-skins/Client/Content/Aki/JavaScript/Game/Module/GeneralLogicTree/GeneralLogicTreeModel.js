"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GeneralLogicTreeModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	BaseBehaviorTree_1 = require("./BaseBehaviorTree/BaseBehaviorTree"),
	GeneralLogicTreeDefine_1 = require("./Define/GeneralLogicTreeDefine");
class GeneralLogicTreeModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.d$t = void 0),
			(this.C$t = void 0),
			(this.g$t = void 0),
			(this.B5s = void 0),
			(this.f$t = void 0),
			(this.IsWakeUp = !1),
			(this.ExpressionOccupationTreeIncId = void 0),
			(this.TimeStop = !1),
			(this.CountDownViewClosing = !1),
			(this.DisableInput = !1),
			(this.lro = 0);
	}
	OnInit() {
		return (
			(this.d$t = BigInt(0)),
			(this.C$t = new Map()),
			(this.g$t = new Map()),
			(this.f$t = new Map()),
			(this.B5s = new Map()),
			!0
		);
	}
	OnLeaveLevel() {
		return this.p$t(), !0;
	}
	OnChangeMode() {
		return this.p$t(), !0;
	}
	p$t() {
		for (var [, e] of this.C$t) e.SetSleep(!0);
		this.IsWakeUp = !1;
	}
	OnClear() {
		return (
			this.C$t?.clear(),
			(this.C$t = void 0),
			this.g$t?.clear(),
			(this.g$t = void 0),
			this.f$t?.clear(),
			!(this.f$t = void 0)
		);
	}
	SetTimerUiOwnerId(e) {
		this.d$t = e;
	}
	IsTimerUiOwner(e) {
		return this.d$t === e;
	}
	CreateBehaviorTree(e) {
		var t = MathUtils_1.MathUtils.LongToBigInt(e.L5n);
		let r = this.C$t.get(t);
		if (r) return r.Recover(e), r;
		let o = !this.IsWakeUp;
		switch (e.NCs) {
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:
				var i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.qfs);
				i
					? ((r = new BaseBehaviorTree_1.BaseBehaviorTree(
							t,
							e.qfs,
							e.NCs,
							i.DungeonId,
							i.QuestMarkId,
						)),
						i.SetUpBehaviorTree(r))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"创建任务行为树时：任务不存在",
							["任务Id", e.qfs],
						);
				break;
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:
				(i =
					ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
						e.qfs,
					))
					? ((r = new BaseBehaviorTree_1.BaseBehaviorTree(
							t,
							e.qfs,
							e.NCs,
							ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
							GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID,
						)),
						i.SetUpBehaviorTree(r))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"创建玩法行为树时：玩法不存在",
							["玩法Id", e.qfs],
						);
				break;
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst: {
				if (
					!(i =
						ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo())
				) {
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"创建副本行为树时：副本不存在",
							["副本Id", e.qfs],
						);
					break;
				}
				let n = GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID;
				switch (i.SubType) {
					case 2:
						n =
							ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(
								1,
							);
						break;
					case 1:
						n =
							ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(
								3,
							);
				}
				(o =
					!ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed),
					(r = new BaseBehaviorTree_1.BaseBehaviorTree(
						t,
						e.qfs,
						e.NCs,
						ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
						n,
					)),
					i.SetUpBehaviorTree(r);
				break;
			}
			default:
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"GeneralLogicTree",
						19,
						"创建行为树时找不到对应的行为树类型",
						["行为树类型Id", e.NCs],
					);
		}
		if (r) {
			this.C$t.set(t, r), this.f$t.set(t, e.T5n);
			let i = this.g$t.get(e.NCs);
			return (
				i || ((i = new Map()), this.g$t.set(e.NCs, i)),
				i.set(t, r),
				r.InitTree(e, o),
				r
			);
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"GeneralLogicTree",
				19,
				"创建行为树失败",
				["行为树类型Id", e.NCs],
				["行为树Id", e.qfs],
			);
	}
	RemoveBehaviorTree(e) {
		var t = this.C$t.get(e);
		t && (t.Destroy(), this.C$t.delete(e), this.g$t.get(t.BtType)?.delete(e));
	}
	GetBehaviorTree(e) {
		return this.C$t.get(e);
	}
	GetBehaviorTrees(e) {
		return this.g$t.get(e);
	}
	GetBehaviorTreeOwnerId(e) {
		if (void 0 !== e) return this.f$t.get(e);
	}
	GetAllBehaviorTrees() {
		return this.C$t;
	}
	SaveUpdateInfo(e, t, r) {
		var o =
			"Disabled" !== ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode();
		e = new GeneralLogicTreeDefine_1.NodeStatusChangeInfo(e, t, o, r);
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.QuestUpdateInfoAdd,
			e,
		);
	}
	ForceShowDailyQuestInfo(e, t) {
		var r = this.GetBehaviorTree(e);
		r && this.SaveUpdateInfo(e, t, r.CreateShowBridge());
	}
	ApplyExpressionOccupation(e) {
		e &&
			this.ExpressionOccupationTreeIncId !== e &&
			((this.ExpressionOccupationTreeIncId = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.GeneralLogicTreeApplyExpressionOccupation,
				e,
			));
	}
	IsExpressionInOccupying() {
		return void 0 !== this.ExpressionOccupationTreeIncId;
	}
	IsExpressionOccupyingByTree(e) {
		return (
			void 0 !== this.ExpressionOccupationTreeIncId &&
			this.ExpressionOccupationTreeIncId === e
		);
	}
	TryReleaseExpressionOccupation(e) {
		this.ExpressionOccupationTreeIncId &&
			this.ExpressionOccupationTreeIncId === e &&
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation,
				e,
			),
			(this.ExpressionOccupationTreeIncId = void 0));
	}
	UpdateGuideLineStartShowTime() {
		this.lro = TimeUtil_1.TimeUtil.GetServerTime();
	}
	GetGuideLineStartShowTime() {
		return this.lro;
	}
	AddOccupationInfo(e) {
		this.B5s.set(e.cvs, MathUtils_1.MathUtils.LongToBigInt(e.Ykn));
	}
	RemoveOccupationInfo(e) {
		this.B5s.delete(e);
	}
	IsOccupationExist(e) {
		return void 0 !== this.B5s.get(e);
	}
	GetOccupationTreeId(e) {
		return this.B5s.get(e);
	}
	GetOccupationQuestName(e) {
		return (e = (e = this.B5s.get(e)) && this.GetBehaviorTree(e)) &&
			e.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
			? ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.TreeConfigId)
					?.Name ?? ""
			: "";
	}
}
exports.GeneralLogicTreeModel = GeneralLogicTreeModel;
