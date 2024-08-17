"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, n, i) {
		var a,
			s = arguments.length,
			r =
				s < 3
					? e
					: null === i
						? (i = Object.getOwnPropertyDescriptor(e, n))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			r = Reflect.decorate(t, e, n, i);
		else
			for (var o = t.length - 1; 0 <= o; o--)
				(a = t[o]) && (r = (s < 3 ? a(r) : 3 < s ? a(e, n, r) : a(e, n)) || r);
		return 3 < s && r && Object.defineProperty(e, n, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseAnimationComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../../GlobalData"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CharacterAnimOptimizationSetting_1 = require("../../../Setting/CharacterAnimOptimizationSetting"),
	CharacterNameDefines_1 = require("../CharacterNameDefines"),
	SPLIT_LINE = -90,
	FORCE_DISABLE_ANIM_OPTIMIZATION_TIME = 100,
	animAssetsSetRef = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset)),
	RUN_F = "Run_F",
	RUN_POSE_F = "Run_Pose_F",
	WALK_F = "Walk_F",
	WALK_POSE_F = "Walk_Pose_F",
	xAngleLimits = [
		-31 * MathUtils_1.MathUtils.DegToRad,
		31 * MathUtils_1.MathUtils.DegToRad,
	],
	yAngleLimits = [
		-18 * MathUtils_1.MathUtils.DegToRad,
		31 * MathUtils_1.MathUtils.DegToRad,
	];
let BaseAnimationComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Actor = void 0),
			(this.Mesh = void 0),
			(this.ActorComp = void 0),
			(this.SightTargetItemId = 0),
			(this.SightTargetPoint = void 0),
			(this.EnableSightDirectInternal = !1),
			(this.z2r = [...xAngleLimits]),
			(this.Z2r = [...yAngleLimits]),
			(this.SightDirect = Vector_1.Vector.Create()),
			(this.LookAtBlendSpaceVector2D = Vector2D_1.Vector2D.Create()),
			(this.EnableBlendSpaceLookAtInner = !1),
			(this.SightDirect2 = Vector_1.Vector.Create()),
			(this.SightDirectIsEqual = !0),
			(this.MainAnimInstanceInternal = void 0),
			(this.SpecialAnimInstanceInternal = void 0),
			(this.IsPlayer = !1),
			(this.ForceDisableAnimOptimizationSet = new Set()),
			(this.DefaultVisibilityBasedAnimTickOption = 3);
	}
	static get Dependencies() {
		return [2, 0];
	}
	get EnableSightDirect() {
		return this.EnableSightDirectInternal;
	}
	set EnableSightDirect(t) {
		this.EnableSightDirectInternal === t ||
			(this.EnableSightDirectInternal = t) ||
			(this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy),
			this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy),
			(this.SightDirectIsEqual = !0));
	}
	get EnableBlendSpaceLookAt() {
		return this.EnableBlendSpaceLookAtInner;
	}
	get MainAnimInstance() {
		return this.MainAnimInstanceInternal;
	}
	get SpecialAnimInstance() {
		return this.SpecialAnimInstanceInternal;
	}
	OnInit() {
		return (this.z2r = [...xAngleLimits]), (this.Z2r = [...yAngleLimits]), !0;
	}
	SetSightLimit(t, e) {
		(this.z2r = [
			t[0] * MathUtils_1.MathUtils.DegToRad,
			t[1] * MathUtils_1.MathUtils.DegToRad,
		]),
			(this.Z2r = [
				e[0] * MathUtils_1.MathUtils.DegToRad,
				e[1] * MathUtils_1.MathUtils.DegToRad,
			]);
	}
	ResetSightLimit() {
		(this.z2r = [...xAngleLimits]), (this.Z2r = [...yAngleLimits]);
	}
	SetSightTargetItem(t) {
		(this.SightTargetPoint = void 0),
			(this.SightTargetItemId = t ? t.Entity.Id : 0);
	}
	GetSightTargetItem() {
		var t;
		if (this.SightTargetItemId)
			return (
				(t = EntitySystem_1.EntitySystem.GetComponent(
					this.SightTargetItemId,
					1,
				)) || (this.SightTargetItemId = 0),
				t
			);
	}
	SetSightTargetPoint(t) {
		(this.SightTargetItemId = 0), (this.SightTargetPoint = t);
	}
	GetSightTargetPoint() {
		return this.SightTargetPoint;
	}
	GetSightDirect() {
		return this.SightDirect.ToUeVector();
	}
	GetTsSightDirect() {
		return this.SightDirect;
	}
	GetTsLookAt() {
		return this.LookAtBlendSpaceVector2D;
	}
	GetMontageResPathByName(t) {
		return !t || t.includes("/")
			? t
			: this.ActorComp.ModelResPath && 0 < this.ActorComp.ModelResPath.length
				? this.ActorComp.ModelResPath + `/${t}.` + t
				: void 0;
	}
	CheckNpcAnimationAssets() {
		if (
			GlobalData_1.GlobalData.IsPlayInEditor &&
			this.ActorComp?.Valid &&
			1 !== this.Mesh.AnimationMode &&
			this.ActorComp.CreatureData.GetEntityType() ===
				Protocol_1.Aki.Protocol.wks.Proto_Npc
		) {
			var t = this.MainAnimInstance;
			if (t?.IsValid()) {
				(0, puerts_1.$unref)(animAssetsSetRef).Empty(),
					UE.KuroStaticLibrary.GetAnimAssetsByAnimInstance(t, animAssetsSetRef);
				var e = (0, puerts_1.$unref)(animAssetsSetRef);
				if (0 !== e.Num())
					for (let t = 0; t < e.Num(); ++t) {
						var n,
							i = e.Get(t);
						i.IsA(UE.AnimSequence.StaticClass()) &&
							((n = i.GetName()).includes(RUN_F) ||
								n.includes(RUN_POSE_F) ||
								n.includes(WALK_F) ||
								n.includes(WALK_POSE_F)) &&
							i.bEnableRootMotion &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Pawn",
								30,
								"Npc移动相关动画资源错误使用了RootMotion",
								["AssetName", this.ActorComp.Actor.GetName()],
								["AnimName", n],
							);
					}
			}
		}
	}
	GetAnimInstanceFromMesh() {
		this.cBr(),
			(this.MainAnimInstanceInternal =
				this.Mesh.GetLinkedAnimGraphInstanceByTag(
					CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
				)),
			this.MainAnimInstanceInternal ||
				(this.MainAnimInstanceInternal = this.Mesh.GetAnimInstance()),
			(this.SpecialAnimInstanceInternal =
				this.Mesh.GetLinkedAnimGraphInstanceByTag(
					CharacterNameDefines_1.CharacterNameDefines.ABP_SPECIAL,
				));
	}
	StartAnimInstance() {
		this.MainAnimInstanceInternal instanceof UE.KuroAnimInstance &&
			this.MainAnimInstanceInternal.OnComponentStart(),
			this.SpecialAnimInstanceInternal &&
				this.SpecialAnimInstanceInternal instanceof UE.KuroAnimInstance &&
				this.SpecialAnimInstanceInternal.OnComponentStart(),
			this.eFr();
	}
	ClampSightDirect(t, e) {
		var n = t.Z / t.Size(),
			i = MathUtils_1.MathUtils.Clamp(Math.asin(n), this.Z2r[0], this.Z2r[1]),
			a = ((n = Math.sin(i)), (i = Math.cos(i)), t.Y),
			s =
				((t = -t.X),
				Math.abs(a) > MathUtils_1.MathUtils.KindaSmallNumber ||
				Math.abs(t) > MathUtils_1.MathUtils.KindaSmallNumber
					? MathUtils_1.MathUtils.Clamp(
							Math.atan2(t, a),
							this.z2r[0],
							this.z2r[1],
						)
					: 0);
		(a = Math.cos(s) * i), (t = Math.sin(s) * i);
		(e.X = -t), (e.Y = a), (e.Z = n);
	}
	eFr() {
		var t = this.ActorComp.Actor.K2_GetComponentsByClass(
			UE.SkeletalMeshComponent.StaticClass(),
		);
		for (let i = 0; i < t.Num(); ++i) {
			var e,
				n = t.Get(i);
			n instanceof UE.SkeletalMeshComponent &&
				((e = n.GetAnimInstance()) &&
					e instanceof UE.KuroAnimInstance &&
					e !== this.MainAnimInstance &&
					e.OnComponentStart(),
				(e = n.GetLinkedAnimGraphInstanceByTag(
					CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
				))) &&
				e instanceof UE.KuroAnimInstance &&
				e !== this.MainAnimInstance &&
				e.OnComponentStart();
		}
	}
	cBr() {
		this.Actor.Mesh.GetLinkedAnimGraphInstanceByTag(
			FNameUtil_1.FNameUtil.NONE,
		) &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Character",
				58,
				"检测出该Actor有空的动画LinkGraph节点,将会影响同步,GAS等功能,请找对应策划修复",
				["Actor", this.ActorComp.Owner.GetName()],
				["AnimInstance", this.Actor.Mesh.GetAnimInstance()?.GetName()],
			);
	}
	static LerpDirect2dByMaxAngle(t, e, n, i) {
		let a = MathUtils_1.MathUtils.GetAngleByVector2D(t),
			s = (a < -90 && (a += 360), MathUtils_1.MathUtils.GetAngleByVector2D(e));
		s < -90 && (s += 360),
			(t = Math.asin(t.Z) * MathUtils_1.MathUtils.RadToDeg);
		let r = s - a,
			o = (e = Math.asin(e.Z) * MathUtils_1.MathUtils.RadToDeg) - t;
		n < (e = Math.sqrt(r * r + o * o)) && ((r *= n / e), (o *= n / e)),
			(n = a + r),
			(e = (t + o) * MathUtils_1.MathUtils.DegToRad),
			(i.Z = Math.sin(e)),
			(t = Math.cos(e)),
			(i.X = Math.cos(n * MathUtils_1.MathUtils.DegToRad) * t),
			(i.Y = Math.sin(n * MathUtils_1.MathUtils.DegToRad) * t);
	}
	static LerpVector2dByAlpha(t, e, n, i) {
		let a = MathUtils_1.MathUtils.GetAngleByVector2D(t),
			s = (a < -90 && (a += 360), MathUtils_1.MathUtils.GetAngleByVector2D(e));
		s < -90 && (s += 360);
		t = Math.asin(t.Z) * MathUtils_1.MathUtils.RadToDeg;
		var r = s - a;
		(e = (e = Math.asin(e.Z) * MathUtils_1.MathUtils.RadToDeg) - t),
			(e *= n),
			(n = a + (r *= n)),
			(r = (t + e) * MathUtils_1.MathUtils.DegToRad),
			(i.Z = Math.sin(r)),
			(t = Math.cos(r));
		(i.X = Math.cos(n * MathUtils_1.MathUtils.DegToRad) * t),
			(i.Y = Math.sin(n * MathUtils_1.MathUtils.DegToRad) * t);
	}
	IsMontagePlaying() {
		return this.MainAnimInstanceInternal.IsAnyMontagePlaying();
	}
	LoadAsync(t, e) {
		return ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, e);
	}
	Play(t, e) {
		this.MainAnimInstanceInternal.Montage_Play(t),
			e && this.MainAnimInstanceInternal.OnMontageEnded.Add(e);
	}
	PlayOnce(t, e) {
		this.MainAnimInstanceInternal.Montage_Play(t),
			this.MainAnimInstanceInternal.Montage_SetNextSection(
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
				t,
			),
			e && this.MainAnimInstanceInternal.OnMontageEnded.Add(e);
	}
	PlayFromLoop(t, e) {
		this.MainAnimInstanceInternal.Montage_Play(t),
			this.MainAnimInstanceInternal.Montage_JumpToSection(
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				t,
			),
			e && this.MainAnimInstanceInternal.OnMontageEnded.Add(e);
	}
	PlayFromEnd(t, e) {
		this.MainAnimInstanceInternal.Montage_Play(t),
			this.MainAnimInstanceInternal.Montage_JumpToSection(
				CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
				t,
			),
			e && this.MainAnimInstanceInternal.OnMontageEnded.Add(e);
	}
	Stop(t = !1, e) {
		t
			? this.MainAnimInstanceInternal.Montage_JumpToSection(
					CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
					e,
				)
			: this.MainAnimInstanceInternal.Montage_SetNextSection(
					CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
					CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
					e,
				);
	}
	StopMontage(t = 0) {
		this.MainAnimInstanceInternal.Montage_Stop(t);
	}
	ForceStop(t, e) {
		this.MainAnimInstanceInternal.Montage_Stop(t ?? 0, e);
	}
	ForceStopWithBlendOut(t, e) {
		var n = this.MainAnimInstanceInternal.Montage_GetPosition(e);
		(t = 1e3 * t) < (n = e.SequenceLength - n) &&
			this.MainAnimInstanceInternal.Montage_SetPlayRate(e, n / t),
			this.MainAnimInstanceInternal.Montage_SetNextSection(
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
				e,
			);
	}
	AddOnMontageEnded(t) {
		t && this.MainAnimInstanceInternal?.OnMontageEnded.Add(t);
	}
	RemoveOnMontageEnded(t) {
		t && this.MainAnimInstanceInternal?.OnMontageEnded.Remove(t);
	}
	ClearOnMontageEnded() {
		this.MainAnimInstanceInternal?.OnMontageEnded &&
			this.MainAnimInstanceInternal?.OnMontageEnded.Clear();
	}
	GetCurrentSection() {
		return this.MainAnimInstanceInternal.Montage_GetCurrentSection();
	}
	PlayMontageByName(t, e) {
		return (
			!!this.GetMontageResPathByName(t)?.includes("/") &&
			this.LoadAsync(t, e) !== ResourceSystem_1.ResourceSystem.InvalidId
		);
	}
	PlayMontageById(t, e) {
		let n;
		return (
			!!(n = t.IsAbp
				? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(t.MontageId)
				: ModelManager_1.ModelManager.PlotModel.GetMontageConfig(
						t.MontageId,
					)) &&
			this.LoadAsync(n.ActionMontage, e) !==
				ResourceSystem_1.ResourceSystem.InvalidId
		);
	}
	InitBaseInfo() {}
	GetAnimDefaultTickOption() {
		return this.DefaultVisibilityBasedAnimTickOption;
	}
	ChangeAnimDefaultTickOption(t) {
		this.DefaultVisibilityBasedAnimTickOption !== t &&
			((this.DefaultVisibilityBasedAnimTickOption = t),
			this.RefreshAnimOptimization());
	}
	StartForceDisableAnimOptimization(t, e = !0) {
		return this.ForceDisableAnimOptimizationSet.has(t)
			? (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Character", 36, "动画优化强制关闭-重复", [
						"reason",
						t,
					]),
				!1)
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Character", 36, "动画优化强制关闭-开始", [
						"reason",
						t,
					]),
				this.ForceDisableAnimOptimizationSet.add(t),
				this.RefreshAnimOptimization(),
				e &&
					TimerSystem_1.TimerSystem.Delay(() => {
						this.CancelForceDisableAnimOptimization(t);
					}, 100),
				!0);
	}
	CancelForceDisableAnimOptimization(t) {
		this.ForceDisableAnimOptimizationSet.delete(t) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Character", 36, "动画优化强制关闭-结束", ["reason", t]),
			this.RefreshAnimOptimization());
	}
	RefreshAnimOptimization() {
		var t = this.Entity.GetComponent(158)?.IsInFighting ?? !1,
			e = 0 < this.ForceDisableAnimOptimizationSet.size,
			n = e || t,
			i = this.Actor.K2_GetComponentsByClass(
				UE.SkeletalMeshComponent.StaticClass(),
			);
		for (let s = 0; s < i.Num(); s++) {
			var a = i.Get(s);
			(a.bEnableUpdateRateOptimizations = !n),
				(a.VisibilityBasedAnimTickOption =
					this.RefreshVisibilityBasedAnimTickOption(e, t));
		}
	}
	RefreshVisibilityBasedAnimTickOption(t, e) {
		let n = this.DefaultVisibilityBasedAnimTickOption;
		if (t || e) {
			if (e) return 0;
			for (const t of this.ForceDisableAnimOptimizationSet)
				n = Math.min(
					n,
					CharacterAnimOptimizationSetting_1.DisableAnimOptimizationTypeDefines[
						t
					],
				);
		}
		return n;
	}
};
(BaseAnimationComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(35)],
	BaseAnimationComponent,
)),
	(exports.BaseAnimationComponent = BaseAnimationComponent);
