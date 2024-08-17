"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillBehaviorAction = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	GameplayCueById_1 = require("../../../../../../../Core/Define/ConfigQuery/GameplayCueById"),
	Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
	Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
	CameraController_1 = require("../../../../../../Camera/CameraController"),
	CameraUtility_1 = require("../../../../../../Camera/CameraUtility"),
	TsBaseCharacter_1 = require("../../../../../../Character/TsBaseCharacter"),
	Global_1 = require("../../../../../../Global"),
	GlobalData_1 = require("../../../../../../GlobalData"),
	ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
	CombatDebugController_1 = require("../../../../../../Utils/CombatDebugController"),
	BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController"),
	WorldGlobal_1 = require("../../../../../../World/WorldGlobal"),
	BulletController_1 = require("../../../../../Bullet/BulletController"),
	BulletUtil_1 = require("../../../../../Bullet/BulletUtil"),
	SkillBehaviorMisc_1 = require("./SkillBehaviorMisc");
class SkillBehaviorAction {
	static Begin(e, t) {
		if (t.Entity.GetComponent(3).IsAutonomousProxy)
			try {
				for (let a = 0; a < e.Num(); a++) {
					var o = e.Get(a);
					switch (
						(CombatDebugController_1.CombatDebugController.CombatDebug(
							"Skill",
							t.Entity,
							"SkillBehaviorAction.Begin",
							["技能Id", t.Skill.SkillId],
							["技能名", t.Skill.SkillName],
							["技能行为", o.ActionType],
						),
						o.ActionType)
					) {
						case 0:
							this.rzo(o, t);
							break;
						case 1:
							this.bd(o, t);
							break;
						case 2:
							this.nzo(o, t);
							break;
						case 3:
							this.szo(o, t);
							break;
						case 4:
							this.azo(o, t);
							break;
						case 5:
							this.hzo(o, t);
							break;
						case 6:
							this.lzo(o, t);
							break;
						case 7:
							this._zo(o, t);
							break;
						case 8:
							this.uzo(o, t);
							break;
						case 9:
							this.Ent(o, t);
							break;
						case 10:
							this.czo(o, t);
							break;
						case 11:
							this.mzo(o, t);
					}
				}
			} catch (e) {
				e instanceof Error
					? CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
							"Skill",
							t.Entity,
							"SkillBehaviorAction.Begin异常",
							e,
							["技能Id", t.Skill.SkillId],
							["技能名", t.Skill.SkillName],
						)
					: CombatDebugController_1.CombatDebugController.CombatError(
							"Skill",
							t.Entity,
							"SkillBehaviorAction.Begin异常",
							["技能Id", t.Skill.SkillId],
							["技能名", t.Skill.SkillName],
						);
			}
	}
	static End(e) {
		SkillBehaviorMisc_1.paramMap.get(e)?.forEach((t) => {
			CombatDebugController_1.CombatDebugController.CombatDebug(
				"Skill",
				t.Entity,
				"SkillBehaviorAction.End",
				["技能Id", e.SkillId],
				["技能名", e.SkillName],
				["技能行为", t.ActionType],
			);
			try {
				switch (t.ActionType) {
					case 2:
						t.GameplayCue.Destroy();
						break;
					case 6:
						t.Entity.GetComponent(161).CharacterMovement.SetMovementMode(
							t.MovementMode,
						);
						break;
					case 7:
						t.Entity.GetComponent(
							3,
						).Actor.CapsuleComponent.SetCollisionResponseToChannel(
							t.CollisionChannel,
							t.CollisionResponse,
						);
						break;
					case 8:
						t.SummonSkillComponent.EndSkill(
							t.SummonSkillId,
							"SkillBehaviorAction.End",
						);
				}
			} catch (o) {
				o instanceof Error
					? CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
							"Skill",
							t.Entity,
							"SkillBehaviorAction.End异常",
							o,
							["技能Id", e.SkillId],
							["技能名", e.SkillName],
							["技能行为", t.ActionType],
						)
					: CombatDebugController_1.CombatDebugController.CombatError(
							"Skill",
							t.Entity,
							"SkillBehaviorAction.End异常",
							["技能Id", e.SkillId],
							["技能名", e.SkillName],
							["技能行为", t.ActionType],
						);
			}
		}),
			SkillBehaviorMisc_1.paramMap.delete(e);
	}
	static rzo(e, t) {
		var o = t.Entity.GetComponent(3);
		let a = o.ActorLocation,
			r = o.ActorForward;
		switch (e.LocationType) {
			case 0:
				break;
			case 1:
				t.SkillComponent.SkillTarget &&
					(([a, r] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
						t.SkillComponent.SkillTarget.Entity.GetComponent(1).Owner,
					)),
					(a = t.SkillComponent.GetTargetTransform().GetLocation()));
				break;
			case 2:
				var i =
					ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
						29,
					).GetCurrentTarget();
				i &&
					([a, r] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
						i.Entity.GetComponent(1).Owner,
					));
				break;
			case 3:
				[a, r] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
					Global_1.Global.BaseCharacter,
				);
				break;
			case 4:
				(i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
					t.Entity.GetComponent(0).GetSummonerId(),
				)?.Entity?.GetComponent(1)),
					([a, r] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(i.Owner));
				break;
			case 5:
				[a, r] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
					ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4)
						.CameraActor,
				);
				break;
			case 6:
				(i = BlackboardController_1.BlackboardController.GetVectorValueByEntity(
					t.Entity.Id,
					e.BlackboardKey,
				)),
					(a = WorldGlobal_1.WorldGlobal.ToUeVector(i));
				break;
			case 7:
				(i = BlackboardController_1.BlackboardController.GetIntValueByEntity(
					t.Entity.Id,
					e.BlackboardKey,
				)),
					(i = EntitySystem_1.EntitySystem.Get(i)),
					i?.Valid &&
						([a, r] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(
							i.GetComponent(152).Owner,
						));
		}
		switch (e.LocationForwardType) {
			case 0:
				break;
			case 1:
				r = o.Actor.GetActorForwardVector();
				break;
			case 2:
				(r = o.ActorLocation.op_Subtraction(a)).Set(r.X, r.Y, 0);
				break;
			case 3:
				(r = a.op_Subtraction(
					Global_1.Global.CharacterCameraManager.GetCameraLocation(),
				)).Set(r.X, r.Y, 0);
		}
		var l,
			n = Vector_1.Vector.Create(a);
		if (
			((a = (c = new UE.Transform(
				r.Rotation(),
				a,
				Vector_1.Vector.OneVector,
			)).TransformPositionNoScale(e.LocationOffset)),
			e.Restrict)
		) {
			let r = o.ActorLocation;
			switch (e.RestrictType) {
				case 0:
					r = Global_1.Global.BaseCharacter.K2_GetActorLocation();
					break;
				case 1:
					break;
				case 2:
					t.Entity.GetComponent(0).IsMonster() &&
						((l = o.GetInitLocation()), r.Set(l.X, l.Y, l.Z));
			}
			var c;
			(c = a.op_Subtraction(r).Size2D()) > e.RestrictDistance &&
				((c = e.RestrictDistance / c),
				MathUtils_1.MathUtils.LerpVector(r, a, c, a));
		}
		let C = Vector_1.Vector.Create(a);
		if (!n.Equals(C) && e.BestSpot) {
			switch (e.Strategy) {
				case 0:
					var s = (0, SkillBehaviorMisc_1.forwardTrace)(o, n, C, e.DebugTrace);
					if (!s) return;
					C = s[1];
					break;
				case 1: {
					let t = !1;
					var m = Vector_1.Vector.Create(),
						d = Vector_1.Vector.Create();
					C.Subtraction(n, m);
					for (const a of SkillBehaviorMisc_1.angles) {
						m.RotateAngleAxis(a, Vector_1.Vector.UpVectorProxy, d),
							n.Addition(d, C);
						var S = (0, SkillBehaviorMisc_1.forwardTrace)(
							o,
							n,
							C,
							e.DebugTrace,
						);
						if (!S) return;
						if (!S[0]) {
							(t = !0), (C = S[1]);
							break;
						}
					}
					if (t) break;
					return;
				}
			}
			C = (c = (0, SkillBehaviorMisc_1.downTrace)(o, C, e.DebugTrace))[0]
				? c[1]
				: (0, SkillBehaviorMisc_1.getValidLocation)(
						o,
						n,
						C,
						Vector_1.Vector.Create(),
						e.DebugTrace,
					);
		}
		if (
			((a = C.ToUeVector()),
			0 < e.Navigation &&
				!UE.NavigationSystemV1.K2_ProjectPointToNavigation(
					GlobalData_1.GlobalData.World,
					a,
					void 0,
					void 0,
					void 0,
					SkillBehaviorMisc_1.queryExtent,
				))
		) {
			if (
				((c = (0, puerts_1.$ref)(void 0)),
				!UE.NavigationSystemV1.K2_GetRandomLocationInNavigableRadius(
					GlobalData_1.GlobalData.World,
					a,
					c,
					e.Navigation,
				))
			)
				return;
			a = (0, puerts_1.$unref)(c);
		}
		CombatDebugController_1.CombatDebugController.CombatDebug(
			"Skill",
			t.Entity,
			"SkillBehaviorAction.SetLocation",
			["位置", a],
		),
			o.SetActorLocation(a, SkillBehaviorMisc_1.CONTEXT + ".Final", !1);
	}
	static bd(e, t) {
		let o, a;
		switch (e.RotationType) {
			case 0:
				a = t.SkillComponent.SkillTarget;
				break;
			case 1:
				a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
				break;
			case 2:
				var r = t.Entity.GetComponent(0);
				a = ModelManager_1.ModelManager.CreatureModel.GetEntity(
					r.GetSummonerId(),
				);
				break;
			case 3:
				o =
					ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(
						4,
					).CameraActor.K2_GetActorLocation();
				break;
			case 4:
				t.SkillComponent.SkillTarget ===
				ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
					? (o =
							ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(
								4,
							).CameraActor.K2_GetActorLocation())
					: (a = t.SkillComponent.SkillTarget);
				break;
			default:
				a = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
					t.Entity,
				);
		}
		a && a.Entity !== t.Entity && (o = a.Entity.GetComponent(1).ActorLocation);
		var i,
			l = t.Entity.GetComponent(3);
		let n;
		((n = o
			? (((i = o.op_Subtraction(l.ActorLocation)).Z = 0), i.Rotation())
			: l.ActorRotation).Yaw += e.DirectionOffset),
			CombatDebugController_1.CombatDebugController.CombatDebug(
				"Skill",
				t.Entity,
				"SkillBehaviorAction.SetRotation",
				["朝向", n],
			),
			l.SetActorRotation(n, "SkillBehaviorAction.SetDirection");
	}
	static nzo(e, t) {
		var o = t.Entity.GetComponent(19);
		for (let i = 0; i < e.Cues.Num(); i++) {
			var a = e.Cues.Get(i),
				r = GameplayCueById_1.configGameplayCueById.GetConfig(a.CueId);
			r = o.CreateGameplayCue(r, { Sync: !0 });
			a.Stop &&
				(0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
					Entity: t.Entity,
					ActionType: e.ActionType,
					GameplayCue: r,
				});
		}
	}
	static szo(e, t) {
		for (let r = 0; r < e.Bullets.Num(); r++) {
			var o,
				a = e.Bullets.Get(r);
			for (let e = 0; e < a.bulletCount; e++) {
				let e = -1;
				t.Skill.MontageContextId
					? (o = t.Entity.GetComponent(3).Actor) instanceof
							TsBaseCharacter_1.default &&
						(e = BulletUtil_1.BulletUtil.CreateBulletFromAN(
							o,
							a.bulletRowName,
							t.Entity.GetComponent(3).ActorTransform,
							t.Skill.SkillId.toString(),
							!1,
							void 0,
						))
					: (e = BulletController_1.BulletController.CreateBulletCustomTarget(
							t.Entity,
							a.bulletRowName,
							t.Entity.GetComponent(3).ActorTransform,
							{ SkillId: t.Skill.SkillId },
							t.Skill.CombatMessageId,
						).Id),
					a.BlackboardKey &&
						BlackboardController_1.BlackboardController.SetIntValueByEntity(
							t.Entity.Id,
							a.BlackboardKey,
							e,
						);
			}
		}
	}
	static azo(e, t) {
		(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.Entity.Id)),
			CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(
				t,
				e.CameraModifierSettings,
				e.CameraEffectiveClientType,
				e.CameraModifierConditions,
			) &&
				CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraModify(
					e.Tag,
					e.Duration,
					e.BlendInTime,
					e.BlendOutTime,
					e.CameraModifierSettings,
					void 0,
					e.BreakBlendOutTime,
					void 0,
					void 0,
					void 0,
					e.CameraAttachSocket.toString(),
				);
	}
	static hzo(e, t) {
		CameraController_1.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(
			e.CameraSequenceSettings,
			e.ResetLockOnCamera,
			e.AdditiveRotation,
			t.Entity.GetComponent(3).Actor,
			e.CameraAttachSocket,
			e.CameraDetectSocket,
			e.ExtraSphereLocation,
			e.ExtraDetectSphereRadius,
			e.IsShowExtraSphere,
		);
	}
	static lzo(e, t) {
		t.Entity.GetComponent(161).CharacterMovement.SetMovementMode(
			e.BeginMovementMode,
		),
			(0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
				Entity: t.Entity,
				ActionType: e.ActionType,
				MovementMode: e.EndMovementMode,
			});
	}
	static _zo(e, t) {
		var o = t.Entity.GetComponent(3).Actor.CapsuleComponent;
		e.CollisionRestore &&
			(0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
				Entity: t.Entity,
				ActionType: e.ActionType,
				CollisionChannel: e.CollisionChannel,
				CollisionResponse: o.GetCollisionResponseToChannel(e.CollisionChannel),
			}),
			o.SetCollisionResponseToChannel(e.CollisionChannel, e.CollisionResponse);
	}
	static uzo(e, t) {
		var o = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
			t.Entity,
			Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantCustom,
			e.FollowIndex,
		);
		o &&
			((o = o.Entity.GetComponent(33)),
			e.StopSummonSkill &&
				(0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
					Entity: t.Entity,
					ActionType: e.ActionType,
					SummonSkillComponent: o,
					SummonSkillId: e.SummonSkillId,
				}),
			o.BeginSkill(e.SummonSkillId, {
				Target: t.SkillComponent.SkillTarget?.Entity,
				Context: "SkillBehaviorAction.UseSummonSkill",
			}));
	}
	static Ent(e, t) {
		let o;
		switch (e.BuffTarget) {
			case 0:
				o = t.Entity.GetComponent(157);
				break;
			case 1:
				o = t.SkillComponent.SkillTarget?.Entity?.GetComponent(157);
		}
		var a, r;
		o &&
			(e.Add
				? ((a = {
						InstigatorId:
							ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
								t.Entity.Id,
							),
						Reason: "从技能行为添加Buff",
						PreMessageId: t.Skill.CombatMessageId,
					}),
					t.Skill.MontageContextId
						? ((r = t.Entity.GetComponent(157)),
							o.AddBuffFromAnimNotify(e.BuffId, r, a))
						: o.AddBuff(e.BuffId, a))
				: o.RemoveBuff(e.BuffId, -1, "从技能行为移除Buff"));
	}
	static czo(e, t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 185)),
			t?.Valid &&
				"None" !== e.Tag.TagName &&
				(e.Add ? t.AddTag(e.Tag.TagId) : t.RemoveTag(e.Tag.TagId));
	}
	static mzo(e, t) {
		(t = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 18)),
			t?.Valid && t.TryExitWeakTime();
	}
}
exports.SkillBehaviorAction = SkillBehaviorAction;
