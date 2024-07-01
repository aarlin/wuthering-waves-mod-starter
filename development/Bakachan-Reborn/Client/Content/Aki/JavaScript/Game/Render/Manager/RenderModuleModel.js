"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RenderModuleModel = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TickSystem_1 = require("../../../Core/Tick/TickSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	WorldGlobal_1 = require("../../World/WorldGlobal"),
	CharRenderShell_1 = require("../Character/Manager/CharRenderShell"),
	RenderDataManager_1 = require("../Data/RenderDataManager"),
	DebugDrawManager_1 = require("../DebugDraw/DebugDrawManager"),
	EffectManagerBusinessProxy_1 = require("../Effect/EffectManagerBusinessProxy"),
	LensFlareManager_1 = require("../Effect/LensFlare/LensFlareManager"),
	SceneInteractionManager_1 = require("../Scene/Interaction/SceneInteractionManager"),
	ItemMaterialManager_1 = require("../Scene/Item/MaterialController/ItemMaterialManager"),
	ItemMaterialParameterCollectionController_1 = require("../Scene/Item/MaterialController/ItemMaterialParameterCollectionController"),
	RenderModuleConfig_1 = require("./RenderModuleConfig");
class RenderModuleModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.jlr = []),
			(this.Wlr = new Map()),
			(this.Klr = new Map()),
			(this.Qlr = void 0),
			(this.Xlr = 5),
			(this.$lr = 5),
			(this.Ylr = !1),
			(this.Jlr = !1),
			(this.zlr = 0);
	}
	GetCurrentKeyState(e) {
		return e === this.Qlr ? this.Xlr : 0;
	}
	GetIdleClearAtmosphere(e) {
		return e === this.Qlr && this.Ylr;
	}
	SetBattleState(e, r, t = !1) {
		(this.Qlr = e),
			(this.Xlr = r),
			(this.$lr = r),
			4 === this.Xlr ? ((this.Ylr = !0), (this.Xlr = 0)) : (this.Ylr = !1),
			(this.Jlr = t),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderBattle",
					12,
					"BOSS战设置战斗状态Inner",
					["key", e],
					["state", r],
				);
	}
	IsStateInstantTransition() {
		return this.Jlr;
	}
	Zlr(e) {
		return 4 === e
			? "无状态"
			: 0 === e
				? "静止状态"
				: 1 === e
					? "战斗1阶段"
					: 2 === e
						? "战斗2阶段"
						: 3 === e
							? "战斗3阶段"
							: "错误";
	}
	GetWuYinQuBattleDebugInfo() {
		var e = UE.NewArray(UE.BuiltinString);
		const r = new Array();
		return (
			r.push(this.GetCurrentBattleKey() + "," + this.Zlr(this.$lr)),
			this.Klr.forEach((e) => {
				UE.KismetSystemLibrary.IsValid(e) &&
					((e = e.GetKey() + "," + this.Zlr(e.GetCurrentBattleState())),
					r.push(e));
			}),
			WorldGlobal_1.WorldGlobal.ToUeStringArray(r, e),
			e
		);
	}
	GetBattleState(e) {
		return this.Qlr === e ? this.Xlr : 0;
	}
	GetCurrentBattleKey() {
		return this.Qlr;
	}
	AddBattleReference(e) {
		this.zlr++, 0 < this.zlr && this.SetStreamingSourceState(e, !0);
	}
	GetSnowIntensity() {
		return RenderDataManager_1.RenderDataManager.Get()?.GetSnowIntensity();
	}
	GetRainIntensity() {
		return RenderDataManager_1.RenderDataManager.Get()?.GetRainIntensity();
	}
	DecBattleReference() {
		this.zlr--,
			this.zlr <= 0 && this.SetStreamingSourceState(new UE.Vector(0, 0, 0), !1);
	}
	SetStreamingSourceState(e, r) {}
	GetWuYinQuBattleActorByName(e) {
		if (this.Klr.has(e)) return this.Klr.get(e);
	}
	AddWuYinQuBattleActor(e) {
		var r;
		return UE.KismetSystemLibrary.IsValid(e)
			? ((r = e.GetKey()),
				!e.IsInitialize() &&
					void 0 === this.GetWuYinQuBattleActorByName(r) &&
					!!e.Init() &&
					(this.Klr.set(r, e), !0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderBattle", 12, "无音区actor添加失败1"),
				!1);
	}
	RemoveWuYinQuBattleActor(e) {
		return UE.KismetSystemLibrary.IsValid(e)
			? ((e = e.GetKey()), !!this.Klr.has(e) && (this.Klr.delete(e), !0))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderBattle", 12, "无音区actor移除失败1"),
				!1);
	}
	AddTickableObject(e) {
		this.jlr.indexOf(e, 0) < 0 && this.jlr.push(e);
	}
	RemoveTickableObject(e) {
		(e = this.jlr.indexOf(e, 0)) < 0 ||
			(this.jlr.length <= 2
				? this.jlr.splice(e, 1)
				: ((this.jlr[e] = this.jlr[this.jlr.length - 1]), this.jlr.pop()));
	}
	AddCharRenderShell(e) {
		var r = new CharRenderShell_1.CharRenderShell();
		r.Init(e), this.Wlr.set(e, r);
	}
	RemoveCharRenderShell(e) {
		return this.Wlr.delete(e);
	}
	Tick(e) {
		const r = 0.001 * e;
		this.jlr.forEach((e) => {
			try {
				e.Tick(r);
			} catch (e) {
				e instanceof Error &&
					Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"Render",
						26,
						"TickableObject Tick执行异常",
						e,
						["error", e.message],
					);
			}
		}),
			this.Wlr.forEach((e) => {
				try {
					e.Tick(r);
				} catch (r) {
					r instanceof Error &&
						Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Render",
							26,
							"RenderShell Tick执行异常",
							r,
							["error", r.message],
							["object", e.RenderingComponent?.GetOwner()?.GetName()],
						);
				}
			}),
			TickSystem_1.TickSystem.IsPaused ||
				this.Klr.forEach((r) => {
					try {
						var t;
						UE.KismetSystemLibrary.IsValid(r) &&
							((t = r.Key?.toString()),
							this.Qlr === t
								? this.Xlr !== r.GetCurrentBattleState() &&
									r.ChangeState(this.Xlr, this.IsStateInstantTransition())
								: 0 !== r.GetCurrentBattleState() &&
									r.ChangeState(0, this.IsStateInstantTransition()),
							r.Tick(e));
					} catch (t) {
						t instanceof Error &&
							Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"Render",
								26,
								"WuYinQuBattleActor 执行异常",
								t,
								["error", t.message],
								["object", r.GetName()],
							);
					}
				});
		try {
			RenderDataManager_1.RenderDataManager.Get().TickForce(e),
				TickSystem_1.TickSystem.IsPaused ||
					RenderDataManager_1.RenderDataManager.Get().Tick(e);
		} catch (e) {
			e instanceof Error &&
				Log_1.Log.CheckError() &&
				Log_1.Log.ErrorWithStack(
					"Render",
					26,
					"RenderDataManager Tick执行异常",
					e,
					["error", e.message],
				);
		}
		try {
			TickSystem_1.TickSystem.IsPaused ||
				SceneInteractionManager_1.SceneInteractionManager.Tick(e);
		} catch (e) {
			e instanceof Error &&
				Log_1.Log.CheckError() &&
				Log_1.Log.ErrorWithStack(
					"Render",
					26,
					"SceneInteractionManager Tick执行异常",
					e,
					["error", e.message],
				);
		}
		try {
			ItemMaterialManager_1.ItemMaterialManager.Tick(e);
		} catch (e) {
			e instanceof Error &&
				Log_1.Log.CheckError() &&
				Log_1.Log.ErrorWithStack(
					"Render",
					26,
					"ItemMaterialManager Tick执行异常",
					e,
					["error", e.message],
				);
		}
		try {
			TickSystem_1.TickSystem.IsPaused ||
				DebugDrawManager_1.DebugDrawManager.Tick(e);
		} catch (e) {
			e instanceof Error &&
				Log_1.Log.CheckError() &&
				Log_1.Log.ErrorWithStack(
					"Render",
					26,
					"DebugDrawManager Tick执行异常",
					e,
					["error", e.message],
				);
		}
	}
	OnInit() {
		return (
			(this.zlr = 0),
			(this.jlr = []),
			(this.Wlr = new Map()),
			(this.Klr = new Map()),
			(this.Qlr = void 0),
			(this.Xlr = 0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderBattle", 12, "初始化BOSS战渲染模块"),
			RenderDataManager_1.RenderDataManager.Get(),
			EffectManagerBusinessProxy_1.EffectManagerBusinessProxy.Get(),
			SceneInteractionManager_1.SceneInteractionManager.Initialize(),
			ItemMaterialManager_1.ItemMaterialManager.Initialize(),
			DebugDrawManager_1.DebugDrawManager.Initialize(),
			LensFlareManager_1.LensFlareManager.Get().InitGameLogic(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportStart,
				RenderModuleModel.OnStartTeleport,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportComplete,
				RenderModuleModel.OnCompleteTeleport,
			),
			!0
		);
	}
	OnClear() {
		return (
			this.e1r(),
			(this.jlr = []),
			(this.Wlr = new Map()),
			(this.Klr = new Map()),
			(this.Qlr = void 0),
			(this.Xlr = 0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderBattle", 12, "清理BOSS战渲染模块"),
			RenderDataManager_1.RenderDataManager.Get().Destroy(),
			DebugDrawManager_1.DebugDrawManager.Destroy(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportStart,
				RenderModuleModel.OnStartTeleport,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportComplete,
				RenderModuleModel.OnCompleteTeleport,
			),
			!0
		);
	}
	OnLeaveLevel() {
		return (
			this.e1r(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("RenderBattle", 12, "BOSS战渲染模块离开关卡"),
			!0
		);
	}
	e1r() {
		(this.jlr = []),
			(this.Wlr = new Map()),
			(this.Klr = new Map()),
			(this.Qlr = void 0),
			(this.Xlr = 0),
			(this.zlr = 0);
	}
	EnableGlobalData(e) {
		return -1;
	}
	EnableActorData(e, r) {
		return r && e
			? ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(r, e)
			: -1;
	}
	DisableGlobal(e) {}
	DisableAllGlobal() {}
	DisableActorData(e) {
		ItemMaterialManager_1.ItemMaterialManager.DisableActorData(e);
	}
	DisableAllActorData() {
		ItemMaterialManager_1.ItemMaterialManager.DisableAllActorData();
	}
	UpdateItemMaterialParameterCollection(e) {
		ItemMaterialParameterCollectionController_1.ItemMaterialParameterCollectionController.UpdateMaterialParameterCollection(
			e,
			RenderDataManager_1.RenderDataManager.Get().GetSceneInteractionMaterialParameterCollection(),
		);
	}
	static OnStartTeleport() {
		UE.KuroRenderingRuntimeBPPluginBPLibrary.StopSomeWeatherBeforeTeleport(
			GlobalData_1.GlobalData.World,
		);
	}
	static OnCompleteTeleport() {
		UE.KuroRenderingRuntimeBPPluginBPLibrary.ResumeSomeWeatherAfterTeleport(
			GlobalData_1.GlobalData.World,
		);
	}
}
exports.RenderModuleModel = RenderModuleModel;
