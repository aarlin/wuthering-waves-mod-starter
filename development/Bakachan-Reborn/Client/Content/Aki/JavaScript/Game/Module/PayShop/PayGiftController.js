"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayGiftController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	PayItemController_1 = require("../PayItem/PayItemController"),
	PayShopDefine_1 = require("./PayShopDefine");
class PayGiftController extends UiControllerBase_1.UiControllerBase {
	static OnRegisterNetEvent() {
		Net_1.Net.Register(5162, PayGiftController.h2i);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(5162);
	}
	static OnShopInfoNotify(e) {
		(ModelManager_1.ModelManager.PayGiftModel.Version = e.iUs.o8n),
			ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.iUs.tUs);
	}
	static OnShopInfoReceive(e) {
		e &&
			((ModelManager_1.ModelManager.PayGiftModel.Version = e.o8n),
			ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.tUs));
	}
	static async SendPayGiftInfoRequestAsync() {
		if (
			(e =
				(((e = Protocol_1.Aki.Protocol.Kos.create()).o8n =
					ModelManager_1.ModelManager.PayGiftModel.Version),
				await Net_1.Net.CallAsync(12156, e))) &&
			(e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					17073,
				),
			e.o8n) &&
			e.cRs
		) {
			(ModelManager_1.ModelManager.PayGiftModel.Version = e.o8n),
				ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.cRs);
			var e = ModelManager_1.ModelManager.PayGiftModel.GetDataList(),
				o = new Array();
			for (const r of e) o.push(r.ProductId);
			ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
				o,
			);
		}
	}
	static SendPayGiftInfoRequest() {
		var e = Protocol_1.Aki.Protocol.Kos.create();
		(e.o8n = ModelManager_1.ModelManager.PayGiftModel.Version),
			Net_1.Net.Call(12156, e, (e) => {
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
					(ModelManager_1.ModelManager.PayGiftModel.Version = e.o8n),
						ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.cRs);
					e = ModelManager_1.ModelManager.PayGiftModel.GetDataList();
					var o = new Array();
					for (const r of e) o.push(r.ProductId);
					ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
						o,
					);
				}
			});
	}
	static SendPayGiftRequest(e) {
		var o;
		if (
			PayItemController_1.PayItemController.CurrentBlockBetaState &&
			ConfigManager_1.ConfigManager.CommonConfig?.GetBetaBlockRecharge()
		)
			return (
				(o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
				void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					o,
				)
			);
		FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check() &&
		e === PayShopDefine_1.MONTH_CARD_SHOP_ID
			? ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					o,
				))
			: (PayItemController_1.PayItemController.CurrentBlockIosPayState &&
					1 === ModelManager_1.ModelManager.PlatformModel.PlatformType &&
					((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(134)),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						o,
					)),
				((o = Protocol_1.Aki.Protocol.Xos.create()).Ekn = e),
				(o.o8n = ModelManager_1.ModelManager.PayGiftModel.Version),
				Net_1.Net.Call(4104, o, (o) => {
					var r,
						t,
						n = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(e);
					o.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ((r = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(
								n.GetGoodsData().ItemId,
							)),
							(t = ConfigManager_1.ConfigManager.ItemConfig.GetItemDesc(
								n.GetGoodsData().ItemId,
							)),
							ControllerHolder_1.ControllerHolder.KuroSdkController.SdkPay(
								n.GetGetPayGiftData().PayId,
								o.$Ps,
								r,
								t,
								o.HPs,
							))
						: o.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrPayShopDataChanged
							? this.SendPayGiftInfoRequest()
							: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									o.lkn,
									14867,
								);
				}));
	}
}
(exports.PayGiftController = PayGiftController).h2i = (e) => {
	ControllerHolder_1.ControllerHolder.KuroSdkController.CancelCurrentWaitPayItemTimer();
	var o = { PayItemId: e.Ekn, OrderId: e.$Ps, ItemId: e.G3n, ItemCount: e.g5n };
	ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(e.jPs.Ekn).Phrase(
		e.jPs,
	),
		KuroSdkReport_1.KuroSdkReport.OnPayShopDirectBuy(e.Ekn),
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnPayItemSuccess,
			o,
		);
};
