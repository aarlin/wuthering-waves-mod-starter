"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PowerController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	ShopController_1 = require("../Shop/ShopController"),
	PowerDefines_1 = require("./PowerDefines");
class PowerController extends UiControllerBase_1.UiControllerBase {
	static OnRegisterNetEvent() {
		Net_1.Net.Register(3944, (e) => {
			ModelManager_1.ModelManager.PowerModel.RefreshPowerInfos(
				e.aLs?.sLs ?? 0,
				e.aLs?.nLs ?? 0,
			);
		});
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(3944);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ShopUpdate,
			this.uio,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PowerShopReady,
				this.Pmi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnShopInfoResponded,
				this.cio,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BackLoginView,
				this.mio,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				this.SendUpdatePowerRequest,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ShopUpdate,
			this.uio,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PowerShopReady,
				this.Pmi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnShopInfoResponded,
				this.cio,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BackLoginView,
				this.mio,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				this.SendUpdatePowerRequest,
			);
	}
	static OpenPowerView(e = 2, o = 0) {
		ModelManager_1.ModelManager.PowerModel.ResetPowerShopCount(),
			ModelManager_1.ModelManager.PowerModel.CreateConfirmBoxData(e, o),
			ModelManager_1.ModelManager.FunctionModel.IsOpen(10017) &&
				!UiManager_1.UiManager.IsViewOpen("PowerView") &&
				this.dio();
	}
	static RequestPowerViewData() {
		ModelManager_1.ModelManager.PowerModel.ResetPowerShopCount(),
			ModelManager_1.ModelManager.FunctionModel.IsOpen(10017)
				? this.dio()
				: ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
						"Function_notopen_tili",
					);
	}
	static ExchangePower(e, o) {
		ShopController_1.ShopController.SendShopBuyRequest(
			e.ShopId,
			e.GoodsId,
			e.ItemId,
			o,
		);
	}
	static dio() {
		ShopController_1.ShopController.SendShopInfoRequest(
			ModelManager_1.ModelManager.ShopModel.VersionId,
		);
	}
	static OnTick(e) {
		ModelManager_1.ModelManager.PowerModel.UpdatePowerRenewTimer();
	}
}
((exports.PowerController = PowerController).IsTickEvenPausedInternal = !0),
	(PowerController.mio = () => {
		UiManager_1.UiManager.IsViewShow("PowerView") &&
			UiManager_1.UiManager.CloseView("PowerView");
	}),
	(PowerController.cio = () => {
		var e = ConfigManager_1.ConfigManager.PowerConfig.GetPowerShopIds().size;
		if (!(ModelManager_1.ModelManager.PowerModel.PowerShopCount >= e))
			for (const e of ConfigManager_1.ConfigManager.PowerConfig.GetPowerShopIds())
				ShopController_1.ShopController.SendShopUpdateRequest(e);
	}),
	(PowerController.uio = (e) => {
		ModelManager_1.ModelManager.PowerModel.AddOnePowerShopCount(e);
	}),
	(PowerController.Pmi = () => {
		var e;
		UiManager_1.UiManager.IsViewShow("InventoryView") ||
			(ModelManager_1.ModelManager.PowerModel.ConfirmBoxData &&
				((e = new PowerDefines_1.PowerViewData()),
				UiManager_1.UiManager.OpenView("PowerView", e)));
	}),
	(PowerController.SendUpdatePowerRequest = () => {
		var e = Protocol_1.Aki.Protocol.XXn.create();
		Net_1.Net.Call(28678, e, (e) => {
			e &&
				(e.X5n === Protocol_1.Aki.Protocol.lkn.Sys
					? ModelManager_1.ModelManager.PowerModel.RefreshPowerInfos(
							e.hLs?.sLs ?? 0,
							e.hLs?.nLs ?? 0,
						)
					: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.X5n,
							19881,
						));
		});
	});
