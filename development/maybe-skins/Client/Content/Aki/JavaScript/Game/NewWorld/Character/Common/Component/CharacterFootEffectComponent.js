"use strict";
var CharacterFootEffectComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, o) {
			var i,
				a = arguments.length,
				n =
					a < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, r))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				n = Reflect.decorate(t, e, r, o);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(i = t[s]) &&
						(n = (a < 3 ? i(n) : 3 < a ? i(e, r, n) : i(e, r)) || n);
			return 3 < a && n && Object.defineProperty(e, r, n), n;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterFootEffectComponent = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	EffectSystem_1 = require("../../../../Effect/EffectSystem"),
	GameQualitySettingsManager_1 = require("../../../../GameQualitySettings/GameQualitySettingsManager"),
	GlobalData_1 = require("../../../../GlobalData"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CharacterNameDefines_1 = require("../CharacterNameDefines"),
	CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
	VoxelUtils_1 = require("../../../../Utils/VoxelUtils"),
	PROFILE_KEY = "CharacterFootEffectComponent_FootTrace",
	FOOTPRINT_SPAWN_DURATION = 200,
	FOOTPRINT_SPAWN_MIN_DISTANCE_SQUARED = 500,
	SPRINT_FOOTEFFECT_DETECT_HEIGHT = 50,
	NORMAL_FOOTEFFECT_DETECT_HEIGHT = 15,
	MATERIAL_ID_WAT = 6,
	MATERIAL_ID_SHR = 14,
	FOOTPRINT_FORWARD_OFFSET = 5;
let CharacterFootEffectComponent =
	(CharacterFootEffectComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.oRe = void 0),
				(this.Hte = void 0),
				(this.j5r = void 0),
				(this.W5r = void 0),
				(this.K5r = !1),
				(this.Q5r = !1),
				(this.X5r = !1),
				(this.$5r = void 0),
				(this._ae = Vector_1.Vector.Create()),
				(this.uae = Vector_1.Vector.Create()),
				(this.Y5r = !1),
				(this.J5r = !1),
				(this.z5r = Vector_1.Vector.Create()),
				(this.Z5r = Vector_1.Vector.Create()),
				(this.TIn = Vector_1.Vector.Create()),
				(this.Lz = Vector_1.Vector.Create()),
				(this.Tz = Vector_1.Vector.Create()),
				(this.M7o = Vector_1.Vector.Create()),
				(this.Gue = Rotator_1.Rotator.Create()),
				(this.eVr = new Map()),
				(this.tVr = 0),
				(this.iVr = Vector_1.Vector.Create());
		}
		static get Dependencies() {
			return [3, 42, 160, 158, 0];
		}
		OnInit(t) {
			return super.OnInit(t), !0;
		}
		OnStart() {
			super.OnStart();
			var t = this.Entity.GetComponent(3);
			if (!t?.Valid) return !1;
			var e = this.Entity.GetComponent(160);
			if (!e?.Valid) return !1;
			var r = this.Entity.GetComponent(42);
			if (!r?.Valid) return !1;
			if (!this.Entity.GetComponent(0)?.Valid) return !1;
			var o = this.Entity.GetComponent(158);
			if (!o?.Valid) return !1;
			if (
				((this.Hte = t),
				(this.oRe = e),
				(this.j5r = r),
				(this.W5r = o),
				(this.$5r = UE.NewObject(UE.TraceSphereElement.StaticClass())),
				(this.$5r.bIsSingle = !0),
				(this.$5r.bTraceComplex = !1),
				(this.$5r.bIgnoreSelf = !0),
				(this.$5r.WorldContextObject = this.Hte.Actor),
				(this.$5r.Radius = 10),
				this.$5r.SetTraceTypeQuery(
					QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
				),
				!(t = DataTableUtil_1.DataTableUtil.GetAllDataTableRow(6)))
			)
				return !1;
			for (const e of t) this.eVr.set(e.SurfaceType, e.Effect);
			return !0;
		}
		OnEnd() {
			return (
				(this.oRe = void 0),
				(this.Hte = void 0),
				(this.j5r = void 0),
				this.$5r?.Dispose(),
				(this.$5r = void 0),
				(this.Y5r = !1),
				(this.K5r = !1),
				(this.J5r = !1),
				(this.Q5r = !1),
				this.eVr.clear(),
				!0
			);
		}
		OnTick(t) {
			this.oVr(), this.rVr(), this.nVr(), this.aVr();
		}
		oVr() {
			var t;
			UE.KuroStaticLibrary.IsObjectClassByName(
				this.oRe.MainAnimInstance,
				CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
			)
				? ((t = this.oRe.MainAnimInstance.GetCurveValue(
						CharacterFootEffectComponent_1.FootstepCurveName,
					)) < -0.5
						? this.K5r
							? (this.X5r = !1)
							: ((this.K5r = !0), (this.X5r = !0))
						: (this.K5r = !1),
					0.5 < t
						? this.Q5r
							? (this.X5r = !1)
							: ((this.Q5r = !0), (this.X5r = !0))
						: (this.Q5r = !1))
				: ((this.K5r = !1), (this.Q5r = !1), (this.X5r = !1));
		}
		LIn(t, e) {
			return (
				this._ae.FromUeVector(this.Hte.Actor.Mesh.GetSocketLocation(t)),
				this.Hte.ActorUpProxy.Multiply(
					this.W5r.MoveState ===
						CharacterUnifiedStateTypes_1.ECharMoveState.Sprint
						? -50
						: -15,
					this.uae,
				),
				this.uae.AdditionEqual(this._ae),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					this.$5r,
					this._ae,
				),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					this.$5r,
					this.uae,
				),
				(t = TraceElementCommon_1.TraceElementCommon.SphereTrace(
					this.$5r,
					PROFILE_KEY,
				))
					? TraceElementCommon_1.TraceElementCommon.GetHitLocation(
							this.$5r.HitResult,
							0,
							e,
						)
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Test",
							6,
							"Detect Footprint Failed",
							["location", this.Hte?.ActorLocationProxy],
							["start", this._ae],
							["end", this.uae],
						),
				t
			);
		}
		rVr() {
			this.Hte?.Actor.Mesh?.IsValid() &&
				(this.K5r && this.X5r
					? (this.Y5r = this.LIn(
							CharacterFootEffectComponent_1.LeftFootSocketName,
							this.z5r,
						))
					: (this.Y5r = !1),
				this.Q5r && this.X5r
					? (this.J5r = this.LIn(
							CharacterFootEffectComponent_1.RightFootSocketName,
							this.Z5r,
						))
					: (this.J5r = !1));
		}
		nVr() {
			this.K5r &&
				this.X5r &&
				this.Y5r &&
				this.hVr(this.z5r, this.$5r?.HitResult),
				this.Q5r &&
					this.X5r &&
					this.J5r &&
					this.hVr(this.Z5r, this.$5r?.HitResult);
		}
		hVr(t, e) {
			if (e?.IsValid()) {
				var r = this.W5r.MoveState;
				if (
					r === CharacterUnifiedStateTypes_1.ECharMoveState.Sprint ||
					e?.bBlockingHit
				) {
					var o = this.Hte?.Actor;
					if (
						o?.IsValid() &&
						(EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnCharFootOnTheGround,
						),
						(0, RegisterComponent_1.isComponentInstance)(this.j5r, 170))
					) {
						var i = this.j5r?.GetAkComponent();
						if (i?.IsValid()) {
							let a = !1;
							(a =
								!(
									!o.CharRenderingComponent?.GetInWater() &&
									((o = e.Components.Get(0)),
									!(e =
										UE.KuroRenderingRuntimeBPPluginBPLibrary.GetComponentPhysicalMaterial(
											o,
										))?.IsValid() || "WaterLightLand" !== e.GetName())
								) || a)
								? (this.j5r.FootstepTexture.State = "WaterSurface")
								: ((o = t.ToUeVector()),
									6 ===
										(e = VoxelUtils_1.VoxelUtils.GetVoxelInfo(
											GlobalData_1.GlobalData.World,
											o,
										)).MtlID || 14 === e.MtlID
										? (this.j5r.FootstepTexture.State = "DirtSurface")
										: ((t = UE.KuroVoxelSystem.GetMtlNameByID(e.MtlID)),
											(this.j5r.FootstepTexture.State = t)));
							let n = "play_footstep_run";
							r === CharacterUnifiedStateTypes_1.ECharMoveState.Walk ||
							r === CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop
								? (n = "play_footstep_walk")
								: (r !== CharacterUnifiedStateTypes_1.ECharMoveState.Sprint &&
										r !==
											CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop) ||
									(n = "play_footstep_fastrun"),
								AudioSystem_1.AudioSystem.PostEvent(n, i);
						}
					}
				}
			}
		}
		UpdateFootprintEffect() {
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
				.GetCurrentQualityInfo()
				.GetGameQualitySettingLevel() <= 1 ||
				(this.K5r && this.X5r && this.Y5r && this.DIn(this.$5r?.HitResult),
				this.Q5r && this.X5r && this.J5r && this.DIn(this.$5r?.HitResult));
		}
		DIn(t) {
			var e, r, o;
			!t?.bBlockingHit ||
				Time_1.Time.Now - this.tVr < 200 ||
				((e = this.TIn),
				TraceElementCommon_1.TraceElementCommon.GetHitLocation(t, 0, e),
				Vector_1.Vector.DistSquared(e, this.iVr) < 500) ||
				((r = t.PhysMaterials?.Get(0)),
				void 0 !== (o = this.eVr.get(r.SurfaceType)?.ToAssetPathName()) &&
					(this.Hte.ActorForwardProxy.Multiply(5, this.Lz),
					TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
						t,
						0,
						this.Tz,
					),
					Vector_1.Vector.VectorPlaneProject(this.Lz, this.Tz, this.M7o),
					this.M7o.AdditionEqual(e),
					MathUtils_1.MathUtils.LookRotationUpFirst(
						this.Hte.ActorForwardProxy,
						this.Tz,
						this.Gue,
					),
					EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
						GlobalData_1.GlobalData.World,
						new UE.Transform(
							this.Gue.ToUeRotator(),
							this.M7o.ToUeVector(),
							Vector_1.Vector.OneVectorProxy.ToUeVector(),
						),
						o,
						"[SceneCharacterFootprintEffect.SpawnEffect]",
					),
					(this.tVr = Time_1.Time.Now),
					this.iVr.DeepCopy(e)));
		}
		TriggerFootprint(t) {
			if (!(Time_1.Time.Now - this.tVr < 200)) {
				if (t) {
					if (
						!this.LIn(
							CharacterFootEffectComponent_1.LeftFootSocketName,
							this.TIn,
						)
					)
						return;
				} else if (
					!this.LIn(
						CharacterFootEffectComponent_1.RightFootSocketName,
						this.TIn,
					)
				)
					return;
				(t = this.$5r?.HitResult), t && this.DIn(t);
			}
		}
		aVr() {
			!ModelManager_1.ModelManager.TeleportModel.IsTeleport &&
				this.Hte.EnableVoxelDetection &&
				(this.K5r && this.X5r && this.Y5r
					? ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(
							this.z5r.ToUeVector(),
							this.Hte.IsRoleAndCtrlByMe,
						)
					: this.Q5r && this.X5r && this.J5r
						? ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(
								this.Z5r.ToUeVector(),
								this.Hte.IsRoleAndCtrlByMe,
							)
						: this.Hte &&
							this.W5r &&
							this.W5r.MoveState !==
								CharacterUnifiedStateTypes_1.ECharMoveState.Other &&
							this.W5r.MoveState !==
								CharacterUnifiedStateTypes_1.ECharMoveState.Stand &&
							ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(
								this.Hte.ActorLocation,
								this.Hte.IsRoleAndCtrlByMe,
							));
		}
	});
(CharacterFootEffectComponent.FootstepCurveName = new UE.FName("Foot_voice")),
	(CharacterFootEffectComponent.LeftFootSocketName = new UE.FName(
		"Bip001LFoot",
	)),
	(CharacterFootEffectComponent.RightFootSocketName = new UE.FName(
		"Bip001RFoot",
	)),
	(CharacterFootEffectComponent = CharacterFootEffectComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(48)],
			CharacterFootEffectComponent,
		)),
	(exports.CharacterFootEffectComponent = CharacterFootEffectComponent);
