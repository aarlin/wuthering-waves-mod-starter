"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InventoryGiftController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	AcquireData_1 = require("../Acquire/AcquireData"),
	ItemDefines_1 = require("../Item/Data/ItemDefines"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder");
class InventoryGiftController extends UiControllerBase_1.UiControllerBase {
	static SendItemGiftUseRequest(e, t, r) {
		var n = Protocol_1.Aki.Protocol._ts.create();
		(n.G3n = e), (n.I5n = t), (n.J5n = r);
		var i = (r =
			ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(
				e,
			)).GetConfig();
		i.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift) ||
			i.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift);
		const o = r.GetCount() - t;
		Net_1.Net.Call(15549, n, (t) => {
			var r;
			t &&
				(t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							t.lkn,
							24190,
						)
					: (UiManager_1.UiManager.IsViewShow("InventoryGiftView") &&
							UiManager_1.UiManager.CloseView("InventoryGiftView"),
						(t = ModelManager_1.ModelManager.InventoryModel.GetAcquireData()) &&
							((r = [{ ItemId: e, IncId: 0 }, o]),
							t.SetRemainItemCount(o),
							t.SetMaxAmount(o),
							t.SetItemData([r]),
							this.ShowAcquireView(t))));
		});
	}
	static ShowAcquireView(e) {
		ModelManager_1.ModelManager.InventoryModel.SetAcquireData(e),
			UiManager_1.UiManager.IsViewShow("AcquireView")
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshAcquireView,
						e,
					)
				: UiManager_1.UiManager.OpenView("AcquireView", e);
	}
	static ShowRewardViewWithCountAndId(e, t) {
		var r = new AcquireData_1.AcquireData(),
			n = (r.SetAcquireViewType(1), []);
		n.push([{ IncId: 0, ItemId: e }, t]),
			r.SetItemData(n),
			InventoryGiftController.ShowAcquireView(r);
	}
	static ShowRewardViewWithList(e) {
		var t = new AcquireData_1.AcquireData();
		t.SetAcquireViewType(1),
			t.SetItemData(e),
			InventoryGiftController.ShowAcquireView(t);
	}
	static CloseAcquireView() {
		UiManager_1.UiManager.IsViewShow("AcquireView") &&
			UiManager_1.UiManager.CloseView("AcquireView");
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(5704, InventoryGiftController.ItemGiftUseNotify);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(5704);
	}
}
(exports.InventoryGiftController = InventoryGiftController).ItemGiftUseNotify =
	(e) => {
		var t = e.Ekn;
		if (
			1 !==
				(t =
					ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(
						t,
					)).ShowType &&
			0 === t.ShowType
		) {
			var r = e.cRs.length,
				n = [];
			for (let t = 0; t < r; t++) {
				var i = (o = e.cRs[t]).Ekn,
					o = o.I5n;
				n.push([{ IncId: 0, ItemId: i }, o]);
			}
			(t = new AcquireData_1.AcquireData()).SetAcquireViewType(1),
				t.SetItemData(n),
				InventoryGiftController.ShowAcquireView(t);
		}
	};
