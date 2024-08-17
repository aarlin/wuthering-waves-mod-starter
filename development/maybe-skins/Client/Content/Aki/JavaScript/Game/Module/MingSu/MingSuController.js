"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MingSuController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
	MingSuDefine_1 = require("./MingSuDefine"),
	MingSuModel_1 = require("./MingSuModel");
class MingSuController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("MingSuTi", 8, "MingSuControllerInit!!!"),
			!0
		);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished,
			this.LBi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished,
				this.Vwn,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished,
			this.LBi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished,
				this.Vwn,
			);
	}
	static OpenView(e, o) {
		var n,
			r =
				ConfigManager_1.ConfigManager.CollectItemConfig.GetDragonPoolConfigById(
					e,
				);
		return (
			!!r &&
			((n = ModelManager_1.ModelManager.MingSuModel).SetCurrentDragonPoolId(e),
			n.SetCollectItemConfigId(r.CoreId),
			MingSuController.SendOpenDragonPoolRequest(e, () => {
				switch (e) {
					case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
						UiManager_1.UiManager.OpenView("MingSuView", void 0, o);
						break;
					case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
						UiManager_1.UiManager.OpenView("CollectItemView", void 0, o);
				}
			}),
			!0)
		);
	}
	static SendOpenDragonPoolRequest(e, o) {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("MingSuTi", 8, "打开龙池!!!");
		var n = new Protocol_1.Aki.Protocol._os();
		(n.z6n = e),
			Net_1.Net.Call(22706, Protocol_1.Aki.Protocol._os.create(n), (e) => {
				var n, r;
				e &&
					(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ((n = e.z6n),
							(r = e.Tfs),
							ModelManager_1.ModelManager.MingSuModel.RefreshDragonPoolDropItems(
								n,
								r,
							),
							o && o())
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								6272,
							));
			});
	}
	static SendHandInMingSuRequest(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("MingSuTi", 8, "HandInMingSuRequest", ["dragonPoolId", e]);
		var o = new Protocol_1.Aki.Protocol.sos();
		(o.z6n = e),
			(o.N4n =
				ModelManager_1.ModelManager.MingSuModel.CurrentInteractCreatureDataLongId),
			Net_1.Net.Call(25090, Protocol_1.Aki.Protocol.sos.create(o), (o) => {
				var n, r, t;
				o &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"MingSuTi",
							8,
							"[CollectionItemDisplay]HandInMingSuResponse",
							["dragonPoolId", e],
							["提交数量", o.yfs],
							["提交后的等级", o.r3n],
							["提交后的状态", o.Efs],
						),
					o.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ((t =
								ModelManager_1.ModelManager.MingSuModel.GetDragonPoolInstanceById(
									o.z6n,
								)) &&
								((n = o.r3n),
								(r = t.GetDragonPoolLevel()),
								(t = t.GetDragonPoolMaxLevel()),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"MingSuTi",
										8,
										"[CollectionItemDisplay]广播等级提升事件",
										["dragonPoolId", e],
										["currentLevel", r],
										["newLevel", n],
										["maxLevel", t],
									),
								t <= n
									? (Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"MingSuTi",
												8,
												"[CollectionItemDisplay]当提交物品等级升至满级时",
												["dragonPoolId", e],
											),
										EventSystem_1.EventSystem.Emit(
											EventDefine_1.EEventName.OnSubmitItemLevelMax,
										))
									: r < n
										? (Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"MingSuTi",
													8,
													"[CollectionItemDisplay]当提交物品等级提升时",
													["dragonPoolId", e],
												),
											EventSystem_1.EventSystem.Emit(
												EventDefine_1.EEventName.OnSubmitItemLevelUp,
											))
										: (Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"MingSuTi",
													8,
													"[CollectionItemDisplay]当提交物品成功时",
													["dragonPoolId", e],
												),
											EventSystem_1.EventSystem.Emit(
												EventDefine_1.EEventName.OnSubmitItemSuccess,
											))),
							ModelManager_1.ModelManager.MingSuModel.DoUpdateDragonPoolInfoMap(
								o,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.UpdateDragonPoolView,
							))
						: (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.lkn,
								29217,
							),
							ItemRewardController_1.ItemRewardController.Close()));
			});
	}
}
((exports.MingSuController = MingSuController).Model =
	MingSuModel_1.MingSuModel),
	(MingSuController.LBi = () => {
		switch (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"MingSuTi",
					8,
					"[CollectionItemDisplay]当提交物品等级提升时,开始打开结算界面",
					[
						"CurrentDragonPoolId",
						ModelManager_1.ModelManager.MingSuModel.GetCurrentDragonPoolId(),
					],
				),
			ModelManager_1.ModelManager.MingSuModel.GetCurrentDragonPoolId())
		) {
			case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
				ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
					2006,
					!0,
				);
				break;
			case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
				ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
					2007,
					!0,
				);
		}
	}),
	(MingSuController.Vwn = () => {
		switch (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"MingSuTi",
					8,
					"[CollectionItemDisplay]当提交物品等级升至满级时,开始打开结算界面",
					[
						"CurrentDragonPoolId",
						ModelManager_1.ModelManager.MingSuModel.GetCurrentDragonPoolId(),
					],
				),
			ModelManager_1.ModelManager.MingSuModel.GetCurrentDragonPoolId())
		) {
			case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
				ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
					2006,
					!0,
				);
				break;
			case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
				ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(
					2007,
					!0,
				);
		}
	});
