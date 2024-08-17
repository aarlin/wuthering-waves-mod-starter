"use strict";
var _a,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, o, r) {
			var f,
				a = arguments.length,
				i =
					a < 3
						? t
						: null === r
							? (r = Object.getOwnPropertyDescriptor(t, o))
							: r;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				i = Reflect.decorate(e, t, o, r);
			else
				for (var n = e.length - 1; 0 <= n; n--)
					(f = e[n]) &&
						(i = (a < 3 ? f(i) : 3 < a ? f(t, o, i) : f(t, o)) || i);
			return 3 < a && i && Object.defineProperty(t, o, i), i;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectSystem = exports.EFFECT_REASON_LENGTH_LIMIT = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
	Info_1 = require("../../Core/Common/Info"),
	Log_1 = require("../../Core/Common/Log"),
	Stats_1 = require("../../Core/Common/Stats"),
	Time_1 = require("../../Core/Common/Time"),
	Lru_1 = require("../../Core/Container/Lru"),
	Queue_1 = require("../../Core/Container/Queue"),
	EffectSpecDataByPath_1 = require("../../Core/Define/ConfigQuery/EffectSpecDataByPath"),
	Protocol_1 = require("../../Core/Define/Net/Protocol"),
	EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
	GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
	PerformanceDecorators_1 = require("../../Core/Performance/PerformanceDecorators"),
	Macro_1 = require("../../Core/Preprocessor/Macro"),
	ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	PublicUtil_1 = require("../Common/PublicUtil"),
	TimeUtil_1 = require("../Common/TimeUtil"),
	GameQualitySettingsManager_1 = require("../GameQualitySettings/GameQualitySettingsManager"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager"),
	EffectModelNiagara_1 = require("../Render/Effect/Data/EffectModelNiagara"),
	CustomMap_1 = require("../World/Define/CustomMap"),
	GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator"),
	EEffectCreateFromType_1 = require("./EEffectCreateFromType"),
	EffectDefine_1 = require("./EffectDefine"),
	EffectHandle_1 = require("./EffectHandle"),
	EffectProfiler_1 = require("./EffectProfiler/EffectProfiler"),
	EffectModelTrailSpec_1 = require("./EffectSpec/EffectModelTrailSpec"),
	PlayerEffectContainer_1 = require("./PlayerEffectContainer"),
	EFFECT_SPEC_DATA_PATH =
		((exports.EFFECT_REASON_LENGTH_LIMIT = 4), "../Config/Client/EffectData/"),
	EFFECT_LRU_CAPACITY = 100,
	PERCENT = 100,
	lruFolderPath = new UE.FName("LruActorPool"),
	CHECK_EFFECT_OWNER_INTERVAL = 6e4,
	MIN_NIAGARA_SIMULATION_TICK_TIME = 0.033;
class EffectSystem {
	static Initialize() {
		return (
			(this.Mfe = UE.NewObject(
				UE.HoldPreloadObject.StaticClass(),
				GlobalData_1.GlobalData.GameInstance,
			)),
			this.Sfe(),
			EffectProfiler_1.EffectProfiler.SetEnable(
				Info_1.Info.IsPlayInEditor && this.Efe,
			),
			(this.yfe = new PlayerEffectContainer_1.PlayerEffectContainer()),
			this.yfe.Initialize(),
			(this.Ife = !0),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TriggerUiTimeDilation,
				EffectSystem.Tfe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SetNiagaraQuality,
				EffectSystem.C7s,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AfterGameQualitySettingsManagerInitialize,
				EffectSystem.C7s,
			),
			!0
		);
	}
	static Clear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AfterGameQualitySettingsManagerInitialize,
				EffectSystem.C7s,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SetNiagaraQuality,
				EffectSystem.C7s,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TriggerUiTimeDilation,
				EffectSystem.Tfe,
			),
			this.ClearPool(),
			(this.Lfe = !1),
			(EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds = 0),
			this.Mfe?.Clear(),
			(this.Mfe = void 0),
			this.yfe.Clear(),
			(this.Ife = !1),
			(this.Dfe = !0)
		);
	}
	static InitializeWithPreview(e) {
		Info_1.Info.IsGameRunning() ||
			(!e && this.Lfe) ||
			((this.Lfe = !0), this.Rfe());
	}
	static g7s() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("RenderEffect", 37, "Open Niagara Down Sampling"),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"Kuro.Niagara.SystemSimulation.TickDeltaTime 0.033",
			),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"Kuro.Niagara.SystemSimulation.SpawnAlignment 1",
			);
	}
	static f7s() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("RenderEffect", 37, "Close Niagara Down Sampling"),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"Kuro.Niagara.SystemSimulation.TickDeltaTime -1",
			),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"Kuro.Niagara.SystemSimulation.SpawnAlignment 0",
			);
	}
	static Ufe(e, t, o, r, f = !0, a, i, n, s) {
		const c = e.Id;
		var E;
		e.IsRoot() &&
			(this.Afe.Set(c, e),
			Info_1.Info.IsGameRunning() &&
				UE.KuroStaticLibrary.IsImplementInterface(
					t.GetClass(),
					UE.BPI_EffectInterface_C.StaticClass(),
				) &&
				(E = t)?.IsValid() &&
				E.SetHandle(c),
			t.IsA(UE.TsEffectActor_C.StaticClass())
				? t.SetEffectHandle(e)
				: t.IsA(UE.BP_EffectPreview_C.StaticClass()) && (t.EffectView = c)),
			a?.(c),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CreateEffectHandle,
				c,
			),
			e.SetIsInitializing(!0),
			this.Pfe(e, (o, a) => {
				Stats_1.Stat.Enable,
					o
						? (this.Mfe?.AddEntityAsset(e.HoldObjectId, a),
							t?.IsValid()
								? t.GetWorld()?.IsValid()
									? this.xfe(e, f, a, n).then((t) => {
											switch (
												(EffectEnvironment_1.EffectEnvironment.UseLog &&
													Log_1.Log.CheckInfo() &&
													Log_1.Log.Info(
														"RenderEffect",
														3,
														"特效框架:InitHandle回调",
														["句柄Id", e.Id],
														["父句柄Id", e.GetRoot()?.Id],
														["Path", e.Path],
														["Result", t],
														["Reason", r],
													),
												t)
											) {
												case 2:
												case 1:
													return (
														this.wfe(i, 2, c),
														void this.Bfe(
															e,
															"[SpawnEffectWithActor.LoadEffectData.InitHandle] InitHandle有特效有可能被销毁了或者取消了",
															!0,
														)
													);
												case 0:
													return (
														EffectEnvironment_1.EffectEnvironment.UseLog &&
															Log_1.Log.CheckInfo() &&
															Log_1.Log.Info(
																"RenderEffect",
																3,
																"特效框架:InitHandle失败，删除句柄",
																["句柄Id", e.Id],
																["父句柄Id", e.GetRoot()?.Id],
																["Path", e.Path],
																["Result", t],
																["Reason", r],
															),
														this.wfe(i, 0, c),
														void this.Bfe(
															e,
															"[SpawnEffectWithActor.LoadEffectData.InitHandle] InitHandle失败",
															!0,
														)
													);
												case 3:
													return (
														this.wfe(i, 3, c),
														void this.StopEffect(e, e.StopReason, !0)
													);
												case 4:
													return (
														EffectEnvironment_1.EffectEnvironment.UseLog &&
															Log_1.Log.CheckInfo() &&
															Log_1.Log.Info(
																"RenderEffect",
																37,
																"特效框架:InitHandle失败，EffectActor已经失效",
																["句柄Id", e.Id],
																["Path", e.Path],
																["Reason", r],
															),
														this.wfe(i, 0, c),
														void this.Bfe(
															e,
															"[InitHandle] EffectActor已经失效",
															!0,
														)
													);
											}
											this.wfe(i, t, c), this.wfe(s, t, c);
										})
									: (this.Bfe(
											e,
											"[SpawnEffectWithActor.LoadEffectData] actor的world无效了",
											!0,
										),
										this.wfe(i, 2, c))
								: (this.Bfe(
										e,
										"[SpawnEffectWithActor.LoadEffectData]1 Result:" + o,
										!0,
									),
									this.wfe(i, 2, c)))
						: (this.Bfe(
								e,
								"[SpawnEffectWithActor.LoadEffectData]1 Result:" + o,
								!0,
							),
							this.wfe(i, 0, 0));
			});
	}
	static bfe(e, t, o, r, f, a, i = !0, n, s, c, E = !0, l, h = 3) {
		if (!e)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						37,
						"[EffectSystem.SpawnEffectWithActor]worldContext参数无效",
						["Path", o],
						["Reason", r],
					),
				this.wfe(c, 0, 0),
				0
			);
		if (!r)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						37,
						"[EffectSystem.SpawnEffectWithoutActor]Reason不能使用undefined",
						["Path", o],
						["Reason", r],
					),
				this.wfe(c, 0, 0),
				0
			);
		if (r.length < exports.EFFECT_REASON_LENGTH_LIMIT)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						37,
						"[EffectSystem.SpawnEffectWithoutActor]Reason字符串长度必须大于等于限制字符数量",
						["Reason", r],
						["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
					),
				this.wfe(c, 0, 0),
				0
			);
		if (!o)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						37,
						"[EffectSystem.SpawnEffectWithoutActor]创建特效失败，因为Path无效",
						["Path", o],
						["Reason", r],
					),
				this.wfe(c, 0, 0),
				0
			);
		var g = this.qfe(o, !1),
			d = this.Gfe(o, r, !1, g);
		return d
			? (d.SetEffectType(h),
				(h = this.Nfe(t, o, n, E, void 0, d, r, a, g ? g.LifeTime : 0)),
				(t = this.Ofe(h)) ? (h.PendingInit(e, o, r, f, i, s, c, l), t) : 0)
			: (this.wfe(c, 0, 0), 0);
	}
	static Ofe(e) {
		let t = 0,
			o = 0;
		if (this.Effects.length < this.aY)
			(t = this.Effects.length), this.Effects.push(e), this.rY.push(1), (o = 1);
		else {
			if (!(0 < this.nY.length)) {
				if (
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							3,
							"[特效句柄分配错误]无法分配特效句柄，超出设计最大数量",
							["MaxIndex", this.aY],
							["Effects.length", this.Effects.length],
							["特效总数", this.kfe],
							["句柄总数", this.Ffe],
						),
					this.Dfe)
				) {
					this.Dfe = !1;
					var r = new Map(),
						f = new Map();
					for (let e = 0; e < this.Effects.length; e++) {
						var a,
							i = this.Effects[e];
						i
							? i.IsRoot &&
								(r.has(i.Path)
									? ((a = r.get(i.Path) + 1), r.set(i.Path, a))
									: r.set(i.Path, 1),
								f.has(i.CreateReason)
									? ((a = f.get(i.CreateReason) + 1), f.set(i.CreateReason, a))
									: f.set(i.CreateReason, 1))
							: Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"RenderEffect",
									37,
									"[特效句柄分配错误]句柄分配完，但容器中还有Undefined的位",
									["Index", e],
								);
					}
					var n = new Array();
					for (const e of r) e[1] < 5 || n.push([e[0], e[1]]);
					n.sort((e, t) => t[1] - e[1]);
					let e = "\n";
					for (const t of n) e += t[0] + "|" + t[1] + "\n";
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							37,
							"[特效句柄分配错误]此时占据句柄的Path统计",
							["统计", e],
						);
					var s = new Array();
					for (const e of f) e[1] < 5 || s.push([e[0], e[1]]);
					s.sort((e, t) => t[1] - e[1]), (e = "\n");
					for (const t of s) e += t[0] + "|" + t[1] + "\n";
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							37,
							"[特效句柄分配错误]此时占据句柄的CreateReason统计",
							["统计", e],
						);
				}
				return 0;
			}
			(t = this.nY.pop()),
				(this.Effects[t] = e),
				(o = ++this.rY[t]) > this.hY && ((o = 1), (this.rY[t] = o));
		}
		this.Ffe++, e.IsRoot() && this.kfe++;
		var c = (t << this.Vfe) | o;
		return (e.Id = c), e.Id;
	}
	static Hfe(e, t, o) {
		return !(
			!this.jfe ||
			(3 !== t && 0 !== t) ||
			o >= GameBudgetAllocatorConfigCreator_1.EFFECT_IMPORTANCE_ENABLE_RANGE ||
			((t =
				GameBudgetInterfaceController_1.GameBudgetInterfaceController
					.CenterRole)?.IsValid() &&
				e &&
				UE.Vector.Distance(e, t.K2_GetActorLocation()) < o)
		);
	}
	static wfe(e, t, o) {
		e?.(t, o);
	}
	static Kfe(e) {
		e?.IsRoot() &&
			(e = e.GetSureEffectActor())?.IsValid() &&
			(e.IsA(UE.TsEffectActor_C.StaticClass()) ||
				e.IsA(UE.BP_EffectPreview_C.StaticClass())) &&
			e.K2_DestroyActor();
	}
	static Bfe(e, t, o = !1) {
		if (!e)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderEffect", 3, "删除的handle参数为undefined", [
						"Reason",
						t,
					]),
				!1
			);
		if (e.IsDestroy()) return !1;
		if (!t)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"StopEffect的Reason不能使用undefined",
						["句柄Id", e.Id],
						["Path", e.Path],
						["Reason", t],
					),
				!1
			);
		if (t.length < exports.EFFECT_REASON_LENGTH_LIMIT)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"StopEffect的Reason字符串长度必须大于等于限制字符数量",
						["句柄Id", e.Id],
						["Path", e.Path],
						["Reason", t],
						["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
					),
				!1
			);
		var r = e.Id;
		if (
			(EffectEnvironment_1.EffectEnvironment.UseLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderEffect",
					3,
					"特效框架:删除句柄",
					["句柄Id", e.Id],
					["IsRoot", e.IsRoot()],
					["Path", e.Path],
					["IsPlaying", e.IsPlaying()],
					["IsStopping", e.IsStopping()],
					["Reason", t],
				),
			e.IsRoot())
		) {
			var f = e.GetSureEffectActor();
			if (
				(f?.IsValid() &&
					f.RootComponent?.bHiddenInGame &&
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"RenderEffect",
						3,
						"特效的RootComponent.bHiddenInGame被设置为true，请先调用DestroyEffect",
						["句柄Id", e.Id],
						["IsRoot", e.IsRoot()],
						["Path", e.Path],
						["Reason", t],
					),
				this.Afe.Remove(e.Id),
				e.Stop(t, !0),
				!o && !e.IsPendingInit && this.$fe(e))
			)
				return e.ExecuteStopCallback(), this.Yfe(r), !0;
			if ((this.Jfe(e), e.ExecuteStopCallback(), !this.zfe(e))) return !1;
			if (!this.Zfe(e)) return !1;
		}
		return (
			this.Mfe?.RemoveEntityAssets(e.HoldObjectId),
			e.SetContext(void 0),
			e.SetTimeScale(1),
			e.SetEffectSpec(void 0),
			e.SetEffectActor(void 0),
			this.Yfe(r),
			EffectEnvironment_1.EffectEnvironment.UseLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderEffect",
					3,
					"特效框架:统计特效数量",
					["特效总数", this.kfe],
					["句柄总数", this.Ffe],
				),
			!0
		);
	}
	static Yfe(e) {
		var t = e >>> this.Vfe,
			o = this.Effects[t];
		return (
			!!o &&
			o.Id === e &&
			(this.nY.push(t),
			(this.Effects[t] = void 0),
			this.Ffe--,
			o.IsRoot() && this.kfe--,
			!0)
		);
	}
	static epe(e, t, o, r = !0, f, a, i, n, s = 3) {
		if (Info_1.Info.IsGameRunning()) {
			var c = this.ipe(t, f);
			if (c)
				if (c?.GetSureEffectActor()?.IsValid()) {
					if (
						((c.IsPendingStop = !1),
						(c.CreateReason = o),
						c.SetContext(f),
						(c.InContainer = !1),
						c.SetBornFrameCount(),
						c.GetEffectSpec().SetEffectType(s),
						(c.CreateTime = Time_1.Time.Now),
						(o = c.GetSureEffectActor()).SetActorHiddenInGame(!1),
						o.K2_SetActorTransform(e, !1, void 0, !0),
						o.K2_DetachFromActor(1, 1, 1),
						o.OnEndPlay.Clear(),
						c.RegisterActorDestroy(),
						o.RootComponent.bHiddenInGame &&
							o.RootComponent.SetHiddenInGame(!1, !0),
						c.GetEffectSpec().SetProxyHandle(c),
						c.Replay(),
						(f = this.Ofe(c)))
					)
						return (
							o.IsA(UE.TsEffectActor_C.StaticClass())
								? ((s = o).SetEffectHandle(c), (s.InPool = 0))
								: o.IsA(UE.BP_EffectPreview_C.StaticClass()) &&
									(o.EffectView = f),
							this.Afe.Set(f, c),
							a?.(c.Id),
							this.ope(c)
								? c.StopEffect("[EffectSystem.TryCreateFromContainer] 屏蔽特效")
								: (r || c.GetEffectData()?.AutoPlay) &&
									(n?.(c.Id),
									c.PlayEffect(
										"[EffectSystem.TryCreateFromContainer]自动播放",
									)),
							c
						);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							3,
							"特效的Actor非法销毁(从容器中取出来)",
							["句柄Id", c.Id],
							["Path", t],
						),
						this.Jfe(c),
						this.zfe(c),
						this.Zfe(c);
		}
	}
	static $fe(e) {
		if (!EffectEnvironment_1.EffectEnvironment.UsePool) return !1;
		if (!this.Ife) return !1;
		if (Info_1.Info.IsInCg()) return !1;
		if (!Info_1.Info.IsGameRunning()) return !1;
		if (e.IsPreview) return !1;
		if (!e.IsRoot()) return !1;
		if (e.IsExternalActor) return !1;
		if (!e.IsDone()) return !1;
		var t = e.GetSureEffectActor();
		if (!t?.IsValid()) return !1;
		if (!t.GetWorld()?.IsValid()) return !1;
		(t.InPool = 2),
			0 < e.CreateSource && ((e.InContainer = !0), e.OnEnterPool());
		const o = e.Path,
			r = e.Id;
		return (
			t.OnEndPlay.Add((e, t) => {
				switch (t) {
					case 2:
					case 4:
						return;
				}
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"特效的Actor非法销毁(在容器里面)",
						["句柄Id", r],
						["Path", o],
					);
			}),
			this.npe(e)
		);
	}
	static zfe(e) {
		return !!e.End();
	}
	static Zfe(e) {
		if (!e.Clear()) return !1;
		e.Destroy();
		var t = e.GetSureEffectActor();
		return (
			e.IsExternalActor ||
				(t?.IsValid() &&
					(t.IsA(UE.TsEffectActor_C.StaticClass()) ||
						t.IsA(UE.BP_EffectPreview_C.StaticClass())) &&
					(!e.IsPreview && Info_1.Info.IsGameRunning()
						? (t.OnEndPlay.Clear(),
							ActorSystem_1.ActorSystem.Put(t),
							(t.InPool = 1))
						: t.K2_DestroyActor())),
			this.Mfe?.RemoveEntityAssets(e.HoldObjectId),
			e.SetContext(void 0),
			e.SetTimeScale(1),
			e.SetEffectSpec(void 0),
			e.SetEffectActor(void 0),
			!0
		);
	}
	static Rfe() {
		this.Sfe(!0);
	}
	static Sfe(e = !1) {
		if (e || !PublicUtil_1.PublicUtil.UseDbConfig())
			if (
				((e = (0, PublicUtil_1.getConfigPath)(EFFECT_SPEC_DATA_PATH)),
				UE.BlueprintPathsLibrary.DirectoryExists(e))
			)
				try {
					this.lpe.clear();
					var t,
						o = UE.KuroStaticLibrary.LoadFilesRecursive(e, "*.json", !0, !1),
						r = new Array();
					for (let e = 0; e < o.Num(); ++e) r.push(o.Get(e));
					for (const e of r)
						!e ||
							e.length < 1 ||
							((t = JSON.parse(e)), this.lpe.set(t.Path.toLowerCase(), t));
				} catch (e) {
					e instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"RenderEffect",
								3,
								"读取EffectSpec.json异常",
								e,
								["Name", this.constructor.name],
								["error", e.message],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"RenderEffect",
								3,
								"读取EffectSpec.json异常",
								["Name", this.constructor.name],
								["error", e],
							);
				}
			else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("World", 3, "不存在EffectSpec配置文件目录", [
						"Path",
						e,
					]);
	}
	static Tick(e) {
		var t = e * TimeUtil_1.TimeUtil.Millisecond;
		if (
			!GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen ||
			Info_1.Info.IsInCg()
		)
			for (const e of this.Afe.GetItems()) e.Tick(t);
		if (((this._pe -= e), this._pe < 0)) {
			this._pe = 6e4;
			for (const e of this.Afe.GetItems())
				e.IsLoop &&
					!e.CheckOwner() &&
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Render",
							37,
							"特效框架:Handle的Owner已经销毁，但Handle没有及时回收",
							["句柄Id", e.Id],
							["Path", e.Path],
							["CreateReason", e.CreateReason],
						),
					this.upe.Push([e, "Owner of handle is invalid"]));
		}
	}
	static AfterTick(e) {
		for (; this.upe.Size; ) {
			var t = this.upe.Pop(),
				o = t[0];
			this.IsValid(o.Id) && this.StopEffect(o, t[1], !0);
		}
	}
	static cpe(e) {
		var t = e >>> this.Vfe;
		if ((t = this.Effects[t]) && t.Id === e) return t;
	}
	static mpe(e, t) {
		let o;
		return UE.KuroEffectLibrary.EqualWorld(
			e.GetWorld(),
			GlobalData_1.GlobalData.World,
		) && Info_1.Info.IsGameRunning()
			? (o = ActorSystem_1.ActorSystem.Get(
					UE.TsEffectActor_C.StaticClass(),
					t,
				))?.IsValid()
				? (o.K2_SetActorTransform(t, !1, void 0, !0),
					(o.bIsPermanentActor = !0),
					o.SetActorTickEnabled(!1),
					o)
				: void 0
			: (o = UE.KuroRenderingRuntimeBPPluginBPLibrary.SpawnActorFromClass(
					e,
					UE.BP_EffectPreview_C.StaticClass(),
					t,
				));
	}
	static fpe(e, t) {
		return (e = e && this.qfe(e, t)) ? e.EffectRegularType : 0;
	}
	static ppe(e) {
		if (e < 0 || 20 <= e)
			return GameBudgetAllocatorConfigCreator_1.EFFECT_ENABLE_RANGE;
		let t = this.vpe.get(e);
		return (
			t ||
				((t =
					UE.KuroEffectLibrary.GetNiagaraEffectRegularTypeScalabilitySettingsMaxDistance(
						e,
					)) <= 0 &&
					(t = GameBudgetAllocatorConfigCreator_1.EFFECT_ENABLE_RANGE),
				this.vpe.set(e, t)),
			t
		);
	}
	static Gfe(e, t, o, r = void 0) {
		if ((Stats_1.Stat.Enable, e)) {
			let f = r;
			if ((f = f || this.qfe(e, o)))
				if (EffectDefine_1.effectSpecMap) {
					if ((r = EffectDefine_1.effectSpecMap.get(f.SpecType))) return r();
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							3,
							"MakeEffectSpec失败，该特EffectModel的类型需要在EffectDefine.ts中进行注册。",
							["Path", e],
							["Reason", t],
						);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							3,
							"MakeEffectSpec失败，因为effectSpecMap无效",
							["Path", e],
							["Reason", t],
						);
			else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"MakeEffectSpec失败，因为EffectSpec.json找不到该特效（注意查看大小写是否有问题？）",
						["Path", e],
						["Reason", t],
					);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("RenderEffect", 3, "MakeEffectSpec失败，因为path无效", [
					"Path",
					e,
				]);
	}
	static L0(e) {
		return (
			Info_1.Info.IsPlayInEditor &&
			void 0 !== e &&
			e.GetWorld() !== GlobalData_1.GlobalData.World
		);
	}
	static Nfe(e, t, o, r, f, a, i, n, s) {
		let c;
		var E = this.L0(f);
		return (
			((c =
				r || E ? new EffectHandle_1.EffectHandle() : this.Spe(t, o)).IsPreview =
				E),
			(c.Parent = e),
			(c.HoldObjectId = ++this.Epe),
			(c.Path = t),
			c.SetContext(o),
			(c.IsExternalActor = r),
			(c.EffectEnableRange = n),
			f && (c.SetEffectActor(f), c.RegisterActorDestroy()),
			c.SetEffectSpec(a),
			a.SetProxyHandle(c),
			(c.CreateReason = i),
			c.SetBornFrameCount(),
			(c.LifeTime = s),
			(c.CreateTime = Time_1.Time.Now),
			c
		);
	}
	static Pfe(e, t) {
		Stats_1.Stat.Enable;
		const o = e.Path;
		o
			? e.IsPreview || Info_1.Info.IsInCg()
				? (e = ResourceSystem_1.ResourceSystem.Load(
						o,
						UE.EffectModelBase,
					))?.IsValid()
					? t(!0, e)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"RenderEffect",
								3,
								"加载EffectModelBase失败，因为asset无效",
								["Path", o],
							),
						t(!1, void 0))
				: ResourceSystem_1.ResourceSystem.LoadAsync(
						o,
						UE.EffectModelBase,
						(e) => {
							e?.IsValid()
								? t(!0, e)
								: (Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"RenderEffect",
											3,
											"加载EffectModelBase失败，因为asset无效",
											["Path", o],
										),
									t(!1, void 0));
						},
					)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"加载EffectModelBase失败，因为path无效",
						["Path", o],
					),
				t(!1, void 0));
	}
	static async xfe(e, t, o, r) {
		Stats_1.Stat.Enable;
		var f = Info_1.Info.IsGameRunning()
			? GlobalData_1.GlobalData.IsEs3
			: 0 ===
				UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
					UE.EditorLevelLibrary.GetEditorWorld(),
				);
		if (o.DisableOnMobile && f) return 1;
		if (5 !== (f = await e.Init(o)))
			return (
				0 === f &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"EffectHandle执行Init失败",
						["句柄Id", e.Id],
						["Path", e.Path],
					),
				f
			);
		if (e.IsRoot()) {
			if (!e.Start())
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							3,
							"EffectHandle执行Start失败",
							["句柄Id", e.Id],
							["Path", e.Path],
						),
					0
				);
			if (e.IsPendingStop) return 3;
			if (this.ope(e)) return (e.StopReason = "屏蔽特效"), 3;
			if ((o = e.GetSureEffectActor()) && !o.IsValid()) return 4;
			e.IsPendingPlay
				? (r?.(e.Id), e.PlayEffect(e.PlayReason))
				: void 0 === t
					? e.GetEffectData()?.AutoPlay &&
						(r?.(e.Id),
						e.PlayEffect(
							"[EffectSystem.InitHandle] EffectModelBase.AutoPlay=true",
						))
					: t &&
						(r?.(e.Id),
						e.PlayEffect(
							"[EffectSystem.InitHandle] SpawnEffect(autoPlay=true)",
						));
		}
		return 5;
	}
	static ope(e) {
		var t;
		return (
			!!EffectEnvironment_1.EffectEnvironment.DisableOtherEffect &&
			!(
				!(t = e.GetContext()) ||
				e.GetEffectData()?.IgnoreDisable ||
				!(t.CreateFromType & EEffectCreateFromType_1.NEED_CHECK_DISABLE_MASK) ||
				!(e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
					t.EntityId,
				))?.Valid ||
				(t = e.Entity.GetComponent(0)).GetEntityType() !==
					Protocol_1.Aki.Protocol.wks.Proto_Player ||
				t.GetPlayerId() ===
					ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
			)
		);
	}
	static ClearPool() {
		this.Lru.Clear(), this.yfe.ClearPool();
	}
	static Spe(e, t) {
		return this.yfe.CheckGetCondition(t)
			? this.yfe.CreateEffectHandleFromPool(e, t)
			: ((t = this.Lru.Create(e)) && (t.CreateSource = 1), t);
	}
	static ipe(e, t) {
		return this.yfe.CheckGetCondition(t)
			? this.yfe.GetEffectHandleFromPool(e, t)
			: this.Lru.Get(e);
	}
	static npe(e) {
		return e.CreateFromPlayerEffectPool
			? (EffectEnvironment_1.EffectEnvironment.UseLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"RenderEffect",
						37,
						"特效框架:句柄回收到池中(PlayerEffectPool)",
						["句柄Id", e.Id],
						["IsRoot", e.IsRoot()],
						["Path", e.Path],
					),
				this.yfe.PutEffectHandleToPool(e))
			: 1 === e.CreateSource &&
					(EffectEnvironment_1.EffectEnvironment.UseLog &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"RenderEffect",
							3,
							"特效框架:句柄回收到池中(LRU)",
							["句柄Id", e.Id],
							["IsRoot", e.IsRoot()],
							["Path", e.Path],
						),
					this.Lru.Put(e.GetEffectSpec().GetProxyHandle()));
	}
	static Jfe(e) {
		return (
			!!e &&
			(e.CreateFromPlayerEffectPool
				? this.yfe.LruRemoveExternal(e)
				: 1 === e.CreateSource && this.Lru.RemoveExternal(e))
		);
	}
	static qfe(e, t = !1) {
		var o = e.toLowerCase();
		return t || !PublicUtil_1.PublicUtil.UseDbConfig()
			? (0 === this.lpe.size && Info_1.Info.IsPlayInEditor && this.Sfe(!0),
				this.lpe.get(o))
			: ((t = EffectSpecDataByPath_1.configEffectSpecDataByPath.GetConfig(o)) ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							3,
							"EffectSpec配置中找不到该特效（注意查看大小写是否有问题？）",
							["Path", e],
						)),
				t);
	}
	static InitHandleWhenEnable(e) {
		var t = e.InitCache;
		if (!t) return !1;
		let o = t.WorldContext;
		o?.IsValid() ||
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"RenderEffect",
					37,
					"InitHandleWhenEnable worldContext is invalid",
					["path", t.Path],
				),
			(o = GlobalData_1.GlobalData.World));
		var r = this.mpe(o, t.EffectActorHandle.Transform);
		return r?.IsValid()
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("RenderEffect", 37, "EffectHandle.SetEffectActor", [
						"Id",
						e.Id,
					]),
				e.SetEffectActor(r),
				e.RegisterActorDestroy(),
				this.Ufe(
					e,
					r,
					t.Path,
					t.Reason,
					t.AutoPlay,
					t.BeforeInitCallback,
					t.Callback,
					t.BeforePlayCallback,
					(e, t) => {
						5 === e &&
							((e = this.cpe(t)).InitEffectActorAfterPendingInit(),
							e.PlayEffectAfterPendingInit(),
							e.ClearInitCache());
					},
				),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[EffectSystem.InitHandleFromSelf]创建actor失败",
						["Reason", t.Reason],
					),
				!1);
	}
	static SpawnEffectWithActor(
		e,
		t,
		o,
		r,
		f,
		a = !0,
		i,
		n,
		s,
		c = !0,
		E,
		l = 3,
		h = void 0,
	) {
		let g;
		if ((Stats_1.Stat.Enable, (g = t ? this.ype : c ? this.Ipe : this.Tpe), !e))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"EffectSystem.SpawnEffectWithActor的worldContext参数无效",
						["Path", r],
						["Reason", f],
					),
				0
			);
		if (!o?.IsValid())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"EffectSystem.SpawnEffectWithActor失败，因为actor参数无效",
						["Path", r],
						["Reason", f],
					),
				this.wfe(s, 0, 0),
				0
			);
		if (UE.KuroStaticLibrary.IsWorldTearingDown(o.GetWorld()))
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Entity",
						3,
						"EffectSystem.SpawnEffectWithActor失败，actor的world无效",
						["Path", r],
						["Reason", f],
					),
				this.wfe(s, 0, 0),
				0
			);
		if (!f)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"EffectSystem.SpawnEffectWithActor的Reason不能使用undefined",
						["Path", r],
						["Reason", f],
					),
				0
			);
		if (f.length < exports.EFFECT_REASON_LENGTH_LIMIT)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"EffectSystem.SpawnEffectWithActor的Reason字符串长度必须大于等于限制字符数量",
						["EffectActor", o.GetName()],
						["Reason", f],
						["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
					),
				0
			);
		if (!r)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						3,
						"创建特效失败，因为Path无效",
						["Path", r],
						["Reason", f],
					),
				this.wfe(s, 0, 0),
				0
			);
		e = this.L0(o);
		var d = this.qfe(r, e),
			S = this.Gfe(r, f, e, d);
		if (!S) return this.wfe(s, 0, 0), 0;
		S.SetEffectType(l);
		let I = h;
		return (
			(I = I || this.ppe(this.fpe(r, e))),
			(l = this.Nfe(t, r, i, c, o, S, f, I, d ? d.LifeTime : 0)),
			(h = this.Ofe(l))
				? (EffectEnvironment_1.EffectEnvironment.UseLog &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"RenderEffect",
							3,
							"特效框架:创建句柄",
							["句柄Id", l.Id],
							["父句柄Id", t?.Id],
							["特效总数", this.kfe],
							["句柄总数", this.Ffe],
							["IsRoot", l.IsRoot()],
							["Path", l.Path],
							["Lru命中率%", 100 * this.Lru.HitRate],
							["Reason", f],
						),
					this.Ufe(l, o, r, f, a, n, s, E),
					h)
				: 0
		);
	}
	static SpawnChildEffect(e, t, o, r, f, a = !0, i, n, s) {
		return (
			(e = this.SpawnEffectWithActor(
				e,
				t,
				o,
				r,
				f,
				a,
				i,
				n,
				s,
				!0,
				void 0,
				3,
				void 0,
			)),
			this.cpe(e)
		);
	}
	static AddRemoveHandle(e, t) {
		this.upe.Push([e, t]);
	}
	static StopEffect(e, t, o, r) {
		return t
			? t.length < exports.EFFECT_REASON_LENGTH_LIMIT
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"StopEffect的Reason字符串长度必须大于等于限制字符数量",
							["Reason", t],
							["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
						),
					!1)
				: ((e.StopReason = t),
					e.IsPendingInit && o
						? (EffectEnvironment_1.EffectEnvironment.UseLog &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"RenderEffect",
									3,
									"特效框架:停止特效(IsPendingInit)",
									["句柄Id", e.Id],
									["IsRoot", e.IsRoot()],
									["Path", e.Path],
									["Reason", t],
								),
							this.Jfe(e),
							e.Stop(t, o),
							this.Yfe(e.Id))
						: r || e.IsDone()
							? (EffectEnvironment_1.EffectEnvironment.UseLog &&
									Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"RenderEffect",
										3,
										"特效框架:停止特效",
										["句柄Id", e.Id],
										["IsRoot", e.IsRoot()],
										["Path", e.Path],
										["IsPlaying", e.IsPlaying()],
										["Immediately", o],
										["DestroyActor", r],
										["Reason", t],
									),
								o || r || !e.IsPlaying()
									? EffectSystem.Bfe(e, t, r)
									: e.StopEffect(t, o))
							: (EffectEnvironment_1.EffectEnvironment.UseLog &&
									Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"RenderEffect",
										37,
										"特效框架:停止特效(IsPendingStop)",
										["句柄Id", e.Id],
										["IsRoot", e.IsRoot()],
										["Path", e.Path],
										["Reason", t],
									),
								(e.IsPendingStop = !0),
								e.IsExternalActor ||
									e.GetSureEffectActor()?.K2_DetachFromActor(1, 1, 1)),
					!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Entity", 3, "StopEffect的Reason不能使用undefined", [
						"Reason",
						t,
					]),
				!1);
	}
	static GetEffectLruCount(e) {
		return this.Lru.GetCount(e);
	}
	static CreateEffectLru(e) {
		return new Lru_1.Lru(
			e,
			(e) => {
				var t = new EffectHandle_1.EffectHandle();
				return EffectProfiler_1.EffectProfiler.NoticeCreatedFromLru(e, t), t;
			},
			(e) => {
				EffectSystem.zfe(e),
					EffectSystem.Zfe(e),
					EffectProfiler_1.EffectProfiler.NoticeRemovedFromLru(
						e.Path,
						"Eliminated",
					);
			},
		);
	}
	static GetEffectLruCapacity() {
		return this.Lru.Capacity;
	}
	static SetEffectLruCapacity(e) {
		this.Lru.Capacity = e;
	}
	static GetEffectLruSize() {
		return this.Lru.Size;
	}
	static SpawnUnloopedEffect(e, t, o, r, f, a = 3, i, n, s, c = !1, E = !1) {
		if (o) {
			var l = this.L0(e);
			if ((l = this.qfe(o, l)) && l.LifeTime < 0)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderEffect",
							37,
							"[EffectSystem.SpawnEffect]当前情景不允许播放循环特效，请检查配置",
							["path", o],
							["createReason", r],
						),
					0
				);
		}
		return this.SpawnEffect(e, t, o, r, f, a, i, n, s, c, E);
	}
	static SpawnEffect(e, t, o, r, f, a = 3, i, n, s, c = !1, E = !1) {
		var l = !c;
		if ((Stats_1.Stat.Enable, !o))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[EffectSystem.SpawnEffect]的path参数无效",
						["Path", o],
						["Reason", r],
					),
				this.wfe(n, 0, 0),
				0
			);
		if (!e?.IsValid())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[EffectSystem.SpawnEffect]的worldContext参数无效",
						["Path", o],
						["Reason", r],
					),
				this.wfe(n, 0, 0),
				0
			);
		if (UE.KuroStaticLibrary.IsWorldTearingDown(e.GetWorld()))
			return this.wfe(n, 0, 0), 0;
		if (!t)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[EffectSystem.SpawnEffect]的transform参数无效",
						["Path", o],
						["Reason", r],
					),
				this.wfe(n, 0, 0),
				0
			);
		if (!r)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[EffectSystem.SpawnEffect]的Reason不能使用undefined",
						["Path", o],
						["Reason", r],
					),
				this.wfe(n, 0, 0),
				0
			);
		if (r.length < exports.EFFECT_REASON_LENGTH_LIMIT)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"[EffectSystem.SpawnEffect]的Reason字符串长度必须大于等于限制字符数量",
						["Reason", r],
						["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
					),
				this.wfe(n, 0, 0),
				0
			);
		let h;
		if (
			(g =
				!c &&
				!Info_1.Info.IsInCg() &&
				e.GetWorld() === GlobalData_1.GlobalData.World) &&
			(h = this.epe(t, o, r, l, f, i, void 0, s, a))
		)
			return (
				n?.(5, h.Id),
				EffectEnvironment_1.EffectEnvironment.UseLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"RenderEffect",
						3,
						"特效框架:创建句柄(Lru)",
						["句柄Id", h.Id],
						["父句柄Id", void 0],
						["特效总数", this.kfe],
						["句柄总数", this.Ffe],
						["IsRoot", !0],
						["Path", h.Path],
						["Lru命中率%", 100 * this.Lru.HitRate],
						["Reason", r],
					),
				h.Id
			);
		var g = t.GetLocation(),
			d = this.L0(e);
		d = this.ppe(this.fpe(o, d));
		if (
			E ||
			!this.Hfe(g, a, d) ||
			!Info_1.Info.IsGameRunning() ||
			c ||
			Info_1.Info.IsInCg()
		) {
			if (((E = this.mpe(e, t)), !E?.IsValid()))
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"[EffectSystem.SpawnEffect]创建actor失败",
							["Reason", r],
						),
					0
				);
			if (
				((g = this.SpawnEffectWithActor(
					e,
					void 0,
					E,
					o,
					r,
					l,
					f,
					i,
					(e, t) => {
						switch (e) {
							case 0:
							case 1:
							case 2:
								var o = this.cpe(t);
								this.Kfe(o);
						}
						n?.(e, t);
					},
					!1,
					s,
					a,
					d,
				)),
				!this.IsValid(g))
			)
				return ActorSystem_1.ActorSystem.Put(E), 0;
			h = this.cpe(g);
		} else
			(c = this.bfe(
				e,
				void 0,
				o,
				r,
				t,
				d,
				l,
				f,
				i,
				(e, t) => {
					switch (e) {
						case 0:
						case 1:
						case 2:
							var o = this.cpe(t);
							this.Kfe(o);
					}
					n?.(e, t);
				},
				!1,
				s,
				a,
			)),
				(h = this.cpe(c)),
				EffectEnvironment_1.EffectEnvironment.UseLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"RenderEffect",
						3,
						"特效框架:创建句柄(WithoutActor)",
						["句柄Id", c],
						["父句柄Id", void 0],
						["特效总数", this.kfe],
						["句柄总数", this.Ffe],
						["IsRoot", !0],
						["Path", o],
						["Lru命中率%", 100 * this.Lru.HitRate],
						["Reason", r],
					);
		return (
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.TestEffectAddDaRec,
				o,
			),
			h?.Id ?? 0
		);
	}
	static ForceCheckPendingInit(e) {
		(e = this.cpe(e)).IsPendingInit &&
			!this.Hfe(e.InitCache.Location, e.GetEffectType(), e.EffectEnableRange) &&
			this.InitHandleWhenEnable(e);
	}
	static StopEffectById(e, t, o, r) {
		return (
			EffectEnvironment_1.EffectEnvironment.UseLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderEffect",
					3,
					"特效框架:停止特效开始",
					["句柄Id", e],
					["Reason", t],
					["Valid", this.IsValid(e)],
				),
			!!this.IsValid(e) && ((e = this.cpe(e)), this.StopEffect(e, t, o, r))
		);
	}
	static IsValid(e) {
		var t;
		return (
			!!e &&
			((t = e >>> this.Vfe), !!(t = this.Effects[t])) &&
			t.Id === e &&
			t.IsEffectValid()
		);
	}
	static AddFinishCallback(e, t) {
		this.IsValid(e) && t && this.cpe(e).AddFinishCallback(t);
	}
	static RemoveFinishCallback(e, t) {
		this.IsValid(e) && t && this.cpe(e).RemoveFinishCallback(t);
	}
	static GetEffectActor(e) {
		if (this.IsValid(e)) return this.cpe(e).GetEffectActor();
	}
	static GetSureEffectActor(e) {
		if (this.IsValid(e)) return this.cpe(e).GetSureEffectActor();
	}
	static GetNiagaraComponent(e) {
		if (this.IsValid(e)) return this.cpe(e).GetNiagaraComponent();
	}
	static GetNiagaraComponents(e) {
		if (this.IsValid(e)) return this.cpe(e).GetNiagaraComponents();
	}
	static ReplayEffect(e, t, o = void 0) {
		var r;
		this.IsValid(e) &&
			(((e = this.cpe(e)).IsPendingStop = !1), (r = e.GetSureEffectActor())) &&
			(r.SetActorHiddenInGame(!1),
			o && r.K2_SetActorTransform(o, !1, void 0, !0),
			r.OnEndPlay.Clear(),
			e.RegisterActorDestroy(),
			e.Replay(),
			e.Play(t));
	}
	static IsPlaying(e) {
		return !!this.IsValid(e) && this.cpe(e).IsPlaying();
	}
	static IsLoop(e) {
		return !!(e = this.qfe(e)) && e.LifeTime < 0;
	}
	static SetHandleLifeCycle(e, t) {
		this.IsValid(e) &&
			(e = this.cpe(e)).IsLoop &&
			e.GetEffectSpec()?.SetLifeCycle(t);
	}
	static SetTimeScale(e, t) {
		this.IsValid(e) && this.cpe(e).SetTimeScale(t);
	}
	static FreezeHandle(e, t) {
		this.IsValid(e) && (e = this.cpe(e)).IsLoop && e.FreezeEffect(t);
	}
	static HandleSeekToTime(e, t, o) {
		this.IsValid(e) && (e = this.cpe(e)).IsLoop && e.SeekTo(t, o);
	}
	static HandleSeekToTimeWithProcess(e, t, o = !1, r = -1) {
		this.IsValid(e) &&
			(e = this.cpe(e)).IsLoop &&
			e.SeekToTimeWithProcess(t, r, o);
	}
	static SetEffectNotRecord(e, t = !0) {
		this.IsValid(e) && this.cpe(e).SetNotRecord(t);
	}
	static GetPath(e) {
		if (this.IsValid(e)) return this.cpe(e).Path;
	}
	static SetEffectDataByNiagaraParam(e, t, o) {
		var r;
		this.IsValid(e) &&
			((r = this.cpe(e)?.GetEffectData()) instanceof
				EffectModelNiagara_1.default &&
				((r.FloatParameters = t.FloatParameters),
				(r.VectorParameters = t.VectorParameters),
				(r.ColorParameters = t.ColorParameters)),
			this.cpe(e)
				?.GetEffectSpec()
				?.SetThreeStageTime(t.StartTime, t.LoopTime, t.EndTime, o));
	}
	static SetEffectExtraState(e, t) {
		this.cpe(e)?.SetEffectExtraState(t);
	}
	static SetEffectIgnoreVisibilityOptimize(e, t) {
		(e = this.cpe(e)) && (e.IgnoreVisibilityOptimize = t);
	}
	static SetEffectStoppingTime(e, t) {
		(e = this.cpe(e)) && (e.StoppingTime = t);
	}
	static get GlobalStoppingPlayTime() {
		return this.ADn;
	}
	static get GlobalStoppingTime() {
		return this.UDn;
	}
	static SetGlobalStoppingTime(e, t) {
		if (this.UDn !== e) {
			(this.UDn = e), (this.ADn = t);
			for (const t of this.Afe.GetItems()) t.OnGlobalStoppingTimeChange(e);
		}
	}
	static AttachToEffectSkeletalMesh(e, t, o, r) {
		this.IsValid(e) &&
			(e = this.cpe(e))?.IsRoot() &&
			e.AttachToEffectSkeletalMesh(t, o, r);
	}
	static GetTotalPassTime(e) {
		return this.IsValid(e) && (e = this.cpe(e)?.GetEffectSpec())
			? e.GetTotalPassTime()
			: 0;
	}
	static GetPassTime(e) {
		return this.IsValid(e) && (e = this.cpe(e)?.GetEffectSpec())
			? e.PassTime
			: 0;
	}
	static GetHideOnBurstSkill(e) {
		return (
			!!this.IsValid(e) &&
			!!(e = this.cpe(e)?.GetEffectSpec()) &&
			e.GetHideOnBurstSkill()
		);
	}
	static SetupEffectTrailSpec(e, t) {
		this.IsValid(e) &&
			(e = this.cpe(e).GetEffectSpec()) instanceof
				EffectModelTrailSpec_1.EffectModelTrailSpec &&
			e.Setup(t);
	}
	static RegisterCustomCheckOwnerFunc(e, t) {
		this.IsValid(e) && (this.cpe(e).OnCustomCheckOwner = t);
	}
	static GetEffectModel(e) {
		if (this.IsValid(e)) return this.cpe(e).GetEffectData();
	}
	static TickHandleInEditor(e, t) {
		Info_1.Info.IsGameRunning() || (this.IsValid(e) && this.cpe(e).Tick(t));
	}
	static SetEffectParameterNiagara(e, t) {
		this.cpe(e)?.SetEffectParameterNiagara(t);
	}
	static GetLastPlayTime(e) {
		return this.IsValid(e) && (e = this.cpe(e)?.GetEffectSpec())
			? e.GetLastPlayTime()
			: 0;
	}
	static GetLastStopTime(e) {
		return this.IsValid(e) && (e = this.cpe(e)?.GetEffectSpec())
			? e.GetLastStopTime()
			: 0;
	}
	static DebugUpdate(e, t) {
		this.IsValid(e) && (this.cpe(e).DebugUpdate = t);
	}
	static GetNiagaraParticleCount(e) {
		if (this.IsValid(e)) return this.cpe(e).GetNiagaraParticleCount();
	}
	static BornFrameCount(e) {
		if (this.IsValid(e)) return this.cpe(e).BornFrameCount;
	}
	static GetEffectCount() {
		return this.kfe;
	}
	static GetActiveEffectCount() {
		let e = 0;
		return (
			this.Effects.forEach((t) => {
				t &&
					t.GetEffectSpec()?.IsVisible() &&
					t.GetEffectSpec()?.IsEnable() &&
					t.IsRoot() &&
					t.IsPlaying() &&
					e++;
			}),
			e
		);
	}
	static DebugPrintEffect() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Battle",
				4,
				"<<<<<<<<<<<<<<<<特效打印开始:>>>>>>>>>>>>>>>",
			);
		var e = EffectSystem.GetEffectCount(),
			t = EffectSystem.GetActiveEffectCount(),
			o = EffectSystem.GetEffectLruSize(),
			r = EffectSystem.GetEffectLruCapacity(),
			f = EffectSystem.GetPlayerEffectLruSize(0),
			a = EffectSystem.GetPlayerEffectLruSize(1),
			i = EffectSystem.GetPlayerEffectLruSize(2),
			n = EffectSystem.GetPlayerEffectLruSize(3);
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Battle",
				4,
				"\n【当前所有特效信息】:",
				["【总特效Handle数量】", e],
				["【活跃特效数量】", t],
				["【当前公共特效LRU池内特效数量】", o],
				["【当前公共特效LRU池大小】", r],
				["1号池内数量", f],
				["2号池内数量", a],
				["3号池内数量", i],
				["4号池内数量", n],
			);
		let s = "\n",
			c = "\n";
		this.Effects.forEach((e) => {
			var t;
			e &&
				e.IsRoot() &&
				e.GetEffectSpec() &&
				(t = e.GetEffectSpec()) &&
				(t.IsVisible()
					? t.IsEnable()
						? e.IsPlaying() &&
							Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Battle", 4, "\n【当前正在播放的特效】:", [
								"",
								this.Rpe(e),
							])
						: (s += this.Rpe(e))
					: (c += this.Rpe(e)));
		}),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 4, "\n【不可见的特效列表】", ["", c]),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 4, "\n【Disable的特效列表】", ["", s]),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					4,
					"<<<<<<<<<<<<<<<<特效打印结束:>>>>>>>>>>>>>>>",
				);
	}
	static Rpe(e) {
		var t = e.GetEffectSpec();
		return `Path:${e.Path}\nId:${e.Id} 存活帧数:${UE.KismetSystemLibrary.GetFrameCount() - e.BornFrameCount} IsVisible:${t?.IsVisible()} IsEnable: ${t?.IsEnable()} TimeScale: ${t?.GetTimeScale()} \nCreateEntityId:${e.GetContext()?.EntityId} CreateFromType:${e.GetContext()?.CreateFromType.toString()} CreateReason:${e.CreateReason}\n`;
	}
	static GetPlayerEffectLruSize(e) {
		return this.yfe.GetPlayerEffectPoolSize(e);
	}
}
((_a = EffectSystem).Efe = !1),
	(EffectSystem.Ffe = 0),
	(EffectSystem.kfe = 0),
	(EffectSystem.Epe = 0),
	(EffectSystem.Afe = new CustomMap_1.CustomMap()),
	(EffectSystem.upe = new Queue_1.Queue()),
	(EffectSystem.lpe = new Map()),
	(EffectSystem.Lfe = !1),
	(EffectSystem.Mfe = void 0),
	(EffectSystem.OpenVisibilityOptimize = !0),
	(EffectSystem.jfe = !0),
	(EffectSystem.lY = 32),
	(EffectSystem._Y = 12),
	(EffectSystem.Vfe = EffectSystem.lY - EffectSystem._Y),
	(EffectSystem.aY = (1 << EffectSystem._Y) - 1),
	(EffectSystem.hY = (1 << EffectSystem.Vfe) - 1),
	(EffectSystem.Effects = new Array()),
	(EffectSystem.rY = new Array()),
	(EffectSystem.nY = new Array()),
	(EffectSystem.Lru = new Lru_1.Lru(
		100,
		(e) => {
			var t = new EffectHandle_1.EffectHandle();
			return EffectProfiler_1.EffectProfiler.NoticeCreatedFromLru(e, t), t;
		},
		(e) => {
			EffectSystem.zfe(e),
				EffectSystem.Zfe(e),
				EffectProfiler_1.EffectProfiler.NoticeRemovedFromLru(
					e.Path,
					"Eliminated",
				);
		},
	)),
	(EffectSystem.yfe = void 0),
	(EffectSystem.gW = void 0),
	(EffectSystem.Dpe = void 0),
	(EffectSystem.Tpe = void 0),
	(EffectSystem.Ipe = void 0),
	(EffectSystem.ype = void 0),
	(EffectSystem.Wfe = void 0),
	(EffectSystem.fW = void 0),
	(EffectSystem.Lpe = void 0),
	(EffectSystem.Qfe = void 0),
	(EffectSystem.tpe = void 0),
	(EffectSystem.rpe = void 0),
	(EffectSystem.Xfe = void 0),
	(EffectSystem.spe = void 0),
	(EffectSystem.ape = void 0),
	(EffectSystem.hpe = void 0),
	(EffectSystem.dpe = void Stats_1.Stat.Enable),
	(EffectSystem.Cpe = void Stats_1.Stat.Enable),
	(EffectSystem.gpe = void Stats_1.Stat.Enable),
	(EffectSystem.Mpe = void Stats_1.Stat.Enable),
	(EffectSystem.Ife = !1),
	(EffectSystem.Tfe = () => {
		for (const e of _a.Afe.GetItems()) e.OnGlobalTimeScaleChange();
	}),
	(EffectSystem.C7s = () => {
		var e =
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo()
				.NiagaraQuality;
		GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()
			? e < 1
				? _a.g7s()
				: _a.f7s()
			: e < 2
				? _a.g7s()
				: _a.f7s();
	}),
	(EffectSystem.Dfe = !0),
	(EffectSystem._pe = 6e4),
	(EffectSystem.vpe = new Map()),
	(EffectSystem.UDn = !1),
	(EffectSystem.ADn = 0),
	__decorate(
		[(0, PerformanceDecorators_1.TickEffectPerformanceEx)(!1, 0)],
		EffectSystem,
		"SpawnEffect",
		null,
	),
	(exports.EffectSystem = EffectSystem);
