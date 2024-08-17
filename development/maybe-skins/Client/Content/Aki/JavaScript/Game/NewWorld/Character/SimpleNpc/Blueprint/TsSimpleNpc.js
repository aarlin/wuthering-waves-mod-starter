"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../../../Core/Common/Info"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	CollisionUtils_1 = require("../../../../../Core/Utils/CollisionUtils"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	GameQualitySettingsManager_1 = require("../../../../GameQualitySettings/GameQualitySettingsManager"),
	Global_1 = require("../../../../Global"),
	GlobalData_1 = require("../../../../GlobalData"),
	CombineMeshTool_1 = require("../../Common/Blueprint/Utils/CombineMeshTool"),
	CharacterNameDefines_1 = require("../../Common/CharacterNameDefines"),
	CharacterDitherEffectController_1 = require("../../Common/Component/Effect/CharacterDitherEffectController_New"),
	SimpleNpcController_1 = require("../Logics/SimpleNpcController"),
	SimpleNpcFlowLogic_1 = require("../Logics/SimpleNpcFlowLogic"),
	SimpleNpcLoadController_1 = require("../Logics/SimpleNpcLoadController"),
	PROFILE_KEY = "SimpleNpc_FindFloor",
	DEFAULT_HALF_HEIGHT = 85,
	DEFAULT_RADIUS = 25,
	DEFAULT_MESH_YAW = -90,
	FIND_FLOOR_RAY_LENGTH = 500,
	MIN_EDITOR_MOVE_CHANGED = 900,
	LOGIC_TICK_INTERVAL = 100;
class TsSimpleNpc extends UE.KuroEffectActor {
	constructor() {
		super(...arguments),
			(this.CapsuleCollision = void 0),
			(this.Mesh = void 0),
			(this.CharRenderingComponent = void 0),
			(this.DA = void 0),
			(this.DisappearOnSunny = !1),
			(this.DisappearOnCloudy = !1),
			(this.DisappearOnRainy = !1),
			(this.DisappearOnThunderRain = !1),
			(this.DisappearOnSnowy = !1),
			(this.LodLevel = 0),
			(this.DebugDitherValue = -0),
			(this.TempDistanceSquared = -0),
			(this.CurDither = -0),
			(this.IsNotUnload = !1),
			(this.FlowLogic = void 0),
			(this.TempLocation = void 0),
			(this.CachedLocation = void 0),
			(this.TempAnimInstance = void 0),
			(this.TempAnimAsset = void 0),
			(this.TempDaPath = void 0),
			(this.NeedResetCollision = !1),
			(this.IsDirty = !1),
			(this.StartLocation = void 0),
			(this.StartLocationProxy = void 0),
			(this.InstanceId = 0),
			(this.DitherEffectControllerInternal = void 0),
			(this.IsInLogicRangeInternal = void 0),
			(this.RegisterLoopTimerId = void 0),
			(this.LastGameSeconds = -0),
			(this.IsModelLoadedInternal = !1),
			(this.IsShowShadow = void 0),
			(this.IsTickEnabled = void 0),
			(this.CachedComponents = void 0);
	}
	get DitherEffectController() {
		return (
			this.DitherEffectControllerInternal ||
				(this.DitherEffectControllerInternal =
					new CharacterDitherEffectController_1.CharacterDitherEffectController(
						this,
						this.CharRenderingComponent,
					)),
			this.DitherEffectControllerInternal
		);
	}
	EditorInit() {
		super.EditorInit(),
			(this.bEditorTickBySelected = !0),
			(this.CachedLocation = Vector_1.Vector.Create()),
			(this.TempLocation = Vector_1.Vector.Create()),
			this.CachedLocation.FromUeVector(this.K2_GetActorLocation()),
			this.Mesh &&
				((this.TempAnimInstance = this.Mesh.AnimScriptInstance),
				(this.TempAnimAsset = this.Mesh.AnimationData.AnimToPlay)),
			(this.TempDaPath = this.DA.AssetPathName?.toString()),
			this.LoadModel(),
			this.Tags.Contains(
				CharacterNameDefines_1.CharacterNameDefines.PFT_NO_SPAWN,
			) ||
				this.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.PFT_NO_SPAWN),
			(this.bSetActorComponentTickEnabledByFocus = !0),
			this.EditorSetActorComponentsTickEnabled(!1);
	}
	EditorTick(e) {
		if (this.TempLocation)
			if (
				(this.TempLocation.FromUeVector(this.K2_GetActorLocation()),
				Vector_1.Vector.DistSquared(this.CachedLocation, this.TempLocation) >
					900)
			)
				this.CachedLocation.DeepCopy(this.TempLocation), (this.IsDirty = !0);
			else {
				if (this.Mesh)
					if (0 === this.Mesh.AnimationMode) {
						if (
							((this.TempAnimAsset = void 0),
							this.Mesh.AnimScriptInstance !== this.TempAnimInstance)
						)
							return (
								(this.TempAnimInstance = this.Mesh.AnimScriptInstance),
								void (this.IsDirty = !0)
							);
					} else if (
						1 === this.Mesh.AnimationMode &&
						((this.TempAnimInstance = void 0),
						this.Mesh.AnimationData.AnimToPlay !== this.TempAnimAsset)
					)
						return (
							(this.TempAnimAsset = this.Mesh.AnimationData.AnimToPlay),
							void (this.IsDirty = !0)
						);
				this.TempDaPath !== this.DA.AssetPathName?.toString()
					? ((this.TempDaPath = this.DA.AssetPathName.toString()),
						(this.IsDirty = !0))
					: this.IsDirty
						? ((this.IsDirty = !1),
							this.LoadModel(),
							UE.KuroStaticLibrary.SetActorModify(this))
						: this.NeedResetCollision &&
							((this.NeedResetCollision = !1),
							this.SetDefaultCollision(),
							this.ResetMeshLocation());
			}
		else this.EditorInit();
	}
	ReceiveBeginPlay() {
		this.InitData();
	}
	InitData() {
		this.FindComponents(),
			this.InitCollisionInfo(),
			this.InitBaseInfo(),
			this.InitRenderInfo(),
			this.InitDaInfo(),
			this.SetTickEnabled(!1),
			this.SetMainShadowEnabled(!1),
			SimpleNpcController_1.SimpleNpcController.Add(this),
			this.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE);
	}
	InitCollisionInfo() {
		(this.CapsuleCollision.bCanCharacterStandOn = !1),
			(this.CapsuleCollision.CanCharacterStepUpOn = 0),
			this.CapsuleCollision.SetCollisionObjectType(0),
			this.CapsuleCollision.SetCollisionResponseToAllChannels(0),
			CollisionUtils_1.CollisionUtils.SetCollisionResponseToPawn(
				this.CapsuleCollision,
				0,
				2,
			);
	}
	InitBaseInfo() {
		(this.FlowLogic = new SimpleNpcFlowLogic_1.SimpleNpcFlowLogic(this)),
			(this.StartLocation = this.K2_GetActorLocation()),
			(this.StartLocationProxy = Vector_1.Vector.Create(this.StartLocation)),
			(this.IsInLogicRangeInternal = !1),
			(this.RegisterLoopTimerId = void 0);
		var e = Global_1.Global.BaseCharacter;
		e &&
			((e = e.CharacterActorComponent.ActorLocationProxy),
			(this.TempDistanceSquared = Vector_1.Vector.DistSquared(
				this.StartLocationProxy,
				e,
			))),
			(this.InstanceId = ++TsSimpleNpc.InstanceCount),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("World", 30, "创建SimpleNpc", ["Id", this.InstanceId]);
	}
	InitRenderInfo() {
		this.CharRenderingComponent.Init(3),
			this.SetPrimitiveEntityType(2),
			this.SetAnimUROParams();
	}
	InitDaInfo() {
		ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(this.DA)
			? ((this.IsNotUnload = !0), (this.IsModelLoadedInternal = !1))
			: ((this.IsModelLoadedInternal = !0),
				GlobalData_1.GlobalData.IsPlayInEditor ||
					(this.CacheComponents(), this.CloseSkeletalMeshShadow()),
				this.CharRenderingComponent.UpdateNpcDitherComponent(),
				SimpleNpcController_1.SimpleNpcController.CheckNpcShowState(this, !0));
	}
	ReceiveEndPlay() {
		SimpleNpcController_1.SimpleNpcController.Remove(this),
			void 0 !== this.RegisterLoopTimerId &&
				(TimerSystem_1.TimerSystem.Remove(this.RegisterLoopTimerId),
				(this.RegisterLoopTimerId = void 0)),
			this.FlowLogic && (this.FlowLogic.Dispose(), (this.FlowLogic = void 0)),
			(this.DA = void 0),
			(this.DitherEffectControllerInternal = void 0),
			(this.CachedComponents = void 0),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"World",
					30,
					"销毁SimpleNpc",
					["Id", this.InstanceId],
					["DeleteCount", ++TsSimpleNpc.DeleteCount],
				);
	}
	FindComponents() {
		(this.CapsuleCollision && this.CapsuleCollision.IsValid()) ||
			(this.CapsuleCollision = this.GetComponentByClass(
				UE.CapsuleComponent.StaticClass(),
			)),
			(this.Mesh && this.Mesh.IsValid()) ||
				(this.Mesh = this.GetComponentByClass(
					UE.SkeletalMeshComponent.StaticClass(),
				)),
			(this.CharRenderingComponent && this.CharRenderingComponent.IsValid()) ||
				(this.CharRenderingComponent = this.GetComponentByClass(
					UE.CharRenderingComponent_C.StaticClass(),
				));
	}
	LoadModel() {
		this.FindComponents(), (this.IsNotUnload = !0), this.LoadModelByDA();
	}
	DebugSetNpcDitherValue(e) {
		this.SetDitherEffect(e, 1);
	}
	SetDefaultCollision() {
		var e;
		this.Mesh?.SkeletalMesh
			? ((e = this.Mesh.SkeletalMesh.GetBounds()),
				(this.CapsuleCollision.CapsuleHalfHeight = e
					? e.BoxExtent.GetMax()
					: 85))
			: (this.CapsuleCollision.CapsuleHalfHeight = 85),
			(this.CapsuleCollision.CapsuleRadius = 25);
	}
	ResetMeshLocation() {
		this.Mesh.K2_SetRelativeTransform(
			new UE.Transform(
				new UE.Rotator(0, -90, 0),
				new UE.Vector(0, 0, -this.CapsuleCollision.CapsuleHalfHeight),
				Vector_1.Vector.OneVector,
			),
			!1,
			void 0,
			!1,
		);
	}
	FindFloor() {
		this.FindComponents();
		var e = this.CapsuleCollision.GetScaledCapsuleHalfHeight(),
			t = this.CapsuleCollision.GetScaledCapsuleRadius(),
			i = this.K2_GetActorLocation(),
			o = new UE.Vector(i.X, i.Y, i.Z - 500 - (e - t)),
			s =
				(TsSimpleNpc.SphereTrace ||
					((TsSimpleNpc.SphereTrace = UE.NewObject(
						UE.TraceSphereElement.StaticClass(),
					)),
					(TsSimpleNpc.SphereTrace.bIsSingle = !0),
					(TsSimpleNpc.SphereTrace.bIgnoreSelf = !0),
					TsSimpleNpc.SphereTrace.SetTraceTypeQuery(
						QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
					)),
				TsSimpleNpc.SphereTrace);
		(s.WorldContextObject = this),
			(s.Radius = t),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, i),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, o),
			(i = TraceElementCommon_1.TraceElementCommon.SphereTrace(s, PROFILE_KEY)),
			(o = s.HitResult);
		i &&
			o.bBlockingHit &&
			((s = new UE.Vector()),
			TraceElementCommon_1.TraceElementCommon.GetHitLocation(o, 0, s),
			(s.Z += e - t),
			this.K2_SetActorLocation(s, !1, void 0, !1));
	}
	LoadModelByDA() {
		var e;
		return !(
			!this.CapsuleCollision ||
			!this.Mesh ||
			!ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(this.DA) ||
			!(e = this.DA.AssetPathName?.toString()) ||
			(ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.PD_NpcSetupData_C,
				(e) => {
					this.IsNotUnload && this.HandleLoadedDaConfig(e),
						this.SetTickEnabled(this.IsInLogicRangeInternal),
						this.SetMainShadowEnabled(this.IsInLogicRangeInternal);
				},
			),
			0)
		);
	}
	HandleLoadedDaConfig(e, t = !1) {
		e
			? this.CapsuleCollision &&
				this.Mesh &&
				(CombineMeshTool_1.CombineMeshTool.LoadDaConfig(
					this,
					this.CapsuleCollision.GetRelativeTransform(),
					this.Mesh,
					e,
				),
				t ||
					(this.CharRenderingComponent.UpdateNpcDitherComponent(),
					SimpleNpcController_1.SimpleNpcController.CheckNpcShowState(
						this,
						!0,
					)),
				GlobalData_1.GlobalData.IsPlayInEditor ||
					(this.CacheComponents(), this.CloseSkeletalMeshShadow()),
				(this.NeedResetCollision = !0))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					30,
					"[TsSimpleNpc.HandleLoadedDaConfig] DA资源类型错误",
				);
	}
	StartFlowLogic() {
		this.FlowLogic && this.FlowLogic.StartFlowLogic();
	}
	SetDitherEffect(e, t = 3) {
		this.DitherEffectController.SetDitherEffect(e, t);
	}
	ShowDialog(e, t = -1) {
		this.FlowLogic &&
			this.FlowLogic.AddHeadView().then(() => {
				this.FlowLogic.ShowDialog(e, t);
			});
	}
	HideDialog() {
		this.FlowLogic && this.FlowLogic.HideDialog();
	}
	TryPlayMontage(e) {
		return !!this.FlowLogic && this.FlowLogic.TryPlayMontage(e);
	}
	StopMontage() {
		this.FlowLogic && this.FlowLogic.StopMontage();
	}
	FilterFlowWorldState(e) {
		this.FlowLogic?.FilterFlowWorldState(e);
	}
	get IsHiding() {
		return !this.IsNotUnload;
	}
	get SelfLocation() {
		return this.StartLocation;
	}
	get SelfLocationProxy() {
		return this.StartLocationProxy;
	}
	get IsInLogicRange() {
		return this.IsInLogicRangeInternal;
	}
	ChangeLogicRangeState(e) {
		this.IsInLogicRangeInternal !== e &&
			(e
				? (this.IsModelLoadedInternal ||
						(SimpleNpcLoadController_1.SimpleNpcLoadController.AddSimpleNpc(
							this,
						),
						(this.IsModelLoadedInternal = !0)),
					this.SetLogicTickRunning(!0))
				: this.SetLogicTickRunning(!1)),
			(this.IsInLogicRangeInternal = e);
	}
	SetLogicTickRunning(e) {
		e
			? void 0 === this.RegisterLoopTimerId &&
				((this.LastGameSeconds = Time_1.Time.WorldTimeSeconds),
				(this.RegisterLoopTimerId = TimerSystem_1.TimerSystem.Forever(() => {
					this.OnLogicTick();
				}, 100)))
			: void 0 !== this.RegisterLoopTimerId &&
				(TimerSystem_1.TimerSystem.Has(this.RegisterLoopTimerId) &&
					TimerSystem_1.TimerSystem.Remove(this.RegisterLoopTimerId),
				(this.RegisterLoopTimerId = void 0),
				this.FlowLogic) &&
				this.FlowLogic.ForceStopFlow();
	}
	OnLogicTick() {
		var e = Time_1.Time.WorldTimeSeconds,
			t = e - this.LastGameSeconds;
		(this.LastGameSeconds = e), this.FlowLogic && this.FlowLogic.Tick(t);
	}
	CacheComponents() {
		this.CachedComponents = this.K2_GetComponentsByClass(
			UE.ActorComponent.StaticClass(),
		);
	}
	SetTickEnabled(e) {
		if (e !== this.IsTickEnabled) {
			this.IsTickEnabled = e;
			var t =
				this.CachedComponents ||
				this.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
			for (let o = 0, s = t.Num(); o < s; o++) {
				var i = t.Get(o);
				i && i.SetComponentTickEnabled(e);
			}
		}
	}
	CloseSkeletalMeshShadow() {
		if (this.CachedComponents)
			for (let t = 0, i = this.CachedComponents.Num(); t < i; t++) {
				var e = this.CachedComponents.Get(t);
				e && e instanceof UE.SkeletalMeshComponent && e.SetCastShadow(!1);
			}
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"NPC",
					25,
					"You must call CloseSkeletalMeshShadow after CacheComponents",
				);
	}
	SetMainShadowEnabled(e) {
		if (e === this.IsShowShadow)
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					25,
					"SetShadowEnabled, value === this.IsShowShadow",
					["Value", e],
					["IsShowShadow", this.IsShowShadow],
				);
		else {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					25,
					"SetShadowEnabled, value !== this.IsShowShadow",
					["Value", e],
					["IsShowShadow", this.IsShowShadow],
				),
				(this.IsShowShadow = e);
			var t =
				this.CachedComponents ||
				this.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
			if (t)
				for (let o = 0, s = t.Num(); o < s; o++) {
					var i = t.Get(o);
					i &&
						i instanceof UE.SkinnedMeshComponent &&
						!(i instanceof UE.SkeletalMeshComponent) &&
						(i.SetCastShadow(e), Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info("Entity", 25, "SetShadowEnabled, SetCastShadow", [
							"Value",
							e,
						]);
				}
		}
	}
	get IsLodShow() {
		return !(
			Info_1.Info.IsGameRunning() &&
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
				.GetCurrentQualityInfo()
				.GetGameQualitySettingLevel() < this.LodLevel
		);
	}
	SetAnimUROParams() {
		var e = new UE.AnimUpdateRateParameters(),
			t = ((e.bShouldUseLodMap = !0), this.Mesh.LODInfo.Num());
		e.LODToFrameSkipMap.Empty();
		for (let i = 0; i < t; i++) e.LODToFrameSkipMap.Add(i, i < 2 ? 0 : i - 1);
		(e.BaseNonRenderedUpdateRate = 8), (e.MaxEvalRateForInterpolation = t);
		var i = (0, puerts_1.$ref)(e),
			o = this.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
		for (let e = 0; e < o.Num(); e++) {
			var s = o.Get(e);
			(s.bEnableUpdateRateOptimizations = !0),
				s.SetAnimUpdateRateParameters(i),
				(s.VisibilityBasedAnimTickOption = 3);
		}
		(0, puerts_1.$unref)(i);
	}
}
(TsSimpleNpc.InstanceCount = 0),
	(TsSimpleNpc.DeleteCount = 0),
	(TsSimpleNpc.SphereTrace = void 0),
	(exports.default = TsSimpleNpc);
