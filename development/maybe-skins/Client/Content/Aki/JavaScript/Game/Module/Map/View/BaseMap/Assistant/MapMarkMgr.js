"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapMarkMgr = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	GeneralLogicTreeUtil_1 = require("../../../../GeneralLogicTree/GeneralLogicTreeUtil"),
	TrackController_1 = require("../../../../Track/TrackController"),
	WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine"),
	MapController_1 = require("../../../Controller/MapController"),
	MapDefine_1 = require("../../../MapDefine"),
	MapUtil_1 = require("../../../MapUtil"),
	CustomMarkItem_1 = require("../../../Marks/MarkItem/CustomMarkItem"),
	PlayerMarkItem_1 = require("../../../Marks/MarkItem/PlayerMarkItem"),
	TeleportMarkItem_1 = require("../../../Marks/MarkItem/TeleportMarkItem"),
	MarkItemUtil_1 = require("../../../Marks/MarkItemUtil");
class MapMarkMgr {
	constructor(e, t, i, r) {
		(this.tRi = void 0),
			(this.iRi = new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper()),
			(this.oRi = new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper()),
			(this.MapType = 2),
			(this.rRi = new Map()),
			(this.nRi = new Map()),
			(this.sRi = new Set()),
			(this.aRi = new Set()),
			(this.hRi = new Map()),
			(this.lRi = 1),
			(this._Ri = 0),
			(this.uRi = (e) => {
				this.cRi(e);
			}),
			(this.mRi = (e) => {
				this.dRi(e);
			}),
			(this.CreateDynamicMark = (e) => {
				if (
					e.MapId === this._Ri &&
					(e = MarkItemUtil_1.MarkItemUtil.Create(
						e,
						this.MapType,
						this.lRi,
						this.tRi,
					))
				)
					return this.AddMarkItem(e.MarkType, e), e;
			}),
			(this.CRi = (e, t, i) => {
				(t = this.GetMarkItem(e, t)) &&
					t instanceof CustomMarkItem_1.CustomMarkItem &&
					(t.SetConfigId(i), t.IsTracked) &&
					(this.gRi(e, t.MarkId, !1), this.gRi(e, t.MarkId, !0));
			}),
			(this.fRi = (e, t) => {
				var i = this.GetMarkItem(e, t);
				i &&
					(this.gRi(e, i.MarkId, !1),
					this.hRi.has(t) && this.hRi.delete(t),
					void 0 !== (i = this.RemoveMarkItem(e, t))) &&
					i.Destroy();
			}),
			(this.gRi = (e, t, i, r = !1) => {
				var a;
				(e = this.GetMarkItem(e, t)) &&
					((a = ModelManager_1.ModelManager.TrackModel.IsTracking(
						e.TrackSource,
						t,
					)),
					(!r && a === i) ||
						(i
							? (TrackController_1.TrackController.StartTrack({
									TrackSource: e.TrackSource,
									Id: t,
									IconPath: e.IconPath,
									TrackTarget: e.TrackTarget,
								}),
								this.sRi.add(e))
							: (TrackController_1.TrackController.EndTrack(e.TrackSource, t),
								this.aRi.add(e),
								this.sRi.delete(e))));
			}),
			(this.Qdt = (e) => {
				(e = this.GetMarkItem(0, e.Id)) &&
					!e.IsTracked &&
					e.LogicUpdate(
						GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
					),
					((e && e.View) ?? e?.IsTracked) && this.sRi.add(e);
			}),
			(this.Xdt = (e) => {
				(e = this.GetMarkItem(0, e.Id)) &&
					e.View &&
					(this.sRi.delete(e), this.aRi.add(e));
			}),
			(this._Qt = () => {
				this.sRi.clear();
			}),
			(this.pRi = (e) => {
				var t = this.GetMarkItemsByType(11);
				t && 0 < t.size && this.vRi(11), this.MRi(e);
			}),
			(this.uDi = (e) => {
				let t = this.GetMarkItem(5, e);
				(t = t || this.GetMarkItem(6, e)) &&
					t instanceof TeleportMarkItem_1.TeleportMarkItem &&
					t.IsTracked &&
					MapController_1.MapController.RequestTrackMapMark(
						t.MarkType,
						t.MarkId,
						!1,
					);
			}),
			(this.Jpe = (e, t, i) => {
				var r = t.Entity.GetComponent(0),
					a = r.GetPbEntityInitData(),
					n = r.GetEntityConfigType();
				n === Protocol_1.Aki.Protocol.USs.Proto_OldEntity ||
					n === Protocol_1.Aki.Protocol.USs.Proto_Character ||
					MapUtil_1.MapUtil.IsTemporaryTeleportEntity(a) ||
					((n = r.GetBaseInfo())?.MapIcon && this.SRi(n.MapIcon, t.Id, i));
			}),
			(this.zpe = (e, t) => {
				this.hRi.has(t.Id) && this.hRi.delete(t.Id),
					this.RemoveMarkItem(7, t.Id)?.Destroy();
			}),
			(this.MapType = e),
			(this.lRi = r),
			(this.tRi = t),
			(this._Ri =
				2 === e
					? MapDefine_1.BIG_WORLD_MAP_ID
					: ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
							.MapConfigId);
	}
	Initialize() {
		this.dde();
	}
	Dispose() {
		this.Cde(), this.vRi();
	}
	OnMapSetup() {
		for (var [, e] of (this.vRi(),
		this.ERi(),
		this.yRi(),
		this.MRi(ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers()),
		this.rRi))
			for (var [, t] of e)
				t.IsTracked &&
					12 !== t.MarkType &&
					ModelManager_1.ModelManager.MapModel.SetCurTrackMark([
						t.MarkType,
						t.MarkId,
					]);
	}
	IRi(e) {
		var t = Math.floor(Math.round(0.01 * e.X) / MapDefine_1.MARK_SCOPE);
		e = Math.floor(Math.round(0.01 * e.Y) / MapDefine_1.MARK_SCOPE);
		return t * MapDefine_1.MARK_HASH_XY_PANDING + e;
	}
	dde() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.MapReplaceMarkResponse,
			this.CRi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CreateMapMark,
				this.CreateDynamicMark,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveMapMark,
				this.fRi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TrackMapMark,
				this.gRi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TrackMark,
				this.Qdt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UnTrackMark,
				this.Xdt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ClearTrackMark,
				this._Qt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ScenePlayerChanged,
				this.pRi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UnlockTeleport,
				this.uDi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AddEntity,
				this.Jpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnMarkItemViewCreate,
				this.uRi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnMarkItemViewDestroy,
				this.mRi,
			);
	}
	Cde() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.MapReplaceMarkResponse,
			this.CRi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CreateMapMark,
				this.CreateDynamicMark,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveMapMark,
				this.fRi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TrackMapMark,
				this.gRi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TrackMark,
				this.Qdt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ClearTrackMark,
				this._Qt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ScenePlayerChanged,
				this.pRi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UnlockTeleport,
				this.uDi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AddEntity,
				this.Jpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UnTrackMark,
				this.Xdt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnMarkItemViewCreate,
				this.uRi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnMarkItemViewDestroy,
				this.mRi,
			);
	}
	vRi(e) {
		if (e) {
			if ((e = this.rRi.get(e))) {
				for (var [, t] of e)
					this.hRi.delete(t.MarkId),
						this.RemoveMarkItem(t.MarkType, t.MarkId),
						t.Destroy();
				e.clear();
			}
		} else {
			for (var [, i] of this.rRi)
				for (var [, r] of i) this.hRi.delete(r.MarkId), r.Destroy();
			this.rRi.clear(),
				this.sRi.clear(),
				this.nRi.clear(),
				this.iRi.ClearData(),
				this.oRi.ClearData();
		}
	}
	TRi(e) {
		var t,
			i = e.WorldPosition;
		i &&
			((i = this.IRi(i)),
			(t = this.nRi.get(i))
				? t.add(e)
				: ((t = new Set().add(e)), this.nRi.set(i, t)),
			(e.GridId = i));
	}
	LRi(e) {
		var t = e.GridId;
		(t = this.nRi.get(t)) && t.delete(e);
	}
	AddMarkItem(e, t) {
		if (t) {
			let i = this.GetMarkItemsByType(e);
			i || ((i = new Map()), this.rRi.set(e, i)),
				i.set(t.MarkId, t),
				this.TRi(t);
		}
	}
	RemoveMarkItem(e, t) {
		if ((e = this.GetMarkItemsByType(e)) && 0 !== e.size) {
			var i = e.get(t);
			if ((e.delete(t), this.hRi.delete(t), i))
				return (
					this.LRi(i),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Map", 50, "移除标记_MarkMgr", ["MarkId", t]),
					i
				);
		}
	}
	DRi(e, t, i) {
		var r = e.Holder;
		r &&
			this.MapType === r.MapType &&
			void 0 !== t &&
			e.GetRootItem() &&
			(e.GetRootItem().SetUIParent(t),
			e.SetScale(this.lRi),
			(t = i.AddMarkItem(r.MarkType, r.ShowPriority)),
			e.GetRootItem().SetHierarchyIndex(t));
	}
	RRi(e, t, i) {
		var r = e.Holder;
		r &&
			this.MapType === r.MapType &&
			e.GetRootItem() &&
			t === e.GetRootItem().GetParentAsUIItem() &&
			(i.RemoveMarkItem(e.Holder.MarkType, e.Holder.ShowPriority),
			e.SetScale(this.lRi));
	}
	cRi(e) {
		this.DRi(e, this.tRi, this.iRi);
	}
	dRi(e) {
		this.RRi(e, this.tRi, this.iRi);
	}
	GetMarkItemsByType(e) {
		return this.rRi.get(e);
	}
	GetMarkItem(e, t) {
		if (0 === e) {
			let e;
			for (const [, i] of this.GetAllMarkItems()) if ((e = i.get(t))) break;
			return e;
		}
		const i = this.GetMarkItemsByType(e);
		if (i) return i.get(t);
	}
	GetAllMarkItems() {
		return this.rRi;
	}
	GetAllMarkItemsByMapId(e) {
		var t,
			i,
			r = new Map();
		for ([t, i] of this.rRi)
			for (var [a, n] of i)
				if (n.MapId === e) {
					let e = r.get(t);
					e || ((e = new Map()), r.set(t, e)), e.set(a, n);
				}
		return r;
	}
	GetMarkItemsByClickPosition(e) {
		(e = MapUtil_1.MapUtil.UiPosition2WorldPosition(e)), (e = this.IRi(e));
		var t = [];
		for (const r of this.URi(e)) {
			var i = this.nRi.get(r);
			i && t.push(...i);
		}
		return t;
	}
	URi(e) {
		return new Set([
			e,
			e + MapDefine_1.MARK_HASH_XY_PANDING,
			e - MapDefine_1.MARK_HASH_XY_PANDING,
			e + 1,
			e - 1,
			e + MapDefine_1.MARK_HASH_XY_PANDING - 1,
			e + MapDefine_1.MARK_HASH_XY_PANDING + 1,
			e - MapDefine_1.MARK_HASH_XY_PANDING - 1,
			e + 1,
		]);
	}
	UpdateNearbyMarkItem(e, t, i) {
		e = this.IRi(e);
		var r,
			a = this.URi(e);
		for (const e of a) {
			const t = this.nRi.get(e);
			if (t)
				for (const e of t)
					this.hRi.has(e.MarkId) ||
						e instanceof PlayerMarkItem_1.PlayerMarkItem ||
						this.hRi.set(e.MarkId, e);
		}
		const n = this.GetMarkItemsByType(11);
		if (n) for (var [, s] of n) this.hRi.set(s.MarkId, s);
		for ([, r] of this.hRi)
			t(r), r.IsCanShowView || (this.aRi.add(r), this.hRi.delete(r.MarkId));
		for (const e of this.sRi) t(e);
		if (0 !== this.aRi.size) {
			for (const e of this.aRi) {
				var o = e.GridId;
				a.has(o) ||
					(e.LogicUpdate(
						GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
					),
					i(e));
			}
			this.aRi.clear();
		}
		for (const e of a) {
			var M = this.nRi.get(e);
			if (M) for (const e of M) t(e);
		}
	}
	ERi() {
		let e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMarks(this._Ri);
		0 === e.length &&
			this._Ri !== MapDefine_1.BIG_WORLD_MAP_ID &&
			2 === this.MapType &&
			((this._Ri = MapDefine_1.BIG_WORLD_MAP_ID),
			(e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMarks(this._Ri)));
		for (const i of e) {
			var t;
			1 !== i.MarkId &&
				((t = MarkItemUtil_1.MarkItemUtil.CreateConfigMark(
					i.MarkId,
					i,
					this.MapType,
					this.lRi,
					this.tRi,
				)),
				this.AddMarkItem(i.ObjectType, t));
		}
		var i, r;
		for ([
			i,
			r,
		] of ModelManager_1.ModelManager.MapModel.GetEntityPendingList()) {
			var a = EntitySystem_1.EntitySystem.Get(i);
			a
				? ((a = a.GetComponent(1)?.Owner), this.SRi(r, i, a))
				: Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Map", 50, "找不到实体对象", [
						"实体ID",
						i.toString(),
					]);
		}
	}
	yRi() {
		for (const e of ModelManager_1.ModelManager.MapModel.GetAllDynamicMarks().values())
			for (const t of e.values())
				t.MapId === this._Ri && this.CreateDynamicMark(t);
	}
	MRi(e) {
		if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel())
			for (const i of e) {
				var t;
				i.GetPlayerId() !==
					ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
					((t =
						ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(
							i.GetPlayerId(),
						)?.PlayerNumber ?? 1),
					(t = new MapDefine_1.PlayerMarkCreateInfo(
						i.GetPlayerId(),
						t,
						i.GetLocation().ToUeVector(),
					)),
					(t = MarkItemUtil_1.MarkItemUtil.Create(
						t,
						this.MapType,
						this.lRi,
						this.tRi,
					)),
					this._Ri === MapDefine_1.BIG_WORLD_MAP_ID && (t.IsInAoiRange = !0),
					this.AddMarkItem(11, t));
			}
	}
	SRi(e, t, i) {
		ObjectUtils_1.ObjectUtils.IsValid(i) &&
			((t = MarkItemUtil_1.MarkItemUtil.CreateEntityMark(
				t,
				e,
				this.tRi,
				i,
				this.MapType,
				this.lRi,
			)),
			this.AddMarkItem(7, t));
	}
}
exports.MapMarkMgr = MapMarkMgr;
