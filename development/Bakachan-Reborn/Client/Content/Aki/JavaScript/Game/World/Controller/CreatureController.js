"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CreatureController = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	LogProfiler_1 = require("../../../Core/Common/LogProfiler"),
	Stats_1 = require("../../../Core/Common/Stats"),
	DataLayerById_1 = require("../../../Core/Define/ConfigQuery/DataLayerById"),
	SummonCfgById_1 = require("../../../Core/Define/ConfigQuery/SummonCfgById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntityHelper_1 = require("../../../Core/Entity/EntityHelper"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	CameraController_1 = require("../../Camera/CameraController"),
	TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	HotFixUtils_1 = require("../../HotFix/HotFixUtils"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	FormationAttributeController_1 = require("../../Module/Abilities/FormationAttributeController"),
	FormationDataController_1 = require("../../Module/Abilities/FormationDataController"),
	BlackScreenController_1 = require("../../Module/BlackScreen/BlackScreenController"),
	CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
	LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer"),
	SceneTeamData_1 = require("../../Module/SceneTeam/SceneTeamData"),
	SeamlessTravelController_1 = require("../../Module/SeamlessTravel/SeamlessTravelController"),
	SeamlessTravelDefine_1 = require("../../Module/SeamlessTravel/SeamlessTravelDefine"),
	TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	CharacterBuffController_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffController"),
	CreateEntityData_1 = require("../../NewWorld/Character/CreateEntityData"),
	BattleSetting_1 = require("../../NewWorld/Setting/BattleSetting"),
	PreloadDefine_1 = require("../../Preload/PreloadDefine"),
	ScenePlayerData_1 = require("../Define/ScenePlayerData"),
	WaitEntityPreloadTask_1 = require("../Define/WaitEntityPreloadTask"),
	WaitEntityTask_1 = require("../Define/WaitEntityTask"),
	AsyncTask_1 = require("../Task/AsyncTask"),
	TaskSystem_1 = require("../Task/TaskSystem"),
	WorldGlobal_1 = require("../WorldGlobal"),
	AoiController_1 = require("./AoiController"),
	BattleLogicController_1 = require("./BattleLogicController"),
	PreloadController_1 = require("./PreloadController"),
	PreloadControllerNew_1 = require("./PreloadControllerNew"),
	idDefaultValue = -1n,
	increment = 2n,
	playerBit = 20n,
	unitMax = 4294967295n,
	ENTITY_REMOVE_DELAY = 3e3;
class CreatureController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		WorldGlobal_1.WorldGlobal.Initialize();
		var e =
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
		return (
			(this.wVs = e.NpcDensity),
			!!Global_1.Global.WorldEntityHelper.Initialize() &&
				(Net_1.Net.Register(13045, CreatureController.Bgr),
				Net_1.Net.Register(4012, CreatureController.bgr),
				Net_1.Net.Register(2161, CreatureController.qgr),
				Net_1.Net.Register(11583, CreatureController.EntityOnLandedNotify),
				Net_1.Net.Register(9029, CreatureController.Ggr),
				Net_1.Net.Register(21114, CreatureController.JoinSceneNotify),
				Net_1.Net.Register(7810, CreatureController.AfterJoinSceneNotify),
				Net_1.Net.Register(14829, CreatureController.Ngr),
				Net_1.Net.Register(2776, CreatureController.Ogr),
				Net_1.Net.Register(3279, CreatureController.kgr),
				Net_1.Net.Register(19150, CreatureController.Fgr),
				Net_1.Net.Register(27325, CreatureController.Vgr),
				Net_1.Net.Register(28227, CreatureController.Hgr),
				Net_1.Net.Register(14565, CreatureController.jgr),
				Net_1.Net.Register(11305, CreatureController.Wgr),
				Net_1.Net.Register(1276, CreatureController.Kgr),
				Net_1.Net.Register(3198, CreatureController.Qgr),
				Net_1.Net.Register(24297, this.SwitchBattleModeNotify),
				Net_1.Net.Register(3791, this.BattleLogNotify),
				Net_1.Net.Register(15443, this.Xgr),
				Net_1.Net.Register(16069, this.eIn),
				Net_1.Net.Register(3492, this.$gr),
				Net_1.Net.Register(6951, this.SceneLoadingTimeOutNotify),
				Net_1.Net.Register(8101, CreatureController.Ygr),
				Net_1.Net.Register(17082, CreatureController.Jgr),
				Net_1.Net.Register(28687, CreatureController.zgr),
				Net_1.Net.Register(29095, CreatureController.Zgr),
				Net_1.Net.Register(
					22153,
					FormationAttributeController_1.FormationAttributeController
						.FormationAttrNotify,
				),
				Net_1.Net.Register(
					7876,
					FormationAttributeController_1.FormationAttributeController
						.TimeCheckNotify,
				),
				Net_1.Net.Register(6999, CreatureController.e0r),
				Net_1.Net.Register(20353, CreatureController.t0r),
				Net_1.Net.Register(23399, CreatureController.i0r),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.EntityOnLandedPush,
					CreatureController.EntityOnLandedPush,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.DelayRemoveEntityFinished,
					CreatureController.o0r,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.TeleportComplete,
					CreatureController.r0r,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.CreateEntityFail,
					CreatureController.OnCreateEntityFail,
				),
				!0)
		);
	}
	static OnClear() {
		return (
			WorldGlobal_1.WorldGlobal.Clear(),
			!!Global_1.Global.WorldEntityHelper.Clear() &&
				(Net_1.Net.UnRegister(13045),
				Net_1.Net.UnRegister(4012),
				Net_1.Net.UnRegister(2161),
				Net_1.Net.UnRegister(11583),
				Net_1.Net.UnRegister(9029),
				Net_1.Net.UnRegister(21114),
				Net_1.Net.UnRegister(7810),
				Net_1.Net.UnRegister(19150),
				Net_1.Net.UnRegister(14829),
				Net_1.Net.UnRegister(2776),
				Net_1.Net.UnRegister(27325),
				Net_1.Net.UnRegister(28227),
				Net_1.Net.UnRegister(14565),
				Net_1.Net.UnRegister(11305),
				Net_1.Net.UnRegister(1276),
				Net_1.Net.UnRegister(3198),
				Net_1.Net.UnRegister(24297),
				Net_1.Net.UnRegister(15443),
				Net_1.Net.UnRegister(16069),
				Net_1.Net.UnRegister(6951),
				Net_1.Net.UnRegister(8101),
				Net_1.Net.UnRegister(3492),
				Net_1.Net.UnRegister(17082),
				Net_1.Net.UnRegister(29095),
				Net_1.Net.UnRegister(22153),
				Net_1.Net.UnRegister(6999),
				Net_1.Net.UnRegister(20353),
				Net_1.Net.UnRegister(23399),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.EntityOnLandedPush,
					CreatureController.EntityOnLandedPush,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.TeleportComplete,
					CreatureController.r0r,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.CreateEntityFail,
					CreatureController.OnCreateEntityFail,
				),
				!0)
		);
	}
	static CreateEntityFromPending(e) {
		for (const e of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
			e?.Valid && this.LoadEntityAsync(e);
	}
	static n0r(e) {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
		if (r?.Valid)
			if (r.IsInit) {
				var o = r.Entity.GetComponent(157);
				if (o)
					for (const t of e.xys)
						o.AddBuffWithServerId(
							MathUtils_1.MathUtils.LongToBigInt(t.JFn),
							t.r3n,
							t.QVn,
							t.$Vn,
							"服务端通知添加系统buff, serverId=" + t.$Vn,
						);
				else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"World",
							20,
							"[CreatureController.AddSysBuffNotify] 添加Buff失败, Entity没有BuffComponent。",
							["CreatureDataId", e.rkn],
							[
								"buff列表",
								e.xys?.map((e) => MathUtils_1.MathUtils.LongToBigInt(e.JFn)),
							],
						);
			} else
				(r = r.Entity.GetComponent(0)),
					WaitEntityTask_1.WaitEntityTask.Create(r.GetCreatureDataId(), (t) => {
						t ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error("World", 20, "WaitEntityTask 失败", [
									"CreatureDataId",
									e.rkn,
								]));
					});
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					20,
					"[CreatureController.AddSysBuffNotify] 添加Buff失败, Entity不存在或无效。",
					["CreatureDataId", t],
					[
						"buff列表",
						e.xys.map((e) => MathUtils_1.MathUtils.LongToBigInt(e.JFn)).join(),
					],
				);
	}
	static RemoveStandaloneEntity(e, t) {
		var r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
		r?.Valid &&
			r.Entity.GetComponent(1)?.Owner &&
			((r = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e)),
			this.RemoveEntity(r, "RemoveStandaloneEntity", t));
	}
	static NotifyAddEntity(e, t, r) {
		return (
			!t.Entity.GetComponent(0).GetRemoveState() &&
			(GlobalData_1.GlobalData.BpEventManager.增加实体.Broadcast(t.Id, r),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AddEntity,
				e,
				t,
				r,
			),
			ModelManager_1.ModelManager.CreatureModel.EntitiesSortedList.push(t),
			EntityHelper_1.EntitySystemHelper.IsSortDirty ||
				(EntityHelper_1.EntitySystemHelper.IsSortDirty = !0),
			!0)
		);
	}
	static NotifyRemoveEntity(e, t, r) {
		t?.Valid &&
			(GlobalData_1.GlobalData.BpEventManager.删除实体.Broadcast(r),
			EventSystem_1.EventSystem.EmitWithTarget(
				t,
				EventDefine_1.EEventName.RemoveEntity,
				e,
				t,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RemoveEntity,
				e,
				t,
			),
			EntityHelper_1.EntitySystemHelper.IsFilterDirty ||
				(EntityHelper_1.EntitySystemHelper.IsFilterDirty = !0));
	}
	static RemoveEntity(
		e,
		t,
		r = Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce,
	) {
		var o = ModelManager_1.ModelManager.CreatureModel.RemoveDensityItem(e);
		if (o) {
			if (!o.EntityHandle)
				return (
					o.DensityLevel <= this.wVs &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							6,
							"[实体生命周期:删除实体] DensityLevel和创建情况不匹配",
							["CurrentLevel", this.wVs],
							["SelfLevel", o.DensityLevel],
							["CreatureDataId", o.CreatureDataId],
						),
					!0
				);
			o.DensityLevel > this.wVs &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					6,
					"[实体生命周期:删除实体] DensityLevel和创建情况不匹配2",
					["CurrentLevel", this.wVs],
					["SelfLevel", o.DensityLevel],
					["CreatureDataId", o.CreatureDataId],
				);
		}
		return this.a0r(e, t, r);
	}
	static a0r(e, t, r) {
		var o,
			a = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
		return a
			? ((o = a.Entity.GetComponent(1)),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Entity",
						3,
						"[实体生命周期:删除实体] 删除实体",
						["Context", t],
						["CreatureDataId", e],
						["RemoveType", r],
						["ActorLocationProxy", o?.ActorLocationProxy],
					),
				a.Entity.GetComponent(0),
				PreloadDefine_1.PreloadSetting.UseNewPreload
					? PreloadControllerNew_1.PreloadControllerNew.RemoveEntity(e)
					: PreloadController_1.PreloadController.RemovePreloadEntity(e),
				this.bVs(a, e, r, t))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[实体生命周期:删除实体] 删除实体失败,CreatureModel不存在该Id。",
						["Context", t],
						["CreatureDataId", e],
						["RemoveType", r],
					),
				!1);
	}
	static bVs(e, t, r, o) {
		var a = ModelManager_1.ModelManager.CreatureModel;
		if (!e.Valid)
			return a.RemoveEntity(t, "RemoveEntityInternal handle.Valid=false");
		var n = e.Entity.GetComponent(0),
			l = (n.SetRemoveState(!0), e.Entity.GetComponent(1)?.Owner);
		if ((CreatureController.NotifyRemoveEntity(r, e, l), !e.IsInit))
			return (
				CreatureController.DestroyEntity(
					e,
					r !== Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeResetByModeChange,
				),
				a.RemoveEntity(t, "RemoveEntityInternal handle.IsInit=false")
			);
		if (
			n.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Custom &&
			!l?.IsValid()
		)
			return (
				CreatureController.DestroyEntity(
					e,
					r !== Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeResetByModeChange,
				),
				a.RemoveEntity(t, "RemoveEntityInternal actor?.IsValid()=false")
			);
		let i = r === Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce;
		if (
			(i =
				(!i &&
					(r === Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeNormal &&
						n.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
						n.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_SceneItem &&
						n.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Animal &&
						(i = !0),
					!e.Entity.Active)) ||
				i)
		)
			return (
				CreatureController.DestroyEntity(e),
				a.RemoveEntity(t, "RemoveEntityInternal forceRemove=true")
			);
		if (r === Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeResetByModeChange)
			return (
				CreatureController.DestroyEntity(e, !1),
				a.RemoveEntity(t, "RemoveEntityInternal RemoveTypeResetByModeChange")
			);
		if (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					3,
					"[实体生命周期:删除实体] 延迟删除实体",
					["Context", o],
					["CreatureDataId", t],
					["EntityId", e.Id],
					["RemoveType", r],
				),
			this.AddDelayRemoveEntity(t, e),
			n.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Npc)
		) {
			if (!e.Entity.GetComponent(2).PendingToDestroy())
				return (
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.DelayRemoveEntityFinished,
						e.Entity,
					),
					!0
				);
			TimerSystem_1.TimerSystem.Delay(() => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.DelayRemoveEntityFinished,
					e.Entity,
				);
			}, 3e3);
		}
		if (n.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Animal) {
			if (((l = e.Entity.GetComponent(154)), !l?.PendingDestroy))
				return (
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.DelayRemoveEntityFinished,
						e.Entity,
					),
					!0
				);
			l.HandlePendingDestroy();
		}
		return (
			r === Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeDrop
				? (a = e.Entity.GetComponent(133)) && a.DestroyWithEffect()
				: n.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem &&
					e.Entity.GetComponent(117).HandleDestroyState(),
			!0
		);
	}
	static SummonRequest(e, t, r, o, a, n = 0) {
		var l,
			i,
			d,
			s = SummonCfgById_1.configSummonCfgById.GetConfig(a);
		if (void 0 === s)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[CreatureController.SummonRequest] 召唤表中找不到对应配置。",
					["召唤表Id", a],
				);
		else if (
			ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
				s.BlueprintType,
			)
		) {
			if (
				ModelManager_1.ModelManager.CreatureModel.GetEntityModel(
					s.BlueprintType,
				)
			)
				return (
					(l = (
						EntitySystem_1.EntitySystem.Get(o)?.GetComponent(0)
					).GetCreatureDataId()),
					(i = CreatureController.GenUniqueId()),
					0 < n
						? (((d = Protocol_1.Aki.Protocol.wls.create()).N7n = this.l0r(
								e,
								t,
								r,
								a,
								i,
							)),
							(d.k7n = MathUtils_1.MathUtils.NumberToLong(l)),
							(d.o8n = n),
							CreatureController.Summon2RequestInternal(d, i, o))
						: (((n = Protocol_1.Aki.Protocol.Pls.create()).N7n = this.l0r(
								e,
								t,
								r,
								a,
								i,
							)),
							(n.k7n = MathUtils_1.MathUtils.NumberToLong(l)),
							CreatureController.SummonRequestInternal(n, i)),
					i
				);
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[CreatureController.SummonRequest] 找不到新实体配置。",
					["BlueprintType", s.BlueprintType],
				);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[CreatureController.SummonRequest] 不存在新实体配置。",
					["BlueprintType", s.BlueprintType],
				);
	}
	static l0r(e, t, r, o, a) {
		var n = Protocol_1.Aki.Protocol._Os.create();
		(n.vkn = e),
			(n.d4n = t),
			(n.M3n = r.GetLocation()),
			(e = Protocol_1.Aki.Protocol.iws.create()),
			(t = r.Rotator());
		return (
			(e.Pitch = t.Pitch),
			(e.Roll = t.Roll),
			(e.Yaw = t.Yaw),
			(n.S3n = e),
			(n.F7n = o),
			(n.V7n = MathUtils_1.MathUtils.NumberToLong(a)),
			n
		);
	}
	static async SummonRequestInternal(e, t) {
		return (
			(e = await Net_1.Net.CallAsync(26232, e)).lkn ===
				Protocol_1.Aki.Protocol.lkn.Sys ||
			(ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(t),
			CreatureController.RemoveEntity(t, "SummonRequestInternal"),
			ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
				e.lkn,
				17406,
			),
			!1)
		);
	}
	static async Summon2RequestInternal(e, t, r) {
		return (e = await Net_1.Net.CallAsync(23539, e)).lkn !==
			Protocol_1.Aki.Protocol.lkn.Sys
			? (ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(t),
				CreatureController.RemoveEntity(t, "Summon2RequestInternal"),
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					12118,
				),
				!1)
			: (EntitySystem_1.EntitySystem.Get(r)
					.GetComponent(0)
					.SetSummonsVersion(e.o8n),
				!0);
	}
	static async RemoveSummonEntityRequest(e, t, r) {
		var o = Protocol_1.Aki.Protocol.nls.create();
		return (
			(r =
				((o.H7n = [
					ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(r),
				]),
				(o.j7n = Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce),
				(o.vkn = e),
				(o._7n =
					ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(t)),
				await Net_1.Net.CallAsync(17190, o))).X5n ===
				Protocol_1.Aki.Protocol.lkn.Sys ||
			(ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
				r.X5n,
				1119,
			),
			!1)
		);
	}
	static async RemoveSummonEntityByServerIdRequest(e, t, r) {
		var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)
				?.Entity?.GetComponent(0)
				.GetEntityType(),
			a = Protocol_1.Aki.Protocol.nls.create();
		return (
			(r =
				((a.H7n = [MathUtils_1.MathUtils.NumberToLong(r)]),
				(a.j7n =
					o && o === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem
						? Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeNormal
						: Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce),
				(a.vkn = e),
				(a._7n =
					ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(t)),
				await Net_1.Net.CallAsync(17190, a))).X5n ===
				Protocol_1.Aki.Protocol.lkn.Sys ||
			(ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
				r.X5n,
				1119,
			),
			!1)
		);
	}
	static async ChangeEntityRoleRequest(e, t) {
		var r, o;
		return 0 === e
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"[CreatureController.ChangeEntityRoleRequest] 实体ID无效。",
						["EntityId", e],
					),
				!1)
			: (r = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e))
				? (((o = Protocol_1.Aki.Protocol.als.create()).Ekn =
						MathUtils_1.MathUtils.NumberToLong(r)),
					(o.aFn = t),
					!(
						!(t = await Net_1.Net.CallAsync(25741, o)) ||
						(t.Sys
							? (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r))
								? (o.Entity.GetComponent(0).SetPlayerId(t.aFn),
									o.IsInit &&
										((t =
											ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
											t.aFn),
										o.Entity.GetComponent(1).SetAutonomous(t)),
									0)
								: (Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"World",
											3,
											"[CreatureController.ChangeEntityRoleRequest] 不存在实体Entity。",
											["CreatureDataId", r],
										),
									1)
							: (Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"World",
										3,
										"[CreatureController.ChangeEntityRoleRequest] 改变权限失败。",
										["EntityId", e],
									),
								1))
					))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"World",
							3,
							"[CreatureController.ChangeEntityRoleRequest] 实体ID无效。",
							["EntityId", e],
							["CreatureDataId", r],
						),
					!1);
	}
	static NotifySpawnBoss(e) {
		var t;
		e &&
			(t = e.Entity.GetComponent(3)) &&
			t.IsBoss &&
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SpawnBoss, e);
	}
	static _0r(e) {
		var t = Protocol_1.Aki.Protocol.lls.create();
		(t.Ekn = MathUtils_1.MathUtils.NumberToLong(e)),
			Net_1.Net.Call(1608, t, () => {});
	}
	static async SceneLoadingFinishRequest(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("World", 5, "世界加载完成", ["SceneId", e]);
		var t = new Protocol_1.Aki.Protocol.Y1s();
		(e = ((t.W7n = e), await Net_1.Net.CallAsync(1718, t))).lkn !==
			Protocol_1.Aki.Protocol.lkn.Sys &&
			(ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
				e.lkn,
				19553,
			),
			(ModelManager_1.ModelManager.SceneTeamModel.ChangingRole = !1));
	}
	static AnimalDieRequest(e, t) {
		var r = Protocol_1.Aki.Protocol.vYn.create();
		(r.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
			(r.M3n = Protocol_1.Aki.Protocol.VBs.create()),
			(r.M3n.X = t.X),
			(r.M3n.Y = t.Y),
			(r.M3n.Z = t.Z),
			Net_1.Net.Call(3579, r, (e) => {
				e &&
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Proto_ErrAnimalEntityNotExist &&
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						17948,
					);
			});
	}
	static AnimalDropItemRequest(e) {
		var t = Protocol_1.Aki.Protocol.yYn.create();
		(t.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
			Net_1.Net.Call(11033, t, (e) => {
				e &&
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Proto_ErrAnimalEntityNotExist &&
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						28456,
					);
			});
	}
	static AnimalDestroyRequest(e) {
		var t = Protocol_1.Aki.Protocol.SYn.create();
		(t.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
			Net_1.Net.Call(10012, t, (e) => {
				e &&
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Proto_ErrAnimalEntityNotExist &&
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						7352,
					);
			});
	}
	static LandingDamageRequest(e, t, r) {
		var o = Protocol_1.Aki.Protocol.Ezn.create();
		(o.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
			(o.K7n = t),
			(o.Q7n = r),
			Net_1.Net.Call(25622, o, (e) => {
				e &&
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						15532,
					);
			});
	}
	static AddPublicTags(e, t) {
		var r = EntitySystem_1.EntitySystem.Get(e);
		if (r) {
			var o = r.GetComponent(0);
			for (const e of t) o.AddPublicTags(e);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[CreatureController.AddPublicTags] 不存Entity，添加公有标签失败。",
					["EntityId", e],
				);
	}
	static RemovePublicTags(e, t) {
		var r = EntitySystem_1.EntitySystem.Get(e);
		if (r) {
			var o = r.GetComponent(0);
			for (const e of t) o.RemovePublicTag(e);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[CreatureController.RemovePublicTags] 不存在Entity,删除公有标签失败。",
					["EntityId", e],
				);
	}
	static async HardnessModeChangedRequest(e, t) {
		e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
		var r = Protocol_1.Aki.Protocol.Rls.create();
		return (
			(r.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
			(r.l7n = t),
			await Net_1.Net.CallAsync(6504, r),
			new Promise((e) => {
				e(!0);
			})
		);
	}
	static GenUniqueId() {
		var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
		e = BigInt(e);
		return (this.xe += increment), Number((e << playerBit) | this.xe);
	}
	static ResumeId(e) {
		e
			? 0n === (1n & e)
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("World", 3, "服务恢复实体Id有问题。", ["LastId", e])
				: (this.xe = e & unitMax)
			: (this.xe = idDefaultValue);
	}
	static async u0r(e) {
		var t = ModelManager_1.ModelManager.CreatureModel,
			r = ModelManager_1.ModelManager.GameModeModel;
		if (r.HasGameModeData)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"未清理前一个场景的数据,就下发了JoinSceneNotify，服务器流程有问题",
				);
		else {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"World",
					3,
					"[CreatureController.JoinSceneNotify] JoinSceneNotify",
				),
				(Net_1.Net.IsConsumeNotifyPaused = !0),
				await ModelManager_1.ModelManager.LoginModel.WaitLoginPromise(),
				LevelSequencePlayer_1.LevelSequencePlayer.SetBanned(!0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ClearSceneBegin,
				),
				await GlobalData_1.GlobalData.ClearSceneDone?.Promise,
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						3,
						"[CreatureController.JoinSceneNotify] 场景清理完成",
					),
				(Net_1.Net.IsConsumeNotifyPaused = !1),
				(r.LoadingPhase = 2);
			var o = e.fys,
				a = (r.JoinSceneInfo = o).Rkn;
			if (
				((t.LeavingLevel = !1),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						3,
						"[CreatureController.JoinSceneNotify] Begin",
						["InstanceId", a],
					),
				t.SetIsLoadingScene(!0),
				ControllerHolder_1.ControllerHolder.GameModeController.SetGameModeData(
					a,
					o.w6n,
				))
			)
				if (
					(CreatureController.ResumeId(
						MathUtils_1.MathUtils.LongToBigInt(e.vys),
					),
					t.SetInstanceId(a),
					(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
						a),
					t.InitEntityDataConfig(
						ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
							.MapConfigId,
					))
				) {
					let a, g;
					if (
						(PublicUtil_1.PublicUtil.RegisterEditorLocalConfig(),
						t.InitDynamicEntityDataConfig(),
						t.SetWorldOwner(o.qps),
						t.SetSceneId(o.W7n),
						(e = o.tys),
						CreatureController.c0r(e.Hys),
						ModelManager_1.ModelManager.BlackboardModel.SetWorldBlackboardByProtocol(
							o.Yps,
						),
						ModelManager_1.ModelManager.CombatMessageModel.SetLastMessageId(
							MathUtils_1.MathUtils.LongToBigInt(o._ys),
						),
						(Global_1.Global.BaseCharacter = void 0),
						(e = o.ZEs),
						FormationDataController_1.FormationDataController.RefreshPlayerEntities(
							e,
						),
						e)
					)
						for (const r of e) {
							var n = r.aFn,
								l = new ScenePlayerData_1.ScenePlayerData(n),
								i = (l.SetTimerStart(), []),
								d = r.afs,
								s = r.Y4n;
							for (const e of r.HEs) {
								var C = new SceneTeamData_1.SceneTeamRole();
								(C.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(e.rkn)),
									(C.RoleId = e.l3n),
									i.push(C),
									C.RoleId === s && l.ControlRole(C.CreatureDataId);
							}
							t.AddScenePlayerData(r.aFn, l),
								r.aFn === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
									(CharacterBuffController_1.default.SetHandlePrefix(
										r.VEs,
										r.$Es,
									),
									(a = r.$kn),
									(g = r.D3n)),
								ModelManager_1.ModelManager.SceneTeamModel.UpdateGroup({
									PlayerId: n,
									GroupType: d,
									GroupRoleList: i,
									CurrentRoleId: s,
								}),
								ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(n, d);
						}
					ModelManager_1.ModelManager.OnlineModel.ResetContinuingChallengeConfirmState(),
						r.SetBornInfo(a, g),
						TimeOfDayController_1.TimeOfDayController.SyncSceneTime(
							o.rys.fVn,
							o.rys.pVn,
							o.rys.Cys,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.InitArea,
							o.sys,
						),
						t.SetRestoreEntityId(o.ays),
						ControllerHolder_1.ControllerHolder.GameAudioController.UpdateAudioState(
							o.hfs,
						),
						await ControllerHolder_1.ControllerHolder.GameModeController.Load(
							ModelManager_1.ModelManager.GameModeModel.JoinSceneInfo,
						);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"World",
							3,
							"[CreatureController.JoinSceneNotify] 初始化EntityDataConfig失败。",
							["InstanceId", a],
						);
			else
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						3,
						"[CreatureController.JoinSceneNotify] 设置GameModeData失败。",
						["InstanceId", a],
					);
		}
	}
	static LoadOrUnloadSubLevel(e) {
		if (e?.length) {
			var t = ModelManager_1.ModelManager.GameModeModel.SubLevelMap;
			const a = new Array(),
				n = new Array();
			var r,
				o = new Set();
			if (e) for (const r of e) o.add(r), t.has(r) || n.push(r);
			for ([r] of t) o.has(r) || a.push(r);
			(a.length || n.length) &&
				(ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
					"LoadOrUnloadSubLevel",
				),
				(e = new AsyncTask_1.AsyncTask("LoadOrUnloadSubLevel", async () => {
					const e = new CustomPromise_1.CustomPromise();
					return (
						ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
							a,
							n,
							0,
							void 0,
							void 0,
							(t) => {
								t ||
									(Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"InstanceDungeon",
											3,
											"加载或者卸载子关卡失败",
											["unloads", a],
											["newLoads", n],
										)),
									ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
										"LoadOrUnloadSubLevel",
									),
									t &&
										ModelManager_1.ModelManager.GameModeModel.MapDone &&
										CreatureController.CreateEntityFromPending(
											Protocol_1.Aki.Protocol.jBs.Proto_Normal,
										),
									e.SetResult(t);
							},
						),
						e.Promise
					);
				})),
				TaskSystem_1.TaskSystem.AddTask(e),
				TaskSystem_1.TaskSystem.Run());
		}
	}
	static c0r(e) {
		for (const t of e) this.CreateEntity(t);
	}
	static NotifyScenePlayerChanged() {
		var e = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.ScenePlayerChanged,
			e,
		);
	}
	static CreateEntity(e, t = "Default") {
		var r,
			o,
			a = MathUtils_1.MathUtils.LongToNumber(e.Ekn),
			n = e.cVn;
		return n === Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
			ModelManager_1.ModelManager.CreatureModel.GetOrAddDensityItem(a, e)
				.DensityLevel > this.wVs
			? ((r = e.mVn),
				(o = e.R5n),
				void (
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Entity",
						6,
						"[实体生命周期:创建实体] CreateEntity(Density拦截)",
						["CreatureDataId", a],
						["ConfigType", r],
						["PbDataId", o],
						["EntityType", n],
						["Context", t],
					)
				))
			: this.qVs(a, e, t);
	}
	static qVs(e, t, r) {
		var o = ModelManager_1.ModelManager.CreatureModel,
			a = t.mVn,
			n = t.R5n,
			l = t.ivs,
			i = t.cVn,
			d = t.d4n;
		if (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					3,
					"[实体生命周期:创建实体] CreateEntity(开始)",
					["CreatureDataId", e],
					["ConfigType", a],
					["PbDataId", n],
					["PrefabId", l],
					["IsVisible", d],
					["Context", r],
				),
			o.ExistEntity(e))
		)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					3,
					"[实体生命周期:创建实体] 已经存在实体，创建实体失败。",
					["CreatureDataId", e],
					["ConfigType", a],
					["PbDataId", n],
					["PrefabId", l],
				);
		else if (Global_1.Global.WorldEntityHelper) {
			var s = new CreateEntityData_1.CreateEntityData();
			let C;
			switch ((s.Init(t), i)) {
				case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
				case Protocol_1.Aki.Protocol.HBs.Proto_Animal:
				case Protocol_1.Aki.Protocol.HBs.Proto_Npc:
				case Protocol_1.Aki.Protocol.HBs.Proto_SceneItem:
				case Protocol_1.Aki.Protocol.HBs.Proto_Custom:
				case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
				case Protocol_1.Aki.Protocol.HBs.Proto_Player:
					C = Global_1.Global.WorldEntityHelper.CreateWorldEntity(s);
					break;
				default:
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"[实体生命周期:创建实体] 下发了不支持的实体类型, 创建实体失败。",
							["CreatureDataId", e],
							["ConfigType", a],
							["PbDataId", n],
							["PrefabId", l],
							["EntityType", i],
						)
					);
			}
			if (C?.Valid) {
				if (
					(o.AddEntity(e, C),
					CharacterController_1.CharacterController.InitData(C, C.Entity, s))
				)
					return (
						CreatureController.SetEntityEnable(
							C.Entity,
							d,
							"CreatureController.CreateEntity",
						),
						o.AddLoadingEntity(C),
						o.AddOwnerEntityInfo(e),
						(r = C.Entity.GetComponent(0)),
						o.CheckSetPrefabEntity(C),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Entity",
								3,
								"[实体生命周期:创建实体] 实体详细数据。",
								["CreatureDataId", e],
								["EntityId", C.Id],
								["ConfigType", a],
								["EntityType", r.GetEntityType()],
								["PbDataId", n],
								["PrefabId", l],
								["ModelId", r.GetModelId()],
								["ModelBlueprintPath", r.ModelBlueprintPath],
								["Visible", r.GetVisible()],
								["PlayerId", r.GetPlayerId()],
								["OwnerId", r.GetOwnerId()],
								["Location", r.GetLocation()],
								["Rotation", r.GetRotation()],
							),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.CreateEntity,
							r,
							C,
						),
						C
					);
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[实体生命周期:创建实体] InitData失败，创建实体失败。",
						["CreatureDataId", e],
						["ConfigType", a],
						["PbDataId", n],
						["PrefabId", l],
					),
					o.RemoveEntity(e, "CreateEntity执行InitData失败"),
					CharacterController_1.CharacterController.Destroy(C);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[实体生命周期:创建实体] entity.Valid=false，创建实体失败。",
						["CreatureDataId", e],
						["ConfigType", a],
						["PbDataId", n],
						["PrefabId", l],
					);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					3,
					"[实体生命周期:创建实体] WorldEntityHelper不存在，创建实体失败。",
					["CreatureDataId", e],
					["ConfigType", a],
					["PbDataId", n],
					["PrefabId", l],
				);
	}
	static DestroyEntity(e, t = !0) {
		var r, o, a;
		e?.Valid &&
			((r = (a = e.Entity).GetComponent(0)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					3,
					"[实体生命周期:删除实体] DestroyEntity开始",
					["CreatureDataId", r.GetCreatureDataId()],
					["EntityId", e.Id],
					["PendingRemove", t],
				),
			(o = a.GetComponent(1)?.Owner)?.IsValid() &&
				Global_1.Global.BaseCharacter === o &&
				Global_1.Global.CharacterController &&
				(Global_1.Global.CharacterController.UnPossess(),
				(Global_1.Global.BaseCharacter = void 0)),
			o?.IsValid() &&
				(o instanceof TsBaseCharacter_1.default && o.CharacterActorComponent
					? (o.CharacterActorComponent.DisableCollision(
							"[CreatureController.DestroyEntity]",
						),
						o.CharacterActorComponent.DisableTick(
							"[CreatureController.DestroyEntity]",
						),
						o.CharacterActorComponent.DisableActor(
							"[CreatureController.DestroyEntity]",
						))
					: o instanceof UE.BP_BaseItem_C
						? a?.Disable("DestroyEntity")
						: (o.SetActorEnableCollision(!1),
							o.SetActorTickEnabled(!1),
							o.SetActorHiddenInGame(!0))),
			t
				? ModelManager_1.ModelManager.CreatureModel.AddPendingRemoveEntity(
						r.GetCreatureDataId(),
						e,
					)
				: ((a = r.GetCreatureDataId()),
					Global_1.Global.WorldEntityHelper
						? ((t = Global_1.Global.WorldEntityHelper.Destroy(e))
								? ModelManager_1.ModelManager.WorldModel.AddDestroyActor(
										a,
										e.Id,
										o,
									)
								: ControllerHolder_1.ControllerHolder.WorldController.DestroyEntityActor(
										a,
										e.Id,
										o,
										!1,
									),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Entity",
									3,
									"[实体生命周期:删除实体] DestroyEntity结束",
									["CreatureDataId", a],
									["EntityId", e.Id],
									["EntitySystem.DestroyEntity结果", t],
								))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Entity",
								3,
								"[实体生命周期:删除实体] WorldEntityHelper不存在，删除实体失败。",
								["CreatureDataId", a],
								["EntityId", e.Id],
							)));
	}
	static LoadEntityAsync(e, t) {
		if (e?.Valid) {
			const r = e.Entity.GetComponent(0);
			if (r.GetRemoveState()) t?.(3);
			else if (e.IsInit) t?.(2);
			else {
				let o;
				ModelManager_1.ModelManager.PreloadModel.UseEntityProfilerInternal &&
					(o = new LogProfiler_1.LogProfiler(
						"预加载实体Profiler:" + r.GetCreatureDataId(),
					)).Start();
				const a = (a) => {
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Preload",
							3,
							"预加载实体:结束",
							["CreatureDataId", r.GetCreatureDataId()],
							["PbDataId", r.GetPbDataId()],
							["是否成功", 2 === a],
							["预加载结果", a],
						),
						ModelManager_1.ModelManager.PreloadModel
							.UseEntityProfilerInternal &&
							(o.Stop(), Log_1.Log.CheckInfo()) &&
							Log_1.Log.Info("Preload", 3, o.ToString()),
						!e?.Valid || r.GetRemoveState()
							? t?.(3)
							: this.d0r(e, t) && this.C0r(e, t);
				};
				if (PreloadDefine_1.PreloadSetting.UseNewPreload) {
					if (r.GetPreloadFinished()) return void a(2);
					if (r.GetLoading())
						return void ModelManager_1.ModelManager.PreloadModelNew.GetEntityAssetElement(
							r.GetCreatureDataId(),
						)?.AddCallback(a);
				} else if (r.GetLoading()) return;
				r.SetLoading(!0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Preload",
							3,
							"预加载实体:开始",
							["CreatureDataId", r.GetCreatureDataId()],
							["PbDataId", r.GetPbDataId()],
							["Reason", "CreatureController.LoadEntityAsync"],
						),
					PreloadDefine_1.PreloadSetting.UseNewPreload
						? PreloadControllerNew_1.PreloadControllerNew.PreloadEntity(e, o, a)
						: PreloadController_1.PreloadController.PreloadEntity(e, o, (e) => {
								a((e = e ? 2 : 1));
							});
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					3,
					"[实体生命周期:创建实体] entity.Valid=false，创建实体失败。",
				),
				t?.(1);
	}
	static d0r(e, t) {
		const r = e.Entity.GetComponent(0).GetDependenceEntities();
		return (
			!r?.length ||
			(WaitEntityPreloadTask_1.WaitEntityPreloadTask.Create(e, (o) => {
				if (
					!(4 & o) &&
					e?.Valid &&
					!(o = e.Entity.GetComponent(0)).GetRemoveState()
				) {
					var a,
						n,
						l = e.Priority + 1;
					for ([a, n] of r) {
						let e;
						0 === n
							? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(a))
							: 1 === n
								? (e =
										ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
											a,
										))
								: 2 === n &&
									(e =
										ModelManager_1.ModelManager.CreatureModel.GetEntityById(a)),
							e?.Valid &&
								e.Priority < l &&
								((e.Priority = l),
								2 & e.Entity.Flag ||
									CharacterController_1.CharacterController.SortItem(e));
					}
					this.C0r(e, t);
				}
			}),
			!1)
		);
	}
	static C0r(e, t) {
		if (e?.Valid) {
			const r = e.Entity.GetComponent(0);
			r.GetRemoveState()
				? t?.(3)
				: CharacterController_1.CharacterController.AddEntityToAwakeQueue(
						e,
						(o) => {
							o
								? r.GetRemoveState()
									? t?.(3)
									: CreatureController.g0r(e, (o) => {
											o
												? r.GetRemoveState()
													? t?.(3)
													: (CharacterController_1.CharacterController.ActivateEntity(
															e,
														),
														CreatureController.f0r(e) ? t?.(2) : t?.(1))
												: t?.(1);
										})
								: t?.(1);
						},
					);
		} else t?.(3);
	}
	static g0r(e, t) {
		if (GlobalData_1.GlobalData.Networking()) {
			const o = e.Entity.GetComponent(0);
			switch (o.GetEntityType()) {
				case Protocol_1.Aki.Protocol.HBs.Proto_Custom:
				case Protocol_1.Aki.Protocol.HBs.Proto_SceneItem:
				case Protocol_1.Aki.Protocol.HBs.Proto_Animal:
					return void (t && t(!0));
			}
			var r = Protocol_1.Aki.Protocol.CYn.create();
			const a = o.GetCreatureDataId();
			(r.rkn = MathUtils_1.MathUtils.NumberToLong(a)),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Entity",
						3,
						"[实体生命周期:创建实体] 请求Activate实体",
						["CreatureDataId", a],
						["PbDataId", o.GetPbDataId()],
						["EntityId", e.Id],
					),
				Net_1.Net.Call(29051, r, (r) => {
					let n = !1;
					if (r)
						if (r.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
							(n = !0),
								ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									r.lkn,
									25559,
									void 0,
									!1,
									!0,
								);
						else {
							CreatureController.SetEntityEnable(
								e.Entity,
								r.d4n,
								"EntityActiveResponse",
							);
							var l = WorldGlobal_1.WorldGlobal.ToUeVector(r.M3n),
								i = WorldGlobal_1.WorldGlobal.ToUeRotator(r.S3n);
							e.Entity.GetComponent(1).SetActorLocationAndRotation(l, i);
							for (const e of r.Dvs) {
								var d = e.Mqs;
								o.ComponentDataMap.set(d, e);
							}
						}
					else n = !0;
					ModelManager_1.ModelManager.CreatureModel.GetEntityId(a) !== e.Id
						? Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Entity",
								3,
								"[实体生命周期:创建实体] 激活实体时，实体已经销毁",
								["CreatureDataId", a],
								["EntityConfigType", o.GetEntityConfigType()],
								["PbDataId", o.GetPbDataId()],
							)
						: (n &&
								Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Entity",
									3,
									"[实体生命周期:创建实体] 激活实体消息异常，创建实体失败。",
									["CreatureDataId", a],
									["EntityConfigType", o.GetEntityConfigType()],
									["PbDataId", o.GetPbDataId()],
								),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Entity",
									3,
									"[实体生命周期:创建实体] 服务器返回Activate实体成功",
									["CreatureDataId", a],
									["PbDataId", o.GetPbDataId()],
									["EntityId", e.Id],
								),
							t && t(!0));
				});
		} else t && t(!0);
	}
	static f0r(e) {
		var t = e.Entity.GetComponent(0),
			r = (t.SetLoading(!1), e.Entity.GetComponent(1)?.Owner);
		return t.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Custom || r
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Entity",
						3,
						"[实体生命周期:创建实体] 实体创建成功",
						["CreatureDataId", t.GetCreatureDataId()],
						["EntityId", e.Id],
						["PbDataId", t.GetPbDataId()],
						["Entity.Active", e.Entity.Active],
					),
				CreatureController.SetEntityEnable(
					e.Entity,
					t.GetVisible(),
					"CreatureController.AfterEntityActivate",
				),
				CreatureController.NotifyAddEntity(
					Protocol_1.Aki.Protocol.jBs.Proto_Normal,
					e,
					r,
				) &&
					(CreatureController.NotifySpawnBoss(e), t.IsRole()) &&
					ModelManager_1.ModelManager.WorldModel.AddIgnore(r),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[实体生命周期:创建实体] actor无效，注意检查前面的组件的报错，创建实体失败。",
						["CreatureDataId", t.GetCreatureDataId()],
						["EntityId", e.Id],
						["PbDataId", t.GetPbDataId()],
					),
				!1);
	}
	static LoadActorByModelConfig(e, t) {
		var r = e.蓝图?.ToAssetPathName();
		if (r && r.length && "None" !== r) {
			r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
				e.蓝图.ToAssetPathName(),
				UE.Class,
			);
			if (r?.IsValid())
				return (
					(r = ActorSystem_1.ActorSystem.Get(r, t))?.IsValid() &&
						(r.SetActorHiddenInGame(!0),
						r.SetActorTickEnabled(!1),
						r.SetActorEnableCollision(!1)),
					r
				);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[CreatureController.LoadActorByModelConfig] 加载Actor失败，因为模型的蓝图没有设置。",
					["ModelId", e.ID],
				);
	}
	static LoadAndChangeMeshAnim(e, t, r) {
		(t = t.ToAssetPathName()),
			t?.length &&
				"None" !== t &&
				(t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					t,
					UE.SkeletalMesh,
				)) &&
				e.SkeletalMesh !== t &&
				e.SetSkeletalMesh(t),
			(t = r.ToAssetPathName());
		t?.length &&
			"None" !== t &&
			(r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.Class)) &&
			e.AnimClass !== r &&
			e.SetAnimClass(r);
	}
	static ChangeMeshAnim(e, t, r) {
		e.SetSkeletalMesh(t), e.SetAnimClass(r);
	}
	static OnLeaveLevel() {
		var e = ModelManager_1.ModelManager.CreatureModel;
		if (0 !== e.GetPlayerId()) {
			(e.LeavingLevel = !0),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						3,
						"[CreatureController.OnLeaveLevel] OnLeaveLevel 开始",
					),
				ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel ||
					CameraController_1.CameraController.FightCamera.LogicComponent.SetCharacter(
						void 0,
					),
				ConfigManager_1.ConfigManager.WorldConfig.ClearCommonSkillData();
			try {
				var t = e.GetAllEntities();
				for (const t of e.DelayRemoveContainer.GetAllEntities())
					CreatureController.DestroyEntity(t, !1);
				for (let e = t.length - 1; 0 <= e; e--) {
					var r = t[e],
						o = r.Entity.GetComponent(0);
					ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel &&
					o.IsRole() &&
					r.Entity.GetComponent(3)?.Actor === Global_1.Global.BaseCharacter
						? SeamlessTravelController_1.SeamlessTravelController.SetSeamlessTravelPlayerEntity(
								r,
							)
						: CreatureController.RemoveEntity(
								o.GetCreatureDataId(),
								"OnLeaveLevel",
							) ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"World",
									3,
									"[CreatureController.ClearWorldData] 销毁实体失败。",
									["CreatureDataId", o.GetCreatureDataId()],
									["实体类型", o.GetEntityType()],
								));
				}
				ControllerHolder_1.ControllerHolder.WorldController.DoLeaveLevel(),
					ModelManager_1.ModelManager.AttachToActorModel.ClearEntityActor(
						"CreatureController.OnLeaveLevel",
					);
			} catch (e) {
				e instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"World",
							3,
							"[CreatureController.ClearWorldData] 销毁实体异常。",
							e,
							["error", e.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"World",
							3,
							"[CreatureController.ClearWorldData] 销毁实体异常。",
							["error", e],
						);
			}
			(e.LeavingLevel = !1),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						3,
						"[CreatureController.OnLeaveLevel] OnLeaveLevel 结束",
					);
		}
		return !0;
	}
	static ChangeLockTagByCreatureGenId(e, t) {
		var r;
		for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
			o.IsInit &&
				o.Entity.GetComponent(0).GetOwnerId() === e &&
				(r = o.Entity.GetComponent(92)) &&
				r.ChangeLockTag(t);
	}
	static ChangeLockTagByTeleportPbDataId(e, t) {
		var r;
		for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
			o.IsInit &&
				o.Entity.GetComponent(0).GetPbDataId() === e &&
				(r = o.Entity.GetComponent(92)) &&
				r.ChangeLockTag(t);
	}
	static LoadActorByPbModelConfig(e, t) {
		var r = UE.KismetSystemLibrary.Conv_SoftClassPathToSoftClassRef(
			UE.KismetSystemLibrary.MakeSoftObjectPath(e.BluePrintClass),
		);
		if (r)
			return (
				(r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					r.ToAssetPathName(),
					UE.Class,
				)),
				(r = ActorSystem_1.ActorSystem.Get(r, t))?.IsValid() &&
					(r.SetActorHiddenInGame(!0),
					r.SetActorTickEnabled(!1),
					r.SetActorEnableCollision(!1)),
				r
			);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"World",
				3,
				"[CreatureController.LoadActorByModelConfig] 加载Actor失败，因为模型的蓝图没有设置。",
				["BluePrintId", e.BluePrintId],
			);
	}
	static AddDelayRemoveEntity(e, t) {
		var r = ModelManager_1.ModelManager.CreatureModel;
		r.AddDelayRemoveEntity(e, t)
			? r.RemoveEntity(e, "AddDelayRemoveEntity 加入延迟删除列表")
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[CreatureController.AddPendingRemoveEntity] 实体添加到PendingRemoveEntityMap列表失败。",
					["CreatureDataId", e],
				);
	}
	static CheckDelayRemove(e, t, r) {
		var o = ModelManager_1.ModelManager.CreatureModel;
		let a = o.GetEntityWithDelayRemoveContainer(e);
		return (
			!!(a =
				a || t !== Protocol_1.Aki.Protocol.USs.r3n
					? a
					: o.DelayRemoveContainer.GetEntityByPbDataId(r))?.Valid &&
			(o.RemoveDelayRemoveEntity(a.CreatureDataId),
			CreatureController.DestroyEntity(a, !1),
			!0)
		);
	}
	static CheckPendingRemove(e, t, r) {
		var o = ModelManager_1.ModelManager.CreatureModel;
		let a = o.GetPendingRemoveEntity(e);
		return (
			!!(a =
				a || t !== Protocol_1.Aki.Protocol.USs.r3n
					? a
					: o.GetPendingRemoveEntityByPbDataId(r))?.Valid &&
			(o.RemovePendingRemoveEntity(a.CreatureDataId),
			CreatureController.DestroyEntity(a, !1),
			!0)
		);
	}
	static EntityLogicToEntityType(e) {
		switch (e) {
			case "Item":
				return Protocol_1.Aki.Protocol.HBs.Proto_SceneItem;
			case "Npc":
				return Protocol_1.Aki.Protocol.HBs.Proto_Npc;
			case "Monster":
				return Protocol_1.Aki.Protocol.HBs.Proto_Monster;
			case "Vision":
				return Protocol_1.Aki.Protocol.HBs.Proto_Vision;
			default:
				return Protocol_1.Aki.Protocol.HBs.Proto_Custom;
		}
	}
	static async SwitchBigWorldRequest(e, t) {
		var r = Protocol_1.Aki.Protocol.V1s.create();
		return !!(e =
			((r.vFn = e), (r.Pkn = t), await Net_1.Net.CallAsync(7170, r)));
	}
	static MonsterBoomRequest(e, t) {
		CombatMessage_1.CombatNet.Call(
			29345,
			e,
			Protocol_1.Aki.Protocol.SNn.create({ $7n: t }),
		);
	}
	static ParseTravelConfig(e, t, r) {
		var o = new SeamlessTravelDefine_1.SeamlessTravelContext();
		switch (e) {
			case Protocol_1.Aki.Protocol.wkn.Proto_PlayEffect:
				(o.EffectPath = t),
					SeamlessTravelController_1.SeamlessTravelController.EnableSeamlessTravel(
						Global_1.Global.BaseCharacter,
						Global_1.Global.CharacterController,
						o,
					);
				break;
			case Protocol_1.Aki.Protocol.wkn.Proto_PlayMp4:
				ControllerHolder_1.ControllerHolder.GameModeController.SetTravelMp4(
					!0,
					t,
				);
				break;
			case Protocol_1.Aki.Protocol.wkn.Proto_CenterText:
				(ModelManager_1.ModelManager.GameModeModel.ShowCenterTextFlow = r),
					(ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = !0);
		}
	}
	static SetEntityEnable(e, t, r, o = !1) {
		var a;
		e?.Valid &&
			!t !=
				!!(a =
					ModelManager_1.ModelManager.CreatureModel.EntityDisableHandleMap.get(
						e.Id,
					)) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					29,
					"CreatureController.SetEntityEnable",
					["Enable", t],
					["EntityId", e.Id],
					["Reason", r],
				),
			ModelManager_1.ModelManager.CreatureModel.DisableLock.has(e.Id)
				? Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Entity", 29, "递归设置EntityEnable")
				: (ModelManager_1.ModelManager.CreatureModel.DisableLock.add(e.Id),
					e.GetComponent(0).SetVisible(t),
					t
						? (e.Enable(a, "CreatureController.SetEntityEnable"),
							ModelManager_1.ModelManager.CreatureModel.EntityDisableHandleMap.delete(
								e.Id,
							))
						: ((a = e.Disable(r)),
							ModelManager_1.ModelManager.CreatureModel.EntityDisableHandleMap.set(
								e.Id,
								a,
							)),
					ModelManager_1.ModelManager.CreatureModel.DisableLock.delete(e.Id),
					o && CreatureController.p0r(e, t)));
	}
	static SetActorVisible(e, t, r, o, a, n = !1) {
		var l, i;
		e?.Valid &&
			((l = e.GetComponent(1)),
			(i = e.GetComponent(89)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					29,
					"CreatureController.SetActorVisible",
					["Visible", t],
					["EntityId", e.Id],
					["Reason", a],
				),
			l.SetActorVisible(t, a),
			l.SetCollisionEnable(r, a),
			i?.SetIsInGame(t),
			this.SetActorMovable(e, o, a),
			n) &&
			CreatureController.v0r(e, t);
	}
	static SetActorMovable(e, t, r) {
		var o,
			a = e.GetComponent(98),
			n = e.GetComponent(99);
		a &&
			n &&
			!t !=
				!!(o =
					ModelManager_1.ModelManager.CreatureModel.ActorMovableHandleMap.get(
						e.Id,
					)) &&
			(t
				? (a.Enable(o[0], r),
					n.Enable(o[1], r),
					ModelManager_1.ModelManager.CreatureModel.ActorMovableHandleMap.delete(
						e.Id,
					))
				: ((o = [a.Disable(r), n.Disable(r)]),
					ModelManager_1.ModelManager.CreatureModel.ActorMovableHandleMap.set(
						e.Id,
						o,
					)));
	}
	static p0r(e, t) {
		var r = e.GetComponent(0),
			o = Protocol_1.Aki.Protocol.tNn.create();
		(o.Ekn = MathUtils_1.MathUtils.NumberToLong(r.GetCreatureDataId())),
			(o.d4n = t),
			CombatMessage_1.CombatNet.Call(18320, e, o, () => {});
	}
	static v0r(e, t) {
		var r, o;
		ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			((r = e.GetComponent(0)),
			((o = Protocol_1.Aki.Protocol.NNn.create()).Ekn =
				MathUtils_1.MathUtils.NumberToLong(r.GetCreatureDataId())),
			(o.C4n = t),
			CombatMessage_1.CombatNet.Call(12326, e, o, () => {}));
	}
	static RefreshDensityLevel() {
		var e =
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo()
				.NpcDensity;
		if (this.wVs !== e) {
			for (
				var t, r, o, a = ModelManager_1.ModelManager.CreatureModel;
				this.wVs < e;
			)
				for ([t, r] of (++this.wVs, a.GetDensityLevelGroup(this.wVs))) {
					var n = this.qVs(t, r.EntityData, "Density");
					n &&
						(ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(
							n,
						),
						AoiController_1.AoiController.AddMonsterSizeTag(n));
				}
			for (; this.wVs > e; ) {
				for ([o] of a.GetDensityLevelGroup(this.wVs))
					this.a0r(
						o,
						"DensityLevelChanged",
						Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce,
					);
				--this.wVs;
			}
		}
	}
}
((exports.CreatureController = CreatureController).xe = idDefaultValue),
	(CreatureController.s0r = void 0),
	(CreatureController.h0r = void 0),
	(CreatureController.wVs = 2),
	(CreatureController.M0r = []),
	(CreatureController.Vgr = (e) => {
		ModelManager_1.ModelManager.GameModeModel.IsTeleport
			? CreatureController.M0r.push(e)
			: CreatureController.n0r(e);
	}),
	(CreatureController.r0r = () => {
		for (const e of CreatureController.M0r) CreatureController.n0r(e);
		CreatureController.M0r = [];
	}),
	(CreatureController.Hgr = (e) => {
		var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
			MathUtils_1.MathUtils.LongToNumber(e.rkn),
		);
		if (t?.Valid) {
			var r = t.Entity.GetComponent(157);
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						20,
						"[CreatureController.UpdateSysBuffNotify] 更新Buff失败, Entity没有AbilityComponent。",
						["CreatureDataId", e.rkn],
					));
			for (const t of e.xys) {
				var o = MathUtils_1.MathUtils.LongToBigInt(t.JFn),
					a = t.$Vn;
				r?.RemoveBuffByServerIdLocal(a, "刷新系统buff, serverId=" + a),
					r?.AddBuffWithServerId(
						o,
						t.r3n,
						t.QVn,
						a,
						"刷新系统buff, serverId=" + a,
					);
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					20,
					"[CreatureController.UpdateSysBuffNotify] 更新Buff失败, Entity无效或不存在。",
					["CreatureDataId", e.rkn],
				);
	}),
	(CreatureController.jgr = (e) => {
		var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
			MathUtils_1.MathUtils.LongToNumber(e.rkn),
		);
		if (t?.Valid) {
			var r = t.Entity.GetComponent(157);
			if (
				(r ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"World",
							20,
							"[CreatureController.RemoveSysBuffNotify] 移除Buff失败, Entity没有AbilityComponent。",
							["CreatureDataId", e.rkn],
						)),
				t.IsInit)
			)
				for (const t of e.j4n)
					r?.RemoveBuffByServerIdLocal(t, "服务端移除系统buff, serverId=" + t);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					20,
					"[CreatureController.RemoveSysBuffNotify] 移除Buff失败, Entity无效或不存在。",
					["CreatureDataId", e.rkn],
				);
	}),
	(CreatureController.Wgr = (e) => {
		BattleLogicController_1.BattleLogicController.ExecuteEntityLivingStatusNotify(
			e,
		);
	}),
	(CreatureController.Qgr = (e) => {
		for (const o of e.Eys) {
			var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
				MathUtils_1.MathUtils.LongToNumber(o.Ekn),
			);
			if (!t?.Valid)
				return void (
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"World",
						20,
						"[CreatureController.MonsterAttributeArrayNotify] 更新Monster属性失败, Entity无效或不存在。",
						["CreatureDataId", o.Ekn],
					)
				);
			var r = t.Entity.GetComponent(156);
			if (r)
				for (const e of Object.keys(o.dfs)) r.SetBaseValue(Number(e), o.dfs[e]);
		}
	}),
	(CreatureController.bgr = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			r =
				((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)),
				MathUtils_1.MathUtils.LongToNumber(e.CFn));
		t.Entity.GetComponent(34)?.SetVisionSkillInformationList(e.Wps, r),
			(t.Entity.GetComponent(0).VisionSkillServerEntityId = r),
			EventSystem_1.EventSystem.EmitWithTarget(
				t,
				EventDefine_1.EEventName.EntityVisionSkillChanged,
			);
	}),
	(CreatureController.qgr = (e) => {
		var t,
			r = MathUtils_1.MathUtils.LongToNumber(e.Ekn),
			o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
		o
			? ((t = o.Entity.GetComponent(0)),
				e.aFn && t.SetPlayerId(e.aFn),
				e.aFn === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
					((t = o.Entity.GetComponent(3).Actor)
						? t.Kuro_SetRole(2)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"World",
								3,
								"ChangeEntityRoleNotify,actor无效。",
								["CreatureDataId", r],
							)))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[CreatureController.ChangeEntityRoleNotify] 不存在Entity。",
					["CreatureDataId", r],
				);
	}),
	(CreatureController.EntityOnLandedPush = (e) => {
		(e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e.Id)),
			CreatureController._0r(e);
	}),
	(CreatureController.EntityOnLandedNotify = (e) => {
		var t;
		e = MathUtils_1.MathUtils.LongToNumber(e.Ekn);
		ModelManager_1.ModelManager.CreatureModel.ExistEntity(e)
			? (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(e))?.Valid &&
				EventSystem_1.EventSystem.EmitWithTarget(
					t,
					EventDefine_1.EEventName.CharOnLand,
				)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[CreatureController.EntityOnLandedNotify] 不存在动态实体。",
					["CreatureDataId", e],
				);
	}),
	(CreatureController.Bgr = (e) => {
		var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			r = e.Bkn,
			o = e.aFn;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"World",
				17,
				"[CreatureController.LeaveSceneNotify] LeaveSceneNotify",
				["leavePlayerId", o],
				["myPlayerId]", t],
				["option", r],
			),
			o !== t
				? (ModelManager_1.ModelManager.CreatureModel.RemoveScenePlayerData(o),
					CreatureController.NotifyScenePlayerChanged(),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ScenePlayerLeaveScene,
						e.aFn,
					))
				: ModelManager_1.ModelManager.GameModeModel.HasGameModeData
					? ((ModelManager_1.ModelManager.GameModeModel.HasGameModeData = !1),
						(ModelManager_1.ModelManager.GameModeModel.JoinSceneInfo = void 0),
						o === t &&
							(ModelManager_1.ModelManager.CreatureModel.GetIsLoadingScene()
								? Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"World",
										17,
										"[CreatureController.LeaveSceneNotify] 场景加载中",
									)
								: (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
										EventSystem_1.EventSystem.Emit(
											EventDefine_1.EEventName.LeaveInstanceDungeon,
										),
									r &&
										CreatureController.ParseTravelConfig(
											e.Bkn.wkn,
											e.Bkn.Nkn,
											e.Bkn.Okn,
										),
									ModelManager_1.ModelManager.SeamlessTravelModel
										.IsSeamlessTravel
										? SeamlessTravelController_1.SeamlessTravelController.PreLeaveLevel()
										: ModelManager_1.ModelManager.GameModeModel
												.UseShowCenterText ||
											BlackScreenController_1.BlackScreenController.AddBlackScreen(
												"None",
												"LeaveScene",
											),
									EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName.DoLeaveLevel,
									),
									ModelManager_1.ModelManager.SeamlessTravelModel
										.IsSeamlessTravel &&
										SeamlessTravelController_1.SeamlessTravelController.PostLeaveLevel())))
					: (Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"World",
								3,
								"不存在场景数据，服务器下发LeaveSceneNotify流程有问题",
							),
						Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"World",
								17,
								"[CreatureController.LeaveSceneNotify] 副本Id不存在",
							));
	}),
	(CreatureController.e0r = (e) => {
		var t;
		e.gys &&
			(e = e.aFn) !==
				(t = ModelManager_1.ModelManager.CreatureModel).GetPlayerId() &&
			t.GetScenePlayerData(e)?.SetRemoteSceneLoading(!0);
	}),
	(CreatureController.t0r = (e) => {
		const t = e.aFn;
		if (
			((e = ModelManager_1.ModelManager.CreatureModel), t !== e.GetPlayerId())
		)
			if ((e = e.GetScenePlayerData(t))) {
				e.SetRemoteSceneLoading(!1);
				const r = e.ControlCreatureDataId;
				r
					? WaitEntityTask_1.WaitEntityTask.Create(r, (e) => {
							e
								? ((e =
										ModelManager_1.ModelManager.CreatureModel.GetEntity(
											r,
										).Entity),
									CreatureController.SetEntityEnable(
										e,
										!0,
										"模拟端加载完成，显示实体",
									))
								: Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"World",
										49,
										"模拟端加载完成，等待玩家当前实体加载失败",
										["playerId", t],
										["currentEntityId", r],
									);
						})
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("World", 49, "模拟端加载完成，无法获取当前实体id", [
							"playerId",
							t,
						]);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("World", 49, "模拟端加载完成，无法获取玩家数据", [
						"playerId",
						t,
					]);
	}),
	(CreatureController.i0r = (e) => {
		(e = e.H3n), HotFixUtils_1.HotFixUtils.EvalScript(e);
	}),
	(CreatureController.SceneLoadingTimeOutNotify = (e) => {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 5, "世界加载超时");
	}),
	(CreatureController.Jgr = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
		r
			? ((r = r.Entity.GetComponent(185))?.AddTag(1008164187),
				e.aFn !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
					(r?.AddTag(1961456719), r?.AddTag(1800978500)))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Animal",
					30,
					"[CreatureController.AnimalDieNotify] 不存Entity。",
					["CreatureDataId", t],
				);
	}),
	(CreatureController.Ggr = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
		r
			? (r.Entity.GetComponent(0).SetHardnessModeId(e.l7n),
				(r = r.Entity.GetComponent(51)).SetHardnessModeId(e.l7n),
				r.RefreshHardnessModeConfig())
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					15,
					"[CreatureController.HardnessModeChangedNotify] entity为空。",
					["creatureDataId", t],
				);
	}),
	(CreatureController.JoinSceneNotify = (e) => {
		CreatureController.u0r(e);
	}),
	(CreatureController.AfterJoinSceneNotify = () => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"World",
				3,
				"[CreatureController.AfterJoinSceneAsync] AfterJoinSceneAsync",
			),
			ModelManager_1.ModelManager.GameModeModel.HasGameModeData
				? ModelManager_1.ModelManager.GameModeModel.AfterJoinSceneNotifyPromise.SetResult(
						!0,
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"未下发场景数据,就下发了AfterJoinSceneNotify，服务器流程有问题",
					);
	}),
	(CreatureController.Ngr = (e) => {
		let t, r;
		if (e.fIs && -1 !== e.fIs) {
			var o,
				a = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.fIs);
			if (!a)
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"[CreatureController.SceneSubLevelsChangedNotify] 要传送的TeleportEntityId不存在。",
						["TeleportEntityId", e.fIs],
					)
				);
			(o =
				((o = a.Transform.Pos) &&
					(t = Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0)),
				a.Transform.Rot)) &&
				(r = Rotator_1.Rotator.Create(o.Y ?? 0, o.Z ?? 0, o.X ?? 0));
		}
		const n = new Array();
		var l = new Array();
		const i = new Array();
		if (ModelManager_1.ModelManager.GameModeModel.SubLevelMap)
			for (var [d] of ModelManager_1.ModelManager.GameModeModel.SubLevelMap)
				(e.CIs.includes(d) ? l : n).push(d);
		for (const t of e.CIs) l.includes(t) || i.push(t);
		const s = ModelManager_1.ModelManager.AutoRunModel;
		s.IsInAfterRunningState() &&
			s.ShouldTpAfterSkip &&
			(a = s.GetOverrideTpInfo() ?? s.GetGuaranteeTpInfo()) &&
			((t = a.Location), (r = a.Rotator)),
			ControllerHolder_1.ControllerHolder.GameModeController.ChangeSubLevel(
				n,
				i,
				0,
				t,
				r,
				(e) => {
					e ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"InstanceDungeon",
								40,
								"加载子关卡失败",
								["unloads", n],
								["newLoads", i],
							)),
						s.IsInAfterRunningState() && s.StopAutoRunAndClearInfo();
				},
			);
	}),
	(CreatureController.Ogr = (e) => {
		CreatureController.LoadOrUnloadSubLevel(e.vIs);
	}),
	(CreatureController.kgr = (e) => {
		let t, r;
		if (e.rkn && -1 !== e.rkn) {
			var o,
				a = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.rkn);
			if (!a)
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						30,
						"[CreatureController.SceneChangeDataLayerNotify] 要传送的EntityId不存在。",
						["TeleportEntityId", e.rkn],
					)
				);
			(o =
				((o = a.Transform.Pos) &&
					(t = Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0)),
				a.Transform.Rot)) &&
				(r = Rotator_1.Rotator.Create(o.Y ?? 0, o.Z ?? 0, o.X ?? 0));
		}
		const n = new Array(),
			l = new Array();
		for (const t of e.MIs) {
			var i = DataLayerById_1.configDataLayerById.GetConfig(t);
			n.push(i.DataLayer);
		}
		for (const t of e.pIs) {
			var d = DataLayerById_1.configDataLayerById.GetConfig(t);
			l.push(d.DataLayer);
		}
		ControllerHolder_1.ControllerHolder.GameModeController.SwitchDataLayer(
			n,
			l,
			t?.ToUeVector(),
			r?.ToUeRotator(),
			(e) => {
				e ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"InstanceDungeon",
							30,
							"切换DataLayer失败",
							["unloads", n.join()],
							["newLoads", l.join()],
						));
			},
		);
	}),
	(CreatureController.Fgr = (e) => {
		var t = (e = e.pys).aFn,
			r = new ScenePlayerData_1.ScenePlayerData(t),
			o = (r.SetTimerStart(), r.SetRemoteSceneLoading(!0), e.Y4n);
		for (const t of e.HEs)
			t.l3n === o && r.ControlRole(MathUtils_1.MathUtils.LongToNumber(t.rkn));
		ModelManager_1.ModelManager.CreatureModel.AddScenePlayerData(t, r),
			CreatureController.NotifyScenePlayerChanged(),
			ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(
				t,
				2,
			);
	}),
	(CreatureController.Kgr = (e) => {
		(e = MathUtils_1.MathUtils.LongToNumber(e.Ekn)),
			ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Valid ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"[CreatureController.MonsterLevelNotify] 更新怪物等级失败，找不到对应的Entity。",
						["CreatureDataId", e],
					));
	}),
	(CreatureController.SwitchBattleModeNotify = (e) => {
		for (const t of e.rTs)
			BattleSetting_1.BattleSetting.ReceiveSetModuleNetworkState(t, !0);
		for (const t of e.iTs)
			BattleSetting_1.BattleSetting.ReceiveSetModuleNetworkState(t, !1);
	}),
	(CreatureController.BattleLogNotify = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Battle", 20, "Server Log", ["log", e.oTs]);
	}),
	(CreatureController.Xgr = (e) => {
		ControllerHolder_1.ControllerHolder.GameModeController.Change(e).catch(
			() => {},
		);
	}),
	(CreatureController.eIn = (e) => {
		ModelManager_1.ModelManager.GameModeModel.ChangeSceneModeEndNotifyPromise.SetResult(
			!0,
		);
	}),
	(CreatureController.o0r = (e) => {
		var t, r;
		GlobalData_1.GlobalData.World?.IsValid() &&
			e?.Valid &&
			((t = ModelManager_1.ModelManager.CreatureModel),
			(e = e.GetComponent(0)?.GetCreatureDataId())
				? GlobalData_1.GlobalData.Networking()
					? (r = t.DelayRemoveContainer.GetEntity(e))?.Valid &&
						(t.DelayRemoveContainer.RemoveEntity(e),
						CreatureController.DestroyEntity(r))
					: CreatureController.RemoveEntity(
							e,
							"DoDelayRemoveEntityFinished",
							Protocol_1.Aki.Protocol.WBs.Proto_RemoveTypeForce,
						)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"[CreatureController.DoDelayRemoveEntityFinished] CreatureDataId无效, 延迟删除失败。",
						["CreatureDataId", e],
					));
	}),
	(CreatureController.Ygr = (e) => {
		ModelManager_1.ModelManager.CreatureModel.SetRestoreEntityId(e.ays);
	}),
	(CreatureController.$gr = (e) => {
		var t = e.XMs,
			r = ModelManager_1.ModelManager.CreatureModel;
		for (const e of Object.keys(t)) {
			var o = Number(e),
				a = t[e];
			r.RecordEntitySilenceState(o, a);
		}
	}),
	(CreatureController.zgr = (e) => {
		ModelManager_1.ModelManager.WorldModel.UpdateWorldState(e.SUs),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnReceivePlayerVar,
			);
	}),
	(CreatureController.Zgr = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e._7n);
		ModelManager_1.ModelManager.CreatureModel.GetEntity(t).Entity.GetComponent(
			0,
		).SummonEntityIds = e.Lys.map((e) => MathUtils_1.MathUtils.LongToNumber(e));
	}),
	(CreatureController.OnCreateEntityFail = (e) => {
		ModelManager_1.ModelManager.CreatureModel.RemoveEntity(
			e,
			"OnCreateEntityFail",
		);
	});
