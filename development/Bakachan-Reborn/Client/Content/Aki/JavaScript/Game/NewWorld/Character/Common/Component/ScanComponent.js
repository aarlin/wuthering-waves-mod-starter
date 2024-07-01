"use strict";
var ScanComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, n, o) {
			var r,
				a = arguments.length,
				i =
					a < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				i = Reflect.decorate(t, e, n, o);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(r = t[s]) &&
						(i = (a < 3 ? r(i) : 3 < a ? r(e, n, i) : r(e, n)) || i);
			return 3 < a && i && Object.defineProperty(e, n, i), i;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ScanComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../../Effect/EffectSystem"),
	Global_1 = require("../../../../Global"),
	GlobalData_1 = require("../../../../GlobalData"),
	LevelGamePlayUtils_1 = require("../../../../LevelGamePlay/LevelGamePlayUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ItemMaterialControllerActorData_1 = require("../../../../Render/Scene/Item/MaterialController/ItemMaterialControllerActorData"),
	M_TO_CM = 100,
	SECONDS_TO_MILLISECONDS = 1e3;
class TimerManageContainer {
	constructor(t) {
		(this.vJo = void 0),
			(this.TDe = void 0),
			(this.C$i = () => {
				(this.TDe = void 0), this.vJo();
			}),
			(this.vJo = t);
	}
	Delay(t, e = !1) {
		(void 0 !== this.TDe && !e) ||
			(this.Remove(),
			(e = t < TimerSystem_1.MIN_TIME ? TimerSystem_1.MIN_TIME : t),
			(this.TDe = TimerSystem_1.TimerSystem.Delay(this.C$i, e)));
	}
	Remove() {
		return !(
			void 0 === this.TDe ||
			!TimerSystem_1.TimerSystem.Has(this.TDe) ||
			(TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0))
		);
	}
	Stop() {
		this.Remove() && this.C$i();
	}
}
let ScanComponent = (ScanComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.nXt = void 0),
			(this.Vpr = void 0),
			(this.Izr = void 0),
			(this.Tzr = !1),
			(this.Lzr = !1),
			(this.Dzr = new Array()),
			(this.Qwn = !1),
			(this.Rzr = 0),
			(this.Azr = 0),
			(this.xC = !1),
			(this.Uzr = !1),
			(this.Pzr = void 0),
			(this.xzr = void 0),
			(this.wzr = !1),
			(this.Bzr = 0),
			(this.bzr = !1),
			(this.qzr = new Map()),
			(this.Gzr = void 0),
			(this.Nzr = void 0),
			(this.Ozr = () => {
				this.bzr || ((this.bzr = !0), this.kzr());
			}),
			(this.zpe = (t, e) => {
				if (
					(e =
						ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(e)) &&
					this.Nzr?.includes(e) &&
					(this.Nzr.splice(this.Nzr.indexOf(e), 1), this.Nzr.length <= 0)
				)
					for (const t of this.qzr.values()) t.Stop();
			});
	}
	pie() {
		var t;
		-1 === ScanComponent_1.Fzr &&
			((t = ConfigManager_1.ConfigManager.LevelGamePlayConfig.ScanMaxDistance),
			(ScanComponent_1.Fzr = 100 * t * t * 100)),
			-1 === ScanComponent_1.Vzr &&
				((t =
					ConfigManager_1.ConfigManager.LevelGamePlayConfig
						.ScanShowInteractionEffectMaxDistance),
				(ScanComponent_1.Vzr = 100 * t * t * 100)),
			-1 === ScanComponent_1.Hzr &&
				((t =
					ConfigManager_1.ConfigManager.LevelGamePlayConfig
						.ScanDetectConcealedDistance),
				(ScanComponent_1.Hzr = 100 * t * t * 100));
	}
	OnStart() {
		if (
			(this.pie(),
			(this.nXt = this.Entity.GetComponent(1)),
			(this.Vpr = this.Entity.GetComponent(0)),
			(this.Izr = this.Entity.GetComponent(106)),
			this.Izr &&
				this.Izr.SetLogicRange(
					100 *
						ConfigManager_1.ConfigManager.LevelGamePlayConfig
							.ScanDetectConcealedDistance,
				),
			(this.Pzr =
				LevelGamePlayUtils_1.LevelGamePlayUtils.GetScanCompositeResult(
					this.Vpr,
				)),
			(this.xzr = this.Pzr?.ScanCompositeConfig),
			(this.xC = !1),
			(this.Uzr = !!this.Pzr?.ScanInfos && 0 < this.Pzr.ScanInfos.length),
			this.Uzr)
		) {
			for (const t of this.Pzr.ScanInfos)
				if (
					(0 < t.ResourcePath?.length && (this.Lzr = !0),
					0 < t.IconPath?.length && (this.Tzr = !0),
					this.Lzr && this.Tzr)
				)
					break;
			var t = this.Vpr.GetPbEntityInitData();
			(t = (0, IComponent_1.getComponent)(
				t.ComponentsData,
				"RefreshGroupComponent",
			)) &&
				0 < t.EntityIds.length &&
				(this.Gzr = t.EntityIds);
		}
		return (
			this.Vpr.IsConcealed &&
				((t = this.Qio()),
				(this.bzr = t > ScanComponent_1.Hzr),
				this.kzr(),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.LeaveLogicRange,
					this.Ozr,
				),
				(this.wzr = !0)),
			!0
		);
	}
	OnEnd() {
		for (var [t, e] of this.qzr)
			"InteractionEffect" === t ? e.Remove() : e.Stop();
		return (
			this.qzr.clear(),
			EffectSystem_1.EffectSystem.IsValid(this.Azr) &&
				(EffectSystem_1.EffectSystem.StopEffectById(
					this.Azr,
					"[TimerManageContainer.OnEnd]",
					!1,
				),
				(this.Azr = 0)),
			this.wzr &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.LeaveLogicRange,
					this.Ozr,
				),
			(this.Gzr = void 0),
			!(this.Nzr = void 0)
		);
	}
	OnTick(t) {
		var e;
		this.Vpr.IsConcealed &&
			!this.xC &&
			this.Uzr &&
			this.Izr?.IsInLogicRange &&
			((e = this.Qio()),
			(this.bzr && e <= ScanComponent_1.Hzr) ||
				(!this.bzr && e > ScanComponent_1.Hzr)) &&
			((this.bzr = !this.bzr), this.kzr());
	}
	Qio() {
		if (this.nXt && Global_1.Global.BaseCharacter) {
			var t,
				e = Global_1.Global.BaseCharacter.CharacterActorComponent;
			if (e)
				return (
					(t = this.nXt.ActorLocationProxy),
					(e = e.ActorLocationProxy),
					Vector_1.Vector.DistSquared(t, e)
				);
		}
	}
	kzr() {
		var t, e;
		this.Vpr.IsConcealed &&
			(EffectSystem_1.EffectSystem.IsValid(this.Azr) &&
				(EffectSystem_1.EffectSystem.StopEffectById(
					this.Azr,
					"[TimerManageContainer.ChangeVoicePrintEffect]",
					!1,
				),
				(this.Azr = 0)),
			(e = this.nXt.Owner)) &&
			(t = this.bzr
				? this.xzr?.FarVoiceEffectPath
				: this.xzr?.NearVoiceEffectPath) &&
			((this.Azr = EffectSystem_1.EffectSystem.SpawnEffect(
				GlobalData_1.GlobalData.World,
				e.GetTransform(),
				t,
				"[TimerManageContainer.ChangeVoicePrintEffect]",
				new EffectContext_1.EffectContext(this.Entity.Id),
			)),
			EffectSystem_1.EffectSystem.IsValid(this.Azr)) &&
			(e = EffectSystem_1.EffectSystem.GetSureEffectActor(this.Azr)) &&
			e.IsValid() &&
			(e.RootComponent.K2_SetWorldLocation(
				this.jzr().K2_GetComponentLocation(),
				!1,
				void 0,
				!1,
			),
			e.RootComponent.K2_SetWorldRotation(
				Rotator_1.Rotator.ZeroRotator,
				!1,
				void 0,
				!1,
			));
	}
	StartProcess() {
		this.Uzr &&
			((this.Bzr = this.Qio()),
			this.Vpr.IsConcealed && this.Bzr > ScanComponent_1.Hzr
				? ScanComponent_1.EnableLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"LevelPlay",
						32,
						"[ScanComponent] 隐藏物体，超出了取消隐藏的距离",
						["PbdataId", this.Vpr.GetPbDataId()],
						["DistanceWithPlayerCm", this.Bzr],
						["ScanDetectConcealedDistanceSquaredCm", ScanComponent_1.Hzr],
					)
				: (this.Gzr &&
						0 < this.Gzr?.length &&
						(this.Wzr(), this.Nzr.length <= 0)) ||
					((this.xC = !0),
					this.Kzr(),
					EffectSystem_1.EffectSystem.IsValid(this.Azr) &&
						(EffectSystem_1.EffectSystem.StopEffectById(
							this.Azr,
							"[TimerManageContainer.StartProcess]",
							!1,
						),
						(this.Azr = 0)),
					this.Bzr < ScanComponent_1.Vzr &&
						this.xzr?.ShowInteractionEffect &&
						(ScanComponent_1.EnableLog &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("LevelPlay", 32, "[ScanComponent] 显示交互特效", [
								"PbdataId",
								this.Vpr.GetPbDataId(),
							]),
						this.Qzr()),
					this.Bzr < ScanComponent_1.Fzr &&
						(this.Lzr &&
							(ScanComponent_1.EnableLog &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"LevelPlay",
									32,
									"[ScanComponent] 显示额外的特效",
									["PbdataId", this.Vpr.GetPbDataId()],
								),
							this.Xzr()),
						this.Tzr &&
							(ScanComponent_1.EnableLog &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("LevelPlay", 32, "[ScanComponent] 显示Icon", [
									"PbdataId",
									this.Vpr.GetPbDataId(),
								]),
							this.$zr()),
						this.Yzr()),
					EventSystem_1.EventSystem.EmitWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnScanStart,
						this.Pzr.Interval,
					),
					this.Nzr && 0 < this.Nzr?.length && this.Jzr(),
					this.Vpr.GetBaseInfo()?.ScanFunction?.TraceEffect && this.zzr()));
	}
	Kzr() {
		this.Vpr.IsConcealed &&
			((this.Vpr.IsConcealed = !1),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnEntityConcealedChange,
				!1,
			),
			this.xzr?.ScanConcealEffectPath) &&
			this.nXt?.Owner &&
			(ScanComponent_1.EnableLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("LevelPlay", 32, "[ScanComponent] 播放扫描显形特效", [
					"PbdataId",
					this.Vpr.GetPbDataId(),
				]),
			EffectSystem_1.EffectSystem.SpawnEffect(
				GlobalData_1.GlobalData.World,
				this.nXt.Owner.GetTransform(),
				this.xzr.ScanConcealEffectPath,
				"[ScanComponent.CancelEntityConcealState]",
				new EffectContext_1.EffectContext(this.Entity.Id),
			));
		var t = this.Entity.GetComponent(177);
		t?.HasTag(1227933697) && t.RemoveTag(1227933697);
	}
	Zzr(t, e = !1) {
		let n = !1;
		var o = (0, puerts_1.$ref)(void 0),
			r = (t.GetAttachedActors(o, !0), (0, puerts_1.$unref)(o));
		if (r && 0 < r.Num())
			for (let t = 0; t < r.Num(); t++) {
				var a = r.Get(t);
				a && (n = this.Zzr(a));
			}
		if (
			t instanceof UE.StaticMeshActor ||
			t instanceof UE.BP_KuroDestructibleActor_C
		) {
			if (!this.xzr?.ItemMaterialDataPath) return !1;
			this.Rzr++,
				ResourceSystem_1.ResourceSystem.LoadAsync(
					this.xzr.ItemMaterialDataPath,
					ItemMaterialControllerActorData_1.default,
					(e) => {
						this.xC
							? -1 !==
									(e =
										ModelManager_1.ModelManager.RenderModuleModel.EnableActorData(
											e,
											t,
										)) && this.Dzr.push(e)
							: ScanComponent_1.EnableLog &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"LevelPlay",
									32,
									"[ScanComponent] 扫描过程已结束，加载超时",
									["pbdataId", this.Vpr.GetPbDataId()],
								);
					},
				);
		} else {
			if (!this.xzr?.ItemMaterialDataPath) return !1;
			if (!t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass()))
				return !1;
			n = !0;
		}
		return (
			(o = this.xzr?.ItemMaterialDataPath),
			e &&
				n &&
				o &&
				(this.Entity.GetComponent(2)?.ApplySimpleMaterialEffect(o),
				(this.Qwn = !0),
				this.Rzr++),
			n
		);
	}
	Qzr() {
		var t = this.Entity?.GetComponent(1)?.Owner;
		if (t) {
			const e = "InteractionEffect";
			let n = this.qzr.get(e);
			n && 0 < this.Dzr.length
				? n.Delay(1e3 * this.xzr.InteractionEffectInterval, !0)
				: ((this.Rzr = 0),
					this.Zzr(t, !0),
					0 < this.Rzr &&
						(n && n.Remove(),
						(n = new TimerManageContainer(() => {
							ScanComponent_1.EnableLog &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"LevelPlay",
									32,
									"[ScanComponent] 倒计时结束,关闭特效",
									["pbdataId", this.Vpr.GetPbDataId()],
									["Delay", this.xzr?.InteractionEffectInterval],
								);
							for (const t of this.Dzr)
								ModelManager_1.ModelManager.RenderModuleModel.DisableActorData(
									t,
								);
							this.Qwn &&
								this.Entity.GetComponent(2)?.RemoveSimpleMaterialEffect(),
								(this.Dzr.length = 0),
								this.qzr.delete(e);
						})).Delay(1e3 * this.xzr.InteractionEffectInterval, !0),
						this.qzr.set(e, n)));
		}
	}
	$zr() {
		for (const t of this.Pzr.ScanInfos)
			if (0 !== t.IconPath.length) {
				const e = "Icon";
				let n = this.qzr.get(e);
				if (!n) {
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ScanTrackedStart,
						this.Entity.Id,
						this.Pzr,
					),
						(n = new TimerManageContainer(() => {
							ScanComponent_1.EnableLog &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"LevelPlay",
									32,
									"[ScanComponent] 倒计时结束,触发Icon关闭事件",
									["pbdataId", this.Vpr.GetPbDataId()],
									["Delay", t.Interval],
								),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.ScanTrackedEnd,
									this.Entity.Id,
								),
								this.qzr.delete(e);
						})).Delay(1e3 * t.Interval, !0),
						this.qzr.set(e, n);
					break;
				}
				n.Delay(1e3 * t.Interval, !0);
			}
	}
	Yzr() {
		var t = this.xzr?.ScanAudioEvent,
			e = this.nXt?.Owner;
		t && e && AudioSystem_1.AudioSystem.PostEvent(t, e);
	}
	Xzr() {
		if (this.nXt) {
			var t = this.nXt.Owner;
			if (t)
				for (const o of this.Pzr.ScanInfos)
					if (0 !== o.ResourcePath.length) {
						let r = o.ResourcePath;
						var e = r.indexOf("'");
						-1 !== e && (r = r.substring(e + 1, r.length - 2));
						const a = "Effect_" + o.UId.toString();
						let i = this.qzr.get(a);
						if (i) i.Delay(1e3 * o.Interval, !0);
						else {
							const s = EffectSystem_1.EffectSystem.SpawnEffect(
								GlobalData_1.GlobalData.World,
								t.GetTransform(),
								r,
								"[ScanComponent.EffectProcess]",
								new EffectContext_1.EffectContext(this.Entity.Id),
							);
							if (
								EffectSystem_1.EffectSystem.IsValid(s) &&
								(e = EffectSystem_1.EffectSystem.GetSureEffectActor(s)) &&
								e.IsValid()
							) {
								e.RootComponent.K2_SetWorldLocation(
									this.jzr().K2_GetComponentLocation(),
									!1,
									void 0,
									!1,
								);
								var n = this.nXt.ActorRotationProxy;
								n.Set(0, n.Yaw, 0),
									e.RootComponent.K2_SetWorldRotation(
										n.ToUeRotator(),
										!1,
										void 0,
										!1,
									),
									(i = new TimerManageContainer(() => {
										ScanComponent_1.EnableLog &&
											Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"LevelPlay",
												32,
												"[ScanComponent] 倒计时结束,关闭额外特效",
												["pbdataId", this.Vpr.GetPbDataId()],
												["Delay", o.Interval],
											),
											EffectSystem_1.EffectSystem.StopEffectById(
												s,
												"[ScanComponent.EffectProcess]",
												!1,
											),
											this.qzr.delete(a);
									})).Delay(1e3 * o.Interval, !0),
									this.qzr.set(a, i);
								break;
							}
						}
					}
		}
	}
	zzr() {
		if (this.nXt) {
			var t = this.nXt.Owner;
			if (t) {
				var e = this.Vpr.GetBaseInfo()?.ScanFunction?.TraceEffect,
					n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
						e.Target,
					);
				let r = Vector_1.Vector.ZeroVectorProxy;
				r = n
					? ((n = n.Entity.GetComponent(1)),
						Vector_1.Vector.Create(n.ActorLocationProxy))
					: (ScanComponent_1.EnableLog &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"LevelPlay",
								32,
								"[ScanComponent] 追踪特效找不到对应目标Entity",
								["pbdataId", e?.Target],
							),
						(n =
							ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
								e.Target,
							)),
						Vector_1.Vector.Create(
							n?.Transform?.Pos.X ?? 0,
							n?.Transform?.Pos.Y ?? 0,
							n?.Transform?.Pos.Z ?? 0,
						));
				const a = "TrackEffect";
				let i = this.qzr.get(a);
				if (i) i.Delay(1e3 * this.Pzr.Interval, !0);
				else {
					n = Vector_1.Vector.Create();
					var o =
						(r.Subtraction(this.nXt.ActorLocationProxy, n),
						n.Normalize(),
						new UE.Rotator());
					n.ToOrientationRotator(o);
					const s = EffectSystem_1.EffectSystem.SpawnEffect(
						GlobalData_1.GlobalData.World,
						t.GetTransform(),
						e.Effect,
						"[ScanComponent.TrackEffectProcess]",
						new EffectContext_1.EffectContext(this.Entity.Id),
					);
					EffectSystem_1.EffectSystem.IsValid(s) &&
						EffectSystem_1.EffectSystem.GetEffectActor(s).K2_SetActorRotation(
							o,
							!1,
						),
						(i = new TimerManageContainer(() => {
							ScanComponent_1.EnableLog &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"LevelPlay",
									32,
									"[ScanComponent] 倒计时结束,关闭追踪特效",
									["pbdataId", this.Vpr.GetPbDataId()],
									["Delay", this.Pzr.Interval],
								),
								EffectSystem_1.EffectSystem.IsValid(s) &&
									EffectSystem_1.EffectSystem.StopEffectById(
										s,
										"[ScanComponent.TrackEffectProcess]",
										!1,
									),
								this.qzr.delete(a);
						})).Delay(1e3 * this.Pzr.Interval, !0),
						this.qzr.set(a, i);
				}
			}
		}
	}
	jzr() {
		var t = this.Entity.GetComponent(1)?.Owner,
			e = t?.GetComponentByClass(UE.StaticMeshComponent.StaticClass());
		return e || t?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
	}
	Wzr() {
		this.Nzr ? (this.Nzr.length = 0) : (this.Nzr = []);
		for (const t of this.Gzr)
			ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t) &&
				this.Nzr.push(t);
	}
	Jzr() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.RemoveEntity,
			this.zpe,
		) ||
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			);
		const t = "GroupEntityListen",
			e = 1e3 * this.xzr.InteractionEffectInterval;
		let n = this.qzr.get(t);
		n
			? n.Delay(e, !0)
			: ((n = new TimerManageContainer(() => {
					ScanComponent_1.EnableLog &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelPlay",
							32,
							"[ScanComponent] 倒计时结束,移除组监听",
							["pbdataId", this.Vpr.GetPbDataId()],
							["Delay", e],
						),
						EventSystem_1.EventSystem.Remove(
							EventDefine_1.EEventName.RemoveEntity,
							this.zpe,
						),
						this.qzr.delete(t);
				})).Delay(e, !0),
				this.qzr.set(t, n));
	}
});
(ScanComponent.EnableLog = !1),
	(ScanComponent.Fzr = -1),
	(ScanComponent.Vzr = -1),
	(ScanComponent.Hzr = -1),
	(ScanComponent = ScanComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(71)],
			ScanComponent,
		)),
	(exports.ScanComponent = ScanComponent);
