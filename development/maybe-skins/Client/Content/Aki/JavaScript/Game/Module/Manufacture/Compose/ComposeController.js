"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComposeController = void 0);
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
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
	RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
	CommonManager_1 = require("../Common/CommonManager"),
	ComposeDefine_1 = require("./ComposeDefine"),
	ENTER_AUDIO_ID = "play_ui_fx_spl_gen_page_open",
	LEAVE_AUDIO_ID = "play_ui_fx_spl_gen_page_close",
	SUCCESS_AUDIO_ID = "play_ui_fx_spl_gen_robot_success_vo";
class ComposeController extends UiControllerBase_1.UiControllerBase {
	static get ComposeCoinId() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig("ComposeCost") ?? -1
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
			ComposeController.Qyi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SwitchViewType,
				ComposeController.Xyi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				ComposeController.bbt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnItemUse,
				ComposeController.$yi,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ActiveRole,
			ComposeController.Qyi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SwitchViewType,
				ComposeController.Xyi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				ComposeController.bbt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnItemUse,
				ComposeController.$yi,
			);
	}
	static RegisterCurrentInteractionEntity() {
		this.Yyi =
			ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
	}
	static ClearCurrentInteractionEntityDisplay() {
		this.Yyi && (this.ClearCompositeDisplay(), (this.Yyi = void 0));
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(26083, (e) => {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Compose", 50, "10277_服务端主动推送合成数据更新"),
				ModelManager_1.ModelManager.ComposeModel.UpdateComposeDataList(e.xxs),
				ModelManager_1.ModelManager.ComposeModel.HideComposeDataList(e.Oxs);
		}),
			Net_1.Net.Register(17417, (e) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Compose",
						50,
						"10280_服务端主动推送合成等级数据更新",
					),
					ModelManager_1.ModelManager.ComposeModel.UpdateComposeInfo(e.Bxs),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.UpdateComposeInfo,
					);
			});
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(26083), Net_1.Net.UnRegister(17417);
	}
	static Jyi(e) {
		ModelManager_1.ModelManager.ComposeModel.CreateComposeDataList(e.xxs),
			ModelManager_1.ModelManager.ComposeModel.UpdateComposeByServerConfig(
				e.bxs,
			),
			ModelManager_1.ModelManager.ComposeModel.CreateComposeLevelInfo(e.Bxs),
			ModelManager_1.ModelManager.ComposeModel.SaveLimitRefreshTime(e.rLs);
	}
	static async SendSynthesisInfoRequestAsync() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Compose",
				50,
				"10273_客户端请求合成系统相关数据(异步刷新)",
			);
		var e = new Protocol_1.Aki.Protocol.Z_s();
		e = await Net_1.Net.CallAsync(26777, e);
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Compose",
				50,
				"10273_返回请求合成系统相关数据(异步刷新)",
			),
			e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
				? ComposeController.Jyi(e)
				: (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.Kms,
						8010,
						void 0,
						!0,
						!1,
					),
					UiManager_1.UiManager.IsViewShow("ComposeRootView") &&
						UiManager_1.UiManager.CloseView("ComposeRootView"));
	}
	static SendSynthesisItemRequest(e, o, t) {
		var r = new Protocol_1.Aki.Protocol.tus();
		(r.Ekn = e),
			(r.l3n = o),
			(r.I5n = t),
			(r.N4n =
				ModelManager_1.ModelManager.ComposeModel.CurrentInteractCreatureDataLongId),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Compose", 50, "10275_请求合成道具"),
			Net_1.Net.Call(6114, Protocol_1.Aki.Protocol.tus.create(r), (e) => {
				if (
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Compose", 50, "10275_请求合成道具返回"),
					e.Kms === Protocol_1.Aki.Protocol.lkn.Sys)
				) {
					let C;
					(C =
						(C =
							(C =
								C ||
								ModelManager_1.ModelManager.ComposeModel.GetStructureDataById(
									e.Ekn,
								)) ||
							ModelManager_1.ModelManager.ComposeModel.GetReagentProductionDataById(
								e.Ekn,
							)) ||
						ModelManager_1.ModelManager.ComposeModel.GetPurificationDataById(
							e.Ekn,
						)) && (C.LastRoleId = e.l3n);
					var o = e.QTs,
						t =
							(0 !== e.YTs.length && o.push(...e.YTs),
							ModelManager_1.ModelManager.ComposeModel),
						r = (l = t.GetComposeInfo()).ComposeLevel,
						a = t.GetComposeMaxLevel(),
						n = t.GetComposeLevelByLevel(a),
						l = l.TotalProficiency;
					n = n.Completeness;
					let m;
					1 === t.CurrentComposeListType &&
						(t.LastExp < n || (r < a && l < n)) &&
						((n = t.GetComposeLevelByLevel(Math.min(a, r + 1))),
						(a = {
							FromProgress: t.LastExp,
							ToProgress: l,
							MaxProgress: n.Completeness,
						}),
						(m = [a])),
						(t.LastExp = l);
					const M = [];
					for (const e of o) {
						var i = e.G3n,
							s = e.k4n;
						i = new RewardItemData_1.RewardItemData(i, s);
						M.push(i);
					}
					ComposeController.PlayCompositeWorkingDisplay(() => {
						ComposeController.Zyi(SUCCESS_AUDIO_ID),
							ComposeController.PlayCompositeLoopDisplay(),
							ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
								2004,
								!0,
								M,
								m,
							);
					}),
						ModelManager_1.ModelManager.ComposeModel.UpdateComposeItemList(o),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ComposeSuccess,
						);
				} else
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.Kms,
						3993,
					),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ComposeFail,
						);
			});
	}
	static SendSynthesisLevelRewardRequest() {
		var e;
		ComposeController.eIi
			? Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Compose",
					50,
					"已经请求过10278_领取制药等级奖励，等待返回",
				)
			: ((e = new Protocol_1.Aki.Protocol.ous()),
				(ComposeController.eIi = !0),
				Net_1.Net.Call(23876, Protocol_1.Aki.Protocol.ous.create(e), (e) => {
					(ComposeController.eIi = !1),
						e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
							? (Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Compose", 50, "10278_领取制药等级奖励返回"),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.UpgradeComposeLevel,
								))
							: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									e.Kms,
									3978,
								);
				}));
	}
	static SendSynthesisFormulaUnlockRequest(e) {
		var o = new Protocol_1.Aki.Protocol.aus();
		(o.Ekn = e),
			Net_1.Net.Call(12637, Protocol_1.Aki.Protocol.aus.create(o), (o) => {
				var t;
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Compose", 50, "10281_制药配方解锁请求返回"),
					o.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? (ModelManager_1.ModelManager.ComposeModel.UnlockReagentProductionData(
								o.Ekn,
							),
							ModelManager_1.ModelManager.ComposeModel.UnlockStructureData(
								o.Ekn,
							),
							(t =
								ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
									e,
								)),
							(t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
								t.Name,
							)),
							ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"ComposeStudy",
								t,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.UpdateComposeFormula,
							))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.Kms,
								26668,
							);
			});
	}
	static CheckIsBuff(e, o) {
		return ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
			o,
		).RoleList.includes(e);
	}
	static GetComposeInfoText(e) {
		e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
		let o = "";
		for (const t of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
			e.SkillId,
		))
			0 !== t.LeftSkillEffect &&
				(o = StringUtils_1.StringUtils.Format(
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.SkillDescribe),
					...t.SkillDetailNum,
				));
		return o;
	}
	static GetComposeItemList() {
		return ModelManager_1.ModelManager.ComposeModel.GetComposeItemList();
	}
	static SetSelectedComposeLevel(e) {
		ModelManager_1.ModelManager.ComposeModel.SelectedComposeLevel = e;
	}
	static GetSelectedComposeLevel() {
		return ModelManager_1.ModelManager.ComposeModel.SelectedComposeLevel;
	}
	static GetRewardLevelInfo() {
		return ModelManager_1.ModelManager.ComposeModel.GetComposeInfo();
	}
	static GetComposeLevelByLevel(e) {
		return ModelManager_1.ModelManager.ComposeModel.GetComposeLevelByLevel(e);
	}
	static GetSumExpByLevel(e) {
		return ModelManager_1.ModelManager.ComposeModel.GetSumExpByLevel(e);
	}
	static GetDropIdByLevel(e) {
		return ModelManager_1.ModelManager.ComposeModel.GetDropIdByLevel(e);
	}
	static GetComposeMaxLevel() {
		return ModelManager_1.ModelManager.ComposeModel.GetComposeMaxLevel();
	}
	static CheckCanReagentProduction(e) {
		return ModelManager_1.ModelManager.ComposeModel.CheckCanReagentProduction(
			e,
		);
	}
	static CheckCanPurification(e) {
		return ModelManager_1.ModelManager.ComposeModel.CheckCanPurification(e);
	}
	static CheckCanStructure(e) {
		return ModelManager_1.ModelManager.ComposeModel.CheckCanStructure(e);
	}
	static CheckIsBuffEx(e, o) {
		var t =
			ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(o);
		if (!t.RoleList.includes(e))
			for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleIdList())
				if (t.RoleList.includes(e)) return !0;
		return !1;
	}
	static GetComposeText(e) {
		return ModelManager_1.ModelManager.ComposeModel.GetComposeText(e);
	}
	static GetComposeId(e) {
		return ModelManager_1.ModelManager.ComposeModel.GetComposeId(e);
	}
	static CheckShowRoleView() {
		return !0;
	}
	static GetMaxCreateCount(e) {
		return (
			(e =
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e)),
			ComposeController.kbt(e.ConsumeItems, e.LimitCount)
		);
	}
	static kbt(e, o) {
		let t = 0;
		t =
			0 !== o
				? o
				: CommonParamById_1.configCommonParamById.GetIntConfig(
						"max_cooking_count",
					);
		for (const o of e) {
			var r = o.Count,
				a = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					o.ItemId,
				);
			if (a < r) return 0;
			t = t < (a = MathUtils_1.MathUtils.GetFloatPointFloor(a / r, 0)) ? t : a;
		}
		return t;
	}
	static SendManufacture(e, o) {
		ModelManager_1.ModelManager.ComposeModel.CheckComposeMaterialEnough(e)
			? (1 ===
					ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType &&
					ModelManager_1.ModelManager.ComposeModel.CleanAddExp(),
				ComposeController.SendSynthesisItemRequest(
					e,
					ComposeController.GetCurrentRoleId(),
					o,
				))
			: ComposeController.PlayCompositeFailDisplay(() => {
					ComposeController.PlayCompositeLoopDisplay();
				});
	}
	static GetCurrentRoleId() {
		return ModelManager_1.ModelManager.ComposeModel.CurrentComposeRoleId;
	}
	static SetCurrentRoleId(e) {
		ModelManager_1.ModelManager.ComposeModel.CurrentComposeRoleId = e;
	}
	static GetManufactureMaterialList(e) {
		return ModelManager_1.ModelManager.ComposeModel.GetComposeMaterialList(e);
	}
	static GetHelpRoleItemDataList(e) {
		return ModelManager_1.ModelManager.ComposeModel.GetHelpRoleItemDataList(e);
	}
	static GetComposeRoleId(e) {
		switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
			case 1:
				return ModelManager_1.ModelManager.ComposeModel.GetReagentProductionRoleId(
					e,
				);
			case 2:
				return ModelManager_1.ModelManager.ComposeModel.GetStructureRoleId(e);
			case 3:
				return ModelManager_1.ModelManager.ComposeModel.GetPurificationRoleId(
					e,
				);
			default:
				return 0;
		}
	}
	static CheckCanShowExpItem() {
		return (
			1 === ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType
		);
	}
	static CheckCanGetComposeLevel() {
		var e = ModelManager_1.ModelManager.ComposeModel.GetComposeInfo();
		if (
			e.ComposeLevel !==
			ModelManager_1.ModelManager.ComposeModel.GetComposeMaxLevel()
		) {
			var o = ModelManager_1.ModelManager.ComposeModel.GetSumExpByLevel(
				e.ComposeLevel,
			);
			if (e.TotalProficiency >= o) return !0;
		}
		return !1;
	}
	static PlayCompositeEnterDisplay(e) {
		this.ClearCompositeDisplay();
		var o,
			t = this.Fbt();
		t &&
			((o = ModelManager_1.ModelManager.ComposeModel.ComposeEnterFlow),
			ComposeController.PlayCompositeFlow(o),
			ComposeController.Zyi(ENTER_AUDIO_ID),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Test", 8, "[CompositeDisplay]播放进入合成表现"),
			t.AddTag(-234527092),
			(this.tIi = e),
			(this.iIi = TimerSystem_1.TimerSystem.Delay(() => {
				this.tIi && this.tIi();
			}, ComposeDefine_1.COMPOSITE_ENTER_SEQUENCE_TIME_LENGTH)));
	}
	static PlayCompositeLoopDisplay() {
		this.ClearCompositeDisplay();
		var e = this.Fbt();
		e &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Test", 8, "[CompositeDisplay]播放合成循环表现"),
			e.AddTag(236686531));
	}
	static PlayCompositeWorkingDisplay(e) {
		this.ClearCompositeDisplay();
		var o = this.Fbt();
		o &&
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnBeginPlayCompositeWorkingDisplay,
			),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Test", 8, "[CompositeDisplay]播放合成工作中表现"),
			o.AddTag(686058684),
			(this.oIi = e),
			(this.iIi = TimerSystem_1.TimerSystem.Delay(() => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnPlayCompositeWorkingDisplayFinished,
				),
					this.oIi && this.oIi();
			}, ComposeDefine_1.COMPOSITE_WORKING_SEQUENCE_TIME_LENGTH)));
	}
	static PlayCompositeFlow(e) {
		var o;
		e &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Test",
					8,
					"[PlayCompositeFlow]播放D级剧情",
					["FlowListName", e.FlowListName],
					["StateId", e.StateId],
					["FlowId", e.FlowId],
				),
			(o = { ViewName: "ComposeRootView", Position: 2, TextWidth: 700 }),
			ControllerHolder_1.ControllerHolder.FlowController.StartFlowForView(
				e.FlowListName,
				e.StateId,
				e.FlowId,
				o,
			));
	}
	static Zyi(e, o) {
		var t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e);
		t &&
			(AudioController_1.AudioController.PostEventByUi(t.Path, o),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug("Compose", 8, "播放合成台音频", ["audioId", e]);
	}
	static PlayLeaveCompositeAudio() {
		this.Zyi(LEAVE_AUDIO_ID);
	}
	static PlayCompositeFailDisplay(e) {
		this.ClearCompositeDisplay();
		var o,
			t = this.Fbt();
		t &&
			((o = ModelManager_1.ModelManager.ComposeModel.ComposeFailFlow),
			ComposeController.PlayCompositeFlow(o),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Test", 8, "[CompositeDisplay]播放合成失败表现"),
			t.AddTag(-269686894),
			(this.rIi = e),
			(this.iIi = TimerSystem_1.TimerSystem.Delay(() => {
				this.rIi && this.rIi();
			}, ComposeDefine_1.COMPOSITE_FAIL_SEQUENCE_TIME_LENGTH)));
	}
	static ClearCompositeDisplay() {
		var e = this.Fbt();
		e &&
			(e.RemoveTag(-269686894),
			e.RemoveTag(686058684),
			e.RemoveTag(236686531),
			e.RemoveTag(-234527092),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("Test", 8, "[CompositeDisplay]清理所有GameplayTag"),
			(this.tIi = void 0),
			(this.oIi = void 0),
			(this.rIi = void 0),
			this.iIi &&
				TimerSystem_1.TimerSystem.Has(this.iIi) &&
				(TimerSystem_1.TimerSystem.Remove(this.iIi), (this.iIi = void 0));
	}
	static Fbt() {
		if (this.Yyi) {
			var e = EntitySystem_1.EntitySystem.Get(this.Yyi);
			if (e) return e.GetComponent(177);
		}
	}
}
((exports.ComposeController = ComposeController).iIi = void 0),
	(ComposeController.tIi = void 0),
	(ComposeController.oIi = void 0),
	(ComposeController.rIi = void 0),
	(ComposeController.Yyi = void 0),
	(ComposeController.bbt = () => {
		ModelManager_1.ModelManager.ComposeModel.CreatePurificationDataList();
	}),
	(ComposeController.Xyi = (e) => {
		if (1 === CommonManager_1.CommonManager.GetCurrentSystem())
			switch (e) {
				case 0:
					ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 1;
					break;
				case 1:
					ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 2;
					break;
				case 2:
					ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 3;
			}
	}),
	(ComposeController.$yi = (e, o) => {
		var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
		(t.ShowTypes.includes(35) || t.ShowTypes.includes(37)) &&
			((t =
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(
					e,
				)),
			(e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.Name)),
			ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
				"ComposeStudy",
				e,
			),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFormula));
	}),
	(ComposeController.Qyi = () => {
		ModelManager_1.ModelManager.ComposeModel.UpdateHelpRoleItemDataList();
	}),
	(ComposeController.eIi = !1);
