"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiTimeDilation_1 = require("../../Ui/Base/UiTimeDilation"),
	UiManager_1 = require("../../Ui/UiManager"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
	RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData"),
	CookDefine_1 = require("./CookDefine");
class CookController extends UiControllerBase_1.UiControllerBase {
	static get CookCoinId() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig("CookCost") ?? -1
		);
	}
	static OnClear() {
		return this.ClearCookDisplay(), !0;
	}
	static OnLeaveLevel() {
		return this.ClearCookDisplay(), !0;
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ActiveRole,
			CookController.wbt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnItemUse,
				CookController.Bbt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				CookController.bbt,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ActiveRole,
			CookController.wbt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnItemUse,
				CookController.Bbt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				CookController.bbt,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(20008, (e) => {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Cook", 50, "10264_服务端主动推送厨师数据"),
				ModelManager_1.ModelManager.CookModel.UpdateCookerInfo(e.ZTs),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.UpdateCookerInfo,
				);
		}),
			Net_1.Net.Register(2822, (e) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Cook", 50, "10265_服务端主动推送配方更新"),
					ModelManager_1.ModelManager.CookModel.UpdateCookingDataList(e.eLs),
					ModelManager_1.ModelManager.CookModel.UpdateMachiningDataList(
						e.tLs,
						!0,
					);
			});
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(20008), Net_1.Net.UnRegister(2822);
	}
	static CheckCanShowExpItem() {
		return 0 !== ModelManager_1.ModelManager.CookModel.GetCookerInfo().AddExp;
	}
	static qbt(e) {
		ModelManager_1.ModelManager.CookModel.CreateCookerInfo(e.ZTs),
			ModelManager_1.ModelManager.CookModel.CreateCookingDataList(e.eLs),
			ModelManager_1.ModelManager.CookModel.UpdateCookingDataByServerConfig(
				e.iLs,
			),
			ModelManager_1.ModelManager.CookModel.UpdateMachiningDataList(e.tLs, !1),
			ModelManager_1.ModelManager.CookModel.SaveLimitRefreshTime(e.rLs);
	}
	static async SendCookingDataRequestAsync() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Cook",
				50,
				"10260_客户端请求烹饪系统相关数据(异步刷新用)",
			);
		var e = new Protocol_1.Aki.Protocol.TXn();
		return (e = await Net_1.Net.CallAsync(6079, e)).Kms ===
			Protocol_1.Aki.Protocol.lkn.Sys
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Cook",
						50,
						"10260_返回请求烹饪系统相关数据(异步刷新用)",
					),
				CookController.qbt(e),
				!0)
			: (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.Kms,
					13649,
					void 0,
					!0,
					!1,
				),
				UiManager_1.UiManager.IsViewShow("CookRootView") &&
					UiManager_1.UiManager.CloseView("CookRootView"),
				!1);
	}
	static SendCookFormulaRequest(e) {
		var o = new Protocol_1.Aki.Protocol.CXn();
		(o.G4n = e),
			Net_1.Net.Call(11955, Protocol_1.Aki.Protocol.CXn.create(o), (o) => {
				var t;
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Cook", 50, "10252_食物配方解锁请求返回"),
					o.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? (ModelManager_1.ModelManager.CookModel.UnlockCookMenuData(o.G4n),
							(t =
								ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(e)),
							(t = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
								t.Name,
							)),
							ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"CookStudy",
								t,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.UpdateFormula,
							))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.Kms,
								8662,
							);
			});
	}
	static SendCookFoodRequest(e, o, t) {
		var n = new Protocol_1.Aki.Protocol.fXn();
		(n.Ekn = e),
			(n.l3n = o),
			(n.O4n = t),
			(n.N4n =
				ModelManager_1.ModelManager.CookModel.CurrentInteractCreatureDataLongId),
			Net_1.Net.Call(22732, Protocol_1.Aki.Protocol.fXn.create(n), (e) => {
				var o;
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Cook", 50, "10254_食物烹饪请求返回"),
					e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? ((o = ModelManager_1.ModelManager.CookModel.GetCookingDataById(
								e.Ekn,
							)) && (o.LastRoleId = e.l3n),
							(o = e.QTs),
							0 !== e.YTs.length && o.push(...e.YTs),
							ModelManager_1.ModelManager.CookModel.UpdateCookItemList(o),
							CookController.Gbt(e),
							CookController.PlayCookSuccessDisplay(() => {
								ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
									2001,
									!0,
								);
							}),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.CookSuccess,
							))
						: (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.Kms,
								15657,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.CookFail,
							));
			});
	}
	static Gbt(e) {
		var o = ModelManager_1.ModelManager.CookModel,
			t = (a = o.GetCookerInfo()).CookingLevel,
			n = o.GetCookerMaxLevel(),
			r = o.GetCookLevelByLevel(n),
			a = a.TotalProficiencys,
			i = ((r = r.Completeness), o.LastExp);
		let l;
		i !== a &&
			(i < r || (t < n && a < r)) &&
			(l = [
				(r = {
					FromProgress: i,
					ToProgress: a,
					MaxProgress: o.GetCookLevelByLevel(Math.min(n, t + 1)).Completeness,
				}),
			]),
			(o.LastExp = a);
		var C = [];
		for (const o of e.QTs) {
			var s = new RewardItemData_1.RewardItemData(o.G3n, o.k4n);
			C.push(s);
		}
		for (const o of e.YTs) {
			var g = new RewardItemData_1.RewardItemData(o.G3n, o.k4n);
			C.push(g);
		}
		ItemRewardController_1.ItemRewardController.SetItemList(C),
			ItemRewardController_1.ItemRewardController.SetProgressQueue(l);
	}
	static Nbt(e) {
		var o = new Array();
		for (const t of e) t.m3n && o.push(t);
		return o;
	}
	static SendFoodProcessRequest(e, o, t) {
		var n = new Protocol_1.Aki.Protocol.pXn();
		(n.Ekn = e),
			(n.F4n = CookController.Nbt(o)),
			(n.O4n = t),
			Net_1.Net.Call(11711, Protocol_1.Aki.Protocol.pXn.create(n), (e) => {
				var o, t;
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Cook", 50, "10256_食物加工返回"),
					e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? ((o = ModelManager_1.ModelManager.CookModel.GetMachiningDataById(
								e.Ekn,
							)),
							(t = e.jTs),
							o &&
								((o.IsUnLock = t), 0 !== e.zTs.length) &&
								(o.UnlockList = e.zTs),
							ModelManager_1.ModelManager.CookModel.UpdateCookItemList(e.JTs),
							t
								? CookController.PlayCookSuccessDisplay(() => {
										ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
											2002,
										);
									})
								: CookController.PlayCookFailDisplay(() => {
										ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
											2005,
											!1,
										);
									}),
							e.jTs
								? EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName.MachiningSuccess,
									)
								: EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName.MachiningStudyFail,
									))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.Kms,
								6479,
							);
			});
	}
	static SendCertificateLevelRewardRequest() {
		var e = new Protocol_1.Aki.Protocol.SXn();
		Net_1.Net.Call(19617, Protocol_1.Aki.Protocol.SXn.create(e), (e) => {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Cook", 50, "10258_领取厨师等级奖励返回"),
				e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
					? EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.UpgradeCookerLevel,
						)
					: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.Kms,
							2033,
						);
		});
	}
	static SendFixToolRequest(e, o) {
		var t = new Protocol_1.Aki.Protocol.dXn();
		(t.V4n = e),
			(t.rkn = o),
			Net_1.Net.Call(9116, Protocol_1.Aki.Protocol.dXn.create(t), (o) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Cook", 50, "10250_请求修复厨具返回"),
					o.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Cook", 50, "请求修复厨具成功", ["修复Id", e]),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.FixSuccess,
							))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.Kms,
								3964,
							);
			});
	}
	static SendInteractiveUpdateRequest(e) {
		var o = new Protocol_1.Aki.Protocol.RXn();
		(o.H4n = e),
			Net_1.Net.Call(20676, Protocol_1.Aki.Protocol.RXn.create(o), (e) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Cook", 50, "10262_交互跟新请求"),
					e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
						? Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Cook", 50, "请求交互更新成功", ["交互Id", e.H4n])
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.Kms,
								8052,
							);
			});
	}
	static SetCurrentFixId(e) {
		ModelManager_1.ModelManager.CookModel.CurrentFixId = e;
	}
	static GetCurrentFixId() {
		return ModelManager_1.ModelManager.CookModel.CurrentFixId;
	}
	static SetCurrentEntityId(e) {
		ModelManager_1.ModelManager.CookModel.CurrentEntityId = e;
	}
	static GetCurrentEntityId() {
		return ModelManager_1.ModelManager.CookModel.CurrentEntityId;
	}
	static CheckCanCook(e) {
		return ModelManager_1.ModelManager.CookModel.CheckCanCook(e);
	}
	static CheckCanProcessed(e) {
		for (const t of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
			e,
		).ConsumeItemsId) {
			var o = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				t.ItemId,
			);
			if (t.Count > o) return !1;
		}
		return !0;
	}
	static CheckCanAdd(e, o, t) {
		switch (t) {
			case 0:
				var n = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(o);
				if (n) return CookController.Obt(e, n.ConsumeItems);
				break;
			case 1:
				if (
					(n = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(o))
				)
					return CookController.Obt(e, n.ConsumeItemsId);
		}
		return !1;
	}
	static Obt(e, o) {
		for (const n of o) {
			var t = e * n.Count;
			if (
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					n.ItemId,
				) < t
			)
				return !1;
		}
		return !0;
	}
	static GetMaxCreateCount(e, o) {
		switch (o) {
			case 0:
				var t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(e);
				if (t) return CookController.kbt(t.ConsumeItems);
				break;
			case 1:
				if (
					(t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(e))
				)
					return CookController.kbt(t.ConsumeItemsId);
		}
		return 0;
	}
	static kbt(e) {
		let o =
			CommonParamById_1.configCommonParamById.GetIntConfig("max_cooking_count");
		for (const r of e) {
			var t = r.Count,
				n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
					r.ItemId,
				);
			if (n < t) return 0;
			o = o < (n = MathUtils_1.MathUtils.GetFloatPointFloor(n / t, 0)) ? o : n;
		}
		return o;
	}
	static CheckIsBuff(e, o) {
		return ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
			o,
		).RoleList.includes(e);
	}
	static CheckIsBuffEx(e, o) {
		var t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(o);
		if (!t.RoleList.includes(e))
			for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleIdList())
				if (t.RoleList.includes(e)) return !0;
		return !1;
	}
	static GetCookInfoText(e) {
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
	static CheckCanFix() {
		for (const o of ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
			CookController.GetCurrentFixId(),
		).Items) {
			var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				o[0],
			);
			if (o[1] > e) return !1;
		}
		return !0;
	}
	static GetCookItemSelectedList(e) {
		let o =
			ModelManager_1.ModelManager.InventoryModel.GetCommonItemByShowType(26);
		const t = ModelManager_1.ModelManager.CookModel.GetMachiningDataById(e);
		return o.filter((e, o, n) => !t.UnlockList.includes(e.GetConfigId()));
	}
	static CheckTmpListHasLock() {
		for (const o of ModelManager_1.ModelManager.CookModel.GetTmpMachiningItemList()) {
			if (!o.m3n) return !0;
			var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				o.G3n,
			);
			if (o.k4n > e) return !0;
		}
		return !1;
	}
	static CheckIsUnlock(e, o) {
		return ModelManager_1.ModelManager.CookModel.GetMachiningDataById(
			e,
		).UnlockList.includes(o);
	}
	static CheckCanGetCookerLevel() {
		var e = ModelManager_1.ModelManager.CookModel.GetCookerInfo();
		if (
			e.CookingLevel !==
			ModelManager_1.ModelManager.CookModel.GetCookerMaxLevel()
		) {
			var o = ModelManager_1.ModelManager.CookModel.GetSumExpByLevel(
				e.CookingLevel,
			);
			if (e.TotalProficiencys >= o) return !0;
		}
		return !1;
	}
	static async ShowFixCookView() {
		var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(107),
			o =
				ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
					"UnlockTitle",
				),
			t =
				((o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o)),
				(o =
					(e.SetTitle(o),
					ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
						CookController.GetCurrentFixId(),
					))),
				ConfigManager_1.ConfigManager.CookConfig.GetLocalText(o.Description));
		let n = 0,
			r = "";
		for (const e of o.Items) {
			n = e[1];
			var a = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e[0]);
			r = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(a.Name);
		}
		e.SetTextArgs(n.toString(), r, t);
		o = CookController.CheckCanFix();
		var i = (e.InteractionMap.set(2, o), new Map());
		for (const e of ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
			CookController.GetCurrentFixId(),
		).Items) {
			var l = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				e[0],
			);
			i.set(e[0], l);
		}
		(e.ItemIdMap = i),
			e.FunctionMap.set(2, () => {
				CookController.SendFixToolRequest(
					CookController.GetCurrentFixId(),
					CookController.GetCurrentEntityId(),
				);
			});
		const C = new CustomPromise_1.CustomPromise();
		return (
			(e.FinishOpenFunction = (e) => {
				C.SetResult(e);
			}),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				e,
			),
			C.Promise
		);
	}
	static PlayCookSuccessDisplay(e) {
		this.ClearCookDisplay();
		var o,
			t = this.Fbt();
		t
			? ((o = UiManager_1.UiManager.GetViewByName("CookRootView")) &&
					UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
						ViewId: o.GetViewId(),
						TimeDilation: 1,
						DebugName: "CookRootView",
						Reason: "Cook",
					}),
				(this.IsPlayingSuccessDisplay = !0),
				(this.Vbt = e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnBeginPlayCookSuccessDisplay,
				),
				t.AddTag(2014138653),
				(this.Hbt = TimerSystem_1.TimerSystem.Delay(() => {
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnPlayCookSuccessDisplayFinished,
					);
					var e = UiManager_1.UiManager.GetViewByName("CookRootView");
					e &&
						UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
							ViewId: e.GetViewId(),
							TimeDilation: e.Info.TimeDilation,
							DebugName: "CookRootView",
							Reason: "Cook",
						}),
						(this.IsPlayingSuccessDisplay = !1),
						this.Vbt && this.Vbt();
				}, CookDefine_1.COOK_SEQUENCE_TIME_LENGTH)))
			: e && e();
	}
	static SkipCookSuccessDisplay() {
		this.IsPlayingSuccessDisplay &&
			(this.Vbt && this.Vbt(), (this.Vbt = void 0));
	}
	static PlayCookFailDisplay(e) {
		this.ClearCookDisplay();
		var o,
			t = this.Fbt();
		t &&
			((o = UiManager_1.UiManager.GetViewByName("CookRootView")) &&
				UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
					ViewId: o.GetViewId(),
					TimeDilation: 1,
					DebugName: "CookRootView",
					Reason: "Cook",
				}),
			(this.IsPlayingFailDisplay = !0),
			(this.jbt = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnBeginPlayCookFailDisplay,
			),
			t.AddTag(-269686894),
			(this.Hbt = TimerSystem_1.TimerSystem.Delay(() => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnPlayCookFailDisplayFinished,
				);
				var e = UiManager_1.UiManager.GetViewByName("CookRootView");
				e &&
					UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
						ViewId: e.GetViewId(),
						TimeDilation: e.Info.TimeDilation,
						DebugName: "CookRootView",
						Reason: "Cook",
					}),
					(this.IsPlayingFailDisplay = !1),
					this.jbt && this.jbt();
			}, CookDefine_1.COOK_SEQUENCE_TIME_LENGTH)));
	}
	static SkipCookFailDisplay() {
		this.IsPlayingFailDisplay && (this.jbt && this.jbt(), (this.jbt = void 0));
	}
	static ClearCookDisplay() {
		var e = this.Fbt();
		e && (e.RemoveTag(2014138653), e.RemoveTag(-269686894)),
			this.Hbt &&
				TimerSystem_1.TimerSystem.Has(this.Hbt) &&
				(TimerSystem_1.TimerSystem.Remove(this.Hbt), (this.Hbt = void 0)),
			(this.IsPlayingSuccessDisplay = !1),
			(this.IsPlayingFailDisplay = !1),
			(this.Vbt = void 0),
			(this.jbt = void 0);
	}
	static Fbt() {
		var e =
			ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
		if (e && (e = EntitySystem_1.EntitySystem.Get(e)))
			return e.GetComponent(177);
	}
}
((exports.CookController = CookController).Hbt = void 0),
	(CookController.IsPlayingSuccessDisplay = !1),
	(CookController.IsPlayingFailDisplay = !1),
	(CookController.Vbt = void 0),
	(CookController.jbt = void 0),
	(CookController.wbt = () => {
		ModelManager_1.ModelManager.CookModel.UpdateCookRoleItemDataList();
	}),
	(CookController.Bbt = (e, o) => {
		ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e).ShowTypes.includes(
			24,
		) &&
			((e =
				ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaByFormulaItemId(
					e,
				)),
			(e = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(e.Name)),
			ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
				"CookStudy",
				e,
			),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFormula));
	}),
	(CookController.bbt = () => {
		ModelManager_1.ModelManager.CookModel.CreateMachiningDataList();
	});
