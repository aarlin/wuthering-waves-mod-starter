"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionUnlockQualityData =
		exports.RecommendData =
		exports.PhantomSortStruct =
		exports.PhantomBattleModel =
		exports.LevelUpPastVisionData =
			void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	PhantomFetterGroupById_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterGroupById"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	AttributeDefine_1 = require("../../Attribute/AttributeDefine"),
	RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
	AttrListScrollData_1 = require("../../RoleUi/View/ViewData/AttrListScrollData"),
	PhantomDataBase_1 = require("./Data/PhantomDataBase"),
	PhantomRoleEquipmentData_1 = require("./Data/PhantomRoleEquipmentData"),
	PhantomBattleData_1 = require("./PhantomBattleData"),
	PhantomBattleInstance_1 = require("./PhantomBattleInstance");
class LevelUpPastVisionData {
	constructor() {
		(this.Level = 0),
			(this.UniqueId = 0),
			(this.AttrListScrollData = void 0),
			(this.SlotData = void 0);
	}
}
exports.LevelUpPastVisionData = LevelUpPastVisionData;
class PhantomBattleModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.rVi = new Map()),
			(this.nVi = new Map()),
			(this.sVi = new Map()),
			(this.aVi = new Map()),
			(this.hVi = new Map()),
			(this.lVi = new Array()),
			(this._Vi = !1),
			(this.uVi = void 0),
			(this.CurrentSelectData = void 0),
			(this.CurrentEquipmentSelectIndex = 0),
			(this.CurrentSelectUniqueId = 0),
			(this.cVi = void 0),
			(this.mVi = new UE.Vector()),
			(this.dVi = new UE.Vector()),
			(this.CVi = new UE.Rotator()),
			(this.gVi = new Map()),
			(this.fVi = []),
			(this.pVi = void 0),
			(this.vVi = !1),
			(this.MVi = 999),
			(this.SVi = 0),
			(this.EVi = []),
			(this.yVi = new Map()),
			(this.IVi = new Map()),
			(this.TVi = void 0),
			(this.LVi = void 0),
			(this.DVi = void 0),
			(this.RVi = void 0),
			(this.UVi = () => {
				ControllerHolder_1.ControllerHolder.PhantomBattleController.TryShowReceiveItem();
			}),
			(this.SortAttrList = (t, e) => {
				var a = 0 !== t.Priority,
					r = 0 !== e.Priority;
				return a && r ? t.Priority - e.Priority : a ? -1 : r ? 1 : t.Id - e.Id;
			}),
			(this.AVi = void 0),
			(this.CurrentSelectFetterGroupId = 0),
			(this.PVi = void 0),
			(this.xVi = new Array(4, 3, 3, 1, 1)),
			(this.wVi = new Array()),
			(this.BVi = new Array()),
			(this.bVi = 0),
			(this.qVi = void 0),
			(this.GVi = void 0),
			(this.NVi = (t, e) => {
				if (t.GetPhantomLevel() !== e.GetPhantomLevel())
					return e.GetPhantomLevel() - t.GetPhantomLevel();
				if (t.GetQuality() !== e.GetQuality())
					return e.GetQuality() - t.GetQuality();
				var a = this.wVi.includes(t.GetMonsterId()),
					r = this.wVi.includes(e.GetMonsterId());
				if (a && !r) return -1;
				if (r && !a) return 1;
				if (
					((r = this.wVi.indexOf(t.GetMonsterId())),
					(a = this.wVi.indexOf(e.GetMonsterId())),
					(r = 0 <= r ? this.BVi[r] : 0) !== (a = 0 <= a ? this.BVi[a] : 0))
				)
					return a - r;
				if (
					((a = t.GetFetterGroupId() === this.bVi),
					(r = e.GetFetterGroupId() === this.bVi),
					a && r)
				) {
					var o = this.qVi.includes(t.GetMonsterId()),
						i = this.qVi.includes(e.GetMonsterId());
					if (o && !i) return -1;
					if (i && !o) return 1;
				} else {
					if (a) return -1;
					if (r) return 1;
				}
				return t.GetCost() !== e.GetCost()
					? e.GetCost() - t.GetCost()
					: ((i = this.GVi.includes(t.GetUniqueId())),
						(o = this.GVi.includes(e.GetUniqueId())),
						i && !o ? -1 : o && !i ? 1 : e.GetConfigId() - t.GetConfigId());
			}),
			(this.OVi = (t, e) => {
				var a, r;
				return t.GetType() !== e.GetType()
					? t.GetType() - e.GetType()
					: t.GetQuality() !== e.GetQuality()
						? t.GetQuality() - e.GetQuality()
						: ((a = this.GetPhantomBattleData(t.GetUniqueId())),
							(r = this.GetPhantomBattleData(t.GetUniqueId())),
							a && r && a.GetPhantomLevel() !== r.GetPhantomLevel()
								? a.GetPhantomLevel() - r.GetPhantomLevel()
								: e.GetUniqueId() - t.GetUniqueId());
			}),
			(this.kVi = new Array());
	}
	SetCurrentDragIndex(t) {
		this.MVi = t;
	}
	ClearCurrentDragIndex() {
		this.MVi = 999;
	}
	CheckIfCurrentDragIndex(t) {
		return this.MVi === t;
	}
	CheckIfCanDrag() {
		return 999 === this.MVi;
	}
	OnInit() {
		for (const a of ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemList()) {
			var t,
				e = 0 !== a.ParentMonsterId ? a.ParentMonsterId : a.MonsterId;
			let r = this.yVi.get(e);
			r
				? 0 !== a.ParentMonsterId
					? r.push(a.ItemId)
					: 2 === a.QualityId &&
						((t = []).push(a.ItemId), (r = t.concat(r)), this.yVi.set(e, r))
				: ((r = []).push(a.ItemId), this.yVi.set(e, r)),
				0 !== a.ParentMonsterId && this.IVi.set(a.MonsterId, a.ParentMonsterId);
		}
		return !0;
	}
	async GetDragCurve() {
		return (
			this.cVi ||
				((this.cVi = new CustomPromise_1.CustomPromise()),
				ResourceSystem_1.ResourceSystem.LoadAsync(
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDragCurve(),
					UE.CurveFloat,
					(t) => {
						this.cVi.SetResult(t);
					},
				)),
			await this.cVi.Promise,
			this.cVi.Promise
		);
	}
	SetDefaultSkin(t, e) {
		for (var [, a] of this.hVi)
			t === a.GetConfig()?.MonsterId && a.SetSkinId(e);
	}
	SetUnlockSkinList(t) {
		this.EVi = t;
	}
	ConcatUnlockSkinList(t) {
		this.EVi = this.EVi.concat(t);
	}
	GetSkinIsUnlock(t) {
		return this.EVi.includes(t);
	}
	GetMonsterSkinListByMonsterId(t) {
		return this.yVi.get(t);
	}
	GetMonsterSkinListHasNew(t) {
		if (
			((t =
				ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomItemById(
					t,
				)),
			t)
		) {
			t = 0 !== t.ParentMonsterId ? t.ParentMonsterId : t.MonsterId;
			for (const e of this.yVi.get(t))
				if (
					ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
						LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
						e,
					)
				)
					return !0;
		}
		return !1;
	}
	GetMonsterSkinMonsterIdMapByMonsterId(t) {
		return this.IVi.get(t);
	}
	SetMaxCost(t) {
		this.SVi = t;
	}
	GetMaxCost() {
		return this.SVi;
	}
	SetRobotPhantomData(t, e) {
		this.rVi.set(t, e);
	}
	NewPhantomBattleData(t) {
		var e = new PhantomBattleData_1.PhantomBattleData();
		return e.SetData(t), this.hVi.set(t.Q5n, e), (this._Vi = !0), e;
	}
	RemovePhantomBattleData(t) {
		this.hVi.delete(t), (this._Vi = !0);
	}
	GetPhantomDataBase(t) {
		return this.GetPhantomBattleData(t);
	}
	GetPhantomBattleData(t) {
		return (t < 0 ? this.rVi : this.hVi).get(t);
	}
	GetPhantomInstanceByItemId(t) {
		let e = this.aVi.get(t);
		var a;
		return (
			e ||
				((a =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
						t,
					)),
				(e = new PhantomBattleInstance_1.PhantomBattleInstance(a)),
				this.aVi.set(t, e)),
			e
		);
	}
	CreatePhantomLevelCacheData(t) {
		var e = new LevelUpPastVisionData();
		return (
			(e.Level = this.GetPhantomBattleData(t).GetPhantomLevel()),
			(e.AttrListScrollData =
				this.GetPhantomBattleData(t).GetMainPropShowAttributeList(1)),
			(e.SlotData = this.GetPhantomBattleData(t).GetCurrentSlotData()),
			(e.UniqueId = t),
			e
		);
	}
	CachePhantomLevelUpData(t) {
		this.pVi = t;
	}
	GetCachePhantomLevelUpData() {
		return this.pVi;
	}
	GetLevelUpSuccessData(t) {
		var e =
				ModelManager_1.ModelManager.PhantomBattleModel.GetCachePhantomLevelUpData(),
			a =
				ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIfLevelMax(
					t,
				),
			r =
				((t =
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
						t,
					)),
				this.FVi(e, t));
		const o = new Array();
		r.forEach((t) => {
			o.push(
				RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(
					t,
				),
			);
		});
		r = t.GetLevelUnlockSubPropSlotCount(e.Level);
		var i = t.GetLevelUnlockSubPropSlotCount(t.GetPhantomLevel());
		if (r !== i)
			for (let t = r; t < i; t++) {
				var n = { Name: "UnlockSlot", ShowArrow: !1, PreText: "" };
				(n.CurText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"Text_PhantomUnlock_Text",
				)),
					(n.IconPath =
						ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpTexture()),
					o.push(n);
			}
		return {
			LevelInfo: {
				PreUpgradeLv: e.Level,
				UpgradeLv: t.GetPhantomLevel(),
				FormatStringId: "VisionLevel",
				IsMaxLevel: a,
			},
			WiderScrollView: !1,
			AttributeInfo: o,
			ClickFunction: this.UVi,
		};
	}
	FVi(t, e) {
		var a = t.AttrListScrollData,
			r = e.GetMainPropShowAttributeList(1),
			o = r.length,
			i = a.length,
			n = new Array();
		for (let t = 0; t < o; t++) {
			var s = r[t];
			let e;
			for (let r = 0; r < i; r++)
				if (a[r].Id === s.Id && t === r) {
					e = a[r];
					break;
				}
			var l =
				ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
					s.Id,
				);
			n.push(
				new AttrListScrollData_1.AttrListScrollData(
					s.Id,
					e.BaseValue,
					s.BaseValue,
					l.Priority,
					e.IsRatio,
					2,
				),
			);
		}
		return n;
	}
	PhantomLevelUpReceiveItem(t) {
		var e = [];
		for (const r of Object.keys(t)) {
			var a = [{ IncId: 0, ItemId: Number.parseInt(r) }, t[r]];
			e.push(a);
		}
		(this.fVi = e),
			(this.vVi = !0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.PhantomLevelUpReceiveItem,
				e,
			);
	}
	GetVisionLevelUpTag() {
		return this.vVi;
	}
	ClearVisionLevelUp() {
		this.vVi = !1;
	}
	GetTempSaveItemList() {
		return this.fVi;
	}
	ClearTempSaveItemList() {
		this.fVi = [];
	}
	GetVisionSortUseDataList(t = 0, e = 0) {
		var a = new Array(),
			r = ModelManager_1.ModelManager.InventoryModel;
		for (const s of ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleDataMap().values()) {
			var o,
				i,
				n = s.GetUniqueId();
			(0 < t && s.GetFetterGroupId() !== t) ||
				(0 < e && s.GetCost() !== e) ||
				((o = r.GetPhantomItemData(n)),
				(i = s.GetConfig()),
				(n = {
					IsPhantomData: !0,
					Id: s.GetUniqueId(),
					Quality: i.QualityId,
					IsEquip:
						ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
							n,
						),
					Role: ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
						n,
					),
					Level: s.GetPhantomLevel(),
					IsBreach: s.IsBreach(),
					MonsterId: i.MonsterId,
					MainPropMap: s.GetMainPropArray(),
					SubPropMap: s.GetSubPropArray(),
					IsLock: o.GetIsLock(),
					ConfigId: o.GetConfigId(),
					Rarity: i.Rarity,
				}),
				a.push(n));
		}
		return a;
	}
	GetPhantomBattleDataMap() {
		return this.hVi;
	}
	GetUnEquipVisionArray() {
		return (
			this._Vi &&
				((this.lVi = []),
				(this._Vi = !1),
				this.GetPhantomBattleDataMap().forEach((t, e) => {
					this.CheckPhantomIsEquip(e) || this.lVi.push(t);
				})),
			this.lVi
		);
	}
	UpdateRoleEquipmentData(t) {
		var e = this.GetBattleDataById(t.l3n);
		e.GetIncrIdList().forEach((t) => {
			this.sVi.delete(t);
		}),
			t.c8n.forEach((e) => {
				var a = this.GetPhantomEquipOnRoleId(e);
				0 < a && this.GetBattleDataById(a).RemoveIncrIdLocal(e),
					this.sVi.set(e, t.l3n);
			}),
			(this._Vi = !0),
			e.Phrase(t);
	}
	UpdateRoleEquipmentPropData(t) {
		this.GetBattleDataById(t.l3n).Phrase(t);
	}
	DeleteBattleData(t) {
		var e = this.nVi.get(t);
		e &&
			(e.GetIncrIdList().forEach((t) => {
				this.sVi.delete(t);
			}),
			(this._Vi = !0),
			this.nVi.delete(t));
	}
	GetBattleDataById(t) {
		let e = this.nVi.get(t);
		return (
			(e = e || new PhantomRoleEquipmentData_1.PhantomRoleEquipmentData()),
			this.nVi.set(t, e),
			e
		);
	}
	CheckPhantomIsEquip(t) {
		return t < 0 || (0 !== t && this.sVi.has(t));
	}
	CheckPhantomIsMain(t) {
		var e;
		return t < 0
			? this.GetPhantomDataBase(t).GetIfMain()
			: !!this.CheckPhantomIsEquip(t) &&
					((e = this.sVi.get(t)),
					this.GetBattleDataById(e).CheckPhantomIsMain(t));
	}
	CheckPhantomIsSub(t) {
		var e;
		return (
			!!this.CheckPhantomIsEquip(t) &&
			((e = this.sVi.get(t)), this.GetBattleDataById(e).CheckPhantomIsSub(t))
		);
	}
	GetPhantomEquipOnRoleId(t) {
		if (this.CheckPhantomIsEquip(t)) return this.sVi.get(t);
	}
	CheckPhantomIndexIsEquipOnRole(t, e) {
		return -1 !== this.GetBattleDataById(t).GetIndexPhantomId(e);
	}
	GetPhantomSumLevelByRoleId(t) {
		return this.GetBattleDataById(t).GetSumEquipLevel();
	}
	GetPhantomIsUnlock(t) {
		for (const e of ModelManager_1.ModelManager.CalabashModel.GetUnlockCalabashDevelopRewards().keys())
			if (t === e) return !0;
		return !1;
	}
	GetIfHasMonsterInInventory(t) {
		if (!(t = this.GetPhantomItemIdArrayByMonsterId(t)) || 0 === t.length)
			return !1;
		let e = !1;
		for (const a of t)
			if (
				0 < ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(a)
			) {
				e = !0;
				break;
			}
		return e;
	}
	CheckPhantomIfLevelMax(t) {
		return (
			(t =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
					t,
				)).GetPhantomLevel() ===
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(
				t.GetQuality(),
			).LevelLimit
		);
	}
	CheckMonsterIsEquipOnRole(t, e) {
		return this.GetBattleDataById(t).CheckMonsterIsEquip(e);
	}
	GetVisionIndexOnRole(t, e) {
		return this.GetBattleDataById(e).GetIndexPhantomId(t);
	}
	GetRoleIfEquipVision(t) {
		var e =
				ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
					t,
				).GetIncrIdList(),
			a = e.length;
		for (let t = 0; t < a; t++) if (0 !== e[t]) return !0;
		return !1;
	}
	GetRoleIndexPhantomId(t, e) {
		return this.GetBattleDataById(t).GetIndexPhantomId(e);
	}
	GetPhantomIndexOfRole(t, e) {
		var a =
				ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
					t,
				).GetIncrIdList(),
			r = a.length;
		for (let t = 0; t < r; t++) if (a[t] === e) return t;
		return -1;
	}
	GetRolePhantomEquipState(t, e, a) {
		return this.CheckPhantomIsEquip(a)
			? this.GetBattleDataById(t).GetPhantomOperationState(e, a)
			: 1;
	}
	GetPhantomMaxLevel(t) {
		return (
			(t = this.GetPhantomBattleData(t)),
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(
				t.GetQuality(),
			).LevelLimit
		);
	}
	GetFetterListByRoleId(t) {
		if (0 === (t = this.GetTargetRoleFetterList(t)).length) return [];
		var e = new Array();
		for (const a of t)
			e.push(
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
					a,
				),
			);
		return e;
	}
	UpdateFetterList(t) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Phantom", 28, "刷新当前羁绊列表", ["roleId", t]);
		const e =
			ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t).GetPhantomData();
		t = e.GetDataMap();
		var a = [];
		for (const e of t.values()) e && a.push(e.GetIncrId());
		e.ClearPhantomFettersList(), this.VVi(a, e.GetPhantomFettersList());
	}
	VVi(t, e) {
		const a = new Map();
		t.forEach((t) => {
			var e;
			(t = this.GetPhantomDataBase(t)) &&
				((e = (a.get(t.GetFetterGroupId()) ?? 0) + 1),
				a.set(t.GetFetterGroupId(), e));
		}),
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterResultBySuitMap(
				a,
			).forEach((t) => {
				e.push(t);
			});
	}
	GetPreviewFetterAdd(t, e, a) {
		var r = this.GetBattleDataById(a).GetIncrIdList(),
			o = new Array(),
			i = r.length;
		for (let t = 0; t < i; t++)
			this.GetPhantomBattleData(r[t]) && t !== e && o.push(r[t]);
		var n = new Array(),
			s = this.GetTargetRoleFetterList(a),
			l = new Array();
		o.push(t.GetIncrId()), this.VVi(o, n);
		for (const t of n) s.includes(t) || l.push(t);
		return l;
	}
	GetPreviewFettersDel(t, e, a) {
		var r = this.GetBattleDataById(a).GetIncrIdList(),
			o = new Array(),
			i = r.length;
		for (let t = 0; t < i; t++)
			this.GetPhantomBattleData(r[t]) && t !== e && o.push(r[t]);
		var n = new Array(),
			s = ((a = this.GetTargetRoleFetterList(a)), new Array());
		o.push(t.GetIncrId()), this.VVi(o, n);
		for (const t of a) n.includes(t) || s.push(t);
		return s;
	}
	CheckFetterActiveState(t, e) {
		if ((t = this.GetFetterListByRoleId(t)) && 0 !== t.length)
			for (const a of t) if (a.Id === e) return !0;
		return !1;
	}
	GetTargetCanActiveFettersList(t) {
		var e = new Map();
		t = this.GetPhantomDataBase(t);
		const a = new Array();
		return (
			t && e.set(t.GetFetterGroupId(), 999),
			e.forEach((t, e) => {
				let r;
				(e =
					PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(
						e,
					).FetterMap).forEach((e, o) => {
					o <= t && ((r = e), a.push(r));
				});
			}),
			a
		);
	}
	GetRoleFetterData(t) {
		const e = new Array();
		var a =
				ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
					t,
				).GetIncrIdList(),
			r = a.length,
			o = new Array();
		for (let t = 0; t < r; t++) {
			var i =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
					a[t],
				);
			i && o.push(i);
		}
		const n =
			PhantomDataBase_1.PhantomDataBase.CalculateFetterByPhantomBattleData(o);
		for (let t = 0; t < r; t++) {
			const r =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
					a[t],
				);
			r &&
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupFetterDataById(
					r.GetFetterGroupId(),
				).forEach((t, a) => {
					var o = new PhantomDataBase_1.VisionFetterData();
					(o.FetterId = t),
						(o.FetterGroupId = r.GetFetterGroupId()),
						(o.ActiveFetterGroupNum = n.get(r.GetFetterGroupId()) ?? 0),
						(o.ActiveState = n.get(r.GetFetterGroupId()) >= a),
						e.push(o);
				});
		}
		return e;
	}
	GetTargetRoleFetterList(t) {
		return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)
			.GetPhantomData()
			.GetPhantomFettersList();
	}
	GetMeshTransform(t) {
		return new UE.Transform(this.HVi(t), this.jVi(t), this.WVi(t));
	}
	WVi(t) {
		if ((t = this.GetPhantomInstanceByItemId(t).GetModelZoom()) && 0 < t.length)
			return (
				(this.mVi.X = t[0]), (this.mVi.Y = t[1]), (this.mVi.Z = t[2]), this.mVi
			);
	}
	jVi(t) {
		if (
			(t = this.GetPhantomInstanceByItemId(t).GetModelLocation()) &&
			0 < t.length
		)
			return (
				(this.dVi.X = t[0]), (this.dVi.Y = t[1]), (this.dVi.Z = t[2]), this.dVi
			);
	}
	HVi(t) {
		if (
			(t = this.GetPhantomInstanceByItemId(t).GetModelRotator()) &&
			0 < t.length
		)
			return (
				(this.CVi.Roll = t[0]),
				(this.CVi.Pitch = t[1]),
				(this.CVi.Yaw = t[2]),
				this.CVi
			);
	}
	GetStandAnim(t) {
		return this.GetPhantomInstanceByItemId(t).GetStandAnim();
	}
	GetPhantomLevelUpItemSortList(t) {
		var e = [],
			a =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
		if (a)
			for (const t of a) {
				var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId);
				r && e.push(r);
			}
		return e;
	}
	CheckPhantomIfNewQuality(t) {
		var e,
			a,
			r = this.GetPhantomDataBase(t);
		let o = !1;
		for ([e, a] of this.hVi)
			if (
				a.GetMonsterId() === r?.GetMonsterId() &&
				e !== t &&
				a.GetQuality() === r.GetQuality()
			) {
				o = !0;
				break;
			}
		return !o;
	}
	GetEquipRoleName(t) {
		return 0 <
			(t =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(
					t,
				))
			? ((t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)),
				ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(t.Name))
			: "";
	}
	GetRoleCurrentPhantomCost(t) {
		var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
		let a = 0;
		if (e?.IsTrialRole()) {
			var r = e.GetPhantomData().GetDataMap();
			for (let t = 0; t < 5; ++t) {
				var o = r.get(t);
				o && (a += o.GetCost());
			}
		} else
			this.GetBattleDataById(t)
				.GetIncrIdList()
				.forEach((t) => {
					(t = this.GetPhantomBattleData(t)) && (a += t.GetCost());
				});
		return a;
	}
	GetLevelUpNeedCost(t) {
		return Math.floor(
			t *
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomLevelUpCostRatio(),
		);
	}
	ResetLevelUpItemData() {
		this.gVi.clear();
	}
	GetPhantomItemIdArrayByMonsterId(t) {
		t =
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(
				t,
			);
		const e = new Array();
		return (
			t.forEach((t) => {
				e.push(t.ItemId);
			}),
			e
		);
	}
	GetMonsterRarity(t) {
		return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(
			t,
		)[0].Rarity;
	}
	GetShowAttrList(t) {
		return (
			(t = this.GetBattleDataById(t).GetPropShowAttributeList()).sort(
				this.SortAttrList,
			),
			t
		);
	}
	GetExtraAttrList(t) {
		return (
			(t = this.GetBattleDataById(t).GetPropDetailAttributeList()).sort(
				this.SortAttrList,
			),
			t
		);
	}
	GetFetterGroupMonsterIdArray(t) {
		return this.GetFetterGroupMonsterMap().get(t);
	}
	GetMonsterFindCountByMonsterIdArray(t) {
		let e = 0;
		for (const a of t)
			ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(1, a) && e++;
		return e;
	}
	GetFetterGroupMonsterMap() {
		return (
			this.uVi ||
				((this.uVi = new Map()),
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupArray().forEach(
					(t) => {
						var e =
							ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupSourceMonster(
								t.Id,
							);
						const a = new Array();
						e.forEach((t) => {
							a.includes(t) || a.push(t);
						}),
							this.uVi.set(t.Id, a);
					},
				)),
			this.uVi
		);
	}
	GetTrialRoleDetailAttrList(t) {
		var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"VisionMainViewExtraAttribute",
		);
		const a = this.GetTrialRoleAttrList(t),
			r = a.length,
			o = [];
		let i = !1;
		return (
			e.forEach((t) => {
				var e =
					ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
						t,
					);
				i = !1;
				for (let e = 0; e < r; e++)
					if (a[e].Id === t) {
						o.push(a[e]), (i = !0);
						break;
					}
				i ||
					o.push(
						new AttrListScrollData_1.AttrListScrollData(
							t,
							0,
							0,
							e.Priority,
							!1,
							1,
						),
					);
			}),
			o
		);
	}
	GetTrialRoleAttrList(t) {
		var e,
			a,
			r = new Array(),
			o = ModelManager_1.ModelManager.RoleModel.GetRoleRobotData(t),
			i =
				ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexList(),
			n = new Map();
		const s = [];
		o
			.GetPhantomData()
			.GetDataMap()
			.forEach((t) => {
				for (const e of t.GetMainTrailProp().values()) s.push(e);
				for (const e of t.GetSubTrailPropMap().values()) s.push(e);
			}),
			this.KVi(s, n, t);
		for (const t of i)
			t.IsShow &&
				((e =
					ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
						t.Id,
					)),
				(a = void 0 !== (a = n.get(t.Id)) ? a : 0),
				r.push(
					new AttrListScrollData_1.AttrListScrollData(
						t.Id,
						0,
						a,
						e.Priority,
						!1,
						1,
					),
				));
		return r.sort(this.SortAttrList), r;
	}
	KVi(t, e, a) {
		var r,
			o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(a);
		for (const a of t) {
			let t = 0,
				i = a.AttributeId;
			a.AttributeId > AttributeDefine_1.GREEN_ATTRIBUTE_INTERNAL &&
				(i -= AttributeDefine_1.GREEN_ATTRIBUTE_INTERNAL),
				(t = a.IsRatio
					? (o.GetBaseAttributeValueById(i) ?? 0) *
						(a.AttributeValue / AttributeDefine_1.TEN_THOUSANDTH_RATIO)
					: a.AttributeValue),
				e.has(i) ? ((r = e.get(i)), e.set(i, r + t)) : e.set(i, t);
		}
	}
	set CurrentSelectedFetter(t) {
		this.AVi = t;
	}
	get CurrentSelectedFetter() {
		return this.AVi;
	}
	GetFettersObtainDataList(t) {
		var e = new Array();
		for (const o of t) {
			if ((a = this.GetPhantomItemIdArrayByMonsterId(o)) && 0 !== a.length) {
				let t = 0;
				for (const e of a)
					if (
						0 <
						(t =
							ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
								e,
							))
					)
						break;
				var a = this.GetPhantomInstanceByItemId(a[0]),
					r =
						ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
							o,
						);
				(r = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(
					r.MonsterInfoId,
				)),
					(a = {
						Id: o,
						Name: a.PhantomItem.MonsterName,
						Icon: r,
						IsGet: 0 !== t,
					});
				e.push(a);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Phantom",
						28,
						"该怪物没有对应道具，请检查幻象道具表是否正确",
						["monsterId", o],
					);
		}
		return e;
	}
	SetPhantomRecommendData(t) {
		(this.PVi = new RecommendData()),
			(this.PVi.RoleId = t.l3n),
			(this.PVi.MonsterIdList = t.sUs),
			(this.PVi.MainPropId = t.aUs),
			(this.PVi.FetterGroupId = t.SDs);
	}
	get PhantomRecommendData() {
		return this.PVi;
	}
	CheckIfHasPhantomSatisfiedLevelCondition(t, e) {
		let a = [];
		if (
			0 !==
			(a =
				0 !== t
					? ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItemId(
							t,
						)
					: ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList())
				.length
		)
			for (const t of a) {
				var r =
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
						t.GetUniqueId(),
					);
				if (r && r.GetPhantomLevel() >= e) return !0;
			}
		return !1;
	}
	CheckIfHasPhantomLevelMax() {
		for (const t of this.GetPhantomBattleDataMap().values())
			if (this.GetPhantomMaxLevel(t.GetUniqueId()) === t.GetPhantomLevel())
				return !0;
		return !1;
	}
	CheckIfExistPhantomCanEquipInItemList(t) {
		for (const a of t) {
			var e =
				ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItemId(
					a,
				);
			if (0 === e.length) return !1;
			for (const t of e)
				if (!this.CheckPhantomIsEquip(t.GetUniqueId())) return !0;
		}
		return !1;
	}
	GetRecommendEquipUniqueIdList(t) {
		var e = [0, 0, 0, 0, 0];
		if (!this.PVi || this.PVi.RoleId === t) {
			var a = this.PVi ? this.PVi.MonsterIdList : [],
				r = this.PVi ? this.PVi.FetterGroupId : 0,
				o =
					(this.QVi(a, r, t),
					ModelManager_1.ModelManager.PhantomBattleModel.GetAllNotEquipPhantomList(
						t,
					));
			if (o) {
				var i = o?.length,
					n = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost(),
					s = e.length;
				for (let t = 0; t < s; t++) {
					var l = this.xVi[t];
					for (let a = 0; a < i; a++) {
						var h = o[a].GetUniqueId();
						if (!e.includes(h)) {
							var u = o[a].GetCost();
							if (
								!(l < u) &&
								ModelManager_1.ModelManager.PhantomBattleModel.XVi(e) + u <= n
							) {
								e[t] = h;
								break;
							}
						}
					}
				}
			}
		}
		return e;
	}
	GetAllNotEquipPhantomList(t) {
		var e,
			a = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
		if (0 !== a.length) {
			const r = new Array();
			for (const t of a)
				this.CheckPhantomIsEquip(t.GetUniqueId()) ||
					((e = this.GetPhantomBattleData(t.GetUniqueId())), r.push(e));
			return (
				ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t)
					.GetIncrIdList()
					.forEach((t) => {
						(t = this.GetPhantomBattleData(t)) && r.push(t);
					}),
				r.sort(this.NVi)
			);
		}
	}
	QVi(t, e, a) {
		(this.wVi = t), (this.BVi = []);
		var r = this.wVi.length;
		for (let t = r - 1; 0 <= t; t--)
			t !== r - 1 ? this.wVi.push(t) : this.wVi.push(1);
		(this.bVi = e),
			(this.GVi = this.GetBattleDataById(a).GetIncrIdList()),
			(this.qVi = []),
			this.GVi.forEach((t) => {
				this.qVi.push(
					void 0 !== this.GetPhantomDataBase(t)
						? this.GetPhantomDataBase(t).GetMonsterId()
						: 0,
				);
			});
	}
	GetPhantomItemNumByItemId(t) {
		var e = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
		if (0 === e.length) return 0;
		let a = 0;
		for (const r of e) r.GetConfigId() === t && a++;
		return a;
	}
	XVi(t) {
		let e = 0;
		return (
			t.forEach((t) => {
				(t = this.GetPhantomDataBase(t)) && (e += t.GetCost());
			}),
			e
		);
	}
	static FilterShowAttribute(t) {
		const e = new Array(),
			a = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"VisionMainViewShowAttribute",
			);
		return (
			t.forEach((t) => {
				a.includes(t.Id) && e.push(t);
			}),
			e
		);
	}
	GetCurrentViewShowPhantomList(t) {
		var e = t.IsTrialRole(),
			a = new Array();
		if (e) {
			var r = t.GetPhantomData().GetDataMap();
			for (let t = 0; t < 5; ++t) {
				var o = r.get(t);
				a.push(o);
			}
		} else {
			var i = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
					t.GetRoleId(),
				).GetIncrIdList(),
				n = i.length;
			for (let t = 0; t < n; t++) {
				var s =
					ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
						i[t],
					);
				a.push(s);
			}
		}
		return a;
	}
	GetSortedExpMaterialList(t, e) {
		return this.GetExpMaterialList(t, e, !0).sort(this.OVi);
	}
	GetExpMaterialList(t, e = 0, a = !1) {
		var r =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetLevelUpItemList(
					t,
				),
			o =
				ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByMainType(3);
		const i = [];
		for (const r of o) {
			if (9 === r.GetType()) {
				if (r.GetUniqueId() === t) continue;
				if (a && r.GetIsLock()) continue;
				if (0 < e && r.GetQuality() > e) continue;
				if (0 === this.GetPhantomBattleData(r.GetUniqueId()).GetPhantomLevel())
					continue;
				if (
					this.sVi.has(r.GetUniqueId()) &&
					0 !== this.sVi.get(r.GetUniqueId())
				)
					continue;
			}
			i.push(r);
		}
		return (
			r.forEach((t) => {
				var a =
						ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
							t.Id,
						),
					r = a.length;
				for (let t = 0; t < r; t++) {
					var o = a[t];
					(0 < e && o.GetQuality() > e) || i.push(o);
				}
			}),
			i
		);
	}
	GetIfSimpleState(t) {
		var e = LocalStorage_1.LocalStorage.GetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.IsSimpleDetail,
		);
		return !!e && !!e.has(t) && e.get(t);
	}
	SaveIfSimpleState(t, e) {
		let a = LocalStorage_1.LocalStorage.GetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.IsSimpleDetail,
		);
		(a = a || new Map()).set(t, e),
			LocalStorage_1.LocalStorage.SetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.IsSimpleDetail,
				a,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.ChangeVisionSimplyState,
			);
	}
	SaveVisionSkillState(t, e) {
		let a = LocalStorage_1.LocalStorage.GetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap,
		);
		(a = a || new Map()).set(t, e),
			LocalStorage_1.LocalStorage.SetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap,
				a,
			);
	}
	GetIfVisionSkillState(t) {
		var e = LocalStorage_1.LocalStorage.GetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap,
		);
		return !!e && !!e.has(t) && e.get(t);
	}
	CalculateExpBackItem(t) {
		var e =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList(),
			a = e.length;
		let r = t;
		var o = new Map();
		for (let t = a - 1; 0 <= t; t--) {
			var i = Math.floor(r / e[t].Exp);
			(r %= e[t].Exp), 0 < i && o.set(e[t].ItemId, i);
		}
		return o;
	}
	CheckVisionIdentifyRedDot(t) {
		var e;
		return (
			!!(t = this.GetPhantomDataBase(t)) &&
			((e = t.GetIfHaveUnIdentifySubProp()),
			(t = t.GetIfHaveEnoughIdentifyConsumeItem(1)),
			e) &&
			t
		);
	}
	CheckVisionOneKeyEquipRedDot(t) {
		if (!(t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)))
			return !1;
		var e,
			a,
			r = t.GetPhantomData().GetDataMap();
		let o = !0,
			i = 0;
		for ([e, a] of r) r.get(e) || (o = !1), (i += a ? a.GetCost() : 0);
		return (
			i !== ModelManager_1.ModelManager.PhantomBattleModel?.GetMaxCost() &&
			!o &&
			0 !== this.GetUnEquipVisionArray().length
		);
	}
	IsVisionHighQuality(t) {
		var e =
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpQualityLimit();
		return t.GetConfig().QualityId > e;
	}
	IsVisionHighLevel(t) {
		return (
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpLevelLimit() <
			t.GetPhantomLevel()
		);
	}
	IsVisionHighRare(t) {
		return (
			ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpRareLimit() <
			t.GetRareConfig().Rare
		);
	}
	get QualityUnlockTipsList() {
		return this.kVi;
	}
	CacheNewSkinData(t) {
		var e = new VisionUnlockQualityData();
		(e.SkinId = t),
			(e.MonsterItemId = t),
			(t =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
					t,
				).QualityId);
		(e.UnlockQuality = t),
			ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.push(
				e,
			);
	}
	CacheNewQualityData(t) {
		t.lUs.forEach((t) => {
			var e = new VisionUnlockQualityData(),
				a =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
						t,
					).QualityId;
			(e.MonsterItemId = t),
				(e.UnlockQuality = a),
				ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.push(
					e,
				);
		});
	}
	GetMainAttributeKey(t) {
		return this.GetSortMainAttributeMap().has(t)
			? this.GetSortMainAttributeMap().get(t)
			: this.GetSortMainPercentageAttributeMap().has(t)
				? this.GetSortMainPercentageAttributeMap().get(t)
				: 0;
	}
	GetSortMainAttributeMap() {
		return (
			this.TVi ||
				((this.TVi = new Map()),
				this.TVi.set(8, 10007),
				this.TVi.set(6, 10002),
				this.TVi.set(10, 10010),
				this.TVi.set(12, 8),
				this.TVi.set(13, 9),
				this.TVi.set(14, 35),
				this.TVi.set(15, 21),
				this.TVi.set(16, 22),
				this.TVi.set(17, 23),
				this.TVi.set(18, 24),
				this.TVi.set(19, 25),
				this.TVi.set(20, 26),
				this.TVi.set(21, 27),
				this.TVi.set(22, 11)),
			this.TVi
		);
	}
	GetSortMainPercentageAttributeMap() {
		return (
			this.LVi ||
				((this.LVi = new Map()),
				this.LVi.set(9, 10007),
				this.LVi.set(7, 10002),
				this.LVi.set(11, 10010)),
			this.LVi
		);
	}
	GetSubAttributeKey(t) {
		return this.GetSortSubAttributeMap().has(t)
			? this.GetSortSubAttributeMap().get(t)
			: this.GetSortSubPercentageAttributeMap().has(t)
				? this.GetSortSubPercentageAttributeMap().get(t)
				: 0;
	}
	GetSortSubAttributeMap() {
		return (
			this.DVi ||
				((this.DVi = new Map()),
				this.DVi.set(25, 2),
				this.DVi.set(23, 1),
				this.DVi.set(27, 3),
				this.DVi.set(29, 14),
				this.DVi.set(30, 15),
				this.DVi.set(32, 7),
				this.DVi.set(33, 8),
				this.DVi.set(34, 9),
				this.DVi.set(35, 10),
				this.DVi.set(36, 11),
				this.DVi.set(37, 12),
				this.DVi.set(38, 13),
				this.DVi.set(39, 16)),
			this.DVi
		);
	}
	GetSortSubPercentageAttributeMap() {
		return (
			this.RVi ||
				((this.RVi = new Map()),
				this.RVi.set(26, 5),
				this.RVi.set(24, 4),
				this.RVi.set(28, 6)),
			this.RVi
		);
	}
}
exports.PhantomBattleModel = PhantomBattleModel;
class PhantomSortStruct {
	constructor() {
		(this.PhantomPropId = 0), (this.Value = 0), (this.IfPercentage = !1);
	}
}
exports.PhantomSortStruct = PhantomSortStruct;
class RecommendData {
	constructor() {
		(this.RoleId = 0),
			(this.MonsterIdList = new Array()),
			(this.FetterGroupId = 0),
			(this.MainPropId = 0);
	}
}
exports.RecommendData = RecommendData;
class VisionUnlockQualityData {
	constructor() {
		(this.MonsterItemId = 0), (this.UnlockQuality = 0), (this.SkinId = 0);
	}
}
exports.VisionUnlockQualityData = VisionUnlockQualityData;
