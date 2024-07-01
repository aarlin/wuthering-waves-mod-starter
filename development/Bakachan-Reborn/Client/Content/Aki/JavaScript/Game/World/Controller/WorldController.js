"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldController = void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	EntityVoxelInfoByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/EntityVoxelInfoByMapIdAndEntityId"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
	Net_1 = require("../../../Core/Net/Net"),
	TickSystem_1 = require("../../../Core/Tick/TickSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil"),
	ActorUtils_1 = require("../../Utils/ActorUtils"),
	VoxelUtils_1 = require("../../Utils/VoxelUtils"),
	WorldModel_1 = require("../Model/WorldModel"),
	AttachToActorController_1 = require("./AttachToActorController"),
	DELTA_TIME_LIMIT_LOW = 20,
	DELTA_TIME_LIMIT_HIGH = 25,
	MIN_DELTA = 0,
	MAX_DELTA = 0,
	SCHEDULER_MINUS_FRAME_COUNT = 5,
	DEFAULT_ENVIRONMENTTYPE = 255,
	WP_WORLD_ID = 8,
	IOS_STREAMING_POOL_SIZE = 250,
	IOS_STREAMING_POOL_SIZE_FOR_MESHES = 250,
	IOS_STREAMING_POOL_SIZE_IN_LOADING = 90,
	IOS_STREAMING_POOL_SIZE_FOR_MESHES_IN_LOADING = 90;
class WorldController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		var e;
		return (
			(ModelManager_1.ModelManager.WorldModel.CurrentSchedulerDelta = 0),
			GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen &&
				((e = GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
					.GetCurrentQualityInfo()
					.GetFrameRate()),
				GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetMaximumFrameRate(
					e,
				)),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SettingFrameRateChanged,
				this.z0i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.qfr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLeaveOnlineWorld,
				this.hJe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangePerformanceLimitMode,
				this.Z0i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportStart,
				this.Gfr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			),
			Net_1.Net.Register(11260, WorldController.Vxn),
			TickSystem_1.TickSystem.Add(this.Hlr.bind(this), "WorldController", 2),
			(this.Nfr = TimerSystem_1.TimerSystem.Forever(
				this.Ofr,
				18e5,
				1,
				void 0,
				"WorldController.OnInit.MemoryGcCheck",
				!1,
			)),
			!0
		);
	}
	static OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SettingFrameRateChanged,
				this.z0i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.qfr,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLeaveOnlineWorld,
				this.hJe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChangePerformanceLimitMode,
				this.Z0i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportStart,
				this.Gfr,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			),
			Net_1.Net.UnRegister(11260),
			!(ModelManager_1.ModelManager.WorldModel.ControlPlayerLastLocation =
				void 0)
		);
	}
	static ManuallyGarbageCollection(e) {
		var t;
		0 === this.hVs &&
			((this.hVs = 1), "Android" === UE.GameplayStatics.GetPlatformName()) &&
			(t = UE.KuroStaticLibrary.GetDeviceCPU()).includes("SDM660") &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("World", 31, "Disable ManuallyGarbageCollection", [
					"cpu",
					t,
				]),
			(this.hVs = 2)),
			1 === this.hVs &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("World", 25, "ManuallyGarbageCollection", [
						"Reason: ",
						e,
					]),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.TestManuallyGarbageCollection,
				),
				global.memoryPressureNotification());
	}
	static ManuallyClearStreamingPool() {
		1 === ModelManager_1.ModelManager.PlatformModel.PlatformType &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("World", 37, "ManuallyClearStreamingPool In IOS"),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Streaming.PoolSize 90",
			),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Streaming.PoolSizeForMeshes 90",
			));
	}
	static ManuallyResetStreamingPool() {
		1 === ModelManager_1.ModelManager.PlatformModel.PlatformType &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("World", 37, "ManuallyResetStreamingPool In IOS"),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Streaming.PoolSize 250",
			),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Streaming.PoolSizeForMeshes 250",
			));
	}
	static Hlr() {
		if (!GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
			var e = ModelManager_1.ModelManager.WorldModel;
			if (Time_1.Time.DeltaTime <= 25 && Time_1.Time.DeltaTime >= 20)
				e.ChangeSchedulerLastType = 0;
			else if (Time_1.Time.DeltaTime > 25 && e.CurrentSchedulerDelta > 0) {
				if (1 !== e.ChangeSchedulerLastType)
					(e.ChangeSchedulerLastType = 1),
						(e.ChangeSchedulerDeltaFrameCount = 0);
				else if (++e.ChangeSchedulerDeltaFrameCount >= 5) {
					--e.CurrentSchedulerDelta, (e.ChangeSchedulerDeltaFrameCount = 0);
					for (const t of ModelManager_1.ModelManager.WorldModel
						.TickIntervalSchedulers)
						t.SetCountDelta(e.CurrentSchedulerDelta);
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("World", 6, "Decrease max tick count", [
							"Delta",
							e.CurrentSchedulerDelta,
						]);
				}
			} else if (Time_1.Time.DeltaTime < 20 && e.CurrentSchedulerDelta < 0)
				if (2 !== e.ChangeSchedulerLastType)
					(e.ChangeSchedulerLastType = 2),
						(e.ChangeSchedulerDeltaFrameCount = 0);
				else if (10 <= ++e.ChangeSchedulerDeltaFrameCount) {
					++e.CurrentSchedulerDelta, (e.ChangeSchedulerDeltaFrameCount = 0);
					for (const t of ModelManager_1.ModelManager.WorldModel
						.TickIntervalSchedulers)
						t.SetCountDelta(e.CurrentSchedulerDelta);
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("World", 6, "Increase max tick count", [
							"Delta",
							e.CurrentSchedulerDelta,
						]);
				}
			for (const e of ModelManager_1.ModelManager.WorldModel
				.TickIntervalSchedulers)
				e.Schedule();
		}
		this.kfr(), this.Ffr();
	}
	static kfr() {
		var e = ModelManager_1.ModelManager.CreatureModel;
		e.PendingRemoveEntitySize() && this.Vfr(e.PopPendingRemoveEntity());
	}
	static Vfr(e) {
		var t, r, o, a, n;
		e
			? Global_1.Global.WorldEntityHelper
				? ((t =
						AttachToActorController_1.AttachToActorController.DetachActorsBeforeDestroyEntity(
							e,
						)),
					(r = e.Entity.GetComponent(1)?.Owner),
					(o = e.Entity.GetComponent(0).GetCreatureDataId()),
					(a = Global_1.Global.WorldEntityHelper.Destroy(e)),
					(n =
						AttachToActorController_1.AttachToActorController.DetachActorsAfterDestroyEntity(
							e.Id,
						)),
					a
						? ModelManager_1.ModelManager.WorldModel.AddDestroyActor(o, e.Id, r)
						: this.DestroyEntityActor(o, e.Id, r, !1),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Entity",
							3,
							"[实体生命周期:删除实体] DestroyEntity结束",
							["CreatureDataId", o],
							["EntityId", e.Id],
							["EntitySystem.DestroyEntity结果", a],
							["BeforDetachActors", t],
							["AfterDetachActors", n],
						))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[WorldController.DestroyEntity] WorldEntityHelper无效",
					)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					3,
					"[WorldController.DestroyEntity] handle参数无效",
				);
	}
	static Ffr() {
		var e = ModelManager_1.ModelManager.WorldModel;
		0 !== e.DestroyActorQueue.Size &&
			((e = e.PopDestroyActor()), GlobalData_1.GlobalData.World?.IsValid()) &&
			(ModelManager_1.ModelManager.WorldModel.RemoveIgnore(e[2]),
			this.DestroyEntityActor(e[0], e[1], e[2]));
	}
	static DoLeaveLevel() {
		if (GlobalData_1.GlobalData.World?.IsValid()) {
			for (
				var e = ModelManager_1.ModelManager.CreatureModel;
				e.PendingRemoveEntitySize();
			)
				this.Vfr(e.PopPendingRemoveEntity());
			for (
				var t = ModelManager_1.ModelManager.WorldModel;
				t.DestroyActorQueue.Size;
			) {
				var r = t.PopDestroyActor();
				this.DestroyEntityActor(r[0], r[1], r[2]);
			}
			t.ClearIgnore();
		}
	}
	static SetActorDataByCreature(e, t) {
		this.Hfr(e), this.SetActorLocationAndRotation(e, t), this.jfr(e, t);
	}
	static Hfr(e) {
		var t = e.Entity,
			r = e.GetEntityType();
		r !== Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
			((r =
				(e =
					e.GetPlayerId() ===
					ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) ||
				r === Protocol_1.Aki.Protocol.HBs.Proto_Npc),
			t.GetComponent(1).SetAutonomous(e, r));
	}
	static SetActorLocationAndRotation(e, t) {
		var r, o;
		t &&
			((r = e.GetLocation()),
			(e = e.GetRotation()),
			(o = (0, puerts_1.$ref)(new UE.HitResult())),
			t.K2_SetActorLocationAndRotation(r, e, !1, o, !0),
			ActorUtils_1.ActorUtils.GetEntityByActor(t)?.Entity?.GetComponent(161)
				?.CharacterMovement) &&
			ActorUtils_1.ActorUtils.GetEntityByActor(t)
				.Entity.GetComponent(161)
				.CharacterMovement.AddReplayData(
					(0, puerts_1.$ref)(r),
					(0, puerts_1.$ref)(e),
					(0, puerts_1.$ref)(Vector_1.Vector.ZeroVector),
					(0, puerts_1.$ref)(Vector_1.Vector.ZeroVector),
					0,
					0,
				);
	}
	static jfr(e, t) {
		if (t && void 0 !== (e = e.GetPublicTags()))
			for (const o of e) {
				var r = FNameUtil_1.FNameUtil.GetDynamicFName(o);
				t.Tags.Add(r);
			}
	}
	static DestroyEntityActor(e, t, r, o = !0) {
		return (
			(r = this.DestroyActor(r, o)),
			(o =
				AttachToActorController_1.AttachToActorController.CheckAttachError(t)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					3,
					"[实体生命周期:删除实体] 删除实体Actor",
					["CreatureDataId", e],
					["Result", r],
					["AttachSuccess", o],
				),
			r
		);
	}
	static DestroyActor(e, t = !0) {
		if (!e?.IsValid()) return !1;
		if (!e.GetWorld()?.IsValid()) return !1;
		let r;
		e.IsA(UE.Pawn.StaticClass()) && (r = e.Controller);
		let o = !1,
			a = 0;
		for (
			UE.KuroStaticLibrary.IsImplementInterface(
				e.GetClass(),
				UE.BPI_CreatureInterface_C.StaticClass(),
			) && ((o = !0), (a = e.GetEntityId())),
				this.Wfr.length = 0,
				this.Kfr(e, this.Wfr, !0);
			this.Wfr.length;
		) {
			var n = this.Wfr.pop();
			n?.IsValid() &&
				n.GetWorld()?.IsValid() &&
				n !== r &&
				!ModelManager_1.ModelManager.AttachToActorModel.GetEntityIdByActor(n) &&
				(n.K2_DetachFromActor(1, 1, 1),
				n.IsA(UE.TsEffectActor_C.StaticClass())
					? n.StopEffect(
							"[WorldController.DestroyActor] 销毁entity的actor前先停止所有附加的特效",
							!0,
						)
					: n.IsA(UE.KuroEntityActor.StaticClass()) ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"World",
								3,
								"存在未Detach的Actor",
								["是否是实体Actor", o],
								["EntityId", a],
								["父Actor", e.GetName()],
								["子Actor", n.GetName()],
							)));
		}
		return t ? ActorSystem_1.ActorSystem.Put(e) : e.K2_DestroyActor(), !0;
	}
	static Kfr(e, t, r) {
		if (e?.IsValid()) {
			r || t.push(e);
			r = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
			var o = (e.GetAttachedActors(r, !0), (0, puerts_1.$unref)(r));
			for (let e = 0; e < o.Num(); ++e) this.Kfr(o.Get(e), t, !1);
		}
	}
	static EnvironmentInfoUpdate(e, t, r = !1) {
		if (
			ModelManager_1.ModelManager.WorldModel.IsEnableEnvironmentDetecting &&
			t &&
			ModelManager_1.ModelManager.GameModeModel.UseWorldPartition
		) {
			var o = GlobalData_1.GlobalData.World;
			if (o?.IsValid()) {
				var a = VoxelUtils_1.VoxelUtils.GetVoxelInfo(o, e);
				if (
					0 !==
					(t =
						ModelManager_1.ModelManager.WorldModel.HandleEnvironmentUpdate(a))
				) {
					var n = FNameUtil_1.FNameUtil.GetDynamicFName(
							ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo
								.DataLayerType,
						),
						l = FNameUtil_1.FNameUtil.GetDynamicFName(
							ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo
								.SubDataLayerType,
						);
					switch (
						(EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnEncloseSpaceTypeChange,
							t,
						),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"LevelEvent",
								61,
								"[WorldController]Streaming:体素参数",
								["LoadAdjustValue", a.LoadAdjustValue],
								["StreamingType", a.StreamingType],
								["DataLayer", n],
								["SubDatalayer", l],
							),
						t)
					) {
						case 5:
							return (
								UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginEnterCaveOrRoom(
									o,
									n,
									l,
								),
								UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginAdjustLoadRange(
									o,
									a.LoadAdjustValue,
									a.StreamingType,
								),
								UE.KuroRenderingRuntimeBPPluginBPLibrary.SetIsUsingInCaveOrIndoorShadow(
									o,
									!0,
									WorldModel_1.MOBILE_CSM_DISTANCE_INCAVE,
									WorldModel_1.MOBILE_CSM_DISTANCE_OUTCAVE,
								),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OnOverlapEncloseSpace,
									!0,
								),
								cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(2),
								r
									? Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"LevelEvent",
											7,
											"[WorldController]Streaming:进入封闭空间[传送]",
										)
									: (Log_1.Log.CheckWarn() &&
											Log_1.Log.Warn(
												"LevelEvent",
												7,
												"[WorldController]Streaming:非传送下,无过渡区域进入封闭空间",
												["Location", e],
											),
										this.Qfr()),
								n
							);
						case 1:
							return (
								UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginEnterCaveOrRoom(
									o,
									n,
									l,
								),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"LevelEvent",
										7,
										"[WorldController]Streaming:进入封闭空间",
									),
								cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(3),
								n
							);
						case 6:
							UE.KuroRenderingRuntimeBPPluginBPLibrary.WpCancelAdjustLoadRange(
								o,
							),
								UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginLeaveCaveOrRoom(
									o,
									n,
									l,
								),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OnOverlapEncloseSpace,
									!1,
								),
								cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(1),
								r
									? Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"LevelEvent",
											7,
											"[WorldController]Streaming:退出封闭空间[传送]",
										)
									: (Log_1.Log.CheckWarn() &&
											Log_1.Log.Warn(
												"LevelEvent",
												7,
												"[WorldController]Streaming:非传送下,无过渡区域退出封闭空间",
												["Location", e],
											),
										this.Qfr()),
								UE.KuroRenderingRuntimeBPPluginBPLibrary.SetIsUsingInCaveOrIndoorShadow(
									o,
									!1,
									WorldModel_1.MOBILE_CSM_DISTANCE_INCAVE,
									WorldModel_1.MOBILE_CSM_DISTANCE_OUTCAVE,
								);
							break;
						case 2:
							UE.KuroRenderingRuntimeBPPluginBPLibrary.WpCancelAdjustLoadRange(
								o,
							),
								UE.KuroRenderingRuntimeBPPluginBPLibrary.SetIsUsingInCaveOrIndoorShadow(
									o,
									!1,
									WorldModel_1.MOBILE_CSM_DISTANCE_INCAVE,
									WorldModel_1.MOBILE_CSM_DISTANCE_OUTCAVE,
								),
								cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(3),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OnOverlapEncloseSpace,
									!1,
								),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"LevelEvent",
										7,
										"[WorldController]Streaming:退出封闭空间",
									);
							break;
						case 4:
							cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(1),
								UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginLeaveCaveOrRoom(
									o,
									n,
									l,
								),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"LevelEvent",
										7,
										"[WorldController]Streaming:完成退出封闭空间",
									);
							break;
						case 3:
							UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginAdjustLoadRange(
								o,
								a.LoadAdjustValue,
								a.StreamingType,
							),
								UE.KuroRenderingRuntimeBPPluginBPLibrary.SetIsUsingInCaveOrIndoorShadow(
									o,
									!0,
									WorldModel_1.MOBILE_CSM_DISTANCE_INCAVE,
									WorldModel_1.MOBILE_CSM_DISTANCE_OUTCAVE,
								),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"LevelEvent",
										7,
										"[WorldController]Streaming:完成进入封闭空间",
									),
								cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(2),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OnOverlapEncloseSpace,
									!0,
								);
					}
				}
			}
		}
	}
	static IsEncloseSpace(e, t, r, o) {
		if (!ModelManager_1.ModelManager.GameModeModel.UseWorldPartition || !e)
			return !1;
		var a = GlobalData_1.GlobalData.World;
		if (!a?.IsValid()) return !1;
		if (8 !== ModelManager_1.ModelManager.GameModeModel.MapId) return !1;
		if (
			r === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
			r === Protocol_1.Aki.Protocol.HBs.Proto_Vision
		)
			return !1;
		let n;
		if (
			!(n =
				o === Protocol_1.Aki.Protocol.USs.r3n
					? EntityVoxelInfoByMapIdAndEntityId_1.configEntityVoxelInfoByMapIdAndEntityId.GetConfig(
							ModelManager_1.ModelManager.GameModeModel.MapId,
							e,
						)
					: n)
		)
			switch (VoxelUtils_1.VoxelUtils.GetVoxelInfo(a, t).EnvType) {
				case 0:
				case 1:
					return !0;
				default:
					return !1;
			}
		switch (n.EnvType) {
			case 0:
			case 1:
				return !0;
			default:
				return !1;
		}
	}
	static Qfr() {
		Net_1.Net.Call(14379, Protocol_1.Aki.Protocol.Mus.create(), (e) => {
			e.lkn !==
				Protocol_1.Aki.Protocol.lkn.Proto_ErrPlayerIsTeleportCanNotDoTeleport &&
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					19586,
				);
		});
	}
	static GetEntitiesInRangeWithLocation(e, t, r, o, a) {
		var n = [];
		a && (o.length = 0),
			cpp_1.FKuroGameBudgetAllocatorInterface.GetEntitiesInRangeWithLocation(
				e,
				t,
				r,
				n,
			);
		for (const e of n) {
			var l = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(e);
			l && o.push(l);
		}
	}
	static GetCustomEntityId(e, t) {
		var r = EntitySystem_1.EntitySystem.Get(e);
		if (r) {
			if (
				(r = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
					r,
					Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantCustom,
					t - 1,
				))
			)
				return r.Id;
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 4, "无法找到伴生物拥有者实体", [
					"ownerEntityId",
					e,
				]);
		return 0;
	}
}
(exports.WorldController = WorldController),
	((_a = WorldController).Xfr = !1),
	(WorldController.Nfr = void 0),
	(WorldController.$fr = !1),
	(WorldController.hVs = 0),
	(WorldController.AK = !1),
	(WorldController.Vxn = (e) => {
		cpp_1.FuncOpenLibrary.TryOpen(e.yvs);
	}),
	(WorldController.Ofr = () => {
		_a.Xfr
			? (TimerSystem_1.TimerSystem.Pause(_a.Nfr), (_a.$fr = !0))
			: (_a.ManuallyGarbageCollection(1), (_a.$fr = !1));
	}),
	(WorldController.Gfr = () => {
		_a.AK && _a.Z0i(!0, !0);
	}),
	(WorldController.uht = () => {
		_a.AK && _a.Z0i(!0, !1);
	}),
	(WorldController.Z0i = (e, t) => {
		(_a.AK = e),
			GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetPerformanceLimitMode(
				e && !t,
			);
		var r = UE.KuroTrailSystem.GetKuroTrailSystem(
				GlobalData_1.GlobalData.World.GetWorld(),
			),
			o = UE.KuroGISystem.GetKuroGISystem(
				GlobalData_1.GlobalData.World.GetWorld(),
			).GetKuroGlobalGIActor();
		e && !t
			? ((r.bTickEnabled = !1), (o.EnableImposterUpdate = !1))
			: ((r.bTickEnabled = !0), (o.EnableImposterUpdate = !0));
	}),
	(WorldController.Zpe = (e) => {
		_a.Xfr = e;
		var t =
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
		e
			? t.TryReduceCsmUpdateFrequency("Battle")
			: t.TryRestoreCsmUpdateFrequency("Battle"),
			!e &&
				_a.$fr &&
				(_a.ManuallyGarbageCollection(2),
				(_a.$fr = !1),
				TimerSystem_1.TimerSystem.Resume(_a.Nfr)),
			UE.KuroStaticLibrary.SetGameThreadAffinity(e);
	}),
	(WorldController.z0i = (e) => {
		if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen)
			GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetMaximumFrameRate(
				e,
			);
		else if (ModelManager_1.ModelManager.WorldModel?.TickIntervalSchedulers)
			for (const t of ModelManager_1.ModelManager.WorldModel
				.TickIntervalSchedulers)
				t.ChangeTickFramePeriodByFrameRate(e);
	}),
	(WorldController.Wfr = new Array()),
	(WorldController.hJe = () => {
		cpp_1.FKuroGameBudgetAllocatorInterface.ClearAssistantActors();
	}),
	(WorldController.qfr = () => {
		if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
			cpp_1.FKuroGameBudgetAllocatorInterface.ClearAssistantActors();
			for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
				var e;
				t.IsMyRole() ||
					((e = t.EntityHandle?.Entity?.GetComponent(3)?.Actor) &&
						cpp_1.FKuroGameBudgetAllocatorInterface.AddAssistantActor(e));
			}
		}
	});
