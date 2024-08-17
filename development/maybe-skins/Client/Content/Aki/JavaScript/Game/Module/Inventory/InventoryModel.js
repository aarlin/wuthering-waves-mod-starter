"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InventoryModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ItemDefines_1 = require("../Item/Data/ItemDefines"),
	CommonItemData_1 = require("./ItemData/CommonItemData"),
	PhantomItemData_1 = require("./ItemData/PhantomItemData"),
	WeaponItemData_1 = require("./ItemData/WeaponItemData"),
	ItemMainTypeMapping_1 = require("./ItemMainTypeMapping"),
	CD_TIME_REASON = "限时物品主动添加倒计时 [ConfigId:{0}, UniqueId:{1}]";
class InventoryModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Hui = 0),
			(this.jui = void 0),
			(this.Wui = 0),
			(this.Kui = void 0),
			(this.Qui = void 0),
			(this.Xui = new Map()),
			(this.djt = new Map()),
			(this.$ui = new Map()),
			(this.Yui = new Map()),
			(this.Jui = new Map()),
			(this.Zui = void 0),
			(this.eci = new Set()),
			(this.tci = new Map()),
			(this.IsConfirmDestruction = !1);
	}
	OnInit() {
		return !(
			ConfigManager_1.ConfigManager.InventoryConfig.GetAllMainTypeConfig()
				.length <= 0 || (this.SetSelectedTypeIndex(0), 0)
		);
	}
	OnClear() {
		this.ClearAllItemData();
		for (const e of this.tci.values())
			TimerSystem_1.RealTimeTimerSystem.Remove(e);
		return this.tci.clear(), !0;
	}
	RefreshItemRedDotSet() {
		var e = ModelManager_1.ModelManager.NewFlagModel,
			t = e.GetNewFlagSet(
				LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
			);
		if (
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Inventory",
					8,
					"[InventoryRedDot]当前本地保存的常规道具红点",
					["commonItemRedDotSet", t],
				),
			t)
		) {
			let a = !1;
			for (const o of t)
				this.GetCommonItemCount(o) <= 0 &&
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Inventory",
							8,
							"[InventoryRedDot]消除常规道具红点",
							["configId", o],
						),
					e.RemoveNewFlag(
						LocalStorageDefine_1.ELocalStoragePlayerKey
							.InventoryCommonItemRedDot,
						o,
					),
					(a = !0));
			a && this.SaveRedDotCommonItemConfigIdList();
		}
		if (
			((t = e.GetNewFlagSet(
				LocalStorageDefine_1.ELocalStoragePlayerKey
					.InventoryAttributeItemRedDot,
			)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Inventory",
					8,
					"[InventoryRedDot]当前本地保存的属性道具红点",
					["attributeItemRedDotSet", t],
				),
			t)
		) {
			let o = !1;
			for (const n of t) {
				var a = this.GetAttributeItemData(n);
				a
					? a?.GetCount() <= 0 &&
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Inventory",
								8,
								"[InventoryRedDot]消除属性道具红点",
								["uniqueId", n],
							),
						e.RemoveNewFlag(
							LocalStorageDefine_1.ELocalStoragePlayerKey
								.InventoryAttributeItemRedDot,
							n,
						),
						(o = !0))
					: (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Inventory",
								8,
								"[InventoryRedDot]消除属性道具红点",
								["uniqueId", n],
							),
						e.RemoveNewFlag(
							LocalStorageDefine_1.ELocalStoragePlayerKey
								.InventoryAttributeItemRedDot,
							n,
						),
						(o = !0));
			}
			o && this.SaveRedDotAttributeItemUniqueIdList();
		}
	}
	SetInventoryTabOpenIdList(e) {
		var t = e.indexOf(0);
		-1 < t && e.splice(t, 1), (this.Qui = e);
	}
	GetOpenIdMainTypeConfig() {
		var e = [];
		for (const a of this.Qui) {
			var t =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(a);
			e.push(t);
		}
		return e;
	}
	ici(e) {
		var t = e.GetType();
		let a = this.Yui.get(t);
		a || ((a = new Set()), this.Yui.set(t, a)), a.add(e);
	}
	oci(e) {
		var t = e.GetType();
		(t = this.Yui.get(t)) && t.delete(e);
	}
	rci(e) {
		this.Yui.delete(e);
	}
	nci(e) {
		var t = e.GetMainType();
		let a = this.Jui.get(t);
		a ||
			((a = new ItemMainTypeMapping_1.ItemMainTypeMapping(t)),
			this.Jui.set(t, a)),
			a.Add(e);
	}
	sci(e) {
		var t = e.GetMainType();
		(t = this.Jui.get(t)) && t.Remove(e);
	}
	aci(e) {
		this.Jui.delete(e);
	}
	NewCommonItemData(e, t, a = 0, o) {
		t = new CommonItemData_1.CommonItemData(e, a, t, 0, o);
		let n = this.Xui.get(e);
		(n = n || new Map()).set(a, t),
			this.Xui.set(e, n),
			this.ici(t),
			this.nci(t),
			this.hci(t);
	}
	RemoveCommonItemData(e, t = 0) {
		var a,
			o = this.Xui.get(e);
		o &&
			(a = o.get(t)) &&
			(o.delete(t),
			0 === o.size && this.Xui.delete(e),
			this.oci(a),
			this.sci(a));
	}
	RemoveCommonItemDataAndSaveNewList(e) {
		for (const t of e)
			this.RemoveCommonItemData(t.ItemId, t.IncId),
				this.RemoveNewCommonItem(t.ItemId, t.IncId),
				this.RemoveRedDotCommonItem(t.ItemId, t.IncId);
		this.SaveNewCommonItemConfigIdList(),
			this.SaveNewAttributeItemUniqueIdList(),
			this.SaveRedDotCommonItemConfigIdList(),
			this.SaveRedDotAttributeItemUniqueIdList();
	}
	hci(e) {
		if (0 < e.GetEndTime())
			if (e.IsOverTime())
				ControllerHolder_1.ControllerHolder.InventoryController.InvalidItemRemoveRequest();
			else {
				const a = e.GetEndTime();
				var t;
				this.eci.has(a) ||
					((t = Math.max(
						a - TimeUtil_1.TimeUtil.GetServerTimeStamp(),
						TimerSystem_1.MIN_TIME,
					)),
					(e = StringUtils_1.StringUtils.Format(
						CD_TIME_REASON,
						e.GetConfigId().toString(),
						e.GetUniqueId().toString(),
					)),
					(t = TimerSystem_1.RealTimeTimerSystem.Delay(
						() => {
							this.lci(a);
						},
						t,
						void 0,
						e,
					)) && (this.eci.add(a), this.tci.set(a, t)));
			}
	}
	lci(e) {
		ControllerHolder_1.ControllerHolder.InventoryController.InvalidItemRemoveRequest();
		var t = this.tci.get(e);
		t && (TimerSystem_1.RealTimeTimerSystem.Remove(t), this.tci.delete(e)),
			this.eci.delete(e);
	}
	GetCommonItemData(e, t = 0) {
		if ((e = this.Xui.get(e)) && (!(e = e.get(t)) || e.IsValid())) return e;
	}
	GetAllCommonItemDataByConfigId(e) {
		var t = [];
		if ((e = this.Xui.get(e)))
			for (const a of Array.from(e.values())) a.IsValid() && t.push(a);
		return t;
	}
	GetItemDataBaseByConfigId(e) {
		switch (
			ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e)
		) {
			case 2:
				return this.GetAllWeaponItemDataByConfigId(e);
			case 3:
				return this.GetAllPhantomItemDataByConfigId(e);
			default:
				return this.GetAllCommonItemDataByConfigId(e);
		}
	}
	GetAllPhantomItemDataByConfigId(e) {
		var t = [];
		for (const a of this.GetAllPhantomItemDataIterator())
			a.GetConfigId() === e && t.push(a);
		return t;
	}
	GetAllWeaponItemDataByConfigId(e) {
		var t = [];
		for (const a of this.GetWeaponItemDataList())
			a.GetConfigId() === e && t.push(a);
		return t;
	}
	GetAllWeaponItemDataByQualityAndType(e, t) {
		var a = [];
		for (const o of this.GetWeaponItemDataList())
			(0 !== e && o.GetQuality() !== e) ||
				(0 !== t && o.GetConfig().WeaponType !== t) ||
				a.push(o);
		return a;
	}
	GetCommonItemCount(e, t = 0) {
		return (e = this.GetCommonItemData(e, t)) ? e.GetCount() : 0;
	}
	NewWeaponItemData(e, t, a) {
		(e = new WeaponItemData_1.WeaponItemData(e, t, a, 2)),
			this.djt.set(t, e),
			this.ici(e),
			this.nci(e);
	}
	RemoveWeaponItemData(e) {
		var t = this.djt.get(e);
		t && (this.djt.delete(e), this.oci(t), this.sci(t));
	}
	RemoveWeaponItemDataAndSaveNewList(e) {
		for (const t of e)
			this.RemoveWeaponItemData(t),
				this.RemoveNewAttributeItem(t),
				this.RemoveRedDotAttributeItem(t);
		this.SaveNewAttributeItemUniqueIdList(),
			this.SaveRedDotAttributeItemUniqueIdList();
	}
	GetWeaponItemData(e) {
		return this.djt.get(e);
	}
	NewPhantomItemData(e, t, a) {
		(e = new PhantomItemData_1.PhantomItemData(e, t, a, 3)),
			this.$ui.set(t, e),
			this.ici(e),
			this.nci(e);
	}
	RemovePhantomItemData(e) {
		var t = this.$ui.get(e);
		t && (this.$ui.delete(e), this.oci(t), this.sci(t));
	}
	RemovePhantomItemDataAndSaveNewList(e) {
		for (const t of e)
			this.RemovePhantomItemData(t),
				this.RemoveNewAttributeItem(t),
				this.RemoveRedDotAttributeItem(t);
		this.SaveNewAttributeItemUniqueIdList(),
			this.SaveRedDotAttributeItemUniqueIdList();
	}
	GetPhantomItemData(e) {
		return this.$ui.get(e);
	}
	ClearCommonItemData() {
		for (const a of this.Xui.values())
			for (const o of a.values()) {
				var e = o.GetMainType(),
					t = o.GetType();
				this.aci(e), this.rci(t);
			}
		this.Xui.clear();
	}
	ClearWeaponItemData() {
		for (const a of this.djt.values()) {
			var e = a.GetMainType(),
				t = a.GetType();
			this.aci(e), this.rci(t);
		}
		this.djt.clear();
	}
	ClearPhantomItemData() {
		for (const a of this.$ui.values()) {
			var e = a.GetMainType(),
				t = a.GetType();
			this.aci(e), this.rci(t);
		}
		this.$ui.clear();
	}
	ClearAllItemData() {
		this.ClearCommonItemData(),
			this.ClearWeaponItemData(),
			this.ClearPhantomItemData(),
			this.Yui.clear(),
			this.Jui.clear();
	}
	GetAttributeItemData(e) {
		let t = this.GetWeaponItemData(e);
		return t || this.GetPhantomItemData(e);
	}
	GetWeaponItemDataList() {
		var e = [];
		for (const t of this._ci())
			ModelManager_1.ModelManager.WeaponModel.IsWeaponUsedByUncommonRole(
				t.GetUniqueId(),
			) || e.push(t);
		return e;
	}
	GetPhantomItemDataList() {
		var e = [];
		for (const t of this.$ui.values()) e.push(t);
		return e;
	}
	GetUnEquipPhantomItemDataList() {
		var e = this.GetPhantomItemDataList();
		const t = [];
		return (
			e.forEach((e) => {
				ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
					e.GetUniqueId(),
				) || t.push(e);
			}),
			t
		);
	}
	GetPhantomItemDataListByPhantomItemId(e) {
		var t = [];
		for (const a of this.$ui.values()) a.GetConfigId() === e && t.push(a);
		return t;
	}
	GetPhantomItemDataListByPhantomItem(e) {
		const t = [];
		return (
			e.forEach((e) => {
				(e = new PhantomItemData_1.PhantomItemData(e.Ekn, e.Q5n, e.gDs, 3)),
					t.push(e);
			}),
			t
		);
	}
	GetPhantomItemDataListByAddCountItemInfo(e) {
		const t = [];
		return (
			e.forEach((e) => {
				(e = new PhantomItemData_1.PhantomItemData(e.Ekn, e.Q5n, 0, 3)),
					t.push(e);
			}),
			t
		);
	}
	GetCommonItemDataList() {
		var e = [];
		for (const t of this.Xui.values())
			for (const a of t.values()) a.IsValid() && e.push(a);
		return e;
	}
	GetCommonItemByItemType(e) {
		var t = [];
		for (const a of this.Xui.values())
			for (const o of a.values()) o.GetType() === e && o.IsValid() && t.push(o);
		return t;
	}
	GetCommonItemByShowType(e) {
		var t = [];
		for (const a of this.Xui.values())
			for (const o of a.values())
				o.GetShowTypeList().includes(e) && o.IsValid() && t.push(o);
		return t;
	}
	GetWeaponItemByItemType(e) {
		var t = [];
		for (const a of this.GetWeaponItemDataList())
			a.GetType() === e && t.push(a);
		return t;
	}
	GetPhantomItemByItemType(e) {
		var t = [];
		for (const a of this.$ui.values()) a.GetType() === e && t.push(a);
		return t;
	}
	GetItemDataBase(e) {
		var t = e.IncId;
		return 0 < t
			? [this.GetAttributeItemData(t)]
			: this.GetItemDataBaseByConfigId(e.ItemId);
	}
	GetItemMainTypeMapping(e) {
		return this.Jui.get(e);
	}
	GetItemDataBaseByMainType(e) {
		var t = new Set();
		if ((e = this.Jui.get(e)))
			for (const a of e.GetSet()) a.IsValid() && t.add(a);
		return t;
	}
	GetInventoryItemGridCountByMainType(e) {
		var t;
		let a = 0;
		for (const o of this.GetItemDataBaseByMainType(e))
			0 !== o.GetType() &&
				(o instanceof CommonItemData_1.CommonItemData
					? (t = o.GetMaxStackCount()) <= 0 ||
						(a += Math.ceil(o.GetCount() / t))
					: (a += 1));
		return a;
	}
	GetItemDataBaseByItemType(e) {
		var t = new Set();
		if ((e = this.Yui.get(e))) for (const a of e) a.IsValid() && t.add(a);
		return t;
	}
	_ci() {
		return this.djt.values();
	}
	GetAllPhantomItemDataIterator() {
		return this.$ui.values();
	}
	SetSelectedItemViewData(e) {
		this.Kui = e;
	}
	SetCurrentLockItemUniqueId(e) {
		this.Wui = e;
	}
	GetSelectedItemData() {
		return this.Kui;
	}
	get GetCurrentLockItemUniqueId() {
		return this.Wui;
	}
	SetSelectedTypeIndex(e) {
		this.Hui = e;
	}
	GetSelectedTypeIndex() {
		return this.Hui;
	}
	SetOutsideUniqueId(e) {
		this.jui = e;
	}
	GetOutsideUniqueId() {
		return this.jui;
	}
	ClearOutsideUniqueId() {
		this.jui = void 0;
	}
	GetItemCountByConfigId(e, t = 0) {
		if (e in ItemDefines_1.EItemId)
			return ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(e);
		switch (
			ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e)
		) {
			case 2:
				return this.uci(e);
			case 3:
				return this.cci(e);
			case 6:
				return this.mci(e);
			case 8:
				return this.dci(e);
			default:
				return this.GetCommonItemCount(e, t);
		}
	}
	uci(e) {
		let t = 0;
		for (const a of this.GetWeaponItemDataList()) a.GetConfigId() === e && t++;
		return t;
	}
	dci(e) {
		return (
			ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeCurrency(e) ?? 0
		);
	}
	cci(e) {
		let t = 0;
		for (const a of this.GetAllPhantomItemDataIterator())
			a.GetConfigId() === e && t++;
		return t;
	}
	mci(e) {
		var t = ModelManager_1.ModelManager.PersonalModel.GetCardUnlockList(),
			a = t.length;
		for (let o = 0; o < a; o++) if (t[o].CardId === e) return 1;
		return 0;
	}
	TryAddNewCommonItem(e, t = 0) {
		return 0 !== t
			? this.TryAddNewAttributeItem(t)
			: !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
					LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
					e,
				) &&
					(ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
						LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
						e,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnGetNewItem,
						e,
					),
					!0);
	}
	TryAddNewAttributeItem(e) {
		return (
			!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
				LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
				e,
			) &&
			(ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
				LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
				e,
			),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetNewItem, e),
			!0)
		);
	}
	RemoveNewCommonItem(e, t = 0) {
		return 0 !== t
			? this.RemoveNewAttributeItem(t)
			: ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
					LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
					e,
				);
	}
	RemoveNewAttributeItem(e) {
		return ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
			LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
			e,
		);
	}
	SaveNewCommonItemConfigIdList() {
		return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
			LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
		);
	}
	SaveNewAttributeItemUniqueIdList() {
		return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
			LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
		);
	}
	IsNewCommonItem(e, t = 0) {
		return 0 !== t
			? this.IsNewAttributeItem(t)
			: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
					LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
					e,
				);
	}
	IsNewAttributeItem(e) {
		return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
			LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
			e,
		);
	}
	GetNewAttributeItemUniqueIdList() {
		return ModelManager_1.ModelManager.NewFlagModel.GetNewFlagSet(
			LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
		);
	}
	TryAddRedDotCommonItem(e, t = 0) {
		var a;
		return (
			!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
				LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
				e,
			) &&
			!!(a = this.GetCommonItemData(e, t)) &&
			0 !== a.GetRedDotDisableRule() &&
			(0 !== t
				? ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
						LocalStorageDefine_1.ELocalStoragePlayerKey
							.InventoryAttributeItemRedDot,
						t,
					)
				: ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
						LocalStorageDefine_1.ELocalStoragePlayerKey
							.InventoryCommonItemRedDot,
						e,
					),
			!0)
		);
	}
	TryAddRedDotAttributeItem(e) {
		var t;
		return (
			!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
				LocalStorageDefine_1.ELocalStoragePlayerKey
					.InventoryAttributeItemRedDot,
				e,
			) &&
			!!(t = this.GetAttributeItemData(e)) &&
			0 !== t.GetRedDotDisableRule() &&
			(ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
				LocalStorageDefine_1.ELocalStoragePlayerKey
					.InventoryAttributeItemRedDot,
				e,
			),
			!0)
		);
	}
	HasRedDot() {
		var e = ModelManager_1.ModelManager.NewFlagModel,
			t = e.GetNewFlagSet(
				LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
			);
		let a = 0,
			o = (t && (a = t.size), 0);
		return (
			(t = e.GetNewFlagSet(
				LocalStorageDefine_1.ELocalStoragePlayerKey
					.InventoryAttributeItemRedDot,
			)) && (o = t.size),
			0 < a || 0 < o
		);
	}
	IsMainTypeHasRedDot(e) {
		return this.GetItemMainTypeMapping(e)?.HasRedDot() ?? !1;
	}
	IsCommonItemHasRedDot(e, t = 0) {
		return 0 !== t
			? this.IsAttributeItemHasRedDot(t)
			: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
					LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
					e,
				);
	}
	IsAttributeItemHasRedDot(e) {
		return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
			LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot,
			e,
		);
	}
	RemoveRedDotCommonItem(e, t = 0) {
		return 0 !== t
			? this.RemoveRedDotAttributeItem(t)
			: !!ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
					LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
					e,
				) &&
					(EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnRemoveItemRedDot,
					),
					!0);
	}
	RemoveRedDotAttributeItem(e) {
		return (
			!!ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
				LocalStorageDefine_1.ELocalStoragePlayerKey
					.InventoryAttributeItemRedDot,
				e,
			) &&
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRemoveItemRedDot,
			),
			!0)
		);
	}
	SaveRedDotCommonItemConfigIdList() {
		return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
			LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
		);
	}
	SaveRedDotAttributeItemUniqueIdList() {
		return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
			LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot,
		);
	}
	SetAcquireData(e) {
		this.Zui = e;
	}
	GetAcquireData() {
		return this.Zui;
	}
	CheckIsCoinEnough(e, t) {
		for (const a of t)
			if (a.ItemId === e)
				return (
					ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
						e,
					) >= a.Count
				);
		return !0;
	}
}
exports.InventoryModel = InventoryModel;
