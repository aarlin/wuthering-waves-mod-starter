"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	GiftType_1 = require("../../../Core/Define/Config/SubType/GiftType"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	PayItemController_1 = require("../PayItem/PayItemController"),
	PayShopViewData_1 = require("./PayShopData/PayShopViewData"),
	PayShopDefine_1 = require("./PayShopDefine"),
	ExchangePopData_1 = require("./PopView/Exchange/ExchangePopData");
class PayShopController extends UiControllerBase_1.UiControllerBase {
	static OnRegisterNetEvent() {
		Net_1.Net.Register(19949, PayShopController.d2i),
			Net_1.Net.Register(18469, PayShopController.C2i),
			Net_1.Net.Register(28135, PayShopController.g2i),
			Net_1.Net.Register(21342, PayShopController.f2i);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(19949),
			Net_1.Net.UnRegister(18469),
			Net_1.Net.UnRegister(28135),
			Net_1.Net.UnRegister(21342);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.gKe,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WorldDone,
			this.nye,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.gKe,
			);
	}
	static async SendRequestPayShopInfo(e = !0) {
		var o, t;
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Shop", 28, "PayShop:ShopItem 请求商品信息"),
			(t =
				(((t = Protocol_1.Aki.Protocol.Zos.create()).o8n =
					ModelManager_1.ModelManager.PayShopModel.Version),
				await Net_1.Net.CallAsync(16248, t))).lkn ===
			Protocol_1.Aki.Protocol.lkn.Sys
				? (ModelManager_1.ModelManager.PayShopModel.Version !== t.o8n &&
						ModelManager_1.ModelManager.PayShopModel.ClearData(),
					(o = t.cRs),
					(ModelManager_1.ModelManager.PayShopModel.Version = t.o8n),
					ModelManager_1.ModelManager.PayShopModel.SetPayShopInfoList(o),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Shop",
							28,
							"PayShop:ShopItem 请求商品信息结束",
							["version", t.o8n],
							["info", o],
						),
					ControllerHolder_1.ControllerHolder.PayGiftController.OnShopInfoReceive(
						t?.iUs,
					),
					!0)
				: (e &&
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							t.lkn,
							1124,
						),
					!1)
		);
	}
	static SendRequestPayShopUpdate(e, o) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Shop",
				11,
				"PayShop:Root 请求刷新商城数据",
				["ShopId", e],
				["IsSwitch", o],
			);
		var t = Protocol_1.Aki.Protocol.tns.create();
		(t.Ekn = e),
			Net_1.Net.Call(17541, t, (t) => {
				var n;
				t &&
					(t.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ((n = t.a5n),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Shop",
									11,
									"PayShop:Root 请求刷新商城数据成功",
									["ShopId", e],
									["IsSwitch", o],
								),
							ModelManager_1.ModelManager.PayShopModel.SetPayShopInfo(n, o),
							(n = this.p2i(e)),
							ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
								n,
							))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								t.lkn,
								5433,
							));
			});
	}
	static p2i(e) {
		var o = new Array();
		if (100 === e)
			for (const e of ModelManager_1.ModelManager.PayItemModel.GetDataList()) {
				var t = ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(
					e.PayItemId,
				);
				o.push(t.PayId.toString());
			}
		if (3 === e)
			for (const e of ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataList())
				o.push(e.ProductId);
		return o;
	}
	static SendRequestPayShopItemUpdate(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Shop", 28, "PayShop:ShopItem 请求刷新商品列表", [
				"goodsIdList",
				e,
			]);
		var o = Protocol_1.Aki.Protocol.rns.create();
		(o.n8n = e),
			Net_1.Net.Call(27780, o, (e) => {
				var o;
				e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
					? ((o = e._gs),
						ModelManager_1.ModelManager.PayShopModel.SetPayShopGoodsList(o))
					: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							21744,
						);
			});
	}
	static SendRequestPayShopBuy(e, o = 1) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Shop",
				11,
				"PayShop:ShopItem 请求购买商品",
				["Id", e],
				["Count", o],
			);
		var t =
			ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(
				e,
			).GetGoodsData();
		PayShopController.SendRequestPayShopNormalBuy(e, t.ItemId, t.ItemCount, o);
	}
	static SendRequestPayShopNormalBuy(e, o, t, n) {
		var a = Protocol_1.Aki.Protocol.nns.create();
		(a.Ekn = e),
			(a.I5n = n),
			(a.o8n = ModelManager_1.ModelManager.PayShopModel.Version),
			Net_1.Net.Call(27482, a, (o) => {
				var t;
				o.lkn === Protocol_1.Aki.Protocol.lkn.Sys
					? ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
							o.Ekn,
						) &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Shop",
								11,
								"PayShop:ShopItem 购买商品成功",
								["Id", e],
								["Count", n],
							),
						ModelManager_1.ModelManager.PayShopModel.UpdatePayShopGoodsCount(
							o.Ekn,
							o.I5n,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.PayShopGoodsBuy,
						))
					: o.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrPayShopDataChanged
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Shop",
									11,
									"PayShop:ShopItem 商品数据不同步,通知versioncode变化",
									["Id", e],
									["Count", n],
								),
							(t =
								ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
									e,
								)),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.RefreshPayShop,
								t.ShopId,
								!1,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.ShopVersionCodeChange,
							))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.lkn,
								15214,
							);
			});
	}
	static OpenGiftDetailsView(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Shop", 11, "PayShop:ShopItem 打开礼包界面");
		var o = new ExchangePopData_1.ExchangePopData();
		(o.PayShopGoods = e),
			(o.ShopItemResource = "UiItem_ShopItem"),
			UiManager_1.UiManager.OpenView("GiftPackageDetailsView", o);
	}
	static OpenExchangePopView(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Shop", 11, "PayShop:ShopItem 打开兑换界面");
		var o = new ExchangePopData_1.ExchangePopData();
		e = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(e);
		(o.PayShopGoods = e),
			(o.ShopItemResource = "UiItem_ShopItem"),
			UiManager_1.UiManager.OpenView("ExchangePopView", o);
	}
	static OpenBuyViewByGoodsId(e) {
		var o = e.GetGoodsData().Id;
		if (e.CheckIfMonthCardItem()) this.OpenGiftDetailsView(e);
		else {
			if (11 === e.GetGoodsData().GetRewardItemType()) {
				var t = e.GetGoodsData().GetGiftId();
				if (
					t &&
					ConfigManager_1.ConfigManager.GiftPackageConfig?.GetGiftPackageConfig(
						t,
					)?.Type === GiftType_1.GiftType.Fixed
				)
					return void this.OpenGiftDetailsView(e);
			}
			this.OpenExchangePopView(o);
		}
	}
	static OpenPayShopView(e = void 0, o = void 0) {
		ModelManager_1.ModelManager.FunctionModel.IsOpen(10010)
			? PayShopController.SendRequestPayShopInfo().then(() => {
					UiManager_1.UiManager.OpenView("PayShopRootView", e, o);
				})
			: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"FunctionDisable",
				);
	}
	static OpenPayShopViewWithTab(e, o) {
		var t;
		ModelManager_1.ModelManager.FunctionModel.IsOpen(10010)
			? UiManager_1.UiManager.IsViewOpen("PayShopRootView")
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.SwitchPayShopTabItem,
						e,
						o,
					)
				: (((t = new PayShopViewData_1.PayShopViewData()).PayShopId = e),
					(t.SwitchId = o),
					this.OpenPayShopView(t))
			: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"FunctionDisable",
				);
	}
	static OpenPayShopViewToRecharge() {
		var e;
		if (
			PayItemController_1.PayItemController.CurrentBlockBetaState &&
			FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()
		)
			return (
				(e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
				void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					e,
				)
			);
		UiManager_1.UiManager.IsViewShow("PayShopRootView")
			? EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.SwitchPayShopTabItem,
					100,
					1,
				)
			: (((e = new PayShopViewData_1.PayShopViewData()).PayShopId = 100),
				PayShopController.OpenPayShopView(e));
	}
	static ClosePayShopGoodDetailPopView() {
		for (const e of ["ExchangePopView", "GiftPackageDetailsView"])
			UiManager_1.UiManager.IsViewOpen(e) && UiManager_1.UiManager.CloseView(e);
	}
}
((exports.PayShopController = PayShopController).d2i = (e) => {
	Log_1.Log.CheckInfo() &&
		Log_1.Log.Info(
			"Shop",
			28,
			"PayShop:ShopItem NotifyPayShopInfo 接收到商品信息更新",
			["version", e.o8n],
			["payShopInfoList", e.cRs],
		);
	var o = e.cRs;
	(ModelManager_1.ModelManager.PayShopModel.Version = e.o8n),
		ModelManager_1.ModelManager.PayShopModel.SetPayShopInfoList(o),
		ControllerHolder_1.ControllerHolder.PayGiftController.OnShopInfoNotify(e);
}),
	(PayShopController.C2i = (e) => {
		(e = e.rUs), ModelManager_1.ModelManager.PayShopModel.UnLockPayShopGoods(e);
	}),
	(PayShopController.f2i = (e) => {
		(e = e._gs),
			ModelManager_1.ModelManager.PayShopModel.SetPayShopGoodsList(e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Shop",
					28,
					"PayShop:ShopItem NotifyPayShopConditionFinish 接收到商品信息更新",
				);
	}),
	(PayShopController.g2i = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Shop",
				28,
				"PayShop:ShopItem NotifyPayShopDirectBuy 接收到直购结构",
				["id", e.oUs],
				["count", e.g5n],
			),
			KuroSdkReport_1.KuroSdkReport.OnPayShopDirectBuy(e.oUs),
			void 0 !== e.oUs &&
				0 !== e.oUs &&
				ModelManager_1.ModelManager.PayShopModel.UpdatePayShopGoodsCount(
					e.oUs,
					e.g5n,
				),
			e.oUs !== PayShopDefine_1.MONTH_CARD_SHOP_ID &&
				e.oUs !== PayShopDefine_1.BATTLE_PASS_PRIMARY_ID &&
				e.oUs !== PayShopDefine_1.BATTLE_PASS_HIGH_ID &&
				(e.oUs, PayShopDefine_1.BATTLE_PASS_PRIMARY_TO_HIGH_ID),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PayShopGoodsBuy);
	}),
	(PayShopController.nye = () => {
		ModelManager_1.ModelManager.FunctionModel.IsOpen(10010) &&
			PayShopController.SendRequestPayShopInfo(!1);
	}),
	(PayShopController.gKe = (e, o) => {
		10010 === e && o && PayShopController.SendRequestPayShopInfo(!1);
	});
