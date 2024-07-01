"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController"),
	ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	TowerData_1 = require("./TowerData"),
	TowerModel_1 = require("./TowerModel"),
	TOWER_SUCCESS_NO_REWARD = 3008,
	TOWER_FAIL = 3009;
class TowerController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
	}
	static OnClear() {
		return this.OnRemoveEvents(), this.OnUnRegisterNetEvent(), !0;
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.WorldDoneAndCloseLoading,
			this.b4e,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.gKe,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WorldDoneAndCloseLoading,
			this.b4e,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.gKe,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(12051, this.qTo),
			Net_1.Net.Register(24210, this.GTo),
			Net_1.Net.Register(11682, this.NTo),
			Net_1.Net.Register(26455, this.OTo);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(12051),
			Net_1.Net.UnRegister(24210),
			Net_1.Net.UnRegister(11682),
			Net_1.Net.UnRegister(26455);
	}
	static async RefreshTower() {
		var e = Protocol_1.Aki.Protocol.Xus.create({});
		e = await Net_1.Net.CallAsync(24147, e);
		e?.sbs && UiManager_1.UiManager.OpenView("TowerUnlockView", e.sbs),
			e.nbs?.Yxs &&
				0 < e.nbs.Yxs &&
				(ModelManager_1.ModelManager.TowerModel.SaveHandleData(),
				(ModelManager_1.ModelManager.TowerModel.NeedOpenReviveView = !0),
				ModelManager_1.ModelManager.TowerModel.DeleteVariationTowerInfo(),
				ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.nbs),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnTowerRefreshStars,
				));
	}
	static TowerStartRequest(e, o, r = !0) {
		var n = new Protocol_1.Aki.Protocol.tcs(),
			t = [];
		for (const e of o) {
			if (r && !ModelManager_1.ModelManager.TowerModel.IsRoleCostEnough(e))
				return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"EditBattleTeamCant",
				);
			var a = { l3n: e, MVn: 0 };
			t.push(a);
		}
		(n.SVn = t),
			(n.EVn = e),
			Net_1.Net.Call(28454, n, (r) => {
				if (r.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
					return r.lkn ===
						Protocol_1.Aki.Protocol.lkn.Proto_ErrTowerSeasonUpdate
						? void this.OpenSeasonUpdateConfirm()
						: void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								r.lkn,
								16688,
							);
				(ModelManager_1.ModelManager.TowerModel.CurrentTowerId = e),
					(ModelManager_1.ModelManager.TowerModel.CurrentTowerFormation = o),
					(ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor = -1),
					InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
			});
	}
	static TowerResetRequest(e) {
		var o = new Protocol_1.Aki.Protocol.rcs();
		(o.EVn = e),
			Net_1.Net.Call(28568, o, (e) => {
				if (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
					return e.lkn ===
						Protocol_1.Aki.Protocol.lkn.Proto_ErrTowerSeasonUpdate
						? void this.OpenSeasonUpdateConfirm()
						: void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								3635,
							);
				EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRefresh),
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"ResetConfirm",
					);
			});
	}
	static TowerRewardRequest(e, o) {
		var r = new Protocol_1.Aki.Protocol.Zus();
		(r.yVn = e),
			(r.b5n = o),
			Net_1.Net.Call(4839, r, (o) => {
				if (o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
					return o.lkn ===
						Protocol_1.Aki.Protocol.lkn.Proto_ErrTowerSeasonUpdate
						? void this.OpenSeasonUpdateConfirm()
						: void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.lkn,
								11391,
							);
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnTowerRewardReceived,
				),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RedDotTowerReward,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
						e,
					),
					e < TowerData_1.VARIATION_RISK_DIFFICULTY &&
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
							4,
						);
			});
	}
	static async TowerFormationRecommendRequest(e) {
		var o = new Protocol_1.Aki.Protocol.Jus();
		if (
			(e = ((o.EVn = e), await Net_1.Net.CallAsync(19339, o))).lkn !==
			Protocol_1.Aki.Protocol.lkn.Sys
		)
			return e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrTowerSeasonUpdate
				? void this.OpenSeasonUpdateConfirm()
				: void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						7197,
					);
		0 < e.J4n?.length
			? (ModelManager_1.ModelManager.TowerModel.RecommendFormation = e.J4n)
			: (ModelManager_1.ModelManager.TowerModel.RecommendFormation = void 0);
	}
	static TowerApplyFloorDataRequest(e) {
		var o = new Protocol_1.Aki.Protocol.ncs();
		(o.IVn = e),
			Net_1.Net.Call(21779, o, (e) => {
				if (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
					return e.lkn ===
						Protocol_1.Aki.Protocol.lkn.Proto_ErrTowerSeasonUpdate
						? void this.OpenSeasonUpdateConfirm()
						: void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								26020,
							);
				EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRefresh);
			});
	}
	static kTo() {
		var e = Protocol_1.Aki.Protocol.Kus.create({});
		Net_1.Net.Call(23561, e, (e) => {
			ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.nbs);
		});
	}
	static OpenTowerSettlementView(e) {
		const o = ModelManager_1.ModelManager.TowerModel;
		var r,
			n = o.CurrentTowerId;
		const t = o.GetHaveChallengeFloorAndFormation(n),
			a = [],
			l =
				(a.push({
					ButtonTextId: "Text_Leave_Text",
					DescriptionTextId: void 0,
					IsTimeDownCloseView: !1,
					IsClickedCloseView: !0,
					OnClickedCallback: () => {
						t && this.FTo(!0, e), this.LeaveTower();
					},
				}),
				ConfigManager_1.ConfigManager.TowerClimbConfig.GetNextFloorInArea(n));
		let i;
		if (
			(e && t
				? a.push({
						ButtonTextId: "Text_ButtonTextConfirmResult_Text",
						DescriptionTextId: void 0,
						IsTimeDownCloseView: !1,
						IsClickedCloseView: !0,
						OnClickedCallback: () => {
							this.FTo(!1, e);
						},
					})
				: e && l && !t
					? ((r =
							ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(l)),
						(C =
							ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(
								l,
							)),
						a.push({
							ButtonTextId: "Text_ButtonTextContinue_Text",
							DescriptionTextId: "Text_ButtonTextGoOnTower_Text",
							DescriptionArgs: [C, r.Floor],
							IsTimeDownCloseView: !1,
							IsClickedCloseView: !0,
							OnClickedCallback: () => {
								this.VTo(l);
							},
						}))
					: e
						? a.push({
								ButtonTextId: "Text_BackToTower_Text",
								DescriptionTextId: void 0,
								IsTimeDownCloseView: !1,
								IsClickedCloseView: !0,
								OnClickedCallback: () => {
									this.BackToTowerView();
								},
							})
						: ((o.NeedChangeFormation = !1),
							a.push({
								ButtonTextId: "Text_ButtonTextChallengeOneMore_Text",
								DescriptionTextId: void 0,
								IsTimeDownCloseView: !1,
								IsClickedCloseView: !0,
								OnClickedCallback: () => {
									ModelManager_1.ModelManager.TowerModel.NeedChangeFormation
										? this.VTo()
										: this.ReChallengeTower();
								},
							}),
							(i = {
								DescriptionTextId: "Text_ChangeFormation_Text",
								OnToggleClick: (e) => {
									o.NeedChangeFormation = 1 === e;
								},
							})),
			e)
		) {
			const o = [];
			var s = ConfigManager_1.ConfigManager.TowerClimbConfig.GetFloorTarget(n),
				d =
					ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor
						.StarIndex;
			for (let e = 0; e < TowerModel_1.FLOOR_STAR; e++) {
				var T = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTargetConfig(
						s[e],
					),
					M = [];
				for (const e of T.Params) M.push(e.toString());
				var w = d.includes(e);
				T = { Target: M, DescriptionTextId: T.DesText, IsReached: w };
				o.push(T);
			}
			TimerSystem_1.TimerSystem.Delay(() => {
				ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
					3008,
					e,
					void 0,
					void 0,
					void 0,
					a,
					o,
					i,
				);
			}, ModelManager_1.ModelManager.TowerModel.TowerSettlementDelayTime);
		} else {
			const o = [];
			var C =
				ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList();
			if (C) {
				for (const e of C) {
					var g = { TrainingData: e };
					o.push(g);
				}
				TimerSystem_1.TimerSystem.Delay(() => {
					ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
						3009,
						e,
						void 0,
						void 0,
						o,
						a,
						void 0,
						i,
					);
				}, ModelManager_1.ModelManager.TowerModel.TowerSettlementDelayTime);
			}
		}
	}
	static HTo() {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetToBattleView),
			ModelManager_1.ModelManager.TowerModel.CheckInTower() &&
				this.LeaveTower();
	}
	static LeaveTower() {
		InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
	}
	static VTo(e) {
		ModelManager_1.ModelManager.TowerModel.OpenTowerFormationView(
			e ?? ModelManager_1.ModelManager.TowerModel.CurrentTowerId,
		);
	}
	static ReChallengeTower() {
		this.TowerStartRequest(
			ModelManager_1.ModelManager.TowerModel.CurrentTowerId,
			ModelManager_1.ModelManager.TowerModel.CurrentTowerFormation,
			!1,
		);
	}
	static FTo(e, o) {
		o && ModelManager_1.ModelManager.TowerModel.SaveNeedOpenConfirmView(),
			e ||
				((o = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
					ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmViewTowerId,
				)),
				UiManager_1.UiManager.OpenView("TowerFloorView", o.AreaNum));
	}
	static BackToTowerView(e) {
		this.OpenTowerView(!0).finally(e);
	}
	static async OpenTowerView(e = !1) {
		return await this.RefreshTower(), this.jTo(e);
	}
	static async jTo(e = !1) {
		let o = 1;
		o = e
			? ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
					ModelManager_1.ModelManager.TowerModel.CurrentTowerId,
				).Difficulty
			: ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty();
		const r = new CustomPromise_1.CustomPromise();
		return (
			o === TowerData_1.VARIATION_RISK_DIFFICULTY
				? UiManager_1.UiManager.OpenView("TowerVariationView", void 0, (e) => {
						ModelManager_1.ModelManager.TowerModel.OpenReviewView(),
							r.SetResult(e);
					})
				: UiManager_1.UiManager.OpenView("TowerNormalView", void 0, (e) => {
						ModelManager_1.ModelManager.TowerModel.OpenReviewView(),
							r.SetResult(e);
					}),
			r.Promise
		);
	}
	static OpenSeasonUpdateConfirm() {
		var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(99),
			o = () => {
				this.HTo();
			};
		e.FunctionMap.set(1, o),
			e.FunctionMap.set(2, o),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				e,
			);
	}
	static OpenTowerGuide() {
		UiManager_1.UiManager.OpenView("TowerGuideView");
	}
}
(exports.TowerController = TowerController),
	((_a = TowerController).gKe = (e, o) => {
		10055 === e && o && _a.kTo();
	}),
	(TowerController.b4e = () => {
		var e;
		_a.kTo(),
			ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmView &&
				((e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
					ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmViewTowerId,
				)),
				UiManager_1.UiManager.OpenView("TowerFloorView", e.AreaNum)),
			ModelManager_1.ModelManager.TowerModel.CheckInTower() &&
				TimerSystem_1.TimerSystem.Delay(() => {
					_a.OpenTowerGuide(),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnShowTowerGuideButton,
						);
				}, ModelManager_1.ModelManager.TowerModel.TowerGuideDelayTime);
	}),
	(TowerController.qTo = (e) => {
		ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.nbs);
	}),
	(TowerController.NTo = (e) => {
		ModelManager_1.ModelManager.TowerModel.RefreshTowerInfoByFloor(e.ibs);
	}),
	(TowerController.GTo = (e) => {
		ModelManager_1.ModelManager.TowerModel.RefreshTowerInfoByDifficulty(e.zxs);
	}),
	(TowerController.OTo = (e) => {
		var o;
		e.hbs && !ModelManager_1.ModelManager.TowerModel.GetIsInOnceTower()
			? _a.OpenSeasonUpdateConfirm()
			: (ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
				e.Sys &&
					((o = e.lbs),
					(ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor =
						new TowerData_1.TowerFloorInfo(o.EVn, o.UDs, o.SVn, o.rbs))),
				_a.OpenTowerSettlementView(e.Sys));
	});
