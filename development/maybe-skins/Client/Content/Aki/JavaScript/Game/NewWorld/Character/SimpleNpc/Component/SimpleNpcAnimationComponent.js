"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, i, r) {
		var o,
			s = arguments.length,
			n =
				s < 3
					? e
					: null === r
						? (r = Object.getOwnPropertyDescriptor(e, i))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			n = Reflect.decorate(t, e, i, r);
		else
			for (var a = t.length - 1; 0 <= a; a--)
				(o = t[a]) && (n = (s < 3 ? o(n) : 3 < s ? o(e, i, n) : o(e, i)) || n);
		return 3 < s && n && Object.defineProperty(e, i, n), n;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SimpleNpcAnimationComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants"),
	BaseAnimationComponent_1 = require("../../Common/Component/BaseAnimationComponent"),
	TURN_SPEED = 0.36,
	TURN_RATIO = 0.04;
let SimpleNpcAnimationComponent = class extends BaseAnimationComponent_1.BaseAnimationComponent {
	constructor() {
		super(...arguments),
			(this.ActorComp = void 0),
			(this.SlopeStepPeriodicCurve = void 0),
			(this.SlopeStepSizeCurve = void 0),
			(this.L3r = Vector_1.Vector.Create()),
			(this.D3r = void 0),
			(this.az = Quat_1.Quat.Create()),
			(this.A3r = Vector_1.Vector.Create()),
			(this.U3r = Vector_1.Vector.Create()),
			(this.G3r = 0),
			(this.O3r = -1);
	}
	static get Dependencies() {
		return [175, 0];
	}
	Z3r() {
		0 < this.O3r
			? this.O3r--
			: 0 === this.O3r &&
				(this.ActorComp.EnableActor(this.G3r),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Character", 58, "人物上场隐藏一帧 【隐藏结束】", [
						"Entity:",
						this.Entity.Id,
					]),
				(this.G3r = void 0),
				(this.ActorComp.Actor.Mesh.VisibilityBasedAnimTickOption =
					this.DefaultVisibilityBasedAnimTickOption),
				(this.O3r = -1));
	}
	OnInit() {
		var t;
		return (
			super.OnInit(),
			(this.SlopeStepPeriodicCurve =
				ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					PreloadConstants_1.ANGLE_TO_STEP_FREQUENCY_CURVE_PATH,
					UE.CurveFloat,
				)),
			(this.SlopeStepSizeCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
				PreloadConstants_1.ANGLE_TO_STEP_LENGTH_CURVE_PATH,
				UE.CurveFloat,
			)),
			!(
				!this.SlopeStepPeriodicCurve ||
				!this.SlopeStepSizeCurve ||
				((t = this.Entity.GetComponent(0).GetModelConfig().注释时的抬升角度) &&
					((this.D3r = Quat_1.Quat.Create()),
					Quat_1.Quat.FindBetween(
						Vector_1.Vector.ForwardVectorProxy,
						Vector_1.Vector.Create(
							Math.cos(t * MathUtils_1.MathUtils.DegToRad),
							0,
							Math.sin(t * MathUtils_1.MathUtils.DegToRad),
						),
						this.D3r,
					)),
				0)
			)
		);
	}
	OnStart() {
		return (
			(this.ActorComp = this.Entity.CheckGetComponent(175)),
			this.ActorComp.Actor?.Mesh
				? ((this.Actor = this.ActorComp.Actor),
					(this.Mesh = this.Actor.Mesh),
					this.GetAnimInstanceFromMesh(),
					!!this.MainAnimInstanceInternal &&
						(this.InitBaseInfo(), this.CheckNpcAnimationAssets(), !0))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("Character", 6, "模型仍未初始化", [
							"Entity",
							this.Entity.Id,
						]),
					!1)
		);
	}
	InitBaseInfo() {
		this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy),
			this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy),
			(this.IsPlayer = !1),
			(this.DefaultVisibilityBasedAnimTickOption = 3),
			this.inn();
	}
	OnActivate() {
		this.StartAnimInstance();
	}
	OnTick(t) {
		this.Z3r(), this.i4r(t);
	}
	OnDisable() {
		0 <= this.O3r &&
			(this.ActorComp.EnableActor(this.G3r), Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"Character",
				58,
				"人物上场隐藏一帧 【组件Disable 隐藏结束】",
				["Entity:", this.Entity.Id],
			),
			(this.O3r = -1),
			this.Entity.GetComponent(168)?.AnyIdleLoopMontagePlaying ||
				(this.MainAnimInstanceInternal?.IsValid() &&
					(this.StopMontage(),
					UE.KuroAnimLibrary.EndAnimNotifyStates(
						this.MainAnimInstanceInternal,
					)));
	}
	i4r(t) {
		this.EnableSightDirectInternal &&
			(this.SightTargetItemId || this.SightTargetPoint
				? this.h4r(this.L3r)
				: this.L3r.DeepCopy(this.ActorComp.ActorForwardProxy),
			this.s4r(t));
	}
	s4r(t) {
		this.A3r.FromUeVector(this.L3r),
			this.az.FromUeQuat(this.Mesh.K2_GetComponentQuaternion()),
			this.az.Inverse(this.az),
			this.U3r.FromUeVector(this.L3r),
			this.az.RotateVector(this.L3r, this.L3r),
			this.ClampSightDirect(this.L3r, this.L3r),
			(this.SightDirectIsEqual && this.L3r.Equals(this.SightDirect)) ||
				(BaseAnimationComponent_1.BaseAnimationComponent.LerpDirect2dByMaxAngle(
					this.SightDirect2,
					this.L3r,
					0.36 * t,
					this.SightDirect2,
				),
				BaseAnimationComponent_1.BaseAnimationComponent.LerpVector2dByAlpha(
					this.SightDirect,
					this.SightDirect2,
					1 - Math.pow(0.04, t * MathUtils_1.MathUtils.MillisecondToSecond),
					this.SightDirect,
				),
				(this.SightDirectIsEqual = this.SightDirect.Equals(this.SightDirect2)),
				this.SightDirect.ContainsNaN() &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Character",
							6,
							"UpdateHeadRotation Contains Nan.",
							["BeforeRotate", this.A3r],
							["BeforeClamp", this.U3r],
							["TargetDirect", this.L3r],
							["SightDirect", this.SightDirect],
							["SightDirect2", this.SightDirect2],
							["quatInverse", this.az],
							["IsPlayer", this.IsPlayer],
							["CanResponseInput", !1],
							["Delta", t],
						),
					this.SightDirect.Set(0, 1, 0),
					this.SightDirect2.Set(0, 1, 0)));
	}
	h4r(t) {
		var e = this.GetSightTargetItem();
		!e ||
		((this.SightTargetPoint ?? e.ActorLocationProxy).Subtraction(
			this.ActorComp.ActorLocationProxy,
			this.A3r,
		),
		(0, RegisterComponent_1.isComponentInstance)(e, 2)
			? (this.A3r.Z += e.ScaledHalfHeight - this.ActorComp.ScaledHalfHeight)
			: (this.A3r.Z -= this.ActorComp.ScaledHalfHeight),
		this.A3r.IsNearlyZero())
			? t.DeepCopy(this.ActorComp.ActorForwardProxy)
			: (t.DeepCopy(this.A3r), this.u4r(t));
	}
	u4r(t) {
		this.D3r &&
			(this.ActorComp.ActorQuatProxy.Inverse(this.az),
			this.az.RotateVector(t, t),
			this.D3r.RotateVector(t, t),
			this.ActorComp.ActorQuatProxy.RotateVector(t, t));
	}
	inn(t = !0) {
		var e = ModelManager_1.ModelManager.PlatformModel.IsMobile(),
			i = new UE.AnimUpdateRateParameters(),
			r = this.Mesh.LODInfo.Num();
		if (t)
			(i.bShouldUseDistanceMap = !0),
				i.BaseVisibleDistanceThresholds.Empty(),
				i.BaseVisibleDistanceThresholds.Add(e ? 50 : 800),
				i.BaseVisibleDistanceThresholds.Add(e ? 200 : 1500),
				i.BaseVisibleDistanceThresholds.Add(e ? 500 : 4e3),
				i.BaseVisibleDistanceThresholds.Add(e ? 1500 : 5e3),
				i.BaseVisibleDistanceThresholds.Add(e ? 2500 : 8e3);
		else {
			(i.bShouldUseLodMap = !0), i.LODToFrameSkipMap.Empty();
			for (let t = 0; t < r; t++) i.LODToFrameSkipMap.Add(t, t < 2 ? 0 : t - 1);
		}
		(i.BaseNonRenderedUpdateRate = 8), (i.MaxEvalRateForInterpolation = 8);
		var o = (0, puerts_1.$ref)(i),
			s = this.Actor.K2_GetComponentsByClass(
				UE.SkeletalMeshComponent.StaticClass(),
			);
		for (let t = 0; t < s.Num(); t++) {
			var n = s.Get(t);
			(n.bEnableUpdateRateOptimizations = !0),
				n.SetAnimUpdateRateParameters(o),
				(n.VisibilityBasedAnimTickOption =
					this.DefaultVisibilityBasedAnimTickOption);
		}
		(0, puerts_1.$unref)(o);
	}
};
(SimpleNpcAnimationComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(176)],
	SimpleNpcAnimationComponent,
)),
	(exports.SimpleNpcAnimationComponent = SimpleNpcAnimationComponent);
