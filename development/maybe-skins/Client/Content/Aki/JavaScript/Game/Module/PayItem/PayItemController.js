"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayItemController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
class PayItemController extends UiControllerBase_1.UiControllerBase {
	static OnRegisterNetEvent() {
		Net_1.Net.Register(3901, (e) => {
			(e = {
				PayItemId: e.Ekn,
				OrderId: e.$Ps,
				ItemId: e.G3n,
				ItemCount: e.g5n,
			}),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnPayItemSuccess,
					e,
				),
				PayItemController.KNi(),
				ModelManager_1.ModelManager.PayItemModel.CleanPayingItemName();
		}),
			Net_1.Net.Register(15810, PayItemController.QNi);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(15810), Net_1.Net.UnRegister(3901);
	}
	static OnClear() {
		return this.KNi(), !0;
	}
	static SendBuyPayItemRequest(e) {
		if (
			this.CurrentBlockBetaState &&
			FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()
		)
			return (
				(o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
				void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					o,
				)
			);
		if (
			this.CurrentBlockIosPayState &&
			1 === ModelManager_1.ModelManager.PlatformModel.PlatformType
		)
			return (
				(o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(134)),
				void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					o,
				)
			);
		var o = Protocol_1.Aki.Protocol.$os.create();
		(o.Ekn = e),
			(o.o8n = ModelManager_1.ModelManager.PayItemModel.Version),
			ModelManager_1.ModelManager.PayItemModel.UpdatePayingItemName(e),
			Net_1.Net.Call(21780, o, (o) => {
				o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							o.lkn,
							19142,
						)
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Shop",
								11,
								"PayShop:ShopItem 充值请求成功,调用SDK接口",
								["Id", e],
							),
						(o = ModelManager_1.ModelManager.PayItemModel.CreateSdkPayment(
							e,
							o.$Ps,
							o.HPs,
						)),
						ControllerHolder_1.ControllerHolder.KuroSdkController.SdkPay(o));
			});
	}
	static KNi() {
		ControllerHolder_1.ControllerHolder.KuroSdkController.CancelCurrentWaitPayItemTimer();
	}
	static SendPayItemInfoRequest() {
		var e = Protocol_1.Aki.Protocol.Fos.create();
		(e.o8n = ModelManager_1.ModelManager.PayItemModel.Version),
			Net_1.Net.Call(10022, e, (e) => {
				if (
					e &&
					(e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							17073,
						),
					e.o8n) &&
					e.cRs
				) {
					(ModelManager_1.ModelManager.PayItemModel.Version = e.o8n),
						ModelManager_1.ModelManager.PayItemModel.InitDataListByServer(
							e.cRs,
						);
					e = ModelManager_1.ModelManager.PayItemModel.GetDataList();
					var o = new Array();
					for (const t of e) {
						var r = ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(
							t.PayItemId,
						);
						o.push(r.PayId.toString());
					}
					ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProduct(o);
				}
			});
	}
}
((exports.PayItemController = PayItemController).CurrentBlockIosPayState = !1),
	(PayItemController.CurrentBlockBetaState = !0),
	(PayItemController.QNi = (e) => {
		ModelManager_1.ModelManager.PayItemModel.ResetSpecialBonus(e.j4n);
	});
