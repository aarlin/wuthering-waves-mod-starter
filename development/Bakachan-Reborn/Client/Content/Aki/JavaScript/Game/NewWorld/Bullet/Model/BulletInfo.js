"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletInfo = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Transform_1 = require("../../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BulletConstant_1 = require("../BulletConstant"),
	BulletController_1 = require("../BulletController"),
	BulletCollisionInfo_1 = require("./BulletCollisionInfo"),
	BulletEffectInfo_1 = require("./BulletEffectInfo"),
	BulletMoveInfo_1 = require("./BulletMoveInfo"),
	BulletRayInfo_1 = require("./BulletRayInfo");
class BulletInfo {
	constructor() {
		(this.xe = 0),
			(this.Entity = void 0),
			(this.I7o = !1),
			(this.T7o = void 0),
			(this.Lo = void 0),
			(this.ActionInfoList = []),
			(this.NextActionInfoList = []),
			(this.PersistentActionList = []),
			(this.Actor = void 0),
			(this.ActorComponent = void 0),
			(this.ActionLogicComponent = void 0),
			(this.IsInit = !1),
			(this.NeedDestroy = !1),
			(this.IsDestroyByCharSkillEnd = !1),
			(this.GenerateTime = -0),
			(this.BulletCamp = 0),
			(this.ShakeNumbers = 0),
			(this.IsFrozen = !1),
			(this.FrozenTime = void 0),
			(this.L7o = void 0),
			(this.bEn = !1),
			(this.RandomPosOffset = Vector_1.Vector.Create()),
			(this.RandomInitSpeedOffset = Vector_1.Vector.Create()),
			(this.D7o = !1),
			(this.R7o = !1),
			(this.U7o = Vector_1.Vector.Create()),
			(this.gti = Rotator_1.Rotator.Create()),
			(this.InitPosition = Vector_1.Vector.Create()),
			(this.A7o = new Array()),
			(this.LiveTime = -0),
			(this.IsTimeNotEnough = !1),
			(this.Size = Vector_1.Vector.Create()),
			(this.P7o = Vector_1.Vector.Create()),
			(this.x7o = void 0),
			(this.CloseCollision = !1),
			(this.CollisionInfo = new BulletCollisionInfo_1.BulletCollisionInfo()),
			(this.w7o = Vector_1.Vector.Create()),
			(this.GetCollisionLocationFrame = 0),
			(this.IsCollisionRelativeLocationZero = !1),
			(this.IsCollisionRelativeRotationModify = !1),
			(this.MoveInfo = new BulletMoveInfo_1.BulletMoveInfo()),
			(this.EffectInfo = new BulletEffectInfo_1.BulletEffectInfo()),
			(this.B7o = 0),
			(this.b7o = void 0),
			(this.q7o = void 0),
			(this.o5o = void 0),
			(this.G7o = void 0),
			(this.N7o = void 0),
			(this.O7o = void 0),
			(this.k7o = void 0),
			(this.IsAutonomousProxy = !1),
			(this.AttackerCamp = 0),
			(this.AttackerPlayerId = 0),
			(this.SkillBoneName = void 0),
			(this.SkillLevel = 0),
			(this.TargetId = 0),
			(this.TargetIdLast = 0),
			(this.F7o = void 0),
			(this.V7o = void 0),
			(this.ParentBulletInfo = void 0),
			(this.ChildEntityIds = void 0),
			(this.ChildInfo = void 0),
			(this.ParentEffect = 0),
			(this.NeedNotifyChildrenWhenDestroy = !1),
			(this.HitNumberAll = 0),
			(this.EntityHitCount = new Map()),
			(this.CountByParent = !1),
			(this.TimeScaleList = void 0),
			(this.TimeScaleMap = void 0),
			(this.TimeScaleId = 0),
			(this.SummonSkillId = 0),
			(this.SummonAttackerId = 0),
			(this.SummonServerEntityId = 0),
			(this.BornFrameCount = void 0),
			(this.PreContextId = void 0),
			(this.ContextId = void 0),
			(this.K7o = () => {
				this.ClearAttacker(),
					BulletController_1.BulletController.DestroyBullet(
						this.BulletEntityId,
						!1,
					);
			}),
			(this.Q7o = () => {
				this.ClearTarget();
			}),
			(this.BornLocationOffset = Vector_1.Vector.Create());
	}
	get BulletEntityId() {
		return this.xe;
	}
	get HasCheckedPosition() {
		return this.I7o;
	}
	CheckedPosition() {
		this.I7o = !0;
	}
	get BulletInitParams() {
		return this.T7o;
	}
	get TransformCreate() {
		return this.T7o.InitialTransform;
	}
	get BaseVelocityEntityId() {
		return this.T7o.BaseVelocityId;
	}
	get BulletRowName() {
		return this.T7o.BulletRowName;
	}
	GetBaseVelocityTarget() {
		return EntitySystem_1.EntitySystem.Get(
			this.T7o.BaseVelocityId,
		)?.GetComponent(1);
	}
	get BulletDataMain() {
		return this.Lo;
	}
	get IsTensile() {
		return 2 === this.BulletDataMain.Move.FollowType;
	}
	get BaseTransformEntity() {
		var t;
		return (
			this.bEn ||
				this.L7o ||
				((t = ModelManager_1.ModelManager.CharacterModel.GetHandle(
					this.T7o.BaseTransformId,
				))?.Valid && (this.L7o = t),
				(this.bEn = !0)),
			this.L7o
		);
	}
	SetActorLocation(t) {
		isNaN(t.X) || isNaN(t.Y) || isNaN(t.Z)
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Bullet",
						18,
						"设置子弹坐标为Nan,直接销毁",
						["location", t],
						["BulletEntityId", this.BulletEntityId],
						["BulletRowName", this.BulletRowName],
					),
				BulletController_1.BulletController.DestroyBullet(
					this.BulletEntityId,
					!1,
				))
			: (this.U7o.FromUeVector(t), (this.D7o = !0));
	}
	SetActorRotation(t) {
		isNaN(t.Pitch) || isNaN(t.Yaw) || isNaN(t.Roll)
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Bullet",
						18,
						"设置子弹朝向为Nan,直接销毁",
						["rotation", t],
						["BulletEntityId", this.BulletEntityId],
						["BulletRowName", this.BulletRowName],
					),
				BulletController_1.BulletController.DestroyBullet(
					this.BulletEntityId,
					!1,
				))
			: (this.gti.FromUeRotator(t), (this.R7o = !0));
	}
	GetActorLocation() {
		return this.D7o ? this.U7o : this.ActorComponent.ActorLocationProxy;
	}
	GetActorRotation() {
		return this.R7o ? this.gti : this.ActorComponent.ActorRotationProxy;
	}
	GetActorForward(t) {
		this.R7o
			? this.gti.Vector(t)
			: t.FromUeVector(this.ActorComponent.ActorForwardProxy);
	}
	ActorRotateVector(t, o) {
		(this.R7o ? this.gti : this.ActorComponent.ActorRotationProxy)
			.Quaternion()
			.RotateVector(t, o);
	}
	AddBulletLocalRotator(t) {
		this.ApplyCacheLocationAndRotation(),
			this.ActorComponent.AddBulletLocalRotator(t);
	}
	ApplyCacheLocationAndRotation() {
		if (this.D7o)
			return this.R7o
				? (this.ActorComponent.SetActorLocationAndRotation(
						this.U7o.ToUeVector(),
						this.gti.ToUeRotator(),
						this.constructor.name,
						!1,
					),
					(this.D7o = !1),
					void (this.R7o = !1))
				: (this.ActorComponent.SetActorLocation(
						this.U7o.ToUeVector(),
						this.constructor.name,
						!1,
					),
					void (this.D7o = !1));
		this.R7o &&
			(this.ActorComponent.SetActorRotation(
				this.gti.ToUeRotator(),
				this.constructor.name,
				!1,
			),
			(this.R7o = !1));
	}
	ClearCacheLocationAndRotation() {
		(this.D7o = !1), (this.R7o = !1);
	}
	get Tags() {
		return this.A7o;
	}
	AddTag(t) {
		this.A7o.push(t.TagId);
	}
	AddTagId(t) {
		this.A7o.push(t);
	}
	HasTag(t) {
		if (this.A7o && 0 < this.A7o.length)
			for (const o of this.A7o) if (o === t.TagId) return !0;
		return !1;
	}
	HasTagId(t) {
		return !!this.A7o && this.A7o.includes(t);
	}
	get CenterLocation() {
		return (
			this.ActorComponent.ActorQuatProxy.RotateVector(
				this.CollisionInfo.CenterLocalLocation,
				this.P7o,
			),
			this.P7o.AdditionEqual(this.ActorComponent.ActorLocationProxy),
			this.P7o
		);
	}
	get RayInfo() {
		return (
			this.x7o || (this.x7o = new BulletRayInfo_1.BulletRayInfo()), this.x7o
		);
	}
	get CollisionRotator() {
		return this.CollisionInfo.CollisionComponent
			? this.CollisionInfo.CollisionComponent.K2_GetComponentRotation()
			: this.ActorComponent.ActorRotation;
	}
	get CollisionLocation() {
		return (
			this.GetCollisionLocationFrame < Time_1.Time.Frame &&
				((this.GetCollisionLocationFrame = Time_1.Time.Frame),
				!this.IsCollisionRelativeLocationZero &&
				this.CollisionInfo.CollisionComponent
					? this.w7o.FromUeVector(
							this.CollisionInfo.CollisionComponent.K2_GetComponentLocation(),
						)
					: this.w7o.FromUeVector(this.ActorComponent.ActorLocationProxy)),
			this.w7o
		);
	}
	get AttackerId() {
		return this.B7o;
	}
	get AttackerHandle() {
		return this.b7o;
	}
	get Attacker() {
		return this.b7o?.Entity;
	}
	ClearAttacker() {
		this.$7o(),
			(this.b7o = void 0),
			(this.q7o = void 0),
			(this.o5o = void 0),
			(this.G7o = void 0),
			(this.N7o = void 0),
			(this.O7o = void 0),
			(this.k7o = void 0);
	}
	get AttackerCreatureDataComp() {
		return this.q7o || (this.q7o = this.Attacker?.GetComponent(0)), this.q7o;
	}
	get AttackerActorComp() {
		return this.o5o || (this.o5o = this.Attacker?.GetComponent(3)), this.o5o;
	}
	get AttackerSkillComp() {
		return this.G7o || (this.G7o = this.Attacker?.GetComponent(33)), this.G7o;
	}
	get AttackerBuffComp() {
		return this.N7o || (this.N7o = this.Attacker?.GetComponent(157)), this.N7o;
	}
	get AttackerMoveComp() {
		return this.O7o || (this.O7o = this.Attacker?.GetComponent(161)), this.O7o;
	}
	get AttackerAudioComponent() {
		return this.k7o || (this.k7o = this.Attacker?.GetComponent(42)), this.k7o;
	}
	get Target() {
		if (this.F7o) return this.F7o?.Entity;
	}
	SetTargetById(t) {
		(t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t)),
			t?.Valid
				? (this.Y7o(), (this.F7o = t), (this.V7o = void 0), this.J7o())
				: this.ClearTarget();
	}
	ClearTarget() {
		this.Y7o(), (this.F7o = void 0), (this.TargetId = 0), (this.V7o = void 0);
	}
	get TargetActorComp() {
		return this.V7o || (this.V7o = this.Target?.GetComponent(1)), this.V7o;
	}
	GetLockOnTargetDynamic() {
		return this.b7o?.Entity?.GetComponent(29)
			?.GetCurrentTarget()
			?.Entity?.GetComponent(1);
	}
	get ParentEntityId() {
		return this.T7o.ParentId;
	}
	Init(t, o) {
		(this.T7o = t),
			(this.Lo = o),
			(this.ActionInfoList.length = 0),
			(this.NextActionInfoList.length = 0),
			(this.PersistentActionList.length = 0),
			(this.B7o = this.T7o.Owner?.Id),
			(this.b7o = ModelManager_1.ModelManager.CharacterModel.GetHandle(
				this.B7o,
			)),
			(this.IsInit = !1),
			(this.NeedDestroy = !1),
			(this.ShakeNumbers = 0),
			(this.HitNumberAll = 0),
			(this.GetCollisionLocationFrame = 0),
			(this.SkillBoneName = BulletConstant_1.BulletConstant.HitCase),
			(this.PreContextId = void 0),
			(this.ContextId = void 0),
			t.LocationOffset
				? (this.BornLocationOffset.FromUeVector(t.LocationOffset),
					this.BornLocationOffset.AdditionEqual(o.Base.BornPosition))
				: this.BornLocationOffset.FromUeVector(o.Base.BornPosition),
			this.eHo(),
			PerformanceController_1.PerformanceController
				.IsEntityTickPerformanceTest &&
				(this.BornFrameCount = UE.KismetSystemLibrary.GetFrameCount());
	}
	InitEntity(t) {
		(this.Entity = t), (this.xe = t.Id);
	}
	Clear() {
		(this.xe = 0),
			(this.Entity = void 0),
			(this.T7o = void 0),
			(this.Lo = void 0);
		var t = BulletController_1.BulletController.GetActionCenter();
		for (const o of this.ActionInfoList) t.RecycleBulletActionInfo(o);
		for (const o of this.NextActionInfoList) t.RecycleBulletActionInfo(o);
		for (const o of this.PersistentActionList) t.RecycleBulletAction(o);
		(this.ActionInfoList.length = 0),
			(this.NextActionInfoList.length = 0),
			(this.PersistentActionList.length = 0),
			(this.Actor = void 0),
			(this.ActorComponent = void 0),
			(this.ActionLogicComponent = void 0),
			(this.IsInit = !1),
			(this.I7o = !1),
			(this.NeedDestroy = !1),
			(this.IsDestroyByCharSkillEnd = !1),
			(this.GenerateTime = 0),
			(this.BulletCamp = 0),
			(this.L7o = void 0),
			(this.D7o = !1),
			(this.R7o = !1),
			this.U7o.Reset(),
			this.gti.Reset(),
			this.RandomInitSpeedOffset.Reset(),
			this.RandomPosOffset.Reset(),
			(this.ShakeNumbers = 0),
			(this.IsFrozen = !1),
			(this.FrozenTime = void 0),
			this.InitPosition.Reset(),
			(this.A7o.length = 0),
			(this.LiveTime = 0),
			(this.IsTimeNotEnough = !1),
			this.Size.Reset(),
			this.P7o.Reset(),
			(this.CloseCollision = !1),
			this.w7o.Reset(),
			(this.GetCollisionLocationFrame = 0),
			(this.IsCollisionRelativeLocationZero = !1),
			(this.IsCollisionRelativeRotationModify = !1),
			(this.B7o = 0),
			this.ClearAttacker(),
			(this.IsAutonomousProxy = !1),
			(this.AttackerCamp = 0),
			(this.AttackerPlayerId = 0),
			(this.SkillBoneName = void 0),
			(this.SkillLevel = 0),
			this.ClearTarget(),
			(this.TargetIdLast = 0),
			(this.ParentBulletInfo = void 0),
			(this.ChildEntityIds = void 0),
			(this.ParentEffect = 0),
			(this.NeedNotifyChildrenWhenDestroy = !1),
			(this.HitNumberAll = 0),
			this.EntityHitCount.clear(),
			(this.CountByParent = !1),
			(this.TimeScaleList = void 0),
			(this.TimeScaleMap = void 0),
			(this.TimeScaleId = 0),
			(this.SummonSkillId = 0),
			(this.SummonAttackerId = 0),
			(this.SummonServerEntityId = 0),
			this.CollisionInfo.Clear(),
			this.MoveInfo.Clear(),
			this.EffectInfo.Clear(),
			(this.ChildInfo = void 0),
			(this.x7o = void 0),
			this.BornLocationOffset.Reset(),
			(this.ContextId = void 0),
			(this.PreContextId = void 0),
			(this.bEn = !1),
			BulletConstant_1.BulletConstant.OpenClearCheck && BulletInfo.tHo(this);
	}
	SwapActionInfoList() {
		var t;
		(this.ActionInfoList.length = 0) < this.NextActionInfoList.length &&
			((t = this.ActionInfoList),
			(this.ActionInfoList = this.NextActionInfoList),
			(this.NextActionInfoList = t));
	}
	eHo() {
		this.AttackerHandle &&
			EventSystem_1.EventSystem.AddWithTarget(
				this.AttackerHandle,
				EventDefine_1.EEventName.RemoveEntity,
				this.K7o,
			);
	}
	$7o() {
		this.AttackerHandle &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.AttackerHandle,
				EventDefine_1.EEventName.RemoveEntity,
				this.K7o,
			);
	}
	J7o() {
		this.F7o &&
			EventSystem_1.EventSystem.AddWithTarget(
				this.F7o,
				EventDefine_1.EEventName.RemoveEntity,
				this.Q7o,
			);
	}
	Y7o() {
		this.F7o &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.F7o,
				EventDefine_1.EEventName.RemoveEntity,
				this.Q7o,
			);
	}
	static tHo(t) {
		for (const i in t) {
			var o = t[i],
				e = typeof o;
			void 0 === o ||
				"function" == e ||
				("number" == e && 0 === o) ||
				("boolean" == e && !1 === o) ||
				(o instanceof BulletCollisionInfo_1.BulletCollisionInfo ||
				o instanceof BulletMoveInfo_1.BulletMoveInfo ||
				o instanceof BulletEffectInfo_1.BulletEffectInfo
					? this.tHo(o)
					: o instanceof Vector_1.Vector
						? o.IsZero() ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Bullet",
									18,
									"BulletInfo回收时，Vector没重置",
									["key", i],
								))
						: o instanceof Rotator_1.Rotator
							? o.IsNearlyZero() ||
								(Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Bullet",
										18,
										"BulletInfo回收时，Rotator没重置",
										["key", i],
									))
							: o instanceof Transform_1.Transform
								? (o.GetLocation().IsZero() &&
										o.GetScale3D().IsZero() &&
										0 === o.GetRotation().X &&
										0 === o.GetRotation().Y &&
										0 === o.GetRotation().Z &&
										1 === o.GetRotation().W) ||
									(Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Bullet",
											18,
											"BulletInfo回收时，Transform没重置",
											["key", i],
										))
								: o instanceof Array
									? 0 !== o.length &&
										Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Bullet",
											18,
											"BulletInfo回收时，Array没清空",
											["key", i],
										)
									: o instanceof Map
										? 0 !== o.size &&
											Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"Bullet",
												18,
												"BulletInfo回收时，Map没清空",
												["key", i],
											)
										: o instanceof Set
											? 0 !== o.size &&
												Log_1.Log.CheckError() &&
												Log_1.Log.Error(
													"Bullet",
													18,
													"BulletInfo回收时，Set没清空",
													["key", i],
												)
											: Log_1.Log.CheckError() &&
												Log_1.Log.Error(
													"Bullet",
													18,
													"BulletInfo回收时，该变量不为undefined",
													["type", e],
													["key", i],
												));
		}
	}
	OnTargetInValid() {
		switch (this.BulletDataMain.Move.TrackTarget) {
			case 6:
			case 2:
			case 7:
			case 8:
			case 5:
			case 9:
			case 4:
				this.SetTargetById(0);
		}
	}
}
exports.BulletInfo = BulletInfo;
