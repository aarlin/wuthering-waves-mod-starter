"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceMotionActor = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ModelUtil_1 = require("../../../Core/Utils/ModelUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	REVERTIME = 3e3;
class AdviceMotionActor {
	constructor() {
		(this.z6e = void 0),
			(this.ActorInternal = void 0),
			(this.SkeletalMeshInternal = void 0),
			(this.$6e = void 0),
			(this.Y6e = 0),
			(this.B8e = 0),
			(this.Td = !1),
			(this.i8e = () => {
				this.o8e(),
					this.SkeletalMeshInternal.SetHiddenInGame(!0),
					(this.z6e = void 0),
					ModelManager_1.ModelManager.AdviceModel.RecycleMotionActor(this),
					ModelManager_1.ModelManager.AdviceModel.RemovePlayingMotionEntity(
						this.B8e,
					);
			}),
			(this.OnActorDestroy = () => {
				this.jm(),
					this.ActorInternal?.IsValid() &&
						(ActorSystem_1.ActorSystem.Put(this.ActorInternal),
						(this.ActorInternal = void 0)),
					ModelManager_1.ModelManager.AdviceModel.RemovePlayingMotionEntity(
						this.B8e,
					),
					ModelManager_1.ModelManager.AdviceModel.RemoveMotionActor(this);
			});
	}
	PlayMotion(e) {
		(this.B8e = e),
			this.s8e(e, () => {
				this.b8e(e);
			});
	}
	s8e(e, t) {
		var i = (e = EntitySystem_1.EntitySystem.Get(e)).GetComponent(182);
		0 !==
			(e = e
				.GetComponent(0)
				.GetAdviceInfo()
				.GetAdviceData()
				.GetAdviceMotionId()) &&
			(this.ActorInternal ||
				((this.ActorInternal = ActorSystem_1.ActorSystem.Get(
					UE.Actor.StaticClass(),
					i.ActorTransform,
				)),
				(this.SkeletalMeshInternal = this.ActorInternal.AddComponentByClass(
					UE.SkeletalMeshComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
				)),
				(this.$6e = this.ActorInternal.AddComponentByClass(
					UE.CharRenderingComponent_C.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
				)),
				this.SkeletalMeshInternal.SetEnableGravity(!1),
				this.SkeletalMeshInternal.SetCollisionEnabled(0),
				this.SkeletalMeshInternal.SetSimulatePhysics(!1),
				this.$6e.Init(0)),
			this.ActorInternal.K2_SetActorRelativeLocation(
				i.ActorLocationProxy.ToUeVector(),
				!1,
				void 0,
				!0,
			),
			this.ActorInternal.K2_SetActorRotation(
				i.ActorRotationProxy.ToUeRotator(),
				!1,
			),
			(i = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(e)),
			(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i)),
			(i = ModelUtil_1.ModelUtil.GetModelConfig(e.MeshId)),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				i.网格体.ToAssetPathName(),
				UE.SkeletalMesh,
				(e, i) => {
					this.SkeletalMeshInternal?.SetSkeletalMesh(e),
						this.SkeletalMeshInternal?.SetHiddenInGame(!0),
						t();
				},
			),
			this.ActorInternal.OnDestroyed.Add(this.OnActorDestroy));
	}
	b8e(e) {
		if (
			(this.jm(),
			(this.Td = !0),
			this.o8e(),
			0 !==
				(e = EntitySystem_1.EntitySystem.Get(e)
					.GetComponent(0)
					.GetAdviceInfo()
					.GetAdviceData()
					.GetAdviceMotionId()))
		) {
			this.o8e();
			const t = this.SkeletalMeshInternal;
			e = ConfigManager_1.ConfigManager.MotionConfig.GetMotionAnimation(e);
			ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.AnimationAsset,
				(e, i) => {
					this.Td && t.PlayAnimation(e, !1), this.q8e();
				},
			),
				t.SetPlayRate(1),
				t.SetPosition(1),
				this.$6e.AddComponentByCase(0, this.SkeletalMeshInternal),
				this.$6e &&
					((e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceModelMat()),
					ResourceSystem_1.ResourceSystem.LoadAsync(
						e,
						UE.PD_CharacterControllerData_C,
						(e, t) => {
							this.Td && (this.Y6e = this.$6e.AddMaterialControllerData(e)),
								this.q8e();
						},
					)),
				ModelManager_1.ModelManager.AdviceModel.AddPlayingMotionEntity(
					this.B8e,
					this,
				);
		}
	}
	q8e() {
		const e = this.SkeletalMeshInternal;
		e &&
			this.Td &&
			0 < this.Y6e &&
			TimerSystem_1.TimerSystem.Delay(() => {
				e &&
					this.Td &&
					0 < this.Y6e &&
					(e.SetHiddenInGame(!1),
					(this.z6e = TimerSystem_1.TimerSystem.Delay(this.i8e, 3e3)));
			}, TimerSystem_1.MIN_TIME);
	}
	jm() {
		(this.Td = !1),
			void 0 !== this.z6e &&
				(TimerSystem_1.TimerSystem.Remove(this.z6e), (this.z6e = void 0));
	}
	o8e() {
		this.$6e &&
			0 < this.Y6e &&
			(this.$6e.RemoveMaterialControllerDataWithEnding(this.Y6e),
			(this.Y6e = 0));
	}
}
exports.AdviceMotionActor = AdviceMotionActor;
