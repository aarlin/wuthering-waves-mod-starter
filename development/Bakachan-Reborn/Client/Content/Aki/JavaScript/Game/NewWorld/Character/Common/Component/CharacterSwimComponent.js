"use strict";
var CharacterSwimComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, i) {
			var o,
				s = arguments.length,
				h =
					s < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, r))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				h = Reflect.decorate(t, e, r, i);
			else
				for (var a = t.length - 1; 0 <= a; a--)
					(o = t[a]) &&
						(h = (s < 3 ? o(h) : 3 < s ? o(e, r, h) : o(e, r)) || h);
			return 3 < s && h && Object.defineProperty(e, r, h), h;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterSwimComponent =
		exports.SWIMMING_DECELERATION =
		exports.SWIMMING_BUOYANCY =
			void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	TickScoreController_1 = require("../../../../TickScore/TickScoreController"),
	PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants"),
	CharacterNameDefines_1 = require("../CharacterNameDefines"),
	CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
	CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
	PROFILE_DETECT_WATER_DEPTH = "CharacterSwimComponent_DetectWaterDepth",
	PROFILE_FLOOR = "CharacterSwimComponent_CheckHasArrivedFloorInSwimming",
	MAX_LAST_TICK_OFFSET_SQUARE = 1e6,
	MAX_BYTE = 255,
	MAX_SPEED_INTO_WATER = 50,
	ENTER_SWIM_BIGGER_THAN_THIS = 0.75,
	LEAVE_SWIM_LESS_THAN_THIS = 0.7,
	CLIMB_CHECK_ENTER_WATER_RATE = 0.8,
	FIVE_HUNDRED_TO_FIND_SURFACE = 500,
	TIME_CLEAR_ENTER_WATER = 500,
	SWIMMING_FRICTION = ((exports.SWIMMING_BUOYANCY = 1.4), 0.01),
	SWIMMING_FRICTION_MIN_SPEED = 75,
	SWIMMING_FRICTION_RATION = 1e4,
	SWIMMING_MAX_DEPTH = 2,
	SWIMMING_ACCELERATOR = 200,
	EIGHTY = ((exports.SWIMMING_DECELERATION = 0.06), 80),
	COS_EIGHTY = 0.173,
	MIN_DEPTH = -99999,
	waterAreaDetectExtent = new UE.Vector(500, 500, 2e3);
class CharacterSwimUtils {}
(CharacterSwimUtils.AfterTransformLocationOffset = new UE.Vector(EIGHTY, 0, 0)),
	(CharacterSwimUtils.DebugColor1 = new UE.LinearColor(255, 255, 0, 1)),
	(CharacterSwimUtils.DebugColor2 = new UE.LinearColor(0, 255, 0, 1)),
	(CharacterSwimUtils.DebugColor3 = new UE.LinearColor(255, 0, 0, 1)),
	(CharacterSwimUtils.DebugColor4 = new UE.LinearColor(0, 255, 255, 1));
let CharacterSwimComponent = (CharacterSwimComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.IsDebug = !1),
			(this.LWr = () => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Movement", 58, "[游泳组件]设置游泳盒子保底入水检测"),
					(this.DWr = !0);
			}),
			(this.RWr = (t, e) => {
				this.Lie.RemoveTag(-104158548),
					e === CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim
						? ((this.MaxSpeed =
								this.Gce.MovementData.FaceDirection.Standing.FastSwimSpeed),
							(this.AWr = !0),
							this.UWr())
						: e === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim
							? ((this.MaxSpeed =
									this.Gce.MovementData.FaceDirection.Standing.NormalSwimSpeed),
								(this.AWr = !1),
								this.UWr())
							: this.PWr();
			}),
			(this.xWr = (t, e) => {
				t === CharacterUnifiedStateTypes_1.ECharPositionState.Water
					? this.PWr()
					: e === CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
						this.UWr();
			}),
			(this.wWr = () => {
				this.UWr();
			}),
			(this.BWr = (t) => {
				var e =
					(1e4 * (1 - MathUtils_1.MathUtils.Clamp(this.Gce.Speed / 75, 0, 1)) +
						1) *
					SWIMMING_FRICTION;
				let r = this.Hte.ActorRotationProxy.Yaw - this.Hte.InputRotator.Yaw;
				for (; r > MathUtils_1.PI_DEG; ) r -= MathUtils_1.PI_DEG_DOUBLE;
				for (; r < -MathUtils_1.PI_DEG; ) r += MathUtils_1.PI_DEG_DOUBLE;
				r = Math.abs(r);
				var i = 200 * this.SwimAcceleratorCurve.GetFloatValue(r),
					o =
						((this.RotateSpeed = this.SwimRotationCurve.GetFloatValue(r)),
						1 === this.bWr ? 0 : exports.SWIMMING_BUOYANCY);
				this.Gce.CharacterMovement.KuroSwimming(
					t,
					!0,
					this.Depth,
					o,
					e,
					this.MaxSpeed,
					this.WaterSlope,
					i,
					exports.SWIMMING_DECELERATION,
				);
			}),
			(this.GWr = void 0),
			(this.NWr = void 0),
			(this.OWr = 0),
			(this.kWr = void 0),
			(this.FWr = 0),
			(this.Depth = 0),
			(this.RotateSpeed = 0),
			(this.SwimAcceleratorCurve = void 0),
			(this.SwimRotationCurve = void 0),
			(this.VWr = void 0),
			(this.HWr = void 0),
			(this.jWr = void 0),
			(this.WWr = 0),
			(this.KWr = !1),
			(this.WaterSlope = 0),
			(this.MaxSpeed = 0),
			(this.QWr = void 0),
			(this.Hte = void 0),
			(this.Lie = void 0),
			(this.W5r = void 0),
			(this.oRe = void 0),
			(this.cBe = void 0),
			(this.XWr = void 0),
			(this.Gce = void 0),
			(this.cz = void 0),
			(this.fz = void 0),
			(this.pz = void 0),
			(this.$Wr = void 0),
			(this.YWr = void 0),
			(this.JWr = void 0),
			(this.SprintSwimOffset = 0),
			(this.SprintSwimOffsetLerpSpeed = 0),
			(this.mie = -0),
			(this.zWr = void 0),
			(this.ZWr = BigInt(0)),
			(this.AWr = !1),
			(this.bWr = 1),
			(this.eKr = -0),
			(this.Iso = void 0),
			(this.InSwimTriggerCount = 0),
			(this.IsRole = !1),
			(this.DWr = !1),
			(this.h2r = (t) => {
				this.kWr.DeepCopy(this.Hte.ActorLocation);
			});
	}
	static get Dependencies() {
		return [3, 161, 185];
	}
	get BuffIndex() {
		return this.ZWr;
	}
	set BuffIndex(t) {
		this.ZWr !== t &&
			((this.ZWr = t),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharSwimStrengthChanged,
				this.ZWr,
			));
	}
	tKr() {
		this.Hte.IsBoss ||
			(this.cBe.StopAllSkills("CharacterSwimComponent.EnterSwimmingState"),
			this.IsDebug &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Movement", 58, "[游泳组件]触发入水,打断0组技能")),
			this.Gce.FallingIntoWater ||
				(this.cz.DeepCopy(this.Gce.CharacterMovement.LastUpdateVelocity),
				(this.cz.Z = MathUtils_1.MathUtils.Clamp(this.cz.Z, -50, 50)),
				(this.Gce.CharacterMovement.LastUpdateVelocity = this.cz.ToUeVector()),
				this.Gce.SetForceSpeed(this.cz),
				this.IsDebug &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Movement",
						58,
						"[游泳组件]触发入水,入水速度过大，限制到",
						["入水速度", this.cz],
					)),
			this.Gce.CharacterMovement.SetMovementMode(
				6,
				CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM,
			);
	}
	OnStart() {
		(this.Depth = 0),
			(this.MaxSpeed = 0),
			(this.WaterSlope = 0),
			(this.RotateSpeed = 0),
			(this.AWr = !1),
			(this.InSwimTriggerCount = 0),
			(this.DWr = !1),
			this.iKr(),
			(this.eKr = 0);
		var t = this.Entity.GetComponent(0).GetEntityType();
		return (
			(this.IsRole = t === Protocol_1.Aki.Protocol.HBs.Proto_Player),
			(this.bWr = 0),
			!!this.oKr() &&
				!(
					!this.cRr() ||
					!this.rKr() ||
					!this.nKr() ||
					(this.Iwr(),
					this.IsRole &&
						(EventSystem_1.EventSystem.AddWithTarget(
							this.Entity,
							EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
							this.RWr,
						),
						EventSystem_1.EventSystem.AddWithTarget(
							this.Entity,
							EventDefine_1.EEventName.CharOnPositionStateChanged,
							this.xWr,
						),
						EventSystem_1.EventSystem.AddWithTarget(
							this.Entity,
							EventDefine_1.EEventName.CustomMoveSwim,
							this.BWr,
						),
						EventSystem_1.EventSystem.AddWithTarget(
							this.Entity,
							EventDefine_1.EEventName.RoleOnStateInherit,
							this.h2r,
						),
						EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.WorldDone,
							this.LWr,
						),
						EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.TeleportComplete,
							this.LWr,
						),
						EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.OnUpdateSceneTeam,
							this.LWr,
						),
						this.Lie?.AddTagChangedListener(-290630940, this.wWr)),
					this.Hte.Actor.Tags.Add(
						CharacterNameDefines_1.CharacterNameDefines.ENABLE_MOVE_TRIGGER_TAG,
					),
					0)
				)
		);
	}
	Iwr() {
		(this.Iso = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.Iso.WorldContextObject = this.Hte.Actor),
			(this.Iso.Radius = 1),
			(this.Iso.bIgnoreSelf = !0),
			(this.Iso.bIsSingle = !1),
			this.Iso.SetDrawDebugTrace(this.IsDebug ? 1 : 0),
			this.Iso.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
			TraceElementCommon_1.TraceElementCommon.SetTraceColor(
				this.Iso,
				CharacterSwimUtils.DebugColor3,
			),
			TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
				this.Iso,
				CharacterSwimUtils.DebugColor4,
			);
	}
	sKr() {
		this.Iso && (this.Iso.Dispose(), (this.Iso = void 0));
	}
	TLn() {
		if (CharacterSwimComponent_1.UseSwimTrigger)
			return 0 < this.InSwimTriggerCount;
		var t = (0, puerts_1.$ref)(0),
			e = (0, puerts_1.$ref)(0);
		let r = UE.NavigationSystemV1.NavigationGetWaterDeep(
			this.Hte.Actor,
			this.Hte.ActorLocation,
			waterAreaDetectExtent,
			t,
			e,
			this.Hte.Actor,
			void 0,
		);
		return (
			r ||
				this.W5r?.PositionState !==
					CharacterUnifiedStateTypes_1.ECharPositionState.Air ||
				(this.Hte.ActorVelocityProxy.Multiply(this.mie, this.cz),
				(this.cz.Z -= this.Hte.ScaledHalfHeight),
				this.cz.AdditionEqual(this.Hte.ActorLocationProxy),
				(r = UE.NavigationSystemV1.NavigationGetWaterDeep(
					this.Hte.Actor,
					this.cz.ToUeVector(),
					waterAreaDetectExtent,
					t,
					e,
					this.Hte.Actor,
					void 0,
				))),
			r
		);
	}
	OnTick(t) {
		this.aKr(),
			!this.Hte.IsAutonomousProxy ||
				this.Lie.HasTag(464607714) ||
				this.Lie.HasTag(-1523054094) ||
				(this.IsRole
					? (6 === this.Gce.CharacterMovement.MovementMode &&
							this.Gce.CharacterMovement.CustomMovementMode ===
								CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM) ||
						this.TLn() ||
						this.DWr
						? ((this.mie = t * MathUtils_1.MathUtils.MillisecondToSecond),
							this.GWr.DeepCopy(this.Hte.ActorLocation),
							this.oRe && (this.GWr.Z += this.oRe.IkMeshOffset),
							this.NWr.DeepCopy(this.Hte.ActorUpProxy),
							Vector_1.Vector.DistSquared(this.kWr, this.GWr) > 1e6 &&
								(this.IsDebug &&
									Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Movement",
										58,
										"[游泳组件]与上一帧位置差巨大,重新设置这一帧位置",
										["LastTickLocation", this.kWr],
										["PlayerLocation", this.GWr],
									),
								this.kWr.DeepCopy(this.Hte.ActorLocation)),
							(t = this.hKr(this.lKr())),
							this._Kr(),
							t ||
								(this.uKr(this.mie),
								(this.FWr = this.cKr()),
								this.mKr(),
								Vector_1.Vector.VectorCopy(this.Hte.ActorLocation, this.kWr),
								(this.DWr = !1)))
						: this.Gce.FallingIntoWater &&
							Time_1.Time.Now > this.eKr &&
							((this.Gce.FallingIntoWater = !1), this.Lie.RemoveTag(-104158548))
					: this.TLn()
						? this.Hte?.ActorLocationProxy.Equals(this.Hte.LastActorLocation) ||
							TickScoreController_1.TickScoreController.SwimTickScore.AddScore(
								this,
							)
						: 6 === this.Gce.CharacterMovement.MovementMode &&
							this.Gce.CharacterMovement.CustomMovementMode ===
								CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM &&
							this.Gce.CharacterMovement.SetMovementMode(3, 0));
	}
	ScoreUpdate() {
		this.Active &&
			this.Hte &&
			(Vector_1.Vector.VectorCopy(this.Hte.ActorLocation, this.GWr),
			this.dKr(),
			Vector_1.Vector.VectorCopy(this.Hte.ActorLocation, this.kWr));
	}
	OnEnd() {
		return (
			this.CKr(),
			this.sKr(),
			this.IsRole &&
				(EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
					this.RWr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnPositionStateChanged,
					this.xWr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CustomMoveSwim,
					this.BWr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.RoleOnStateInherit,
					this.h2r,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.WorldDone,
					this.LWr,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.TeleportComplete,
					this.LWr,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnUpdateSceneTeam,
					this.LWr,
				)),
			!0
		);
	}
	iKr() {
		(this.$Wr = Vector_1.Vector.Create(0, 0, 0)),
			(this.YWr = Vector_1.Vector.Create(0, 0, 0)),
			(this.cz = Vector_1.Vector.Create(0, 0, 0)),
			(this.fz = Vector_1.Vector.Create(0, 0, 0)),
			(this.pz = Vector_1.Vector.Create(0, 0, 0)),
			(this.zWr = Vector_1.Vector.Create(0, 0, 0)),
			(this.kWr = Vector_1.Vector.Create(0, 0, 0)),
			(this.GWr = Vector_1.Vector.Create(0, 0, 0)),
			(this.NWr = Vector_1.Vector.Create(0, 0, 0)),
			(this.VWr = Vector_1.Vector.Create(0, 0, -99999)),
			(this.HWr = Vector_1.Vector.Create(0, 0, -99999)),
			(this.jWr = Vector_1.Vector.Create(0, 0, 0));
	}
	CKr() {
		(this.cz = void 0),
			(this.fz = void 0),
			(this.pz = void 0),
			(this.$Wr = void 0),
			(this.YWr = void 0),
			(this.zWr = void 0),
			(this.kWr = void 0),
			(this.GWr = void 0),
			(this.NWr = void 0),
			(this.VWr = void 0),
			(this.HWr = void 0),
			(this.jWr = void 0);
	}
	oKr() {
		this.Hte = this.Entity.GetComponent(3);
		var t = this.Hte.ActorLocationProxy;
		Vector_1.Vector.VectorCopy(t, this.GWr),
			(t = this.Entity.GetComponent(185));
		return (
			!!t?.Valid &&
			((this.Lie = t),
			(this.W5r = this.Entity.GetComponent(158)),
			(this.oRe = this.Entity.GetComponent(160)),
			(this.cBe = this.Entity.GetComponent(33)),
			(this.XWr = this.Entity.GetComponent(31)),
			(t = this.Entity.GetComponent(161)),
			!!t?.Valid &&
				((this.Gce = t),
				(this.OWr = this.Hte.HalfHeight),
				Vector_1.Vector.VectorCopy(this.Hte.ActorLocationProxy, this.kWr),
				!0))
		);
	}
	cRr() {
		return (
			!this.IsRole ||
			((this.JWr =
				ConfigManager_1.ConfigManager.SwimConfig.GetSwimConfigByRoleBodyId(
					this.Hte.CreatureData.GetRoleConfig().RoleBody,
				)),
			!!this.JWr &&
				((this.SprintSwimOffset = 0),
				(this.SprintSwimOffsetLerpSpeed = this.JWr.SprintZOffsetSpeed),
				!0))
		);
	}
	rKr() {
		return !(
			this.IsRole &&
			((this.SwimAcceleratorCurve =
				ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					PreloadConstants_1.SWIM_ACCELERATOR_CURVE_PATH,
					UE.CurveFloat,
				)),
			(this.SwimRotationCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
				PreloadConstants_1.SWIM_ROTATOR_CURVE_PATH,
				UE.CurveFloat,
			)),
			!this.SwimAcceleratorCurve || !this.SwimRotationCurve) &&
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Movement",
					58,
					"游泳配置曲线加载失败，曲线为/Game/Aki/Character/Role/Common/Data/Curves/CT_SwimAcceleratorStrength.CT_SwimAcceleratorStrength或者/Game/Aki/Character/Role/Common/Data/Curves/CT_SwimRotateSpeed.CT_SwimRotateSpeed",
				),
			1)
		);
	}
	nKr() {
		return (
			(this.QWr = DataTableUtil_1.DataTableUtil.GetDataTableRow(
				this.Hte.Actor.DtBaseMovementSetting,
				CharacterNameDefines_1.CharacterNameDefines.NORMAL.toString(),
			)),
			!!this.QWr
		);
	}
	cKr() {
		var t;
		return this.Gce.HasSwimmingBlock
			? ((t = (0, puerts_1.$ref)(void 0)),
				this.Gce.CharacterMovement.K2_FindFloor(this.GWr.ToUeVector(), t),
				(t = (0, puerts_1.$unref)(t)),
				this.Gce?.CharacterMovement?.IsWalkable(t.HitResult) ? 1 : 2)
			: 0;
	}
	_Kr() {
		var t, e, r;
		this.Lie.HasTag(855966206) &&
			((t = this.cz),
			this.NWr.Multiply(2 * this.OWr, t),
			(e = this.$Wr),
			this.GWr.Addition(t, e),
			this.NWr.Multiply(this.OWr, t),
			(r = this.YWr),
			this.GWr.Subtraction(t, r),
			(this.Depth = this.gKr(e, r)),
			(this.KWr = this.Iso.HitResult.bBlockingHit),
			this.fKr(this.jWr));
	}
	pKr(t) {
		let e = !1,
			r = !1;
		this.HWr.Reset(),
			this.jWr.Reset(),
			this.VWr.Reset(),
			(this.HWr.Z = -99999),
			(this.VWr.Z = -99999);
		var i = t.GetHitCount();
		for (let s = 0; s < i; ++s) {
			var o = t.Actors.Get(s);
			o?.IsValid() &&
				(o.ActorHasTag(CharacterSwimComponent_1.vKr)
					? ((r = !0),
						TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
							t,
							s,
							this.cz,
						),
						this.cz.Z > this.VWr.Z && this.VWr.DeepCopy(this.cz))
					: ((e = !0),
						TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
							t,
							s,
							this.cz,
						),
						this.cz.Z > this.HWr.Z &&
							(TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
								t,
								s,
								this.jWr,
							),
							this.HWr.DeepCopy(this.cz),
							(this.WWr = t.TimeArray.Get(s)))));
		}
		return !r && e && this.VWr.DeepCopy(this.HWr), e;
	}
	lKr() {
		return this.Gce.FallingIntoWater || this.Lie.HasTag(40422668)
			? 1
			: this.Lie.HasTag(504239013)
				? 2
				: this.Lie.HasTag(-1898186757)
					? 3
					: 0;
	}
	MKr(t, e, r = this.Hte.ScaledRadius) {
		var i = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
		(i.WorldContextObject = this.Hte.Actor),
			(i.Radius = r),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, t),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, e),
			i.ActorsToIgnore.Empty();
		for (const t of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
			i.ActorsToIgnore.Add(t);
		return TraceElementCommon_1.TraceElementCommon.ShapeTrace(
			this.Hte.Actor.CapsuleComponent,
			i,
			PROFILE_FLOOR,
			PROFILE_FLOOR,
		);
	}
	SKr(t, e) {
		TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Iso, t),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Iso, e);
		let r = TraceElementCommon_1.TraceElementCommon.SphereTrace(
			this.Iso,
			PROFILE_DETECT_WATER_DEPTH,
		);
		return (
			(r = r && this.pKr(this.Iso.HitResult)) && this.Iso.HitResult.bBlockingHit
		);
	}
	dKr() {
		var t = this.$Wr,
			e = this.YWr;
		if (this.Lie.HasTag(855966206) && this.Lie.HasTag(-1714966381))
			t.Set(this.GWr.X, this.GWr.Y, this.GWr.Z + 0.25 * this.OWr * 2),
				e.Set(this.GWr.X, this.GWr.Y, this.GWr.Z + 500),
				this.SKr(t, e)
					? (this.Depth = 2)
					: (this.Gce.CharacterMovement.SetMovementMode(3, 0),
						(this.Depth = 0));
		else if (
			(t.Set(this.kWr.X, this.kWr.Y, this.kWr.Z + 2 * this.OWr),
			e.Set(this.GWr.X, this.GWr.Y, this.GWr.Z - this.OWr),
			(this.Depth = this.gKr(t, e)),
			this.Depth > 0.75)
		)
			return this.tKr(), !0;
		return !1;
	}
	EKr(t, e) {
		var r = this.pz;
		(t =
			(r.FromUeVector(t),
			(r.Z += e),
			this.zWr.DeepCopy(r),
			this.Hte.SetActorLocation(
				this.zWr.ToUeVector(),
				"游泳.游泳入水播放位置设置",
				!0,
			),
			this.Hte.Actor.CharacterMovement.SetMovementMode(3),
			this.cz)).Reset(),
			this.Gce.SetForceSpeed(t),
			this.IsDebug &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Movement",
						58,
						"[游泳组件]游泳触发入水机制,游泳入水设置位置",
						["坐标：", this.zWr],
						["强制速度：", t],
					),
				this.yKr(CharacterSwimUtils.DebugColor1));
	}
	DetectEnterWaterFromAir() {
		if (!(0 < this.Hte.ActorVelocityProxy.Z || this.Gce.FallingIntoWater)) {
			var t,
				e = this.cz;
			if (
				!(t =
					((t = this.fz).DeepCopy(this.Hte.ActorVelocityProxy),
					t.Multiply(this.mie, t),
					t.Addition(this.GWr, e),
					this.MKr(this.GWr, e)))
			) {
				let o = this.SKr(this.GWr, e);
				var r = this.OWr;
				if (!o) {
					var i = this.fz;
					if ((i.FromUeVector(e), (i.Z -= r), (t = this.MKr(e, i)))) return;
					o = this.SKr(e, i);
				}
				o &&
					(this.fKr(this.jWr),
					!this.IKr(this.jWr) ||
						((t = this.$Wr).DeepCopy(this.HWr),
						(e = this.YWr).FromUeVector(t),
						(e.Z -= 0.75 * this.OWr * 2),
						this.MKr(t, e)) ||
						(this.cBe.StopAllSkills(
							"CharacterSwimComponent.DetectEnterWaterFromAir",
						),
						this.EKr(t, r),
						this.Lie.AddTag(-104158548),
						(this.Gce.FallingIntoWater = !0),
						(this.eKr = Time_1.Time.Now + 500)));
			}
		}
	}
	fKr(t) {
		t.Z = Math.abs(t.Z);
	}
	TKr(t, e) {
		return !(
			t.Z < e.Z ||
			0 === this.gKr(t, e) ||
			(this.fKr(this.jWr), !this.IKr(this.jWr))
		);
	}
	LKr() {
		this.Gce.FallingIntoWater || this.DetectEnterWaterFromAir();
		var t = this.$Wr,
			e = this.YWr,
			r =
				((r = this.cz).FromUeVector(this.NWr),
				r.Multiply(this.OWr, r),
				this.kWr.Z + this.OWr);
		return (
			t.FromUeVector(this.GWr),
			(t.Z = r),
			e.Set(this.GWr.X, this.GWr.Y, this.GWr.Z),
			!!this.TKr(t, e) &&
				((e.Z -= 0.75 * this.OWr * 2), !this.MKr(t, e, 1)) &&
				(this.tKr(),
				this.GWr.Z - this.HWr.Z < -this.OWr &&
					this.Hte.SetActorLocation(
						this.HWr.ToUeVector(),
						"游泳.入水位置修正",
						!0,
					),
				this.IsDebug &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Movement", 58, "[游泳组件]触发空中入水"),
					this.yKr(CharacterSwimUtils.DebugColor2)),
				!0)
		);
	}
	DKr() {
		var t = this.$Wr,
			e = this.YWr,
			r =
				((r = this.cz).FromUeVector(this.NWr),
				r.Multiply(this.OWr, r),
				this.kWr.Z + this.OWr);
		return (
			t.FromUeVector(this.GWr),
			(t.Z = r),
			e.Set(this.GWr.X, this.GWr.Y, this.GWr.Z + 0.25 * this.OWr * 2),
			!!this.TKr(t, e) &&
				(this.tKr(),
				this.IsDebug &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Movement", 58, "[游泳组件]触发地面入水"),
					this.yKr(CharacterSwimUtils.DebugColor2)),
				!0)
		);
	}
	AKr() {
		var t;
		return (
			3 !== this.XWr.GetTsClimbState().攀爬状态 &&
			((t = this.cz).FromUeVector(this.NWr),
			t.Multiply(this.OWr, t),
			t.Addition(this.kWr, this.$Wr),
			t.Multiply(0.8, t),
			t.Addition(this.GWr, this.YWr),
			!!this.TKr(this.$Wr, this.YWr)) &&
			!this.MKr(this.$Wr, this.YWr, 1) &&
			(this.tKr(),
			this.IsDebug &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Movement", 58, "[游泳组件]触发攀爬入水"),
				this.yKr(CharacterSwimUtils.DebugColor2)),
			!0)
		);
	}
	UKr() {
		var t = this.$Wr,
			e = (this.NWr.Multiply(500, t), t.Addition(this.GWr, t), this.YWr);
		return (
			!(
				(t =
					(this.NWr.Multiply(this.OWr, e),
					e.Addition(this.GWr, e),
					this.TKr(t, e))) &&
				(e = this.MKr(e, this.HWr)) &&
				ModelManager_1.ModelManager.TraceElementModel.GetActorTrace().HitResult.ImpactPointZ_Array.Get(
					0,
				) < this.Iso.HitResult.ImpactPointZ_Array.Get(0)
			) && t
		);
	}
	PKr() {
		var t = this.UKr();
		return (
			t &&
				(this.tKr(), this.IsDebug) &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Movement", 58, "[游泳组件]触发保底的向上探测入水"),
				this.yKr(CharacterSwimUtils.DebugColor2)),
			t
		);
	}
	hKr(t) {
		this.Gce.FallingIntoWater &&
			Time_1.Time.Now > this.eKr &&
			((this.Gce.FallingIntoWater = !1), this.Lie.RemoveTag(-104158548));
		let e = !1;
		switch (t) {
			case 0:
				e = !1;
				break;
			case 1:
				e = this.LKr();
				break;
			case 2:
				e = this.AKr();
				break;
			case 3:
				e = this.DKr();
		}
		return 0 !== t ? e || this.PKr() : e;
	}
	uKr(t) {
		var e;
		6 === this.Gce.CharacterMovement.MovementMode &&
			this.Gce.CharacterMovement.CustomMovementMode ===
				CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM &&
			((e = this.Lie.HasTag(388142570)),
			(this.SprintSwimOffset = e
				? this.JWr.SprintZOffsetRate * this.Hte.Radius
				: 0),
			(this.Gce.FallingIntoWater = !1));
	}
	IKr(t) {
		return (
			MathUtils_1.MathUtils.DotProduct(t, Vector_1.Vector.ZAxisVector) > 0.173
		);
	}
	PWr() {
		(this.BuffIndex = BigInt(0)), (this.SprintSwimOffset = 0);
	}
	mKr() {
		this.Lie.HasTag(855966206) &&
			(this.NWr.FromUeVector(this.Hte.ActorUpProxy),
			this.KWr && !this.IKr(this.jWr)
				? (this.Gce.CharacterMovement.SetMovementMode(3, 0),
					this.IsDebug &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Movement",
								58,
								"[游泳组件]触发水面角度不够游泳支持触发出水",
								["水面法线:", this.jWr],
							),
						this.yKr(CharacterSwimUtils.DebugColor3)))
				: this.KWr || this.Gce.FallingIntoWater
					? this.Depth <= 0.7 &&
						(1 === this.FWr
							? (this.Gce.CharacterMovement.SetMovementMode(1, 0),
								this.IsDebug &&
									(Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Movement",
											58,
											"[游泳组件]触发碰撞并且游泳深度不够触发出水",
											["当前深度:", this.Depth],
											["出水深度:", 0.7],
										),
									this.yKr(CharacterSwimUtils.DebugColor3)))
							: 2 === this.FWr &&
								this.Hte?.SetActorLocation(
									this.Hte.LastActorLocation.ToUeVector(),
									"SwimOff",
									!1,
								))
					: this.UKr()
						? (this.Depth = 2)
						: (this.Gce.CharacterMovement.SetMovementMode(1, 0),
							this.PWr(),
							this.IsDebug &&
								(Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Movement",
										58,
										"[游泳组件]游泳向上探测出水未有水面触发出水",
									),
								this.yKr(CharacterSwimUtils.DebugColor3))));
	}
	CheckCanEnterClimbFromSwim() {
		return !this.Lie.HasTag(855966206) || this.Depth <= 0.8;
	}
	gKr(t, e) {
		return this.SKr(t, e)
			? (this.IsDebug &&
					this.xKr(this.HWr.ToUeVector(), CharacterSwimUtils.DebugColor2),
				(Vector_1.Vector.Dist(t, e) * (1 - this.WWr)) / (2 * this.OWr))
			: 0;
	}
	UWr() {
		var t;
		this.W5r?.PositionState ===
			CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
		this.Lie.HasTag(-290630940)
			? ((t = this.Gce.HasMoveInput),
				(t = ConfigManager_1.ConfigManager.SwimConfig.GetSwimBuffId(
					t,
					this.AWr,
				)),
				(this.BuffIndex = t))
			: (this.BuffIndex = BigInt(0));
	}
	aKr() {
		this.HWr && (this.HWr.Reset(), (this.HWr.Z = -99999)),
			this.jWr && this.jWr.Reset(),
			this.VWr && (this.VWr.Reset(), (this.VWr.Z = -99999));
	}
	GetWaterLocation() {
		return this.VWr.ToUeVector();
	}
	GetSwimLocation() {
		return this.HWr.ToUeVector();
	}
	GetWaterVolume() {
		return this.KWr;
	}
	SetEnterWaterState(t) {
		this.bWr = t ? 1 : 0;
	}
	GetAboveFootWaterSurfaceInfo() {
		var t, e, r, i;
		if (
			this.Hte?.SkeletalMesh &&
			this.TLn() &&
			!(this.Depth <= 0) &&
			this.jWr &&
			2 !== this.Depth
		)
			return (
				(t = this.Depth * this.OWr * 2),
				this.fKr(this.jWr),
				(e = Vector_1.Vector.Create(this.jWr)),
				(r = Vector_1.Vector.Create()).FromUeVector(
					this.Hte.SkeletalMesh.K2_GetComponentLocation(),
				),
				(i = Vector_1.Vector.Create(this.Hte.ActorVelocityProxy)),
				{
					Depth: this.Depth,
					WaterHeight: t,
					SurfaceNormal: e,
					Velocity: i,
					Location: r,
				}
			);
	}
	yKr(t) {
		UE.KismetSystemLibrary.DrawDebugCapsule(
			this.Hte.Actor,
			this.Hte.Actor.K2_GetActorLocation(),
			this.Hte.Actor.CapsuleComponent.CapsuleHalfHeight,
			this.Hte.Actor.CapsuleComponent.CapsuleRadius,
			this.Hte.Actor.K2_GetActorRotation(),
			t,
			5,
			2,
		);
	}
	xKr(t, e) {
		UE.KismetSystemLibrary.DrawDebugSphere(
			this.Hte.Actor,
			t,
			this.Hte.Actor.CapsuleComponent.CapsuleHalfHeight,
			12,
			e,
			0,
			1,
		);
	}
	SetDebug(t) {
		(this.IsDebug = t), this.Iso.SetDrawDebugTrace(this.IsDebug ? 1 : 0);
	}
	LogSwimTriggerCount() {
		this.IsDebug &&
			Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Movement",
				58,
				"[游泳组件] 当前进入游泳盒子数量:",
				["actor", this.Hte?.Actor?.GetName()],
				["count", this.InSwimTriggerCount],
			);
	}
});
(CharacterSwimComponent.vKr = new UE.FName("Water_No_Swim")),
	(CharacterSwimComponent.UseSwimTrigger = !1),
	(CharacterSwimComponent = CharacterSwimComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(66)],
			CharacterSwimComponent,
		)),
	(exports.CharacterSwimComponent = CharacterSwimComponent);
