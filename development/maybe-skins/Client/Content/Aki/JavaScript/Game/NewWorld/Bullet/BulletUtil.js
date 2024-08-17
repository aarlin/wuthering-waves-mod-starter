"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletUtil = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	SpaceUtils_1 = require("../../../Core/Utils/SpaceUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil"),
	CampUtils_1 = require("../Character/Common/Blueprint/Utils/CampUtils"),
	PawnTimeScaleComponent_1 = require("../Pawn/Component/PawnTimeScaleComponent"),
	BulletController_1 = require("./BulletController"),
	BulletStaticFunction_1 = require("./BulletStaticMethod/BulletStaticFunction"),
	BulletPool_1 = require("./Model/BulletPool"),
	QUARTER_PI_DEGREE = 45;
class BulletUtil {
	static GetTargetLocation(t, e, o) {
		return 10 === o.BulletDataMain.Move.TrackTarget
			? o.BulletInitParams.InitTargetLocation
			: t?.Valid && t.Entity?.IsInit
				? t.GetSocketLocation(e)
				: void 0;
	}
	static AttackedCondition(t, e) {
		if (
			!e?.Entity?.Valid ||
			this.DoesEntityContainsTag(e.Entity, 1008164187) ||
			this.DoesEntityContainsTag(e.Entity, -208062360)
		)
			return !1;
		var o = e.Entity.GetComponent(0);
		if (11 === t.BulletCamp)
			return o.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Vision
				? o.GetPlayerId() === t.AttackerPlayerId
				: ((a = ModelManager_1.ModelManager.GameModeModel.IsMulti
						? ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
								t.AttackerPlayerId,
								{ ParamType: 2, IsControl: !0 },
							).EntityHandle.Id
						: Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
					ModelManager_1.ModelManager.CharacterModel.IsValid(a)
						? a === e.Entity.Id
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Bullet",
									21,
									"子弹对小队攻击，找不到当前控制玩家",
									["Id", t.BulletRowName],
									["Attacker", t.AttackerActorComp?.Actor?.GetName()],
									["CurrentEntityId", a],
								),
							!1));
		var a = t.AttackerCamp;
		let r = 0;
		return (
			o.GetEntityType() !== Protocol_1.Aki.Protocol.wks.Proto_Player &&
				(r = o.GetEntityCamp()),
			(o = 2 * CampUtils_1.CampUtils.GetCampRelationship(a, r)),
			e === t.AttackerActorComp ? !!(1 & t.BulletCamp) : !!(t.BulletCamp & o)
		);
	}
	static DoesEntityContainsTag(t, e) {
		return (
			!!t &&
			(!!t.GetComponent(177)?.HasTag(e) ||
				(!!(t = t.GetComponent(185)) && t.HasTag(e)))
		);
	}
	static GetCurrentRole(t) {
		return ModelManager_1.ModelManager.GameModeModel.IsMulti
			? ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
					t.AttackerPlayerId,
					{ ParamType: 2, IsControl: !0 },
				).EntityHandle?.Entity?.GetComponent(3)
			: Global_1.Global.BaseCharacter?.CharacterActorComponent;
	}
	static ShakeTest(t, e) {
		let o = !1;
		var a = t.BulletDataMain.Render;
		return (
			(0, RegisterComponent_1.isComponentInstance)(e, 3) &&
				e.IsRoleAndCtrlByMe &&
				0 < a.VictimCameraShakeOnHit.length &&
				a.CameraShakeCountMax > t.ShakeNumbers &&
				(o = !0),
			(o =
				!!(
					t.Attacker &&
					t.IsAutonomousProxy &&
					(0 < a.AttackerCameraShakeOnHit.length ||
						0 < a.AttackerCameraShakeOnHitWeakPoint.length) &&
					a.CameraShakeCountMax > t.ShakeNumbers &&
					BulletUtil.IsPlayerOrSummons(t)
				) || o) && t.ShakeNumbers++,
			o
		);
	}
	static IsPlayerOrSummons(t) {
		var e;
		return (
			!!t.AttackerActorComp.IsRoleAndCtrlByMe ||
			!(
				!t.AttackerActorComp.IsAutonomousProxy ||
				!t.BulletDataMain.Render.CameraShakeToSummonOwner ||
				((t = t.AttackerCreatureDataComp.GetSummonerId()),
				(e = Global_1.Global.BaseCharacter.GetEntityNoBlueprint()
					?.GetComponent(0)
					?.GetCreatureDataId()),
				!t) ||
				t !== e
			)
		);
	}
	static SummonBullet(t, e, o, a, r = void 0, l = void 0) {
		var n =
			BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
				11,
			);
		(n.ChildrenType = e),
			(n.Victim = o),
			(n.IsStayInCharacter = a),
			r && (n.ParentImpactPoint = Vector_1.Vector.Create(r)),
			l && (n.ParentLastPosition = Vector_1.Vector.Create(l)),
			BulletController_1.BulletController.GetActionRunner().AddAction(t, n);
	}
	static CheckSupport(t, e) {
		if ((t = t.BulletDataMain.Execution.SupportCamp) && 0 < t.length)
			for (const o of t) if (o === e) return !0;
		return !1;
	}
	static ProcessHandOverEffectToSon(t, e) {
		e?.Valid &&
			(e = e.GetBulletInfo()).BulletDataMain.Render.HandOverParentEffect &&
			BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(t, e);
	}
	static FrozenBulletTime(t, e) {
		(t.FrozenTime = e * TimeUtil_1.TimeUtil.InverseMillisecond),
			BulletUtil.BulletFrozen(t);
	}
	static BulletFrozen(t) {
		t.IsFrozen = !0;
		var e = t.ActorComponent;
		e &&
			(e.SetBulletCustomTimeDilation(0),
			BulletStaticFunction_1.BulletStaticFunction.SetBulletEffectTimeScale(
				t.EffectInfo,
				0,
			));
	}
	static BulletUnfrozen(t) {
		(t.IsFrozen = !1),
			t.ActorComponent.SetBulletCustomTimeDilation(1),
			BulletStaticFunction_1.BulletStaticFunction.SetBulletEffectTimeScale(
				t.EffectInfo,
				1,
			);
	}
	static FrozenCharacterBullet(t, e, o = 0) {
		if ((t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t)))
			for (const r of t) {
				var a = r.GetBulletInfo();
				(!StringUtils_1.StringUtils.IsEmpty(e) &&
					a.BulletDataMain.BulletName !== e) ||
					BulletUtil.FrozenBulletTime(a, o);
			}
	}
	static UnFrozenCharacterBullet(t, e) {
		if ((t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t)))
			for (const a of t) {
				var o = a.GetBulletInfo();
				(!StringUtils_1.StringUtils.IsEmpty(e) &&
					o.BulletDataMain.BulletName !== e) ||
					BulletUtil.BulletUnfrozen(o);
			}
	}
	static SetTimeScale(t, e, o, a, r, l, n = 0, i = 0) {
		if (r <= 0 || t.BulletDataMain.TimeScale.TimeScaleWithAttacker) return 0;
		if (0 < n && r <= n) return 0;
		var c = (n = Time_1.Time.WorldTimeSeconds - n) + r;
		let m = i;
		return (
			0 <= i && ((t.TimeScaleId += 1), (m = t.TimeScaleId)),
			(i = new PawnTimeScaleComponent_1.TimeScale(n, c, e, o, a, r, m, l)),
			t.TimeScaleList.Push(i),
			t.TimeScaleMap.set(m, i),
			m
		);
	}
	static RemoveTimeScale(t, e) {
		(t = t.TimeScaleMap.get(e)) && (t.MarkDelete = !0);
	}
	static GetHitRotator(t, e, o) {
		o.FromUeRotator(e.ActorRotationProxy);
		var a = t.BulletDataMain.Base.RelativeDirection;
		if (3 === a) return !1;
		if (
			(0, RegisterComponent_1.isComponentInstance)(e, 3) &&
			e.Entity.GetComponent(185)?.HasTag(855966206)
		)
			return !1;
		var r = t.AttackerActorComp,
			l = Vector_1.Vector.Create();
		switch (a) {
			case 0:
				l.FromUeVector(r.ActorLocationProxy),
					l.SubtractionEqual(e.ActorLocationProxy),
					MathUtils_1.MathUtils.LookRotationUpFirst(
						l,
						Vector_1.Vector.UpVectorProxy,
						o,
					);
				break;
			case 1:
				l.FromUeVector(t.ActorComponent.ActorLocationProxy),
					l.SubtractionEqual(e.ActorLocationProxy),
					MathUtils_1.MathUtils.LookRotationUpFirst(
						l,
						Vector_1.Vector.UpVectorProxy,
						o,
					);
				break;
			case 2:
				t.MoveInfo.BulletSpeedDir.Equals(
					Vector_1.Vector.ZeroVectorProxy,
					MathCommon_1.MathCommon.KindaSmallNumber,
				)
					? (l.FromUeVector(t.ActorComponent.ActorForward),
						(l.Z = 0),
						l.MultiplyEqual(-1))
					: l.Set(
							-t.MoveInfo.BulletSpeedDir.X,
							-t.MoveInfo.BulletSpeedDir.Y,
							0,
						),
					MathUtils_1.MathUtils.LookRotationUpFirst(
						l,
						Vector_1.Vector.UpVectorProxy,
						o,
					);
				break;
			case 4:
				SpaceUtils_1.SpaceUtils.IsLocationInSideBullet(t, e.ActorLocationProxy)
					? (l.FromUeVector(e.ActorLocationProxy),
						l.SubtractionEqual(t.ActorComponent.ActorLocationProxy))
					: (l.FromUeVector(t.ActorComponent.ActorLocationProxy),
						l.SubtractionEqual(e.ActorLocationProxy)),
					MathUtils_1.MathUtils.LookRotationUpFirst(
						l,
						Vector_1.Vector.UpVectorProxy,
						o,
					);
		}
		return !0;
	}
	static SetHitRotator(t, e, o) {
		var a = Rotator_1.Rotator.Create();
		return (
			BulletUtil.GetHitRotator(t, e, a) &&
				!e.Entity.GetComponent(185)?.HasTag(1447214865) &&
				((a.Yaw += o),
				e.SetActorRotation(a.ToUeRotator(), this.constructor.name, !1),
				(0, RegisterComponent_1.isComponentInstance)(e, 3)) &&
				e.SetInputRotator(a),
			a.ToUeRotator()
		);
	}
	static GetOverrideHitAnimByAngle(t, e, o) {
		let a = e;
		e = (0, RegisterComponent_1.isComponentInstance)(t, 182);
		var r = ModelManager_1.ModelManager.BulletModel,
			l = r.SelfAdaptBeHitAnim.has(a);
		return (
			(l || e) &&
				((o = (((o - 180 - t.ActorRotationProxy.Yaw + 45) % 360) + 360) % 360),
				(t = Math.floor(o / 90)),
				l
					? (a = (
							r.HeavyHitAnim.has(a)
								? r.Index2HeavyHitAnimMap
								: r.Index2LightHitAnimMap
						)[t])
					: e && (a = r.Index2HeavyHitAnimMap[t])),
			a
		);
	}
	static CheckBulletAttackerExist(t) {
		return (
			(t.AttackerHandle?.Valid ?? !1) && void 0 !== t.AttackerActorComp?.Actor
		);
	}
	static FindLookAtRot(t, e, o) {
		var a, r;
		return o
			? ((o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(e),
				(a = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t),
				o.SubtractionEqual(a),
				(r = UE.KismetMathLibrary.MakeRotFromZX(
					Vector_1.Vector.UpVector,
					o.ToUeVector(!0),
				)),
				BulletPool_1.BulletPool.RecycleVector(o),
				BulletPool_1.BulletPool.RecycleVector(a),
				r)
			: UE.KismetMathLibrary.FindLookAtRotation(t.ToUeVector(!0), e);
	}
	static ClampBeginRotator(t) {
		var e = t.BulletDataMain.Move.BeginVelocityLimitMap;
		if (!(e.size <= 0)) {
			var o = BulletPool_1.BulletPool.CreateRotator(),
				a =
					(t.AttackerActorComp.ActorRotationProxy.Clamp(o),
					BulletPool_1.BulletPool.CreateRotator());
			t.MoveInfo.BeginSpeedRotator.Clamp(a);
			let i = a.Pitch,
				c =
					(void 0 !== (l = e.get(0)) &&
						i < MathCommon_1.MathCommon.FlatAngle &&
						(i = Math.min(i, l)),
					void 0 !== (l = e.get(1)) &&
						i > MathCommon_1.MathCommon.FlatAngle &&
						(i = Math.max(i, MathCommon_1.MathCommon.RoundAngle - l)),
					a.Yaw);
			c =
				c > MathCommon_1.MathCommon.FlatAngle
					? c - MathCommon_1.MathCommon.RoundAngle
					: c;
			var r,
				l = e.get(3),
				n =
					(n = o.Yaw) > MathCommon_1.MathCommon.FlatAngle
						? n - MathCommon_1.MathCommon.RoundAngle
						: n;
			void 0 !== l &&
				0 < (r = c - n) &&
				r < MathCommon_1.MathCommon.FlatAngle &&
				l < r &&
				(c = Rotator_1.Rotator.ClampAxis(o.Yaw + l)),
				void 0 !== (l = e.get(2)) &&
					0 < (r = n - c) &&
					r < MathCommon_1.MathCommon.FlatAngle &&
					l < r &&
					(c = Rotator_1.Rotator.ClampAxis(o.Yaw - l)),
				BulletPool_1.BulletPool.RecycleRotator(o),
				BulletPool_1.BulletPool.RecycleRotator(a),
				(t.MoveInfo.BeginSpeedRotator.Pitch = i),
				(t.MoveInfo.BeginSpeedRotator.Yaw = c);
		}
	}
	static CreateBulletFromAN(t, e, o, a, r, l, n, i) {
		var c = t.GetEntityNoBlueprint();
		let m = c?.GetComponent(187);
		return (
			i &&
				((i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
					c,
					Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantCustom,
				)?.Entity),
				(m = i?.GetComponent(187))),
			(c = m?.CreateAnimNotifyContent(void 0, e)),
			(i = BulletController_1.BulletController.CreateBulletCustomTarget(
				t,
				e,
				o,
				{
					SkillId: Number(a),
					SyncType: r ? 1 : 0,
					InitTargetLocation: l,
					LocationOffset: n,
				},
				c,
			))
				? i.Id
				: -1
		);
	}
	static AttachParentEffectSkeleton(t, e, o) {
		var a = t.BulletDataMain.Move;
		return (
			a.IsLockScale && t.Actor.RootComponent.SetAbsolute(!1, !1, !0),
			t.ClearCacheLocationAndRotation(),
			t.ActorComponent.ResetAllCachedTime(),
			(t.ActorComponent.NeedDetach = !0),
			EffectSystem_1.EffectSystem.AttachToEffectSkeletalMesh(
				o,
				t.Actor,
				a.BoneName,
				0,
			),
			t.Actor.K2_SetActorRelativeLocation(
				t.BornLocationOffset.ToUeVector(),
				!1,
				void 0,
				!1,
			),
			t.Actor.K2_SetActorRelativeRotation(
				Rotator_1.Rotator.ZeroRotator,
				!1,
				void 0,
				!0,
			),
			!0
		);
	}
}
exports.BulletUtil = BulletUtil;
