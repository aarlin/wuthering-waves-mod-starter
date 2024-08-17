"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	Global_1 = require("../../Global"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SpecialItemController_1 = require("../Item/SpecialItem/SpecialItemController"),
	LogReportController_1 = require("../LogReport/LogReportController"),
	LogReportDefine_1 = require("../LogReport/LogReportDefine"),
	RouletteDefine_1 = require("./Data/RouletteDefine"),
	RouletteController_1 = require("./RouletteController"),
	RouletteGridData_1 = require("./RouletteGrid/RouletteGridData");
class RouletteModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.CurrentRouletteType = 0),
			(this.Kgo = 0),
			(this.Qgo = 0),
			(this.ExploreSkillIdList = []),
			(this.UnlockExploreSkillDataMap = new Map()),
			(this.Xgo = (e, t) => e.SortId - t.SortId),
			(this.CurrentFunctionIdList = []),
			(this.$go = new Map()),
			(this.UnlockFunctionDataMap = new Map()),
			(this.Ygo = (e, t) => e.SortId - t.SortId),
			(this.Jgo = (e, t) => {
				void 0 !== (e = this.$go.get(e)) && (t ? this.zgo(e) : this.ubt(e));
			}),
			(this.CurrentEquipItemId = 0);
	}
	IsExploreRouletteOpen() {
		return ModelManager_1.ModelManager.FunctionModel.IsOpen(10026);
	}
	IsFunctionRouletteOpen() {
		return ModelManager_1.ModelManager.FunctionModel.IsOpen(10056);
	}
	OnInit() {
		return this.Zgo(), this.AddEvents(), !0;
	}
	OnClear() {
		return this.RemoveEvents(), !0;
	}
	AddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnFunctionOpenSet,
			this.Jgo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.Jgo,
			);
	}
	RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnFunctionOpenSet,
			this.Jgo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFunctionOpenUpdate,
				this.Jgo,
			);
	}
	set CurrentExploreSkillId(e) {
		this.Kgo !== e &&
			((this.Qgo = this.Kgo),
			(this.Kgo = e),
			this.e0o(this.Kgo),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Phantom", 38, "设置新探索技能Id成功", ["Id", this.Kgo]),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnChangeSelectedExploreId,
			));
	}
	get CurrentExploreSkillId() {
		return this.Kgo;
	}
	t0o(e) {
		this.ExploreSkillIdList = e;
	}
	get CurrentExploreSkillIcon() {
		if (0 !== this.Kgo)
			return this.IsEquipItemSelectOn
				? 0 === this.CurrentEquipItemId
					? void 0
					: ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
							this.CurrentEquipItemId,
						)?.Icon
				: (
						this.UnlockExploreSkillDataMap.get(this.Kgo) ||
						ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(
							this.Kgo,
						)
					).BattleViewIcon;
	}
	GetLastSkillId() {
		return 0 !== this.Qgo
			? this.Qgo
			: this.UnlockExploreSkillDataMap.keys()?.next().value;
	}
	GetExploreDataBySkillId(e) {
		if (this.UnlockExploreSkillDataMap.has(e))
			return this.UnlockExploreSkillDataMap.get(e);
	}
	UnlockExploreSkill(e) {
		var t =
			ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
		1 === t.SkillType &&
			(this.UnlockExploreSkillDataMap.set(e, t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AddExploreVisionSkill,
				e,
			));
	}
	CreateAllUnlockExploreSkill(e) {
		this.UnlockExploreSkillDataMap.clear();
		for (const o of e) {
			var t =
				ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(o);
			1 === t.SkillType && this.UnlockExploreSkillDataMap.set(o, t);
		}
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Phantom", 38, "设置当前解锁的探索技能", ["技能列表", e]);
	}
	i0o(e) {
		var t;
		if (!(e > this.ExploreSkillIdList.length))
			return (
				((t = new RouletteGridData_1.RouletteData()).Id =
					this.ExploreSkillIdList[e]),
				t
			);
	}
	o0o() {
		const e = [];
		return (
			this.UnlockExploreSkillDataMap.forEach((t, o) => {
				var n = new RouletteDefine_1.AssemblyExploreGridData();
				(n.GridType = 0),
					(n.IconPath = t.BackGround),
					(n.Name = t.Name),
					(n.Id = o),
					(n.SortId = t.SortId),
					e.push(n);
			}),
			e.sort(this.Xgo),
			e
		);
	}
	GetDefaultExploreSkillIdList() {
		var e = new Array(RouletteDefine_1.ROULETTE_NUM).fill(0);
		const t = [];
		this.UnlockExploreSkillDataMap.forEach((e, o) => {
			e.AutoFill && t.push([o, e.SortId]);
		}),
			t.sort((e, t) => e[1] - t[1]);
		var o = Math.min(t.length, e.length);
		for (let n = 0; n < o; n++) e[n] = t[n][0];
		return e;
	}
	SetFunctionIdList(e) {
		this.CurrentFunctionIdList = e;
	}
	GetFuncDataByFuncId(e) {
		if (this.UnlockFunctionDataMap.has(e))
			return this.UnlockFunctionDataMap.get(e);
	}
	Zgo() {
		for (const e of ConfigManager_1.ConfigManager.RouletteConfig.GetAllFuncConfig())
			this.$go.set(e.UnlockCondition, e.FuncId);
	}
	r0o(e) {
		var t;
		if (!(e > this.CurrentFunctionIdList.length))
			return (
				((t = new RouletteGridData_1.RouletteData()).Id =
					this.CurrentFunctionIdList[e]),
				t
			);
	}
	zgo(e) {
		var t = ConfigManager_1.ConfigManager.RouletteConfig.GetFuncConfigById(e);
		t &&
			!this.UnlockFunctionDataMap.has(e) &&
			this.UnlockFunctionDataMap.set(e, t);
	}
	ubt(e) {
		this.UnlockFunctionDataMap.has(e) &&
			(this.UnlockFunctionDataMap.delete(e),
			0 <= (e = this.CurrentFunctionIdList.indexOf(e))) &&
			(this.CurrentFunctionIdList[e] = 0);
	}
	n0o() {
		const e = [];
		return (
			this.UnlockFunctionDataMap.forEach((t, o) => {
				var n = new RouletteDefine_1.AssemblyFunctionGridData();
				(n.GridType = 1),
					(n.IconPath = t.FuncMenuIconPath),
					(n.Name = t.FuncName),
					(n.Id = o),
					(n.SortId = t.FuncMenuSequence),
					e.push(n);
			}),
			e.sort(this.Ygo),
			e
		);
	}
	GetDefaultFunctionIdList() {
		var e = new Array(RouletteDefine_1.ROULETTE_NUM).fill(0);
		const t = [];
		this.UnlockFunctionDataMap.forEach((e, o) => {
			e.AutoEquip && t.push([o, e.FuncMenuSequence]);
		}),
			t.sort((e, t) => e[1] - t[1]);
		var o = Math.min(t.length, e.length);
		for (let n = 0; n < o; n++) e[n] = t[n][0];
		return e;
	}
	SetCurrentEquipItemId(e) {
		var t = this.a0o();
		(e = ((this.CurrentEquipItemId = e), this.a0o()))
			? EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSpecialItemUpdate,
					this.CurrentEquipItemId,
				)
			: t &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSpecialItemUpdate,
					void 0,
				);
	}
	get IsEquipItemSelectOn() {
		return 3001 === this.CurrentExploreSkillId;
	}
	get EquipItemType() {
		if (0 !== this.CurrentEquipItemId)
			return ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(
				this.CurrentEquipItemId,
			)
				? 13
				: 1;
	}
	h0o(e) {
		var t = new RouletteGridData_1.RouletteData();
		return 0 !== this.CurrentEquipItemId && (t.Id = this.CurrentEquipItemId), t;
	}
	l0o() {
		var e = [];
		for (const o of ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(
			13,
		)) {
			var t = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(
				o.GetConfigId(),
			);
			t &&
				0 === t.SpecialItemType &&
				(((t = new RouletteDefine_1.AssemblyEquipItemGridData()).Id =
					o.GetConfigId()),
				(t.GridType = 2),
				(t.Name = o.GetConfig().Name),
				(t.ItemNum = o.GetCount()),
				(t.ItemType = 13),
				(t.SortId = o.GetSortIndex()),
				(t.QualityId = o.GetQuality()),
				e.push(t));
		}
		var o = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"Roulette_EquipItem_ShowTypeList",
		);
		for (const t of ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(
			1,
		)) {
			var n = t.GetConfig().ItemBuffType;
			o.includes(n) &&
				(((n = new RouletteDefine_1.AssemblyEquipItemGridData()).Id =
					t.GetConfigId()),
				(n.GridType = 2),
				(n.Name = t.GetConfig().Name),
				(n.ItemNum = t.GetCount()),
				(n.ItemType = 1),
				(n.SortId = t.GetSortIndex()),
				(n.QualityId = t.GetQuality()),
				e.push(n));
		}
		return e;
	}
	_0o() {
		this.IsEquipItemSelectOn &&
			(0 === this.CurrentEquipItemId
				? RouletteController_1.RouletteController.SetLastSkillId()
				: RouletteController_1.RouletteController.RefreshExploreSkillButton());
	}
	a0o() {
		return (
			!!this.CurrentEquipItemId &&
			SpecialItemController_1.SpecialItemController.IsSpecialItem(
				this.CurrentEquipItemId,
			)
		);
	}
	IsExploreSkillHasNum() {
		var e;
		return this.IsEquipItemSelectOn
			? 1 === this.EquipItemType
			: !!(e = this.UnlockExploreSkillDataMap.get(
					this.CurrentExploreSkillId,
				)) && !!((e = e.Cost) && 0 < e.size);
	}
	GetExploreSkillShowNum() {
		var e;
		return this.IsEquipItemSelectOn
			? ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
					this.CurrentEquipItemId,
				)
			: (e = this.UnlockExploreSkillDataMap.get(this.CurrentExploreSkillId)) &&
					(e = e.Cost) &&
					0 < e.size
				? (([e] = e.keys()),
					ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e))
				: 0;
	}
	IsExploreSkillHasSetNum(e) {
		switch (e) {
			case 1010:
			case 1012:
				return !0;
		}
		return !1;
	}
	GetExploreSkillShowSetNumById(e) {
		switch (e) {
			case 1010:
				var t =
					ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceLimit(e);
				return [
					ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceNum(e) ??
						0,
					t ?? 0,
				];
			case 1012:
				return (
					(t =
						ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceLimit(
							e,
						)),
					[
						ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceNum(
							e,
						) ?? 0,
						t ?? 0,
					]
				);
		}
		return [0, 0];
	}
	IsEquipItemInBuffCd() {
		return (
			!!this.IsEquipItemSelectOn &&
			!!ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(
				this.CurrentEquipItemId,
			) &&
			0 <
				ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(
					this.CurrentEquipItemId,
				) -
					TimeUtil_1.TimeUtil.TimeDeviation
		);
	}
	IsEquippedItemBanReqUse() {
		return (
			!!this.IsEquipItemSelectOn &&
			!!SpecialItemController_1.SpecialItemController.IsSpecialItem(
				this.CurrentEquipItemId,
			) &&
			!SpecialItemController_1.SpecialItemController.AllowReqUseSpecialItem(
				this.CurrentEquipItemId,
			)
		);
	}
	SaveCurrentRouletteData(e, t, o, n = !1, r) {
		RouletteController_1.RouletteController.SaveRouletteDataRequest(
			e ?? this.ExploreSkillIdList,
			t ?? this.CurrentFunctionIdList,
			o ?? this.CurrentEquipItemId,
			n,
			r,
		);
	}
	UpdateRouletteData(e) {
		if (0 === e.length)
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Phantom", 38, "当前不存在保存的轮盘数据");
		else {
			let t = e[0]?.oVn,
				o =
					((t = t || new Array(RouletteDefine_1.ROULETTE_NUM).fill(0)),
					this.t0o(t),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Phantom", 38, "探索技能列表", ["Id", t]),
					e[0]?.nVn),
				n =
					(void 0 === o && (o = 0),
					this.SetCurrentEquipItemId(o),
					this._0o(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Phantom", 38, "装配道具", ["Id", o]),
					e[1]?.oVn);
			(n = n || new Array(RouletteDefine_1.ROULETTE_NUM).fill(0)),
				this.SetFunctionIdList(n),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Phantom", 38, "功能轮盘列表", ["Id", n]),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnRouletteSaveDataChange,
				);
		}
	}
	CopyRouletteData(e) {
		var t = new RouletteGridData_1.RouletteData();
		return (
			(t.DataIndex = e?.DataIndex),
			(t.GridIndex = e?.GridIndex),
			(t.GridType = e?.GridType),
			(t.Id = e?.Id),
			(t.Name = e?.Name),
			(t.State = e?.State),
			t
		);
	}
	CreateGridData(e, t) {
		switch (t) {
			case 0:
				return this.i0o(e);
			case 1:
				return this.r0o(e);
			case 2:
				return this.h0o(e);
		}
	}
	CreateAssemblyGridData() {
		var e = new Map();
		return e.set(0, this.o0o()), e.set(1, this.n0o()), e.set(2, this.l0o()), e;
	}
	CreateTempAssemblyIdListData(e, t, o) {
		var n = new Map(),
			r = [];
		for (const t of e) r.push(t);
		n.set(0, r);
		var i = [];
		for (const e of t) i.push(e);
		return n.set(1, i), n.set(2, o), n;
	}
	CreateTempAssemblyData() {
		return this.CreateTempAssemblyIdListData(
			this.ExploreSkillIdList,
			this.CurrentFunctionIdList,
			[this.CurrentEquipItemId],
		);
	}
	CreateDefaultAssemblyData(e) {
		return this.CreateTempAssemblyIdListData(
			this.GetDefaultExploreSkillIdList(),
			this.GetDefaultFunctionIdList(),
			e ?? [0],
		);
	}
	e0o(e) {
		var t = new LogReportDefine_1.ExploreToolSwitchLogData(),
			o = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
		const n = [];
		o.Authorization.forEach((e, t) => {
			0 <
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) &&
				n.push([t, e]);
		}),
			(t.o_authorization = n),
			(t.i_explore_tool_id = e),
			LogReportController_1.LogReportController.LogReport(t);
	}
	SendExploreToolEquipLogData(e, t, o) {
		var n = new LogReportDefine_1.ExploreToolEquipLogData(),
			r = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
		const i = [];
		r.Authorization.forEach((e, t) => {
			0 <
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) &&
				i.push([t, e]);
		}),
			(n.o_authorization = i),
			(n.i_explore_tool_id = e),
			(n.i_operation = t),
			void 0 !== o && (n.i_item_id = o),
			LogReportController_1.LogReportController.LogReport(n);
	}
	SendExploreToolItemUseLogData(e) {
		var t = new LogReportDefine_1.ExploreToolItemUseLogData(),
			o =
				Global_1.Global.BaseCharacter.CharacterActorComponent
					.ActorLocationProxy;
		(t.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
			(t.i_father_area_id =
				ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
			(t.f_pos_x = o.X),
			(t.f_pos_y = o.Y),
			(t.f_pos_z = o.Z),
			(t.i_item_id = e),
			LogReportController_1.LogReportController.LogReport(t);
	}
}
exports.RouletteModel = RouletteModel;
