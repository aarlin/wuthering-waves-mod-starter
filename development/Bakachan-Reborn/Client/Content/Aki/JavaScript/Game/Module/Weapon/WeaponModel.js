"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ItemDefines_1 = require("../Item/Data/ItemDefines"),
	WeaponDefine_1 = require("./WeaponDefine"),
	WeaponInstance_1 = require("./WeaponInstance"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class WeaponModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.UOo = new Map()),
			(this.AOo = new Map()),
			(this.POo = 0),
			(this.BlueprintWeaponBreachLevel = 0),
			(this.xOo = (e, o) => o.QualityId - e.QualityId);
	}
	AddWeaponData(e) {
		var o = (e = this.CreateWeaponInstance(e)).GetIncId(),
			n = (this.UOo.set(o, e), e.HasRole());
		n &&
			((n = e.GetRoleId()), this.AOo.set(n, o), Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("Role", 44, "武器设置", ["roleId", n], ["incId", o]);
	}
	RemoveWeaponData(e) {
		var o = this.UOo.get(e);
		o &&
			(o.HasRole() && ((o = o.GetRoleId()), this.AOo.delete(o)),
			this.UOo.delete(e));
	}
	CreateWeaponInstance(e) {
		var o = new WeaponInstance_1.WeaponInstance();
		return o.SetWeaponItem(e), o;
	}
	SetWeaponLevelData(e, o, n) {
		(e = this.UOo.get(e)) && (e.SetExp(o), e.SetLevel(n));
	}
	SetWeaponBreachData(e, o) {
		(e = this.UOo.get(e)) && e.SetBreachLevel(o);
	}
	SetWeaponResonanceData(e, o) {
		(e = this.UOo.get(e)) && e.SetResonanceLevel(o);
	}
	GetWeaponLevelById(e) {
		return (e = this.UOo.get(e)) ? e.GetLevel() : 0;
	}
	GetWeaponDataByRoleDataId(e, o = !0) {
		return (o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
			e,
			o,
		)).IsTrialRole() || o.IsOnlineRole()
			? o.GetWeaponData()
			: (o = this.AOo.get(e))
				? this.UOo.get(o)
				: void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error("Role", 59, "获取不到武器数据", ["roleDataId", e])
					);
	}
	GetWeaponIdByRoleDataId(e) {
		var o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
		return o
			? o.IsTrialRole()
				? o.GetWeaponData().GetItemId()
				: (o = this.AOo.get(e))
					? this.UOo.get(o)?.GetItemId()
					: void (
							Log_1.Log.CheckError() &&
							Log_1.Log.Error("Role", 59, "获取不到武器数据", ["roleDataId", e])
						)
			: ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)
					.InitWeaponItemId;
	}
	GetWeaponDataByIncId(e) {
		return this.UOo.get(e);
	}
	WeaponRoleLoadEquip(e) {
		for (const t of e.sort((e, o) => e.DVn - o.DVn)) {
			var o = t.DVn,
				n = t.AVn;
			this.ChangeWeaponEquip(n, o);
		}
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EquipWeapon);
	}
	WeaponLevelUpResponse(e) {
		this.SetWeaponLevelData(e.Ykn, e.RVn, e.UVn),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeaponLevelUp),
			this.qNo(e.Vms);
	}
	qNo(e) {
		var o = [];
		for (const t of Object.keys(e)) {
			var n = [{ IncId: 0, ItemId: Number.parseInt(t) }, e[t]];
			o.push(n);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.WeaponLevelUpReceiveItem,
			o,
		);
	}
	ChangeWeaponEquip(e, o) {
		var n = this.UOo.get(e),
			t = n.GetRoleId();
		0 < t &&
			(this.AOo.set(t, 0), Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("Role", 44, "武器设置", ["lastRoleId", t], ["incId", 0]),
			n.SetRoleId(o),
			0 < o &&
				(this.AOo.set(o, e), Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info("Role", 44, "武器设置", ["roleId", o], ["incId", e]);
	}
	GetCurveValue(e, o, n, t) {
		return (
			o *
			((ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponPropertyGrowthConfig(
				e,
				n,
				t,
			)?.CurveValue ?? 0) /
				WeaponDefine_1.WEAPON_CURVE_RATION)
		);
	}
	GetWeaponListFromReplace(e) {
		var o = [];
		for (const n of ModelManager_1.ModelManager.InventoryModel.GetWeaponItemDataList())
			this.GetWeaponDataByIncId(n.GetUniqueId()).GetWeaponConfig()
				.WeaponType === e && o.push(n);
		return o;
	}
	GetResonanceMaterialList(e) {
		var o = ModelManager_1.ModelManager.InventoryModel,
			n = this.GetWeaponDataByIncId(e),
			t = n.GetItemId(),
			a = [];
		for (const n of o.GetItemDataBaseByMainType(2))
			n.GetConfigId() !== t ||
				n.GetUniqueId() === e ||
				this.GetWeaponDataByIncId(n.GetUniqueId()).HasRole() ||
				a.push(n);
		if ((n = n.GetResonanceConfig().AlternativeConsume) && 0 < n.length)
			for (const e of n)
				for (const n of o.GetItemDataBaseByConfigId(e)) a.push(n);
		return a;
	}
	GetCanChangeMaterialList(e) {
		var o = new Map(),
			n = ConfigCommon_1.ConfigCommon.ToList(
				ConfigManager_1.ConfigManager.ItemConfig.GetConfigListByItemType(4),
			);
		n.sort(this.xOo);
		let t = e;
		for (const e of n) {
			var a,
				r = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(
					e.Id,
				);
			t >= r.BasicExp &&
				((a = Math.floor(t / r.BasicExp)), o.set(e.Id, a), (t %= r.BasicExp));
		}
		return o;
	}
	GetResonanceNeedMoney(e, o, n) {
		let t = 0;
		for (let a = o; a < n; a++)
			t += ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
				e,
				a,
			).GoldConsume;
		return t;
	}
	GetWeaponBreachMaxLevel(e) {
		var o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreachList(e),
			n = o.length;
		let t = 0;
		for (let e = 0; e < n; e++) {
			var a = o[e];
			a.Level > t && (t = a.Level);
		}
		return t;
	}
	GetWeaponItemBaseExp(e) {
		if (4 === e.GetType()) {
			return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(
				e.GetConfigId(),
			).BasicExp;
		}
		return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponQualityInfo(
			e.GetQuality(),
		).BasicExp;
	}
	GetWeaponConfigDescParams(e, o) {
		var n,
			t = [];
		for (const a of e.DescParams)
			a &&
				((n = o >= a.ArrayString.length ? a.ArrayString.length : o),
				(n = a.ArrayString[n - 1]),
				t.push(n));
		return t;
	}
	GetCurSelectViewName() {
		return this.POo;
	}
	SetCurSelectViewName(e) {
		this.POo = e;
	}
	IsWeaponUsedByUncommonRole(e) {
		return !(
			!(e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e)) ||
			!(e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
				e.GetRoleId(),
			)) ||
			1 === e.GetRoleConfig().RoleType
		);
	}
	CanItemUseAsExpItem(e) {
		return !(
			2 === e.GetType() &&
			0 < e.GetUniqueId() &&
			((e = this.GetWeaponDataByIncId(e.GetUniqueId())).HasRole() ||
				5 <= e.GetItemConfig().QualityId)
		);
	}
	IsWeaponHighQuality(e) {
		return (
			ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponQualityCheck() <
			e.GetItemConfig().QualityId
		);
	}
	IsWeaponHighLevel(e) {
		return (
			ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelCheck() <
			e.GetLevel()
		);
	}
	IsWeaponHighResonanceLevel(e) {
		return (
			ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceCheck() <
			e.GetResonanceLevel()
		);
	}
	HasWeaponResonance(e) {
		return 1 < e.GetResonanceLevel();
	}
	GetWeaponItemExp(e, o) {
		return e && 0 < e
			? this.GetWeaponDataByIncId(e).GetMaterialExp()
			: ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(o)
					.BasicExp;
	}
	GetWeaponItemExpCost(e, o) {
		return e && 0 < e
			? this.GetWeaponDataByIncId(e).GetMaterialCost()
			: ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(o)
					.Cost;
	}
	GetWeaponExpItemListCost(e) {
		return Math.floor(
			e *
				ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelUpCostRatio(),
		);
	}
	GetWeaponExpItemList(e) {
		var o = [];
		for (const n of ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByMainType(
			2,
		))
			this.CanItemUseAsExpItem(n) && e !== n.GetUniqueId() && o.push(n);
		return o;
	}
	GetWeaponExpItemListUseToAuto(e) {
		var o = [];
		for (const t of this.GetWeaponExpItemList(e))
			if (!t.GetIsLock()) {
				if (2 === t.GetType()) {
					var n = this.GetWeaponDataByIncId(t.GetUniqueId());
					if (this.IsWeaponHighResonanceLevel(n)) continue;
					if (this.IsWeaponHighLevel(n)) continue;
				}
				o.push(t);
			}
		return this.GetWeaponExpItemListWithSort(o), o;
	}
	GetWeaponExpItemListWithSort(e) {
		var o = new Set();
		return (
			o.add(2),
			o.add(10),
			o.add(8),
			ModelManager_1.ModelManager.SortModel.SortDataByData(e, 2, o, !0),
			e
		);
	}
	AutoAddExpItem(e, o, n, t) {
		let a = e;
		var r = [];
		for (const e of n) {
			if (o <= r.length || a <= 0) break;
			var i = t(e),
				s = Math.ceil(a / i),
				g = e.Count - e.SelectedCount;
			0 < (s = e.SelectedCount + Math.min(s, g)) &&
				((g = {
					IncId: e.IncId,
					ItemId: e.ItemId,
					Count: e.Count,
					SelectedCount: s,
				}),
				r.push(g),
				(a -= s * i));
		}
		return r;
	}
	AutoAddExpItemEx(e, o, n) {
		let t = e;
		for (const e of o) {
			if (t <= 0) break;
			var a = n(e),
				r = Math.ceil(t / a),
				i = e.Count - e.SelectedCount;
			r = e.SelectedCount + Math.min(r, i);
			(e.SelectedCount = r), (t -= r * a);
		}
	}
	GetWeaponAttributeParamList(e) {
		return [
			{ PropId: e.FirstPropId, CurveId: e.FirstCurve },
			{ PropId: e.SecondPropId, CurveId: e.SecondCurve },
		];
	}
	GetWeaponBreachState(e) {
		var o,
			n,
			t = (e = this.GetWeaponDataByIncId(e)).GetBreachConfig();
		if (
			!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
				t.ConditionId.toString(),
				void 0,
				!0,
			)
		)
			return 3;
		for ([o, n] of e.GetBreachConsume())
			if (
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o) < n
			)
				return 0;
		return (
			(e = t.GoldConsume),
			ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				ItemDefines_1.EItemId.Gold,
			) < e
				? 1
				: 2
		);
	}
}
exports.WeaponModel = WeaponModel;
