"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ForgingController = void 0);
const AudioController_1 = require("../../../../Core/Audio/AudioController"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	Net_1 = require("../../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
	RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
	CommonManager_1 = require("../Common/CommonManager"),
	ForgingDefine_1 = require("./ForgingDefine"),
	ENTER_AUDIO_ID = "play_ui_fx_spl_gen_page_open",
	LEAVE_AUDIO_ID = "play_ui_fx_spl_gen_page_close",
	SUCCESS_AUDIO_ID = "play_ui_fx_spl_gen_robot_success_vo";
class ForgingController extends UiControllerBase_1.UiControllerBase {
	static get ForgingCostId() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig("ForgingCost") ?? -1
		);
	}
	static OnClear() {
		return this.ClearCurrentInteractionEntityDisplay(), !0;
	}
	static OnLeaveLevel() {
		return this.ClearCurrentInteractionEntityDisplay(), !0;
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ActiveRole,
			ForgingController.Qyi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SwitchViewType,
				ForgingController.Xyi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				ForgingController.bbt,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ActiveRole,
			ForgingController.Qyi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SwitchViewType,
				ForgingController.Xyi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				ForgingController.bbt,
			);
	}
	static RegisterCurrentInteractionEntity() {
		this.Yyi =
			ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
	}
	static ClearCurrentInteractionEntityDisplay() {
		this.Yyi && (this.ClearForgingDisplay(), (this.Yyi = void 0));
	}
	static tTi(e) {
		ModelManager_1.ModelManager.ForgingModel.UpdateForgingDataList(e.JLs),
			ModelManager_1.ModelManager.ForgingModel.UpdateForgingByServerConfig(
				e.JLs,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(14670, (e) => {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Forging", 50, "10270_服务端主动推送锻造数据更新");
			var o = ModelManager_1.ModelManager.ForgingModel;
			let r = !1;
			for (const i of e.JLs) {
				var t = i.Ekn,
					n = o.GetForgingDataById(t);
				!n ||
					n.IsUnlock ||
					((n.IsNew = !0),
					ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
						LocalStorageDefine_1.ELocalStoragePlayerKey.ForgingLevelKey,
						t,
					),
					(r = !0));
			}
			r &&
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"FormulaLearned",
				);
		});
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(14670);
	}
	static SendForgeInfoRequest() {
		var e;
		ForgingController.iTi
			? Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Forging",
					50,
					"已经请求过10266_锻造系统相关数据，等待返回",
				)
			: ((ForgingController.iTi = !0),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Forging", 50, "10266_客户端请求锻造系统相关数据"),
				(e = new Protocol_1.Aki.Protocol.nZn()),
				Net_1.Net.Call(1698, Protocol_1.Aki.Protocol.nZn.create(e), (e) => {
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Forging", 50, "10266_返回请求锻造系统相关数据"),
						(ForgingController.iTi = !1),
						e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
							? (ModelManager_1.ModelManager.ForgingModel.SaveLimitRefreshTime(
									e.rLs,
								),
								ForgingController.tTi(e),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.GetForgingData,
								))
							: (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									e.Kms,
									19727,
									void 0,
									!0,
									!1,
								),
								UiManager_1.UiManager.IsViewShow("ForgingRootView") &&
									UiManager_1.UiManager.CloseView("ForgingRootView"));
				}));
	}
	static async SendForgeInfoRequestAsync() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Forging",
				50,
				"10266_客户端请求锻造系统相关数据(异步刷新)",
			);
		var e = new Protocol_1.Aki.Protocol.nZn();
		(e = await Net_1.Net.CallAsync(1698, e)).Kms ===
		Protocol_1.Aki.Protocol.lkn.Sys
			? (ModelManager_1.ModelManager.ForgingModel.SaveLimitRefreshTime(e.rLs),
				ForgingController.tTi(e))
			: (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.Kms,
					19727,
					void 0,
					!0,
					!1,
				),
				UiManager_1.UiManager.IsViewShow("ForgingRootView") &&
					UiManager_1.UiManager.CloseView("ForgingRootView"));
	}
	static SendForgeItemRequest(e, o, r) {
		var t = new Protocol_1.Aki.Protocol.aZn();
		(t.Ekn = e),
			(t.l3n = o),
			(t.I5n = r),
			(t.N4n =
				ModelManager_1.ModelManager.ForgingModel.CurrentInteractCreatureDataLongId),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Forging", 50, "10268_请求锻造道具"),
			Net_1.Net.Call(1959, Protocol_1.Aki.Protocol.aZn.create(t), (e) => {
				if (
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Forging", 50, "10268_请求锻造道具返回"),
					e.Kms === Protocol_1.Aki.Protocol.lkn.Sys)
				) {
					var o =
						((o = ModelManager_1.ModelManager.ForgingModel.GetForgingDataById(
							e.Ekn,
						)) && (o.LastRoleId = e.l3n),
						e.QTs);
					0 !== e.YTs.length && o.push(...e.YTs);
					const n = [];
					for (const e of o) {
						var r = e.G3n;
						for (let o = 0; o < (e.k4n ?? 1); o++) {
							var t = new RewardItemData_1.RewardItemData(r, 1);
							n.push(t);
						}
					}
					ForgingController.PlayForgingWorkingDisplay(() => {
						ForgingController.oTi(SUCCESS_AUDIO_ID),
							ForgingController.PlayForgingLoopDisplay(),
							ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
								2003,
								!0,
								n,
							);
					}),
						ModelManager_1.ModelManager.ForgingModel.UpdateForgingItemList(o),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ForgingSuccess,
						);
				} else
					EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForgingFail),
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.Kms,
							20092,
						);
			});
	}
	static SendForgeFormulaUnlockRequest(e) {
		var o = new Protocol_1.Aki.Protocol._Zn();
		(o.Ekn = e),
			Net_1.Net.Call(14873, Protocol_1.Aki.Protocol._Zn.create(o), (o) => {
				var r;
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Forging", 50, "10271_请求解锁配方返回"),
					o.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? ((r =
								ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
									e,
								)),
							(r = ConfigManager_1.ConfigManager.ForgingConfig.GetLocalText(
								r.Name,
							)),
							ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"ComposeStudy",
								r,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.UpdateForgingFormula,
							))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.Kms,
								16551,
							);
			});
	}
	static CheckIsBuff(e, o) {
		return ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
			o,
		).RoleList.includes(e);
	}
	static CheckIsBuffEx(e, o) {
		var r = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(o);
		if (!r.RoleList.includes(e))
			for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleIdList())
				if (r.RoleList.includes(e)) return !0;
		return !1;
	}
	static GetMaxCreateCount(e) {
		return (
			(e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e)),
			ForgingController.kbt(
				e.ConsumeItems,
				CommonParamById_1.configCommonParamById.GetIntConfig("MaxForgingCount"),
			)
		);
	}
	static kbt(e, o) {
		let r = o;
		for (const o of e) {
			var t = o.Count,
				n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					o.ItemId,
				);
			if (n < t) return 0;
			r = r < (n = MathUtils_1.MathUtils.GetFloatPointFloor(n / t, 0)) ? r : n;
		}
		return r;
	}
	static GetForgingInfoText(e) {
		e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
		let o = "";
		for (const r of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
			e.SkillId,
		))
			0 !== r.LeftSkillEffect &&
				(o = StringUtils_1.StringUtils.Format(
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.SkillDescribe),
					...r.SkillDetailNum,
				));
		return o;
	}
	static CheckCanForging(e) {
		return ModelManager_1.ModelManager.ForgingModel.CheckCanForging(e);
	}
	static CheckCanUnlock(e) {
		return (
			(e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e)),
			0 !==
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					e.FormulaItemId,
				)
		);
	}
	static CheckCanForgingOrCanUnlock(e) {
		return ModelManager_1.ModelManager.ForgingModel.GetForgingDataById(e)
			.IsUnlock
			? ForgingController.CheckCanForging(e)
			: ForgingController.CheckCanUnlock(e);
	}
	static GetForgingText(e) {
		return (
			(e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e)),
			ConfigManager_1.ConfigManager.ForgingConfig.GetLocalText(e.Name)
		);
	}
	static GetForgingId(e) {
		return ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e)
			.ItemId;
	}
	static GetForgingMaterialList(e) {
		return ModelManager_1.ModelManager.ForgingModel.GetForgingMaterialList(e);
	}
	static GetHelpRoleItemDataList(e) {
		return ModelManager_1.ModelManager.ForgingModel.GetHelpRoleItemDataList(e);
	}
	static CheckShowRoleView() {
		return !0;
	}
	static GetCurrentRoleId() {
		return ModelManager_1.ModelManager.ForgingModel.CurrentForgingRoleId;
	}
	static SetCurrentRoleId(e) {
		ModelManager_1.ModelManager.ForgingModel.CurrentForgingRoleId = e;
	}
	static SendManufacture(e, o) {
		ForgingController.CheckCanForging(e)
			? ForgingController.SendForgeItemRequest(
					e,
					ForgingController.GetCurrentRoleId(),
					o,
				)
			: ForgingController.PlayForgingFailDisplay(() => {
					ForgingController.PlayForgingLoopDisplay();
				});
	}
	static GetForgingRoleId(e) {
		return ModelManager_1.ModelManager.ForgingModel.GetForgingRoleId(e);
	}
	static GetForgingItemList() {
		return ModelManager_1.ModelManager.ForgingModel.GetForgingItemList();
	}
	static PlayForgingEnterDisplay(e) {
		this.ClearForgingDisplay();
		var o,
			r = this.Fbt();
		r &&
			((o = ModelManager_1.ModelManager.ComposeModel.ComposeEnterFlow),
			ForgingController.PlayForgingFlow(o),
			ForgingController.oTi(ENTER_AUDIO_ID),
			r.AddTag(-234527092),
			(this.tIi = e),
			(this.rTi = TimerSystem_1.TimerSystem.Delay(() => {
				this.tIi && this.tIi();
			}, ForgingDefine_1.FORGING_ENTER_SEQUENCE_TIME_LENGTH)));
	}
	static PlayForgingLoopDisplay() {
		this.ClearForgingDisplay();
		var e = this.Fbt();
		e && e.AddTag(236686531);
	}
	static PlayForgingWorkingDisplay(e) {
		this.ClearForgingDisplay();
		var o = this.Fbt();
		o &&
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnBeginPlayForgingWorkingDisplay,
			),
			o.AddTag(686058684),
			(this.oIi = e),
			(this.rTi = TimerSystem_1.TimerSystem.Delay(() => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnPlayForgingWorkingDisplayFinished,
				),
					this.oIi && this.oIi();
			}, ForgingDefine_1.FORGING_WORKING_SEQUENCE_TIME_LENGTH)));
	}
	static PlayForgingFlow(e, o = 2) {
		e &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Test",
					8,
					"[PlayForgingFlow]播放D级剧情",
					["FlowListName", e.FlowListName],
					["StateId", e.StateId],
					["FlowId", e.FlowId],
				),
			(o = { ViewName: "ForgingRootView", Position: o, TextWidth: 700 }),
			ControllerHolder_1.ControllerHolder.FlowController.StartFlowForView(
				e.FlowListName,
				e.StateId,
				e.FlowId,
				o,
			));
	}
	static oTi(e, o) {
		var r = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e);
		r &&
			(AudioController_1.AudioController.PostEventByUi(r.Path, o),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug("Forging", 8, "播放锻造台音频", ["audioId", e]);
	}
	static PlayLeaveForgingAudio() {
		this.oTi(LEAVE_AUDIO_ID);
	}
	static PlayForgingFailDisplay(e) {
		this.ClearForgingDisplay();
		var o,
			r = this.Fbt();
		r &&
			((o = ModelManager_1.ModelManager.ComposeModel.ComposeFailFlow),
			ForgingController.PlayForgingFlow(o),
			r.AddTag(-269686894),
			(this.rIi = e),
			(this.rTi = TimerSystem_1.TimerSystem.Delay(() => {
				this.rIi && this.rIi();
			}, ForgingDefine_1.FORGING_FAIL_SEQUENCE_TIME_LENGTH)));
	}
	static ClearForgingDisplay() {
		var e = this.Fbt();
		e &&
			(e.RemoveTag(-269686894),
			e.RemoveTag(686058684),
			e.RemoveTag(236686531),
			e.RemoveTag(-234527092)),
			this.rTi &&
				TimerSystem_1.TimerSystem.Has(this.rTi) &&
				(TimerSystem_1.TimerSystem.Remove(this.rTi), (this.rTi = void 0));
	}
	static Fbt() {
		var e =
			ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
		if (e && (e = EntitySystem_1.EntitySystem.Get(e)))
			return e.GetComponent(177);
	}
}
(exports.ForgingController = ForgingController),
	((_a = ForgingController).rTi = void 0),
	(ForgingController.tIi = void 0),
	(ForgingController.oIi = void 0),
	(ForgingController.rIi = void 0),
	(ForgingController.Yyi = 0),
	(ForgingController.bbt = () => {
		ModelManager_1.ModelManager.ForgingModel.CreateForgingDataList(),
			_a.SendForgeInfoRequest();
	}),
	(ForgingController.Xyi = (e) => {
		if (2 === CommonManager_1.CommonManager.GetCurrentSystem())
			switch (e) {
				case 0:
					ModelManager_1.ModelManager.ForgingModel.CurrentForgingViewType = 1;
					break;
				case 2:
					ModelManager_1.ModelManager.ForgingModel.CurrentForgingViewType = 2;
			}
	}),
	(ForgingController.Qyi = () => {
		ModelManager_1.ModelManager.ForgingModel.UpdateHelpRoleItemDataList();
	}),
	(ForgingController.iTi = !1);
