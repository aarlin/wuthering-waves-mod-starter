"use strict";
var SceneItemDropItemComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, o, i) {
			var n,
				a = arguments.length,
				r =
					a < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, o))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				r = Reflect.decorate(t, e, o, i);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(n = t[s]) &&
						(r = (a < 3 ? n(r) : 3 < a ? n(e, o, r) : n(e, o)) || r);
			return 3 < a && r && Object.defineProperty(e, o, r), r;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemDropItemComponent = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RewardController_1 = require("../../Module/Reward/RewardController"),
	ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
	LINEARDAMPING = 0,
	ANGULARDAMPING = 0,
	CHECK_WATER_OFFSET_Z = 10,
	COLLISION_PROFILE_NAME = new UE.FName("DropItem"),
	PICKUP_AUDIO_EVENT_NAME = "play_ui_fb_pickup",
	PHYSICAL_MATERIAL_PATH =
		"/Game/Aki/Scene/PhysMaterial/PM_DropItem.PM_DropItem",
	PARABOLIC_EFFECT =
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_Xingxing_001.DA_Fx_Xingxing_001",
	BORN_EFFECTS = [
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_001.DA_Fx_UI_Sence_Diaoluo_001",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_002.DA_Fx_UI_Sence_Diaoluo_002",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_003.DA_Fx_UI_Sence_Diaoluo_003",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_004.DA_Fx_UI_Sence_Diaoluo_004",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_005.DA_Fx_UI_Sence_Diaoluo_005",
	],
	TRAIL_EFFECTS = [
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_001.DA_Fx_UI_Sence_Trail_001",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_002.DA_Fx_UI_Sence_Trail_002",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_003.DA_Fx_UI_Sence_Trail_003",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_004.DA_Fx_UI_Sence_Trail_004",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_005.DA_Fx_UI_Sence_Trail_005",
	],
	DESTROY_EFFECTS = [
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_001.DA_Fx_UI_Sence_Xiaosan_001",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_002.DA_Fx_UI_Sence_Xiaosan_002",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_003.DA_Fx_UI_Sence_Xiaosan_003",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_004.DA_Fx_UI_Sence_Xiaosan_004",
		"/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_005.DA_Fx_UI_Sence_Xiaosan_005",
	];
class DropItemData {
	constructor() {
		(this.ConfigId = 0),
			(this.Config = void 0),
			(this.ItemCount = 0),
			(this.ShowPlanId = 0),
			(this.AdsorptionType = void 0),
			(this.StartSpeed = -0),
			(this.RotationProtectTime = -0),
			(this.AdsorptionTime = 0),
			(this.AdsorptionProtectTime = 0.2),
			(this.QualityIndex = -0),
			(this.DropState = 0),
			(this.MeshIsInited = !1),
			(this.DropFinished = !1);
	}
}
let SceneItemDropItemComponent = (SceneItemDropItemComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.Vpr = void 0),
			(this.Hte = void 0),
			(this.pCn = !1),
			(this.vCn = !1),
			(this.MCn = 0),
			(this.dqt = void 0),
			(this.SCn = void 0),
			(this.ECn = void 0),
			(this.yCn = void 0),
			(this.ICn = Vector_1.Vector.Create()),
			(this.cjr = (t) => {
				this.dqt &&
					!this.dqt.DropFinished &&
					this.dqt.MeshIsInited &&
					((t /= CommonDefine_1.MILLIONSECOND_PER_SECOND),
					this.CheckDropRotation(t),
					this.TCn(t));
			}),
			(this.LCn = () => {
				0 <= this.Hte.StaticMesh.GetComponentVelocity().Z ||
					((this.dqt.DropState = 1),
					this.ICn.DeepCopy(this.Hte.ActorLocationProxy),
					this.Hte.StaticMesh.SetNotifyRigidBodyCollision(!1));
			}),
			(this.DCn = () => {
				var t = this.Hte.StaticMesh.GetComponentVelocity(),
					e = ConfigManager_1.ConfigManager.RewardConfig.GetFallToGroundSpeed();
				(!this.RCn() &&
					(this.ICn.DeepCopy(this.Hte.ActorLocationProxy),
					t.Size() >= Math.pow(e, 2))) ||
					(this.Hte.StaticMesh.SetSimulatePhysics(!1),
					this.Hte.StaticMesh.SetUseCCD(!1),
					EffectSystem_1.EffectSystem.IsValid(this.MCn) &&
						EffectSystem_1.EffectSystem.StopEffectById(
							this.MCn,
							"[SceneItemDropItemComponent.DownProcess]",
							!0,
						),
					(this.MCn = EffectSystem_1.EffectSystem.SpawnEffect(
						GlobalData_1.GlobalData.World,
						this.Hte.ActorTransform,
						BORN_EFFECTS[this.dqt.QualityIndex],
						"[SceneItemDropItemComponent.DownProcess]",
						new EffectContext_1.EffectContext(this.Entity.Id),
					)),
					EffectSystem_1.EffectSystem.IsValid(this.MCn) &&
						EffectSystem_1.EffectSystem.GetEffectActor(
							this.MCn,
						)?.K2_AttachToComponent(
							this.Hte.StaticMesh,
							FNameUtil_1.FNameUtil.EMPTY,
							2,
							1,
							0,
							!0,
						),
					(this.dqt.DropState = 2));
			}),
			(this.ACn = (t) => {
				0 === this.dqt.AdsorptionType
					? (this.dqt.DropState = 4)
					: ((this.dqt.AdsorptionProtectTime -= t),
						0 < this.dqt.AdsorptionProtectTime ||
							(this.UCn(), (this.dqt.DropState = 3)));
			}),
			(this.PCn = (t) => {
				this.dqt.AdsorptionTime += t;
				var e,
					o,
					i = ConfigManager_1.ConfigManager.RewardConfig.GetMaxAdsorption();
				this.dqt.AdsorptionTime > i
					? this.xCn()
					: (i = Global_1.Global.BaseCharacter) &&
						((e = SceneItemDropItemComponent_1.cz),
						(o = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(
							i.CharacterActorComponent.ActorLocationProxy,
						),
						o.Subtraction(this.Hte.ActorLocationProxy, e),
						(i = e.SizeSquared()),
						(o =
							ConfigManager_1.ConfigManager.RewardConfig.GetPickUpInBagRange()),
						i < Math.pow(o, 2)
							? this.xCn()
							: i > Math.pow(this.dqt.StartSpeed * t, 2) &&
								(e.Normalize(),
								e.MultiplyEqual(this.dqt.StartSpeed * t),
								e.AdditionEqual(this.Hte.ActorLocationProxy),
								this.Hte.StaticMesh.K2_SetWorldLocation(
									e.ToUeVector(),
									!1,
									void 0,
									!1,
								),
								(o =
									ConfigManager_1.ConfigManager.RewardConfig.GetDropItemAcceleration()),
								(this.dqt.StartSpeed = this.dqt.StartSpeed + o)));
			}),
			(this.wCn = () => {
				var t,
					e,
					o = Global_1.Global.BaseCharacter;
				o &&
					((t = SceneItemDropItemComponent_1.cz),
					(e = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(
						o.CharacterActorComponent.ActorLocationProxy,
					),
					e.Subtraction(this.Hte.ActorLocationProxy, t),
					(o =
						ConfigManager_1.ConfigManager.RewardConfig.GetDropItemPickUpRange()),
					t.SizeSquared() > Math.pow(o, 2)) &&
					this.xCn();
			});
	}
	get DropItemConfig() {
		return this.dqt;
	}
	OnClear() {
		return (
			EffectSystem_1.EffectSystem.IsValid(this.MCn) &&
				(EffectSystem_1.EffectSystem.StopEffectById(
					this.MCn,
					"[SceneItemDropItemComponent.OnClear]",
					!0,
				),
				(this.MCn = 0)),
			this.yCn &&
				(TimerSystem_1.TimerSystem.Remove(this.yCn), (this.yCn = void 0)),
			this.ECn &&
				(EventSystem_1.EventSystem.Has(
					EventDefine_1.EEventName.DropItemStarted,
					this.ECn,
				) &&
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.DropItemStarted,
						this.ECn,
					),
				(this.ECn = void 0)),
			!0
		);
	}
	OnInitData() {
		this.Vpr = this.Entity.GetComponent(0);
		var t = this.Vpr.ComponentDataMap.get("Yvs");
		return (
			!!t &&
			(this.pie(t.Yvs), !!this.dqt) &&
			(this.BCn(t.Yvs) && (this.pCn = !0), !0)
		);
	}
	OnStart() {
		return (
			(this.Hte = this.Entity.GetComponent(182)),
			this.InitDropStateFunction(),
			!0
		);
	}
	OnActivate() {
		(this.vCn = !0),
			this.pCn && (this.bCn(), this.Hte?.Owner?.SetActorHiddenInGame(!1)),
			!Info_1.Info.EnableForceTick &&
				this.Active &&
				ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
					this,
					this.cjr,
				);
	}
	OnEnable() {
		!Info_1.Info.EnableForceTick &&
			this.Entity?.IsInit &&
			ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
				this,
				this.cjr,
			);
	}
	OnDisable(t) {
		Info_1.Info.EnableForceTick ||
			ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
				this,
			);
	}
	OnEnd() {
		return (
			Info_1.Info.EnableForceTick ||
				ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
					this,
				),
			!0
		);
	}
	pie(t) {
		var e,
			o = t.G3n,
			i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
				o,
				!0,
			);
		i
			? i.Mesh
				? ((this.dqt = new DropItemData()),
					(this.dqt.ConfigId = o),
					(this.dqt.Config = i),
					(this.dqt.ItemCount = t.g5n),
					(this.dqt.ShowPlanId = t.r6n),
					(t = (e = ConfigManager_1.ConfigManager.RewardConfig).GetDropShowPlan(
						t.r6n,
					)),
					(this.dqt.AdsorptionType = t?.Adsorption),
					(this.dqt.StartSpeed = e.GetSpeed()),
					(this.dqt.RotationProtectTime = e.GetDropRotationProtectTime()),
					(t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
						i.QualityId,
					)),
					(this.dqt.QualityIndex = t.Id - 1))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("World", 11, "掉落配置查询Mesh字段配置为空", [
						"道具id",
						o,
					])
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("World", 11, "掉落配置查询数据为空", ["道具id", o]);
	}
	BCn(t) {
		if (!t.jkn) return !0;
		if (
			!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				t.jkn,
			))
		)
			return !0;
		if (
			t.Entity.GetComponent(0).GetEntityType() !==
			Protocol_1.Aki.Protocol.HBs.Proto_Monster
		)
			return !0;
		var e = CommonParamById_1.configCommonParamById.GetFloatConfig(
			"drop_item_show_time",
		);
		e &&
			(this.yCn = TimerSystem_1.TimerSystem.Delay(() => {
				(this.yCn = void 0), this.qCn();
			}, e * CommonDefine_1.MILLIONSECOND_PER_SECOND));
		const o = t.Id;
		return (
			(this.ECn = (t) => {
				o === t && this.qCn();
			}),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.DropItemStarted,
				this.ECn,
			),
			!1
		);
	}
	qCn() {
		this.yCn &&
			(TimerSystem_1.TimerSystem.Remove(this.yCn), (this.yCn = void 0)),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.DropItemStarted,
				this.ECn,
			) &&
				(EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.DropItemStarted,
					this.ECn,
				),
				(this.ECn = void 0)),
			this.pCn ||
				((this.pCn = !0),
				this.vCn &&
					(this.bCn(), this.Entity?.IsInit) &&
					this.Hte?.Owner &&
					this.Hte.Owner.SetActorHiddenInGame(!1));
	}
	bCn() {
		this.uln(), this.GCn(), this.NCn();
	}
	OCn() {
		var t = this.Hte.Owner.GetComponentByClass(
				UE.SphereComponent.StaticClass(),
			),
			e = this.Hte.ActorLocationProxy,
			o = ConfigManager_1.ConfigManager.RewardConfig.GetDropChestOffsetZ(),
			i =
				((t = t.GetScaledSphereRadius()),
				ModelManager_1.ModelManager.RewardModel.CheckGroundHit(e, t, o)),
			n = MathUtils_1.MathUtils.CommonTempVector;
		n.FromUeVector(e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"World",
					7,
					"掉落初始位置修正前",
					["CreatureDataId", this.Vpr.GetCreatureDataId()],
					["EntityId", this.Entity.Id],
					["Location", n],
					["Radius", t],
				),
			i &&
				((n.Z += o),
				this.Hte.SetActorLocation(n.ToUeVector(), this.constructor.name, !1),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info(
					"World",
					7,
					"掉落初始位置修正后",
					["CreatureDataId", this.Vpr.GetCreatureDataId()],
					["EntityId", this.Entity.Id],
					["Location", n],
					["zOffset", o],
				);
	}
	uln() {
		ResourceSystem_1.ResourceSystem.LoadAsync(
			this.dqt.Config.Mesh,
			UE.Object,
			(t, e) => {
				var o = this.Hte?.StaticMesh;
				o?.IsValid() &&
					t?.IsValid() &&
					(this.OCn(),
					(this.dqt.MeshIsInited = !0),
					t instanceof UE.StaticMesh &&
						(o.SetStaticMesh(t), o.SetReceivesDecals(!1)),
					o.SetLinearDamping(0),
					o.SetAngularDamping(0),
					o.SetEnableGravity(!0),
					(t = MathUtils_1.MathUtils.CommonTempVector).Set(
						2 * Math.random() - 1,
						2 * Math.random() - 1,
						2 * Math.random() - 1,
					),
					o.SetCenterOfMass(t.ToUeVector(), FNameUtil_1.FNameUtil.EMPTY),
					o.SetCollisionEnabled(2),
					o.SetSimulatePhysics(!0),
					o.SetCollisionProfileName(COLLISION_PROFILE_NAME),
					(t = this.Vpr.GetRotation().Yaw),
					(t = this.GetRandomForce(t)),
					o.AddImpulse(t.ToUeVector(), FNameUtil_1.FNameUtil.EMPTY, !0),
					(o.BodyInstance.bLockXRotation = !0),
					(o.BodyInstance.bLockYRotation = !0),
					o.SetConstraintMode(6),
					o.SetUseCCD(!0));
			},
		),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				PHYSICAL_MATERIAL_PATH,
				UE.PhysicalMaterial,
				(t, e) => {
					var o = this.Hte?.StaticMesh;
					o?.IsValid() &&
						t?.IsValid() &&
						t instanceof UE.PhysicalMaterial &&
						((t.Restitution =
							ConfigManager_1.ConfigManager.RewardConfig.GetRestitution()),
						(t.Friction =
							ConfigManager_1.ConfigManager.RewardConfig.GetFriction()),
						o.SetPhysMaterialOverride(t));
				},
			);
	}
	GCn() {
		var t = this.Hte.StaticMesh.GetRelativeTransform();
		(this.MCn = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
			GlobalData_1.GlobalData.World,
			t,
			PARABOLIC_EFFECT,
			"[SceneItemDropItemComponent.InitEffects]",
		)),
			EffectSystem_1.EffectSystem.IsValid(this.MCn) &&
				EffectSystem_1.EffectSystem.GetEffectActor(
					this.MCn,
				)?.K2_AttachToComponent(
					this.Hte.StaticMesh,
					FNameUtil_1.FNameUtil.EMPTY,
					2,
					0,
					0,
					!0,
				);
	}
	NCn() {
		var t,
			e = this.Entity.GetComponent(178);
		e &&
			(e = e.GetInteractController()) &&
			(((t = new LevelGameplayActionsDefine_1.ActionPickupDropItem()).EntityId =
				this.Entity.Id),
			e.AddClientInteractOption(t));
	}
	OnForceTick(t) {
		this.cjr(t);
	}
	InitDropStateFunction() {
		(this.SCn = new Map()),
			this.SCn.set(0, this.LCn),
			this.SCn.set(1, this.DCn),
			this.SCn.set(2, this.ACn),
			this.SCn.set(3, this.PCn),
			this.SCn.set(4, this.wCn);
	}
	GetRandomForce(t) {
		var e,
			o,
			i,
			n = this.dqt.ShowPlanId;
		return (n = ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(n))
			? (((e = MathUtils_1.MathUtils.CommonTempRotator).Pitch = 0),
				(o = n.Angle[0]),
				(i = n.Angle[1]),
				(e.Roll = MathUtils_1.MathUtils.GetRandomRange(o, i)),
				(o = n.VerticalAngle[0]),
				(i = n.VerticalAngle[1]),
				(e.Yaw = MathUtils_1.MathUtils.GetRandomRange(o, i)),
				(e.Yaw += t),
				(o = Vector_1.Vector.Create(Vector_1.Vector.UpVectorProxy)),
				e.Quaternion().RotateVector(o, o),
				(i = n.Force[0]),
				(t = n.Force[1]),
				o.MultiplyEqual(Math.random() * (t - i) + i))
			: Vector_1.Vector.UpVectorProxy;
	}
	TCn(t) {
		var e;
		this.Hte.SetActorLocation(this.Hte.StaticMesh.K2_GetComponentLocation()),
			this.kCn() ? this.xCn() : (e = this.SCn.get(this.dqt.DropState)) && e(t);
	}
	UCn() {
		this.Hte.StaticMesh.SetCollisionEnabled(0),
			EffectSystem_1.EffectSystem.IsValid(this.MCn) &&
				EffectSystem_1.EffectSystem.StopEffectById(
					this.MCn,
					"[SceneItemDropItemComponent.CreateAutoAttachEffect]",
					!0,
				),
			(this.MCn = EffectSystem_1.EffectSystem.SpawnEffect(
				GlobalData_1.GlobalData.World,
				this.Hte.ActorTransform,
				TRAIL_EFFECTS[this.dqt.QualityIndex],
				"[SceneItemDropItemComponent.CreateAutoAttachEffect]",
				new EffectContext_1.EffectContext(this.Entity.Id),
			)),
			EffectSystem_1.EffectSystem.GetEffectActor(
				this.MCn,
			)?.K2_AttachToComponent(
				this.Hte.StaticMesh,
				FNameUtil_1.FNameUtil.EMPTY,
				2,
				1,
				0,
				!0,
			);
	}
	CheckDropRotation(t) {
		0 < this.dqt.RotationProtectTime &&
			((this.dqt.RotationProtectTime -= t),
			this.dqt.RotationProtectTime <= 0) &&
			this.Hte.StaticMesh.SetConstraintMode(0);
	}
	kCn() {
		var t,
			e = Global_1.Global.BaseCharacter;
		return !(
			!e ||
			((e = e.CharacterActorComponent.ActorLocation),
			(t = ConfigManager_1.ConfigManager.RewardConfig.GetHeightProtect()),
			Math.abs(e.Z - this.Hte.ActorLocationProxy.Z) < t) ||
			0 < this.Hte.StaticMesh.GetComponentVelocity().Z
		);
	}
	RCn() {
		var t = this.Hte.ActorLocationProxy,
			e = this.Hte.Owner.GetComponentByClass(
				UE.SphereComponent.StaticClass(),
			).GetScaledSphereRadius();
		return (
			!!ModelManager_1.ModelManager.RewardModel.CheckWaterHit(
				this.ICn,
				t,
				10,
				e,
			) &&
			((this.dqt.DropFinished = !0),
			(this.dqt.DropState = 5),
			(t = this.Hte.StaticMesh).SetCollisionEnabled(0),
			t.SetConstraintMode(6),
			t.SetEnableGravity(!1),
			t.SetSimulatePhysics(!1),
			t.SetUseCCD(!1),
			!0)
		);
	}
	DestroyWithEffect() {
		this.Hte.StaticMesh.SetCollisionEnabled(0),
			ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
				!1,
				this.Hte.Entity.Id,
			),
			EffectSystem_1.EffectSystem.IsValid(this.MCn) &&
				(EffectSystem_1.EffectSystem.StopEffectById(
					this.MCn,
					"[SceneItemDropItemComponent.DestroyWithEffect]",
					!0,
				),
				(this.MCn = 0));
		var t = EffectSystem_1.EffectSystem.SpawnEffect(
			GlobalData_1.GlobalData.World,
			this.Hte.ActorTransform,
			DESTROY_EFFECTS[this.dqt.QualityIndex],
			"[SceneItemDropItemComponent.DestroyWithEffect]",
			new EffectContext_1.EffectContext(this.Entity.Id),
		);
		EffectSystem_1.EffectSystem.GetEffectActor(t)?.K2_AttachToComponent(
			this.Hte.StaticMesh,
			FNameUtil_1.FNameUtil.EMPTY,
			2,
			1,
			0,
			!0,
		),
			AudioSystem_1.AudioSystem.PostEvent("play_ui_fb_pickup"),
			this.Entity.Disable(
				"[SceneItemDropItemComponent.DestroyWithEffect] 播放销毁特效",
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.DelayRemoveEntityFinished,
				this.Entity,
			);
	}
	xCn() {
		(this.dqt.DropState = 5),
			RewardController_1.RewardController.PickUpFightDrop(
				this.Vpr.GetCreatureDataId(),
				this.Vpr.GetPbDataId(),
			),
			(this.dqt.DropFinished = !0);
	}
});
(SceneItemDropItemComponent.cz = Vector_1.Vector.Create()),
	(SceneItemDropItemComponent = SceneItemDropItemComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(133)],
			SceneItemDropItemComponent,
		)),
	(exports.SceneItemDropItemComponent = SceneItemDropItemComponent);
