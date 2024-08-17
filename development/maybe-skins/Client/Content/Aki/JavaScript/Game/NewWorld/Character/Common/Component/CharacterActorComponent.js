"use strict";
var CharacterActorComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, o, r) {
			var a,
				i = arguments.length,
				n =
					i < 3
						? e
						: null === r
							? (r = Object.getOwnPropertyDescriptor(e, o))
							: r;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				n = Reflect.decorate(t, e, o, r);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(a = t[s]) &&
						(n = (i < 3 ? a(n) : 3 < i ? a(e, o, n) : a(e, o)) || n);
			return 3 < i && n && Object.defineProperty(e, o, n), n;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterActorComponent =
		exports.LockOnConfig =
		exports.LockOnPart =
		exports.AimPart =
		exports.FIX_SPAWN_TRACE_HEIGHT =
			void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../Core/Common/Stats"),
	Time_1 = require("../../../../../Core/Common/Time"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
	Net_1 = require("../../../../../Core/Net/Net"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	CollisionUtils_1 = require("../../../../../Core/Utils/CollisionUtils"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	CameraController_1 = require("../../../../Camera/CameraController"),
	TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	Global_1 = require("../../../../Global"),
	GlobalData_1 = require("../../../../GlobalData"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RenderConfig_1 = require("../../../../Render/Config/RenderConfig"),
	CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
	BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
	BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent"),
	FunctionRequestProxy_1 = require("./Actor/FunctionRequestProxy"),
	BaseCharacterComponent_1 = require("./BaseCharacterComponent"),
	INIT_LOCATION_KEY = "InitLocation",
	MAX_NO_ROTATER_ANGLE = 10,
	PHYSIC_STREAMING_CHECK_PERIOD = 500,
	PHYSIC_STREAMING_CHECK_RANGE = 1e3,
	oldLockOnPartNames =
		((exports.FIX_SPAWN_TRACE_HEIGHT = -1e3),
		[
			new UE.FName("ViceAimingCase0"),
			new UE.FName("ViceAimingCase1"),
			new UE.FName("ViceAimingCase2"),
			new UE.FName("ViceAimingCase3"),
			new UE.FName("ViceAimingCase4"),
			new UE.FName("ViceAimingCase5"),
			new UE.FName("ViceAimingCase6"),
			new UE.FName("ViceAimingCase7"),
			new UE.FName("ViceAimingCase8"),
			new UE.FName("ViceAimingCase9"),
		]),
	lockOnEnhancedTags = [-336338240, -164894127];
class AimPart {
	constructor(t, e) {
		(this.Owner = e),
			(this.BoneName = void 0),
			(this.BoneNameString = ""),
			(this.Offset = Vector_1.Vector.Create()),
			(this.RadiusIn = 0),
			(this.RadiusOut = 0),
			(this.RadiusOutOnStart = 0),
			(this.MobileCorrect = 0),
			(this.GamePadCorrect = 0),
			(this.IgnoreCollisionBoneName = ""),
			(this.BoneNameString = t.BoneName),
			(this.BoneName = new UE.FName(this.BoneNameString)),
			this.Offset.DeepCopy(t.Offset),
			(this.RadiusIn = t.RadiusIn),
			(this.RadiusOut = t.RadiusOut),
			(this.RadiusOutOnStart = t.RadiusOutOnStart),
			(this.MobileCorrect = t.MobileCorrect),
			(this.GamePadCorrect = t.GamePadCorrect),
			(this.IgnoreCollisionBoneName = t.忽略的骨骼碰撞);
	}
	GetRadius(t) {
		let e = t ? this.RadiusOutOnStart : this.RadiusOut;
		return (
			ModelManager_1.ModelManager.PlatformModel.IsGamepad()
				? (e *= this.GamePadCorrect)
				: ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
					(e *= this.MobileCorrect),
			e
		);
	}
}
exports.AimPart = AimPart;
class LockOnPart {
	constructor(t) {
		(this.BoneName = void 0),
			(this.BoneNameString = ""),
			(this.SoftLockValid = !0),
			(this.HardLockValid = !0),
			(this.AimPartBoneName = ""),
			(this.EnablePartName = ""),
			t instanceof UE.SLockOnPart
				? ((this.BoneNameString = t.BoneName),
					(this.BoneName = new UE.FName(this.BoneNameString)),
					(this.SoftLockValid = t.SoftLockValid),
					(this.HardLockValid = t.HardLockValid),
					(this.AimPartBoneName = t.AimPartBoneName),
					(this.EnablePartName = t.EnablePartName))
				: ((this.BoneNameString = t.toString()),
					(this.BoneName = t),
					(this.SoftLockValid = !0),
					(this.HardLockValid = !0),
					(this.AimPartBoneName = this.BoneNameString),
					(this.EnablePartName = ""));
	}
}
exports.LockOnPart = LockOnPart;
class LockOnConfig {
	constructor(t) {
		(this.IsOpened = !1),
			(this.Distance = 0),
			(this.UpDistance = 0),
			(this.DownDistance = 0),
			(this.IsOpened = t.IsOpened),
			(this.Distance = t.Distance),
			(this.UpDistance = t.UpDistance),
			(this.DownDistance = t.DownDistance);
	}
}
exports.LockOnConfig = LockOnConfig;
let CharacterActorComponent = (CharacterActorComponent_1 = class extends (
	BaseCharacterComponent_1.BaseCharacterComponent
) {
	constructor() {
		super(...arguments),
			(this.uFr = void 0),
			(this.cFr = Vector_1.Vector.Create(0, 0, 0)),
			(this.mFr = Rotator_1.Rotator.Create(0, 0, 0)),
			(this.UseControllerRotation = Rotator_1.Rotator.Create(0, 0, 0)),
			(this.OverrideTurnSpeed = 0),
			(this.DisableKey = void 0),
			(this.dFr = Vector_1.Vector.Create(0, 0, 0)),
			(this.CFr = -1),
			(this.IsRoleAndCtrlByMe = !1),
			(this.IsSummonsAndCtrlByMe = !1),
			(this.gFr = Vector_1.Vector.Create(0, 0, 0)),
			(this.fFr = !0),
			(this.pFr = !1),
			(this.vFr = !1),
			(this.MFr = 0),
			(this.SFr = !0),
			(this.gIn = 3),
			(this.TGn = void 0),
			(this.v9s = void 0),
			(this.LGn = !1),
			(this.Lz = Vector_1.Vector.Create()),
			(this.ShowDebug = !1),
			(this.EFr = void 0),
			(this.IsPartHitInternal = !1),
			(this.yFr = !1),
			(this.n8e = () => {
				!this.CreatureDataInternal ||
					this.CreatureDataInternal.GetRemoveState() ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"Entity还没销毁，Actor已经被销毁了，需检查造物点是否会使生成的实体掉出边界外",
							["CreatureData", this.CreatureDataInternal.GetCreatureDataId()],
							["ConfigType", this.CreatureDataInternal.GetEntityConfigType()],
							["PbDataId", this.CreatureDataInternal.GetPbDataId()],
						));
			}),
			(this.IFr = () => {
				this.yFr || ((this.yFr = !0), this.TFr());
			}),
			(this.LFr = new Map()),
			(this.DFr = new Map()),
			(this.RFr = void 0),
			(this.AimParts = new Map()),
			(this.LockOnParts = new Map()),
			(this.LockOnConfig = void 0),
			(this.StartHideDistance = 0),
			(this.CompleteHideDistance = 0),
			(this.StartDitherValue = 0),
			(this.AFr = new Map()),
			(this.fIn = [!1, 0]),
			(this.DisableMeshCollisionEnabledHandle = void 0),
			(this.UFr = void 0),
			(this.DisableMeshCollisionObjectTypeHandle = void 0),
			(this.MeshHandleForCollisionType = void 0),
			(this.DGn = (t) => {
				1 === t && this.LGn
					? (this.Entity.UnregisterFromGameBudgetController(),
						this.AGn(this.ActorLocation))
					: 4 === t &&
						this.TGn &&
						(TimerSystem_1.TimerSystem.Remove(this.TGn),
						(this.TGn = void 0),
						this.LGn ? this.bFr() : this.UGn());
			});
	}
	get EnableVoxelDetection() {
		return this.SFr;
	}
	SetEnableVoxelDetection(t, e) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 4, "设置是否检测体素", ["", t], ["Reason", e]),
			(this.SFr = t);
	}
	get IsBoss() {
		return this.pFr;
	}
	get InputDirectProxy() {
		return this.cFr;
	}
	get InputDirect() {
		return this.cFr.ToUeVector();
	}
	get InputRotator() {
		return this.mFr.ToUeRotator();
	}
	get InputRotatorProxy() {
		return this.mFr;
	}
	HasMesh() {
		return !!this.SkeletalMesh?.SkeletalMesh;
	}
	get IsPartHit() {
		return this.IsPartHitInternal;
	}
	SetInputDirect(t) {
		MathUtils_1.MathUtils.IsValidVector(t)
			? ((this.cFr.X = t.X), (this.cFr.Y = t.Y), (this.cFr.Z = t.Z))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					6,
					"SetInputDirect has NaN",
					["x", t.X],
					["y", t.Y],
					["z", t.Z],
				);
	}
	SetInputDirectByNumber(t, e, o) {
		MathUtils_1.MathUtils.IsValidNumbers(t, e, o)
			? ((this.cFr.X = t), (this.cFr.Y = e), (this.cFr.Z = o))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					6,
					"SetInputDirect has NaN",
					["x", t],
					["y", e],
					["z", o],
				);
	}
	SetInputRotator(t) {
		(this.mFr.Pitch = t.Pitch),
			(this.mFr.Yaw = t.Yaw),
			(this.mFr.Roll = t.Roll);
	}
	SetInputRotatorByNumber(t, e, o) {
		(this.mFr.Pitch = t), (this.mFr.Yaw = e), (this.mFr.Roll = o);
	}
	SetOverrideTurnSpeed(t) {
		this.OverrideTurnSpeed = t;
	}
	OnInitData() {
		return (
			super.OnInitData(),
			(this.EFr = new FunctionRequestProxy_1.FunctionRequestProxy()),
			(this.DisableMeshCollisionEnabledHandle =
				new BaseActorComponent_1.DisableEntityHandle(
					"SetMeshCollisionEnabled",
				)),
			(this.DisableMeshCollisionObjectTypeHandle =
				new BaseActorComponent_1.DisableEntityHandle(
					"SetMeshCollisionObjectType",
				)),
			!!this.InitCreatureData()
		);
	}
	OnInit() {
		super.OnInit(),
			(this.EntityType = this.CreatureData.GetEntityType()),
			(this.SubEntityType = this.CreatureData.GetSubEntityType());
		let t = 0;
		var e = void 0;
		if (this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Player)
			t = this.CreatureDataInternal.GetRoleConfig().MeshId;
		else {
			var o = this.CreatureData.GetPbModelConfig();
			if (!o)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Character",
							3,
							"[CharacterActorComponent.OnInit] 加载actor失败，无法找到pbModelConfig",
							["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
							["ModelId", t],
							["PbDataId", this.CreatureData.GetPbDataId()],
						),
					!1
				);
			t = o.ModelId;
		}
		if (!(e = this.InitActorNew(t)) || !UE.KismetSystemLibrary.IsValid(e))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						3,
						"[CharacterActorComponent.OnInit] 加载actor失败。",
						["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
						["ModelId", t],
						["PbDataId", this.CreatureData.GetPbDataId()],
					),
				!1
			);
		if (!e.IsA(UE.TsBaseCharacter_C.StaticClass()))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						6,
						"[CharacterActorComponent.OnInit] Actor不是TsBaseCharacter",
						["Name", e.GetName()],
						["Class", e.GetClass().GetName()],
						["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
						["ModelId", t],
						["PbDataId", this.CreatureData.GetPbDataId()],
					),
				!1
			);
		var r = e,
			a =
				(r.SetPrimitiveBlueprintTypeName(
					new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId),
				),
				this.SetCamp(r),
				(r.CharacterActorComponent = this),
				(r.EntityId = this.Entity.Id),
				this.InitDefaultController(e),
				(this.ActorInternal = e),
				this.ActorInternal.OnDestroyed.Add(this.n8e),
				(this.IsRoleAndCtrlByMe = !1),
				r.Mesh);
		switch (this.EntityType) {
			case Protocol_1.Aki.Protocol.wks.Proto_Player:
				ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
				this.CreatureDataInternal.GetPlayerId()
					? ((r.RenderType = 0), (this.IsRoleAndCtrlByMe = !0))
					: (r.RenderType = 1);
				break;
			case Protocol_1.Aki.Protocol.wks.Proto_Npc:
				r.RenderType = 3;
				var i = this.Actor.K2_GetComponentsByClass(
					UE.SkeletalMeshComponent.StaticClass(),
				);
				for (let t = 0; t < i.Num(); t++) {
					var n = i.Get(t);
					n.SetEnableOverrideSkeletalMeshScreenSizeCullRatio(!0),
						n.SetSkeletalMeshScreenSizeCullRatio(0.001);
				}
				break;
			case Protocol_1.Aki.Protocol.wks.Proto_Monster:
				(r.RenderType = 2),
					ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
						this.CreatureDataInternal.GetPlayerId() &&
						(this.IsSummonsAndCtrlByMe = !0),
					!a ||
					(0 !== this.CreatureData.GetBaseInfo()?.Category.MonsterMatchType &&
						611000008 !== this.CreatureData.GetPbDataId() &&
						611000009 !== this.CreatureData.GetPbDataId() &&
						611000010 !== this.CreatureData.GetPbDataId())
						? a ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Character",
									25,
									"[CharacterActorComponent.OnInit] Monster Actor.Mesh不是SkeletalMeshComponent",
									["Name", e.GetName()],
									[
										"CreatureDataId",
										this.CreatureDataInternal.GetCreatureDataId(),
									],
									["ModelId", t],
								))
						: (a.SetEnableOverrideSkeletalMeshScreenSizeCullRatio(!0),
							a.SetSkeletalMeshScreenSizeCullRatio(0.004));
				break;
			case Protocol_1.Aki.Protocol.wks.Proto_Vision:
				(r.RenderType = 4),
					ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
						this.CreatureDataInternal.GetPlayerId() &&
						(this.IsSummonsAndCtrlByMe = !0);
				break;
			case Protocol_1.Aki.Protocol.wks.Proto_Animal:
				a
					? (a.SetEnableOverrideSkeletalMeshScreenSizeCullRatio(!0),
						a.SetSkeletalMeshScreenSizeCullRatio(0.005))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Character",
							25,
							"[CharacterActorComponent.OnInit] Animal Actor.Mesh不是SkeletalMeshComponent",
							["Name", e.GetName()],
							["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
							["ModelId", t],
						);
				break;
			default:
				r.RenderType = 7;
		}
		return (
			this.SetActorVisible(!1, "[CharacterActorComponent.OnInit] 默认隐藏"),
			this.SetCollisionEnable(
				!1,
				"[CharacterActorComponent.OnInit] 默认关闭碰撞",
			),
			this.SetTickEnable(!1, "[CharacterActorComponent.OnInit] 默认关闭Tick"),
			(r.FightManager = GlobalData_1.GlobalData.BpFightManager),
			r.CharRenderingComponent.Init(r.RenderType),
			3 === r.RenderType && r.CharRenderingComponent.UpdateNpcDitherComponent(),
			(r.AutoPossessAI = 3),
			this.SetInputRotator(this.ActorRotationProxy),
			(o = this.CreatureDataInternal.GetInitLocation())
				? this.SetInitLocation(o)
				: this.SetInitLocation(this.ActorLocation),
			this.InitSizeInternal(),
			!0
		);
	}
	InitDefaultController(t) {
		(this.uFr = t.GetController()),
			this.EntityType !== Protocol_1.Aki.Protocol.wks.Proto_Player &&
			this.EntityType !== Protocol_1.Aki.Protocol.wks.Proto_Vision &&
			this.EntityType !== Protocol_1.Aki.Protocol.wks.Proto_Npc
				? this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Animal &&
					this.SetDefaultMovementMode(t)
				: this.uFr
					? (this.uFr instanceof UE.AIController ||
							(Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Character",
									58,
									"Character初始化的默认Controller基类为非AiController",
									[
										"CreatureData",
										this.CreatureDataInternal.GetCreatureDataId(),
									],
									[
										"ConfigType",
										this.CreatureDataInternal.GetEntityConfigType(),
									],
									["PbDataId", this.CreatureDataInternal.GetPbDataId()],
									["DefaultController", this.uFr],
								)),
						this.uFr instanceof UE.PlayerController &&
							(Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Character",
									58,
									"Character初始化的默认Controller基类为PlayerController,下场的人将会导致Movement不执行",
									[
										"CreatureData",
										this.CreatureDataInternal.GetCreatureDataId(),
									],
									[
										"ConfigType",
										this.CreatureDataInternal.GetEntityConfigType(),
									],
									["PbDataId", this.CreatureDataInternal.GetPbDataId()],
								),
							this.uFr.Pawn === t &&
								this.uFr.Pawn.DetachFromControllerPendingDestroy(),
							(this.uFr = void 0),
							this.CreateDefaultController(t)))
					: this.CreateDefaultController(t);
	}
	SetDefaultMovementMode(t) {
		t.CharacterMovement.SetDefaultMovementMode();
	}
	CreateDefaultController(t) {
		(t.AIControllerClass = UE.KuroAIController.StaticClass()),
			t.SpawnDefaultController(),
			(this.uFr = t.GetController());
	}
	SetActorRotation(t, e, o = !1) {
		return MathUtils_1.MathUtils.IsValidRotator(t)
			? ((e = super.SetActorRotation(t, e, o)),
				this.CachedActorRotation.DeepCopy(t),
				(this.CachedRotationTime = Time_1.Time.Frame),
				this.CachedActorRotation.Quaternion(this.CachedActorQuat),
				e)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Entity", 31, "SetActorRotation NaN"),
				!1);
	}
	SetActorRotationWithPriority(t, e, o, r = !1, a = !1) {
		var i = new FunctionRequestProxy_1.FunctionRequestWithPriority();
		return (
			(i.ModuleName = e),
			(i.Priority = o),
			!!this.EFr.DecideCall(i) &&
				(this.ShowDebug &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Entity",
						58,
						"[CharacterActorComponent.SetActorRotationWithPriority] 修改Rotation",
						["EntityId", this.Entity.Id],
						["module", e],
						["rotation", t],
						["oldRotation", this.ActorRotationProxy],
					),
				r &&
					EventSystem_1.EventSystem.EmitWithTarget(
						this.Entity,
						EventDefine_1.EEventName.RequestClearMeshRotationBuffer,
					),
				this.SetActorRotation(t, e, a),
				!0)
		);
	}
	SetActorLocation(t, e, o = !0) {
		return (
			this.IsRoleAndCtrlByMe &&
				(CharacterActorComponent_1.Lz.FromUeVector(t),
				CharacterActorComponent_1.Lz.SubtractionEqual(this.ActorLocationProxy),
				Math.abs(CharacterActorComponent_1.Lz.X) <
					MathUtils_1.MathUtils.SmallNumber) &&
				Math.abs(CharacterActorComponent_1.Lz.Y) <
					MathUtils_1.MathUtils.SmallNumber &&
				Math.abs(CharacterActorComponent_1.Lz.Z - 50) <
					MathUtils_1.MathUtils.SmallNumber &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Movement",
					6,
					"向上移动了50厘米",
					["Actor", this.Actor.GetName()],
					["NewLocation", t],
				),
			super.SetActorLocation(t, e, o)
		);
	}
	TeleportTo(t, e, o) {
		return (
			this.IsRoleAndCtrlByMe &&
				(CharacterActorComponent_1.Lz.FromUeVector(t),
				CharacterActorComponent_1.Lz.SubtractionEqual(this.ActorLocationProxy),
				Math.abs(CharacterActorComponent_1.Lz.X) <
					MathUtils_1.MathUtils.SmallNumber) &&
				Math.abs(CharacterActorComponent_1.Lz.Y) <
					MathUtils_1.MathUtils.SmallNumber &&
				Math.abs(CharacterActorComponent_1.Lz.Z - 50) <
					MathUtils_1.MathUtils.SmallNumber &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Movement",
					6,
					"向上移动了50厘米",
					["Actor", this.Actor.GetName()],
					["NewLocation", t],
				),
			super.TeleportTo(t, e, o)
		);
	}
	SetActorLocationAndRotation(t, e, o, r = !1, a = void 0) {
		let i = !1;
		var n;
		return MathUtils_1.MathUtils.IsValidVector(t) &&
			MathUtils_1.MathUtils.IsValidRotator(e)
			? (this.IsRoleAndCtrlByMe &&
					(CharacterActorComponent_1.Lz.FromUeVector(t),
					CharacterActorComponent_1.Lz.SubtractionEqual(
						this.ActorLocationProxy,
					),
					Math.abs(CharacterActorComponent_1.Lz.X) <
						MathUtils_1.MathUtils.SmallNumber) &&
					Math.abs(CharacterActorComponent_1.Lz.Y) <
						MathUtils_1.MathUtils.SmallNumber &&
					Math.abs(CharacterActorComponent_1.Lz.Z - 50) <
						MathUtils_1.MathUtils.SmallNumber &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Movement",
						6,
						"向上移动了50厘米",
						["Actor", this.Actor.GetName()],
						["NewLocation", t],
					),
				(i =
					!a ||
					(((n =
						new FunctionRequestProxy_1.FunctionRequestWithPriority()).ModuleName =
						o),
					(n.Priority = a),
					this.EFr.DecideCall(n))
						? super.SetActorLocationAndRotation(t, e, o, r)
						: super.SetActorLocation(t, o, r)),
				this.CachedActorRotation.DeepCopy(e),
				(this.CachedRotationTime = Time_1.Time.Frame),
				this.CachedActorRotation.Quaternion(this.CachedActorQuat),
				this.OnTeleport(),
				i)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Entity", 31, "SetActorLocationAndRotation NaN"),
				!1);
	}
	SetActorTransform(t, e, o = !0, r = void 0) {
		var a;
		return (
			this.IsRoleAndCtrlByMe &&
				(CharacterActorComponent_1.Lz.FromUeVector(t.GetLocation()),
				CharacterActorComponent_1.Lz.SubtractionEqual(this.ActorLocationProxy),
				Math.abs(CharacterActorComponent_1.Lz.X) <
					MathUtils_1.MathUtils.SmallNumber) &&
				Math.abs(CharacterActorComponent_1.Lz.Y) <
					MathUtils_1.MathUtils.SmallNumber &&
				Math.abs(CharacterActorComponent_1.Lz.Z - 50) <
					MathUtils_1.MathUtils.SmallNumber &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Movement",
					6,
					"向上移动了50厘米",
					["Actor", this.Actor.GetName()],
					["NewLocation", t],
				),
			r &&
				(((a =
					new FunctionRequestProxy_1.FunctionRequestWithPriority()).ModuleName =
					e),
				(a.Priority = r),
				this.EFr.DecideCall(a) ||
					t.SetRotation(this.ActorRotation.Quaternion())),
			super.SetActorTransform(t, e, o)
		);
	}
	SetActorTransformExceptMesh(t, e, o = !0, r) {
		return (
			this.CachedDesiredActorLocation.FromUeVector(t.GetLocation()),
			(this.IsChangingLocation = !0),
			(t = this.Actor.SetActorTransformExceptSkelMesh(t, o, void 0, !0, !0)),
			(this.IsChangingLocation = !1),
			this.DebugMovementComp &&
				this.DebugMovementComp.MarkDebugRecord(e + ".SetActorTransform", 1),
			this.ResetTransformCachedTime(),
			this.OnTeleport(),
			t
		);
	}
	SetActorLocationAndRotationExceptMesh(t, e, o, r = !0, a) {
		return (
			this.CachedDesiredActorLocation.FromUeVector(t),
			(this.IsChangingLocation = !0),
			(t = this.Actor.SetActorLocationAndRotationExceptSkelMesh(
				t,
				e,
				r,
				void 0,
				!0,
				!0,
			)),
			(this.IsChangingLocation = !1),
			this.DebugMovementComp &&
				this.DebugMovementComp.MarkDebugRecord(o + ".SetActorTransform", 1),
			this.ResetTransformCachedTime(),
			t
		);
	}
	KuroMoveAlongFloor(t, e, o = "unknown") {
		this.Actor.CharacterMovement.KuroMoveAlongFloor(t, e),
			this.ResetLocationCachedTime(),
			this.DebugMovementComp && this.DebugMovementComp.MarkDebugRecord(o, 1);
	}
	AddActorWorldOffset(t, e = "unknown", o = !0) {
		o
			? (this.DebugMovementComp &&
					this.DebugMovementComp.MarkDebugRecord(e + ".AddActorWorldOffset", 1),
				this.Actor.CharacterMovement.MoveAdjust(t))
			: super.AddActorWorldOffset(t, e, o);
	}
	OnStart() {
		var t,
			e = this.Actor;
		return (
			(this.DebugMovementComp = this.Entity.GetComponent(27)),
			e
				? (GlobalData_1.GlobalData.BpFightManager.添加Debug的对象(this.Actor),
					this.xFr(),
					e.SetPrimitiveEntityType(
						RenderConfig_1.RenderConfig.GetEntityRenderPriority(
							this.IsBoss,
							this.EntityType,
						),
					),
					GlobalData_1.GlobalData.IsPlayInEditor &&
						(t = e.TsCharacterDebugComponent) &&
						((t.DebugCreatureId = this.CreatureDataInternal.GetOwnerId()),
						(t.DebugEntityId = this.Entity.Id)),
					this.wFr(),
					ModelManager_1.ModelManager.SundryModel.RoleMoveDebugLogOn &&
						this.IsRoleAndCtrlByMe &&
						(e.RootComponent.bKuroMoveDebugLog = !0),
					CameraController_1.CameraController.LoadCharacterCameraConfig(
						e.DtCameraConfig,
					),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.FixBornLocation,
						this.IFr,
					),
					!0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Character",
							3,
							"[CharacterActorComponent.OnInit] 加载actor失败。",
							["EntityId", this.Entity.Id],
							["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
							["PlayerId", this.CreatureDataInternal.GetPlayerId()],
							["PbDataId", this.CreatureData.GetPbDataId()],
						),
					!1)
		);
	}
	OnActivate() {
		super.OnActivate(),
			this.BFr(),
			this.SetActorVisible(!0, "[CharacterActorComponent.OnActivate] Visible"),
			this.SetCollisionEnable(
				!0,
				"[CharacterActorComponent.OnActivate] Visible",
			),
			this.SetTickEnable(!0, "[CharacterActorComponent.OnActivate] Visible"),
			ControllerHolder_1.ControllerHolder.WorldController.SetActorDataByCreature(
				this.CreatureDataInternal,
				this.ActorInternal,
			),
			(this.Entity.IsEncloseSpace =
				ControllerHolder_1.ControllerHolder.WorldController.IsEncloseSpace(
					this.CreatureData.GetPbDataId(),
					this.ActorLocation,
					this.EntityType,
					this.CreatureData.GetEntityConfigType(),
				)),
			this.Entity.IsEncloseSpace
				? (3 ===
					ModelManager_1.ModelManager.WorldModel?.CurEnvironmentInfo.CaveMode
						? this.AGn(this.ActorLocation)
						: this.UGn(),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.OnEncloseSpaceTypeChange,
						this.DGn,
					))
				: this.UGn();
	}
	OnTick(t) {
		super.OnTick(t),
			this.TrySetNpcDither(),
			ModelManager_1.ModelManager.GameModeModel.IsMulti &&
				(this.vFr || (this.IsAutonomousProxy && !this.IsMoveAutonomousProxy)) &&
				((this.MFr -= t * MathUtils_1.MathUtils.MillisecondToSecond),
				this.MFr <= 0) &&
				this.ResetMoveControlled("控制超时"),
			this.Actor.DitherEffectController?.Update(t);
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CharOnEndPlay,
				this.Entity,
			),
			GlobalData_1.GlobalData.BpFightManager.删除Debug的对象(this.Actor),
			this.ActorInternal?.IsValid() &&
				(this.ActorInternal.OnDestroyed.Remove(this.n8e),
				this.ActorInternal instanceof TsBaseCharacter_1.default) &&
				(this.ActorInternal.Controller?.IsValid() &&
					this.ActorInternal.Controller.Pawn === this.ActorInternal &&
					(this.ActorInternal.Controller === Global_1.Global.CharacterController
						? this.ActorInternal.Controller.UnPossess()
						: this.ActorInternal.DetachFromControllerPendingDestroy()),
				this.ActorInternal.DitherEffectController?.Clear(),
				(this.ActorInternal.DitherEffectController = void 0),
				(this.ActorInternal.CharacterActorComponent = void 0)),
			(this.IsInSequenceBinding = !1),
			CameraController_1.CameraController.UnloadCharacterCameraConfig(
				this.Actor.DtCameraConfig,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.FixBornLocation,
				this.IFr,
			),
			this.Entity.IsEncloseSpace &&
				(this.TGn &&
					(TimerSystem_1.TimerSystem.Remove(this.TGn), (this.TGn = void 0)),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnEncloseSpaceTypeChange,
					this.DGn,
				)),
			!0
		);
	}
	OnClear() {
		return (
			super.OnClear(),
			TimerSystem_1.TimerSystem.Next(() => {
				this.Actor?.IsValid() &&
					(this.Actor.Mesh?.SetSkeletalMesh(
						this.ClassDefaultObject.Mesh.SkeletalMesh,
					),
					this.Actor.Mesh?.SetAnimClass(
						this.ClassDefaultObject.Mesh.AnimClass,
					));
			}),
			this.SetInputDirectByNumber(0, 0, 0),
			this.SetInputRotatorByNumber(0, 0, 0),
			this.DisableMeshCollisionEnabledHandle.Clear(),
			this.DisableMeshCollisionObjectTypeHandle.Clear(),
			this.HolographicEffectActor &&
				ActorSystem_1.ActorSystem.Put(this.HolographicEffectActor),
			!(this.v9s = void 0)
		);
	}
	OnEnable() {
		this.OnSetActorActive(!0), this.ResetAllCachedTime();
	}
	OnDisable(t) {
		this.OnSetActorActive(!1, t);
	}
	OnChangeTimeDilation(t) {
		var e = this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1;
		this.ActorInternal.CustomTimeDilation = t * e;
	}
	bFr() {
		this.ActorInternal
			? GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen &&
				(void 0 !== this.Entity.GameBudgetManagedToken
					? (cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(
							this.Entity.GameBudgetConfig.GroupName,
							this.Entity.GameBudgetManagedToken,
							this.ActorInternal,
						),
						this.Entity.GetComponent(158)?.IsInFighting &&
							cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(
								this.Entity.GameBudgetConfig.GroupName,
								this.Entity.GameBudgetManagedToken,
								!0,
							))
					: this.Entity.RegisterToGameBudgetController(this.ActorInternal),
				this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Player ||
				this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Vision
					? cpp_1.FKuroGameBudgetAllocatorInterface.SetActorCavernMode(
							this.Entity.GameBudgetConfig.GroupName,
							this.Entity.GameBudgetManagedToken,
							3,
						)
					: cpp_1.FKuroGameBudgetAllocatorInterface.SetActorCavernMode(
							this.Entity.GameBudgetConfig.GroupName,
							this.Entity.GameBudgetManagedToken,
							this.Entity.IsEncloseSpace ? 2 : 1,
						))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					25,
					"[CharacterActorComponent.OnActivate] 没有找到Actor",
					["EntityId", this.Entity.Id],
					["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
					["PlayerId", this.CreatureDataInternal.GetPlayerId()],
					["PbDataId", this.CreatureData.GetPbDataId()],
				);
	}
	ResetAllCachedTime() {
		super.ResetAllCachedTime(), (this.CFr = -1);
	}
	ResetCachedVelocityTime() {
		this.CFr = 0;
	}
	OnSetActorActive(t, e) {
		if (
			(super.OnSetActorActive(t, e),
			t && this.Entity.GetComponent(36)?.StopMove(!t),
			this.Actor?.IsValid())
		) {
			e =
				((e = this.Actor.GetComponentByClass(
					UE.NavigationInvokerComponent.StaticClass(),
				)) && e.SetActive(t),
				(0, puerts_1.$ref)(void 0));
			var o = (this.Actor.GetAttachedActors(e, !0), (0, puerts_1.$unref)(e));
			for (let e = 0; e < o.Num(); ++e) o.Get(e).SetActorHiddenInGame(!t);
			(e = this.Actor.DitherEffectController) &&
				(t ? e.SetIsDisable(!1, 1) : e.SetIsDisable(!0)),
				this.SetActorXRayState(!1);
		}
	}
	GFr(t) {
		var e = CollisionUtils_1.CollisionUtils.GetCollisionResponseContainer();
		(e.Pawn = e.GameTraceChannel5 = e.GameTraceChannel8 = 1),
			this.Actor.CapsuleComponent.SetCollisionResponseToChannel(
				QueryTypeDefine_1.KuroCollisionChannel.Bullet,
				1,
			),
			this.Actor.CapsuleComponent.SetCollisionResponseToChannel(
				QueryTypeDefine_1.KuroCollisionChannel.BulletSpecial,
				1,
			),
			t &&
				(this.Actor.CapsuleComponent.KuroAddPassiveProxyChannel(
					QueryTypeDefine_1.KuroCollisionChannel.Bullet,
				),
				this.Actor.CapsuleComponent.KuroAddPassiveProxyChannel(
					QueryTypeDefine_1.KuroCollisionChannel.BulletSpecial,
				)),
			(this.IsPartHitInternal = t),
			this.NFr(this.Actor.CapsuleComponent),
			this.Actor.Mesh.SetCollisionObjectType(
				QueryTypeDefine_1.KuroCollisionChannel.PhysicsBody,
			),
			this.Actor.Mesh.SetCollisionResponseToChannels(e);
	}
	TeleportAndFindStandLocation(t) {
		this.FixBornLocation("传送到目前位置", !0, t, !0) ||
			this.TeleportTo(
				t.ToUeVector(),
				this.ActorRotationProxy.ToUeRotator(),
				"传送到目前位置失败,直接设置位置",
			);
	}
	TFr() {
		switch (this.Actor.CharacterMovement.DefaultLandMovementMode) {
			case 1:
			case 2:
			case 0:
			case 3:
				this.FixBornLocation("实体初始化.地面修正");
		}
	}
	FixBornLocation(
		t = "unknown.FixBornLocation",
		e = !0,
		o = void 0,
		r = !1,
		a = !1,
	) {
		return (
			!!(o = this.FixActorLocation(
				exports.FIX_SPAWN_TRACE_HEIGHT,
				e,
				o,
				t,
				a,
			))[0] &&
			(r
				? this.TeleportTo(
						o[1].ToUeVector(),
						this.ActorRotationProxy.ToUeRotator(),
						t,
					)
				: this.SetActorLocation(o[1].ToUeVector(), t, !1),
			e &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					3,
					"[CharacterActorComponent.FixBornLocation] 实体地面修正:后",
					["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
					["PbDataId", this.CreatureDataInternal.GetPbDataId()],
					["K2_GetActorLocation", this.Actor.K2_GetActorLocation()],
					["Context", t],
				),
			!0)
		);
	}
	FixSwitchLocation(t = "unknown.FixSwitchLocation", e = !0, o = !1) {
		return (
			!!(o = this.FixActorLocation(
				exports.FIX_SPAWN_TRACE_HEIGHT,
				e,
				void 0,
				t,
				!1,
				o,
			))[0] &&
			(this.SetActorLocation(o[1].ToUeVector(), t, !1),
			e &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					3,
					"[CharacterActorComponent.FixSwitchLocation] 实体地面修正:后",
					["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
					["PbDataId", this.CreatureDataInternal.GetPbDataId()],
					["K2_GetActorLocation", this.Actor.K2_GetActorLocation()],
					["Context", t],
				),
			!0)
		);
	}
	RestoreDefaultController() {
		this.uFr ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					58,
					"[CharacterActorComponent.RestoreDefaultController] 没有DefaultController,将导致这个实体部分功能失效比如移动,查看OnStart 有无正常初始化DefaultController",
					["Id", this.Entity.Id],
				)),
			this.uFr.Possess(this.Actor);
	}
	get ActorVelocityProxy() {
		return (
			this.CFr < Time_1.Time.Frame &&
				((this.CFr = Time_1.Time.Frame),
				this.dFr.DeepCopy(this.Actor.GetVelocity())),
			this.dFr
		);
	}
	get IsActorMoveInfoCache() {
		return !(
			this.CachedLocationTime < Time_1.Time.Frame ||
			this.CachedRotationTime < Time_1.Time.Frame ||
			this.CFr < Time_1.Time.Frame
		);
	}
	get ActorVelocity() {
		return this.ActorVelocityProxy.ToUeVector();
	}
	get DefaultRadius() {
		return this.DefaultRadiusInternal;
	}
	get DefaultHalfHeight() {
		return this.DefaultHalfHeightInternal;
	}
	get IsDefaultCapsule() {
		return this.fFr;
	}
	GetRadius() {
		return this.RadiusInternal;
	}
	get FloorLocation() {
		return (
			this.gFr.FromUeVector(this.ActorLocationProxy),
			(this.gFr.Z -= this.ScaledHalfHeight),
			this.gFr
		);
	}
	SetRadiusAndHalfHeight(t, e, o = !0) {
		(this.fFr = !1),
			(this.RadiusInternal = t),
			(this.HalfHeightInternal = e),
			this.Actor.CapsuleComponent.SetCapsuleRadius(t, o),
			this.Actor.CapsuleComponent.SetCapsuleHalfHeight(e, o);
	}
	ResetCapsuleRadiusAndHeight() {
		this.SetRadiusAndHalfHeight(
			this.DefaultRadiusInternal,
			this.DefaultHalfHeightInternal,
			!0,
		);
		var t = this.ActorLocationProxy,
			e = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation,
			o =
				(e.Set(
					t.X,
					t.Y,
					t.Z + Math.max(0, this.ScaledHalfHeight - this.ScaledRadius),
				),
				ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation);
		o.Set(
			t.X,
			t.Y,
			t.Z - Math.max(0, this.ScaledHalfHeight - this.ScaledRadius),
		),
			this.FixBornLocationInternal(
				t,
				e,
				o,
				!0,
				!0,
				"CharacterActorComponent.ResetCapsuleRadiusAndHeight",
			),
			(this.fFr = !0);
	}
	ChangeMeshAnim(t, e) {
		TimerSystem_1.TimerSystem.Next(() => {
			ControllerHolder_1.ControllerHolder.CreatureController.ChangeMeshAnim(
				this.Actor.Mesh,
				t,
				e,
			),
				this.Actor.CharRenderingComponent.Init(this.Actor.RenderType),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharChangeMeshAnim,
				);
		});
	}
	IsWorldOwner() {
		return (
			!!this.CreatureDataInternal &&
			ModelManager_1.ModelManager.CreatureModel.GetWorldOwner() ===
				this.CreatureDataInternal.GetPlayerId()
		);
	}
	ClearInput() {
		this.SetInputDirect(Vector_1.Vector.ZeroVector),
			this.SetInputRotator(this.ActorRotationProxy),
			this.SetOverrideTurnSpeed(0);
	}
	wFr() {
		var t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
			this.Actor.GetClass(),
		);
		const e = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t),
			o =
				ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
					e,
				)?.PartHitEffect.ToAssetPathName();
		let r = void 0 !== o && 0 < o.length && "None" !== o;
		r
			? ResourceSystem_1.ResourceSystem.LoadAsync(
					o,
					UE.BP_PartHitEffect_C,
					(t) => {
						if (this.Actor?.IsValid()) {
							if (
								((this.RFr = t), (r = this.RFr?.IsValid() ?? !1) && this.Actor)
							) {
								let t = this.RFr.PartCollision.Num();
								for (let e = 0; e < t; e++) {
									var a = this.RFr.PartCollision.Get(e);
									this.LFr.set(a.BoneName, a);
								}
								(r = !1), (t = this.Actor.Mesh.GetNumChildrenComponents());
								for (let e = 0; e < t; e++) {
									var i = this.Actor.Mesh.GetChildComponent(e),
										n = i.GetName(),
										s = this.LFr.get(n);
									this.DFr.set(n, i),
										s
											? ((r = !0),
												(i.bGenerateOverlapEvents = !0),
												this.SetPartPassiveCollision(i, !1),
												this.SetPartCollisionSwitch(
													n,
													s.IsBlockPawn,
													s.IsBulletDetect,
													s.IsBlockCamera,
												))
											: Log_1.Log.CheckDebug() &&
												Log_1.Log.Debug(
													"Character",
													21,
													"部位缺少配置",
													["PartHitEffect路径", o],
													["Component Name", n],
												);
								}
								(t = this.RFr.AimParts.Num()), this.AimParts.clear();
								for (let e = 0; e < t; ++e) {
									var l = new AimPart(this.RFr.AimParts.Get(e), this);
									this.AimParts.set(l.BoneNameString, l);
								}
								(t = this.RFr.LockOnParts.Num()), this.LockOnParts.clear();
								for (let e = 0; e < t; ++e) {
									var h = new LockOnPart(this.RFr.LockOnParts.Get(e));
									this.LockOnParts.set(h.BoneNameString, h);
								}
								for (const t of oldLockOnPartNames) {
									var c;
									this.LockOnParts.get(t.toString()) ||
										(this.Actor.Mesh.DoesSocketExist(t) &&
											((c = new LockOnPart(t)),
											this.LockOnParts.set(c.BoneNameString, c)));
								}
								(this.StartHideDistance = this.RFr.StartHideDistance),
									(this.CompleteHideDistance = this.RFr.CompleteHideDistance),
									(this.StartDitherValue = this.RFr.StartDitherValue),
									(this.LockOnConfig = new LockOnConfig(this.RFr.LockOnConfig));
							} else
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Character",
										21,
										"没配置PartHit",
										["BP路径", e],
										["Actor是否为空", void 0 === this.Actor],
									);
							(this.Actor.CapsuleComponent.CanCharacterStepUpOn = 0),
								this.GFr(r);
						}
					},
				)
			: ((this.Actor.CapsuleComponent.CanCharacterStepUpOn = 0), this.GFr(r));
	}
	GetBoneLocation(t) {
		var e = this.DFr.get(t);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						21,
						"GetBoneLocation",
						["Character", this.Actor.GetName()],
						["Bone", t],
					)),
			e.K2_GetComponentLocation()
		);
	}
	qFr() {
		var t = this.CreatureDataInternal.GetModelConfig();
		t &&
			t?.IsHiddenWithCamera &&
			this.Actor.CharRenderingComponent.SetCapsuleDither(1);
	}
	SetMoveControlled(t, e = 2, o = "") {
		(this.vFr = !0),
			(this.MFr = e),
			this.IsMoveAutonomousProxy !== t &&
				(t
					? (this.SetMoveAutonomous(!0, o),
						(e = this.Entity.GetComponent(36)) &&
							(e.StopAllAddMove(),
							e.SetAddMoveOffset(void 0),
							e.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy)),
						this.Entity.GetComponent(57)?.ClearReplaySamples())
					: this.SetMoveAutonomous(!1, o),
				this.Entity.GetComponent(41)?.ClearOrders());
	}
	ResetMoveControlled(t = "") {
		(this.vFr = !1),
			(this.MFr = 0),
			this.SetMoveAutonomous(this.IsAutonomousProxy, t);
	}
	SetAutonomous(t, e = void 0) {
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Control",
			this.Entity,
			"设置逻辑主控",
			["v", t],
		),
			super.SetAutonomous(t, e);
	}
	SetMoveAutonomous(t, e = "") {
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Control",
			this.Entity,
			"设置移动主控",
			[e, t],
		),
			super.SetMoveAutonomous(t),
			(e = this.Entity.GetComponent(160)) &&
				(e.MainAnimInstance?.SetStateMachineNetMode(!t),
				e.SpecialAnimInstance?.SetStateMachineNetMode(!t));
	}
	GetPartHitConf(t) {
		return this.LFr.get(t);
	}
	xFr() {
		var t;
		this.EntityType !== Protocol_1.Aki.Protocol.wks.Proto_Monster ||
			!(t =
				this.Entity.GetComponent(0)?.GetBaseInfo()?.Category
					?.MonsterMatchType) ||
			(3 !== t && 2 !== t) ||
			(this.pFr = !0);
	}
	SetPartPassiveCollision(t, e = !0) {
		(t.bKuroPassiveCollisionUpdateOverlapsWhenEnterOverlap = !0),
			t.KuroSetPassiveCollision(!0, e);
	}
	IsPartComponentEnable(t) {
		return !this.AFr.has(t) || this.AFr.get(t);
	}
	SetPartCollisionSwitch(t, e, o, r) {
		var a,
			i = this.DFr.get(t);
		i?.IsValid()
			? (this.NFr(i),
				((a =
					CollisionUtils_1.CollisionUtils.GetCollisionResponseContainer()).Pawn =
					a.GameTraceChannel5 =
					a.GameTraceChannel8 =
						e ? 2 : 1),
				(a.Camera = r ? 2 : 1),
				(a.GameTraceChannel6 = a.GameTraceChannel16 = o ? 1 : 0),
				this.AFr.set(t, o),
				i.SetCollisionResponseToChannels(a))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					21,
					"碰撞体不存在",
					["name", t],
					["character name", this.Actor.GetName()],
				);
	}
	GetPartConf(t) {
		return this.LFr.get(t);
	}
	BFr() {
		var t = this.Entity.GetComponent(0)?.GetEntityType();
		if (Protocol_1.Aki.Protocol.wks.Proto_Monster === t) {
			var e = this.Entity.GetComponent(185);
			if (this.LockOnConfig?.IsOpened)
				for (const t of lockOnEnhancedTags) e?.AddTag(t);
			if (
				((t = this.Entity.GetComponent(0)?.GetMonsterComponent()?.InitGasTag),
				t && 0 < t.length)
			)
				for (const r of t) {
					var o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r);
					o && e?.AddTag(o);
				}
		}
	}
	NFr(t) {
		this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Player ||
		0 === this.Entity.GetComponent(0)?.GetEntityCamp()
			? t.SetCollisionObjectType(
					QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
				)
			: 1 === this.Entity.GetComponent(0)?.GetEntityCamp()
				? t.SetCollisionObjectType(
						QueryTypeDefine_1.KuroCollisionChannel.PawnMonster,
					)
				: t.SetCollisionObjectType(QueryTypeDefine_1.KuroCollisionChannel.Pawn);
	}
	SetInitLocation(t) {
		BlackboardController_1.BlackboardController.SetVectorValueByEntity(
			this.Entity.Id,
			"InitLocation",
			t.X,
			t.Y,
			t.Z,
		);
	}
	GetInitLocation() {
		return BlackboardController_1.BlackboardController.GetVectorValueByEntity(
			this.Entity.Id,
			"InitLocation",
		);
	}
	get WanderDirectionType() {
		var t;
		return (
			3 === this.gIn &&
				((t = this.Entity.GetComponent(161)?.MovementData),
				(this.gIn = t?.WanderDirection ?? 0)),
			this.gIn
		);
	}
	GetWanderDirection(t, e, o) {
		return (
			this.Lz.DeepCopy(t),
			1 === o && this.Lz.MultiplyEqual(-1),
			2 !== this.WanderDirectionType ||
				((t = MathUtils_1.MathUtils.WrapAngle(
					MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz) -
						this.ActorRotationProxy.Yaw,
				)),
				Math.abs(Math.abs(t) - 90) < 10) ||
				(this.Lz.CrossProduct(this.ActorUpProxy, this.Lz),
				0 < e.Y && this.Lz.MultiplyEqual(-1)),
			this.Lz
		);
	}
	GetNearestDirection(t, e) {
		if (
			(this.Lz.DeepCopy(t),
			2 === this.WanderDirectionType &&
				((t = MathUtils_1.MathUtils.WrapAngle(
					MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz) -
						this.ActorRotationProxy.Yaw,
				)),
				Math.abs(Math.abs(t) - 90) < 10))
		)
			return this.ActorForwardProxy;
		switch (e) {
			case 0:
				break;
			case 1:
				this.Lz.UnaryNegation(this.Lz);
				break;
			case 2:
				this.Lz.CrossProduct(this.ActorUpProxy, this.Lz);
				break;
			case 3:
				this.Lz.MultiplyEqual(-1),
					this.Lz.CrossProduct(this.ActorUpProxy, this.Lz);
		}
		return this.Lz;
	}
	InputWanderDirection(t, e) {
		if (t.IsNearlyZero()) this.SetInputDirect(Vector_1.Vector.ZeroVector);
		else if (0 === this.WanderDirectionType) this.SetInputDirect(t);
		else {
			let t = !0;
			if (
				Time_1.Time.Now - this.fIn[1] <
				CommonDefine_1.MILLIONSECOND_PER_SECOND
			)
				t = this.fIn[0];
			else {
				if (1 === this.WanderDirectionType) t = 0 < e.X;
				else {
					if (2 !== this.WanderDirectionType) return;
					t = 0 < e.Y;
				}
				this.fIn[0] !== t &&
					((this.fIn[0] = t), (this.fIn[1] = Time_1.Time.Now));
			}
			switch (this.WanderDirectionType) {
				case 1:
					t
						? this.SetInputDirect(this.ActorForwardProxy)
						: (this.Lz.DeepCopy(this.ActorForwardProxy),
							this.Lz.MultiplyEqual(-1),
							this.SetInputDirect(this.Lz));
					break;
				case 2:
					t
						? this.SetInputDirect(this.ActorRightProxy)
						: (this.Lz.DeepCopy(this.ActorRightProxy),
							this.Lz.MultiplyEqual(-1),
							this.SetInputDirect(this.Lz));
			}
		}
	}
	SetOtherMeshCollisionEnabled(t, e) {
		return (
			(e = this.DisableMeshCollisionEnabledHandle.Disable(
				e,
				this.constructor.name,
			)),
			this.ActorInternal?.IsValid() && this.Actor.Mesh.SetCollisionEnabled(t),
			e
		);
	}
	ResetMeshEnableCollision(t) {
		return (
			(t = this.DisableMeshCollisionEnabledHandle.Enable(
				t,
				this.constructor.name,
			)) &&
				this.ActorInternal?.IsValid() &&
				0 !== this.Actor.Mesh.GetCollisionEnabled() &&
				this.Actor.Mesh.SetCollisionEnabled(0),
			t
		);
	}
	SetMeshCollisionEnabled(t, e) {
		return 0 !== t
			? !this.UFr && ((this.UFr = this.SetOtherMeshCollisionEnabled(t, e)), !0)
			: !(
					!this.UFr ||
					(this.ResetMeshEnableCollision(this.UFr), (this.UFr = void 0))
				);
	}
	SetOtherMeshCollisionObjectType(t, e) {
		return (
			(e = this.DisableMeshCollisionObjectTypeHandle.Disable(
				e,
				this.constructor.name,
			)),
			this.ActorInternal?.IsValid() &&
				this.Actor.Mesh.SetCollisionObjectType(t),
			e
		);
	}
	ResetMeshCollisionObjectType(t) {
		return (
			(t = this.DisableMeshCollisionObjectTypeHandle.Enable(
				t,
				this.constructor.name,
			)) &&
				this.ActorInternal?.IsValid() &&
				2 !== this.Actor.Mesh.GetCollisionObjectType() &&
				this.Actor.Mesh.SetCollisionObjectType(2),
			t
		);
	}
	SetMeshCollisionObjectType(t, e) {
		return 2 !== t
			? !this.MeshHandleForCollisionType &&
					((this.MeshHandleForCollisionType =
						this.SetOtherMeshCollisionObjectType(t, e)),
					!0)
			: !(
					!this.MeshHandleForCollisionType ||
					(this.ResetMeshCollisionObjectType(this.MeshHandleForCollisionType),
					(this.MeshHandleForCollisionType = void 0))
				);
	}
	GetSocketTransform(t) {
		if (!FNameUtil_1.FNameUtil.IsNothing(t)) {
			var e = this.Actor;
			if (e.Mesh.DoesSocketExist(t)) return e.Mesh.GetSocketTransform(t, 0);
		}
		return this.ActorTransform;
	}
	GetSocketLocation(t) {
		if (!FNameUtil_1.FNameUtil.IsNothing(t)) {
			var e = this.Actor.Mesh;
			if (e.DoesSocketExist(t)) return e.GetSocketLocation(t);
		}
		return this.ActorLocation;
	}
	SetActorXRayState(t) {
		this.IsRoleAndCtrlByMe &&
			(this.Actor.Mesh?.SetRenderInKuroXRayPass(t),
			this.v9s?.forEach((e) => {
				e?.SetRenderInKuroXRayPass(t);
			}));
	}
	SetActorXRayColor(t) {
		this.IsRoleAndCtrlByMe &&
			(this.Actor.Mesh?.SetKuroXRayColor(t),
			this.v9s?.forEach((e) => {
				e?.SetKuroXRayColor(t);
			}));
	}
	SetSceneTrailState(t) {
		this.SkeletalMesh && this.SkeletalMesh.SetRenderKuroTrail(t);
	}
	AddExtraSkeletalMeshComponent(t) {
		this.v9s || (this.v9s = []), this.v9s.push(t);
	}
	GetExtraSkeletalMeshComponent() {
		return this.v9s;
	}
	AGn(t) {
		if (
			GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
				.bEnableWorldPartition
		)
			if (t) {
				const e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
					GlobalData_1.GlobalData.World,
					UE.WorldPartitionSubsystem.StaticClass(),
				);
				t = new UE.WorldPartitionStreamingQuerySource(
					t,
					1e3,
					!1,
					!1,
					void 0,
					!1,
					!0,
					void 0,
				);
				const o = UE.NewArray(UE.WorldPartitionStreamingQuerySource);
				o.Add(t),
					this.TGn && TimerSystem_1.TimerSystem.Remove(this.TGn),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("World", 7, "等待物理流送(开始)", [
							"PbDataId:",
							this.CreatureData.GetPbDataId(),
						]),
					(this.TGn = TimerSystem_1.TimerSystem.Forever(() => {
						e.IsStreamingCompletedWithPhysicsReady(1, o) &&
							(Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("World", 7, "等待物理流送(结束)", [
									"PbDataId:",
									this.CreatureData?.GetPbDataId(),
								]),
							this.Entity?.Valid) &&
							(TimerSystem_1.TimerSystem.Remove(this.TGn),
							(this.TGn = void 0),
							this.LGn ? this.bFr() : this.UGn());
					}, 500));
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						7,
						"[WaitForPhysicStreaming]location参数无效,无法生成实体",
						["PbDataId", this.CreatureData.GetPbDataId()],
					);
		else this.UGn();
	}
	UGn() {
		this.bFr(),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharMovementModeChanged,
				this.Entity.Id,
				this.Actor.CharacterMovement.DefaultLandMovementMode,
				this.Actor.CharacterMovement.MovementMode,
				0,
				0,
			);
		let t = !1;
		(t =
			!(
				ModelManager_1.ModelManager.GameModeModel.InstanceType ===
					Protocol_1.Aki.Protocol.sOs.Proto_BigWorldInstance &&
				!ModelManager_1.ModelManager.GameModeModel.RenderAssetDone
			) || t) && ((this.yFr = !0), this.TFr());
		var e = Protocol_1.Aki.Protocol.f_s.create(),
			o = this.Entity.GetComponent(0).GetCreatureDataId();
		(o =
			(e.sfs.push(MathUtils_1.MathUtils.NumberToLong(o)),
			Net_1.Net.Call(8784, e, (t) => {}),
			this.Entity.GetComponent(38))) &&
			o.SetLoadCompletePlayer(
				ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			),
			this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Player ||
			this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Vision
				? this.SetSceneTrailState(!0)
				: this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Npc &&
					(this.SetNpcBornMaterial(),
					this.SetNpcBornEffect(),
					this.Actor.CharRenderingComponent.UpdateNpcDitherComponent(),
					this.SetNpcShowState(!1, "出生默认隐藏"),
					this.Actor.DitherEffectController?.ForceResetDither()),
			this.qFr(),
			(this.LGn = !0),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharBornFinished,
			);
	}
});
(CharacterActorComponent.OFr = void 0),
	(CharacterActorComponent.Lz = Vector_1.Vector.Create()),
	(CharacterActorComponent = CharacterActorComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(3)],
			CharacterActorComponent,
		)),
	(exports.CharacterActorComponent = CharacterActorComponent);
