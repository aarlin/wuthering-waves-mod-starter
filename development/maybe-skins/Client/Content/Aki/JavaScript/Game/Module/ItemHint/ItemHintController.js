"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemHintController = void 0);
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
	ItemHintDefines_1 = require("./Data/ItemHintDefines"),
	ItemHintDefine_1 = require("./ItemHintDefine"),
	showBgTypeToView = {
		0: void 0,
		1: "ItemRewardView",
		2: "ItemRewardView",
		3: "SceneGameplayItemRewardView",
	};
class ItemHintController extends UiControllerBase_1.UiControllerBase {
	static OnRegisterNetEvent() {
		Net_1.Net.Register(12093, this.HandleItemRewardNotify);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(12093);
	}
	static qCi(e) {
		e.length <= 0 ||
			(ItemHintController.GCi() &&
				ModelManager_1.ModelManager.ItemHintModel.MainInterfaceInsertItemRewardInfo(
					e,
				));
	}
	static GCi() {
		var e;
		return (
			!!UiManager_1.UiManager.IsViewOpen("BattleView") ||
			!(
				!(e = UiManager_1.UiManager.GetViewByName("PlotView")) || e.IsRegister
			) ||
			!(
				!(e = UiManager_1.UiManager.GetViewByName("FunctionOpenView")) ||
				e.IsRegister
			)
		);
	}
	static AddItemRewardList(e) {
		ModelManager_1.ModelManager.ItemHintModel.AddItemRewardList(e);
	}
	static CombineAllShowItems(e, t) {
		var n,
			i,
			o = new Array(),
			a = new Map();
		if (e.Y5n) {
			for (const t of e.Y5n)
				t.I5n &&
					((n = ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(
						t.r6n,
					))
						? 0 !== n.ShowBg &&
							(a.has(t.G3n)
								? (a.get(t.G3n).ItemCount += t.I5n)
								: ((n =
										ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
											t.G3n,
										)),
									((i = new ItemHintDefines_1.ItemRewardInfo()).ItemId = t.G3n),
									(i.ItemCount = t.I5n),
									(i.Quality = n.QualityId),
									a.set(i.ItemId, i)))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("ItemHint", 18, "缺少ShowPlan配置", [
								"showPlanId",
								t.r6n,
							]));
			for (const e of a.values()) o.push(e);
			t &&
				o.sort((e, t) => {
					var n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ItemId),
						i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId);
					return n.QualityId !== i.QualityId
						? i.QualityId - n.QualityId
						: e.ItemId - t.ItemId;
				});
		}
		return o;
	}
	static ConvertRewardListToItem(e) {
		var t = [];
		for (const i of e) {
			var n = [{ IncId: 0, ItemId: i.ItemId }, i.ItemCount];
			t.push(n);
		}
		return t;
	}
	static GetFirstShowBgDropGroup(e) {
		if (e.Y5n)
			for (const n of e.Y5n) {
				var t = n.r6n;
				if (
					(t = ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(t))
				) {
					if (0 !== t.ShowBg) return t;
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("ItemHint", 18, "缺少ShowPlan配置", [
							"showPlanId",
							n.r6n,
						]);
			}
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPlayerLevelChanged,
			this.Cke,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlayerExpChanged,
				this.NCi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotNetworkStart,
				this.OCi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotNetworkEnd,
				this.OCi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OpenView,
				this.OCi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.OCi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ActiveBattleView,
				this.OCi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAddWeaponItemList,
				this.wmi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAddPhantomItemList,
				this.bmi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAddFavorItem,
				this.kCi,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPlayerLevelChanged,
			this.Cke,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlayerExpChanged,
				this.NCi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlotNetworkStart,
				this.OCi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlotNetworkEnd,
				this.OCi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OpenView,
				this.OCi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.OCi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ActiveBattleView,
				this.OCi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAddWeaponItemList,
				this.wmi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAddPhantomItemList,
				this.bmi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAddFavorItem,
				this.kCi,
			);
	}
	static AddCommonItemList(e) {
		var t = [],
			n = ModelManager_1.ModelManager.InventoryModel;
		for (const a of e) {
			if (
				(i = a.Ekn) !== ItemHintDefine_1.EXP_ITEM_ID &&
				(i = n.GetCommonItemData(i))
			) {
				var i = i.GetLastCount(),
					o = a.I5n;
				if (!((i = i ? o - i : o) < 0)) {
					let e = 0;
					a instanceof Protocol_1.Aki.Protocol._Ns && (e = a.Q5n),
						(o = { Ekn: a.Ekn, I5n: i, Q5n: e }),
						t.push(o);
				}
			}
		}
		ItemHintController.qCi(t);
	}
	static AddRoguelikeItemList(e, t) {
		(e = { Ekn: e, I5n: t, Q5n: 0 }),
			ModelManager_1.ModelManager.ItemHintModel.MainInterfaceInsertItemRewardInfo(
				[e],
			);
	}
	static OnTick(e) {
		this.CheckItemHint(),
			ModelManager_1.ModelManager.ItemHintModel.Visibility &&
				(ControllerHolder_1.ControllerHolder.ItemController.CheckNewItemTips(),
				this.CheckItemReward());
	}
	static CheckItemReward() {
		if (ModelManager_1.ModelManager.ItemHintModel.IsItemRewardListEmpty)
			this.IsPrintNoRewardReason &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"ItemHint",
					8,
					"[NoRewardReason][CheckItemReward]当前状态不允许显示入包列表:ItemHint的入包列表为空",
				);
		else if (
			UiManager_1.UiManager.IsViewOpen("ItemRewardView") ||
			UiManager_1.UiManager.IsViewOpen("SceneGameplayItemRewardView") ||
			ModelManager_1.ModelManager.SundryModel.IsBlockTips
		)
			this.IsPrintNoRewardReason &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"ItemHint",
					8,
					"[NoRewardReason][CheckItemReward]当前状态不允许显示入包列表:ItemRewardView或SceneGameplayItemRewardView界面在打开中，或者已经屏蔽弹窗",
					[
						"IsItemRewardViewOpen",
						UiManager_1.UiManager.IsViewOpen("ItemRewardView"),
					],
					[
						"IsSceneGameplayItemRewardViewOpen",
						UiManager_1.UiManager.IsViewOpen("SceneGameplayItemRewardView"),
					],
					["IsBlockTips", ModelManager_1.ModelManager.SundryModel.IsBlockTips],
				);
		else {
			var e =
				ModelManager_1.ModelManager.ItemHintModel.PeekItemRewardListFirst();
			if (e.ItemReward?.Y5n) {
				let i;
				for (const o of e.ItemReward.Y5n) {
					var t = o.r6n,
						n = ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(t);
					if (n) {
						if (0 !== n.ShowBg && o.I5n && void 0 === i) {
							i = n.ShowBg;
							break;
						}
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("ItemHint", 18, "缺少showPlan配置", [
								"showPlanId",
								t,
							]);
				}
				switch (i) {
					case 0:
						this.IsPrintNoRewardReason &&
							Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"ItemHint",
								8,
								"[NoRewardReason][CheckItemReward]当前状态不允许显示入包列表:没有对应showBg配置",
							);
						break;
					case 1:
					case 2:
					case 3:
						UiManager_1.UiManager.OpenView(showBgTypeToView[i]);
				}
			} else
				ModelManager_1.ModelManager.ItemHintModel.ShiftItemRewardListFirst(),
					this.IsPrintNoRewardReason &&
						Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"ItemHint",
							8,
							"[NoRewardReason][CheckItemReward]当前状态不允许显示入包列表:Proto_ItemList为空",
						);
		}
	}
	static CheckItemHint() {
		ModelManager_1.ModelManager.ItemHintModel.Visibility
			? ModelManager_1.ModelManager.ItemHintModel.IsMainInterfaceDataEmpty &&
				ModelManager_1.ModelManager.ItemHintModel.IsPriorInterfaceDataEmpty
				? this.IsPrintNoRewardReason &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"ItemHint",
						8,
						"[NoRewardReason][CheckItemHint]当前状态不允许显示入包列表:入包列表数据为空",
					)
				: UiManager_1.UiManager.IsViewOpen("ItemHintView")
					? this.IsPrintNoRewardReason &&
						Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"ItemHint",
							8,
							"[NoRewardReason][CheckItemHint]当前状态不允许显示入包列表:ItemHintView在打开中",
						)
					: ModelManager_1.ModelManager.SundryModel.IsBlockTips
						? this.IsPrintNoRewardReason &&
							Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"ItemHint",
								8,
								"[NoRewardReason][CheckItemHint]当前状态不允许显示入包列表:当前已经屏蔽弹窗",
							)
						: UiManager_1.UiManager.OpenView("ItemHintView")
			: this.IsPrintNoRewardReason &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"ItemHint",
					8,
					"[NoRewardReason][CheckItemHint]当前状态不允许显示入包列表:Visibility为false",
				);
	}
}
((exports.ItemHintController = ItemHintController).IsTickEvenPausedInternal =
	!0),
	(ItemHintController.IsPrintNoRewardReason = !1),
	(ItemHintController.HandleItemRewardNotify = (e) => {
		if (e.Y5n) {
			let i;
			if (
				ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e.$Fn).ShowBg
			)
				for (const o of e.Y5n) {
					var t = o.r6n,
						n = ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(t);
					n
						? 0 !== n.ShowBg &&
							o.I5n &&
							(void 0 === i
								? (i = n.ShowBg)
								: i !== n.ShowBg &&
									Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"ItemHint",
										18,
										"一次掉落有多个不同背景的掉落组，请检查配置",
										["dropId", e.$Fn],
									))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("ItemHint", 18, "缺少showPlan配置", [
								"showPlanId",
								t,
							]);
				}
			else i = 0;
			switch (i) {
				case void 0:
				case 0:
					break;
				case 1:
				case 2:
				case 3:
					ItemHintController.AddItemRewardList(e);
			}
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnItemRewardNotify,
				e,
			);
		}
	}),
	(ItemHintController.Cke = (e, t, n, i, o, a, r) => {
		var s = [];
		o = { Ekn: ItemHintDefine_1.EXP_ITEM_ID, I5n: o, Q5n: 0 };
		s.push(o), ItemHintController.qCi(s);
	}),
	(ItemHintController.NCi = (e, t, n) => {
		var i = [];
		e = { Ekn: ItemHintDefine_1.EXP_ITEM_ID, I5n: e - t, Q5n: 0 };
		i.push(e), ItemHintController.qCi(i);
	}),
	(ItemHintController.wmi = (e, t, n) => {
		if (!t && n) {
			var i = [];
			for (const t of e) {
				var o = { Ekn: t.Ekn, I5n: 1, Q5n: 0 };
				i.push(o);
			}
			ItemHintController.qCi(i);
		}
	}),
	(ItemHintController.bmi = (e) => {
		var t = [];
		for (const i of e) {
			var n = { Ekn: i.Ekn, I5n: 1, Q5n: 0 };
			t.push(n);
		}
		ItemHintController.qCi(t);
	}),
	(ItemHintController.kCi = (e) => {
		(e = { Ekn: e[0].ItemId, I5n: e[1], Q5n: 0 }), ItemHintController.qCi([e]);
	}),
	(ItemHintController.OCi = () => {
		var e = ModelManager_1.ModelManager.ItemHintModel.Visibility;
		let t = !1;
		var n = ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot(),
			i = UiManager_1.UiManager.IsViewOpen("LoadingView"),
			o = UiManager_1.UiManager.IsViewOpen("BattleView");
		(t = !(n || !o || i)) !== e &&
			((ModelManager_1.ModelManager.ItemHintModel.Visibility = t),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("ItemHint", 11, "奖励可视化状态改变", ["Visibility", t]),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.ItemHintVisibilityChange,
				t,
			));
	});
