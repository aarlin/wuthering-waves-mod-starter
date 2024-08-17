"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PerformanceGmController = void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	Json_1 = require("../../../Core/Common/Json"),
	Log_1 = require("../../../Core/Common/Log"),
	PerformanceController_1 = require("../../../Core/Performance/PerformanceController"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	OperationsPerformance_1 = require("../../Module/PerformanceCollection/OperationsPerformance"),
	CharacterBuffIds_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
	WorldFunctionLibrary_1 = require("../../World/Bridge/WorldFunctionLibrary"),
	WorldGlobal_1 = require("../../World/WorldGlobal"),
	ENTITY_PERFORMANCE_TEST_NUM = 1;
class EntityPerformanceResult extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.BlueprintType = ""),
			(this.EntityName = ""),
			(this.Score = 0);
	}
}
class PerformanceGmController {
	static a4i() {
		let e = 0,
			r = 0;
		var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
		for (let n = t.length - 1; 0 <= n; n--) {
			var o = t[n],
				a = o.Entity.GetComponent(3)?.Owner;
			if (
				a !== Global_1.Global.BaseCharacter &&
				(++r,
				(e += PerformanceController_1.PerformanceController.ConsumeTickTime(
					"EntityTick" + o.Id,
				)),
				(a = o.Entity.GetComponent(0)),
				!ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(
					a.GetCreatureDataId(),
					"EntityPerformanceTest",
				))
			)
				return -1;
		}
		return 0 < r ? e / r : 0;
	}
	static ClearEntityButRole() {
		var e = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
		for (let t = e.length - 1; 0 <= t; t--) {
			var r = e[t];
			r.Entity.GetComponent(3)?.Owner !== Global_1.Global.BaseCharacter &&
				((r = r.Entity.GetComponent(0).GetCreatureDataId()),
				ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(
					r,
					"EntityPerformanceTest",
				));
		}
		return !0;
	}
	static h4i(e) {
		let r = "Nothing";
		switch (e) {
			case 0:
				r = "";
				break;
			case 1:
				r = "Gameplay";
				break;
			case 2:
				r = "Monster";
				break;
			case 3:
				r = "NPC";
				break;
			case 4:
				r = "Collect";
				break;
			case 5:
				r = "Animal";
				break;
			case 6:
				r = "SceneObj";
				break;
			case 7:
				r = "Treasure";
				break;
			case 8:
				r = "Player";
				break;
			case 9:
				r = "Teleport";
		}
		return r;
	}
	static IIn(e) {
		return !e.includes("SimpleNPC") && !e.includes("PasserbyNPC");
	}
	static IgnoreBattle() {
		var e = Global_1.Global.BaseCharacter;
		return (
			!!e &&
			!!(e = e.CharacterActorComponent.Entity.GetComponent(157)) &&
			(e.AddBuff(CharacterBuffIds_1.buffId.IgnoreHateBuff, {
				InstigatorId: e.CreatureDataId,
				Reason: "IgnoreBattle",
			}),
			!0)
		);
	}
	static async EntityPerformanceTestAll(e) {
		e = Number(e[0]);
		var r = this.h4i(e);
		this.IgnoreBattle() ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Performance", 36, "忽略战斗失效")),
			this.ClearEntityButRole(),
			cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(0);
		let t = 0;
		OperationsPerformance_1.OperationsPerformance.StartEntityPerformanceTest(),
			OperationsPerformance_1.OperationsPerformance.NewEntityPerformanceTestPromise(),
			TimerSystem_1.TimerSystem.Delay(() => {
				var e =
						OperationsPerformance_1.OperationsPerformance.ConsumePerformanceData(),
					r = e[0];
				(t = e[1]),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Performance",
							36,
							"EntityPerformanceTestAll Init",
							["avgFPS", r],
							["avgCPU", t.toFixed(3)],
						),
					OperationsPerformance_1.OperationsPerformance.EntityPerformanceTestPromise.SetResult(
						!0,
					);
			}, 5e3),
			await OperationsPerformance_1.OperationsPerformance
				.EntityPerformanceTestPromise.Promise,
			PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(
				!0,
			);
		const o = [];
		var a = Global_1.Global.BaseCharacter.GetTransform();
		for (const e of ModelManager_1.ModelManager.CreatureModel.GetAllEntityTemplate(
			!0,
		).values())
			if (e.BlueprintType.includes(r) && this.IIn(e.Name)) {
				OperationsPerformance_1.OperationsPerformance.ClearEntityPerformanceTestPromise(),
					OperationsPerformance_1.OperationsPerformance.NewEntityPerformanceTestPromise();
				for (let r = 0; r < 1; r++)
					WorldFunctionLibrary_1.default.TestSpawnTemplateEntityPush(
						BigInt(
							ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
						),
						e.Id,
						1,
						a,
						0,
					);
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Performance",
						36,
						"EntityPerformanceTestAll Born",
						["CId", e.Id],
						["Name", e.Name],
					);
				var n = 10 * TimeUtil_1.TimeUtil.InverseMillisecond;
				TimerSystem_1.TimerSystem.Delay(() => {
					var r,
						a = this.a4i();
					-1 === a
						? (Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Performance",
									36,
									"EntityPerformanceTestAll ClearEntityButRole Error",
									["CId", e.Id],
									["Name", e.Name],
								),
							OperationsPerformance_1.OperationsPerformance.EntityPerformanceTestPromise.SetResult(
								!1,
							))
						: ((r =
								(OperationsPerformance_1.OperationsPerformance.ConsumePerformanceData()[1] -
									t) /
								1),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Performance",
									36,
									"EntityPerformanceTestAll",
									["CId", e.Id],
									["Name", e.Name],
									["avgCPU(ms)", r.toFixed(3)],
									["EntityTickTime(ms)", a.toFixed(3)],
								),
							((r = new EntityPerformanceResult()).BlueprintType =
								e.BlueprintType),
							(r.EntityName = e.Name),
							(r.Score =
								Math.floor(a * TimeUtil_1.TimeUtil.InverseMillisecond) / 10),
							o.push(r),
							OperationsPerformance_1.OperationsPerformance.EntityPerformanceTestPromise.SetResult(
								!0,
							));
				}, n),
					await OperationsPerformance_1.OperationsPerformance
						.EntityPerformanceTestPromise.Promise;
			}
		return (
			OperationsPerformance_1.OperationsPerformance.CloseEntityPerformanceTest(),
			PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(
				!1,
			),
			o.sort((e, r) => e.Score - r.Score),
			cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.TestManuallyGarbageCollection,
			),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Performance", 36, Json_1.Json.Stringify(o, 2)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Performance", 36, "EntityPerformanceTestAll Finish"),
			!0
		);
	}
	static KillAllEntityButRole() {
		this.ClearEntityButRole();
		var e = (0, puerts_1.$ref)(void 0),
			r =
				(UE.GameplayStatics.GetAllActorsOfClass(
					GlobalData_1.GlobalData.World,
					UE.TsSimpleNpc_C.StaticClass(),
					e,
				),
				(0, puerts_1.$unref)(e));
		for (let e = 0; e < r.Num(); e++) r.Get(e).K2_DestroyActor();
		return !0;
	}
	static OpenWorldEntityCatchMode(e) {
		(PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity =
			"0" !== e[0]),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Performance",
					36,
					"捕捉WorldEntityName " +
						PerformanceController_1.PerformanceController
							.IsOpenCatchWorldEntity,
				);
	}
	static EntityPerformanceTestSingle(e) {
		this.IgnoreBattle() ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Performance", 36, "忽略战斗失效"));
		var r = Global_1.Global.BaseCharacter.GetTransform();
		const t = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
			Number(e[0]),
		);
		if (!t) return !1;
		this.ClearEntityButRole(),
			cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(0),
			PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(
				!0,
			);
		for (let e = 0; e < 1; e++)
			WorldFunctionLibrary_1.default.TestSpawnTemplateEntityPush(
				BigInt(
					ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
				),
				t.Id,
				1,
				r,
				0,
			);
		return (
			(e = 10 * TimeUtil_1.TimeUtil.InverseMillisecond),
			TimerSystem_1.TimerSystem.Delay(() => {
				var e = this.a4i();
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Performance",
						36,
						"EntityPerformanceTestSingle",
						["CId", t.Id],
						["Name", t.Name],
						["Score", 100 * e],
					),
					PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(
						!1,
					),
					cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(1);
			}, e),
			!0
		);
	}
	static async EntityGpuPerformanceTestAll(e) {
		e = Number(e[0]);
		var r = this.h4i(e);
		this.IgnoreBattle() ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Performance", 36, "忽略战斗失效")),
			PerformanceController_1.PerformanceController.SetEntityGpuPerformanceTest(
				!0,
			);
		let t = "";
		var o = Global_1.Global.BaseCharacter.GetTransform();
		WorldGlobal_1.WorldGlobal.ToTsVector(o.GetLocation()).Y += 200;
		for (const e of ModelManager_1.ModelManager.CreatureModel.GetAllEntityTemplate(
			!0,
		).values())
			e.BlueprintType.includes(r) &&
				(WorldFunctionLibrary_1.default.TestSpawnTemplateEntityPush(
					BigInt(
						ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
					),
					e.Id,
					1,
					o,
					0,
				),
				(t += `'${e.BlueprintType}',`),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Performance",
						36,
						"EntityGPUPerformanceTestAll Born",
						["CId", e.Id],
						["Name", e.Name],
					),
				OperationsPerformance_1.OperationsPerformance.ClearEntityPerformanceTestPromise(),
				OperationsPerformance_1.OperationsPerformance.NewEntityPerformanceTestPromise(),
				TimerSystem_1.TimerSystem.Delay(() => {
					UE.KismetSystemLibrary.ExecuteConsoleCommand(
						GlobalData_1.GlobalData.World,
						`renderdoc.CaptureFrameWithPath D:/aki_test/renderDocGpuTest/${e.BlueprintType}.rdc`,
					),
						OperationsPerformance_1.OperationsPerformance.EntityPerformanceTestPromise.SetResult(
							!0,
						);
				}, 2 * TimeUtil_1.TimeUtil.InverseMillisecond),
				await OperationsPerformance_1.OperationsPerformance
					.EntityPerformanceTestPromise.Promise,
				this.ClearEntityButRole());
		return (
			OperationsPerformance_1.OperationsPerformance.ClearEntityPerformanceTestPromise(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Performance",
					36,
					"EntityGpuPerformanceTestAll Finish",
					["实体列表", t],
				),
			!0
		);
	}
	static EntityPerformanceTestMode(e) {
		PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(
			e,
		);
		e = e ? 0 : 1;
		var r =
			(UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"a.ParallelAnimEvaluation " + e,
			),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"a.ParallelAnimUpdate " + e,
			),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"a.ParallelAnimInterpolation " + e,
			),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"fx.Niagara.SystemSimulation.AllowASync " + e,
			),
			ModelManager_1.ModelManager.CreatureModel.GetAllEntities());
		for (let e = r.length - 1; 0 <= e; e--)
			r[e].Entity.GetComponent(99)?.SetTakeOverTick(!0);
		return !0;
	}
	static GetEntityTemplateList(e) {
		e = Number(e[0]);
		var r = this.h4i(e),
			t = [];
		for (const e of ModelManager_1.ModelManager.CreatureModel.GetAllEntityTemplate(
			!0,
		).values())
			e.BlueprintType.includes(r) && t.push(e.Id);
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Performance", 36, "实体模板id列表", ["list", t]),
			!0
		);
	}
	static async SetStandardPerformance() {
		return (
			PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(
				!0,
			),
			OperationsPerformance_1.OperationsPerformance.NewEntityPerformanceTestPromise(),
			TimerSystem_1.TimerSystem.Delay(() => {
				OperationsPerformance_1.OperationsPerformance.EntityPerformanceTestPromise.SetResult(
					!0,
				);
			}, 5e3),
			await OperationsPerformance_1.OperationsPerformance
				.EntityPerformanceTestPromise.Promise,
			OperationsPerformance_1.OperationsPerformance.ClearEntityPerformanceTestPromise(),
			PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(
				!1,
			),
			!0
		);
	}
}
exports.PerformanceGmController = PerformanceGmController;
