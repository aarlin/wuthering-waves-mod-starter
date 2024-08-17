"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemExchangeController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	LoginDefine_1 = require("../Login/Data/LoginDefine"),
	CommonExchangeData_1 = require("./View/CommonExchangeData");
class ItemExchangeController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			this.ICi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CrossDay,
				this.TCi,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			this.ICi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CrossDay,
				this.TCi,
			);
	}
	static get NeedPop() {
		return this.LCi;
	}
	static OpenExchangeViewByItemId(e, n = void 0, t = !1) {
		var o = new CommonExchangeData_1.CommonExchangeData();
		o.InitByItemId(e),
			(o.ConfirmNoClose = t),
			(o.ConfirmCallBack = n),
			o.ConfirmCallBack ||
				(o.ConfirmCallBack = ItemExchangeController.ItemExchangeRequest),
			ItemExchangeController.OpenExchangeViewByData(o);
	}
	static OpenExchangeViewByData(e) {
		UiManager_1.UiManager.OpenView("CommonExchangeView", e);
	}
}
(exports.ItemExchangeController = ItemExchangeController),
	((_a = ItemExchangeController).TCi = () => {
		var e = ModelManager_1.ModelManager.LoginModel.GetLoginStatus();
		e < LoginDefine_1.ELoginStatus.EnterGameRet
			? Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"ItemExchange",
					9,
					"登录状态错误, 无法请求物品兑换数据",
					["loginStatus", e],
				)
			: ItemExchangeController.ICi();
	}),
	(ItemExchangeController.ICi = () => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("ItemExchange", 9, "请求物品兑换数据");
		var e = Protocol_1.Aki.Protocol.Ots.create();
		Net_1.Net.Call(16460, e, (e) => {
			ModelManager_1.ModelManager.ItemExchangeModel.InitItemExchangeTimeInfo(
				e.zDs,
			);
		});
	}),
	(ItemExchangeController.LCi = !0),
	(ItemExchangeController.ItemExchangeRequest = (e, n, t = !0, o = void 0) => {
		0 !== n &&
			((_a.LCi = t),
			((t = Protocol_1.Aki.Protocol.Nts.create()).G3n = e),
			(t.i6n = n),
			Net_1.Net.Call(14071, t, (t) => {
				(_a.LCi = !0),
					t &&
						(t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
							? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									t.lkn,
									29039,
								)
							: (ModelManager_1.ModelManager.ItemExchangeModel.AddExchangeTime(
									e,
									n,
								),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.ItemExChangeResponse,
									t.G3n,
									t.g5n,
								),
								o && o(t.G3n, t.g5n)));
			}));
	});
