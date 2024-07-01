"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CreatureModel = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Json_1 = require("../../../Core/Common/Json"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	BlueprintConfigByBlueprintType_1 = require("../../../Core/Define/ConfigQuery/BlueprintConfigByBlueprintType"),
	LevelEntityConfigByBlueprintType_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByBlueprintType"),
	LevelEntityConfigByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByMapIdAndEntityId"),
	PrefabConfigById_1 = require("../../../Core/Define/ConfigQuery/PrefabConfigById"),
	TemplateConfigByBlueprintType_1 = require("../../../Core/Define/ConfigQuery/TemplateConfigByBlueprintType"),
	TemplateConfigById_1 = require("../../../Core/Define/ConfigQuery/TemplateConfigById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntityHelper_1 = require("../../../Core/Entity/EntityHelper"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	IEntity_1 = require("../../../UniverseEditor/Interface/IEntity"),
	IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CreatureDensityContainer_1 = require("../Define/CreatureDensityContainer"),
	EntityContainer_1 = require("../Define/EntityContainer"),
	zero = 0n,
	ONE_HUNDRED = 100;
class CreatureModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.mvr = 0),
			(this.dvr = void 0),
			(this.zfr = void 0),
			(this.NUe = 0),
			(this.ScenePlayerDataMap = new Map()),
			(this.Cvr = zero),
			(this.xPr = new EntityContainer_1.EntityContainer()),
			(this.gvr = new Map()),
			(this.fvr = new Map()),
			(this.pvr = !1),
			(this.RemoveCreaturePendingSet = new Set()),
			(this.vvr = void 0),
			(this.Mvr = void 0),
			(this.Svr = void 0),
			(this.Evr = void 0),
			(this.yvr = void 0),
			(this.Ivr = void 0),
			(this.Tvr = void 0),
			(this.DelayRemoveContainer = new EntityContainer_1.EntityContainer()),
			(this.wPr = new EntityContainer_1.EntityContainer()),
			(this.GVs = new CreatureDensityContainer_1.CreatureDensityContainer()),
			(this.Rvr = new Set()),
			(this.Uvr = !1),
			(this.Avr = void 0),
			(this.Pvr = new Map()),
			(this.xvr = void 0),
			(this.EntityDisableHandleMap = new Map()),
			(this.ActorMovableHandleMap = new Map()),
			(this.DisableLock = new Set()),
			(this.EntitiesSortedList = []),
			(this.LeavingLevel = !1),
			(this.wvr = () => {
				for (const t of this.GetAllEntities())
					this.fvr.has(t.Id) ||
						this.fvr.set(
							t.Id,
							t.Entity.Disable("[CharacterModel.OnLoadMap] Loading"),
						);
				this.pvr = !0;
			}),
			(this.nye = () => {
				for (var [t, e] of ((this.pvr = !1), this.fvr))
					(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t)),
						t?.Valid && t.Entity.Enable(e, "CreatureModel.OnWorldDone");
				this.fvr.clear();
			}),
			(this.Gfr = (t) => {
				if (t) {
					for (const t of this.GetAllEntities())
						(Global_1.Global.BaseCharacter?.IsValid() &&
							Global_1.Global.BaseCharacter.EntityId === t.Id) ||
							t.Entity.GetComponent(0).GetEntityType() ===
								Protocol_1.Aki.Protocol.HBs.Proto_SceneItem ||
							this.fvr.has(t.Id) ||
							this.fvr.set(
								t.Id,
								t.Entity.Disable("CreatureModel.OnTeleportStart"),
							);
					this.pvr = !0;
				}
			}),
			(this.uht = () => {
				if (this.pvr) {
					for (var [t, e] of ((this.pvr = !1), this.fvr))
						(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t)),
							t?.Valid &&
								t.Entity.Enable(e, "CreatureModel.OnTeleportComplete");
					this.fvr.clear();
				}
			});
	}
	OnInit() {
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("World", 3, "是否启用DB", [
					"启用状态",
					PublicUtil_1.PublicUtil.UseDbConfig(),
				]),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AfterLoadMap,
				this.wvr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportStart,
				this.Gfr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			),
			!0
		);
	}
	OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AfterLoadMap,
				this.wvr,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportStart,
				this.Gfr,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			),
			!0
		);
	}
	AddEntity(t, e) {
		this.xPr.AddEntity(t, e), (t = this.GVs.GetItem(t)) && (t.EntityHandle = e);
	}
	AddLoadingEntity(t) {
		t?.Valid
			? this.pvr &&
				!this.fvr.has(t.Id) &&
				this.fvr.set(
					t.Id,
					t.Entity.Disable("[CreatureModel.AddEntity] LoadingWorld"),
				)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Entity", 3, "实体句柄无效。");
	}
	RemoveEntity(t, e) {
		var r = this.xPr.RemoveEntity(t);
		return (
			(e =
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Entity",
						3,
						"[实体生命周期:删除实体] 删除实体成功",
						["CreatureDataId", t],
						["Reason", e],
						["Result", r],
					),
				this.GVs.GetItem(t))) && (e.EntityHandle = void 0),
			r
		);
	}
	GetAllEntities() {
		return this.xPr.GetAllEntities();
	}
	Bvr(t, e, r) {
		if (!(t.length < 1) && e < r) {
			var i = t[Math.floor((e + r) / 2)];
			let a = e,
				o = r;
			for (var n; a <= o; ) {
				for (; t[a].Entity.DistanceWithCamera < i.Entity.DistanceWithCamera; )
					a++;
				for (; t[o].Entity.DistanceWithCamera > i.Entity.DistanceWithCamera; )
					o--;
				a <= o && ((n = t[a]), (t[a] = t[o]), (t[o] = n), a++, o--);
			}
			this.Bvr(t, e, o), this.Bvr(t, a, r);
		}
	}
	GetEntitiesInRange(t, e, r, i = !0) {
		if (EntityHelper_1.EntitySystemHelper.IsFilterDirty) {
			EntityHelper_1.EntitySystemHelper.IsFilterDirty = !1;
			let t = 0;
			for (let e = 0; e < this.EntitiesSortedList.length; e++) {
				var n = this.EntitiesSortedList[e];
				n.Valid && !n.Entity
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"EntityHandle的Valid为true,但Entity为undefined，逻辑存在严重漏洞",
							["EntityId", n.Id],
						)
					: n.Valid &&
						!n.Entity.GetComponent(0).GetRemoveState() &&
						(this.EntitiesSortedList[t++] = this.EntitiesSortedList[e]);
			}
			this.EntitiesSortedList.length = t;
		}
		EntityHelper_1.EntitySystemHelper.IsSortDirty &&
			EntityHelper_1.EntitySystemHelper.SortedFrame !== Time_1.Time.Frame &&
			((EntityHelper_1.EntitySystemHelper.IsSortDirty = !1),
			this.Bvr(this.EntitiesSortedList, 0, this.EntitiesSortedList.length - 1),
			(EntityHelper_1.EntitySystemHelper.SortedFrame = Time_1.Time.Frame));
		let a = 0,
			o = this.EntitiesSortedList.length - 1;
		for (var s; a <= o; ) {
			var l = Math.floor((a + o) / 2);
			this.EntitiesSortedList[l].Entity.DistanceWithCamera <= t
				? (a = l + 1)
				: (o = l - 1);
		}
		for (s = a, a = 0, o = s - 1; a <= o; ) {
			var y = Math.floor((a + o) / 2);
			this.EntitiesSortedList[y].Entity.DistanceWithCamera < 0
				? (a = y + 1)
				: (o = y - 1);
		}
		var d = a,
			E = void (i && (r.length = 0)),
			h = void 0;
		for (let t = d; t < s; t++)
			if ((E = (h = this.EntitiesSortedList[t]).Entity.GetComponent(0)))
				switch (e) {
					case 0:
						r.push(h);
						break;
					case 2:
						E.IsCharacter() && r.push(h);
						break;
					case 1:
						E.IsSceneItem() && r.push(h);
						break;
					case 3:
						(E.IsCharacter() || E.IsSceneItem()) && r.push(h);
						break;
					case 4:
						E.IsCustom() && r.push(h);
				}
	}
	GetEntitiesInRangeWithLocation(t, e, r, i, n = !0) {
		ControllerHolder_1.ControllerHolder.WorldController.GetEntitiesInRangeWithLocation(
			t.ToUeVector(),
			e,
			r,
			i,
			n,
		);
	}
	GetEntitiesWithTag(t, e) {
		e.length = 0;
		for (const r of this.GetAllEntities())
			r.Entity.GetComponent(0).ContainsTag(t) && e.push(r);
	}
	GetEntitiesWithPbDataId(t, e) {
		e.length = 0;
		for (const r of this.GetAllEntities())
			r.Entity.GetComponent(0).GetPbDataId() === t && e.push(r);
	}
	GetEntitiesWithOwnerId(t, e) {
		e.length = 0;
		for (const r of this.GetAllEntities())
			r.Entity.GetComponent(0).GetOwnerId() === t && e.push(r);
	}
	GetEntity(t) {
		return this.xPr.GetEntity(t);
	}
	GetEntityWithDelayRemoveContainer(t) {
		return this.DelayRemoveContainer.GetEntity(t);
	}
	ExistEntity(t) {
		return this.xPr.ExistEntity(t);
	}
	GetEntityById(t) {
		return this.xPr.GetEntityById(t);
	}
	GetCreatureDataId(t) {
		return (t = EntitySystem_1.EntitySystem.Get(t))
			? t.GetComponent(0).GetCreatureDataId()
			: 0;
	}
	GetEntityId(t) {
		return this.xPr.GetEntity(t)?.Id ?? 0;
	}
	GetEntityIdByPbDataId(t) {
		return (t = this.GetEntityByPbDataId(t)) ? t.Id : 0;
	}
	GetServerEntityId(t) {
		if ((t = EntitySystem_1.EntitySystem.Get(t)))
			return (
				(t = t.GetComponent(0)),
				MathUtils_1.MathUtils.NumberToLong(t.GetCreatureDataId())
			);
	}
	OnLeaveLevel() {
		for (var [, t] of this.ScenePlayerDataMap) t.Clear();
		return (
			this.ScenePlayerDataMap.clear(),
			this.RemoveCreaturePendingSet.clear(),
			this.DelayRemoveContainer.Clear(),
			this.wPr.Clear(),
			this.Rvr.clear(),
			this.Pvr.clear(),
			this.xPr.Clear(),
			this.GVs.Clear(),
			(this.vvr = void 0),
			(this.Mvr = void 0),
			!(this.Svr = void 0)
		);
	}
	GetWorldOwner() {
		return this.mvr;
	}
	SetWorldOwner(t) {
		this.mvr = t;
	}
	GetInstanceId() {
		return this.NUe;
	}
	SetInstanceId(t) {
		this.NUe = t;
	}
	GetPlayerId() {
		return ModelManager_1.ModelManager.PlayerInfoModel.GetId() || 0;
	}
	IsMyWorld() {
		return this.mvr === this.GetPlayerId();
	}
	IsWorldOwner(t) {
		return this.mvr === t;
	}
	GetScenePlayerData(t) {
		return this.ScenePlayerDataMap.get(t);
	}
	AddScenePlayerData(t, e) {
		this.ScenePlayerDataMap.set(t, e);
	}
	GetAllScenePlayers() {
		var t,
			e = new Array();
		for ([, t] of this.ScenePlayerDataMap) e.push(t);
		return e;
	}
	RemoveScenePlayerData(t) {
		var e = this.ScenePlayerDataMap.get(t);
		return e && e.Clear(), this.ScenePlayerDataMap.delete(t);
	}
	GetGameplayTagHash() {
		return this.Cvr;
	}
	SetGameplayTagHash(t) {
		this.Cvr = t;
	}
	SetSceneId(t) {
		this.dvr = t;
	}
	GetSceneId() {
		return this.dvr;
	}
	SetToken(t) {
		this.zfr = t;
	}
	GetToken() {
		return this.zfr;
	}
	AddRemoveCreaturePending(t) {
		return (
			!this.RemoveCreaturePendingSet.has(t) &&
			(this.RemoveCreaturePendingSet.add(t), !0)
		);
	}
	RemoveRemoveCreaturePending(t) {
		return this.RemoveCreaturePendingSet.delete(t);
	}
	ClearRemoveCreaturePending() {
		this.RemoveCreaturePendingSet.clear();
	}
	InitEntityDataConfig(t) {
		if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
			let i = "";
			var e = (0, puerts_1.$ref)(i);
			let n = (0, PublicUtil_1.getConfigPath)(
				IGlobal_1.globalConfig.LevelsDataDir + `/${t}/Level.json`,
			);
			if (
				(PublicUtil_1.PublicUtil.IsUseTempData() ||
					(n = (0, PublicUtil_1.getConfigPath)(
						IGlobal_1.globalConfigTemp.LevelsDataDir + `/${t}/Level.json`,
					)),
				UE.BlueprintPathsLibrary.FileExists(n))
			) {
				if (
					(UE.KuroStaticLibrary.LoadFileToString(e, n),
					!(i = (0, puerts_1.$unref)(e)))
				)
					return !1;
				i = i.trim();
				var r = Info_1.Info.IsBuildDevelopmentOrDebug;
				t = JSON.parse(i);
				this.vvr = new Map();
				for (const e of t.EntityDatas)
					(e.EdWpPath = void 0), r || (e.Name = ""), this.vvr.set(e.Id, e);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("World", 3, "不存在EntityConfigData配置文件。", [
						"Path",
						n,
					]);
		}
		return !0;
	}
	InitDynamicEntityDataConfig() {
		var t = (0, puerts_1.$ref)("");
		let e = (0, PublicUtil_1.getConfigPath)(
			"" + IGlobal_1.globalConfig.EntityDataConfigPath,
		);
		if (
			(PublicUtil_1.PublicUtil.IsUseTempData() ||
				(e = (0, PublicUtil_1.getConfigPath)(
					"" + IGlobal_1.globalConfigTemp.EntityDataConfigPath,
				)),
			!UE.BlueprintPathsLibrary.FileExists(e))
		)
			return !1;
		if (
			(UE.KuroStaticLibrary.LoadFileToString(t, e),
			!(t = (0, puerts_1.$unref)(t)))
		)
			return !1;
		var r = Info_1.Info.IsBuildDevelopmentOrDebug;
		t = JSON.parse(t);
		this.Mvr = new Map();
		for (const e of t.EntityDatas)
			(e.EdWpPath = void 0), r || (e.Name = ""), this.Mvr.set(e.Id, e);
		return !0;
	}
	bvr() {
		if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
			var t = (0, puerts_1.$ref)("");
			let i = (0, PublicUtil_1.getConfigPath)(
				IGlobal_1.globalConfig.BlueprintConfigPath,
			);
			if (
				(PublicUtil_1.PublicUtil.IsUseTempData() ||
					(i = (0, PublicUtil_1.getConfigPath)(
						IGlobal_1.globalConfigTemp.BlueprintConfigPath,
					)),
				UE.BlueprintPathsLibrary.FileExists(i))
			) {
				UE.KuroStaticLibrary.LoadFileToString(t, i);
				var e, r;
				(t = (0, puerts_1.$unref)(t)), (t = JSON.parse(t));
				for ([e, r] of Object.entries(t.BlueprintConfig)) this.Evr.set(e, r);
			}
		}
	}
	qvr(t = !1) {
		if (t || !PublicUtil_1.PublicUtil.UseDbConfig()) {
			(this.yvr = new Map()),
				(this.Tvr = new Map()),
				(t = (0, puerts_1.$ref)(""));
			let e = (0, PublicUtil_1.getConfigPath)(
				IGlobal_1.globalConfig.TemplateConfigPath,
			);
			if (
				(PublicUtil_1.PublicUtil.IsUseTempData() ||
					(e = (0, PublicUtil_1.getConfigPath)(
						IGlobal_1.globalConfigTemp.TemplateConfigPath,
					)),
				UE.BlueprintPathsLibrary.FileExists(e))
			) {
				UE.KuroStaticLibrary.LoadFileToString(t, e),
					(t = (0, puerts_1.$unref)(t));
				for (const e of JSON.parse(t).Templates)
					this.yvr.set(e.Id, e), this.Tvr.set(e.BlueprintType, e.Id);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[CreatureModel.InitEntityTemplateMap] 不存在Template.json文件。",
						["Path", e],
					);
		}
	}
	Gvr(t = !1) {
		if (t || !PublicUtil_1.PublicUtil.UseDbConfig()) {
			(this.Ivr = new Map()), (t = (0, puerts_1.$ref)(""));
			let r = (0, PublicUtil_1.getConfigPath)(
				IGlobal_1.globalConfig.PrefabConfigPath,
			);
			if (
				(PublicUtil_1.PublicUtil.IsUseTempData() ||
					(r = (0, PublicUtil_1.getConfigPath)(
						IGlobal_1.globalConfigTemp.PrefabConfigPath,
					)),
				UE.BlueprintPathsLibrary.FileExists(r))
			) {
				UE.KuroStaticLibrary.LoadFileToString(t, r),
					(t = (0, puerts_1.$unref)(t));
				for (const r of JSON.parse(t).Prefabs)
					if (r.Entities?.length) {
						let t = this.Ivr.get(r.PrefabId);
						t || ((t = new Map()), this.Ivr.set(r.PrefabId, t));
						for (const i of r.Entities) {
							var e = this.GetEntityTemplate(i.EntityData.BlueprintType);
							e
								? ((e = (0, IEntity_1.decompressEntityData)(i.EntityData, e)),
									t.set(i.EntityData.Id, e))
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Entity",
										3,
										"[CreatureModel.InitEntityPrefabMap] 不存在对应的Template。",
										["PrefabId", r.PrefabId],
										["Id", i.EntityData.Id],
										["BlueprintType", i.EntityData.BlueprintType],
									);
						}
					}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[CreatureModel.InitEntityPrefabMap] 不存在Prefab.json文件。",
						["Path", r],
					);
		}
	}
	Nvr() {
		this.Svr = new Map();
		let t = (0, PublicUtil_1.getConfigPath)(
			IGlobal_1.globalConfig.EntityOwnerConfigPath,
		);
		if (
			(PublicUtil_1.PublicUtil.IsUseTempData() ||
				(t = (0, PublicUtil_1.getConfigPath)(
					IGlobal_1.globalConfigTemp.EntityOwnerConfigPath,
				)),
			UE.BlueprintPathsLibrary.FileExists(t))
		) {
			var e = (0, puerts_1.$ref)("");
			e =
				(UE.KuroStaticLibrary.LoadFileToString(e, t),
				(e = (0, puerts_1.$unref)(e)),
				JSON.parse(e));
			for (const t of e) {
				let e = this.Svr.get(t.LevelId);
				e || ((e = new Map()), this.Svr.set(t.LevelId, e)),
					e.set(t.EntityId, t);
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					3,
					"[CreatureModel.InitEntityTemplateMap] 不存在EntityOwner.json文件。",
					["Path", t],
				);
	}
	GetEntityData(t) {
		var e;
		if (void 0 !== t)
			return !PublicUtil_1.PublicUtil.UseDbConfig() && this.vvr
				? this.vvr.get(t)
				: (t =
							LevelEntityConfigByMapIdAndEntityId_1.configLevelEntityConfigByMapIdAndEntityId.GetConfig(
								ModelManager_1.ModelManager.GameModeModel.MapId,
								t,
							))
					? (((e = {}).Id = t.EntityId),
						(e.BlueprintType = t.BlueprintType),
						(e.InSleep = t.InSleep),
						(e.AreaId = t.AreaId),
						(e.Transform = {}),
						Info_1.Info.IsBuildDevelopmentOrDebug && (e.Name = t.Name),
						(e.Transform.Pos = {
							X: t.Transform[0].X / 100,
							Y: t.Transform[0].Y / 100,
							Z: t.Transform[0].Z / 100,
						}),
						(e.Transform.Rot = {
							X: t.Transform[1].X / 100,
							Y: t.Transform[1].Y / 100,
							Z: t.Transform[1].Z / 100,
						}),
						(e.Transform.Scale = {
							X: t.Transform[2].X / 100,
							Y: t.Transform[2].Y / 100,
							Z: t.Transform[2].Z / 100,
						}),
						(e.ComponentsData = JSON.parse(t.ComponentsData)),
						e)
					: void 0;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Entity",
				3,
				"[CreatureModel.GetEntityData] pbDataId为undefined，外部调用的地方要保证这个参数不能为undefined",
			);
	}
	GetEntityDataByCreatureDataId(t) {
		if ((t = this.GetEntity(t)) && (t = this.GetPbDataIdByEntity(t)))
			return this.GetEntityData(t);
	}
	GetAllEntityIdOfBlueprintType(t) {
		if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
			if (void 0 === this.vvr) return [];
			const r = new Array();
			for (const i of this.vvr.keys()) {
				var e = this.vvr.get(i);
				e.BlueprintType === t && r.push(e.Id);
			}
			return r;
		}
		var r =
			LevelEntityConfigByBlueprintType_1.configLevelEntityConfigByBlueprintType.GetConfigList(
				t,
			);
		if (!r) return [];
		const i = new Array();
		for (const t of r) i.push(t.EntityId);
		return i;
	}
	GetDynamicEntityData(t) {
		if (this.Mvr) return this.Mvr.get(t);
	}
	GetEntityModel(t) {
		var e, r;
		return PublicUtil_1.PublicUtil.UseDbConfig()
			? (e =
					BlueprintConfigByBlueprintType_1.configBlueprintConfigByBlueprintType.GetConfig(
						t,
					))
				? (((r = {}).EntityType = e.EntityType),
					(r.EntityLogic = e.EntityLogic),
					(r.ModelId = e.ModelId),
					(r.HalfHeight = e.HalfHeight),
					r)
				: void 0
			: (this.Evr || ((this.Evr = new Map()), this.bvr()), this.Evr.get(t));
	}
	GetAllEntityTemplate(t = !1) {
		return this.yvr || this.qvr(t), this.yvr;
	}
	GetEntityTemplate(t) {
		if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
			this.yvr || this.qvr();
			let e = 0;
			return (e = "string" == typeof t ? this.Tvr.get(t) : t), this.yvr.get(e);
		}
		let e;
		if (
			(e = (
				"string" == typeof t
					? TemplateConfigByBlueprintType_1.configTemplateConfigByBlueprintType
					: TemplateConfigById_1.configTemplateConfigById
			).GetConfig(t))
		)
			return (
				((t = {}).Id = e.Id),
				(t.BlueprintType = e.BlueprintType),
				(t.Name = e.Name),
				(t.ComponentsData = JSON.parse(e.ComponentsData)),
				t
			);
	}
	GetEntityPrefab(t, e) {
		if (!PublicUtil_1.PublicUtil.UseDbConfig())
			return this.Ivr || this.Gvr(), this.Ivr.get(t)?.get(e);
		this.Ivr || (this.Ivr = new Map());
		let r = this.Ivr.get(t);
		if (r?.size) return r.get(e);
		var i = PrefabConfigById_1.configPrefabConfigById.GetConfig(t);
		if (i) {
			(r = new Map()), this.Ivr.set(t, r);
			for (const e of JSON.parse(i.Entities)) {
				var n = this.GetEntityTemplate(e.EntityData.BlueprintType);
				n
					? ((n = (0, IEntity_1.decompressEntityData)(e.EntityData, n)),
						r.set(e.EntityData.Id, n))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"[CreatureModel.GetEntityPrefab] 不存在对应的Template。",
							["PrefabId", t],
							["Id", e.EntityData.Id],
							["BlueprintType", e.EntityData.BlueprintType],
						);
			}
			return r.get(e);
		}
	}
	GetCompleteEntityData(t) {
		var e;
		if ((t = this.GetEntityData(t)))
			return (
				(e = this.GetEntityTemplate(t.BlueprintType)),
				(0, IEntity_1.decompressEntityData)(t, e)
			);
	}
	GetEntityOwner(t, e) {
		if (PublicUtil_1.PublicUtil.UseDbConfig()) {
			if (
				(this.Svr || (this.Svr = new Map()),
				this.Svr.get(t) || this.Svr.set(t, new Map()),
				!this.Svr.get(t).get(e))
			) {
				var r = t.toString() + "_" + e.toString();
				const i =
					ConfigManager_1.ConfigManager.EntityOwnerConfig.GetEntityOwnerConfig(
						r,
					);
				if (!i) return;
				(r = { LevelId: t, EntityId: e, Owner: JSON.parse(i.Owner) }),
					this.Svr.get(t).set(e, r);
			}
			const i = this.Svr.get(t).get(e);
			return 0 === i.Owner.length ? void 0 : i.Owner[0];
		}
		if ((this.Svr || this.Nvr(), (r = this.Svr.get(t)))) {
			const t = r.get(e);
			if (t && 0 !== t.Owner.length) return t.Owner[0];
		}
	}
	CheckSetPrefabEntity(t) {
		this.xPr.CheckSetPrefabEntity(t);
	}
	GetPbDataIdByEntity(t) {
		return (t = t && t.Entity.GetComponent(0)) ? t.GetPbDataId() : 0;
	}
	GetEntityByPbDataId(t) {
		return this.xPr.GetEntityByPbDataId(t);
	}
	GetIsLoadingScene() {
		return this.Uvr;
	}
	SetIsLoadingScene(t) {
		this.Uvr = t;
	}
	GetCreatureDataIdByPbDataId(t) {
		return this.xPr.GetCreatureDataIdByPbDataId(t);
	}
	AddDelayRemoveEntity(t, e) {
		return e.Valid
			? this.DelayRemoveContainer.ExistEntity(t)
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"World",
							3,
							"[CreatureModel.AddDelayRemoveEntity] 重复添加DelayRemoveEntityMap列表。",
							["CreatureDataId", t],
						),
					!1)
				: (this.DelayRemoveContainer.AddEntity(t, e),
					this.DelayRemoveContainer.CheckSetPrefabEntity(e),
					!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"[CreatureModel.AddDelayRemoveEntity] entity.Valid = false，添加到DelayRemoveEntityMap列表失败。",
						["CreatureDataId", t],
					),
				!1);
	}
	RemoveDelayRemoveEntity(t) {
		this.DelayRemoveContainer.RemoveEntity(t);
	}
	AddPendingRemoveEntity(t, e) {
		return e?.Valid
			? (this.wPr.AddEntity(t, e), this.wPr.CheckSetPrefabEntity(e), !0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"[CreatureModel.AddPendingRemoveEntity] entity.Valid = false，添加到PendingRemoveEntityQueue队列失败。",
						["CreatureDataId", t],
						["EntityId", e?.Id],
					),
				!1);
	}
	PopPendingRemoveEntity() {
		return this.wPr.PopEntity();
	}
	GetPendingRemoveEntity(t) {
		return this.wPr.GetEntity(t);
	}
	GetPendingRemoveEntityByPbDataId(t) {
		return this.wPr.GetEntityByPbDataId(t);
	}
	RemovePendingRemoveEntity(t) {
		return this.wPr.RemoveEntity(t);
	}
	PendingRemoveEntitySize() {
		return this.wPr.Size();
	}
	AddPreCreature(t) {
		return this.Rvr.add(t), !0;
	}
	RemovePreCreature(t) {
		return this.Rvr.delete(t);
	}
	SetRestoreEntityId(t) {
		this.Avr = t;
	}
	GetRestoreEntityId() {
		return this.Avr;
	}
	RecordEntitySilenceState(t, e) {
		this.Pvr.set(t, e);
	}
	CheckEntityVisible(t) {
		return (
			!!ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t) ||
			!this.Pvr.get(t)
		);
	}
	GetActorRefData() {
		if (this.xvr) return this.xvr;
		this.xvr = new Map();
		let t = "";
		if (
			((t = PublicUtil_1.PublicUtil.UseDbConfig()
				? UE.BlueprintPathsLibrary.ProjectContentDir() +
					"Aki/Config/Json/ActorRefConfig.json"
				: (0, PublicUtil_1.getConfigPath)(
						IGlobal_1.globalConfig.ActorRefConfigPath,
					)),
			UE.BlueprintPathsLibrary.FileExists(t))
		) {
			var e = (0, puerts_1.$ref)("");
			e =
				(UE.KuroStaticLibrary.LoadFileToString(e, t),
				(e = (0, puerts_1.$unref)(e)) ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("SceneItem", 7, "配置文件为空", ["filePath", t])),
				Json_1.Json.Parse(e));
			for (const t of e.LevelRefList) {
				var r = t.LevelPath;
				let e = this.xvr.get(r);
				e = e || new Map();
				for (const r of t.StreamingGroups) {
					var i = r.EntityId;
					let t = e.get(i);
					t = t || [];
					for (const e of r.RefData)
						("Desktop" === e.Platform && !GlobalData_1.GlobalData.IsSm5) ||
							("Mobile" === e.Platform && !GlobalData_1.GlobalData.IsEs3) ||
							t.push(e);
					e.set(i, t);
				}
				this.xvr.set(r, e);
			}
			return this.xvr;
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("SceneItem", 7, "检查配置文件是否存在", ["filePath", t]);
	}
	GetEntityByChildActor(t) {
		if ((t = this.GetEntityActorByChildActor(t)))
			return this.GetEntityById(t.GetEntityId());
	}
	GetEntityActorByChildActor(t) {
		let e = t;
		for (
			;
			e &&
			!UE.KuroStaticLibrary.IsImplementInterface(
				e.GetClass(),
				UE.BPI_CreatureInterface_C.StaticClass(),
			);
		)
			e = e.GetAttachParentActor();
		if (e && ((t = e), this.GetEntityById(t.GetEntityId())?.Valid)) return e;
	}
	GetOwnerEntity(t) {
		if ((t = this.gvr.get(t))) return t[0];
	}
	AddOwnerEntityInfo(t) {
		var e = this.xPr.GetEntity(t)?.Entity?.GetComponent(0),
			r = e?.GetBaseInfo()?.ChildEntityIds;
		if (r) {
			var i = e.GetPbDataId();
			for (const e of r) {
				let r = this.gvr.get(e);
				if (r) {
					if (r[0] !== i) {
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"World",
								51,
								"子实体具有与记录不同的父实体",
								["CreatureId", t],
								["ChildPbDataId", e],
								["OwnerPbDataId", r[0]],
								["RefCount", r[1]],
							);
						continue;
					}
					r[1]++;
				} else (r = [i, 1]), this.gvr.set(e, r);
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"World",
						51,
						"添加实体Owner信息",
						["CreatureId", t],
						["ChildPbDataId", e],
						["OwnerPbDataId", r[0]],
						["RefCount", r[1]],
					);
			}
		}
	}
	RemoveOwnerEntityInfo(t) {
		var e = this.xPr
			.GetEntity(t)
			?.Entity?.GetComponent(0)
			?.GetBaseInfo()?.ChildEntityIds;
		if (e)
			for (const i of e) {
				var r = this.gvr.get(i);
				r &&
					(0 == --r[1] && this.gvr.delete(i), Log_1.Log.CheckDebug()) &&
					Log_1.Log.Debug(
						"World",
						51,
						"移除实体Owner信息",
						["CreatureId", t],
						["ChildPbDataId", i],
						["OwnerPbDataId", r[0]],
						["RefCount", r[1]],
					);
			}
	}
	GetOrAddDensityItem(t, e) {
		var r,
			i = this.GVs.GetItem(t);
		if (i) return i;
		let n = 0;
		return (
			2 === e.bvs
				? (n = 2)
				: 1 === e.bvs &&
					((i = e.R5n),
					(r =
						ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(i))
						? (n =
								(r = (0, IComponent_1.getComponent)(
									r.ComponentsData,
									"BaseInfoComponent",
								)) && void 0 !== r.LowerNpcDensity
									? r.LowerNpcDensity
									: 1)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"World",
								6,
								"不存在的pbDataId",
								["creatureDataID", t],
								["pbDataId", i],
							)),
			this.GVs.AddItem(t, n, e)
		);
	}
	RemoveDensityItem(t) {
		var e = this.GVs.GetItem(t);
		return this.GVs.RemoveItem(t), e;
	}
	GetDensityLevelGroup(t) {
		return this.GVs.GetLevel(t);
	}
}
exports.CreatureModel = CreatureModel;
