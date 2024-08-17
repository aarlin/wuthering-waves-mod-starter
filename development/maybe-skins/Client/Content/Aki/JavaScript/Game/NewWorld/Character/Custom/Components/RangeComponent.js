"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var r,
			a = arguments.length,
			i =
				a < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, t, n, o);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(r = e[s]) && (i = (a < 3 ? r(i) : 3 < a ? r(t, n, i) : r(t, n)) || i);
		return 3 < a && i && Object.defineProperty(t, n, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RangeComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../Core/Net/Net"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	Global_1 = require("../../../../Global"),
	GlobalData_1 = require("../../../../GlobalData"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RoleTriggerController_1 = require("../../Role/RoleTriggerController"),
	TRIGGER_COMPONENT_TAG = new UE.FName("TriggerComponent"),
	DEBUG_DETAIL_KEY = "RangeComponent";
let RangeComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.SIe = void 0),
			(this.Hen = void 0),
			(this.NHo = void 0),
			(this.jen = void 0),
			(this.Wen = void 0),
			(this.Ken = void 0),
			(this.Qen = void 0),
			(this.Xen = !1),
			(this.$en = !1),
			(this.Yen = 0),
			(this.Jen = void 0),
			(this.zen = void 0),
			(this.Zen = !1),
			(this.etn = !1),
			(this.X5s = !1),
			(this.ttn = void 0),
			(this.itn = void 0),
			(this.otn = void 0),
			(this.rtn = void 0),
			(this.ntn = void 0),
			(this.stn = void 0),
			(this.atn = !1),
			(this.htn = !1),
			(this.ltn = void 0),
			(this._tn = void 0),
			(this.utn = void 0),
			(this.Y5s = !0),
			(this.J5s = !0),
			(this.ctn = (e) => {
				e && (this.Qen?.IsValid() || this.$en)
					? (this.mtn(),
						EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.OnChangeRole,
							this.dtn,
						),
						EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.RemoveEntity,
							this.zpe,
						),
						EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.AddEntity,
							this.GUe,
						),
						(this.etn = !0),
						this.z5s())
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneGameplay",
							30,
							"[RangeComponent] RangeActor初始化失败",
							["CreatureDataId", this.SIe.GetCreatureDataId()],
							["ConfigId", this.SIe.GetPbDataId()],
							["PlayerId", this.SIe.GetPlayerId()],
						);
			}),
			(this.z5s = () => {
				this.GetIsLocalSetupComplete() &&
					(ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
						"RangeComponent",
					) &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"SceneItem",
							40,
							"[RangeComponent] 完成初始化(开始)",
							["CreatureDataId", this.SIe.GetCreatureDataId()],
							["ConfigId", this.SIe.GetPbDataId()],
						),
					this.gtn(),
					this.ptn(!1),
					this.GetIsNotServerRange() || this.Z5s(),
					ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
						"RangeComponent",
					)) &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"SceneItem",
						40,
						"[RangeComponent] 完成初始化(结束)",
						["CreatureDataId", this.SIe.GetCreatureDataId()],
						["ConfigId", this.SIe.GetPbDataId()],
					);
			}),
			(this.vtn = void 0),
			(this.ytn = (e, t) => {
				this.Stn(t, !0);
			}),
			(this.Itn = (e, t) => {
				this.Stn(t, !1);
			}),
			(this.dtn = (e, t) => {
				e?.Valid &&
					this.atn !== this.htn &&
					this.Ttn(
						RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(),
						e,
						this.atn,
					);
			}),
			(this.GUe = (e, t, n) => {
				var o;
				t?.Valid &&
					(t = t.Entity?.GetComponent(0)?.GetCreatureDataId()) &&
					this.utn?.has(t) &&
					((o = !!this.utn.get(t)),
					this.ServerUpdateEntitiesInRangeOnline(o, t));
			}),
			(this.zpe = (e, t) => {
				t?.Valid &&
					(t.Id === this.Entity.Id
						? (this.Ltn(!1), this.Dtn())
						: this.ntn?.has(t.Id) && this.Rtn(t, !1, !1));
			}),
			(this.Atn = (e) => {
				this.Stn(
					RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(),
					e,
				);
			});
	}
	GetRangeActor() {
		return this.Qen?.IsValid() ? this.Qen : void 0;
	}
	GetShapeComp() {
		return this.Wen?.IsValid() ? this.Wen : void 0;
	}
	GetMeshComp() {
		return this.Ken?.IsValid() ? this.Ken : void 0;
	}
	GetRangeType() {
		return this.NHo?.Type;
	}
	GetShapeCompTransform() {
		return this.Wen?.IsValid() ? this.Wen.GetRelativeTransform() : void 0;
	}
	GetEntitiesInRangeLocal() {
		return this.ntn;
	}
	GetActorsInRangeLocal() {
		return this.stn;
	}
	GetEntitiesInRangeOnline() {
		return this.ltn;
	}
	GetPlayerInRangeOnline() {
		return this._tn;
	}
	GetIsLocalSetupComplete() {
		return this.Zen && this.etn;
	}
	GetIsSetupComplete() {
		return this.GetIsNotServerRange()
			? this.Zen && this.etn
			: this.Zen && this.etn && this.X5s;
	}
	GetIsNotServerRange() {
		return !this.Y5s && !this.J5s;
	}
	GetShapeConfig() {
		return this.NHo;
	}
	OnInitData() {
		(this.SIe = this.Entity.GetComponent(0)),
			(this.Hen = this.Entity.GetComponent(147));
		var e = this.SIe?.GetPbEntityInitData();
		return (
			!!e &&
			(this.e6s(e)
				? (this.t6s(e),
					ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
						"RangeComponent",
					) &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"SceneItem",
							40,
							"[RangeComponent] 初始化网络节省配置完成",
							["CreatureDataId", this.SIe.GetCreatureDataId()],
							["ConfigId", this.SIe.GetPbDataId()],
							["ReqEntityAccessRange", this.Y5s],
							["ReqPlayerAccessRange", this.J5s],
						),
					(this.ntn = new Map()),
					(this.atn = !1),
					(this.stn = new Set()),
					(this.ltn = new Map()),
					(this._tn = new Set()),
					(this.itn = []),
					(this.otn = []),
					(this.rtn = []),
					(this.etn = !1),
					(this.Zen = !1),
					(this.utn = new Map()),
					this.SIe.PbInRangeEntityCreatureDataIds &&
						this.ServerUpdateEntitiesInRangeOnline(
							!0,
							this.SIe.PbInRangeEntityCreatureDataIds,
						),
					this.SIe.PbInRangePlayerIds &&
						this.ServerUpdatePlayerInRangeOnline(
							!0,
							this.SIe.PbInRangePlayerIds,
						),
					!0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneGameplay",
							30,
							"[RangeComponent] 范围数据出错",
							["CreatureDataId", this.SIe.GetCreatureDataId()],
							["ConfigId", this.SIe.GetPbDataId()],
							["PlayerId", this.SIe.GetPlayerId()],
						),
					!1))
		);
	}
	e6s(e) {
		var t = (0, IComponent_1.getComponent)(e.ComponentsData, "RangeComponent"),
			n = (0, IComponent_1.getComponent)(e.ComponentsData, "BeamCastComponent"),
			o = (0, IComponent_1.getComponent)(e.ComponentsData, "FanComponent");
		return (
			t
				? (this.NHo = t.Shape)
				: n
					? ((t = { Type: "Cylinder", ...n.Range }), (this.NHo = t))
					: o &&
						((n = {
							Type: "Box",
							Center: Vector_1.Vector.ZeroVectorProxy,
							Size: Vector_1.Vector.OneVectorProxy,
						}),
						(this.NHo = n)),
			!!this.NHo &&
				(!(t = (0, IComponent_1.getComponent)(
					e.ComponentsData,
					"TriggerComponent",
				)) ||
					("Box" !== this.NHo.Type &&
						"Cylinder" !== this.NHo.Type &&
						"Sphere" !== this.NHo.Type) ||
					(this.Yen = t.ExitConfig?.ExtraRange ?? 0),
				!0)
		);
	}
	t6s(e) {
		var t = (0, IComponent_1.getComponent)(
				e.ComponentsData,
				"TriggerComponent",
			),
			n = (0, IComponent_1.getComponent)(e.ComponentsData, "TrampleComponent"),
			o = (0, IComponent_1.getComponent)(e.ComponentsData, "RangeComponent");
		e = (0, IComponent_1.getComponent)(e.ComponentsData, "EffectAreaComponent");
		if (o) {
			if (t ?? n ?? e) {
				let e = !1,
					o = !1;
				t &&
					(!t.Match.OnlyPlayer ||
					t.ChangeRoleTrigger ||
					t.Match.AllCharacter ||
					t.Match.Categories?.length
						? ((o = !0), (e = !0))
						: (o = !0)),
					n && ((o = !0), (e = !0)),
					(this.Y5s = e),
					(this.J5s = o);
			}
		} else (this.Y5s = !1), (this.J5s = !1);
	}
	OnStart() {
		return (
			this.InitRangeActorAsync().then((e) => {
				this.ctn(e);
			}),
			!0
		);
	}
	OnActivate() {
		(this.Zen = !0), this.z5s();
	}
	OnEnd() {
		return (
			void 0 !== this.ttn &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.ttn),
				(this.ttn = void 0)),
			this.jen?.IsValid() &&
				this.vtn &&
				(this.jen.OnTriggerVolumeAddToSubsystem.Remove(this.vtn),
				(this.jen = void 0),
				(this.vtn = void 0)),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnChangeRole,
				this.dtn,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnChangeRole,
					this.dtn,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.RemoveEntity,
					this.zpe,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.AddEntity,
				this.GUe,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.AddEntity,
					this.GUe,
				),
			this.Dtn(),
			(this.Wen = void 0),
			(this.Ken = void 0),
			this.Xen &&
				this.Qen?.IsValid() &&
				ActorSystem_1.ActorSystem.Put(this.Qen),
			(this.Qen = void 0),
			(this.Xen = !1),
			this.utn?.clear(),
			!0
		);
	}
	async InitRangeActorAsync() {
		return new Promise((e, t) => {
			this.$en = !1;
			const n = this.NHo;
			switch (n.Type) {
				case "Box":
					e(this.Utn(n));
					break;
				case "Sphere":
					e(this.Ptn(n));
					break;
				case "Cylinder": {
					const t =
						CommonParamById_1.configCommonParamById.GetStringConfig(
							"BaseCylinderStaticMeshForRange",
						) ?? "None";
					this.ttn && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.ttn),
						(this.ttn = ResourceSystem_1.ResourceSystem.LoadAsync(
							t,
							UE.Object,
							(o) => {
								(this.ttn = void 0),
									o instanceof UE.StaticMesh
										? e(this.xtn(n, o))
										: (Log_1.Log.CheckError() &&
												Log_1.Log.Error(
													"Entity",
													40,
													"[RangeComponent] 基础静态网格体配置错误",
													["MeshPath", t],
												),
											e(!1));
							},
						));
					break;
				}
				case "Volume":
					(this.jen = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
						GlobalData_1.GlobalData.World,
						UE.KuroTriggerVolumeManager.StaticClass(),
					)),
						this.vtn &&
							(this.jen.OnTriggerVolumeAddToSubsystem.Remove(this.vtn),
							(this.vtn = void 0));
					var o = this.jen?.GetKuroTriggerVolume(new UE.FName(n.VolumeKey));
					o
						? e(this.wtn(n, o))
						: (Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Entity",
									40,
									"[RangeComponent] KuroTriggerVolume未找到，等待加载",
									["VolumeKey", n?.VolumeKey],
									["CreatureDataId", this.SIe.GetCreatureDataId()],
									["ConfigId", this.SIe.GetPbDataId()],
									["PlayerId", this.SIe.GetPlayerId()],
								),
							(this.vtn = (t) => {
								t?.toString() === n.VolumeKey &&
									(Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug(
											"Entity",
											40,
											"[RangeComponent] KuroTriggerVolume已加载",
											["VolumeKey", n?.VolumeKey],
											["CreatureDataId", this.SIe.GetCreatureDataId()],
											["ConfigId", this.SIe.GetPbDataId()],
											["PlayerId", this.SIe.GetPlayerId()],
										),
									(t = this.jen?.GetKuroTriggerVolume(t)),
									e(!!t && this.wtn(n, t)),
									this.vtn) &&
									(this.jen?.OnTriggerVolumeAddToSubsystem.Remove(this.vtn),
									(this.vtn = void 0));
							}),
							this.jen.OnTriggerVolumeAddToSubsystem.Add(this.vtn));
					break;
				case "ActorRefVolume":
					(this.$en = !0), e(!0);
			}
		});
	}
	Utn(e) {
		if (
			((this.Qen = ActorSystem_1.ActorSystem.Get(
				UE.Actor.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
			)),
			(this.Xen = !0),
			(this.Wen = this.Qen?.AddComponentByClass(
				UE.BoxComponent.StaticClass(),
				!1,
				MathUtils_1.MathUtils.DefaultTransform,
				!1,
			)),
			!this.Wen?.IsValid())
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneGameplay",
						40,
						"[RangeComponent] BoxShape创建失败",
						["CreatureDataId", this.SIe.GetCreatureDataId()],
						["ConfigId", this.SIe.GetPbDataId()],
						["PlayerId", this.SIe.GetPlayerId()],
					),
				!1
			);
		if (
			(this.Wen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1), this.Yen)
		) {
			if (
				((this.Jen = this.Qen?.AddComponentByClass(
					UE.BoxComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
				)),
				!this.Jen?.IsValid())
			)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneGameplay",
							40,
							"[RangeComponent] BoxShape(ExpandedExit)创建失败",
							["CreatureDataId", this.SIe.GetCreatureDataId()],
							["ConfigId", this.SIe.GetPbDataId()],
							["PlayerId", this.SIe.GetPlayerId()],
						),
					!1
				);
			this.Jen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1);
		}
		return !0;
	}
	Ptn(e) {
		if (
			((this.Qen = ActorSystem_1.ActorSystem.Get(
				UE.Actor.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
			)),
			(this.Xen = !0),
			(this.Wen = this.Qen?.AddComponentByClass(
				UE.SphereComponent.StaticClass(),
				!1,
				MathUtils_1.MathUtils.DefaultTransform,
				!1,
			)),
			!this.Wen?.IsValid())
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneGameplay",
						40,
						"[RangeComponent] SphereShape创建失败",
						["CreatureDataId", this.SIe.GetCreatureDataId()],
						["ConfigId", this.SIe.GetPbDataId()],
						["PlayerId", this.SIe.GetPlayerId()],
					),
				!1
			);
		if (
			(this.Wen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1), this.Yen)
		) {
			if (
				((this.Jen = this.Qen?.AddComponentByClass(
					UE.SphereComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
				)),
				!this.Jen?.IsValid())
			)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneGameplay",
							40,
							"[RangeComponent] SphereShape(ExpandedExit)创建失败",
							["CreatureDataId", this.SIe.GetCreatureDataId()],
							["ConfigId", this.SIe.GetPbDataId()],
							["PlayerId", this.SIe.GetPlayerId()],
						),
					!1
				);
			this.Jen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1);
		}
		return !0;
	}
	xtn(e, t) {
		if (
			((this.Qen = ActorSystem_1.ActorSystem.Get(
				UE.Actor.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
			)),
			(this.Xen = !0),
			(this.Ken = this.Qen?.AddComponentByClass(
				UE.StaticMeshComponent.StaticClass(),
				!1,
				MathUtils_1.MathUtils.DefaultTransform,
				!1,
				new UE.FName("MeshComp"),
			)),
			!this.Ken?.IsValid())
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneGameplay",
						40,
						"[RangeComponent] CylinderMesh创建失败",
						["CreatureDataId", this.SIe.GetCreatureDataId()],
						["ConfigId", this.SIe.GetPbDataId()],
						["PlayerId", this.SIe.GetPlayerId()],
					),
				!1
			);
		if (
			(this.Ken.SetStaticMesh(t),
			this.Ken.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1),
			this.Ken.SetHiddenInGame(!0),
			this.Ken.SetVisibility(!1),
			this.Yen)
		) {
			if (
				((this.zen = this.Qen?.AddComponentByClass(
					UE.StaticMeshComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
					new UE.FName("ExpandedExitMeshComp"),
				)),
				!this.zen?.IsValid())
			)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneGameplay",
							40,
							"[RangeComponent] CylinderMesh创建失败",
							["CreatureDataId", this.SIe.GetCreatureDataId()],
							["ConfigId", this.SIe.GetPbDataId()],
							["PlayerId", this.SIe.GetPlayerId()],
						),
					!1
				);
			this.zen.SetStaticMesh(t),
				this.zen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, !1),
				this.zen.SetHiddenInGame(!0),
				this.zen.SetVisibility(!1);
		}
		return !0;
	}
	wtn(e, t) {
		var n, o;
		return (
			(this.Qen = t),
			(this.Xen = !1),
			t?.IsValid()
				? (GlobalData_1.GlobalData.IsPlayInEditor &&
						((n = (0, puerts_1.$ref)(void 0)),
						(o = (0, puerts_1.$ref)(void 0)),
						t.GetActorBounds(!1, n, o),
						27e9 < (t = (0, puerts_1.$unref)(o)).X * t.Y * t.Z) &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"SceneItem",
							30,
							"[RangeComponent] TriggerVolume配置过大，请联系相关人员",
							["ConfigId", this.SIe.GetPbDataId()],
						),
					!0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneGameplay",
							30,
							"[RangeComponent] KuroTriggerVolume非Valid",
							["VolumeKey", e?.VolumeKey],
							["CreatureDataId", this.SIe.GetCreatureDataId()],
							["ConfigId", this.SIe.GetPbDataId()],
							["PlayerId", this.SIe.GetPlayerId()],
						),
					!1)
		);
	}
	mtn() {
		this.$en || (this.Xen ? this.btn() : this.qtn(), this.Gtn());
	}
	btn() {
		var e, t;
		this.Qen &&
			this.Xen &&
			!this.$en &&
			"Volume" !== (e = this.NHo).Type &&
			"ActorRefVolume" !== e.Type &&
			((t = this.SIe.GetTransform()),
			this.Qen.K2_SetActorTransform(t, !1, void 0, !0),
			(t = this.Entity.GetComponent(1)?.Owner)?.IsValid() &&
				this.Qen.K2_AttachToActor(t, void 0, 2, 2, 1, !1),
			(t = new UE.Vector(e.Center.X ?? 0, e.Center.Y ?? 0, e.Center.Z ?? 0)),
			this.Qen.K2_AddActorLocalOffset(t, !1, void 0, !1),
			"Box" === e.Type) &&
			e.Rotator &&
			((t = new UE.Rotator(
				e.Rotator.Y ?? 0,
				e.Rotator.Z ?? 0,
				e.Rotator.X ?? 0,
			)),
			this.Qen.K2_AddActorLocalRotation(t, !1, void 0, !1));
	}
	qtn() {
		var e, t, n, o;
		!this.Qen ||
			this.Xen ||
			this.$en ||
			("Volume" !== (e = this.NHo).Type &&
				"ActorRefVolume" !== e.Type &&
				((t = new UE.Vector(e.Center.X ?? 0, e.Center.Y ?? 0, e.Center.Z ?? 0)),
				(n = new UE.Rotator()),
				"Box" === e.Type &&
					e.Rotator &&
					n.Add(e.Rotator.Y ?? 0, e.Rotator.Z ?? 0, e.Rotator.X ?? 0),
				(o =
					"Cylinder" === e.Type ? this.Ken : this.Wen).K2_SetRelativeLocation(
					t,
					!1,
					void 0,
					!1,
				),
				o.K2_SetRelativeRotation(n, !1, void 0, !1),
				this.Yen) &&
				((o =
					"Cylinder" === e.Type ? this.zen : this.Jen).K2_SetRelativeLocation(
					t,
					!1,
					void 0,
					!1,
				),
				o.K2_SetRelativeRotation(n, !1, void 0, !1)));
	}
	Gtn() {
		var e, t, n;
		this.Qen &&
			("Box" === (n = this.NHo).Type
				? ((t = new UE.Vector(n.Size.X ?? 0, n.Size.Y ?? 0, n.Size.Z ?? 0)),
					this.Wen?.SetBoxExtent(t, !0),
					GlobalData_1.GlobalData.IsPlayInEditor &&
						216e9 < t.X * t.Y * t.Z &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"SceneItem",
							30,
							"[RangeComponent] Trigger Box配置过大，请联系相关人员",
							["ConfigId", this.SIe.GetPbDataId()],
						),
					this.Yen && this.Jen?.SetBoxExtent(t.op_Addition(this.Yen), !0))
				: "Sphere" === n.Type
					? (this.Wen?.SetSphereRadius(n.Radius, !0),
						GlobalData_1.GlobalData.IsPlayInEditor &&
							54e9 < n.Radius * n.Radius * n.Radius &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"SceneItem",
								30,
								"[RangeComponent] Trigger Sphere配置过大，请联系相关人员",
								["ConfigId", this.SIe.GetPbDataId()],
							),
						this.Yen && this.Jen?.SetSphereRadius(n.Radius + this.Yen, !0))
					: "Cylinder" === n.Type &&
						this.Ken?.StaticMesh &&
						((t = this.Ken.StaticMesh.GetBounds().BoxExtent),
						(e = n.Radius / t.X),
						(t = n.Height / (2 * t.Z)),
						this.Ken.SetWorldScale3D(
							Vector_1.Vector.Create(e, e, t).ToUeVector(),
						),
						GlobalData_1.GlobalData.IsPlayInEditor &&
							54e9 < n.Radius * n.Radius * n.Radius &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"SceneItem",
								40,
								"[RangeComponent] Trigger Cylinder配置过大，请联系相关人员",
								["ConfigId", this.SIe.GetPbDataId()],
							),
						this.Yen) &&
						this.zen?.StaticMesh &&
						((e = this.zen.StaticMesh.GetBounds().BoxExtent),
						(t = (n.Radius + this.Yen) / e.X),
						(n = (n.Height + this.Yen) / (2 * e.Z)),
						this.zen?.SetWorldScale3D(
							Vector_1.Vector.Create(t, t, n).ToUeVector(),
						)));
	}
	gtn() {
		switch (this.NHo.Type) {
			case "Volume":
			case "Box":
			case "Sphere":
			case "Cylinder":
				this.Qen?.IsValid()
					? (this.Qen.OnActorBeginOverlap.Add(this.ytn),
						this.Qen.OnActorEndOverlap.Add(this.Itn))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneGameplay",
							40,
							"[RangeComponent] RangeActor Not Valid",
							["CreatureDataId", this.SIe.GetCreatureDataId()],
							["ConfigId", this.SIe.GetPbDataId()],
							["PlayerId", this.SIe.GetPlayerId()],
						);
				break;
			case "ActorRefVolume":
				this.Hen
					? this.Hen.AddOnPlayerOverlapCallback(this.Atn)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneGameplay",
							40,
							"[RangeComponent] RefComponent Not Valid",
							["CreatureDataId", this.SIe.GetCreatureDataId()],
							["ConfigId", this.SIe.GetPbDataId()],
							["PlayerId", this.SIe.GetPlayerId()],
						);
				break;
			default:
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneGameplay",
						40,
						"[RangeComponent] 不支持的配置类型",
						["CreatureDataId", this.SIe.GetCreatureDataId()],
						["ConfigId", this.SIe.GetPbDataId()],
						["PlayerId", this.SIe.GetPlayerId()],
					);
		}
	}
	Dtn() {
		var e = this.NHo;
		this.Qen?.IsValid() &&
			(this.Qen.OnActorBeginOverlap.Remove(this.ytn),
			this.Qen.OnActorEndOverlap.Remove(this.Itn)),
			"ActorRefVolume" === e.Type &&
				this.Hen &&
				this.Hen.RemoveOnPlayerOverlapCallback(this.Atn);
	}
	Stn(e, t, n = !0) {
		if (e?.IsValid()) {
			var o = this.Ntn(e);
			if (o?.Valid) {
				if (o.Id === this.Entity.Id) return;
				var r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
					a = o.Entity.GetComponent(0);
				if (
					(a?.IsRole() && a.GetPlayerId() !== r) ??
					(a?.IsVision() && a.GetSummonerPlayerId() !== r)
				)
					return;
			}
			e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() &&
				(this.atn = t),
				this.Otn(e, t),
				o?.Valid && (this.Rtn(o, t, n), this.Ttn(e, o, t, n));
		}
	}
	ptn(e) {
		if (!this.$en)
			if (this.Qen?.IsValid()) {
				var t = (0, puerts_1.$ref)(void 0),
					n = (this.Qen.GetOverlappingActors(t), (0, puerts_1.$unref)(t)),
					o = n?.Num() ?? 0;
				if (0 < o)
					for (let t = 0; t < o; t++) {
						var r = n.Get(t);
						this.Stn(r, !0, e);
					}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneGameplay",
						40,
						"[RangeComponent] ForceCheckOverlapAndCallbackEnter失败 Actor not valid",
						["CreatureDataId", this.SIe.GetCreatureDataId()],
						["ConfigId", this.SIe.GetPbDataId()],
						["PlayerId", this.SIe.GetPlayerId()],
					);
	}
	Ltn(e) {
		var t;
		this.htn &&
			(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
				Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() ?? 0,
			)) &&
			this.Ttn(
				RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(),
				t,
				!1,
				e,
			);
		const n = [],
			o =
				(this.ntn?.forEach((e) => {
					n.push(e);
				}),
				this.Rtn(n, !1, e),
				[]);
		this.stn?.forEach((e) => {
			o.push(e);
		}),
			o.forEach((e) => {
				this.Otn(e, !1);
			}),
			(this.htn = !1),
			this.ntn.clear(),
			this.stn.clear();
	}
	Z5s() {
		var e = [],
			t = this.htn;
		if (this.Y5s)
			for (var [, n] of this.ntn) {
				if (((n = n.Entity?.GetComponent(0)?.GetCreatureDataId()), !n)) break;
				e.push(n);
			}
		this.ReqInitRange(e, t, (e) => {
			e && e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
				? (this.X5s = !0)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneItem",
						40,
						"[RangeComponent] ReqInitRange出错",
						["CreatureDataId", this.SIe.GetCreatureDataId()],
						["PbDataId", this.SIe.GetPbDataId()],
						["PlayerId", this.SIe.GetPlayerId()],
					);
		});
	}
	Ntn(e) {
		if (e?.IsValid())
			return e ===
				RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()
				? Global_1.Global.BaseCharacter?.IsValid()
					? ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
							Global_1.Global.BaseCharacter.EntityId,
						)
					: void 0
				: ModelManager_1.ModelManager.CreatureModel?.GetEntityByChildActor(e);
	}
	Rtn(e, t, n = !0) {
		if (e) {
			let a = e;
			if (Array.isArray(a)) {
				if (!a.length) return;
			} else a = [a];
			var o = [];
			for (const e of a) {
				let a = !1;
				if (
					(t
						? this.ntn.has(e.Id) || (this.ntn.set(e.Id, e), (a = !0))
						: this.ntn.has(e.Id) && (this.ntn.delete(e.Id), (a = !0)),
					a)
				) {
					for (let n = this.otn.length - 1; 0 <= n; n--) {
						var r = this.otn[n];
						try {
							r?.(t, e);
						} catch (e) {
							Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"SceneItem",
									40,
									"[RangeComp] 范围组件回调异常，请检查之前的报错",
									["PbDataId", this.SIe?.GetPbDataId()],
									["IsEnter", t],
								);
						}
					}
					EventSystem_1.EventSystem.EmitWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnEntityInOutRangeLocal,
						t,
						e,
					);
				}
				a && n && o.push(e);
			}
			n && this.ReqEntityAccessRange(t, o);
		}
	}
	Ttn(e, t, n, o = !0) {
		if (
			e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() &&
			t.Id === Global_1.Global.BaseCharacter?.EntityId
		) {
			let a = !1;
			if (
				(n
					? this.htn || ((this.htn = !0), (a = !0))
					: this.htn && ((this.htn = !1), (a = !0)),
				a)
			) {
				for (let t = this.itn.length - 1; 0 <= t; t--) {
					var r = this.itn[t];
					try {
						r?.(n);
					} catch (e) {
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"SceneItem",
								40,
								"[RangeComp] 范围组件回调异常，请检查之前的报错",
							);
					}
				}
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
					n,
				);
			}
			a && o && this.ReqMyPlayerAccessRange(n, t);
		}
	}
	Otn(e, t) {
		if (t) {
			if (this.stn.has(e)) return;
			this.stn.add(e);
		} else {
			if (!this.stn.has(e)) return;
			this.stn.delete(e);
		}
		for (let o = this.rtn.length - 1; 0 <= o; o--) {
			var n = this.rtn[o];
			try {
				n?.(t, e);
			} catch (e) {
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneItem",
						40,
						"[RangeComp] 范围组件回调异常，请检查之前的报错",
					);
			}
		}
		EventSystem_1.EventSystem.EmitWithTarget(
			this.Entity,
			EventDefine_1.EEventName.OnActorInOutRangeLocal,
			t,
			e,
		);
	}
	AddOnPlayerOverlapCallback(e) {
		this.itn?.push(e);
	}
	RemoveOnPlayerOverlapCallback(e) {
		void 0 === this.itn ||
			(e = this.itn.indexOf(e)) < 0 ||
			this.itn.splice(e, 1);
	}
	AddOnEntityOverlapCallback(e) {
		this.otn?.push(e);
	}
	RemoveOnEntityOverlapCallback(e) {
		void 0 === this.otn ||
			(e = this.otn.indexOf(e)) < 0 ||
			this.otn.splice(e, 1);
	}
	AddOnActorOverlapCallback(e) {
		this.rtn?.push(e);
	}
	RemoveOnActorOverlapCallback(e) {
		void 0 === this.rtn ||
			(e = this.rtn.indexOf(e)) < 0 ||
			this.rtn.splice(e, 1);
	}
	ServerUpdateEntitiesInRangeOnline(e, t) {
		let n;
		if (Array.isArray(t)) {
			if (!t.length) return;
			n = t;
		} else n = [t];
		n.forEach((t) => {
			this.utn?.has(t) && this.utn.delete(t);
			var n = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t);
			n
				? (e ? this.ltn?.set(n.Id, n) : this.ltn?.delete(n.Id),
					this.GetIsLocalSetupComplete() &&
						EventSystem_1.EventSystem.EmitWithTarget(
							this.Entity,
							EventDefine_1.EEventName.OnEntityInOutRangeOnline,
							e,
							n,
						))
				: this.utn.set(t, e);
		});
	}
	ServerUpdatePlayerInRangeOnline(e, t) {
		let n;
		if (Array.isArray(t)) {
			if (!t.length) return;
			n = t;
		} else n = [t];
		n.forEach((t) => {
			e ? this._tn?.add(t) : this._tn?.delete(t),
				this.GetIsLocalSetupComplete() &&
					EventSystem_1.EventSystem.EmitWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnPlayerInOutRangeOnline,
						e,
						t,
					);
		});
	}
	ReqMyPlayerAccessRange(e, t) {
		var n, o, r;
		this.J5s &&
			(n = (r = t.Entity?.GetComponent(0))?.GetCreatureDataId()) &&
			(ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
				"RangeComponent",
			) &&
				((o = t.Entity?.GetComponent(1)), Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info(
					"SceneItem",
					40,
					"[RangeComp] 本机玩家进出:(发起PlayerAccessRange)",
					["PbDataId", this.SIe?.GetPbDataId()],
					["CreatureDataId", this.SIe?.GetCreatureDataId()],
					["IsEnter", e],
					["OtherPbDataId", r?.GetPbDataId()],
					["OtherCreatureId", n],
					["OtherLocation", o?.ActorLocationProxy],
				),
			t.Entity?.GetComponent(57)?.CollectSampleAndSend(!0),
			((r = Protocol_1.Aki.Protocol.Pds.create()).c7n =
				this.SIe.GetCreatureDataId()),
			(r.pFn = e
				? Protocol_1.Aki.Protocol.pFn.Proto_RangeEnter
				: Protocol_1.Aki.Protocol.pFn.Proto_RangeLeave),
			Net_1.Net.Call(14101, r, () => {}));
	}
	ReqEntityAccessRange(e, t) {
		if (this.Y5s && t?.length) {
			var n = [];
			for (const i of t) {
				var o,
					r = i.Entity?.GetComponent(0),
					a = r?.GetCreatureDataId();
				a &&
					(n.push(a),
					ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
						"RangeComponent",
					) &&
						((o = i.Entity?.GetComponent(1)), Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info(
							"SceneItem",
							40,
							"[RangeComp] 实体进出:(加入EntityAccessRange队列)",
							["PbDataId", this.SIe?.GetPbDataId()],
							["CreatureDataId", this.SIe?.GetCreatureDataId()],
							["IsEnter", e],
							["OtherPbDataId", r?.GetPbDataId()],
							["OtherCreatureId", a],
							["OtherPos", o?.ActorLocationProxy],
						),
					i.Entity?.GetComponent(57)?.CollectSampleAndSend(!0));
			}
			((t = Protocol_1.Aki.Protocol.Dds.create()).c7n =
				this.SIe.GetCreatureDataId()),
				(t.W5s = n),
				(t.pFn = e
					? Protocol_1.Aki.Protocol.pFn.Proto_RangeEnter
					: Protocol_1.Aki.Protocol.pFn.Proto_RangeLeave),
				Net_1.Net.Call(5086, t, () => {});
		}
	}
	ReqInitRange(e, t, n = () => {}) {
		var o = Protocol_1.Aki.Protocol.$5s.create();
		(o.c7n = this.SIe.GetCreatureDataId()),
			(o.Q5s = e),
			(o.K5s = t),
			Net_1.Net.Call(12354, o, n);
	}
	IsOverlappingPlayer() {
		var e = this.NHo,
			t = RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger();
		return "ActorRefVolume" !== e?.Type
			? !!this.Qen?.IsValid() && this.Qen.IsOverlappingActor(t)
			: this.atn;
	}
	UpdateBoxRange(e, t) {
		this.Qen &&
			this.Wen &&
			"Box" === this.NHo.Type &&
			(this.Qen.K2_SetActorRelativeLocation(e, !1, void 0, !0),
			this.Wen?.SetBoxExtent(t, !0),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				216e9 < t.X * t.Y * t.Z &&
				Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"SceneItem",
					30,
					"[RangeComponent] Trigger Box配置过大，请联系相关人员",
					["ConfigId", this.SIe.GetPbDataId()],
				),
			this.Yen) &&
			this.Jen &&
			this.Jen?.SetBoxExtent(t.op_Addition(this.Yen), !0);
	}
	SetRangeActorParent(e) {
		this.Qen?.IsValid() &&
			(this.Qen.K2_DetachFromActor(1, 1, 1),
			this.Qen.K2_AttachToActor(e, void 0, 1, 1, 1, !1),
			this.Qen.K2_SetActorTransform(e.GetTransform(), !1, void 0, !0));
	}
};
(RangeComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(74)],
	RangeComponent,
)),
	(exports.RangeComponent = RangeComponent);
