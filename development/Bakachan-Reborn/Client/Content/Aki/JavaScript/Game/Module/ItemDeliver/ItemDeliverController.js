"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemDeliverController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	DeliverData_1 = require("./DeliverData");
class ItemDeliverController extends UiControllerBase_1.UiControllerBase {
	static HandInItemRequest(e, r, t) {
		var o, n;
		6 !== e.Type
			? t && t(!1)
			: ((o =
					ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
						e.TreeIncId,
					)),
				((n = Protocol_1.Aki.Protocol.oKn.create()).T5n = o),
				(n.L5n = MathUtils_1.MathUtils.BigIntToLong(e.TreeIncId)),
				(n.Jkn = e.NodeId),
				(n.z5n = r),
				Net_1.Net.Call(16265, n, (e) => {
					e
						? e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys
							? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									e.uvs,
									26150,
								),
								t && t(!1))
							: t && t(!0)
						: t && t(!1);
				}));
	}
	static ItemUseRequest(e, r, t, o) {
		if (1 !== e.Type) o && o(!1);
		else {
			const e = Protocol_1.Aki.Protocol.ats.create();
			(e.I5n = 1),
				(e.G3n = r),
				(e.I5n = t),
				Net_1.Net.Call(6884, e, (r) => {
					r
						? r.X5n !== Protocol_1.Aki.Protocol.lkn.Sys
							? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									r.X5n,
									25612,
								),
								o && o(!1))
							: (o && o(!0),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OnDeliveryProps,
									e.G3n,
								))
						: o && o(!1);
				});
		}
	}
	static async OpenItemDeliverView(e) {
		return (
			!!UiManager_1.UiManager.IsViewOpen("ItemDeliverView") ||
			(ModelManager_1.ModelManager.ItemDeliverModel.SetItemDeliverData(e),
			void 0 !==
				(await UiManager_1.UiManager.OpenViewAsync("ItemDeliverView", e)))
		);
	}
	static async OpenItemDeliverViewByHandInItem(e, r, t, o, n) {
		if (!e || e.length <= 0) return !1;
		if (UiManager_1.UiManager.IsViewOpen("ItemDeliverView")) return !1;
		var a = ModelManager_1.ModelManager.InventoryModel,
			i = new DeliverData_1.DeliverData(r, t, o, n);
		for (const r of e) {
			var l = r.HandInType;
			if ("ItemIds" === l) {
				var I,
					s = r.ItemIds,
					d = r.Count,
					v = i.AddSlotData(s, d, l);
				1 === s.length &&
					((s = s[0]),
					(I = a.GetItemCountByConfigId(s)),
					v?.SetItem(s, Math.min(d, I)));
			} else if ("ItemType" === l) {
				v = r.ItemIds;
				var M = [],
					g = ConfigManager_1.ConfigManager.ItemConfig;
				for (const e of v)
					for (const r of g.GetConfigListByItemType(e)) {
						var m = r.Id;
						M.push(m);
					}
				i.AddSlotData(M, r.Count, l);
			}
		}
		return ItemDeliverController.OpenItemDeliverView(i);
	}
	static OpenItemDeliverViewByHandInGroup(e, r, t, o, n) {
		if (e && !UiManager_1.UiManager.IsViewOpen("ItemDeliverView")) {
			var a = ModelManager_1.ModelManager.InventoryModel,
				i = new DeliverData_1.DeliverData(r, t, o, n),
				l = e.HandInType,
				I = e.ItemIds,
				s = e.Count;
			for (let r = 0; r < e.Slot; r++)
				if ("ItemIds" === l) {
					var d,
						v,
						M = i.AddSlotData(I, s, l);
					1 === I.length &&
						((d = I[0]),
						(v = a.GetItemCountByConfigId(d)),
						M?.SetItem(d, Math.min(s, v)));
				} else if ("ItemType" === l) {
					var g = [],
						m = ConfigManager_1.ConfigManager.ItemConfig;
					for (const e of I)
						for (const r of m.GetConfigListByItemType(e)) {
							var C = r.Id;
							g.push(C);
						}
					i.AddSlotData(g, s, l);
				}
			ItemDeliverController.OpenItemDeliverView(i);
		}
	}
}
exports.ItemDeliverController = ItemDeliverController;
